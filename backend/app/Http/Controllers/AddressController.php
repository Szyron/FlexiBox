<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StreetType;
use App\Models\Address;
use App\Models\User;


class AddressController extends Controller
{
    public function publicAreaStore(Request $request)
    {
        $request->validate([
            'public_area_name' => 'required|string',
        ]);

        $publicArea = new StreetType();
        $publicArea->public_area_name = $request->public_area_name;
        $publicArea->save();

        return response()->json([
            'message' => 'Public Area created successfully',
            'publicArea' => $publicArea
        ], 201);
    }

    public function publicAreaIndex()
    {
        $publicAreas = StreetType::all();

        return response()->json([
            'publicAreas' => $publicAreas
        ], 200);
    }

    public function publicAreaDestroy(Request $request)
    {
         
       // Get the category_id from the request headers
       $id = $request->header('StreetTypeId');

        $publicArea = StreetType::find($id);
        $publicArea->delete();

        return response()->json([
            'message' => 'Public Area deleted successfully'
        ], 200);
    }

    public function publicAreaUpdate(Request $request)
    {
        $request->validate([
            'public_area_name' => 'required|string',
        ]);

        // Get the category_id from the request headers
        $id = $request->header('StreetTypeId');

        $publicArea = StreetType::find($id);
        $publicArea->public_area_name = $request->public_area_name;
        $publicArea->save();

        return response()->json([
            'message' => 'Public Area updated successfully',
            'publicArea' => $publicArea
        ], 200);
    }

    public function addressStore(Request $request)
    {
        $request->validate([
            'zip' => 'required|integer|min:1000|max:9999',
            'street' => 'required|string',
            'city' => 'required|string',
            'email' => 'required|email',
            'street_id' => 'required|integer',
            'house_number' => 'required|string',
            'user_id' => 'required|integer'
        ]);


    
        $address = new Address();
        $address->zip = $request->zip;
        $address->street = $request->street;
        $address->city = $request->city;
        $address->email = $request->email;
        $address->street_id = $request->street_id;
        $address->house_number = $request->house_number;
        $address->user_id = $request->user_id;
        $address->save();
       
       
    
        return response()->json([
            'message' => 'Address created successfully',
            'address' => $address
        ], 201);
    }
    
    public function addressIndex($userId)
    {
       $user= User::find($userId);
       if (!$user) {
           return response()->json([
               'message' => 'User not found'
           ], 404);
         }
        $addresses = Address::where('user_id', $userId)->with('streetType')->get();
        
        return response()->json([
            'addresses' => $addresses
        ]
        , 200);
        
    }
   
   
}
