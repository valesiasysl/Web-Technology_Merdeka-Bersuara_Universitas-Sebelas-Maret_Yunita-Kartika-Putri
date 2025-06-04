<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('superadmins', function (Blueprint $table) {
            $table->id('superadmin_id'); // Primary Key
            $table->string('email_superadmin')->unique(); // Unique email for superadmin login
            $table->string('password_superadmin'); // Password for superadmin authentication
            $table->enum('status_akun_superadmin', ['aktif', 'nonaktif'])->default('aktif'); // Account status (active or inactive)
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('superadmins');
    }
};
