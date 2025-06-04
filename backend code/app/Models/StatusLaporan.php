<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusLaporan extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'status_laporans';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'nama_status_laporan',
        'keterangan_laporan',
    ];

    // Aksesors untuk memformat nama_status_laporan
    public function getNamaStatusLaporanAttribute($value)
    {
        return ucfirst($value);  // Mengubah nama_status_laporan menjadi kapital pertama ('dalam ajuan' => 'Dalam ajuan')
    }

    // Aksesors untuk memformat keterangan_laporan
    public function getKeteranganLaporanAttribute($value)
    {
        return ucfirst($value);  // Mengubah keterangan_laporan menjadi kapital pertama
    }
}
