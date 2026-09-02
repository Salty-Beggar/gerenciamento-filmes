<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FilmeController;

// Admin
Route::post('/admin/filmes', [FilmeController::class, 'read']); // Testar
/* Retornar os links de imagem propriamente
 */
Route::post('/admin/filme', [FilmeController::class, 'create']); // Testar
Route::post('/admin/filme/{id}', [FilmeController::class, 'update']); // Testar

// User
Route::post('/user/filmes', [FilmeController::class, 'readUser']); // Testar
/* Retornar os links de imagem propriamente
 */
Route::post('/user/filme/{id}', [FilmeController::class, 'readOne']); // Testar
/* Retornar os links de imagem propriamente
 */

// Categorias
Route::get('/categorias', [CategoriaController::class, 'read']);

// Imagens
Route::get('/imagem/{name}', [FilmeController::class, 'image']);
