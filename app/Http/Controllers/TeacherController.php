<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::all();

        return Inertia::render('Teachers/Index', [
            'teachers' => $teachers
        ]);
    }

    public function create()
    {
        return Inertia::render('Teachers/Create');
    }

    public function store(Request $request)
    {
        Teacher::create($request->validate([ 
            'first_name' => 'required|string|max:255', 
            'last_name' => 'required|string|max:255', 
            'email' => 'required|email|unique:teachers,email', 
            'phone' => 'nullable|string|max:20', 
            'category' => 'required|in:A,B,C', 
            'mcer_level' => 'required|in:A1,A2,B1,B2,C1,C2', 
            'rfc' => 'nullable|string|max:13', 
            'curp' => 'nullable|string|max:18', 
            'bank_clabe' => 'nullable|string|max:18', 
            'ttc_hours' => 'nullable|integer|min:0', 
            'academic_degree' => 'nullable|string|max:255', 
            'is_native' => $request->boolean('is_native'), 
            'modality' => 'required|in:Presencial,Virtual,Mixta', 
            'max_hours' => 'required|integer|min:1|max:40', 
            'status' => 'required|in:Activo,Inactivo' 
            ]));

        return redirect()->route('teachers.index');
    }

    public function edit(Teacher $teacher)
    {
        return Inertia::render('Teachers/Edit', [
            'teacher' => $teacher
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $teacher->update($request->validate([
            'first_name' => 'required|string|max:255', 
            'last_name' => 'required|string|max:255', 
            'email' => 'required|email|unique:teachers,email,' . $teacher->id, 
            'phone' => 'nullable|string|max:20', 
            'category' => 'required|in:A,B,C', 
            'mcer_level' => 'required|in:A1,A2,B1,B2,C1,C2', 
            'rfc' => 'nullable|string|max:13', 
            'curp' => 'nullable|string|max:18', 
            'bank_clabe' => 'nullable|string|max:18', 
            'ttc_hours' => 'nullable|integer|min:0', 
            'academic_degree' => 'nullable|string|max:255', 
            'is_native' => 'required|boolean', 
            'modality' => 'required|in:Presencial,Virtual,Mixta', 
            'max_hours' => 'required|integer|min:1|max:40', 
            'status' => 'required|in:Activo,Inactivo' 
        ]));

        return redirect()->route('teachers.index');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return redirect()->route('teachers.index');
    }
}