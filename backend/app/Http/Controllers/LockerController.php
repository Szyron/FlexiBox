<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Locker;

class LockerController extends Controller
{
    public function lockerStore(Request $request)
    {
        $request->validate([
            'locker_name' => 'required|string|max:255',
            'address' =>  'required|string|max:255',
            'description' => 'required|string|max:1000',
        ]);

        $locker = new Locker();
        $locker->locker_name = $request->locker_name;
        $locker->address = $request->address;
        $locker->description = $request->description;
        $locker->save();

        return response()->json([
            'message' => 'Locker created successfully',
            'locker' => $locker
        ], 200);
    }

    public function lockerIndex()
    {
        $lockers = Locker::all();
        return response()->json([
            'lockers' => $lockers
        ], 200);
    }

    public function lockerUpdate(Request $request)
    {
        $request->validate([
            'locker_name' => 'required|string|max:255',
            'address' =>  'required|string|max:255',
            'description' => 'required|string|max:1000',
        ]);

        $locker = Locker::find($request->id);
        if (!$locker) {
            return response()->json([
                'message' => 'Locker not found'
            ], 404);
        }

        $locker->locker_name = $request->locker_name;
        $locker->address = $request->address;
        $locker->description = $request->description;
        $locker->save();

        return response()->json([
            'message' => 'Locker updated successfully',
            'locker' => $locker
        ], 200);
    }
    public function lockerDestroy(Request $request)
    {
        $locker = Locker::find($request->id);
        if (!$locker) {
            return response()->json([
                'message' => 'Locker not found'
            ], 404);
        }
        $locker->delete();

        return response()->json([
            'message' => 'Locker deleted successfully'
        ], 200);

    }
}
