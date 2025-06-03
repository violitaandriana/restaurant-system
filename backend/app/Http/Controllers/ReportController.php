<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SalesOrder;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        $soByBrand = SalesOrder::select('brand_id', DB::raw('SUM(quantity) as total_qty'))
            ->addSelect(DB::raw('DATE_FORMAT(date, "%M %Y") as month'))
            ->groupBy('brand_id', DB::raw('DATE_FORMAT(date, "%M %Y")'))
            ->get();

        $topSalesByArea = DB::table('sales_orders as so')
            ->join('rayons as r', 'so.rayon_id', '=', 'r.id')
            ->select(DB::raw('SUM(so.quantity) as total_qty'), 'r.sales_area', 'r.id')
            ->whereYear('so.date', 2024)
            ->groupBy('r.sales_area', 'r.id')
            ->orderByDesc('total_qty')
            ->limit(3)
            ->get();

        $topSalesByBrand = DB::table('sales_orders as so')
            ->join('brands as b', 'so.brand_id', '=', 'b.id')
            ->select('b.id as brand_id', 'b.name as brand_name', DB::raw('SUM(so.quantity) as total_qty'))
            ->whereYear('so.date', 2024)
            ->groupBy('b.id', 'b.name')
            ->orderByDesc('total_qty')
            ->limit(3)
            ->get();

        return response()->json([
            'data' => [
                'soByBrand' => $soByBrand,
                'topSalesByArea' => $topSalesByArea,
                'topSalesByBrand' => $topSalesByBrand,
            ]
        ]);
    }
}
