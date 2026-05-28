<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [

        'level_id',

        'teacher_id',

        'classroom_id',

        'modality',

        'schedule_type',

        'shift',

        'max_students',

        'status',

        'group_key'
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function students()
    {
        return $this->belongsToMany(
            Student::class,
            'group_student',
            'group_id',
            'student_id'
        );
    }
}