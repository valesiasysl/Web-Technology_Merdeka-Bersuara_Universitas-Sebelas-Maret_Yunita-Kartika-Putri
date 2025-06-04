<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Admin extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'admins';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'email_admin',
        'password_admin',
        'status_akun_admin',
    ];

    // Jika ingin format tanggal diubah, misalnya 'created_at' atau 'updated_at'
    // protected $dateFormat = 'Y-m-d H:i:s';

    // Aksesors untuk memformat status akun admin
    public function getStatusAkunAdminAttribute($value)
    {
        return ucfirst($value);  // Mengubah status akun menjadi kapital pertama ('aktif' => 'Aktif')
    }

    // Mutator untuk memformat password admin sebelum disimpan (misalnya enkripsi password)
    public function setPasswordAdminAttribute($value)
    {
        $this->attributes['password_admin'] = bcrypt($value); // Enkripsi password sebelum disimpan
    }
}
