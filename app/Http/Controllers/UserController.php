<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

use App\Helpers\UploadHelper;
use App\Traits\ResponseTrait;

class UserController extends Controller
{
    /**
     * Response trait to handle return responses.
     */
    use ResponseTrait;

    public function __construct()
    {
        //
    }

    public function index(Request $request): JsonResponse
    {
        
        try {

            $perPage = isset($request['per_page']) ? intval($request['per_page']) : 10;
            $orderBy = isset($request['order_by']) ? $request['order_by'] : 'id';
            $order   = isset($request['order']) ? $request['order'] : 'desc';
            $role   = isset($request['role']) ? $request['role'] : 'user';
            $search   = ( isset($request['search']) && ! empty(isset($request['search'])) ) ? $request['search'] : '';

            if( ! empty($search) ){

                $data = User::orderBy($orderBy, $order)
                    ->where('role', '=', $role)
                    ->where('name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                    ->with('qualifications')
                    ->with('experiences')
                    ->paginate($perPage);

            }else{
                $data = User::orderBy($orderBy, $order)
                    ->with('qualifications')
                    ->with('experiences')
                    ->where('role', '=', $role)
                    ->paginate($perPage);
            }

            return $this->responseSuccess($data, 'User List Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function store(Request $request): JsonResponse
    {

        try {

            $request_data = $request->validate(
                [
                    'name'     => 'required|string|max:50',
                    'role'     => 'required|string|max:50',
                    'email'    => 'required|max:255|email|unique:users',
                    'password' => 'required',
                    'image_url'     => 'required|string',
                    'bio_data'     => 'nullable|max:5000',
                    'mobile_no'     => 'required|string|max:50',
                    'date_of_birth'     => 'required|date_format:Y-m-d',
                ],
                [
                    'name.required'     => 'Please give your name',
                    'name.max'          => 'Please give your name between 50 characters',
                    'role.required'     => 'Please give your role',
                    'role.max'          => 'Please give your role between 50 characters',
                    'email.required'    => 'Please give your email',
                    'email.unique'      => 'User already exists by this email, please try with another email.',
                    'password.required' => 'Please give your password',
                    'image_url.required'         => 'Please give a valid user profile image',
                    'bio_data.max' => 'Please give bio description maximum of 5000 characters',
                    'mobile_no.required'     => 'Please give your mobile no',
                    'mobile_no.max'          => 'Please give your mobile no between 20 characters',
                    'date_of_birth.required'    => 'Please give your date of birth',
                    'date_of_birth.date_format' => 'Please make sure your date of birth is formatted as Y-m-d',
                ]
            ); 

            $user = User::create($request_data);

            $response_data = User::find($user->id);

            return $this->responseSuccess($response_data, 'New User Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = User::with('qualifications', 'experiences')->find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'User Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'User Details Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function update(Request $request, $id): JsonResponse
    {

        try {

            $data = $request->all();
            $user = User::find($id);

            if (is_null($user)) {
                return null;
            }

            // If everything is OK, then update.
            $user->update($data);

            $response_data = User::find($user->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'User Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated User.
            return $this->responseSuccess($response_data, 'User Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $user = User::find($id);

            if (empty($user)) {
                return $this->responseError(null, 'User Not Found', Response::HTTP_NOT_FOUND);
            }

            UploadHelper::deleteFile('images/users/'.$user->image_url);
            $deleted = $user->delete($user);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the user.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($user, 'User Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}
