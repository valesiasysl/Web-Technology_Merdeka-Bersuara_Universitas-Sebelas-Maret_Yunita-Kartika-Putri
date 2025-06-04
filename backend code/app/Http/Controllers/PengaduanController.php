<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class PengaduanController extends Controller
{
    // Menampilkan semua pengaduan
    public function index()
    {
        return response()->json(Pengaduan::all(), 200);
    }

    // Menyimpan pengaduan baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'keterangan_masalah' => 'required|string',
            'foto_pengaduan' => 'required|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'tanggal_pengaduan' => 'required|date',
            'status' => 'required|in:Proses,Selesai',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menangani upload foto pengaduan
        $fotoPengaduanPath = null;
        if ($request->hasFile('foto_pengaduan')) {
            $file = $request->file('foto_pengaduan');
            $fotoPengaduanPath = $file->store('pengaduan/foto', 'public');
        }

        // Menyimpan pengaduan baru
        $pengaduan = Pengaduan::create([
            'keterangan_masalah' => $request->keterangan_masalah,
            'foto_pengaduan' => $fotoPengaduanPath,
            'tanggal_pengaduan' => Carbon::parse($request->tanggal_pengaduan),
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil disimpan.',
            'data' => $pengaduan
        ], 201);
    }

    public function update(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'keterangan_masalah' => 'nullable|string',
            'foto_pengaduan' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'tanggal_pengaduan' => 'nullable|date',
            'foto_penyelesaian' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'tanggal_penyelesaian' => 'nullable|date',
            'status' => 'nullable|in:Proses,Selesai', // Validasi status
        ]);
    
        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Mencari pengaduan berdasarkan ID
        $pengaduan = Pengaduan::find($id);
    
        if (!$pengaduan) {
            return response()->json([
                'success' => false,
                'message' => 'Pengaduan tidak ditemukan.',
            ], 404);
        }
    
        // Update kolom status jika ada perubahan
        if ($request->has('status') && $request->status !== $pengaduan->status) {
            $pengaduan->status = $request->status;
        }
    
        // Menangani foto pengaduan baru (jika ada)
        if ($request->hasFile('foto_pengaduan')) {
            // Menghapus foto lama jika ada
            if ($pengaduan->foto_pengaduan) {
                Storage::delete('public/' . $pengaduan->foto_pengaduan);
            }
            // Menyimpan foto pengaduan baru
            $fotoPengaduanPath = $request->file('foto_pengaduan')->store('pengaduan/foto', 'public');
            $pengaduan->foto_pengaduan = $fotoPengaduanPath;
        }
    
        // Menyimpan foto penyelesaian (jika ada)
        if ($request->hasFile('foto_penyelesaian')) {
            // Menghapus foto penyelesaian lama jika ada
            if ($pengaduan->foto_penyelesaian) {
                Storage::delete('public/' . $pengaduan->foto_penyelesaian);
            }
            // Menyimpan foto penyelesaian baru
            $fotoPenyelesaianPath = $request->file('foto_penyelesaian')->store('pengaduan/penyelesaian', 'public');
            $pengaduan->foto_penyelesaian = $fotoPenyelesaianPath;
        }
    
        // Memperbarui data lainnya (seperti tanggal)
        if ($request->has('tanggal_penyelesaian')) {
            $pengaduan->tanggal_penyelesaian = Carbon::parse($request->tanggal_penyelesaian);
        }
    
        // Simpan perubahan
        $pengaduan->save();
    
        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil diperbarui.',
            'data' => $pengaduan
        ]);
    }

    // Menampilkan pengaduan berdasarkan ID
public function show($id)
{
    // Mencari pengaduan berdasarkan ID
    $pengaduan = Pengaduan::find($id);

    // Cek jika pengaduan tidak ditemukan
    if (!$pengaduan) {
        return response()->json([
            'success' => false,
            'message' => 'Pengaduan tidak ditemukan.',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $pengaduan
    ], 200);
}


    // Menghapus pengaduan
    public function destroy($id)
    {
        $pengaduan = Pengaduan::find($id);

        if (!$pengaduan) {
            return response()->json([
                'success' => false,
                'message' => 'Pengaduan tidak ditemukan.',
            ], 404);
        }

        // Menghapus foto pengaduan dan foto penyelesaian jika ada
        if ($pengaduan->foto_pengaduan) {
            Storage::delete('public/' . $pengaduan->foto_pengaduan);
        }

        if ($pengaduan->foto_penyelesaian) {
            Storage::delete('public/' . $pengaduan->foto_penyelesaian);
        }

        // Menghapus pengaduan dari database
        $pengaduan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil dihapus.',
        ], 200);
    }
}
