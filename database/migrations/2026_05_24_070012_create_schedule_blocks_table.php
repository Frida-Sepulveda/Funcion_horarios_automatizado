<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedule_blocks', function (Blueprint $table) {

            $table->id();

            $table->string('day');

            $table->time('start_time');

            $table->time('end_time');

            $table->enum('shift', [
                'Manana',
                'Tarde'
            ]);

            $table->enum('schedule_type', [
                'LM',
                'MJ',
                'Intensivo'
            ]);

            $table->unique([
                'day', 
                'start_time', 
                'end_time',
                'shift', 
                'schedule_type'],
                'schedule_block_unique');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_blocks');
    }
};
