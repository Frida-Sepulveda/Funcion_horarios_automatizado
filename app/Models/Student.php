<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;
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
