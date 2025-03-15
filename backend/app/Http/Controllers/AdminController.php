<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class AdminController extends Controller
{
    public function index()
    {
         // Retrieve all users
        // $users = User::all();

        // Retrieve all users with their roles
        $users = User::with('role')->get();


         // Return the users data, you can return it as JSON or pass it to a view
         return response()->json($users);
    }
}
