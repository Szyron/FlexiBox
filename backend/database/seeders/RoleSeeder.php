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
        // \DB::table('roles')->insert([
        //     'power' => 11,
        //     'warrant_name' => 'user',
        // ]);

        Role::updateOrCreate(
            ['warrant_name' => 'user'],
            ['power' => 11]
        );
    }
}
