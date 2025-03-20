<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::get( '/{path?}', function(Request $request, $path = null){

    if( empty($path) ){

        return view('home');
        
    }else{
        
        if ($path === 'welcome') {
            return view('welcome');
        } else {
            return view('umi');
        }

    }
    
} )->where('path', '.*');
