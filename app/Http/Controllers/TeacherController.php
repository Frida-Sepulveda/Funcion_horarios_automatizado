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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'nullable',
            'modalidad' => 'required',
            'max_hours' => 'required|integer',
            'status' => 'required'
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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'nullable',
            'modalidad' => 'required',
            'max_hours' => 'required|integer',
            'status' => 'required'
        ]));

        return redirect()->route('teachers.index');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return redirect()->route('teachers.index');
    }
}