<?php

namespace App\Http\Controllers;

use App\Models\Qualification;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Traits\ResponseTrait;

class QualificationController extends Controller
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
            $userId = $request->get('user_id'); // Get the user_id from the request

            $data = Qualification::orderBy($orderBy, $order);

            if ($userId) {
                $data->where('user_id', $userId); // Filter by user_id if provided
            }
    
            $data = $data->paginate($perPage);

            return $this->responseSuccess($data, 'Qualification List Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
    
    public function store(Request $request): JsonResponse
    {

        try {

            $request_data = $request->validate(
                [
                    'user_id'     => 'required|numeric',
                    'degree'     => 'required|string|max:50',
                    'board'     => 'required|string|max:50',
                    'institute'    => 'required|string|max:100',
                    'completion_date' => 'required|date_format:Y',
                    'grade'     => 'required|string|max:50',
                ],
                [
                    'user_id.required'     => 'Please give your user id',
                    'degree.required'     => 'Please give your degree name',
                    'degree.max'          => 'Please give your degree name between 50 characters',
                    'board.required'     => 'Please give your board name',
                    'board.max'          => 'Please give your board name between 50 characters',
                    'institute.required'    => 'Please give your institute name',
                    'institute.max'    => 'Please give your institute name between 100 characters',
                    'completion_date.required' => 'Please give your degree completion date',
                    'grade.max' => 'Please give your degree grade',
                ]
            ); 

            $qualification = Qualification::create($request_data);

            $response_data = Qualification::find($qualification->id);

            return $this->responseSuccess($response_data, 'New Qualification Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function show($id): JsonResponse
    {

        try {

            $data = Qualification::find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Qualification Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Qualification Details Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function update(Request $request, $id): JsonResponse
    {

        try {

            $data = $request->all();
            $qualification = Qualification::find($id);

            if (is_null($qualification)) {
                return null;
            }

            // If everything is OK, then update.
            $qualification->update($data);

            $response_data = Qualification::find($qualification->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Qualification Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Qualification.
            return $this->responseSuccess($response_data, 'Qualification Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $qualification = Qualification::find($id);

            if (empty($qualification)) {
                return $this->responseError(null, 'Qualification Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $qualification->delete($qualification);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the qualification.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($qualification, 'Qualification Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

}
