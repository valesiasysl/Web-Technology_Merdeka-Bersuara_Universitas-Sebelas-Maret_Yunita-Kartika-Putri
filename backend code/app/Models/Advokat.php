<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Advokat extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'advokats';
    protected $primaryKey = 'advokat_id';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'email_advokat',
        'password_advokat',
        'nama_advokat',
        'no_kta',
        'spesialisasi',
        'ketersediaan',
        'bio_advokat',
        'foto_advokat',
        'status_akun_advokat',
    ];

    // Jika ingin format tanggal diubah, misalnya 'created_at' atau 'updated_at'
    // protected $dateFormat = 'Y-m-d H:i:s';

    // Menambahkan aksesors dan mutators untuk tanggal (jika ada tanggal yang perlu diformat)
    // protected $dates = ['tanggal_lahir']; // Uncomment if there's a date field that needs formatting

    // Aksesors untuk memformat foto profil advokat
    public function getFotoAdvokatAttribute($value)
    {
        return asset('storage/' . $value);  // Misalnya, jika foto disimpan di folder 'storage'
    }

    // Aksesors untuk memformat spesialisasi advokat
    public function getSpesialisasiAttribute($value)
    {
        return ucfirst($value);  // Format spesialisasi agar huruf pertama menjadi kapital
    }

    // Aksesors untuk memformat status akun advokat
    public function getStatusAkunAdvokatAttribute($value)
    {
        return ucfirst($value);  // Mengubah status akun menjadi kapital pertama ('aktif' => 'Aktif')
    }

    // Mutator untuk memformat password advokat sebelum disimpan (misalnya enkripsi password)
    public function setPasswordAdvokatAttribute($value)
    {
        $this->attributes['password_advokat'] = bcrypt($value); // Enkripsi password sebelum disimpan
    }
}
