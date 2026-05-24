<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;
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
