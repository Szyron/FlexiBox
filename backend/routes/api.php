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
use App\Http\Controllers\LockerController;




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Auth API's
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

//Profile API's
Route::patch('/profile', [RegisterController::class, 'update']);
Route::post('/profile', [ProfileController::class, 'store']);
Route::get('/profile/index', [ProfileController::class, 'index'])->middleware('auth:sanctum');
Route::post('/profile/update', [ProfileController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/profile/delete', [ProfileController::class, 'destroy'])->middleware('auth:sanctum');

//User Orders API's
Route::get('/userorderslist', [OrderController::class, 'userorderindex'])->middleware('auth:sanctum');
Route::delete('/userorders', [OrderController::class, 'userdeleteOrder'])->middleware('auth:sanctum');


//Admin API's
Route::put('/user/edit', [RegisterController::class, 'edit'])->middleware('auth:sanctum');
Route::delete('/user/delete', [RegisterController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/orderslist', [OrderController::class, 'orderindex'])->middleware('auth:sanctum');
Route::delete('/orders', [OrderController::class, 'deleteOrder'])->middleware('auth:sanctum');
Route::get('/users', [AdminController::class, 'index'])->middleware('auth:sanctum');

//Product API's
Route::post('/category', [ServiceController::class, 'categoryStore']);
Route::post('/product', [ServiceController::class, 'productStore']);
Route::get('/product', [ServiceController::class, 'productIndex']);
Route::post('/product/update', [ServiceController::class, 'productUpdate']);
Route::delete('/product/delete', [ServiceController::class, 'productDestroy'])->middleware('auth:sanctum');
Route::get('/category', [ServiceController::class, 'index']);
Route::delete('/category/delete', [ServiceController::class, 'destroy'])->middleware('auth:sanctum');
Route::patch('/category', [ServiceController::class, 'update']);

//PublicAreaName API's
Route::get('/publicareaname', [AddressController::class, 'publicAreaIndex']);
Route::patch('/publicareaname', [AddressController::class, 'publicAreaUpdate']);
Route::delete('/publicareaname/delete', [AddressController::class, 'publicAreaDestroy'])->middleware('auth:sanctum');

//Address API's
Route::post('/address', [AddressController::class, 'addressStore']);
Route::get('/address/{userId}', [AddressController::class, 'addressIndex']);

//Payment API's
Route::post('/payment' , [PaymentController::class, 'store']);
Route::get('/payment' , [PaymentController::class, 'index']);
Route::patch('/payment' , [PaymentController::class, 'update']);
Route::delete('/payment/delete' , [PaymentController::class, 'destroy']);

//ORDER API's
Route::post('/neworder' , [OrderController::class, 'store']);
Route::post('/neworderisaddress' , [OrderController::class, 'storeIsAddress']);
Route::get('/order',[OrderController::class,'index'])->middleware('auth:sanctum');

//Role API's
Route::post('/role', [RegisterController::class, 'roleStore'])->middleware('auth:sanctum');
Route::get('/role', [RegisterController::class, 'roleIndex'])->middleware('auth:sanctum');
Route::patch('/role', [RegisterController::class, 'roleUpdate'])->middleware('auth:sanctum');
Route::delete('/role/delete', [RegisterController::class, 'roleDestroy'])->middleware('auth:sanctum');

//Locker API's
Route::post('/locker', [LockerController::class, 'lockerStore']);
Route::get('/locker', [LockerController::class, 'lockerIndex']);
Route::patch('/locker', [LockerController::class, 'lockerUpdate']);
Route::delete('/locker/delete', [LockerController::class, 'lockerDestroy']);

//Role management
Route::group(['middleware' => ['auth', 'checkadmin:70']], function () {
    Route::get('/admindashboard', function (Request $request) {
        return response()->json(['message' => 'Admin access granted']);
    });
     
});

Route::post('/publicareaname', [AddressController::class, 'publicAreaStore']);  

Route::group(['middleware' => ['auth', 'checkadmin:100']], function () {
    // Super admin routes
});


