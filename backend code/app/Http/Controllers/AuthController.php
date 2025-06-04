<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register function
// Register function
public function register(Request $request)
{
    // Validasi input
    $validator = Validator::make($request->all(), [
        'username' => 'required|string|max:255|unique:users',
        'email' => 'required|string|email|max:255|unique:users',
        'no_telp' => 'required',
        'password' => 'required|string|min:8|confirmed',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal',
            'errors' => $validator->errors(),
        ], 422);
    }

    // Tentukan role default sebagai 'pengunjung'
    $role = 'pengguna';

    // Buat pengguna baru
    $user = User::create([
        'username' => $request->username,
        'email' => $request->email,
        'no_telp' => $request->no_telp,
        'role' => $role, // Role otomatis ditetapkan ke 'pengunjung'
        'password' => Hash::make($request->password),
    ]);

    return response()->json(['message' => 'User registered successfully', 'data' => $user], 200);
}

    // Login function
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Find user by username
        $user = User::where('username', $request->username)->first();

        // Validate user and password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Username atau password salah!', 'error' => 'Invalid credentials'], 422);
        }

        // Create a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Logout function
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful.',
        ], 200);
    }
}
