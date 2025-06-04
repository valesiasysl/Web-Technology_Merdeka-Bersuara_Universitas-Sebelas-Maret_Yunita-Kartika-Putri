<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id('admin_id'); // Primary Key
            $table->string('email_admin')->unique(); // Unique email for admin login
            $table->string('password_admin'); // Password for admin authentication
            $table->enum('status_akun_admin', ['aktif', 'nonaktif'])->default('aktif'); // Account status (active or inactive)
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('admins');
    }
};
