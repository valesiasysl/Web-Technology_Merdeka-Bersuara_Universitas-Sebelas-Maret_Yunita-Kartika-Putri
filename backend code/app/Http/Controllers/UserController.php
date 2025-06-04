<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // Menampilkan semua user
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    // Menyimpan user baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'username_user' => 'required|string|max:255',
            'email_user' => 'required|email|unique:users,email_user',
            'password_user' => 'required|string|min:6',
            'status_akun_user' => 'required|in:aktif,nonaktif',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menyimpan user baru
        $user = User::create([
            'username_user' => $request->username_user,
            'email_user' => $request->email_user,
            'password_user' => Hash::make($request->password_user), // Enkripsi password
            'status_akun_user' => $request->status_akun_user,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User berhasil disimpan.',
            'data' => $user
        ], 201);
    }

    // Menampilkan user berdasarkan ID
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan.',
            ], 404);
        }

        return response()->json($user, 200);
    }

    // Memperbarui data user
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan.',
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'username_user' => 'nullable|string|max:255',
            'email_user' => 'nullable|email|unique:users,email_user,' . $id,
            'password_user' => 'nullable|string|min:6',
            'status_akun_user' => 'required|in:aktif,nonaktif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Update data user
        $user->update([
            'username_user' => $request->username_user ?? $user->username_user,
            'email_user' => $request->email_user ?? $user->email_user,
            'password_user' => $request->password_user ? Hash::make($request->password_user) : $user->password_user,
            'status_akun_user' => $request->status_akun_user,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User berhasil diperbarui.',
            'data' => $user
        ], 200);
    }

    // Menghapus user berdasarkan ID
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan.',
            ], 404);
        }

        // Menghapus user
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User berhasil dihapus.',
        ], 200);
    }
}
