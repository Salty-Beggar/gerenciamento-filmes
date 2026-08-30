<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return 'test';
});
Route::post('/user/create', [UserController::class, 'create']);
