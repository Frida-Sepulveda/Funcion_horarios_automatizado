<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ScheduleBlock;
use Carbon\Carbon;

class ScheduleBlockSeeder extends Seeder
{
    public function run(): void
    {
        // Blques normales de Lunes a Jueves
        $combinacionesNormales = [
            ['tipo' => 'LM', 'dias' => ['Lunes', 'Miercoles']],
            ['tipo' => 'MJ', 'dias' => ['Martes', 'Jueves']],
        ];

        foreach ($combinacionesNormales as $combinacion) {
            $tipo = $combinacion['tipo'];
            foreach ($combinacion['dias'] as $dia) {
                // ---- TURNO MAÑANA ----
                $horaInicio = Carbon::createFromTime(7, 0, 0);

                while (
                    $horaInicio->copy()->addMinutes(90)->hour < 14 ||
                    ($horaInicio->copy()->addMinutes(90)->hour == 14 && $horaInicio->copy()->addMinutes(90)->minute == 0)
                ) {
                    $horaFin = $horaInicio->copy()->addMinutes(90);

                    ScheduleBlock::create([
                        'day' => $dia,
                        'start_time' => $horaInicio->format('H:i:s'),
                        'end_time' => $horaFin->format('H:i:s'),
                        'shift' => 'Manana',
                        'schedule_type' => $tipo
                    ]);

                    $horaInicio = $horaFin;
                }
                // ---- TURNO TARDE ----
                $horaInicio = Carbon::createFromTime(14, 0, 0);
                while (
                    $horaInicio->copy()->addMinutes(90)->hour < 21 ||
                    ($horaInicio->copy()->addMinutes(90)->hour == 21 && 
                    $horaInicio->copy()->addMinutes(90)->minute == 0)) {
                    
                    $horaFin = $horaInicio->copy()->addMinutes(90);

                    ScheduleBlock::create([
                        'day' => $dia,
                        'start_time' => $horaInicio->format('H:i:s'),
                        'end_time' => $horaFin->format('H:i:s'),
                        'shift' => 'Tarde',
                        'schedule_type' => $tipo
                    ]);

                    $horaInicio = $horaFin;
                }
            }
        }

        // Blque de día intensivos (Sabados)
        $horaInicioSabado = Carbon::createFromTime(9, 0, 0);
        while (
            $horaInicioSabado->copy()->addHours(3)->hour < 18 ||
            ($horaInicioSabado->copy()->addHours(3)->hour == 18 && 
            $horaInicioSabado->copy()->addHours(3)->minute == 0)) {
            
            $horaFinSabado = $horaInicioSabado->copy()->addHours(3);

            ScheduleBlock::create([
                'day' => 'Sabado',
                'start_time' => $horaInicioSabado->format('H:i:s'),
                'end_time' => $horaFinSabado->format('H:i:s'),
                'shift' => 'Manana',
                'schedule_type' => 'Intensivo'
            ]);

            $horaInicioSabado = $horaFinSabado;
        }
    }
}
