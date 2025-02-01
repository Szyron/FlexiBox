<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::patch('/profile', [RegisterController::class, 'update']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/profile', [ProfileController::class, 'store']);
Route::get('/profile/{user_id}', [ProfileController::class, 'index']);


