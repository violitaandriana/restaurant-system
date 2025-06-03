<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use Illuminate\Http\Request;

class SalesOrderController extends Controller
{
    public function index()
    {
        $salesOrders = SalesOrder::with('brand', 'customer', 'rayon', 'salesman')->get();
        return response()->json([
            'salesOrders' => $salesOrders,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        // Hitung jumlah row, lalu +1
        $count = SalesOrder::count();
        $newId = str_pad($count + 1, 2, '0', STR_PAD_LEFT);

        $salesOrder = SalesOrder::create([
            'id' => $newId,
            'date' => $request->date,
            'type' => $request->type,
            'brand_id' => $request->brand_id,
            'customer_id' => $request->customer_id,
            'rayon_id' => $request->rayon_id,
            'salesman_id' => $request->salesman_id,
            'quantity' => $request->quantity,
            'qty_unit' => $request->qty_unit,
        ]);

        return response()->json($salesOrder, 201);
    }

    public function update(Request $request, $salesOrderId)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'type' => 'required|string|max:50',
            'brand_id' => 'required|integer|exists:brands,id',
            'customer_id' => 'required|integer|exists:customers,id',
            'rayon_id' => 'required|integer|exists:rayons,id',
            'salesman_id' => 'required|integer|exists:salesmen,id',
            'quantity' => 'required|numeric',
            'qty_unit' => 'required|string|max:20',
        ]);

        $salesOrder = SalesOrder::findOrFail($salesOrderId);

        $salesOrder->update($validated);

        return response()->json($salesOrder, 201);
    }

    public function destroy($salesOrderId)
    {
        $salesOrder = SalesOrder::findOrFail($salesOrderId);

        $salesOrder->delete();

        return response()->json(['message' => 'SO deleted successfully']);
    }
}
