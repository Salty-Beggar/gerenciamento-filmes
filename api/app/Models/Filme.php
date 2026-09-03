<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['titulo', 'sinopse', 'ano', 'categoria_id', 'usuario_id', 'trailer_url'])]
class Filme extends Model
{
	protected $fillable = [
		'titulo',
		'sinopse',
		'ano',
		'categoria_id',
		'usuario_id',
		'trailer_url',	
	];
	function categoria(): BelongsTo
	{
		return $this->belongsTo(Categoria::class, 'categoria_id');
	}
	function usuario(): BelongsTo
	{
		return $this->belongsTo(User::class, 'usuario_id');
	}
}
