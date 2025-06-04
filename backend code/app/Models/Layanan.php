<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari plural model (optional)
    protected $table = 'layanans';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'kategori',
        'alamat',
        'tanggal',
        'status',
    ];

    // Tentukan kolom yang tidak dapat diisi (optional)
    // protected $guarded = ['id'];

    // Jika kamu ingin format tanggal diubah, misalnya 'created_at' atau 'updated_at'
    // protected $dateFormat = 'Y-m-d H:i:s';
}
