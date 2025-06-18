<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\FeeVoucher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\Request;

use Carbon\Carbon;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FeePackageController;

class FeeVouchersSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        /**
         * fetch all users
         *  fetch all categories with tutors and loop on 
         *  - fetch fee_packages by category and tutor and loop on
         *  only create one fee  voucher for a user in a category 
         */

        $users = $this->get_users();
        Log::warning('fee-voucher-seeder - $users');
        Log::warning(print_r($users, true));

        // $categories = Category::with('tutors')->all();
        // Correct way to get all categories with their tutors
        $categories = $this->get_categories();


        Log::warning('fee-voucher-seeder - $categories');
        Log::warning(print_r($categories, true));

        foreach($categories as $category){
            foreach($category->tutors as $tutor){
                
                // $users_ids = $users->pluck('id');
                $random_users = collect($users)
                ->shuffle()
                ->take(5)
                ->values()
                ->all();

                Log::warning('fee-voucher-seeder - $random_users');
                Log::warning(print_r($random_users, true));

                
                $fee_packages = $this->get_fee_packages($tutor->id, $category->id);
                Log::warning('fee-voucher-seeder - $fee_packages');
                Log::warning(print_r($fee_packages, true));

                $random_fee_packages = collect($fee_packages)->shuffle()->take(1)->values()->all();
                Log::warning('fee-voucher-seeder - $random_fee_packages');
                Log::warning(print_r($random_fee_packages, true));
                $random_fee_package = $random_fee_packages[0];

                foreach($random_users as $random_user){

                    Log::warning('fee-voucher-seeder - $random_user');
                    Log::warning(print_r($random_user, true));

                    Log::warning('fee-voucher-seeder - $category');
                    Log::warning(print_r($category, true));

                    Log::warning('fee-voucher-seeder - $tutor');
                    Log::warning(print_r($tutor, true));


                    $fee_voucher = FeeVoucher::create([
                        'title' => "Fee Voucher - user:{$random_user->name} - Category:{$category->title} - Tutor:{$tutor->name}",
                        'description' => "This Fee Voucher is generated for user:{$random_user->name} regarding enrollment into the Category:{$category->title} with Tutor:{$tutor->name}.",
                        'amount' => 200,
                        'due_date' => fake()->dateTimeBetween('now', '+30 days', 'Asia/Karachi')->format('Y-m-d'),
                        'status' => 'unpaid',
                        'payment_proof_image_url' => '',
                        'verification_status' => 'pending',
                        'author_id' => $random_user->id,
                        'user_id' => $random_user->id,
                        'category_id' => $category->id,
                        'tutor_id' => $tutor->id,
                        'fee_package_id' => $random_fee_package->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

            }
        }
        
        // foreach ($users as $user) {
        //     foreach( $class->users as $user ){
        //         $fee_voucher = FeeVoucher::create([
        //             'title' => "Fee Voucher - user:{$user->name} - class:{$class->title}",
        //             'description' => "This Fee Voucher is generated for user:{$user->name} regarding enrollment into the class:{$class->title}.",
        //             'amount' => 200,
        //             'due_date' => fake()->dateTimeBetween('now', '+30 days', 'Asia/Karachi')->format('Y-m-d'),
        //             'status' => 'unpaid',
        //             'payment_proof_image_url' => '',
        //             'verification_status' => 'pending',
        //             'author_id' => 1,
        //             'user_id' => $user->id,
        //             'category_id' => $class->id,
        //             'tutor_id' => 1,
        //             'fee_package_id' => 1,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ]);
        //     }
        // }

    }


    public function get_categories(){
        // Create a mock request with your desired parameters
        $request = new Request([
            'per_page' => 10000,
            'order_by' => 'id',
            'order' => 'desc'
        ]);

        // Instantiate and call the controller
        $controller = new CategoryController();
        $response = $controller->index($request);
        
        // Get the JSON data from the response
        $data = $response->getData()->data->data;

        Log::warning('fee-voucher-seeder - get_categories - $data');
        Log::warning(print_r($data, true));

        return $data;
    }

    public function get_users(){
        // Create a mock request with your desired parameters
        $request = new Request([
            'role' => 'user',
            'per_page' => 10000,
            'order_by' => 'id',
            'order' => 'desc'
        ]);

        // Instantiate and call the controller
        $controller = new UserController();
        $response = $controller->index($request);
        
        // Get the JSON data from the response
        $data = $response->getData()->data->data;

        Log::warning('fee-voucher-seeder - get_users - $data');
        Log::warning(print_r($data, true));

        return $data;
    }


    public function get_fee_packages($tutor_id, $category_id){
        // Create a mock request with your desired parameters
        $request = new Request([
            'tutor_id' => $tutor_id,
            'category_id' => $category_id,
            'per_page' => 10000,
            'order_by' => 'id',
            'order' => 'desc'
        ]);

        // Instantiate and call the controller
        $controller = new FeePackageController();
        $response = $controller->index($request);
        
        // Get the JSON data from the response
        $data = $response->getData()->data->data;

        Log::warning('fee-voucher-seeder - get_users - $data');
        Log::warning(print_r($data, true));

        return $data;
    }

    
}
