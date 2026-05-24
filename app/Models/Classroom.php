<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $fillable = [
        'name',
        'building',
        'capacity',
        'type',
        'status'
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
