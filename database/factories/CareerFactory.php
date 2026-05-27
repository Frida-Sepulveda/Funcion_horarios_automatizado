<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CareerFactory extends Factory
{
    public function definition(): array
    {
        $careers = [

            [
                'name' => 'Ingeniería en Sistemas Computacionales',
                'study_plan' => 'ISIC-2010'
            ],

            [
                'name' => 'Ingeniería Industrial',
                'study_plan' => 'IIND-2010'
            ],

            [
                'name' => 'Ingeniería Electromecánica',
                'study_plan' => 'IEME-2010'
            ],

            [
                'name' => 'Ingeniería Electrónica',
                'study_plan' => 'IELE-2010'
            ],

            [
                'name' => 'Ingeniería Mecatrónica',
                'study_plan' => 'IMCT-2010'
            ],

            [
                'name' => 'Ingeniería en Gestión Empresarial',
                'study_plan' => 'IGEM-2010'
            ],

            [
                'name' => 'Ingeniería en Logística',
                'study_plan' => 'ILOG-2010'
            ],

            [
                'name' => 'Ingeniería en Tecnologías de la Información y Comunicaciones',
                'study_plan' => 'ITIC-2010'
            ]
        ];

        return fake()->randomElement($careers);
    }
}