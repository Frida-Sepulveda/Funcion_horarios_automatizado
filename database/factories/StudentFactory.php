<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'matricula' => fake()->unique()->numerify('2024####'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'sublevel' => fake()->randomElement([
                'A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
            'modalidad' => fake()->randomElement([
                'Presencial', 'Virtual']),
            'tipo_horario' => fake()->randomElement([
                'LM', 'MJ', 'Intensivo']),
            'turno' => fake()->randomElement([
                'Mañana', 'Tarde']),
            'status' => 'Inscrito'
        ];
    }
}
