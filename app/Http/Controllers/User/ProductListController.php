<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;

class ProductListController extends Controller
{

    public function index(){
        // Lấy toàn bộ sản phẩm từ cơ sở dữ liệu kèm theo quan hệ
        $products = Product::with('category', 'brand' , 'product_images');

        //Áp dụng bộ lọc và phân trang cho danh sách sản phẩm
        $filterProducts = $products->filtered()->paginate(9)->withQueryString();

        // danh sách categories và brands từ DB
        $categories = Category::get();
        $brands = Brand::get();

        return Inertia::render('User/ProductList',[
                                                    'products' => ProductResource::collection($filterProducts),
                                                    'categories' => $categories,
                                                    'brands' => $brands
                                                ]);
    }
}
