<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'matricula',
        'first_name',
        'last_name',
        'email',
        'sublevel',
        'modalidad',
        'tipo_horario',
        'turno',
        'status',
    ];

    public function groups()
    {
        return $this->belongsToMany(GroupTable::class,
         'group_students', 'student_id', 'group_id');
    }
}
