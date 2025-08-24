<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_trackings', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->json('data')->nullable();
            $table->string('device')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('country')->nullable();
            $table->string('path')->nullable();           // path hiện tại (/get-premium)
            $table->string('from')->nullable();           // path trước khi redirect (/pricing)
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_trackings');
    }
};
