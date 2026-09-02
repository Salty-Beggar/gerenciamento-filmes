<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
	    User::create([
		    'name' => 'Jorge Amado',
		    'email' => 'jorgeamado2@gmail.com',
		    'role' => 1,
    		]);
	    User::create([
		    'name' => 'Matheus',
		    'email' => 'jorgao@gmail.com',
		    'role' => 1,
    		]);
	    User::create([
		    'name' => 'Luiza',
		    'email' => 'jorgelalala@gmail.com',
		    'role' => 1,
    		]);
    }
}
