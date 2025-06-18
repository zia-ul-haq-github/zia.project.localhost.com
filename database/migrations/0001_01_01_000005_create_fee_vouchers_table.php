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

        Schema::create('fee_vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->longText('description')->nullable();
            $table->integer('amount');
            $table->date('due_date')->nullable();
            $table->string('status', 255)->comment('UnPaid | Paid');
            $table->string('payment_proof_image_url')->nullable();
            $table->string('verification_status', 255)->comment('pending | verified');
            $table->unsignedBigInteger('category_id')->comment('Category ID');
            $table->unsignedBigInteger('tutor_id')->comment('Tutor ID');
            $table->unsignedBigInteger('fee_package_id')->comment('Fee Package ID');
            $table->unsignedBigInteger('user_id')->comment('User ID');
            $table->unsignedBigInteger('author_id')->comment('Author ID');
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('tutor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('fee_package_id')->references('id')->on('fee_packages')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_vouchers');
    }
};
