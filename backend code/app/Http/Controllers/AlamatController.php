<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class AlamatController extends Controller
{
    // Menampilkan semua alamat
    public function index()
    {
        $alamats = Alamat::all();
        return response()->json(['data' => $alamats], 200);
    }

    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'alamat' => 'required|string|max:255',
            'longitude' => 'required|numeric', // Validasi longitude (jika diperlukan)
            'latitude' => 'required|numeric',  // Validasi latitude (jika diperlukan)
        ]);
    
        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Menyimpan alamat baru dengan longitude dan latitude
        $alamat = Alamat::create([
            'alamat' => $request->alamat,
            'longitude' => $request->longitude,  // Menyimpan longitude
            'latitude' => $request->latitude,    // Menyimpan latitude
        ]);
    
        return response()->json([
            'success' => true,
            'message' => 'Alamat berhasil disimpan',
            'data' => $alamat
        ], 201);
    }
    

    // Menampilkan alamat berdasarkan ID
    public function show($id)
    {
        $alamat = Alamat::find($id);

        if (!$alamat) {
            return response()->json([
                'success' => false,
                'message' => 'Alamat tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $alamat
        ], 200);
    }

    // Memperbarui alamat
    public function update(Request $request, $id)
    {
        $alamat = Alamat::find($id);

        if (!$alamat) {
            return response()->json([
                'success' => false,
                'message' => 'Alamat tidak ditemukan',
            ], 404);
        }

        // Validasi input
        $request->validate([
            'alamat' => 'required|string|max:255',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
        ]);

        // Memperbarui data alamat
        $alamat->update([
            'alamat' => $request->alamat,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Alamat berhasil diperbarui',
            'data' => $alamat
        ], 200);
    }

    // Menghapus alamat
    public function destroy($id)
    {
        $alamat = Alamat::find($id);

        if (!$alamat) {
            return response()->json([
                'success' => false,
                'message' => 'Alamat tidak ditemukan',
            ], 404);
        }

        // Menghapus alamat
        $alamat->delete();

        return response()->json([
            'success' => true,
            'message' => 'Alamat berhasil dihapus',
        ], 200);
    }
}
