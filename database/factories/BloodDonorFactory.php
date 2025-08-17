<?php

namespace Database\Factories;

use App\Models\BloodDonor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BloodDonor>
 */
class BloodDonorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<BloodDonor>
     */
    protected $model = BloodDonor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'address' => $this->faker->address(),
            'age' => $this->faker->numberBetween(17, 65),
            'blood_type' => $this->faker->randomElement(['A', 'B', 'AB', 'O']),
            'rhesus' => $this->faker->randomElement(['positive', 'negative']),
            'phone' => $this->faker->phoneNumber(),
            'last_donation_date' => $this->faker->optional(0.8)->dateTimeBetween('-2 years', 'now'),
        ];
    }
}