<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('rayons')->insert([
            ['id' => 'R01', 'name' => 'Sidoarjo', 'sales_area' => 'Area Surabaya', 'regional' => 'RE4'],
            ['id' => 'R02', 'name' => 'Bantul', 'sales_area' => 'Area Jogja', 'regional' => 'RE3'],
            ['id' => 'R03', 'name' => 'Sukabumi', 'sales_area' => 'Area Bandung', 'regional' => 'RE2'],
            ['id' => 'R04', 'name' => 'Martapura', 'sales_area' => 'Area Banjarbaru', 'regional' => 'RE5'],
        ]);

        DB::table('brands')->insert([
            ['id' => 'B01', 'name' => 'Evo'],
            ['id' => 'B02', 'name' => 'Diplomat'],
            ['id' => 'B03', 'name' => 'Galan'],
            ['id' => 'B04', 'name' => 'Wismilak Kretek'],
        ]);

        DB::table('customers')->insert([
            ['id' => 'C01', 'name' => 'ani', 'address' => 'jl bluru kidul no.5', 'rayon_id' => 'R01'],
            ['id' => 'C02', 'name' => 'budi', 'address' => 'jl jasem no.2', 'rayon_id' => 'R02'],
            ['id' => 'C03', 'name' => 'charlie', 'address' => 'jl. Kartini no.3', 'rayon_id' => 'R03'],
            ['id' => 'C04', 'name' => 'dani', 'address' => 'jl. Batu pualam no.7', 'rayon_id' => 'R04'],
        ]);

        DB::table('salesmen')->insert([
            ['id' => 'S01', 'name' => 'fariz', 'type' => 'grosir', 'rayon_id' => 'R01'],
            ['id' => 'S02', 'name' => 'fathir', 'type' => 'retail', 'rayon_id' => 'R02'],
            ['id' => 'S03', 'name' => 'afir', 'type' => 'retail', 'rayon_id' => 'R03'],
            ['id' => 'S04', 'name' => 'selena', 'type' => 'retail', 'rayon_id' => 'R04'],
        ]);

        DB::table('cust_times')->insert([
            ['month' => '01', 'quarter' => 1, 'year' => 2024],
            ['month' => '02', 'quarter' => 1, 'year' => 2024],
            ['month' => '03', 'quarter' => 1, 'year' => 2024],
            ['month' => '04', 'quarter' => 1, 'year' => 2024],
        ]);
    }
}
