<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupTable extends Model
{
    protected $table = 'groups_table';

    protected $fillable = [
        'group_key',
        'sublevel',
        'modalidad',
        'tipo_horario',
        'turno',
        'min_students',
        'max_students',
        'total_students',
        'status'
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class, 'group_students', 'group_id', 'student_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'group_id');
    }
}
