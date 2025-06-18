<?php

namespace App\Http\Controllers;

use App\Models\Attempt;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Helpers\UploadHelper;

use App\Traits\ResponseTrait;

use Illuminate\Support\Facades\Log;

class AttemptController extends Controller
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
            
            $data = Attempt::orderBy($orderBy, $order)
                ->with('quiz', 'user')
                ->paginate($perPage);

            return $this->responseSuccess($data, 'Attempt List Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function store(Request $request): JsonResponse
    {

        try {

            $request_data = $request->validate(
                [
                    'quiz_id'     => 'required|numeric',
                    'user_id'     => 'required|numeric',
                    'result'     => 'required|string|max:50',
                ],
                [
                    'quiz_id.required'     => 'Please provide quiz id',
                    'quiz_id.numeric'          => 'Please make sure quiz id is numeric value',
                    'user_id.required'     => 'Please provide user id',
                    'user_id.numeric'          => 'Please make sure user id is numeric value',
                    'result.required'     => 'Please provide result',
                    'result.max'          => 'Please make sure result length is upto 50 characters',
                ]
            ); 

            $attempt = Attempt::create($request_data);

            $response_data = Attempt::find($attempt->id);

            return $this->responseSuccess($response_data, 'New Attempt Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = Attempt::find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Attempt Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Attempt Details Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function update(Request $request, $id): JsonResponse
    {

        try {

            $request_data = $request->validate(
                [
                    'quiz_id'     => 'required|numeric',
                    'user_id'     => 'required|numeric',
                    'result'     => 'required|string|max:50',
                ],
                [
                    'quiz_id.required'     => 'Please provide quiz id',
                    'quiz_id.numeric'          => 'Please make sure quiz id is numeric value',
                    'user_id.required'     => 'Please provide user id',
                    'user_id.numeric'          => 'Please make sure user id is numeric value',
                    'result.required'     => 'Please provide result',
                    'result.max'          => 'Please make sure result length is upto 50 characters',
                ]
            );   

            $attempt = Attempt::find($id);

            if (is_null($attempt)) {
                return null;
            }

            // If everything is OK, then update.
            $attempt->update($request_data);

            $response_data = Attempt::find($attempt->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Attempt Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Class.
            return $this->responseSuccess($response_data, 'Attempt Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $attempt = Attempt::find($id);

            if (empty($attempt)) {
                return $this->responseError(null, 'Attempt Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $attempt->delete($attempt);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the Attempt.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($attempt, 'Attempt Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}