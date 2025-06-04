<?php

namespace App\Http\Controllers;

use App\Models\StatusLaporan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatusLaporanController extends Controller
{
    // Menampilkan semua status laporan
    public function index()
    {
        return response()->json(StatusLaporan::all(), 200);
    }

    // Menyimpan status laporan baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'Nama_status_laporan' => 'required|string|max:255',
            'keterangan_laporan' => 'required|string',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menyimpan status laporan baru
        $statusLaporan = StatusLaporan::create([
            'Nama_status_laporan' => $request->Nama_status_laporan,
            'keterangan_laporan' => $request->keterangan_laporan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status laporan berhasil disimpan.',
            'data' => $statusLaporan
        ], 201);
    }

    // Menampilkan status laporan berdasarkan ID
    public function show($id)
    {
        $statusLaporan = StatusLaporan::find($id);

        if (!$statusLaporan) {
            return response()->json([
                'success' => false,
                'message' => 'Status laporan tidak ditemukan.',
            ], 404);
        }

        return response()->json($statusLaporan, 200);
    }

    // Memperbarui status laporan
    public function update(Request $request, $id)
    {
        $statusLaporan = StatusLaporan::find($id);

        if (!$statusLaporan) {
            return response()->json([
                'success' => false,
                'message' => 'Status laporan tidak ditemukan.',
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'Nama_status_laporan' => 'required|string|max:255',
            'keterangan_laporan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Memperbarui status laporan
        $statusLaporan->update([
            'Nama_status_laporan' => $request->Nama_status_laporan,
            'keterangan_laporan' => $request->keterangan_laporan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status laporan berhasil diperbarui.',
            'data' => $statusLaporan
        ], 200);
    }

    // Menghapus status laporan
    public function destroy($id)
    {
        $statusLaporan = StatusLaporan::find($id);

        if (!$statusLaporan) {
            return response()->json([
                'success' => false,
                'message' => 'Status laporan tidak ditemukan.',
            ], 404);
        }

        $statusLaporan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Status laporan berhasil dihapus.',
        ], 200);
    }
}
