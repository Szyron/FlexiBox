<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $fillable = ['user_id', 'address_id', 'order_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->hasMany(Address::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
