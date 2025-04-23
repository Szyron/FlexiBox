<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    
    public function run(): void
    {
        $superAdminRole = Role::where('warrant_name', 'SuperAdmin')->first();

        User::updateOrCreate(
            ['email' => 'SuperAdmin@example.com'],
            [
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'password' => Hash::make('test1234'),
                'role_id' => $superAdminRole->id,
            ]
        );
    }
}
