<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\AcademicGroup;
use Illuminate\Support\Facades\DB;

class GroupGenerationController extends Controller
{
    public function generate()
    {
        try {
            $existingGroups = AcademicGroup::exists();

            if ($existingGroups) {

                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Ya existen grupos generados. Primero debes limpiar los grupos actuales.'
                    );
            }

            DB::transaction(function () {

                $students = Student::with(['career', 'level'])
                    ->where('status', 'Elegible')
                    ->get();


                $groupedStudents = $students->groupBy(function ($student) {

                    return $student->level_id . '-' .
                        $student->modality . '-' .
                        $student->schedule_type . '-' .
                        $student->shift;
                });
                {/* PARA COMPROBAR CUANTOS ALUMNOS HAY EN CADA NIVEL
                dd(
                    $groupedStudents->map(fn($group) => $group->count())
                );*/}

                foreach ($groupedStudents as $groupStudents) {
                    if ($groupStudents->count() < 15) {
                        continue;
                    }

                    $chunks = $groupStudents->chunk(25);

                    foreach ($chunks as $index => $chunk) {

                        /*Evitar grupos menores a 15 alumnos*/

                        if ($chunk->count() < 15) {
                            continue;
                        }

                        $firstStudent = $chunk->first();

                        $groupCount = AcademicGroup::where('level_id', $firstStudent->level_id)
                        ->count() + 1;

                        $groupKey =
                            $firstStudent->level->name .
                            '-' .
                            $firstStudent->schedule_type .
                            '-' .
                            substr($firstStudent->shift, 0, 1) .
                            '-' .
                            str_pad($groupCount, 2, '0', STR_PAD_LEFT);

                        $existingGroup = AcademicGroup::where('group_key', $groupKey)
                            ->exists();

                        if ($existingGroup) {
                            continue;
                        }

                        $group = AcademicGroup::create([

                            'level_id' => $firstStudent->level_id,

                            'modality' => $firstStudent->modality,

                            'schedule_type' =>
                            $firstStudent->schedule_type
                                ?? 'LM',

                            'shift' =>
                            $firstStudent->shift
                                ?? 'Manana',

                            'max_students' => 25,

                            'status' => 'Planeado',

                            'group_key' => $groupKey,
                        ]);

                        foreach ($chunk as $student) {

                            $group->students()->attach($student->id);
                        }
                    }
                }
            });

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Grupos generados correctamente.'
                );

        } catch (\Exception $e) {

            return redirect()
                ->back()
                ->with(
                    'error',
                    'Error al generar grupos: ' . $e->getMessage()
                );
        }
    }

    public function clear()
    {
        DB::transaction(function () {

            DB::table('schedules')->delete();

            DB::table('group_students')->delete();

            DB::table('groups')->delete();
        });

        return redirect()
            ->back()
            ->with(
                'success',
                'Grupos eliminados correctamente.'
            );
    }
}