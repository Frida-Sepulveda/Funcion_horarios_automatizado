<?php
/* Ya no es necesario usar este archivo, lo dejo por si las dudas jajaja*/

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Teacher;
use App\Models\ScheduleBlock;

class TeacherAvailabilityFactory extends Factory
{
    public function definition(): array
    {
        return [

            'teacher_id' => Teacher::query()
                ->inRandomOrder(null)
                ->value('id'),

            'schedule_block_id' => ScheduleBlock::query()
                ->inRandomOrder(null)
                ->value('id'),

            'is_available' => true,
        ];
    }
}