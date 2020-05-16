<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post(        '/register',                        'API\Auth\AuthController@register');
Route::post(        '/login',                           'API\Auth\AuthController@login');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


