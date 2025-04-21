<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

// Ruta de autenticación
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

// Dashboard protegido
Route::middleware('auth')->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


// Cerrar sesión
Route::post('/logout', function () {
    auth()->logout();
    return redirect('/login');
})->name('logout');
?>