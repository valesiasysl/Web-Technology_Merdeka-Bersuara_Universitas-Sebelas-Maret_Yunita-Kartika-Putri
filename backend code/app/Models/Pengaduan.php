<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Pengaduan extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'pengaduan';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'keterangan_masalah',
        'foto_pengaduan',
        'tanggal_pengaduan',
        'foto_penyelesaian',
        'tanggal_penyelesaian',
        'status',
    ];

    // Jika ingin format tanggal diubah, misalnya 'created_at' atau 'updated_at'
    // protected $dateFormat = 'Y-m-d H:i:s';

    // Menambahkan aksesors dan mutators untuk tanggal
    protected $dates = ['tanggal_pengaduan', 'tanggal_penyelesaian'];

    // Aksesors untuk memformat tanggal_pengaduan
    public function getTanggalPengaduanAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');  // Format tanggal menjadi 'Y-m-d'
    }

    // Aksesors untuk memformat tanggal_penyelesaian jika ada
    public function getTanggalPenyelesaianAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');  // Format tanggal menjadi 'Y-m-d'
    }

    // Atau jika kamu ingin memformat foto untuk pengaduan
    public function getFotoPengaduanAttribute($value)
    {
        return asset('storage/' . $value);  // Misalnya, jika foto disimpan di folder 'storage'
    }

    // Foto untuk penyelesaian
    public function getFotoPenyelesaianAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
