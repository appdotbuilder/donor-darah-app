<?php

use App\Models\BloodDonor;
use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);
uses(Illuminate\Foundation\Testing\WithFaker::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('allows authenticated users to view blood donors index', function () {
    BloodDonor::factory()->count(5)->create();

    $response = $this->actingAs($this->user)
        ->get(route('blood-donors.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('blood-donors/index')
            ->has('donors')
            ->has('statistics')
    );
});

it('redirects unauthenticated users to login', function () {
    $response = $this->get(route('blood-donors.index'));

    $response->assertRedirect(route('login'));
});

it('allows users to create blood donors', function () {
    $donorData = [
        'name' => fake()->name(),
        'address' => fake()->address(),
        'age' => random_int(18, 65),
        'blood_type' => fake()->randomElement(['A', 'B', 'AB', 'O']),
        'rhesus' => fake()->randomElement(['positive', 'negative']),
        'phone' => fake()->phoneNumber(),
        'last_donation_date' => fake()->date(),
    ];

    $response = $this->actingAs($this->user)
        ->post(route('blood-donors.store'), $donorData);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Data pendonor berhasil ditambahkan.');

    $this->assertDatabaseHas('blood_donors', [
        'name' => $donorData['name'],
        'blood_type' => $donorData['blood_type'],
        'rhesus' => $donorData['rhesus'],
    ]);
});

it('allows users to update blood donors', function () {
    $donor = BloodDonor::factory()->create();
    
    $updatedData = [
        'name' => 'Updated Name',
        'address' => 'Updated Address',
        'age' => 30,
        'blood_type' => 'AB',
        'rhesus' => 'positive',
        'phone' => '081234567890',
        'last_donation_date' => '2023-12-01',
    ];

    $response = $this->actingAs($this->user)
        ->put(route('blood-donors.update', $donor), $updatedData);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Data pendonor berhasil diperbarui.');

    $this->assertDatabaseHas('blood_donors', [
        'id' => $donor->id,
        'name' => 'Updated Name',
        'blood_type' => 'AB',
        'rhesus' => 'positive',
    ]);
});

it('allows users to delete blood donors', function () {
    $donor = BloodDonor::factory()->create();

    $response = $this->actingAs($this->user)
        ->delete(route('blood-donors.destroy', $donor));

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Data pendonor berhasil dihapus.');

    $this->assertDatabaseMissing('blood_donors', [
        'id' => $donor->id,
    ]);
});

it('can search blood donors', function () {
    BloodDonor::factory()->create(['name' => 'John Doe']);
    BloodDonor::factory()->create(['name' => 'Jane Smith']);

    $response = $this->actingAs($this->user)
        ->get(route('blood-donors.index', ['search' => 'John']));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('donors.data', 1)
    );
});

it('can filter by blood type', function () {
    BloodDonor::factory()->create(['blood_type' => 'A']);
    BloodDonor::factory()->create(['blood_type' => 'B']);
    BloodDonor::factory()->create(['blood_type' => 'A']);

    $response = $this->actingAs($this->user)
        ->get(route('blood-donors.index', ['blood_type' => 'A']));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('donors.data', 2)
    );
});

it('validates data on creation', function () {
    $response = $this->actingAs($this->user)
        ->post(route('blood-donors.store'), [
            'name' => '', // Required field empty
            'age' => 16, // Below minimum age
            'blood_type' => 'invalid', // Invalid blood type
        ]);

    $response->assertSessionHasErrors([
        'name',
        'age',
        'blood_type',
    ]);
});