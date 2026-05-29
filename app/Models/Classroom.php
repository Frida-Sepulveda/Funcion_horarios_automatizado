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
        'max_capacity',
        'type',
        'platform',
        'status'
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
