<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\OrderController;




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::put('/user/edit', [RegisterController::class, 'edit'])->middleware('auth:sanctum');
Route::delete('/user/delete', [RegisterController::class, 'destroy'])->middleware('auth:sanctum');
Route::patch('/profile', [RegisterController::class, 'update']);
Route::post('/login', [LoginController::class, 'login']);

Route::post('/profile', [ProfileController::class, 'store']);
Route::get('/profile/index', [ProfileController::class, 'index'])->middleware('auth:sanctum');
//Route::post('/profile/{user_id}', [ProfileController::class, 'update']);
Route::post('/profile/update', [ProfileController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/profile/delete', [ProfileController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/category', [ServiceController::class, 'categoryStore']);
Route::post('/product', [ServiceController::class, 'productStore']);
Route::get('/product', [ServiceController::class, 'productIndex']);
Route::post('/product/update', [ServiceController::class, 'productUpdate']);
Route::delete('/product/delete', [ServiceController::class, 'productDestroy'])->middleware('auth:sanctum');
Route::get('/category', [ServiceController::class, 'index']);
Route::delete('/category/delete', [ServiceController::class, 'destroy'])->middleware('auth:sanctum');
Route::patch('/category', [ServiceController::class, 'update']);
Route::get('/users', [AdminController::class, 'index']);

Route::post('/publicareaname', [AddressController::class, 'publicAreaStore']);
Route::get('/publicareaname', [AddressController::class, 'publicAreaIndex']);
Route::patch('/publicareaname', [AddressController::class, 'publicAreaUpdate']);
Route::delete('/publicareaname/delete', [AddressController::class, 'publicAreaDestroy'])->middleware('auth:sanctum');
Route::post('/address', [AddressController::class, 'addressStore']);
//Route::get('/address', [AddressController::class, 'addressIndex']);
Route::get('/address/{userId}', [AddressController::class, 'addressIndex']);
//Route::patch('/address', [AddressController::class, 'addressUpdate']);
//Route::delete('/address/delete', [AddressController::class, 'addressDestroy'])->middleware('auth:sanctum');

Route::post('/payment' , [PaymentController::class, 'store']);
Route::get('/payment' , [PaymentController::class, 'index']);
Route::patch('/payment' , [PaymentController::class, 'update']);
Route::delete('/payment/delete' , [PaymentController::class, 'destroy']);

//ORDER CONTROLLER
Route::post('/neworder' , [OrderController::class, 'store']);
Route::get('/order',[OrderController::class,'index'])->middleware('auth:sanctum');


//Role management
Route::group(['middleware' => ['auth', 'checkadmin:70']], function () {
    Route::get('/admindashboard', function (Request $request) {
        return response()->json(['message' => 'Admin access granted']);
    });
    
    
});

Route::group(['middleware' => ['auth', 'checkadmin:100']], function () {
    // Super admin routes
});


