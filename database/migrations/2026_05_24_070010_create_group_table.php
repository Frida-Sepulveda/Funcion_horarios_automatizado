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
        Schema::create('groups', function (Blueprint $table) {

            $table->id();

            /*INFORMACIÓN ACADÉMICA*/

            $table->foreignId('level_id')
                ->constrained()
                ->cascadeOnDelete();

            /*DOCENTE*/

            $table->foreignId('teacher_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            /*AULA*/

            $table->foreignId('classroom_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            /*CONFIGURACIÓN DEL CURSO*/

            $table->enum('modality', [
                'Presencial',
                'Virtual'
            ]);

            $table->enum('schedule_type', [
                'LM',
                'MJ',
                'Intensivo'
            ]);

            $table->enum('shift', [
                'Manana',
                'Tarde'
            ]);

            /*CAPACIDAD*/

            $table->integer('max_students')
                ->default(25);

            /*CONTROL*/

            $table->enum('status', [

                'Planeado',

                'Abierto',

                'Cerrado',

                'Finalizado'
            ])->default('Planeado');

            /*OPCIONAL*/

            $table->string('group_key')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_tables');
    }
};
