<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'title' => 'iPhone 16 Pro 128GB',
            'description' => 'iPhone 16 Pro chính là thế hệ điện thoại tiếp theo được Apple cho ra mắt vào tháng 9/2024',
            'price' => 27490000,
            'quantity' => 10,
            'category_id' => 1,
            'brand_id' => 1,
        ]);
    }
}
