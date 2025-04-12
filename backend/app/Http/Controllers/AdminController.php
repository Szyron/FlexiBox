<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AdminController extends Controller
{
    public function index()
    {
         // Retrieve all users
        // $users = User::all();

        // Retrieve all users with their roles
        //$users = User::with('role')->get();


         // Return the users data, you can return it as JSON or pass it to a view
         //return response()->json($users);
    if (Auth::user()->role->power < 70) {
        // Ha nem, akkor visszatérsz egy 403-as státusz kóddal
        return response()->json([
            'message' => 'nincs jogosultsága'
        ], 403);
    }

    // Ha jogosultsága van, akkor lekérdezed az összes felhasználót a szerepükkel együtt
    $users = User::with('role')->get();

    // Visszaadod a felhasználók adatokat JSON formátumban
    return response()->json($users);
    }
}
