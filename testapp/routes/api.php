<?php

use App\Http\Controllers\TreesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); */

Route::get('/trees', [TreesController::class, 'index']);

Route::get('/trees/{id}', [TreesController::class, 'show']);

Route::post('/trees', [TreesController::class, 'store']);

Route::put('/trees/{id}', [TreesController::class, 'update']);

Route::delete('/trees/{id}', [TreesController::class, 'destroy']);


