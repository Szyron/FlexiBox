<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'addresses';
    protected $fillable = ['zip', 'street', 'house_number', 'city','email','street_id','user_id'];

    public function streetType()
    {
        return $this->belongsTo(StreetType::class, 'street_id');
    }

    

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
