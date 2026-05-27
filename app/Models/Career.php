<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $fillable = [
        'name',
        'study_plan'
    ];

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
