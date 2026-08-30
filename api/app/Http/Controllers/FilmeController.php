<?php

namespace App\Http\Controllers;

use App\Models\Filme;
use Illuminate\Http\Request;

class FilmeController extends Controller
{
	public function create(Request $request) {
		$filme = new Filme();
		$filme->fill($request);
		$filme->save();
		return response($filme, 200);
	}

	public function update(Request $request, int $id) {
		$filme = Filme::find($id);	
		$filme->fill($request);
		$filme->save();
		return response($filme, 200);
	}

	public function read() {
		$filmes = Filme::select()->get();
		return response($filmes, 200);
	}
}
