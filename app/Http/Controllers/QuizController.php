<?php

namespace App\Http\Controllers;

use App\Models\Quiz;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Helpers\UploadHelper;

use App\Traits\ResponseTrait;

use Illuminate\Support\Facades\Log;

class QuizController extends Controller
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
                $data = Quiz::orderBy($orderBy, $order)
                    ->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->with('class', 'questions', 'author', 'users', 'attempts')
                    ->paginate($perPage);
            }else{
                $data = Quiz::orderBy($orderBy, $order)
                    ->with('class', 'questions', 'author', 'users', 'attempts')
                    ->paginate($perPage);
            }

            return $this->responseSuccess($data, 'Quiz List Fetch Successfully !');

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
                    'class_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'status.required'     => 'Please provide status',
                    'status.max'          => 'Please make sure status length is upto 10 characters',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                    'class_id.required'     => 'Please provide class id',
                    'class_id.numeric'          => 'Please make sure class id is numeric value',
                ]
            ); 

            $quiz = Quiz::create($request_data);

            /**
             * Set Quiz Users
             */
            // Retrieve the user IDs from the request (assuming they're in an array)
            $users_ids = $request->input('users');
            // Associate users with the quiz by inserting records into the pivot table
            $quiz->users()->attach($users_ids, ['created_at' => date('Y-m-d H:i:s')]);

            $response_data = Quiz::with('class', 'questions', 'author', 'users', 'attempts')->find($quiz->id);

            return $this->responseSuccess($response_data, 'New Quiz Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = Quiz::with('class', 'questions', 'author', 'users', 'attempts')->find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Quiz Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Quiz Details Fetch Successfully !');

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
                    'class_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'status.required'     => 'Please provide status',
                    'status.max'          => 'Please make sure status length is upto 10 characters',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                    'class_id.required'     => 'Please provide class id',
                    'class_id.numeric'          => 'Please make sure class id is numeric value',
                ]
            );  

            $quiz = Quiz::find($id);

            if (is_null($quiz)) {
                return null;
            }

            // If everything is OK, then update.
            $quiz->update($request_data);

            /**
             * Set Quiz Users
             */
            // Retrieve the user IDs from the request (assuming they're in an array)
            $users_ids = $request->input('users');
            // Associate users with the quiz by inserting records into the pivot table
            $quiz->users()->syncWithPivotValues($users_ids, ['updated_at' => date('Y-m-d H:i:s')]);

            $response_data = Quiz::with('class', 'questions', 'author', 'users', 'attempts')->find($quiz->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Quiz Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Class.
            return $this->responseSuccess($response_data, 'Quiz Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $quiz = Quiz::find($id);

            if (empty($quiz)) {
                return $this->responseError(null, 'Quiz Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $quiz->delete($quiz);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the Quiz.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($quiz, 'Quiz Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}