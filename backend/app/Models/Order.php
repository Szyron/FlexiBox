<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = ['total', 'order_item_id'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

}
