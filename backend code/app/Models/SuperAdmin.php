<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuperAdmin extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'superadmins';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'email_superadmin',
        'password_superadmin',
        'status_akun_superadmin',
    ];

    // Aksesors untuk memformat status akun
    public function getStatusAkunSuperadminAttribute($value)
    {
        return ucfirst($value);  // Mengubah status akun menjadi kapital pertama ('aktif' => 'Aktif')
    }

    // Mutator untuk memformat password_superadmin sebelum disimpan (misalnya enkripsi password)
    public function setPasswordSuperadminAttribute($value)
    {
        $this->attributes['password_superadmin'] = bcrypt($value); // Enkripsi password sebelum disimpan
    }
}
