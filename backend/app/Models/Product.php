<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    protected $fillable = [
        'file_name',
        'file_path',
        'name',
        'description',
        'price_per_day',
        'category_id',
        'available',
    ];

    public function category() //Many-to-One relationship
    {
        return $this->belongsTo(Category::class, 'category_id');

    }

    public function orderItems() //One-to-Many relationship
    {
        return $this->hasMany(OrderItem::class);
    }
    public function lockers()
    {
    return $this->belongsToMany(Locker::class);
    }
}
