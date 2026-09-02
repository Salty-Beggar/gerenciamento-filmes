<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

#[Fillable(['titulo', 'sinopse', 'ano', 'categoria_id', 'trailer_url'])]
class Filme extends Model
{
	function categoria(): HasOne
	{
		return $this->hasOne(Categoria::class, 'categoria_id');
	}
}
