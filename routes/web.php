<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeacherController;

Route::resource('teachers', TeacherController::class);

Route::get('/', function () {
    return Inertia::render('Home');
});

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'greeting' => 'Hola este es un intento de crear un proyecto con Laravel',
    ]);
});

Route::get('/posts', function () {
    return Inertia::render('Posts/Index');
});

Route::get('/posts/create', function () {
    return Inertia::render('Posts/Create');
});

Route::get('/posts/{posts}', function ($posts) {
    return Inertia::render('Posts/Show', [
        'post' => $posts
    ]);
});

Route::get('/posts/{post}/{category}', function ($post, $category = null) {
    if ($category) {
        return "Aquí se mostrará el post con el id: " . $post . " y la categoría: " . $category;
    }    
    return "Aquí se mostrará el post con el id: " . $post;
}); */
