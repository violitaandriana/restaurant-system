<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RayonController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SalesmanController;
use App\Http\Controllers\SalesOrderController;

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::apiResource('brands', BrandController::class);
Route::apiResource('customers', CustomerController::class);
Route::apiResource('salesmen', SalesmanController::class);
Route::apiResource('rayons', RayonController::class);
Route::apiResource('sales-orders', SalesOrderController::class);
Route::get('/reports', [ReportController::class, 'index']);
