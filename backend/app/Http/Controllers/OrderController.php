<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function store(Request $request)
    {
        $order = new Order();
        $order->total = $request->total;
        $order->order_item_id = $request->order_item_id;
        $order->customer_id = $request->customer_id;
        $order->save();

        $orderItem = new OrderItem();
        $orderItem->quantity = $request->quantity;
        $orderItem->item_price = $request->item_price;
        $orderItem->product_id = $request->product_id;
        $orderItem->save();

        
        return response()->json($order);
    }

}
