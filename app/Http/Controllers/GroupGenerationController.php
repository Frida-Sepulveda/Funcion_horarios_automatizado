<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupGenerationController extends Controller
{
    public function generate()
    {
        DB::beginTransaction();

        try {

            $students = Student::with(['career', 'level'])
            ->where('status', 'Elegible')
            ->get();

            /*$students = Student::where('status', 'Elegible')
                ->with('level')
                ->get(); */

            $grouped = $students->groupBy(function ($student) {

                return $student->level_id . '-' . $student->modality;

            });


            foreach ($grouped as $key => $groupStudents) {


                $chunks = $groupStudents->chunk(25);

                foreach ($chunks as $index => $chunk) {

                    $firstStudent = $chunk->first();


                    $group = Group::create([

                        'level_id' => $firstStudent->level_id,

                        'modality' => $firstStudent->modality,

                        'schedule_type' => 'LM',

                        'shift' => 'Manana',

                        'max_students' => 25,

                        'status' => 'Planeado',

                        'group_key' =>
                            $firstStudent->level->name .
                            '-' .
                            ($index + 1),
                    ]);

                    foreach ($chunk as $student) {

                        $group->students()->attach($student->id);

                    }
                }
            }

            DB::commit();

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Grupos generados correctamente.'
                );

        } catch (\Exception $e) {

            DB::rollBack();

            return redirect()
                ->back()
                ->with(
                    'error',
                    'Error al generar grupos.'
                );
        }
    }
}

