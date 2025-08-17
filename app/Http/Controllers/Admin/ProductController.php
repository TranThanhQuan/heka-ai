<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index(){

        //lấy tất cả các bản ghi từ bảng products
        //Kết quả trả về là một tập hợp (collection) chứa tất cả các đối tượng Product.
        $products = Product::with('category','brand', 'product_images')->get();
        $brands = Brand::get();
        $categories = Category::get();

        // render component với tham số là 'products' với giá trị là kết quả lấy từ table
        return Inertia::render('Admin/Product/Index', ['products' => $products, 'brands' => $brands, 'categories' => $categories]);
    }

    public function store(Request $request){
        // dd($request->file('product_images'));
        $product = new Product();

        $product->title = $request->title;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;

        $product->save();

        //check if product has images uploaded

        if($request->hasFile('product_images')){
            $productImages = $request->file('product_images');
            foreach($productImages as $image){
                //generate a unique name for the image using timestamp and random string
                $uniqueName = time() . '-' . Str::random(10) . '-' .$image->getClientOriginalExtension();

                //store the image in the public folder with the unique name
                $image->move('product_images', $uniqueName);

                //create a new ProductImage record with the product id and unique name
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => 'product_images/' .$uniqueName,
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Thêm sản phẩm thành công!');

    }

    public function deleteImage($id){
        $image = ProductImage::where('id', $id)->delete();
        return redirect()->route('admin.products.index')->with('success', 'Xóa ảnh thành công!');
    }

    public function update(Request $request, $id){
        $product = Product::findOrFail($id);
        $product->title = $request->title;
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;


        // check if product images were uploaded
        if($request->hasFile('product_images')){
            $productImages = $request->file('product_images');
            //lặp qua các hình ảnh  đươc tải lên
            foreach($productImages as $image){
                //generate a unique name for the image using timestamp and random string
                $uniqueName = time(). '-' . Str::random(10). '-' .$image->getClientOriginalExtension();

                //store the image in the public folder with the unique name
                $image->move('product_images', $uniqueName);

                //create a new ProductImage record with the product id and unique name
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => 'product_images/'. $uniqueName,
                ]);
            }
        }

        $product->update();

        return redirect()->route('admin.products.index')->with('success', 'Cập nhật sản phẩm thành công!');
    }

    public function destroy($id){
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Xóa sản phẩm thành công!');
    }

}
