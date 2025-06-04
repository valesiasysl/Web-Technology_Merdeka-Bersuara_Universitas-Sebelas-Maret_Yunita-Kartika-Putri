<?php

namespace App\Http\Controllers;

use App\Models\Chatbot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatbotController extends Controller
{
    // Menampilkan semua chatbot
    public function index()
    {
        $chatbots = Chatbot::all();

        if ($chatbots->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada chatbot ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Chatbot berhasil ditemukan.',
            'data' => $chatbots,
        ], 200);
    }

    // Menyimpan data chatbot baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'keyword' => 'required|string|unique:chatbots,keyword',
            'response' => 'required|string',
        ]);

        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Menyimpan chatbot baru
        $chatbot = Chatbot::create([
            'keyword' => $request->keyword,
            'response' => $request->response,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Chatbot berhasil disimpan.',
            'data' => $chatbot,
        ], 201);
    }

    // Menampilkan chatbot berdasarkan ID
    public function show($id)
    {
        $chatbot = Chatbot::find($id);

        if (!$chatbot) {
            return response()->json([
                'success' => false,
                'message' => 'Chatbot tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Chatbot ditemukan.',
            'data' => $chatbot,
        ], 200);
    }

    public function update(Request $request, $id)
{
    $chatbot = Chatbot::find($id);

    if (!$chatbot) {
        return response()->json([
            'success' => false,
            'message' => 'Chatbot tidak ditemukan.',
        ], 404);
    }

    // Validate input
    $validator = Validator::make($request->all(), [
        'keyword' => 'required|string|unique:chatbots,keyword,' . $id . ',chatbot_id', // Use chatbot_id here
        'response' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal.',
            'errors' => $validator->errors(),
        ], 422);
    }

    // Update chatbot
    $chatbot->update([
        'keyword' => $request->keyword,
        'response' => $request->response,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Chatbot berhasil diperbarui.',
        'data' => $chatbot,
    ], 200);
}


    // Menghapus chatbot berdasarkan ID
    public function destroy($id)
    {
        $chatbot = Chatbot::find($id);

        if (!$chatbot) {
            return response()->json([
                'success' => false,
                'message' => 'Chatbot tidak ditemukan.',
            ], 404);
        }

        // Menghapus chatbot
        $chatbot->delete();

        return response()->json([
            'success' => true,
            'message' => 'Chatbot berhasil dihapus.',
        ], 200);
    }
}
