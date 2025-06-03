<?php

namespace App\Http\Controllers;

use App\Models\Salesman;
use Illuminate\Http\Request;

class SalesmanController extends Controller
{
    public function index()
    {
        $salesmen = Salesman::with('salesOrders', 'rayon')->get();
        return response()->json([
            'salesmen' => $salesmen,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        // Hitung jumlah row, lalu +1
        $count = Salesman::count();
        $newId = 'S' . str_pad($count + 1, 2, '0', STR_PAD_LEFT); // B01, B02, dst.

        $salesman = Salesman::create([
            'id' => $newId,
            'name' => $request->name,
            'type' => $request->type,
            'rayon_id' => $request->rayon_id
        ]);

        return response()->json($salesman, 201);
    }

    public function update(Request $request, $salesmanId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|string|max:500',
            'rayon_id' => 'required|string|max:100',
        ]);

        $salesman = Salesman::findOrFail($salesmanId);

        $salesman->update($validated);

        return response()->json($salesman, 201);
    }

    public function destroy($salesmanId)
    {
        $salesman = Salesman::findOrFail($salesmanId);

        $salesman->delete();

        return response()->json(['message' => 'Salesman deleted successfully']);
    }
}
