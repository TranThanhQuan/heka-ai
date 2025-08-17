<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function showLoginForm(){
        return Inertia::render('Admin/Auth/Login');
    }

    public function login(Request $request){
        //check if user is an admin and redirect
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'isAdmin' =>true])){
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('admin.login')->with('error', 'Thông tin đăng nhập không hợp lệ');
    }

    public function logout(Request $request){
        Auth::guard('web')->logout();
        $request->session()->invalidate();  // hủy session hiện tại
        return redirect()->route('admin.login');
    }





}
