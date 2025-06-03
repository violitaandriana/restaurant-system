<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-web', function() {
    return response()->json([
        'status' => 'success',
        'message' => 'Web route working'
    ]);
});
