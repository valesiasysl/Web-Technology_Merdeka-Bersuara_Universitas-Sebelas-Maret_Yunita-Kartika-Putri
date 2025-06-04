<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('chat_konsultasis', function (Blueprint $table) {
            $table->id('chat_id'); // Primary Key
            $table->foreignId('pengirim_id');// Foreign key linking to the users table
            $table->foreignId('penerima_id'); // Foreign key linking to the advokats table
            $table->text('message'); // Message sent in the chat
            $table->enum('status_chat', ['berlangsung', 'berakhir'])->default('berlangsung'); // Status of the chat (ongoing or ended)
            $table->timestamp('tanggal_chat')->useCurrent(); // Timestamp of when the chat message was sent
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('chat_konsultasis');
    }
};
