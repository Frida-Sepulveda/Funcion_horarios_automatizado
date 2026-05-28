<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [

        'group_id',

        'schedule_block_id',
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function scheduleBlock()
    {
        return $this->belongsTo(ScheduleBlock::class);
    }
}