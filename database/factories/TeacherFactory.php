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

            'modalidad' => fake()->randomElement([
                'Presencial',
                'Virtual',
                'Mixta'
            ]),

            'max_hours' => 20,

            'current_hours' => 0,

            'status' => 'activo'
        ];
    }
}