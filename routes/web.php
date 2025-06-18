<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::get( '/{path?}', function(Request $request, $path = null){

    if( empty($path) ){

        /**
         * resources -> views -> home.blade.php
         */
        return view('home');
        
    }else{
        
        if ($path === 'welcome') {
            /**
            * resources -> views -> welcome.blade.php
            */
            return view('welcome');
        } else {
        
            /**
            * resources -> views -> umi.blade.php
            */
            return view('umi');
        }

    }
    
} )->where('path', '.*');
