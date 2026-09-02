<?php

namespace App\Http\Controllers;

use App\Models\Filme;
use Illuminate\Http\Request;

class FilmeController extends Controller
{
	public function create(Request $request) {
		$filme = new Filme();
		$filme->fill($request->all());
		$file = '';
		if ($request->hasFile('files')) {
			$file = $request->file('files')[0];
			if ($file->isValid()) {
				$name = time().str_random(10).'.'.$file->getClientOriginalExtension();
				$filme->imagem_capa = $name;
				Storage::disk('public')->put($name, $file);
			} else {
				throw new Error('Arquivo inválido!');
			}
		}
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

	public function readUser(Request $request) {
		$ano = $request->ano;
		$categoria = $request->categoria_id;
		$filmes = Filme::select();
		if (isset($ano)) $filme->where('ano', $ano);
		if (isset($categoria)) $filme->where('categoria_id', $categoria);
		$filmes = $filmes->get();
		return $response($filmes, 200);
	}

	public function readOne(Request $request, $id) {
		$filme = Filme::find($id);
		return $filme;
	}
}
