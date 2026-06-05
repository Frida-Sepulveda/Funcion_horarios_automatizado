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

            DB::transaction(function () {

                $students = Student::with(['career', 'level'])
                    ->where('status', 'Elegible')
                    ->get();


                $groupedStudents = $students->groupBy(function ($student) {

                    return
                        $student->level_id .
                        '-' .
                        $student->modality;
                });


                foreach ($groupedStudents as $groupStudents) {


                    $chunks = $groupStudents->chunk(25);

                    foreach ($chunks as $index => $chunk) {

                        $firstStudent = $chunk->first();

                        /*
                        GENERAR CLAVE DEL GRUPO
                        */

                        $groupKey =
                            $firstStudent->level->name .
                            '-' .
                            str_pad($index + 1, 2, '0', STR_PAD_LEFT);


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
                        /* Mas adelante se recomienda cambiar attach()
                        por sync() para inserciones masivas, de momento 
                        nosotras lo dejas así para el proyecto*/
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
}