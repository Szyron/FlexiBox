<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;



class ProfileController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:8192',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('images', $fileName, 'public');
            $validatedData['file_path'] = '/storage/' . $filePath;
            $validatedData['file_name'] = $fileName;
        }

        $profile = Profile::create($validatedData);

        Log::info('Profile created successfully', [
            'profile' => [
                'id' => $profile->id,
                'image' => $profile->file_path,
            ],
            
            ]);

        return response()->json($profile, 201);
    }

    public function index(Request $request)

    {
         
         $userId = $request->header('userId');

        $profile = Profile::where('user_id', $userId)->first();

        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 200);
        }

        return response()->json($profile, 200);
    }

    public function update(Request $request)
{
     
     $userId = $request->header('userId');
    
    $profile = Profile::where('user_id', $userId)->first();

    if (!$profile) {
        
        $validatedData = $request->validate([
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:8192',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('images', $fileName, 'public');
            $validatedData['file_path'] = '/storage/' . $filePath;
            $validatedData['file_name'] = $fileName;
        }

        $validatedData['user_id'] = $userId;   
        $profile = Profile::create($validatedData);

        Log::info('Profile created successfully', [
            'profile' => [
                'id' => $profile->id,
                'image' => $profile->file_path,
            ],
        ]);

        return response()->json($profile, 201);
    }

    
    $validatedData = $request->validate([
        'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:8192',
    ]);

    if ($request->hasFile('image')) {
        
        if ($profile->file_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $profile->file_path));
        }

        $file = $request->file('image');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('images', $fileName, 'public');
        $validatedData['file_path'] = '/storage/' . $filePath;
        $validatedData['file_name'] = $fileName;
    }

    $profile->update($validatedData);

    Log::info('Profile updated successfully', [
        'profile' => [
            'id' => $profile->id,
            'image' => $profile->file_path,
        ],
    ]);

    return response()->json($profile, 200);
}

public function destroy(Request $request)
{
    
     $userId = $request->header('userId');
    
    $profile = Profile::where('user_id', $userId)->first();

    if (!$profile) {
        return response()->json(['message' => 'Profile not found'], 200);
    }

    if ($profile->file_path) {
        Storage::disk('public')->delete(str_replace('/storage/', '', $profile->file_path));
    }

    $profile->delete();

    Log::info('Profile deleted successfully', [
        'profile' => [
            'id' => $profile->id,
            'image' => $profile->file_path,
        ],
    ]);

    return response()->json(['message' => 'Profile deleted successfully'], 200);


}
}
