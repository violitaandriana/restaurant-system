<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with(['orderItems.menu'])->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'table_number' => 'required|integer',
            'notes' => 'nullable|string',
            'items' => 'required|array',
            'items.*.menu_id' => 'required|exists:menus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0'
        ]);

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'table_number' => $validated['table_number'],
            'notes' => $validated['notes'] ?? '',
            'status' => 'pending',
            'total_amount' => 0
        ]);

        $totalAmount = 0;
        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'menu_id' => $item['menu_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price']
            ]);
            $totalAmount += $item['price'] * $item['quantity'];
        }

        $order->update(['total_amount' => $totalAmount]);
        return $order->load(['orderItems.menu']);
    }

    public function show(Order $order)
    {
        return $order->load(['orderItems.menu']);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,preparing,ready,completed,cancelled'
        ]);

        $order->update(['status' => $validated['status']]);
        return $order;
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
}
