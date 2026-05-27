<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Career;
use App\Models\Level;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [

            'control_number' => fake()->unique()->numerify('23######'),

            'first_name' => fake()->firstName(),

            'last_name' => fake()->lastName(),

            'gender' => fake()->randomElement(['M', 'F']),

            'birth_date' => fake()->date(),

            'career_id' => Career::query()->inRandomOrder(null)->value('id'),

            'semester' => fake()->numberBetween(1, 13),

            'level_id' => Level::query()->inRandomOrder(null)->value('id'),

            'student_type' => fake()->randomElement([
                'Vigente',
                'Egresado'
            ]),

            'status' => fake()->randomElement([
                'En espera',
                'Vigente',
                'Inhabilitado',
                'En Revision',
                'Acreditado',
                'Elegible',
                'Liberado'
            ]),

            'accreditation_origin' => fake()->optional()->word(),

            'accreditation_date' => fake()->optional()->date(),

            'modality' => fake()->randomElement([
                'Presencial',
                'Virtual'
            ]),

            'schedule_type' => fake()->randomElement([
                'LM',
                'MJ',
                'Intensivo'
            ]),

            'shift' => fake()->randomElement([
                'Manana',
                'Tarde'
            ]),
        ];
    }
}
