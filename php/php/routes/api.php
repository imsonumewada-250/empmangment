<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EmployeeController;

Route::post('/auth/register', [UserController::class, 'register']);
Route::post('/auth/login', [UserController::class, 'login']);

Route::apiResource('employees', EmployeeController::class);
