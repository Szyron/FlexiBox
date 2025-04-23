<?php

namespace Database\Seeders;

//use Illuminate\Container\Attributes\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use DB;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      

        Role::updateOrCreate(
            ['warrant_name' => 'user'],
            ['power' => 11]
        );
        Role::updateOrCreate(
            ['warrant_name' => 'admin'],
            ['power' => 70]
        );

        Role::updateOrCreate(
            ['warrant_name' => 'SuperAdmin'],
            ['power' => 90]
        );

    }
}
