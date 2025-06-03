<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::with('salesOrders')->get();
        return response()->json([
            'brands' => $brands,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        // Hitung jumlah row, lalu +1
        $count = Brand::count();
        $newId = 'B' . str_pad($count + 1, 2, '0', STR_PAD_LEFT); // B01, B02, dst.

        $brand = Brand::create([
            'id' => $newId,
            'name' => $request->name,
        ]);

        return response()->json($brand, 201);
    }

    public function update(Request $request, $brandId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $brand = Brand::findOrFail($brandId);

        $brand->update($validated);

        return response()->json($brand, 201);
    }

    public function destroy($brandId)
    {
        $brand = Brand::findOrFail($brandId);

        $brand->delete();

        return response()->json(['message' => 'Brand deleted successfully']);
    }
}
