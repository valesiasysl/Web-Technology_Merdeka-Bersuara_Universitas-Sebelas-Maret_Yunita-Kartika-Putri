<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ArtikelController extends Controller
{
    // Menampilkan semua artikel
    public function index()
    {
        $artikels = Artikel::all();

        return response()->json([
            'success' => true,
            'message' => 'Daftar artikel berhasil ditemukan.',
            'data' => $artikels,
        ], 200);
    }

    // Menyimpan artikel baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'judul_artikel' => 'required|string|max:255',
            'isi_artikel' => 'required|string',
            'tanggal_terbit' => 'required|date',
            'gambar_artikel' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Upload gambar artikel jika ada
        $gambarPath = null;
        if ($request->hasFile('gambar_artikel')) {
            $gambarPath = $request->file('gambar_artikel')->store('artikel/gambar', 'public');
        }

        // Menyimpan artikel baru
        $artikel = Artikel::create([
            'judul_artikel' => $request->judul_artikel,
            'isi_artikel' => $request->isi_artikel,
            'tanggal_terbit' => Carbon::parse($request->tanggal_terbit),
            'gambar_artikel' => $gambarPath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil disimpan.',
            'data' => $artikel,
        ], 201);
    }

    // Menampilkan artikel berdasarkan ID
    public function show($id)
    {
        $artikel = Artikel::find($id);

        if (!$artikel) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil ditemukan.',
            'data' => $artikel,
        ], 200);
    }

    // Memperbarui artikel berdasarkan ID
    public function update(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'judul_artikel' => 'nullable|string|max:255',
            'isi_artikel' => 'nullable|string',
            'tanggal_terbit' => 'nullable|date',
            'gambar_artikel' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Mencari artikel berdasarkan ID
        $artikel = Artikel::find($id);

        if (!$artikel) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel tidak ditemukan.',
            ], 404);
        }

        // Mengunggah gambar baru jika ada
        if ($request->hasFile('gambar_artikel')) {
            // Menghapus gambar lama jika ada
            if ($artikel->gambar_artikel) {
                Storage::delete('public/' . $artikel->gambar_artikel);
            }

            $gambarPath = $request->file('gambar_artikel')->store('artikel/gambar', 'public');
            $artikel->gambar_artikel = $gambarPath;
        }

        // Memperbarui data lainnya
        $artikel->update([
            'judul_artikel' => $request->judul_artikel ?? $artikel->judul_artikel,
            'isi_artikel' => $request->isi_artikel ?? $artikel->isi_artikel,
            'tanggal_terbit' => $request->tanggal_terbit ? Carbon::parse($request->tanggal_terbit) : $artikel->tanggal_terbit,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil diperbarui.',
            'data' => $artikel,
        ], 200);
    }

    // Menghapus artikel berdasarkan ID
    public function destroy($id)
    {
        $artikel = Artikel::find($id);

        if (!$artikel) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel tidak ditemukan.',
            ], 404);
        }

        // Menghapus gambar artikel jika ada
        if ($artikel->gambar_artikel) {
            Storage::delete('public/' . $artikel->gambar_artikel);
        }

        // Menghapus artikel
        $artikel->delete();

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil dihapus.',
        ], 200);
    }
}
