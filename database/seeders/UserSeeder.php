<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        $data = [
            [
                'name' => 'Zia Ul Haq',
                'role' => 'admin',
                'email' => 'admin@yopmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => Str::random(10),
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'bio_data' => fake()->sentence(45),
                'mobile_no' => fake()->phoneNumber(),
                'date_of_birth' => fake()->dateTimeBetween('-50 years', '-30 years', 'Asia/Karachi')->format('Y-m-d H:i:s'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tutor 01',
                'role' => 'tutor',
                'email' => 'tutor-01@yopmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => Str::random(10),
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'bio_data' => fake()->sentence(45),
                'mobile_no' => fake()->phoneNumber(),
                'date_of_birth' => fake()->dateTimeBetween('-50 years', '-30 years', 'Asia/Karachi')->format('Y-m-d H:i:s'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tutor 02',
                'role' => 'tutor',
                'email' => 'tutor-02@yopmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => Str::random(10),
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'bio_data' => fake()->sentence(45),
                'mobile_no' => fake()->phoneNumber(),
                'date_of_birth' => fake()->dateTimeBetween('-50 years', '-30 years', 'Asia/Karachi')->format('Y-m-d H:i:s'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tutor 03',
                'role' => 'tutor',
                'email' => 'tutor-03@yopmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => Str::random(10),
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'bio_data' => fake()->sentence(45),
                'mobile_no' => fake()->phoneNumber(),
                'date_of_birth' => fake()->dateTimeBetween('-50 years', '-30 years', 'Asia/Karachi')->format('Y-m-d H:i:s'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        /**
         * For Single item creation
         */
        // User::create($data);

        /**
         * For multiple items creation
         */
        // User::insert($data);

        foreach ($data as $userData) {
            $user = User::create($userData);

            // Avatar URL
            $avatarUrl = 'https://robohash.org/' . urlencode($user->name) . '/?set=set2';

            // Fetch image contents
            $contents = Http::timeout(100)->retry(3, 100)->get($avatarUrl)->body();

            // Ensure directory exists
            $directory = public_path('storage/users');
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            // Generate filename
            $imageName = Str::random(10) . '.png';

            // Store image in /public/storage/users/
            $imagePath = $directory . '/' . $imageName;
            file_put_contents($imagePath, $contents);

            // Update user's image_url field
            $user->update(['image_url' => asset('storage/users/' . $imageName)]);
        }


        // Create Dummy Users via factory
        User::factory(20)->withAvatar()->create();
    }
    
}
