<?php

namespace App\Http\Controllers;

use App\Models\Question;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Helpers\UploadHelper;

use App\Traits\ResponseTrait;

use Illuminate\Support\Facades\Log;

class QuestionController extends Controller
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
            $quiz_id   = ( isset($request['quiz_id']) && ! empty(isset($request['quiz_id'])) ) ? $request['quiz_id'] : '';

            $query = Question::orderBy($orderBy, $order);

            // Add category filter if category_id is provided
            if (! empty($author_id) ) {
                $query->where('author_id', $author_id);
            }

            if (! empty($quiz_id) ) {
                $query->where('quiz_id', $quiz_id);
            }

            // / search by name and email if search text is provided
            if( ! empty($search) ){
                $query->whereAny([
                    'title',
                ], 'like', '%'.$search.'%');
            }    

            // get query final result
            $data = $query->paginate($perPage);

            return $this->responseSuccess($data, 'Question List Fetch Successfully !');

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
                    'choices'     => 'nullable|max:5000',
                    'answer'     => 'required|string|max:50',
                    'author_id'     => 'required|numeric',
                    'quiz_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'choices.max' => 'Please provide choices maximum of 5000 characters',
                    'answer.required'     => 'Please provide answer',
                    'answer.max'          => 'Please make sure answer length is upto 50 characters',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                    'quiz_id.required'     => 'Please provide quiz id',
                    'quiz_id.numeric'          => 'Please make sure quiz id is numeric value',
                ]
            ); 

            $question = Question::create($request_data);

            $response_data = Question::find($question->id);

            return $this->responseSuccess($response_data, 'New Question Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = Question::find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Question Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Question Details Fetch Successfully !');

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
                    'choices'     => 'nullable|max:5000',
                    'answer'     => 'required|string|max:50',
                    'author_id'     => 'required|numeric',
                    'quiz_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'choices.max' => 'Please provide choices maximum of 5000 characters',
                    'answer.required'     => 'Please provide answer',
                    'answer.max'          => 'Please make sure answer length is upto 50 characters',
                    'author_id.required'     => 'Please provide author_id id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                    'quiz_id.required'     => 'Please provide quiz id',
                    'quiz_id.numeric'          => 'Please make sure quiz id is numeric value',
                ]
            );  

            $question = Question::find($id);

            if (is_null($question)) {
                return null;
            }

            // If everything is OK, then update.
            $question->update($request_data);

            $response_data = Question::find($question->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Question Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Class.
            return $this->responseSuccess($response_data, 'Question Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $question = Question::find($id);

            if (empty($question)) {
                return $this->responseError(null, 'Question Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $question->delete($question);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the Question.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($question, 'Question Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}