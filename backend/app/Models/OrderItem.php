<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'order_items';
    protected $fillable = ['quantity', 'item_price', 'line_total', 'product_id', 'order_id', 'locker_id'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($orderItem) {
            $orderItem->line_total = $orderItem->quantity * $orderItem->item_price;
        });
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function locker()
    {
        return $this->belongsTo(Locker::class);
    }
}
