<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // Primary Key
            $table->string('username_user'); // Username for login
            $table->string('email_user')->unique(); // Unique email for user
            $table->string('password_user'); // Password for authentication
            $table->timestamp('tanggal_daftar_user')->useCurrent(); // Registration date, defaults to current timestamp
            $table->enum('status_akun_user', ['aktif', 'nonaktif'])->default('aktif'); // Account status (active or inactive)
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
