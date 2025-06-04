<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pengaduan', function (Blueprint $table) {
            $table->id(); // ID otomatis untuk setiap pengaduan
            $table->string('keterangan_masalah');
            $table->string('foto_pengaduan');
            $table->date('tanggal_pengaduan'); // Tanggal pengaduan
            $table->string('foto_penyelesaian') -> nullable();
            $table->date('tanggal_penyelesaian')->nullable();
            $table->enum('status', ['Proses', 'Selesai']); // Status pengaduan

            $table->timestamps(); // Menyimpan waktu dibuat dan diperbarui
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pengaduan');
    }
};