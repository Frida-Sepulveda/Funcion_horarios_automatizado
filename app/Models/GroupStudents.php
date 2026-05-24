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

    public function group()
    {
        return $this->belongsTo(GroupTable::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
