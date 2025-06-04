<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class LaporanController extends Controller
{
    // Menampilkan semua laporan
    public function index()
    {
        return response()->json(Laporan::all(), 200);
    }

    // Menyimpan laporan baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'email_pelapor' => 'required|email',
            'tanggal_laporan' => 'required|date',
            'jenis_laporan' => 'required|in:pengaduan,aspirasi,permintaan informasi',
            'judul_laporan' => 'required|string|max:255',
            'isi_laporan' => 'required|string',
            'tempat_kejadian' => 'required|string|max:255',
            'bukti_laporan' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'status_laporan' => 'required|in:dalam ajuan,dalam proses,selesai',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menangani upload bukti laporan
        $buktiLaporanPath = null;
        if ($request->hasFile('bukti_laporan')) {
            $file = $request->file('bukti_laporan');
            $buktiLaporanPath = $file->store('laporan/bukti', 'public');
        }

        // Menyimpan laporan baru
        $laporan = Laporan::create([
            'email_pelapor' => $request->email_pelapor,
            'tanggal_laporan' => Carbon::parse($request->tanggal_laporan),
            'jenis_laporan' => $request->jenis_laporan,
            'judul_laporan' => $request->judul_laporan,
            'isi_laporan' => $request->isi_laporan,
            'tempat_kejadian' => $request->tempat_kejadian,
            'bukti_laporan' => $buktiLaporanPath,
            'status_laporan' => $request->status_laporan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil disimpan.',
            'data' => $laporan
        ], 201);
    }

    // Menampilkan laporan berdasarkan ID
    public function show($id)
    {
        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'success' => false,
                'message' => 'Laporan tidak ditemukan.',
            ], 404);
        }

        return response()->json($laporan, 200);
    }

    // Memperbarui laporan
    public function update(Request $request, $id)
    {
        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'success' => false,
                'message' => 'Laporan tidak ditemukan.',
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'status_laporan' => 'required|in:dalam ajuan,dalam proses,selesai',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Memperbarui laporan
        $laporan->update([
            'status_laporan' => $request->status_laporan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil diperbarui.',
            'data' => $laporan
        ], 200);
    }

    // Menghapus laporan
    public function destroy($id)
    {
        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'success' => false,
                'message' => 'Laporan tidak ditemukan.',
            ], 404);
        }

        // Menghapus bukti laporan jika ada
        if ($laporan->bukti_laporan) {
            Storage::delete('public/' . $laporan->bukti_laporan);
        }

        $laporan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil dihapus.',
        ], 200);
    }
}
