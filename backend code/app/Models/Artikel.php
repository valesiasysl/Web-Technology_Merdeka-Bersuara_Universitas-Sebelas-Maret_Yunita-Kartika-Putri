<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    use HasFactory;

    // Specify the table name (if not pluralized automatically)
    protected $table = 'artikels';

    // Specify the primary key column
    protected $primaryKey = 'artikel_id';

    // Disable auto-incrementing if artikel_id is not auto-incremented
    public $incrementing = true;

    // Specify the primary key type
    protected $keyType = 'int';

    // Allow mass assignment for the following columns
    protected $fillable = [
        'judul_artikel',
        'isi_artikel',
        'tanggal_terbit',
        'gambar_artikel',
    ];
}
