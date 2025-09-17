<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Profile extends Model
{
    protected $fillable = [
        'file_name',
        'file_path',
        'user_id',
    ];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

