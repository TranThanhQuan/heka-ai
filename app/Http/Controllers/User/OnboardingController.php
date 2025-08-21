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

    public function premiumLose(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/PremiumLose', [
            'source' => $path
        ]);
    }

    public function premiumMaintain(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/PremiumMaintain', [
            'source' => $path
        ]);
    }

    public function premiumGain(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/PremiumGain', [
            'source' => $path
        ]);
    }


    public function premiumHealthy(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/PremiumHealthy', [
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

    public function getPlanLose(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/GetPlanLose', [
            'source' => $path
        ]);
    }


    public function getPlanMaintain(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/GetPlanMaintain', [
            'source' => $path
        ]);
    }

    public function getPlanGain(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/GetPlanGain', [
            'source' => $path
        ]);
    }



    public function getPlanHealthy(Request $request)
    {
        $path = $request->path();
        return Inertia::render('User/Onboarding/GetPlanHealthy', [
            'source' => $path
        ]);
    }

}
