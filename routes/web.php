<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\User\PaymentController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\EventTrackingController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\User\OnboardingController;
use App\Http\Controllers\User\ProductListController;

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
|
*/
Route::get('/', [UserController::class, 'index'])->name('home');


Route::get('/get-premium', [OnboardingController::class, 'index'])->name('get-premium');
// Route::get('/ga-get-premium', [OnboardingController::class, 'index'])->name('ga-get-premium');
// Route::get('/tt-get-premium', [OnboardingController::class, 'index'])->name('tt-get-premium');

Route::get('/get-premium-lose', [OnboardingController::class, 'premiumLose'])->name('get-premium-lose');
Route::get('/get-premium-maintain', [OnboardingController::class, 'premiumMaintain'])->name('get-premium-maintain');
Route::get('/get-premium-gain', [OnboardingController::class, 'premiumGain'])->name('get-premium-gain');
Route::get('/get-premium-healthy', [OnboardingController::class, 'premiumHealthy'])->name('get-premium-healthy');




Route::get('/get-plan', [OnboardingController::class, 'getPlan'])->name('get-plan');
Route::get('/get-plan-lose', [OnboardingController::class, 'getPlanLose'])->name('get-plan-lose');
Route::get('/get-plan-maintain', [OnboardingController::class, 'getPlanMaintain'])->name('get-plan-maintain');
Route::get('/get-plan-gain', [OnboardingController::class, 'getPlanGain'])->name('get-plan-gain');
Route::get('/get-plan-healthy', [OnboardingController::class, 'getPlanHealthy'])->name('get-plan-healthy');




// payment
Route::get('/payment/success', [PaymentController::class, 'success'])->name('payment.success');
Route::get('/payment/cancel', [PaymentController::class, 'cancel'])->name('payment.cancel');



Route::post('/event-tracking', [EventTrackingController::class, 'store']);

Route::get('/tracking/funnel', [EventTrackingController::class, 'funnel'])->name('tracking.funnel');
Route::get('/tracking/view_tracking', [EventTrackingController::class, 'viewTracking'])->name('tracking.viewTracking');








/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
*/



// Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
//     Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

//     // product
//     Route::get('/products', [ProductController::class, 'index'])->name('admin.products.index');
//     Route::post('/products/store', [ProductController::class, 'store'])->name('admin.products.store');
//     Route::put('/products/update/{id}', [ProductController::class, 'update'])->name('admin.products.update');

//     Route::delete('/products/image/{id}', [ProductController::class, 'deleteImage'])->name('admin.products.image.delete');
//     Route::delete('/products/destroy/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');


// });

require __DIR__.'/auth.php';
