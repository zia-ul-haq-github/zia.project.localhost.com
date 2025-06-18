<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\FeePackage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

use Carbon\Carbon;

class FeePackageSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::with('tutors')->get();
        
        foreach ($categories as $category) {
            foreach( $category->tutors as $tutor ){
                $packages_types = ['Daily', 'Weekly', 'Monthly'];
                foreach($packages_types as $index => $package_type){
                    $fee_package = FeePackage::create([
                        'title' => "Package: {$category->title} - {$package_type} - Online Class ",
                        'description' => "The tutor will provide {$package_type} online class via zoom etc.",
                        'fee_amount' => ($index) ? 200 : 200 + ( 100 * $index ),
                        'service_charges_amount' => 25,
                        'category_id' => $category->id,
                        'tutor_id' => $tutor->id,
                        'author_id' => $tutor->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

    }

    
}
