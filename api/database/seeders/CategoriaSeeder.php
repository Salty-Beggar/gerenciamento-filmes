<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
	    Categoria::create([
		'nome' => 'Ficção Científica'
	    ]);
	    Categoria::create([
		'nome' => 'Ação'
	    ]);
	    Categoria::create([
		'nome' => 'Aventura'
	    ]);
    }
}
