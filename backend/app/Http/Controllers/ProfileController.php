<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;



class ProfileController extends Controller
{
     /**
     * Store a newly created profile in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:8192',
            'city' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'zip' => 'required|string|max:10',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('images', $fileName, 'public');
            $validatedData['file_path'] = '/storage/' . $filePath;
            $validatedData['file_name'] = $fileName; // Ensure file_name is set
        }

        $profile = Profile::create($validatedData);

        Log::info('Profile created successfully', ['profile' => $profile]);

        return response()->json($profile, 201);
    }

    /**
     * Display the specified profile by user_id.
     */
    public function index($user_id)
    {
        $profile = Profile::where('user_id', $user_id)->first();

        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        return response()->json($profile, 200);
    }


}
