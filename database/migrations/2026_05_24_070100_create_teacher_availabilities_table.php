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
        Schema::create('teacher_availabilities', function (Blueprint $table) {

            $table->id();

            $table->foreignId('teacher_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('schedule_block_id')
                ->constrained()
                ->onDelete('cascade');

            $table->boolean('is_available')->default(true);

            /*
            Evita duplicar disponibilidad
            */
            $table->unique([
                'teacher_id',
                'schedule_block_id'
            ]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_availabilities');
    }
};
