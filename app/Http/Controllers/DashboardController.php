<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AcademicGroup;

class DashboardController extends Controller
{
    public function index()
    {
        $groups = AcademicGroup::with([
            'level',
            'teacher',
            'students'
        ])->latest()->get();

        return Inertia::render('Dashboard', [

            'groups' => $groups

        ]);
    }
}