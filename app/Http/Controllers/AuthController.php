<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
     /**
     * Response trait to handle return responses.
     */
    use ResponseTrait;

    /**
     * 
     * https://demos.pixinvent.com/vuexy-vuejs-admin-template/documentation/guide/laravel-integration/laravel-sanctum-authentication.html
     * https://medium.com/@abdelra7manabdullah/api-authentication-using-laravel-sanctum-v10-x-21dfe130cda
     * https://blog.treblle.com/how-to-create-rest-api-using-laravel/
     */

    public function register(Request $request): JsonResponse
    {
        try {

            $request_data = $request->validate(
                [
                    'name'     => 'required|string|max:50',
                    'role'     => 'required|string|max:50',
                    'email'    => 'required|max:255|email|unique:users',
                    'password' => 'required',
                ],
                [
                    'name.required'     => 'Please give your name',
                    'name.max'          => 'Please give your name between 50 characters',
                    'role.required'     => 'Please give your role',
                    'role.max'          => 'Please give your role between 50 characters',
                    'email.required'    => 'Please give your email',
                    'email.unique'      => 'User already exists by this email, please try with another email.',
                    'password.required' => 'Please give your password',
                ]
            ); 

            $user = User::create([
               'name' => $request_data['name'],
               'role' => $request_data['role'],
               'email' => $request_data['email'],
               'password' => Hash::make($request_data['password'])
            ]);
 
            if ($user) {

                if ( Auth::attempt( ['email' => $request_data['email'], "password" => $request_data['password'] ]) ) {

                    $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;

                    $response_data = [
                        'access_token' => [
                            'type' => 'Bearer',
                            'text' => $token,
                        ],
                        'user' => $user,
                    ];
                    return $this->responseSuccess($response_data, 'User Registered and Logged in Successfully', Response::HTTP_OK);
                
                }
            }
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(Request $request){

        $credentials = $request->validate(
            [
                'email'=>'required|string|email',
                'password'=>'required|min:6'
            ],
            [
                'email.required'    => 'Please give your email',
                'password.required' => 'Please give your password',
            ]
        ); 

        $user = User::where('email',$credentials['email'])->first();

        if(! $user || ! Hash::check($credentials['password'],$user->password) || ! Auth::attempt($credentials) ){
            return $this->responseError(null, 'Invalid Email and Password !', Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;

        $response_data = [
            'access_token' => [
                'type' => 'Bearer',
                'text' => $token,
            ],
            'user' => $user,
        ];
        return $this->responseSuccess($response_data, 'Logged In Successfully !');

    }

    public function logout(Request $request): JsonResponse
    {
        try {
            
            $request->user()->tokens()->delete();
            return $this->responseSuccess(null, 'Logged out successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function me(Request $request): JsonResponse
    {
        try {

            $data = Auth::guard()->user();
            return $this->responseSuccess($data, 'Profile Fetched Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    protected function respondWithToken($token): array
    {
        $data = [
            'access_token' => [
                'type' => 'Bearer',
                'text' => $token,
            ],
            'user' => $this->guard()->user()
        ];
        return $data;
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard(): \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
    {
        return Auth::guard();
    }

}
