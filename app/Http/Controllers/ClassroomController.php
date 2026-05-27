<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    public function index()
    {
        $classrooms = Classroom::all();

        return Inertia::render('Classrooms/Index', [
            'classrooms' => $classrooms
        ]);
    }

    public function create()
    {
        return Inertia::render('Classrooms/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'building'   => 'required|string|max:255',
            'capacity'  => 'required|integer|min:1',
            'type'       => 'required|string', 
        ]);

        Classroom::create($validated);

        return redirect()->route('classrooms.index');
    }

    public function edit(Classroom $classroom)
    {
        return Inertia::render('Classrooms/Edit', [
            'classroom' => $classroom
        ]);
    }

    public function update(Request $request, Classroom $classroom)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'building'   => 'required|string|max:255',
            'capacity'  => 'required|integer|min:1',
            'type'       => 'required|string',
        ]);

        $classroom->update($validated);

        return redirect()->route('classrooms.index');
    }

    public function destroy(Classroom $classroom)
    {
        $classroom->delete();

        return redirect()->route('classrooms.index');
    }
}