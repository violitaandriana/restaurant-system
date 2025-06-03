<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $salesTrendByBrandByMonth = DB::table('sales_orders as so')
            ->join('brands as b', 'so.brand_id', '=', 'b.id')
            ->select(
                'b.id as brand_id',
                'b.name as brand_name',
                DB::raw('DATE_FORMAT(so.date, "%Y-%m") as month'),
                DB::raw('SUM(so.quantity) as total_orders')
            )
            ->whereYear('so.date', 2024)
            ->groupBy('b.id', 'b.name', DB::raw('DATE_FORMAT(so.date, "%Y-%m")'))
            ->orderBy('month')
            ->orderByDesc('total_orders')
            ->get();

        return response()->json([
            'data' => [
                'salesTrendByBrandByMonth' => $salesTrendByBrandByMonth
            ]
        ]);
    }
}
