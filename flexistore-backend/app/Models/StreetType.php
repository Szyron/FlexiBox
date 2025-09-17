<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StreetType extends Model
{
    protected $table = 'street_types';
    protected $fillable = ['public_area_name'];

    public function address()
    {
        return $this->hasMany(Address::class);
    }
}
