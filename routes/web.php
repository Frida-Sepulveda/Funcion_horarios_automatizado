<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\GroupGenerationController;

Route::get('/dashboard', function () {

    return Inertia::render('Dashboard');

});

Route::resource('students', StudentController::class);

Route::resource('teachers', TeacherController::class);

Route::resource('classrooms', ClassroomController::class);

Route::post(
    '/groups/generate',
    [GroupGenerationController::class, 'generate']
);

    // Route::resource('groups', GroupController::class);

    // Route::resource('schedules', ScheduleController::class);


/*Route::resource('students', StudentController::class)
    ->only(['index']);
Route::resource('teachers', TeacherController::class);
Route::resource('classrooms', ClassroomController::class);

Route::get('/', function () {
    return Inertia::render('Dashboard');
});*/