<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Application;

class UserController extends Controller
{
    public function index(){


        return Inertia::render('Home/Index',[
            // 'canLogin' => app('router')->has('login'),
            // 'canRegister' => app('router')->has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
