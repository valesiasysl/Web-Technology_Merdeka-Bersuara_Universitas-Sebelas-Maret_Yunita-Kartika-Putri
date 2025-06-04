<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chatbot extends Model
{
    use HasFactory;

    protected $table = 'chatbots';

    // Specify the primary key column
    protected $primaryKey = 'chatbot_id';

    // Specify the columns that are mass assignable
    protected $fillable = ['keyword', 'response'];

    // Disable auto-incrementing if the primary key is not an integer
    public $incrementing = true;

    // Specify the primary key type if not an integer
    protected $keyType = 'int';
}
