<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $fillable = ['card_type'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
