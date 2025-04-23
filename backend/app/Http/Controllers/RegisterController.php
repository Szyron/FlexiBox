<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Models\Profile;
use App\Models\Role;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;


class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'role_id' => 'integer|exists:roles,id'
            ]);

             
             $roleId = $request->role_id ?? Role::where('warrant_name', 'user')->first()->id;

            
            $user = new User([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $roleId
            ]);

            
            $user->save();

           
            $token = $user->createToken('auth_token')->plainTextToken;

            
            return response()->json([
                'message' => 'Sikeres regisztráció!',
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            
            Log::error('Error during registration: ' . $e->getMessage());

            
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8|confirmed',
            ]);

           
            $user = User::where('email', $request->email)->first();

           
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);

            
            $user->save();

            
            $token = $user->createToken('auth_token')->plainTextToken;

            
            return response()->json([
                'message' => 'Sikeres módosítás!',
                'user' => $user
               
            ], 201);
        } catch (\Exception $e) {
           
            Log::error('Error during update: ' . $e->getMessage());

            
            return response()->json([
                'message' => 'Update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function edit(Request $request)
    {
        try {
            
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'role_id' => 'integer|exists:roles,id'  
            ]);

             $userId = $request->header('user_id');

            
            $user = User::find($userId);

             // Check if the authenticated user's power is greater than the user's power
        if (Auth::user()->role->power < $user->role->power) {
            return response()->json([
                'message' => 'No permission to edit this user'
            ], 403);
        }

           
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->role_id = $request->role_id;
           
            $user->save();

           
            return response()->json([
                'message' => 'Sikeres módosítás!',
                'user' => $user
               
            ], 201);
        } catch (\Exception $e) {
            
            Log::error('Error during update: ' . $e->getMessage());

            
            return response()->json([
                'message' => 'Update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

   

    public function destroy(Request $request)
	{
    	try {
        	Log::info('--- Törlés indult ---');
        	Log::info('Request headers:', $request->headers->all());
        	Log::info('Request body:', $request->all());

        	$authUser = Auth::user();
        	if (!$authUser) {
            		Log::warning('Nincs bejelentkezett felhasználó!');
            		return response()->json([
                	'message' => 'Nincs bejelentkezett felhasználó.'
            	], 401);
        }

        Log::info('Bejelentkezett felhasználó:', ['id' => $authUser->id]);

        
        $userId = $request->id ?? $userId = $request->header('userId'); 
        Log::info('Törlendő user ID:', ['id' => $userId]);

        $user = User::with('role', 'profile')->find($userId);
        if (!$user) {
            Log::warning("Felhasználó nem található ID: {$userId}");
            return response()->json(['message' => 'Felhasználó nem található.'], 404);
        }

        if (!$user->role) {
            Log::warning("Felhasználónak nincs szerepköre. ID: {$user->id}");
            return response()->json(['message' => 'A felhasználónak nincs szerepköre.'], 400);
        }

        if ($authUser->role->power < $user->role->power) {
            Log::warning("Jogosultság hiány törléshez. Auth user: {$authUser->id}, Target user: {$user->id}");
            return response()->json([
                'message' => 'Nincs jogosultság a felhasználó törléséhez.'
            ], 403);
        }

       
        if ($user->profile) {
            if ($user->profile->file_name) {
                Storage::disk('public')->delete('images/' . $user->profile->file_name);
                Log::info("Profilkép törölve: " . $user->profile->file_name);
            }

            $user->profile->delete();
            Log::info("Profil törölve.");
        }
	
	Address::where('user_id', $user->id)->delete();
	Log::info("Kapcsolódó címek törölve.");

        
        $user->delete();
        Log::info("Felhasználó törölve. ID: {$userId}");

        return response()->json([
            'message' => 'Sikeres törlés!'
        ], 200);

    } catch (\Exception $e) {
       
	Log::error('Hiba törlés közben: ' . $e->getMessage());

	return response()->json([
    		'message' => 'Törlés sikertelen.',
    		'error' => $e->getMessage()
	])->header('Content-Type', 'application/json; charset=UTF-8');
    }
}


    public function roleStore(Request $request)
    {
        try {
            
            $request->validate([
               'power' => 'required|integer|min:0|max:100',
                'warrant_name' => 'required|string|max:255|unique:roles',
            ]);

            
            $role = new Role([
                'power' => $request->power,
                'warrant_name' => $request->warrant_name,
            ]);

            
            $role->save();

            
            return response()->json([
                'message' => 'Role created',
                'role' => $role
            ], 201);
        } catch (\Exception $e) {
            
            Log::error('Error during role creation: ' . $e->getMessage());

           
            return response()->json([
                'message' => 'Role creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function roleIndex()
    {
        try {
            
            $roles = Role::all();

            
            return response()->json([
                'roles' => $roles
            ], 200);
        } catch (\Exception $e) {
            
            Log::error('Error during role index: ' . $e->getMessage());

            
            return response()->json([
                'message' => 'Role index failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function roleUpdate (Request $request)
    {
         
        try {
            
            $request->validate([
                'power' => 'required|integer|min:0|max:100',
                'warrant_name' => 'required|string|max:255',
            ]);

            
            $role = Role::find($request->id);

            
            $role->power = $request->power;
            $role->warrant_name = $request->warrant_name;

            
            $role->save();

            
            return response()->json([
                'message' => 'Role updated',
                'role' => $role
            ], 200);
        } catch (\Exception $e) {
            
            Log::error('Error during role update: ' . $e->getMessage());

            
            return response()->json([
                'message' => 'Role update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function roleDestroy(Request $request)
    {
        
        $roleId = $request->header('roleId');
        try {
           
            $role = Role::find($roleId);

           
            $role->delete();

           
            return response()->json([
                'message' => 'Role deleted'
            ], 200);
        } catch (\Exception $e) {
            
            Log::error('Error during role delete: ' . $e->getMessage());

            
            return response()->json([
                'message' => 'Role delete failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
