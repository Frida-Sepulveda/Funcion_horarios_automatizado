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

            // Datos personales
            $table->string('control_number')
                ->nullable()
                ->unique();

            $table->string('first_name');

            $table->string('last_name');

            $table->enum('gender', ['M', 'F']);

            $table->date('birth_date')
                ->nullable();

            // Carrera
            $table->foreignId('career_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Semestre
            $table->unsignedTinyInteger('semester')
                ->nullable();

            // Nivel institucional
            $table->foreignId('level_id')
                ->constrained();

            // Tipo alumno
            $table->enum('student_type', [
                'Vigente',
                'Egresado'
            ]);

            // Estado
            $table->enum('status', [
                'En Espera',
                'Vigente',
                'Inhabilitado',
                'En Revision',
                'Acreditado',
                'Elegible',
                'Liberado'
            ])->default('En Espera');

            // Acreditación
            $table->string('accreditation_origin')
                ->nullable();

            $table->date('accreditation_date')
                ->nullable();

            /*
            DATOS TEMPORALES DE INSCRIPCION
            */

            $table->enum('modality', [
                'Presencial',
                'Virtual'
            ])->nullable();

            $table->enum('schedule_type', [
                'LM',
                'MJ',
                'Intensivo'
            ])->nullable();

            $table->enum('shift', [
                'Manana',
                'Tarde'
            ])->nullable();

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
