<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('chatbots', function (Blueprint $table) {
            $table->id('chatbot_id'); // Primary Key
            $table->string('keyword'); // Keyword that triggers a response
            $table->text('response'); // Response given by the chatbot when the keyword is detected
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('chatbots');
    }
};
