<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\GroupGenerationController;
use App\Http\Controllers\DashboardController;

Route::get( 
    '/dashboard', 
    [DashboardController::class, 'index'] 
);

Route::resource('students', StudentController::class);

Route::resource('teachers', TeacherController::class);

Route::resource('classrooms', ClassroomController::class);

Route::post(
    '/groups/generate',
    [GroupGenerationController::class, 'generate']
);