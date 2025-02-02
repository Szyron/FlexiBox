<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Category;

class ServiceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->save();

        return response()->json([
            'message' => 'Service created successfully',
            'category' => $category
        ], 201);
    }

    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories 
        ], 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->json([
            'message' => 'Service deleted successfully'
        ], 200);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'string',
        ]);

        $category = Category::find($request->id);
        $category->name = $request->name;
        $category->save();

        return response()->json([
            'message' => 'Service updated successfully',
        ], 200);
    }
}
