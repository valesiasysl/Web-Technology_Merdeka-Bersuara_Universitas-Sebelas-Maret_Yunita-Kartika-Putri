<?php

namespace App\Http\Controllers;

use App\Models\ChatKonsultasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ChatKonsultasiController extends Controller
{
    // Menampilkan semua chat konsultasi
    public function index()
    {
        return response()->json(ChatKonsultasi::all(), 200);
    }

    // Menyimpan data chat konsultasi baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'message' => 'required|string',
            'status_chat' => 'required|in:berlangsung,berakhir',
            'tanggal_chat' => 'required|date',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menyimpan chat konsultasi baru
        $chatKonsultasi = ChatKonsultasi::create([
            'message' => $request->message,
            'status_chat' => $request->status_chat,
            'tanggal_chat' => Carbon::parse($request->tanggal_chat),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Chat konsultasi berhasil disimpan.',
            'data' => $chatKonsultasi
        ], 201);
    }

    // Menampilkan chat konsultasi berdasarkan ID
    public function show($id)
    {
        $chatKonsultasi = ChatKonsultasi::find($id);

        if (!$chatKonsultasi) {
            return response()->json([
                'success' => false,
                'message' => 'Chat konsultasi tidak ditemukan.',
            ], 404);
        }

        return response()->json($chatKonsultasi, 200);
    }

    // Memperbarui data chat konsultasi berdasarkan ID
    public function update(Request $request, $id)
    {
        $chatKonsultasi = ChatKonsultasi::find($id);

        if (!$chatKonsultasi) {
            return response()->json([
                'success' => false,
                'message' => 'Chat konsultasi tidak ditemukan.',
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'message' => 'required|string',
            'status_chat' => 'required|in:berlangsung,berakhir',
            'tanggal_chat' => 'required|date',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Memperbarui data chat konsultasi
        $chatKonsultasi->update([
            'message' => $request->message,
            'status_chat' => $request->status_chat,
            'tanggal_chat' => Carbon::parse($request->tanggal_chat),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Chat konsultasi berhasil diperbarui.',
            'data' => $chatKonsultasi
        ], 200);
    }

    // Menghapus chat konsultasi berdasarkan ID
    public function destroy($id)
    {
        $chatKonsultasi = ChatKonsultasi::find($id);

        if (!$chatKonsultasi) {
            return response()->json([
                'success' => false,
                'message' => 'Chat konsultasi tidak ditemukan.',
            ], 404);
        }

        // Menghapus chat konsultasi
        $chatKonsultasi->delete();

        return response()->json([
            'success' => true,
            'message' => 'Chat konsultasi berhasil dihapus.',
        ], 200);
    }
}
