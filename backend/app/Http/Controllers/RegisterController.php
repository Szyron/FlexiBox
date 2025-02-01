<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Exception;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            // Create a new user
            $user = new User([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Save the user to the database
            $user->save();

            // Generate a token for the user
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return a JSON response with the token
            return response()->json([
                'message' => 'Sikeres regisztráció!',
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error during registration: ' . $e->getMessage());

            // Return a JSON response with the error message
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8|confirmed',
            ]);

            // Find the user by email
            $user = User::where('email', $request->email)->first();

            // Update the user
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);

            // Save the user to the database
            $user->save();

            // Generate a token for the user
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return a JSON response with the token
            return response()->json([
                'message' => 'Sikeres módosítás!',
                'user' => $user
               
            ], 201);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error during update: ' . $e->getMessage());

            // Return a JSON response with the error message
            return response()->json([
                'message' => 'Update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
