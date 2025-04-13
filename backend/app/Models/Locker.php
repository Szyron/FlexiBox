<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locker extends Model
{
    protected $fillable = [
        'locker_name',
        'address',
        'description',
    ];

    /* public function locker()
    {
        return $this->hasMany(Locker::class);
    } */
    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
