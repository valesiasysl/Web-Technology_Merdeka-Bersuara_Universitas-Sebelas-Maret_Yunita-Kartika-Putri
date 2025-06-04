<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    // Menampilkan semua berita
    public function index()
    {
        $news = News::all();
        return response()->json(['data' => $news], 200);
    }

    // Menyimpan berita baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'judul_berita' => 'required|string|max:255',
            'image' => 'required|file|mimes:jpeg,png,jpg,pdf|max:2048', // Validasi untuk image
            'tanggal_berita' => 'required|date',
            'URL' => 'nullable|string|url|max:255',  // URL opsional
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menangani file gambar
        $fotoPath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            // Menyimpan file ke folder 'public/news' dan mendapatkan pathnya
            $fotoPath = $file->store('public/news');
        }

        // Membuat berita baru
        $news = News::create([
            'judul_berita' => $request->judul_berita,
            'image' => $fotoPath,  // Menyimpan path gambar yang sudah diupload
            'tanggal_berita' => $request->tanggal_berita,
            'URL' => $request->URL,  // Menyimpan URL jika ada
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Berita berhasil disimpan',
            'data' => $news
        ], 201);
    }

    // Menampilkan berita berdasarkan ID
    public function show($id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $news
        ], 200);
    }

    // Memperbarui berita
    public function update(Request $request, $id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan',
            ], 404);
        }

        // Validasi input
        $request->validate([
            'judul_berita' => 'required|string|max:255',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048', // Validasi gambar opsional
            'tanggal_berita' => 'required|date',
            'URL' => 'nullable|string|url|max:255',
        ]);

        // Menangani file gambar jika ada
        $fotoPath = $news->image;  // Mengambil foto lama (jika ada)
        if ($request->hasFile('image')) {
            // Jika ada gambar baru, hapus gambar lama dan simpan gambar baru
            Storage::delete($fotoPath);
            $file = $request->file('image');
            $fotoPath = $file->store('public/news');
        }

        // Update berita
        $news->update([
            'judul_berita' => $request->judul_berita,
            'image' => $fotoPath,
            'tanggal_berita' => $request->tanggal_berita,
            'URL' => $request->URL,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Berita berhasil diperbarui',
            'data' => $news
        ], 200);
    }

    // Menghapus berita
    public function destroy($id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan',
            ], 404);
        }

        // Hapus gambar dari storage jika ada
        if ($news->image) {
            Storage::delete($news->image);
        }

        // Hapus berita
        $news->delete();

        return response()->json([
            'success' => true,
            'message' => 'Berita berhasil dihapus',
        ], 200);
    }
}
