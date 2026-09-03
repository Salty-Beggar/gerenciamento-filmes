<?php

namespace App\Http\Controllers;

use App\Models\Filme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilmeController extends Controller
{
	public function create(Request $request) {
		$filme = new Filme();
		$filme->fill($request->all());
		$file = '';
		if ($request->hasFile('imagem')) {
			$file = $request->file('imagem');
			if ($file->isValid()) {
				$name = time().uniqid().'.'.$file->getClientOriginalExtension();
				$filme->imagem_capa = $name;
				Storage::disk('public')->put($name, $file);
			} else {
				throw new Error('Arquivo inválido!');
			}
		}
		$filme->save();
		return response($this->parseFilme($filme), 200);
	}

	public function update(Request $request, int $id) {
		$filme = Filme::find($id);	
		$filme->fill($request->all());
		$filme->save();
		return response($this->parseFilme($filme), 200);
	}

	public function read() {
		$filmes = Filme::select()->get()->map(fn($filme) => $this->parseFilme($filme));
		return response($filmes, 200);
	}

	public function readUser(Request $request) {
		$ano = $request->ano;
		$categoria = $request->categoria_id;
		$filmes = Filme::select();
		if (isset($ano)) $filme->where('ano', $ano);
		if (isset($categoria)) $filme->where('categoria_id', $categoria);
		$filmes = $filmes->get()->map(fn($filme) => $this->parseFilme($filme));
		return response($filmes, 200);
	}

	public function readOne(Request $request, $id) {
		$filme = Filme::find($id);
		return $this->parseFilme($filme);
	}

	public function image($name) {
		return Storage::disk('public')->get($name);
	}

	private function parseFilme(Filme $filme) {
		return [
			'id' => $filme->id,
			'nome' => $filme->titulo,
			'sinopse' => $filme->sinopse,
			'ano' => $filme->ano,
			'categoria' => $filme->categoria->nome,
			'usuario' => $filme->usuario->name,
			'link' => $filme->trailer_url,
			'imagem' => 'http://localhost:8000/imagem/'.$filme->imagem_capa,
		];
	}
}
