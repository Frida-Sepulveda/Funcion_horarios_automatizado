<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupStudents extends Model
{
    protected $table = 'group_students';

    protected $fillable = [
        'group_id',
        'student_id',
    ];

    public function academicgroup()
    {
        return $this->belongsTo(AcademicGroup::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
