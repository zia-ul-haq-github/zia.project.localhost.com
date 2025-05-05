<?php

namespace App\Http\Controllers;

use App\Models\Category;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Helpers\UploadHelper;

use App\Traits\ResponseTrait;

use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
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
            $search   = ( isset($request['search']) && ! empty(isset($request['search'])) ) ? $request['search'] : '';

            if( ! empty($search) ){
                $data = Category::orderBy($orderBy, $order)
                    ->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->with('tutors', 'users')
                    ->paginate($perPage);
            }else{
                $data = Category::orderBy($orderBy, $order)
                    ->with('tutors', 'users')
                    ->paginate($perPage);
            }

            return $this->responseSuccess($data, 'Category List Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function store(Request $request): JsonResponse
    {

        try {

            $request_data = $request->validate(
                [
                    'title'     => 'required|string|max:50',
                    'description'     => 'nullable|max:5000',
                    'image_url'     => 'required|string',
                    'author_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'image_url.required'         => 'Please provide a banner image url',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                ]
            ); 

            $category = Category::create($request_data);

            /**
             * Set Category Tutors
             */
            // Retrieve the Tutors IDs from the request (assuming they're in an array)
            $tutors_ids = $request->input('tutors');
            // Associate tutors with the category by inserting records into the pivot table
            $category->tutors()->attach($tutors_ids, ['created_at' => date('Y-m-d H:i:s')]);

            /**
             * Set Category Users
             */
            // Retrieve the user IDs from the request (assuming they're in an array)
            $users_ids = $request->input('users');
            // Associate users with the category by inserting records into the pivot table
            $category->users()->attach($users_ids, ['created_at' => date('Y-m-d H:i:s')]);

            $response_data = Category::with('tutors', 'users')->find($category->id);

            return $this->responseSuccess($response_data, 'New Category Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = Category::with('tutors', 'users')->find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Category Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Category Details Fetch Successfully !');

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
                    'title'     => 'required|string|max:50',
                    'description'     => 'nullable|max:5000',
                    'image_url'     => 'required|string',
                    'author_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'image_url.required'         => 'Please provide a banner image url',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                ]
            ); 

            $category = Category::find($id);

            if (is_null($category)) {
                return null;
            }

            // If everything is OK, then update.
            $category->update($request_data);

                        /**
             * Set Category Tutors
             */
            // Retrieve the Tutors IDs from the request (assuming they're in an array)
            $tutors_ids = $request->input('tutors');
            // Associate tutors with the category by inserting records into the pivot table
            $category->tutors()->syncWithPivotValues($tutors_ids, ['updated_at' => date('Y-m-d H:i:s')]);

            /**
             * Set Category Users
             */
            // Retrieve the user IDs from the request (assuming they're in an array)
            $users_ids = $request->input('users');
            // Associate users with the category by inserting records into the pivot table
            $category->users()->syncWithPivotValues($users_ids, ['updated_at' => date('Y-m-d H:i:s')]);

            $response_data = Category::with('tutors', 'users')->find($category->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Category Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Category.
            return $this->responseSuccess($response_data, 'Category Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $category = Category::find($id);

            if (empty($category)) {
                return $this->responseError(null, 'Category Not Found', Response::HTTP_NOT_FOUND);
            }

            UploadHelper::deleteFile('images/categories/'.$category->image_url);
            $deleted = $category->delete($category);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the category.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($category, 'Category Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}