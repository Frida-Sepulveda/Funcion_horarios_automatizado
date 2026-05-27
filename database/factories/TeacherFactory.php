<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherFactory extends Factory
{
    public function definition(): array
    {
        return [

            'first_name' => fake()->firstName(),

            'last_name' => fake()->lastName(),

            'email' => fake()->unique()->safeEmail(),

            'phone' => fake()->numerify('477#######'),

            'category' => fake()->randomElement([
                'A',
                'B',
                'C'
            ]),

            'mcer_level' => fake()->randomElement([
                'A1',
                'A2',
                'B1',
                'B2',
                'C1',
                'C2'
            ]),

            'rfc' => fake()->optional()->regexify('[A-Z]{4}[0-9]{6}[A-Z0-9]{3}'),

            'curp' => fake()->optional()->regexify('[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{2}'),

            'bank_clabe' => fake()->optional()->numerify('##################'),

            'ttc_hours' => fake()->numberBetween(0, 200),

            'academic_degree' => fake()->randomElement([
                'Licenciatura',
                'Maestría',
                'Doctorado'
            ]),

            'is_native' => fake()->boolean(),

            'modality' => fake()->randomElement([
                'Presencial',
                'Virtual',
                'Mixta'
            ]),

            'max_hours' => fake()->numberBetween(10, 40),

            'current_hours' => fake()->numberBetween(0, 20),

            'status' => fake()->randomElement([
                'Activo',
                'Inactivo'
            ]),
        ];
    }
}