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
                    'Virtual-3',
                    'Virtual-4',
                    'Virtual-5',
                    'Virtual-6',
                    'Virtual-7',
                    'Virtual-8',
                    'Virtual-9',
                    'Virtual-10'
                ]),

                'building' => null,

                'max_capacity' => fake()->numberBetween(30, 50),

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
                'Y6',
                'Y7',
                'Y8',
                'Y9',
                'Y10',
            ]),

            'building' => fake()->randomElement([
                'Edificio Y',
                'Edificio Z'
            ]),

            'max_capacity' => fake()->numberBetween(15, 40),

            'type' => 'Presencial',

            'platform' => null,

            'status' => 'Disponible'
        ];
    }
}