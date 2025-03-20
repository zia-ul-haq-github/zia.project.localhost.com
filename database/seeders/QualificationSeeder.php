<?php

namespace Database\Seeders;

use App\Models\Qualification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class QualificationSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('qualifications')->delete();
        
        $qualifications = [
            // Qualifications for Tutor 1
            [
                'user_id' => 2,
                'degree' => 'Matric',
                'board' => 'Federal Board',
                'institute' => 'ABC High School',
                'completion_date' => '2010',
                'grade' => 'A+',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'degree' => 'Intermediate',
                'board' => 'Federal Board',
                'institute' => 'XYZ College',
                'completion_date' => '2012',
                'grade' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'degree' => 'BSCS',
                'board' => 'Higher Education Commission',
                'institute' => 'DEF University',
                'completion_date' => '2016',
                'grade' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Qualifications for Tutor 2
            [
                'user_id' => 3,
                'degree' => 'Matric',
                'board' => 'Local Board',
                'institute' => 'GHI High School',
                'completion_date' => '2009',
                'grade' => 'B+',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'degree' => 'Intermediate',
                'board' => 'Local Board',
                'institute' => 'JKL College',
                'completion_date' => '2011',
                'grade' => 'B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'degree' => 'MSCS',
                'board' => 'Higher Education Commission',
                'institute' => 'MNO University',
                'completion_date' => '2017',
                'grade' => 'A-',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Qualifications for Tutor 3
            [
                'user_id' => 4,
                'degree' => 'Matric',
                'board' => 'State Board',
                'institute' => 'PQR High School',
                'completion_date' => '2008',
                'grade' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'degree' => 'Intermediate',
                'board' => 'State Board',
                'institute' => 'STU College',
                'completion_date' => '2010',
                'grade' => 'A+',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'degree' => 'PhD',
                'board' => 'Higher Education Commission',
                'institute' => 'VWX University',
                'completion_date' => '2022',
                'grade' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('qualifications')->insert($qualifications);
    }
    
}
