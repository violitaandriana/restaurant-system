<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with('salesOrders', 'rayon')->get();
        return response()->json([
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        // Hitung jumlah row, lalu +1
        $count = Customer::count();
        $newId = 'C' . str_pad($count + 1, 2, '0', STR_PAD_LEFT); // B01, B02, dst.

        $customer = Customer::create([
            'id' => $newId,
            'name' => $request->name,
            'address' => $request->address,
            'rayon_id' => $request->rayon_id
        ]);

        return response()->json($customer, 201);
    }

    public function update(Request $request, $customerId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:500',
            'rayon_id' => 'required|string|max:100',
        ]);

        $customer = Customer::findOrFail($customerId);

        $customer->update($validated);

        return response()->json($customer, 201);
    }

    public function destroy($customerId)
    {
        $customer = Customer::findOrFail($customerId);

        $customer->delete();

        return response()->json(['message' => 'Brand deleted successfully']);
    }
}
