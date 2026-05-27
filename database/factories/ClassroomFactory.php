<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClassroomFactory extends Factory
{
    public function definition(): array
    {
        $type = fake()->randomElement([
            'Presencial',
            'Virtual'
        ]);

        if ($type === 'Virtual') {

            return [

                'name' => fake()->randomElement([
                    'Virtual-1',
                    'Virtual-2',
                    'Sala Teams',
                    'Meet-1'
                ]),

                'building' => null,

                'max_capacity' => fake()->numberBetween(50, 200),

                'type' => 'Virtual',

                'platform' => fake()->randomElement([
                    'Teams',
                    'Google Meet',
                    'Zoom'
                ]),

                'status' => 'Disponible'
            ];
        }

        return [

            'name' => fake()->randomElement([
                'Y1',
                'Y2',
                'Y3',
                'Y4',
                'Y5',
                'Y6'
            ]),

            'building' => fake()->randomElement([
                'Edificio Y',
                'Edificio Z'
            ]),

            'max_capacity' => fake()->numberBetween(20, 100),

            'type' => 'Presencial',

            'platform' => null,

            'status' => 'Disponible'
        ];
    }
}