<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ExperienceSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('experiences')->delete();
        
        $experiences = [
            // Experiences for Tutor 1
            [
                'user_id' => 2,
                'title' => 'Computer Science Teacher',
                'organization' => 'ABC High School',
                'start_date' => '2017-08-01',
                'end_date' => '2019-07-31',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'title' => 'Lecturer of Computer Science',
                'organization' => 'XYZ College',
                'start_date' => '2019-08-01',
                'end_date' => '2022-07-31',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Experiences for Tutor 2
            [
                'user_id' => 3,
                'title' => 'Mathematics Teacher',
                'organization' => 'GHI High School',
                'start_date' => '2016-06-01',
                'end_date' => '2018-05-31',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'title' => 'Assistant Professor',
                'organization' => 'MNO University',
                'start_date' => '2018-06-01',
                'end_date' => '2023-05-31',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Experiences for Tutor 3
            [
                'user_id' => 4,
                'title' => 'Physics Teacher',
                'organization' => 'PQR High School',
                'start_date' => '2015-09-01',
                'end_date' => '2017-08-31',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'title' => 'Senior Lecturer',
                'organization' => 'VWX University',
                'start_date' => '2017-09-01',
                'end_date' => '2022-12-31',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('experiences')->insert($experiences);
    }
    
}
