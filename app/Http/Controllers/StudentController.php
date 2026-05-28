<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        // Traemos solo los elegibles y cargamos su carrera vinculada
        $students = Student::with('career')
            ->where('estado', 'Elegible para Inscripción')
            ->get();

        return Inertia::render('Students/Index', [
            'students' => $students
        ]);
    }
}