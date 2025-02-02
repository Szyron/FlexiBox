<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
    ];

    public function products() //One-to-Many relationship
    {
        return $this->HasMany(Product::class);
    }
}
