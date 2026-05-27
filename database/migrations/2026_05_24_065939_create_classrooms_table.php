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
        Schema::create('classrooms', function (Blueprint $table) {

            $table->id();

            $table->string('name');

            $table->string('building')->nullable();

            $table->integer('max_capacity');

            $table->enum('type', [
                'Presencial',
                'Virtual'
            ]);

            $table->string('platform')->nullable();

            $table->enum('status', [
                'Disponible',
                'Mantenimiento',
                'Inactiva'
            ])->default('Disponible');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classrooms');
    }
};
