<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LayananController extends Controller
{
    // Menampilkan daftar layanan
    public function index()
    {
        return response()->json(Layanan::all(), 200);
    }

    // Menyimpan data layanan baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(),[
            'kategori' => 'required|in:rumah tangga,industri',
            'alamat' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'status' => 'required|in:diajukan,proses,selesai',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $layananData = [
            'kategori' => $request->kategori,
            'alamat' => $request->alamat,
            'tanggal' => $request->tanggal,
            'status' => $request->status,
        ];

        // Menyimpan data
        $layanan = Layanan::create($layananData);

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil dibuat',
            'data' => $layanan,
        ], 201);
    }

    // Menampilkan detail layanan berdasarkan ID
    public function show($id)
    {
        $layanan = Layanan::find($id);

        if (!$layanan) {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $layanan,
        ], 200);
    }

    // Mengupdate data layanan
    public function update(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'kategori' => 'required|in:rumah tangga,industri',
            'alamat' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'status' => 'required|in:diajukan,proses,selesai',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Cek apakah layanan ada
        $layanan = Layanan::find($id);

        if (!$layanan) {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        // Update data layanan
        $layanan->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil diperbarui',
            'data' => $layanan,
        ], 200);
    }

    // Menghapus layanan
    public function destroy($id)
    {
        // Cek apakah layanan ada
        $layanan = Layanan::find($id);

        if (!$layanan) {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        // Hapus layanan
        $layanan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil dihapus',
        ], 200);
    }
}
