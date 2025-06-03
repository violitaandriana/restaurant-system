<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    public function run()
    {
        $menus = [
            // Appetizers
            [
                'name' => 'Caesar Salad',
                'description' => 'Fresh romaine lettuce with parmesan cheese and croutons',
                'price' => 45000,
                'category' => 'appetizer',
                'image' => 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Chicken Wings',
                'description' => 'Crispy chicken wings with buffalo sauce',
                'price' => 55000,
                'category' => 'appetizer',
                'image' => 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Mozzarella Sticks',
                'description' => 'Breaded mozzarella cheese sticks with marinara sauce',
                'price' => 40000,
                'category' => 'appetizer',
                'image' => 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400',
                'is_available' => true,
            ],

            // Main Course
            [
                'name' => 'Grilled Salmon',
                'description' => 'Fresh Atlantic salmon grilled to perfection with lemon butter',
                'price' => 125000,
                'category' => 'main',
                'image' => 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Beef Steak',
                'description' => 'Premium beef steak cooked to your preference with vegetables',
                'price' => 150000,
                'category' => 'main',
                'image' => 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Chicken Parmesan',
                'description' => 'Breaded chicken breast topped with marinara and mozzarella',
                'price' => 95000,
                'category' => 'main',
                'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Pasta Carbonara',
                'description' => 'Creamy pasta with bacon, eggs, and parmesan cheese',
                'price' => 75000,
                'category' => 'main',
                'image' => 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Margherita Pizza',
                'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
                'price' => 85000,
                'category' => 'main',
                'image' => 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
                'is_available' => true,
            ],

            // Desserts
            [
                'name' => 'Chocolate Lava Cake',
                'description' => 'Warm chocolate cake with molten chocolate center',
                'price' => 35000,
                'category' => 'dessert',
                'image' => 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Tiramisu',
                'description' => 'Classic Italian dessert with coffee-soaked ladyfingers',
                'price' => 40000,
                'category' => 'dessert',
                'image' => 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Cheesecake',
                'description' => 'New York style cheesecake with berry compote',
                'price' => 38000,
                'category' => 'dessert',
                'image' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
                'is_available' => true,
            ],

            // Beverages
            [
                'name' => 'Fresh Orange Juice',
                'description' => 'Freshly squeezed orange juice',
                'price' => 25000,
                'category' => 'beverage',
                'image' => 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Iced Coffee',
                'description' => 'Cold brew coffee served with ice',
                'price' => 20000,
                'category' => 'beverage',
                'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Lemonade',
                'description' => 'Fresh lemonade with mint leaves',
                'price' => 18000,
                'category' => 'beverage',
                'image' => 'https://images.unsplash.com/photo-1523371683702-4c851f5d4ba9?w=400',
                'is_available' => true,
            ],
            [
                'name' => 'Mineral Water',
                'description' => 'Premium mineral water',
                'price' => 10000,
                'category' => 'beverage',
                'image' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
                'is_available' => true,
            ],
        ];

        foreach ($menus as $menu) {
            Menu::create($menu);
        }
    }
}
