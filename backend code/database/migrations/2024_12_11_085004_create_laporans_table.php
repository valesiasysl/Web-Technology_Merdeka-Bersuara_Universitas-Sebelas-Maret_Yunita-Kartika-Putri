<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('laporans', function (Blueprint $table) {
            $table->id('laporan_id'); // Primary Key
            $table->string('email_pelapor'); // Email of the reporter
            $table->timestamp('tanggal_laporan')->useCurrent(); // Date of the report, defaults to current timestamp
            $table->enum('jenis_laporan', ['pengaduan', 'aspirasi', 'permintaan informasi']); // Type of report (complaint, aspiration, request)
            $table->string('judul_laporan'); // Title of the report
            $table->text('isi_laporan'); // Content of the report
            $table->string('tempat_kejadian'); // Location of the incident
            $table->string('bukti_laporan'); // Evidence (could be a URL or file path for image/PDF)
            $table->enum('status_laporan', ['dalam ajuan', 'dalam proses', 'selesai'])->default('dalam ajuan'); // Status of the report (under review, in process, finished)
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('laporans');
    }
};
