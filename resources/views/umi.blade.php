<?php
class Helper {
    public static function myUmi($path)
    {
        //If umi is not configured, use local umi
        if (env('UMI', false)) {
            //Port 8000 is the port number of our local umi
            return '//localhost:8000/' . $path;
        } else {
            return \Illuminate\Support\Str::finish(asset('umi-dist/'), '/') . $path;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="manifest" href="{{Helper::myUmi('manifest.json')}}">
    <link rel="stylesheet" href="{{Helper::myUmi('umi.css')}}">
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
    <title>{{config('store.title')}}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{Helper::myUmi('favicon.png')}}" type="image/x-icon">
    <script>
        window.routerBase = "/";
        window.publicPath = "{{Helper::myUmi('')}}";
        window.store = {
            title: "{{config('store.title')}}",
            token: "{{ csrf_token() }}"
        }
    </script>
</head>
<body>
<noscript>Sorry, we need js to run correctly!</noscript>
<div id="root"></div>
<script src="{{Helper::myUmi('umi.js')}}"></script>
</body>
</html>
