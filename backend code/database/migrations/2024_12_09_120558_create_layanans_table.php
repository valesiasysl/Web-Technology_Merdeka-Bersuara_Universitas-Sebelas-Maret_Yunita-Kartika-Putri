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
        Schema::create('layanans', function (Blueprint $table) {
            $table->id();
            $table->enum('kategori', ['rumah tangga', 'industri']); // Kolom kategori dengan opsi 'rumah tangga' dan 'industri'
            $table->string('alamat'); // Kolom untuk alamat
            $table->date('tanggal'); // Kolom untuk tanggal
            $table->enum('status', ['diajukan', 'proses', 'selesai']); // Kolom status dengan opsi yang ditentukan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanans');
    }
};
