<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherAvailability extends Model
{
    protected $fillable = [
        'teacher_id',
        'day',
        'start_time',
        'end_time'
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
