<?php

namespace App\Http\Controllers;

use App\Models\SuperAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class SuperAdminController extends Controller
{
    // Menampilkan semua super admin
    public function index()
    {
        return response()->json(SuperAdmin::all(), 200);
    }

    // Menyimpan super admin baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'email_superadmin' => 'required|email|unique:superadmins,email_superadmin',
            'password_superadmin' => 'required|string|min:6',
            'nama_superadmin' => 'required|string|max:255',
            'status_akun_superadmin' => 'required|in:aktif,nonaktif',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menyimpan super admin baru
        $superadmin = SuperAdmin::create([
            'email_superadmin' => $request->email_superadmin,
            'password_superadmin' => bcrypt($request->password_superadmin),
            'nama_superadmin' => $request->nama_superadmin,
            'status_akun_superadmin' => $request->status_akun_superadmin,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Super Admin berhasil disimpan.',
            'data' => $superadmin
        ], 201);
    }

    // Menampilkan super admin berdasarkan ID
    public function show($id)
    {
        $superadmin = SuperAdmin::find($id);

        if (!$superadmin) {
            return response()->json([
                'success' => false,
                'message' => 'Super Admin tidak ditemukan.',
            ], 404);
        }

        return response()->json($superadmin, 200);
    }

    // Mengupdate data super admin
    public function update(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'email_superadmin' => 'required|email|unique:superadmins,email_superadmin,' . $id,
            'password_superadmin' => 'nullable|string|min:6',
            'nama_superadmin' => 'required|string|max:255',
            'status_akun_superadmin' => 'required|in:aktif,nonaktif',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menemukan super admin berdasarkan ID
        $superadmin = SuperAdmin::find($id);

        if (!$superadmin) {
            return response()->json([
                'success' => false,
                'message' => 'Super Admin tidak ditemukan.',
            ], 404);
        }

        // Update data super admin
        $superadmin->update([
            'email_superadmin' => $request->email_superadmin,
            'password_superadmin' => $request->password_superadmin ? bcrypt($request->password_superadmin) : $superadmin->password,
            'nama_superadmin' => $request->nama_superadmin,
            'status_akun_superadmin' => $request->status_akun_superadmin,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Super Admin berhasil diperbarui.',
            'data' => $superadmin
        ], 200);
    }

    // Menghapus super admin berdasarkan ID
    public function destroy($id)
    {
        $superadmin = SuperAdmin::find($id);

        if (!$superadmin) {
            return response()->json([
                'success' => false,
                'message' => 'Super Admin tidak ditemukan.',
            ], 404);
        }

        // Menghapus super admin
        $superadmin->delete();

        return response()->json([
            'success' => true,
            'message' => 'Super Admin berhasil dihapus.',
        ], 200);
    }
}
