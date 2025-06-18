<?php

namespace App\Http\Controllers;

use App\Models\ClassModel;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Helpers\UploadHelper;

use App\Traits\ResponseTrait;

use Illuminate\Support\Facades\Log;

class ClassController extends Controller
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
            $author_id   = ( isset($request['author_id']) && ! empty(isset($request['author_id'])) ) ? $request['author_id'] : '';
            $category_id   = ( isset($request['category_id']) && ! empty(isset($request['category_id'])) ) ? $request['category_id'] : '';
            $tutor_id   = ( isset($request['tutor_id']) && ! empty(isset($request['tutor_id'])) ) ? $request['tutor_id'] : '';
            $user_id   = ( isset($request['user_id']) && ! empty(isset($request['user_id'])) ) ? $request['user_id'] : '';

            $query = ClassModel::orderBy($orderBy, $order)
                ->with('category', 'quizzes', 'author');

            if (! empty($author_id) ) {
                $query->where('author_id', $author_id);
            }

            // Add category filter if category_id is provided
            if (! empty($category_id) ) {
                $query->where('category_id', $category_id);
            }

            // search by name and email if search text is provided
            if( ! empty($search) ){
                $query->whereAny([
                    'title',
                    'description',
                ], 'like', '%'.$search.'%');
            }

            // get query final result
            $data = $query->paginate($perPage);

            return $this->responseSuccess($data, 'Class List Fetch Successfully !');

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
                    'status'     => 'required|string|max:10',
                    'author_id'     => 'required|numeric',
                    'category_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'status.required'     => 'Please provide status',
                    'status.max'          => 'Please make sure status length is upto 10 characters',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                    'category_id.required'     => 'Please provide category id',
                    'category_id.numeric'          => 'Please make sure category id is numeric value',
                ]
            ); 

            $class = ClassModel::create($request_data);

            $response_data = ClassModel::with('category', 'quizzes', 'author')->find($class->id);

            return $this->responseSuccess($response_data, 'New Class Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = ClassModel::with('category', 'quizzes', 'author')->find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Class Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Class Details Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function update(Request $request, $id): JsonResponse
    {

        try {

            $request_data = $request->validate(
                [
                    'title'     => 'required|string|max:50',
                    'description'     => 'nullable|max:5000',
                    'status'     => 'required|string|max:10',
                    'author_id'     => 'required|numeric',
                    'category_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'status.required'     => 'Please provide status',
                    'status.max'          => 'Please make sure status length is upto 10 characters',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                    'category_id.required'     => 'Please provide category id',
                    'category_id.numeric'          => 'Please make sure category id is numeric value',
                ]
            );  

            $class = ClassModel::find($id);

            if (is_null($class)) {
                return null;
            }

            // If everything is OK, then update.
            $class->update($request_data);

            $response_data = ClassModel::with('category', 'quizzes', 'author')->find($class->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Class Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Class.
            return $this->responseSuccess($response_data, 'Class Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $class = ClassModel::find($id);

            if (empty($class)) {
                return $this->responseError(null, 'Class Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $class->delete($class);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the Class.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($class, 'Class Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function get_user_enrolled_classes_ids( $user_id ){
        /**
         * get user verified fee vouchers
         * fetch each voucher tutor-id and category-id 
         * fetch classes-ids by tutor-id and category-id
         * return classes ids 
         */
    }

}