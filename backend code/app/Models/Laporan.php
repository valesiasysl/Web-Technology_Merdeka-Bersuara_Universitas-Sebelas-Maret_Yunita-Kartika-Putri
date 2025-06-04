<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Laporan extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'laporans';
    protected $primaryKey = 'laporan_id';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'email_pelapor',
        'tanggal_laporan',
        'jenis_laporan',
        'judul_laporan',
        'isi_laporan',
        'tempat_kejadian',
        'bukti_laporan',
        'status_laporan',
    ];

    // Menambahkan aksesors dan mutators untuk tanggal
    protected $dates = ['tanggal_laporan'];

    // Aksesors untuk memformat tanggal_laporan
    public function getTanggalLaporanAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');  // Format tanggal menjadi 'Y-m-d'
    }

    // Aksesors untuk memformat bukti_laporan (misalnya, untuk mendapatkan URL gambar atau file)
    public function getBuktiLaporanAttribute($value)
    {
        return asset('storage/' . $value);  // Misalnya, jika bukti disimpan di folder 'storage'
    }
}
