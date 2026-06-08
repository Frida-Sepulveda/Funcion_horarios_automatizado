<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AcademicGroup;
use App\Models\Student;

class DashboardController extends Controller
{
    public function index()
    {
        $groups = AcademicGroup::with([
            'level',
            'teacher',
            'students',
            'classroom',
            'schedules.scheduleBlock'
        ])->latest()->get();

        $summaryData = [

            'total_students' => Student::where('status','Elegible')
            ->count(),

            'open_groups' => AcademicGroup::count(),

            'assigned_teachers' => AcademicGroup::whereNotNull('teacher_id')
            ->distinct('teacher_id')
            ->count('teacher_id'),

            'used_classrooms' => AcademicGroup::whereNotNull('classroom_id')
                ->distinct('classroom_id')
                ->count('classroom_id')
        ];

        return Inertia::render('Dashboard', [

            'groups' => $groups,

            'summaryData' => $summaryData

        ]);
    }
}