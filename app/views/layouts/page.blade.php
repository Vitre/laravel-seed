<!doctype html>
<html lang="--LANG--">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>@section('title')--PROJECT_NAME--@show</title>

        {{ HTML::style('assets/@/stylesheets/screen.css') }}

        <style>
            @section('style')
            @show
        </style>

        <script src="{{ URL::asset('assets/@/javascript/vendor.js') }}"></script>
        <script src="{{ URL::asset('assets/@/javascript/main.js') }}"></script>

        <script>
            @section('script')
            @show
        </script>

        @section('head')
        @show
    </head>

    <body class="@section('body_class')page @show" @section('body_attr')@show>
        @include('layouts._header')

        @include('layouts._nav')

        <main id="main" role="main">
            @yield('main')
        </main>

        @include('layouts._footer')
    </body>

</html>