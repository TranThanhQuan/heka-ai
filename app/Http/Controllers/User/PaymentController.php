<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');
        if(!$sessionId){
            return redirect('/');
        }

        return Inertia::render('Payment/Success', [
            'sessionId' => $sessionId
        ]);
    }

    public function cancel(){
        return Inertia::render('Payment/Cancel');
    }
}
