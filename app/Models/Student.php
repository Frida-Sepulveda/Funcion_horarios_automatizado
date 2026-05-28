<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [

        'control_number',

        'first_name',

        'last_name',

        'gender',

        'birth_date',

        'career_id',

        'semester',

        'level_id',

        'student_type',

        'status',

        'accreditation_origin',

        'accreditation_date',

        'modality',

        'schedule_type',

        'shift'
    ];

    public function groups()
    {
        return $this->belongsToMany(Group::class,
         'group_students', 'student_id', 'group_id');
    }

    public function career()
    {
        return $this->belongsTo(Career::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
// mi codigo 
/*class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_control', 'nombres', 'apellidos', 'genero', 'fecha_nacimiento',
        'career_id', 'semestre', 'nivel_id', 'tipo_estudiante', 'estado',
        'origen_acreditacion', 'fecha_acreditacion'
    ];

    // Relación con Carrera
    public function career()
    {
        return $this->belongsTo(Career::class);
    }
}*/
