<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('artikels', function (Blueprint $table) {
            $table->id('artikel_id'); // Primary Key
            $table->string('judul_artikel'); // Title of the article
            $table->text('isi_artikel'); // Content of the article
            $table->timestamp('tanggal_terbit')->useCurrent(); // Publish date, defaults to current timestamp
            $table->string('gambar_artikel')->nullable(); // Optional image for the article (URL or file path)
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('artikels');
    }
};
