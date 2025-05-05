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

        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->longText('description')->nullable();
            $table->string('status', 255);
            $table->unsignedBigInteger('author_id')->comment('Author User ID');
            $table->unsignedBigInteger('category_id')->comment('Category ID');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
        });


        Schema::create('class_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('class_id')->comment('Class ID');
            $table->unsignedBigInteger('user_id')->comment('User ID');
            $table->timestamps();

            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_users');
        Schema::dropIfExists('classes');
    }
};
