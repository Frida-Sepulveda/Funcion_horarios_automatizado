<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'modalidad',
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
