<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleBlock extends Model
{
    use HasFactory;
    protected $fillable = [
        'day',
        'start_time',
        'end_time',
        'turno',
        'tipo_horario'
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
