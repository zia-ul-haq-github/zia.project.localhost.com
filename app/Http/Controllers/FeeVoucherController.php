<?php

namespace App\Http\Controllers;

use App\Models\FeeVoucher;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Helpers\UploadHelper;

use App\Traits\ResponseTrait;

use Illuminate\Support\Facades\Log;

class FeeVoucherController extends Controller
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
            $status   = ( isset($request['status']) && ! empty(isset($request['status'])) ) ? $request['status'] : '';
            $verification_status   = ( isset($request['verification_status']) && ! empty(isset($request['verification_status'])) ) ? $request['verification_status'] : '';
            $category_id   = ( isset($request['category_id']) && ! empty(isset($request['category_id'])) ) ? $request['category_id'] : '';
            $tutor_id   = ( isset($request['tutor_id']) && ! empty(isset($request['tutor_id'])) ) ? $request['tutor_id'] : '';
            $fee_package_id = ( isset($request['fee_package_id']) && ! empty(isset($request['fee_package_id'])) ) ? $request['fee_package_id'] : '';
            $user_id   = ( isset($request['user_id']) && ! empty(isset($request['user_id'])) ) ? $request['user_id'] : '';
            $author_id   = ( isset($request['author_id']) && ! empty(isset($request['author_id'])) ) ? $request['author_id'] : '';
            
            
            $query = FeeVoucher::orderBy($orderBy, $order)
                ->with('category', 'tutor', 'fee_package', 'user', 'author');

            if (! empty($status) ) {
                $query->where('status', $status);
            }

            if (! empty($verification_status) ) {
                $query->where('verification_status', $verification_status);
            }    

            if (! empty($category_id) ) {
                $query->where('category_id', $category_id);
            }

            if (! empty($tutor_id) ) {
                $query->where('tutor_id', $tutor_id);
            }

            if (! empty($fee_package_id) ) {
                $query->where('fee_package_id', $fee_package_id);
            }

            if (! empty($user_id) ) {
                $query->where('user_id', $user_id);
            }

            if (! empty($author_id) ) {
                $query->where('author_id', $author_id);
            }

            // get query final result
            $data = $query->paginate($perPage);    

            return $this->responseSuccess($data, 'Fee Vouchers List Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function store(Request $request): JsonResponse
    {

        try {

            $request_data = $request->validate(
                [
                    'title'     => 'required|string|max:100',
                    'description'     => 'nullable|max:5000',
                    'amount'       => 'required|numeric',
                    'due_date' => 'required|date_format:Y-m-d',
                    'status'     => 'required|string|max:10',
                    // 'payment_proof_image_url'     => 'required|string',
                    'fee_package_id'     => 'required|numeric',
                    'user_id'     => 'required|numeric',
                    'author_id'     => 'required|numeric',
                ],
                [
                    'title.required'     => 'Please provide title',
                    'title.max'          => 'Please make sure title length is upto 100 characters',
                    'description.max' => 'Please provide description maximum of 5000 characters',
                    'amount.required'     => 'Please provide amount id',
                    'amount.numeric'          => 'Please make sure amount is numeric value',
                    'due_date.required'    => 'Please the due date',
                    'due_date.date_format' => 'Please make sure your due-date is formatted as Y-m-d',
                    'status.required'     => 'Please provide status',
                    'status.max'          => 'Please make sure status length is upto 10 characters',
                    // 'payment_proof_image_url.required'         => 'Please provide the payment proof image url',
                    'fee_package_id.required'     => 'Please provide fee package id',
                    'fee_package_id.numeric'          => 'Please make sure fee package id is numeric value',
                    'user_id.required'     => 'Please provide user id',
                    'user_id.numeric'          => 'Please make sure user id is numeric value',
                    'author_id.required'     => 'Please provide author id',
                    'author_id.numeric'          => 'Please make sure author_id is numeric value',
                ]
            ); 

            $fee_voucher = FeeVoucher::create($request_data);

            $response_data = FeeVoucher::with('category', 'tutor', 'fee_package', 'user', 'author')->find($fee_voucher->id);

            return $this->responseSuccess($response_data, 'New Fee Voucher Created Successfully !');

        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show($id): JsonResponse
    {
       
        try {

            $data = FeeVoucher::with('category', 'tutor', 'fee_package', 'user', 'author')->find($id);

            if (is_null($data)) {
                return $this->responseError(null, 'Fee Voucher Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Fee Voucher Details Fetch Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function update(Request $request, $id): JsonResponse
    {

        try {

            $request_data = $request->all();
            $fee_voucher = FeeVoucher::find($id);

            if (is_null($fee_voucher)) {
                return null;
            }

            // If everything is OK, then update.
            $fee_voucher->update($request_data);

            /**
             * if Fee Voucher verification status is verified
             * than attach user into the category.
             */
            // if( $fee_voucher->verification_status == 'verified' ){
            //     $category = Category::find($fee_voucher->category_id);
            //     $category->users()->syncWithoutDetaching([$fee_voucher->user_id], ['created_at' => date('Y-m-d H:i:s')]);
            // }

            $response_data = FeeVoucher::with('category', 'tutor', 'fee_package', 'user', 'author')->find($fee_voucher->id);

            if (is_null($response_data)) {
                return $this->responseError(null, 'Fee Voucher Not Found', Response::HTTP_NOT_FOUND);
            }

            // Finally return the updated Class.
            return $this->responseSuccess($response_data, 'Fee Voucher Updated Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function destroy($id): JsonResponse
    {

        try {

            $fee_voucher = FeeVoucher::find($id);

            if (empty($fee_voucher)) {
                return $this->responseError(null, 'Fee Voucher Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $fee_voucher->delete($fee_voucher);

            if ( ! $deleted) {
                return $this->responseError(null, 'Failed to delete the Fee Voucher.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($fee_voucher, 'Fee Voucher Deleted Successfully !');

        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

}