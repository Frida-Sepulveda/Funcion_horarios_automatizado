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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('matricula')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->enum('sublevel',[
                'A1',
                'A2',
                'B1',
                'B2',
                'C1',
                'C2'
            ]);
            $table->enum('modalidad', [
                'Presencial',
                'Virtual'
            ]);
            $table->enum('tipo_horario', [
                'LM',
                'MJ',
                'Intensivo'
            ]);
            $table->enum('turno', [
                'Manana',
                'Tarde'
            ]);
            $table->enum('status', [
                'Inscrito',
                'Baja'
            ])->default('Inscrito');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
