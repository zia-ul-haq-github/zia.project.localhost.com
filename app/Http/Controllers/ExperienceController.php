<?php

namespace App\Http\Controllers;

use App\Models\Experience;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Traits\ResponseTrait;

class ExperienceController extends Controller
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

            $data = Experience::orderBy($orderBy, $order);
            
            if ($userId) {
                $data->where('user_id', $userId); // Filter by user_id if provided
            }
    
            $data = $data->paginate($perPage);

            return $this->responseSuccess($data, 'Experience List Fetch Successfully !');

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
                    'title'     => 'required|string|max:100',
                    'organization'    => 'required|string|max:100',
                    'start_date' => 'required|date_format:Y-m-d',
                    'end_date' => 'required|date_format:Y-m-d',
                ],
                [
                    'user_id.required'     => 'Please give your user id',
                    'title.required'     => 'Please give your job title name',
                    'title.max'          => 'Please give your job title name between 100 characters',
                    'organization.required'    => 'Please give your organization name',
                    'organization.max'    => 'Please give your organization name between 100 characters',
                    'start_date.required' => 'Please give your job start date',
                    'end_date.required' => 'Please give your job end date',
                ]
            ); 

            $experience = Experience::create($request_data);

            $response_data = Experience::find($experience->id);

            return $this->responseSuccess($response_data, 'New Experience Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id): JsonResponse
    {

        try {

            $data = Experience::find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Experience Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Experience Details Fetch Successfully !');
            
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {

        try {

            $data = $request->all();
            $experience = Experience::find($id);

            if (is_null($experience)) {
                return null;
            }

            // If everything is OK, then update.
            $experience->update($data);

            $response_data = Experience::find($experience->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Experience Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Qualification.
            return $this->responseSuccess($response_data, 'Experience Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $experience = Experience::find($id);

            if (empty($experience)) {
                return $this->responseError(null, 'Experience Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $experience->delete($experience);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the Experience.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($experience, 'Experience Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}
