<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OnboardingController extends Controller
{

    public function index(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/Index', [
            'source' => $path
        ]);
    }


    public function getPlan(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/GetPlan', [
            'source' => $path
        ]);
    }




}
