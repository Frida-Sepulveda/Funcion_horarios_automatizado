<?php

namespace App\Http\Controllers;

use App\Models\AcademicGroup;
use App\Models\Schedule;
use App\Models\ScheduleBlock;
use Illuminate\Support\Facades\DB;
use App\Models\Teacher;
use App\Models\Classroom;

class ScheduleGenerationController extends Controller
{
    public function generate()
    {
        DB::beginTransaction();

        try {

            $groups = AcademicGroup::with('schedules')->get();

            foreach ($groups as $group) {

                if ($group->schedules()->exists()) {
                    continue;
                }

                $blocks = ScheduleBlock::where('schedule_type', $group->schedule_type)
                    ->where(
                        'shift',
                        $group->shift
                    )
                    ->orderBy('day')
                    ->orderBy('start_time')
                    ->get();

                /*Agrupar bloques por hora*/

                $groupedBlocks = $blocks->groupBy(function ($block) {

                    return $block->start_time . '-' . $block->end_time;
                });

                /*Buscar conjunto disponible*/

                foreach ($groupedBlocks as $time => $timeBlocks) {

                    $occupied = false;

                    /*Verificar si alguno ya está ocupado*/

                    foreach ($timeBlocks as $block) {

                        $exists = Schedule::where('schedule_block_id',$block->id)
                        ->exists();

                        if ($exists) {

                            $occupied = true;

                            break;
                        }
                    }

                    /*Si todos están libres*/

                    if (!$occupied) {

                        foreach ($timeBlocks as $block) {

                            Schedule::create([

                                'group_id' => $group->id,

                                'schedule_block_id' => $block->id,
                            ]);
                        }

                        /*Ya asignamos horario completo*/

                        break;
                    }
                }
                /*Buscar docente disponible*/
                $group->load('schedules');

                $teacher = Teacher::where('status','Activo')
                    ->where(
                        'modality',
                        $group->modality
                    )
                    ->whereDoesntHave('groups.schedules', function ($query) use ($group) {

                        $query->whereIn(
                            'schedule_block_id',
                            $group->schedules->pluck('schedule_block_id')
                        );
                    })
                    ->first();

                /*Asignar docente*/

                if ($teacher) {

                    $group->teacher_id = $teacher->id;

                    $group->save();
                }

                /*Buscar aula disponible*/

                $classroom = Classroom::where('status', 'Disponible')

                    ->where(
                        'type',
                        $group->modality
                    )

                    ->where(
                        'max_capacity',
                        '>=',
                        $group->students()->count()
                    )

                    ->whereDoesntHave('groups.schedules', function ($query) use ($group) {

                        $query->whereIn(
                            'schedule_block_id',
                            $group->schedules->pluck('schedule_block_id')
                        );
                    })

                    ->first();

                /*Asignar aula*/

                if ($classroom) {

                    $group->classroom_id = $classroom->id;

                    $group->save();
                }
            }

            DB::commit();

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Horarios generados correctamente.'
                );
        } catch (\Exception $e) {

            DB::rollBack();

            dd($e->getMessage());
        }
    }
}