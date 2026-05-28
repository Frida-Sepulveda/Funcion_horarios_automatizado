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

// mi codigo 
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('no_control')->nullable(); // Nulo para externos o egresados antiguos
            $table->string('nombres');
            $table->string('apellidos');
            $table->char('genero', 1); // M o F
            $table->date('fecha_nacimiento');
            
            // Relación con Carreras
            $table->foreignId('career_id')->constrained()->onDelete('cascade');
            
            $table->integer('semestre'); // 1 al 13
            $table->integer('nivel_id'); // 1 al 10 (Básico 1 a Intermedio 5)
            $table->string('tipo_estudiante'); // Vigente o Egresado
            $table->string('estado'); // Elegible para Inscripción, Vigente, etc.
            $table->string('origen_acreditacion')->nullable();
            $table->date('fecha_acreditacion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
