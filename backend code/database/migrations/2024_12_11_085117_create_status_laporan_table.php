<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('status_laporans', function (Blueprint $table) {
            $table->id('status_laporan_id'); // Primary Key
            $table->string('nama_status_laporan'); // Name of the status (e.g., 'Pending', 'In Process', 'Completed')
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('status_laporans');
    }
};
