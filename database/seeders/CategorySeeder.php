<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Watch',
            'slug' => 'watch',
        ]);
        Category::create([
            'name' => 'Phone',
            'slug' => 'phone',
        ]);

        Category::create([
            'name' => 'Computer',
            'slug' => 'computer',
        ]);
    }
}
