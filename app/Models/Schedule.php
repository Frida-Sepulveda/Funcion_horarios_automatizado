<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'group_id',
        'teacher_id',
        'classroom_id',
        'schedule_block_id',
        'status'
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function group()
    {
        return $this->belongsTo(GroupTable::class);
    }

    public function scheduleBlock()
    {
        return $this->belongsTo(ScheduleBlock::class);
    }
}
