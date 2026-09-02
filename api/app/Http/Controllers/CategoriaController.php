<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CategoriaController extends Controller
{
	public function readUsuarios() {
		return User::select()->get()
		       ->map(fn ($user) => [
			       'key' => $user->id,
			       'option' => $user->name
		       		]);
	}
}
