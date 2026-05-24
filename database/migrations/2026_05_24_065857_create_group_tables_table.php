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
        Schema::create('groups_table', function (Blueprint $table) {

            $table->id();

            $table->string('group_key')->unique();

            $table->enum('sublevel', [
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

            $table->integer('min_students')->default(15);

            $table->integer('max_students')->default(25);

            $table->integer('total_students')->default(0);

            $table->enum('status', [
                'Activo',
                'Cancelado'
            ])->default('Activo');

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
