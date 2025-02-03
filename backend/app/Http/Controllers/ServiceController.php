<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class ServiceController extends Controller
{
    public function categoryStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->save();

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category
        ], 201);
    }

    public function productStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price_per_day' => 'required|integer',
            'category_id' => 'required|integer|exists:categories,id',
            'available' => 'required|boolean'
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price_per_day = $request->price_per_day;
        $product->category_id = $request->category_id;
        $product->available = $request->available;
        $product->save();

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    }

    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories 
        ], 200);
    }

    public function productIndex()
    {
        //$products = Product::all();
        $products = Product::with('category')->get();

        /* $products = Product::join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.name as category_name')
            ->get(); */

        return response()->json([
            'products' => $products
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
