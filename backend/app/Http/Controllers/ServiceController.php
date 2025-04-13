<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
            'name' => 'required|string',
            'description' => 'required|string',
            'price_per_day' => 'required|integer',
            'category_id' => 'required|integer|exists:categories,id',
            'available' => 'required|boolean',
            'locker_ids' => 'required|array',
            'locker_ids.*' => 'exists:lockers,id',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('product_images', $fileName, 'public');
            $validatedData['file_path'] = '/storage/' . $filePath;
            $validatedData['file_name'] = $fileName; // Ensure file_name is set
        }
           
         $product = new Product();
         $product->file_path = $validatedData['file_path'];
         $product->file_name = $validatedData['file_name'];
         $product->name = $request->name;
         $product->description = $request->description;
         $product->price_per_day = $request->price_per_day;
         $product->category_id = $request->category_id;
         $product->available = $request->available;
        $product->save();

       // $product = Product::create($validatedData);
       // Kapcsolat mentése
        //$product->lockers()->attach($request->locker_ids);

        // Pivot tábla adatok időbélyeggel
        $now = now();
        $lockerData = collect($request->locker_ids)->mapWithKeys(function ($id) use ($now) {
            return [
                $id => ['created_at' => $now, 'updated_at' => $now]
            ];
        })->toArray();

        // Kapcsolatok mentése a pivot táblába
        $product->lockers()->attach($lockerData);

        return response()->json([
            'message' => 'Product created successfully',
            //'product' => $product Régi
            'product' => $product->load('lockers')
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
        $products = Product::with(['category', 'lockers'])->get();

        /* $products = Product::join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.name as category_name')
            ->get(); */

        return response()->json([
            'products' => $products
        ], 200);
    }

    public function productUpdate(Request $request)
    {
        

        Log::info('Request data', $request->all());
        //Log::info('Product ID:', ['id' => $request->id]);
        Log::info('Product ID:', ['id' => $request->input('id')]); 
       
        try {
            $validatedData = $request->validate([
            'id' => 'required|integer|exists:products,id',
            'image' => 'sometimes|file|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'price_per_day' => 'sometimes|integer',
            'category_id' => 'sometimes|integer|exists:categories,id',
            'available' => 'sometimes|boolean',
            'locker_ids' => 'sometimes|array',
            'locker_ids.*' => 'exists:lockers,id',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    
        
        $product = Product::find($request->id);
        
    
        if ($request->hasFile('image')) {
            // Delete the old image file
            Storage::disk('public')->delete('product_images/' . $product->file_name);
    
            // Store the new image file
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('product_images', $fileName, 'public');
            $validatedData['file_path'] = '/storage/' . $filePath;
            $validatedData['file_name'] = $fileName; // Ensure file_name is set
        }
    
        // Update the product details
        $product->name = $validatedData['name'] ?? $product->name;
        $product->description = $validatedData['description'] ?? $product->description;
        $product->price_per_day = $validatedData['price_per_day'] ?? $product->price_per_day;
        $product->category_id = $validatedData['category_id'] ?? $product->category_id;
        $product->available = $validatedData['available'] ?? $product->available;
        if (isset($validatedData['file_path'])) {
            $product->file_path = $validatedData['file_path'];
            $product->file_name = $validatedData['file_name'];
        }
        $product->save();


        if ($request->has('locker_ids')) {
            $now = now();
            $lockerData = collect($request->locker_ids)->mapWithKeys(function ($id) use ($now) {
                return [
                    $id => ['created_at' => $now, 'updated_at' => $now]
                ];
            })->toArray();
        
            $product->lockers()->sync($lockerData);
        }
    
        return response()->json([
            'message' => 'Product updated successfully',
            /* 'product' => $product */
            'product' => $product->load('lockers')
        ], 200);
    }

    public function productDestroy(Request $request)
    {
       // Get the product_id from the request headers
       $id = $request->header('productId');
       
        $product = Product::find($id);
        Storage::disk('public')->delete('product_images/' . $product->file_name);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    }

    public function destroy(Request $request)
    {
        // Get the category_id from the request headers
       $id = $request->header('categoryId');

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
