<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
//use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;




class OrderController extends Controller
{

    public function store(Request $request)
    {
        Log::info('Received data: Hello', $request->all());
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
            'cart_items.*.lockerId' => 'required|integer', // Update validation to reflect 'lockerId'
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
            \Log::info('Creating OrderItem with data:', $item);
            OrderItem::create([
                'order_id' => $order->id,
                'quantity' => $item['quantity'],
                'product_id' => $item['product_id'],
                'item_price' => $item['item_price'],
                'line_total' => $item['item_price'] * $item['quantity'],
                'locker_id' => $item['lockerId'],  // Map 'lockerId' from frontend to 'locker_id' in DB
            ]);

        }

        
        return response()->json(['message' => 'Order created successfully'], 201);
    }
    
    public function index(Request $request)
    {
       // Get the user_id from the request headers
       $user_id = $request->header('userId');
    
       
        

       // Fetch orders for the authenticated user with related data
       $orders = Order::with(['orderItem.locker', 'address', 'user',])
           ->where('user_id', $user_id)
           ->orderBy('created_at', 'desc')
        ->first();
         //  ->get();

       return response()->json([$orders]);
        
    }

    public function orderindex(Request $request)
    {
       // Get the user_id from the request headers
       //$user_id = $request->header('userId');

         // Az autentikált felhasználó lekérése
    $authUser = Auth::user();

    // Ellenőrizzük, hogy a felhasználónak van-e kapcsolata a role modellel
    if ($authUser->role && $authUser->role->power < 70) {
        return response()->json([
            'message' => 'No permission to view orders'
        ], 403);  // 403-as válasz, ha nincs jogosultság
    }

    // Az összes rendelés lekérése
    $orders = Order::with(['orderItem.locker', 'address', 'user'])
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($orders);  // Visszaadjuk az adatokat
        

     

      

      
    }

    public function storeIsAddress(Request $request)
    {
        \Log::info('Received data:', $request->all());
        // Validate the request data
        $validatedData = $request->validate([
            'address_id' => 'required|integer',
            'user_id' => 'required|integer',
            'payments_method_id' => 'required|integer', // Add this line
            'cart_items' => 'required|array',
            'cart_items.*.quantity' => 'required|integer',
            'cart_items.*.product_id' => 'required|integer',
            'cart_items.*.item_price' => 'required|numeric',
            'cart_items.*.lockerId' => 'required|integer', // Update validation to reflect 'lockerId'
        ]);

        // Calculate the total for the order
        $total = 0;
        foreach ($validatedData['cart_items'] as $item) {
            $total += $item['item_price'] * $item['quantity'];
        }

        // Create the order
        $order = Order::create([
            'address_id' => $validatedData['address_id'],
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
                'locker_id' => $item['lockerId'], // Map 'lockerId' from frontend to 'locker_id' in DB
            ]);
        }
        
        return response()->json(['message' => 'Order created successfully'], 201);
    }

    public function deleteOrder(Request $request)
{
     // Az autentikált felhasználó lekérése
     $authUser = Auth::user();

     // Ellenőrizzük, hogy a felhasználónak van-e kapcsolata a role modellel
     if ($authUser->role && $authUser->role->power < 70) {
         return response()->json([
             'message' => 'Nincs jogosultság a rendelés törléséhez'
         ], 403);  // 403-as válasz, ha nincs jogosultság
     }
     
    try {
       
        // A body-ból kiolvassuk az order_id-t
        $orderId = $request->input('order_id');

        Log::info('Bejövő order ID törléshez: ' . $orderId);

        // Keresd meg a rendelést
        $order = Order::findOrFail($orderId);
        Log::info('Order megtalálva: ID = ' . $order->id);

        // Töröld a rendelés tételeket
       // $order->orderItems()->delete();
        $deletedItems = $order->orderItem()->delete();
    Log::info("Törölt order_items száma: $deletedItems");

        // Töröld a rendelést
        $order->delete();
        Log::info("Order törölve: ID = " . $order->id);

        return response()->json([
            'message' => 'Rendelés sikeresen törölve!'
        ], 200);
    } catch (\Exception $e) {
        Log::error('Törlési hiba: ' . $e->getMessage());
        return response()->json([
            'message' => 'Hiba történt a törlés során.',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
