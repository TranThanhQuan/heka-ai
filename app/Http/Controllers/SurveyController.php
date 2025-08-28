<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $lang = $request->query('lang', 'en');


        return Inertia::render('Survey/Index', [
            'lang' => $lang
        ]);
    }

}
