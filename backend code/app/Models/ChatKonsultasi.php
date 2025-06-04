<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ChatKonsultasi extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi nama tabel
    protected $table = 'chat_konsultasis';

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'user_id',
        'advokat_id',
        'message',
        'status_chat',
        'tanggal_chat',
    ];

    // Menambahkan aksesors dan mutators untuk tanggal
    protected $dates = ['tanggal_chat'];

    // Aksesors untuk memformat tanggal_chat
    public function getTanggalChatAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');  // Format tanggal menjadi 'Y-m-d H:i:s'
    }

    // Aksesors untuk memformat status_chat
    public function getStatusChatAttribute($value)
    {
        return ucfirst($value);  // Mengubah status_chat menjadi kapital pertama ('berlangsung' => 'Berlangsung')
    }

    // Relasi ke tabel User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi ke tabel Advokat
    public function advokat()
    {
        return $this->belongsTo(Advokat::class, 'advokat_id');
    }
}
