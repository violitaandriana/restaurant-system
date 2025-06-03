<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Menu;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $todayOrders = Order::whereDate('created_at', today())->count();
        $todayRevenue = Order::whereDate('created_at', today())
            ->where('status', 'completed')
            ->sum('total_amount');
        $totalMenus = Menu::count();
        $recentOrders = Order::with(['orderItems.menu'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // chart
        $ordersByCust = Order::select('customer_name', DB::raw('SUM(total_amount) as total'))
            ->groupBy('customer_name')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        $ordersByStatus = Order::select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->get();

        $ordersByDays = Order::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as total'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();

        $topOrderMenus = DB::table('order_items as oi')
            ->join('menus as m', 'oi.menu_id', '=', 'm.id')
            ->select(DB::raw('SUM(oi.quantity) as total_quantity'), 'm.name')
            ->groupBy('m.id', 'm.name')
            ->orderByDesc('total_quantity')
            ->take(5)
            ->get();

        return response()->json([
            'today_orders' => $todayOrders,
            'today_revenue' => $todayRevenue,
            'total_menus' => $totalMenus,
            'recent_orders' => $recentOrders,
            'orders_by_cust' => $ordersByCust,
            'orders_by_status' => $ordersByStatus,
            'orders_by_days' => $ordersByDays,
            'top_order_menus' => $topOrderMenus,
        ]);
    }
}
