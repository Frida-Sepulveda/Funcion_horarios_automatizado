<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Career;

class CareerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
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

        foreach ($careers as $career) {

            Career::create($career);
        }
    }
}
