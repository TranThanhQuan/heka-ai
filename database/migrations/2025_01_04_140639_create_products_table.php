<?php


use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->string('title', 200);
            $table->string('slug', 255);
            $table->integer('quantity');
            $table->longText('description')->nullable();
            $table->boolean('published')->default(0);
            $table->boolean('inStock')->default(0);
            $table->integer('price');

            // Liên kết tới bảng users
            $table->foreignIdFor(User::class, 'created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignIdFor(User::class, 'updated_by')->nullable()->constrained('users')->nullOnDelete();

            // Liên kết tới bảng brands
            $table->foreignIdFor(Brand::class, 'brand_id')->nullable()->constrained('brands')->nullOnDelete();

            // Liên kết tới bảng categories
            $table->foreignIdFor(Category::class, 'category_id')->nullable()->constrained('categories')->nullOnDelete();

            // Soft delete
            $table->softDeletes();
            $table->foreignIdFor(User::class, 'deleted_by')->nullable()->constrained('users')->nullOnDelete();

            // Timestamps
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
