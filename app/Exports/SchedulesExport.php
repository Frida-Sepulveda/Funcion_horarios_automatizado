<?php

namespace App\Exports;

use App\Models\AcademicGroup;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SchedulesExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return AcademicGroup::with([
            'level',
            'teacher',
            'classroom',
            'schedules.scheduleBlock'
        ])
        ->get()
        ->map(function ($group) {

            $schedule = $group->schedules
                ->map(function ($schedule) {

                    return
                        $schedule->scheduleBlock->day .
                        ' ' .
                        substr(
                            $schedule->scheduleBlock->start_time,
                            0,
                            5
                        ) .
                        '-' .
                        substr(
                            $schedule->scheduleBlock->end_time,
                            0,
                            5
                        );
                })
                ->implode(' / ');

            return [

                'Grupo' => $group->group_key,

                'Nivel' => $group->level->name ?? 'N/A',

                'Modalidad' => $group->modality,

                'Horario' => $schedule,

                'Aula' =>
                    $group->classroom->name
                    ?? 'Sin aula',

                'Docente' =>
                    $group->teacher
                    ? $group->teacher->first_name .
                        ' ' .
                        $group->teacher->last_name
                    : 'Sin docente',

                'Estado' => $group->status,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Grupo',
            'Nivel',
            'Modalidad',
            'Horario',
            'Aula',
            'Docente',
            'Estado',
        ];
    }
}