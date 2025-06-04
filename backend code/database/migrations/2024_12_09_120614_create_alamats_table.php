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
        Schema::create('alamats', function (Blueprint $table) {
            $table->id();
            $table->string('alamat'); // Kolom untuk alamat
            $table->float('longitude')->default(0)->nullable(); // Kolom untuk longitude (menggunakan tipe data decimal untuk presisi)
            $table->float('latitude')->default(0)->nullable(); // Kolom untuk latitude (menggunakan tipe data decimal untuk presisi)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alamats');
    }
};
