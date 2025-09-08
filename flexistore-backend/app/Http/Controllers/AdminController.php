<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AdminController extends Controller
{
    public function index()
    {
       
    if (Auth::user()->role->power < 70) {
       
        return response()->json([
            'message' => 'nincs jogosultsága'
        ], 403);
    }

   
    $users = User::with('role')->get();

   
    return response()->json($users);
    }
}
