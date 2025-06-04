<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class userSeeder extends Seeder
{
    public function run()
    {
        // Seeder untuk role 'superadmin'
        User::create([
            'username' => 'superadmin',
            'email' => 'superadmin@example.com',
            'no_telp' => null, // nomor telepon
            'role' => 'superadmin', // role superadmin
            'password' => Hash::make('password123'), // password
        ]);

        // Seeder untuk role 'admin'
        User::create([
            'username' => 'adminuser',
            'email' => 'admin@example.com',
            'no_telp' => null, // nomor telepon
            'role' => 'admin', // role admin
            'password' => Hash::make('password123'), // password
        ]);
    }
}
