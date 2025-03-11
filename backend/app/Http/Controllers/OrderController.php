<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;


class OrderController extends Controller
{

    public function store(Request $request)
    {
        \Log::info('Received data:', $request->all());
        // Validate the request data
        $validatedData = $request->validate([
            'city' => 'required|string',
            'zip' => 'required|string',
            'email' => 'required|email',
            'street_id' => 'required|numeric',
            'street' => 'required|string',
            'house_number' => 'required|string',
            'user_id' => 'required|integer',
            'payments_method_id' => 'required|integer', // Add this line
            'cart_items' => 'required|array',
            'cart_items.*.quantity' => 'required|integer',
            'cart_items.*.product_id' => 'required|integer',
            'cart_items.*.item_price' => 'required|numeric',
        ]);

        // Create the address
        $address = Address::create([
            'city' => $validatedData['city'],
            'zip' => $validatedData['zip'],
            'email' => $validatedData['email'],
            'street_id' => $validatedData['street_id'],
            'street' => $validatedData['street'],
            'house_number' => $validatedData['house_number'],
            'user_id' => $validatedData['user_id'],
        ]);

        // Calculate the total for the order
        $total = 0;
        foreach ($validatedData['cart_items'] as $item) {
            $total += $item['item_price'] * $item['quantity'];
        }

        // Create the order
        $order = Order::create([
            'address_id' => $address->id,
            'user_id' => $validatedData['user_id'],
            'payments_method_id' => $validatedData['payments_method_id'], // Add this line
            'total' => $total, // Set the total value
        ]);

        // Create the order items
        foreach ($validatedData['cart_items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'quantity' => $item['quantity'],
                'product_id' => $item['product_id'],
                'item_price' => $item['item_price'],
                'line_total' => $item['item_price'] * $item['quantity'],
            ]);
        }
        
        return response()->json(['message' => 'Order created successfully'], 201);
    }
    
    public function index(Request $request)
    {
       // Get the user_id from the request headers
       $user_id = $request->header('userId');
    
       
        

       // Fetch orders for the authenticated user with related data
       $orders = Order::with(['orderItem', 'address', 'user'])
           ->where('user_id', $user_id)
           ->orderBy('created_at', 'desc')
        ->first();
         //  ->get();

       return response()->json([$orders]);
        
    }
}
