<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    protected $fillable = [

        'first_name',

        'last_name',

        'email',

        'phone',

        'category',

        'mcer_level',

        'rfc',

        'curp',

        'bank_clabe',

        'ttc_hours',

        'academic_degree',

        'is_native',

        'modality',

        'max_hours',

        'current_hours',

        'status'
    ];

    public function availabilities()
    {
        return $this->hasMany(TeacherAvailability::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
