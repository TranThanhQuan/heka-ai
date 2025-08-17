<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OnboardingController extends Controller
{
    // public function index()
    // {
    //     // hiển thị screen
    //     $screen = 'SignIn';

    //     $version = 'A';
    //     return Inertia::render('User/Onboarding/Version_' . $version.'/' . $screen, [
    //         'message' => 'Chào mừng đến với HekaAI',
    //     ]);
    // }


    public function index()
    {

        return Inertia::render('User/Onboarding/Index', [


        ]);
    }







}
