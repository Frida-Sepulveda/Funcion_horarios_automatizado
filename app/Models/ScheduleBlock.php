<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleBlock extends Model
{
    use HasFactory;
    protected $fillable = [
        'day',
        'start_time',
        'end_time',
        'shift',
        'schedule_type'
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
    
    public function teacherAvailabilities()
    {
        return $this->hasMany(TeacherAvailability::class);
    }
}
