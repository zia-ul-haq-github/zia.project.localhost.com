<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QualificationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\QuizController;

use App\Http\Controllers\FileManagerController;

use Illuminate\Support\Facades\Log;

Route::prefix('auth')->group(function () {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

});

Route::middleware('auth:sanctum')->group(function () {

    /**
     * Users Module
     */
    Route::resource('users', UserController::class);

    /**
     * Qualifications Module
     */
    Route::resource('qualifications', QualificationController::class);

    /**
     * Experiences Module
     */
    Route::resource('experiences', ExperienceController::class);

    /**
     * Category Module
     */
    Route::resource('categories', CategoryController::class);
    
    /**
     * Class Module
     */
    Route::resource('classes', ClassController::class);

    /**
     * Quiz Module
     */
    Route::resource('quizzes', QuizController::class);

});

Route::post('image-tmp-upload', [UserController::class, 'testImageUpload']);
Route::post('/file-manager/upload', [FileManagerController::class, 'storeFile']);
Route::delete('/file-manager/delete', [FileManagerController::class, 'deleteFile']);
