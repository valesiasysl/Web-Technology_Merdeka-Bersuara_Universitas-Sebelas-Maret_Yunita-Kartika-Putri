<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('advokats', function (Blueprint $table) {
            $table->id('advokat_id'); // Primary Key
            $table->string('email_advokat')->unique(); // Unique email for advocate login
            $table->string('password_advokat'); // Password for advocate authentication
            $table->string('nama_advokat'); // Full name of the advocate
            $table->string('no_kta'); // Advocate's KTA number
            $table->string('spesialisasi'); // Legal specialization of the advocate
            $table->enum('ketersediaan', ['ada', 'tidak']); // Availability of the advocate
            $table->text('bio_advokat'); // Biography of the advocate
            $table->string('foto_advokat')->nullable(); // Optional photo (URL or file path)
            $table->enum('status_akun_advokat', ['aktif', 'nonaktif'])->default('aktif'); // Account status
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('advokats');
    }
};
