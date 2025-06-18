<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;

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
            $category_id   = ( isset($request['category_id']) && ! empty(isset($request['category_id'])) ) ? $request['category_id'] : '';
            
            $query = User::orderBy($orderBy, $order)
                ->with(['qualifications', 'experiences'])
                ->where('role', $role);

            // Add category filter if category_id is provided
            // if ($category_id) {
            //     $query->whereHas('classes', function($q) use ($category_id) {
            //         $q->where('category_id', $category_id);
            //     });
            // }

            /**
             * Get Specific Category Tutors
             */
            if( $role == 'tutor' && ! empty($category_id) ){
                $tutors_ids = Category::find($category_id)->tutors()->pluck('users.id')->toArray();
                $query->whereIn('id', $tutors_ids);
            }

            /**
             * Get Specific Category Users
             */
            if( $role == 'user' && ! empty($category_id) ){
                $users_ids = Category::find($category_id)->users()->pluck('users.id')->toArray();
                $query->whereIn('id', $users_ids);
            }

            // search by name and email if search text is provided
            if($search){
                $query->whereAny([
                    'name',
                    'email',
                ], 'like', '%'.$search.'%');
            }

            // get query final result
            $data = $query->paginate($perPage);

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
                    'address' => 'nullable|array',
                    'address.street' => 'required_with:address|string',
                    'address.country' => 'required_with:address|string',
                    'address.province' => 'required_with:address|string',
                    'address.city' => 'required_with:address|string',
                    'address.postal_code' => 'required_with:address|numeric',
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
                    'address.array' => 'The address must be a valid JSON object.',
                    'address.street.required_with' => 'Street address is required when providing an address.',
                    'address.street.string' => 'Street address must be a text value.',
                    'address.country.required_with' => 'Country is required when providing an address.',
                    'address.country.string' => 'Country must be a text value.',
                    'address.province.required_with' => 'Province/State is required when providing an address.',
                    'address.province.string' => 'Province/State must be a text value.',
                    'address.city.required_with' => 'City is required when providing an address.',
                    'address.city.string' => 'City must be a text value.',
                    'address.postal_code.required_with' => 'ZIP/Postal code is required when providing an address.',
                    'address.postal_code.numeric' => 'ZIP/Postal code must be a number.',
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

            // $data = $request->all();

            $request_data = $request->validate(
                [
                    'name'     => 'required|string|max:50',
                    'role'     => 'required|string|max:50',
                    'email'    => 'required|max:255',
                    'image_url'     => 'required|string',
                    'bio_data'     => 'nullable|max:5000',
                    'mobile_no'     => 'required|string|max:50',
                    'date_of_birth'     => 'required|date_format:Y-m-d',
                    'address' => 'nullable|array',
                    'address.street' => 'required_with:address|string',
                    'address.country' => 'required_with:address|string',
                    'address.province' => 'required_with:address|string',
                    'address.city' => 'required_with:address|string',
                    'address.postal_code' => 'required_with:address|numeric',
                ],
                [
                    'name.required'     => 'Please give your name',
                    'name.max'          => 'Please give your name between 50 characters',
                    'role.required'     => 'Please give your role',
                    'role.max'          => 'Please give your role between 50 characters',
                    'email.required'    => 'Please give your email',
                    'image_url.required'         => 'Please give a valid user profile image',
                    'bio_data.max' => 'Please give bio description maximum of 5000 characters',
                    'mobile_no.required'     => 'Please give your mobile no',
                    'mobile_no.max'          => 'Please give your mobile no between 20 characters',
                    'date_of_birth.required'    => 'Please give your date of birth',
                    'date_of_birth.date_format' => 'Please make sure your date of birth is formatted as Y-m-d',
                    'address.array' => 'The address must be a valid JSON object.',
                    'address.street.required_with' => 'Street address is required when providing an address.',
                    'address.street.string' => 'Street address must be a text value.',
                    'address.country.required_with' => 'Country is required when providing an address.',
                    'address.country.string' => 'Country must be a text value.',
                    'address.province.required_with' => 'Province/State is required when providing an address.',
                    'address.province.string' => 'Province/State must be a text value.',
                    'address.city.required_with' => 'City is required when providing an address.',
                    'address.city.string' => 'City must be a text value.',
                    'address.postal_code.required_with' => 'ZIP/Postal code is required when providing an address.',
                    'address.postal_code.numeric' => 'ZIP/Postal code must be a number.',
                ]
            ); 

            $user = User::find($id);

            if (is_null($user)) {
                return null;
            }

            // If everything is OK, then update.
            $user->update($request_data);

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
