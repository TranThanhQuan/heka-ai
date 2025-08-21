<template>
    <Head title="Payment Failed" />

    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="bg-white rounded-xl shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 text-center p-6">
        <!-- Icon -->
        <div class="flex justify-center mb-4">
          <div class="bg-red-500 rounded-full p-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-red-600 mb-2">Payment Failed!</h2>

        <!-- Description -->
        <p class="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed or was cancelled.<br />
          Please try again or use a different payment method.
        </p>

        <!-- Transaction Details -->
        <div class="border rounded-lg p-4 text-left mb-6">
          <h3 class="font-semibold mb-2">Transaction Details</h3>
          <p class="mb-1">
            <span class="font-semibold">Status:</span>
            <span class="inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">Failed</span>
          </p>
          <p>
            <span class="font-semibold">Reason:</span>
            <span class="ml-2">Card declined or payment cancelled</span>
          </p>
        </div>

        <!-- Actions -->
        <button class="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 mb-3">
          Download Heka
        </button>

        <a href="/" class="text-sm text-gray-600 hover:underline">Back to home</a>
      </div>
    </div>
  </template>

  <script setup>
  import { Head } from '@inertiajs/vue3';
  import { eventTracking } from "@/utils/tracking.js";

  const id = new URLSearchParams(window.location.search).get('id');
  const checkoutId = localStorage.getItem('checkoutId');
  localStorage.removeItem('checkoutId');

  if (!id || !checkoutId || id !== checkoutId) {
    window.location.href = '/';
  }

  const package_id = localStorage.getItem('package_id');
  localStorage.removeItem('package_id');

  eventTracking('confirm_purchased_fail', {
    package_id: package_id,
    msg: 'cancel',
    code: null
  });
  </script>
