<?php

namespace App\Http\Controllers;


use App\Models\Advokat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdvokatController extends Controller
{
    // Menampilkan semua advokat
    public function index()
    {
        $advokats = Advokat::all();

        if ($advokats->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada advokat ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Advokat berhasil ditemukan.',
            'data' => $advokats,
        ], 200);
    }

    // Menyimpan data advokat baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'email_advokat' => 'required|email|unique:advokats,email_advokat',
            'password_advokat' => 'required|string|min:6',
            'nama_advokat' => 'required|string',
            'no_kta' => 'required|string',
            'spesialisasi' => 'required|string',
            'ketersediaan' => 'required|in:ada,tidak',
            'bio_advokat' => 'required|string',
            'foto_advokat' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'status_akun_advokat' => 'required|in:aktif,nonaktif,verifikasi',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menangani upload foto advokat
        $fotoAdvokatPath = null;
        if ($request->hasFile('foto_advokat')) {
            $file = $request->file('foto_advokat');
            $fotoAdvokatPath = $file->store('advokat/foto', 'public');
        }

        // Menyimpan advokat baru
        $advokat = Advokat::create([
            'email_advokat' => $request->email_advokat,
            'password_advokat' => bcrypt($request->password_advokat), // Enkripsi password
            'nama_advokat' => $request->nama_advokat,
            'no_kta' => $request->no_kta,
            'spesialisasi' => $request->spesialisasi,
            'ketersediaan' => $request->ketersediaan,
            'bio_advokat' => $request->bio_advokat,
            'foto_advokat' => $fotoAdvokatPath,
            'status_akun_advokat' => $request->status_akun_advokat,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Advokat berhasil disimpan.',
            'data' => $advokat,
        ], 201);
    }

    // Menampilkan detail advokat berdasarkan advokat_id
    public function show($advokat_id)
    {
        $advokat = Advokat::find($advokat_id);

        if (!$advokat) {
            return response()->json([
                'success' => false,
                'message' => 'Advokat tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Advokat ditemukan.',
            'data' => $advokat,
        ], 200);
    }

    // Mengupdate data advokat berdasarkan advokat_id
    public function update(Request $request, $advokat_id)
    {
        $advokat = Advokat::find($advokat_id);

        if (!$advokat) {
            return response()->json([
                'success' => false,
                'message' => 'Advokat tidak ditemukan.',
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'email_advokat' => 'required|email|unique:advokats,email_advokat,' . $advokat_id,
            'nama_advokat' => 'required|string',
            'no_kta' => 'required|string',
            'spesialisasi' => 'required|string',
            'ketersediaan' => 'required|in:ada,tidak',
            'bio_advokat' => 'required|string',
            'foto_advokat' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'status_akun_advokat' => 'required|in:aktif,nonaktif,verifikasi',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menangani upload foto advokat jika ada
        $fotoAdvokatPath = $advokat->foto_advokat;
        if ($request->hasFile('foto_advokat')) {
            // Hapus foto lama jika ada
            if ($advokat->foto_advokat) {
                Storage::disk('public')->delete($advokat->foto_advokat);
            }
            $file = $request->file('foto_advokat');
            $fotoAdvokatPath = $file->store('advokat/foto', 'public');
        }

        // Mengupdate data advokat
        $advokat->update([
            'email_advokat' => $request->email_advokat,
            'password_advokat' => $request->has('password_advokat') ? bcrypt($request->password_advokat) : $advokat->password_advokat,
            'nama_advokat' => $request->nama_advokat,
            'no_kta' => $request->no_kta,
            'spesialisasi' => $request->spesialisasi,
            'ketersediaan' => $request->ketersediaan,
            'bio_advokat' => $request->bio_advokat,
            'foto_advokat' => $fotoAdvokatPath,
            'status_akun_advokat' => $request->status_akun_advokat,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Advokat berhasil diupdate.',
            'data' => $advokat,
        ], 200);
    }

    // Menghapus data advokat berdasarkan advokat_id
    public function destroy($advokat_id)
    {
        $advokat = Advokat::find($advokat_id);

        if (!$advokat) {
            return response()->json([
                'success' => false,
                'message' => 'Advokat tidak ditemukan.',
            ], 404);
        }

        // Hapus foto advokat jika ada
        if ($advokat->foto_advokat) {
            Storage::disk('public')->delete($advokat->foto_advokat);
        }

        $advokat->delete();

        return response()->json([
            'success' => true,
            'message' => 'Advokat berhasil dihapus.',
        ], 200);
    }
}
