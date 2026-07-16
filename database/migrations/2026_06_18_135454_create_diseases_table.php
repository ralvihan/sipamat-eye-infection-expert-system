<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('diseases', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // e.g. P001
            $table->string('name');
            $table->text('description');
            $table->text('solution');       // saran penanganan
            $table->boolean('need_referral')->default(false); // perlu rujuk dokter?
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('diseases');
    }
};