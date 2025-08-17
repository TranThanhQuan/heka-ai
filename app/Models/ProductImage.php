<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Spatie\Sluggable\HasSlug;
// use Spatie\Sluggable\SlugOptions;


class ProductImage extends Model
{
    // use HasSlug;
    use HasFactory;

    protected $fillable = [
        'product_id',
        'image',
    ];

    function product(){
        return $this->belongTo(Product::class);
    }

    // public function getSlugOptions() : SlugOptions
    // {
    //     return SlugOptions::create()
    //         ->generateSlugsFrom('title')
    //         ->saveSlugsTo('slug');
    // }
}
