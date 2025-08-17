<?php

namespace Database\Seeders;

use App\Models\BloodDonor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BloodDonorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BloodDonor::factory(50)->create();
    }
}