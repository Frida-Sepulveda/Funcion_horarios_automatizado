<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherAvailability extends Model
{
    use HasFactory;
    protected $fillable = [
        'teacher_id',
        'schedule_block_id',
        'is_available'
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function scheduleBlock()
    {
        return $this->belongsTo(ScheduleBlock::class);
    }
}
