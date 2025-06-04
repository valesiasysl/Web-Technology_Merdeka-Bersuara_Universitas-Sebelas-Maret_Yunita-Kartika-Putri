<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasFactory;

    protected $table = 'news'; // Nama tabel yang digunakan

    protected $fillable = [
        'judul_berita',
        'image',
        'tanggal_berita',
        'URL'
    ];

    // Jika ada relasi, kamu bisa mendefinisikannya di sini
    // Contoh:
    // public function comments()
    // {
    //     return $this->hasMany(Comment::class);
    // }
}