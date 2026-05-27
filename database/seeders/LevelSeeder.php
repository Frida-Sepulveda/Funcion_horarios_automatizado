<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Level;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [

            ['name' => 'Básico 1', 'code' => 'B1'],
            ['name' => 'Básico 2', 'code' => 'B2'],
            ['name' => 'Básico 3', 'code' => 'B3'],
            ['name' => 'Básico 4', 'code' => 'B4'],
            ['name' => 'Básico 5', 'code' => 'B5'],

            ['name' => 'Intermedio 1', 'code' => 'I1'],
            ['name' => 'Intermedio 2', 'code' => 'I2'],
            ['name' => 'Intermedio 3', 'code' => 'I3'],
            ['name' => 'Intermedio 4', 'code' => 'I4'],
            ['name' => 'Intermedio 5', 'code' => 'I5'],
        ];

        foreach ($levels as $level) {

            Level::create($level);
        }
    }
}
