<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClassroomFactory extends Factory
{
    public function definition(): array
    {
        return [

            'name' => 'Aula ' . fake()->numberBetween(1, 10),

            'building' => 'Edificio Y',

            'capacity' => fake()->randomElement([
                25,
                30,
                35
            ]),

            'type' => fake()->randomElement([
                'Normal',
                'Magna'
            ]),

            'status' => 'Disponible'
        ];
    }
}