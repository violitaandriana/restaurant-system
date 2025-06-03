<?php

namespace App\Http\Controllers;

use App\Models\Rayon;
use Illuminate\Http\Request;

class RayonController extends Controller
{
    public function index()
    {
        $rayons = Rayon::with('salesOrders', 'customers', 'salesmen')->get();
        return response()->json([
            'rayons' => $rayons,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        // Hitung jumlah row, lalu +1
        $count = Rayon::count();
        $newId = 'R' . str_pad($count + 1, 2, '0', STR_PAD_LEFT); // B01, B02, dst.

        $rayon  = Rayon::create([
            'id' => $newId,
            'name' => $request->name,
            'sales_area' => $request->sales_area,
            'regional' => $request->regional
        ]);

        return response()->json($rayon , 201);
    }

    public function update(Request $request, $rayonId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'sales_area' => 'required|string|max:500',
            'regional' => 'required|string|max:100',
        ]);

        $rayon  = Rayon::findOrFail($rayonId);

        $rayon ->update($validated);

        return response()->json($rayon , 201);
    }

    public function destroy($rayonId)
    {
        $rayon  = Rayon::findOrFail($rayonId);

        $rayon ->delete();

        return response()->json(['message' => 'Brand deleted successfully']);
    }
}
