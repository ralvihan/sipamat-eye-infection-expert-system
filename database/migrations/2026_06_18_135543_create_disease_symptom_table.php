<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tabel pivot: relasi penyakit <-> gejala beserta nilai CF pakar
        Schema::create('disease_symptom', function (Blueprint $table) {
            $table->id();
            $table->foreignId('disease_id')->constrained()->onDelete('cascade');
            $table->foreignId('symptom_id')->constrained()->onDelete('cascade');
            // CF pakar (nilai dari pakar/analis, range 0.0 - 1.0)
            $table->decimal('cf_expert', 3, 2);
            $table->timestamps();

            $table->unique(['disease_id', 'symptom_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disease_symptom');
    }
};