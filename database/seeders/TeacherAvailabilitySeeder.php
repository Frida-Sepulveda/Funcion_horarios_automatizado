<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Teacher;
use App\Models\ScheduleBlock;
use App\Models\TeacherAvailability;

class TeacherAvailabilitySeeder extends Seeder
{
    public function run(): void
    {
        $teachers = Teacher::all();

        $blocks = ScheduleBlock::all();

        foreach ($teachers as $teacher) {

            /*
            Cada docente tendrá entre 5 y 15 bloques disponibles
            */

            $randomBlocks = $blocks->random(
                rand(5, 15)
            );

            foreach ($randomBlocks as $block) {

                TeacherAvailability::create([

                    'teacher_id' => $teacher->id,

                    'schedule_block_id' => $block->id,

                    'is_available' => true,
                ]);
            }
        }
    }
}