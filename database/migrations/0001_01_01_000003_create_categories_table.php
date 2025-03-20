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

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->longText('description')->nullable();
            $table->string('image_url')->nullable();
            $table->unsignedBigInteger('author_id')->comment('Author User ID');
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('category_tutors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->comment('Category ID');
            $table->unsignedBigInteger('tutor_id')->comment('Tutor ID');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('tutor_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('category_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->comment('Category ID');
            $table->unsignedBigInteger('user_id')->comment('User ID');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_tutors');
        Schema::dropIfExists('category_users');
        Schema::dropIfExists('categories');
    }
};
