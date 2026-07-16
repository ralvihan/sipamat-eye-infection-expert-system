<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('diagnoses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('patient_name');
            $table->integer('patient_age')->nullable();
            $table->enum('patient_gender', ['male', 'female'])->nullable();
            // Hasil CF kombinasi per penyakit (JSON array)
            // e.g. [{"disease_id":1,"disease_name":"...","cf_combined":0.72}]
            $table->json('results');
            $table->boolean('uses_contact_lens')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('diagnoses');
    }
};