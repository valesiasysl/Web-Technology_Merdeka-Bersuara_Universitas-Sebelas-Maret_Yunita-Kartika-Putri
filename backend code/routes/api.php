<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PengaduanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AlamatController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ChatKonsultasiController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\StatusLaporanController;
use App\Http\Controllers\AdvokatController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\ArtikelController;

/*
|-----------------------------------------------------------------------
| API Routes
|-----------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rute untuk pendaftaran pengguna
Route::post('/registrasi', [AuthController::class, 'register']);

// Rute untuk login pengguna
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk logout pengguna dengan middleware autentikasi
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// News
Route::get('/news', [NewsController::class, 'index']);
Route::post('/news', [NewsController::class, 'store']);
Route::get('/news/{id}', [NewsController::class, 'show']);
Route::put('/news/{id}', [NewsController::class, 'update']);
Route::delete('/news/{id}', [NewsController::class, 'destroy']);

// Pengaduan
Route::post('/pengaduan', [PengaduanController::class, 'store']); // Untuk membuat pengaduan
Route::get('/pengaduan/{id}', [PengaduanController::class, 'show']);
Route::put('/pengaduan/{id}', [PengaduanController::class, 'update']); // Untuk memperbarui pengaduan berdasarkan ID
Route::get('/pengaduan', [PengaduanController::class, 'index']); // Untuk melihat semua pengaduan
Route::delete('/pengaduan/{id}', [PengaduanController::class, 'destroy']); // Untuk menghapus pengaduan berdasarkan ID

// User
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Chatbot
Route::get('/chatbots', [ChatbotController::class, 'index']);
Route::get('/chatbots/{id}', [ChatbotController::class, 'show']);
Route::post('/chatbots', [ChatbotController::class, 'store']);
Route::put('/chatbots/{id}', [ChatbotController::class, 'update']);
Route::delete('/chatbots/{id}', [ChatbotController::class, 'destroy']);

// Chat Konsultasi
Route::get('/chatkonsultasi', [ChatKonsultasiController::class, 'index']);
Route::get('/chatkonsultasi/{id}', [ChatKonsultasiController::class, 'show']);
Route::post('/chatkonsultasi', [ChatKonsultasiController::class, 'store']);
Route::put('/chatkonsultasi/{id}', [ChatKonsultasiController::class, 'update']);
Route::delete('/chatkonsultasi/{id}', [ChatKonsultasiController::class, 'destroy']);

// Laporan
Route::get('/laporan', [LaporanController::class, 'index']);
Route::get('/laporan/{id}', [LaporanController::class, 'show']);
Route::post('/laporan', [LaporanController::class, 'store']);
Route::put('/laporan/{id}', [LaporanController::class, 'update']);
Route::delete('/laporan/{id}', [LaporanController::class, 'destroy']);

// Status Laporan
Route::get('/statuslaporan', [StatusLaporanController::class, 'index']);
Route::get('/statuslaporan/{id}', [StatusLaporanController::class, 'show']);
Route::post('/statuslaporan', [StatusLaporanController::class, 'store']);
Route::put('/statuslaporan/{id}', [StatusLaporanController::class, 'update']);
Route::delete('/statuslaporan/{id}', [StatusLaporanController::class, 'destroy']);

// Advokat
Route::get('/advokat', [AdvokatController::class, 'index']);
Route::get('/advokat/{id}', [AdvokatController::class, 'show']);
Route::post('/advokat', [AdvokatController::class, 'store']);
Route::put('/advokat/{id}', [AdvokatController::class, 'update']);
Route::delete('/advokat/{id}', [AdvokatController::class, 'destroy']);

// Admin
Route::get('/admin', [AdminController::class, 'index']);
Route::get('/admin/{id}', [AdminController::class, 'show']);
Route::post('/admin', [AdminController::class, 'store']);
Route::put('/admin/{id}', [AdminController::class, 'update']);
Route::delete('/admin/{id}', [AdminController::class, 'destroy']);

// Super Admin
Route::get('/superadmin', [SuperAdminController::class, 'index']);
Route::get('/superadmin/{id}', [SuperAdminController::class, 'show']);
Route::post('/superadmin', [SuperAdminController::class, 'store']);
Route::put('/superadmin/{id}', [SuperAdminController::class, 'update']);
Route::delete('/superadmin/{id}', [SuperAdminController::class, 'destroy']);

// Artikel
Route::get('/artikel', [ArtikelController::class, 'index']);
Route::get('/artikel/{id}', [ArtikelController::class, 'show']);
Route::post('/artikel', [ArtikelController::class, 'store']);
Route::put('/artikel/{id}', [ArtikelController::class, 'update']);
Route::delete('/artikel/{id}', [ArtikelController::class, 'destroy']);
