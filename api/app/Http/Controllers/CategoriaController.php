<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Categoria;

class CategoriaController extends Controller
{
	public function read() {
		return Categoria::select()->get()
		       ->map(fn ($user) => [
			       'key' => $user->id,
			       'option' => $user->nome
		       		]);
	}

	public function readUsuarios() {
		return User::select()->get()
		       ->map(fn ($user) => [
			       'key' => $user->id,
			       'option' => $user->name
		       		]);
	}
}
