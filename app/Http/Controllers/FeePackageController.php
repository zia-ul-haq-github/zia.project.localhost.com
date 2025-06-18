<?php

namespace App\Http\Controllers;

use App\Models\FeePackage;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Helpers\UploadHelper;

use App\Traits\ResponseTrait;

use Illuminate\Support\Facades\Log;

class FeePackageController extends Controller
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
            $category_id   = ( isset($request['category_id']) && ! empty(isset($request['category_id'])) ) ? $request['category_id'] : '';
            $tutor_id   = ( isset($request['tutor_id']) && ! empty(isset($request['tutor_id'])) ) ? $request['tutor_id'] : '';
            $author_id   = ( isset($request['author_id']) && ! empty(isset($request['author_id'])) ) ? $request['author_id'] : '';
            $search   = ( isset($request['search']) && ! empty(isset($request['search'])) ) ? $request['search'] : '';
            
            $query = FeePackage::orderBy($orderBy, $order)
                ->with('category', 'tutor', 'author');

            if (! empty($category_id) ) {
                $query->where('category_id', $category_id);
            }

            if (! empty($tutor_id) ) {
                $query->where('tutor_id', $tutor_id);
            }    

            if (! empty($author_id) ) {
                $query->where('author_id', $author_id);
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

            return $this->responseSuccess($data, 'Fee Packages List Fetch Successfully !');

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
                    'fee_amount'       => 'required|numeric',
                    'service_charges_amount' => 'required|numeric',
                    'category_id'     => 'required|numeric',
                    'tutor_id'     => 'required|numeric',
                    'author_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'fee_amount.required'     => 'Please provide fee amount',
                    'fee_amount.numeric'          => 'Please make sure fee amount is numeric value',
                    'service_charges_amount.required'     => 'Please provide service charges amount',
                    'service_charges_amount.numeric'          => 'Please make sure service charges amount is numeric value',
                    'category_id.required'     => 'Please provide category id',
                    'category_id.numeric'          => 'Please make sure category id is numeric value',
                    'tutor_id.required'     => 'Please provide tutor id',
                    'tutor_id.numeric'          => 'Please make sure tutor id is numeric value',
                    'author_id.required'     => 'Please provide author id',
                    'author_id.numeric'          => 'Please make sure author id is numeric value',
                ]
            ); 

            $fee_package = FeePackage::create($request_data);

            $response_data = FeePackage::with('category', 'tutor', 'author')->find($fee_package->id);

            return $this->responseSuccess($response_data, 'New Fee Package Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = FeePackage::with('category', 'tutor', 'author')->find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Fee Package Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Fee Package Details Fetch Successfully !');

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
                    'fee_amount'       => 'required|numeric',
                    'service_charges_amount' => 'required|numeric',
                    'category_id'     => 'required|numeric',
                    'tutor_id'     => 'required|numeric',
                    'author_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 50 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'fee_amount.required'     => 'Please provide fee amount',
                    'fee_amount.numeric'          => 'Please make sure fee amount is numeric value',
                    'service_charges_amount.required'     => 'Please provide service charges amount',
                    'service_charges_amount.numeric'          => 'Please make sure service charges amount is numeric value',
                    'category_id.required'     => 'Please provide category id',
                    'category_id.numeric'          => 'Please make sure category id is numeric value',
                    'tutor_id.required'     => 'Please provide tutor id',
                    'tutor_id.numeric'          => 'Please make sure tutor id is numeric value',
                    'author_id.required'     => 'Please provide author id',
                    'author_id.numeric'          => 'Please make sure author id is numeric value',
                ]
            );

            $fee_package = FeePackage::find($id);

            if (is_null($fee_package)) {
                return null;
            }

            // If everything is OK, then update.
            $fee_package->update($request_data);

            $response_data = FeePackage::with('category', 'tutor', 'author')->find($fee_package->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Fee Package Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Class.
            return $this->responseSuccess($response_data, 'Fee Package Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $fee_package = FeePackage::find($id);

            if (empty($fee_package)) {
                return $this->responseError(null, 'Fee Package Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $fee_package->delete($fee_package);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the Fee Package.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($fee_package, 'Fee Package Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}