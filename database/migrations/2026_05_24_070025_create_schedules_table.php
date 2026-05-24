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
        Schema::create('schedules', function (Blueprint $table) {

            $table->id();

            $table->foreignId('group_id')
                ->constrained('groups_table')
                ->onDelete('cascade');

            $table->foreignId('teacher_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('classroom_id')
                ->nullable()
                ->constrained()
                ->onDelete('set null');

            $table->foreignId('schedule_block_id')
                ->constrained()
                ->onDelete('cascade');

            $table->enum('status', [
                'Activo',
                'Reprogramado'
            ])->default('Activo');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
