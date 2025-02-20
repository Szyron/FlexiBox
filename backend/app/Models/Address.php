<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'address';
    protected $fillable = ['zip', 'street', 'city', 'street_id'];

    public function streetType()
    {
        return $this->belongsTo(StreetType::class, 'street_id');
    }

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }
}
