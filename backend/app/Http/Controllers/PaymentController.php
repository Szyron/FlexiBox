<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentMethod;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'card_type' => 'required|string',
        ]);

        $paymentMethod = PaymentMethod::create([
            'card_type' => $request->card_type,
        ]);

        return response()->json([
            'message' => 'Payment method created successfully',
            'paymentMethod' => $paymentMethod,
        ]);
    }
    public function index()
    {
        $paymentMethods = PaymentMethod::all();

        return response()->json([
            'paymentMethods' => $paymentMethods,
        ]);
    }
    public function update(Request $request)
    {
        $request->validate([
            'card_type' => 'required|string',
        ]);
       
        $id = $request->header('PaymentId');

        $paymentMethod = PaymentMethod::find($request->id);
        $paymentMethod->card_type = $request->card_type;
        $paymentMethod->save();

        return response()->json([
            'message' => 'Payment method updated successfully',
            'paymentMethod' => $paymentMethod,
        ]);
    }

    public function destroy(Request $request)
    {
       
        $id = $request->header('PaymentId');

        $paymentMethod = PaymentMethod::find($id);
        $paymentMethod->delete();

        return response()->json([
            'message' => 'Payment method deleted successfully',
        ]);
    }
}
