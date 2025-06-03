<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Menu;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $menus = Menu::all();
        $statuses = ['pending', 'preparing', 'ready', 'completed'];
        $customerNames = [
            'John Doe',
            'Jane Smith',
            'Bob Johnson',
            'Alice Brown',
            'Charlie Wilson',
            'Diana Davis',
            'Edward Miller',
            'Fiona Garcia',
            'George Martinez',
            'Helen Rodriguez'
        ];

        // Create 20 sample orders
        for ($i = 1; $i <= 20; $i++) {
            $order = Order::create([
                'customer_name' => $customerNames[array_rand($customerNames)],
                'table_number' => rand(1, 20),
                'status' => $statuses[array_rand($statuses)],
                'notes' => rand(0, 1) ? 'No onions please' : null,
                'total_amount' => 0,
                'created_at' => now()->subHours(rand(0, 48)),
            ]);

            // Add 1-4 random items to each order
            $itemCount = rand(1, 4);
            $totalAmount = 0;

            for ($j = 0; $j < $itemCount; $j++) {
                $menu = $menus->random();
                $quantity = rand(1, 3);
                $price = $menu->price;

                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id' => $menu->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);

                $totalAmount += $price * $quantity;
            }

            $order->update(['total_amount' => $totalAmount]);
        }
    }
}
