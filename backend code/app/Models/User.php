<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'users';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'username_user',
        'email_user',
        'password_user',
        'status_akun_user',
    ];

    // Tentukan kolom yang harus disembunyikan, seperti password dan token
    protected $hidden = [
        'password_user',
        'remember_token', // Ini untuk penggunaan otentikasi berbasis token (seperti Sanctum)
    ];

    // Kolom-kolom yang perlu dipertimbangkan untuk casting data
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Mutator untuk menyimpan password yang sudah terenkripsi
     */
    public function setPasswordUserAttribute($value)
    {
        // Enkripsi password saat menyimpan ke database
        $this->attributes['password_user'] = bcrypt($value);
    }
}
