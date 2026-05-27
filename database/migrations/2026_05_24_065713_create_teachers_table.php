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
        Schema::create('teachers', function (Blueprint $table) {

            $table->id();

            // Datos personales
            $table->string('first_name');

            $table->string('last_name');

            $table->string('email')
                ->unique();

            $table->string('phone')
                ->nullable();

            // Categoría
            $table->enum('category', [
                'A',
                'B',
                'C'
            ]);

            // Nivel MCER
            $table->enum('mcer_level', [
                'A1',
                'A2',
                'B1',
                'B2',
                'C1',
                'C2'
            ]);

            // Datos administrativos
            $table->string('rfc')
                ->nullable()
                ->unique();

            $table->string('curp')
                ->nullable()
                ->unique();

            $table->string('bank_clabe', 18)
                ->nullable();

            $table->integer('ttc_hours')
                ->default(0);

            $table->string('academic_degree')
                ->nullable();

            $table->boolean('is_native')
                ->default(false);

            /*
            DATOS DEL SISTEMA
            */

            $table->enum('modality', [
                'Presencial',
                'Virtual',
                'Mixta'
            ]);

            $table->integer('max_hours')
                ->default(20);

            $table->integer('current_hours')
                ->default(0);

            $table->enum('status', [
                'Activo',
                'Inactivo'
            ])->default('Activo');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
