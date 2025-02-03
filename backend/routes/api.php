<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::patch('/profile', [RegisterController::class, 'update']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/profile', [ProfileController::class, 'store']);
Route::get('/profile/{user_id}', [ProfileController::class, 'index']);
Route::post('/category', [ServiceController::class, 'categoryStore']);
Route::post('/product', [ServiceController::class, 'productStore']);
Route::get('/product', [ServiceController::class, 'productIndex']);
Route::get('/category', [ServiceController::class, 'index']);
Route::delete('/category/{id}', [ServiceController::class, 'destroy']);
Route::patch('/category', [ServiceController::class, 'update']);

//Role management
Route::group(['middleware' => ['auth', 'checkadmin:70']], function () {
    Route::get('/admindashboard', function (Request $request) {
        return response()->json(['message' => 'Admin access granted']);
    });
});

Route::group(['middleware' => ['auth', 'checkadmin:100']], function () {
    // Super admin routes
});


