<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
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
                'address' => [
                    'street' => 'H.No 266 - 500 quarters bin qasim town',
                    'country' => 'Pakistan',
                    'province' => 'Sindh',
                    'city' => 'Karachi',
                    'postal_code' => 75030
                ],
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
       
        for ($tutor_index = 1; $tutor_index <= 5; $tutor_index++) {
            $data[] = [
                'name' => "Tutor {$tutor_index}",
                'role' => "tutor",
                'email' => "tutor-{$tutor_index}@yopmail.com",
                'email_verified_at' => now(),
                'password' => Hash::make("tutor-{$tutor_index}"),
                'remember_token' => Str::random(10),
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'bio_data' => fake()->sentence(45),
                'mobile_no' => fake()->phoneNumber(),
                'date_of_birth' => fake()->dateTimeBetween('-50 years', '-30 years', 'Asia/Karachi')->format('Y-m-d H:i:s'),
                'address' => [
                    'street' => 'H.No '.rand(300, 500).' - 500 quarters bin qasim town',
                    'country' => 'Pakistan',
                    'province' => 'Sindh',
                    'city' => 'Karachi',
                    'postal_code' => rand(85030, 95030)
                ],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        for ($user_index = 1; $user_index <= 20; $user_index++) {
            // $user_index = ( $user_index < 10 ) ? '0'.$user_index : $user_index;
            $data[] = [
                'name' => "User {$user_index}",
                'role' => "user",
                'email' => "user-{$user_index}@yopmail.com",
                'email_verified_at' => now(),
                'password' => Hash::make("user-{$user_index}"),
                'remember_token' => Str::random(10),
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'bio_data' => fake()->sentence(45),
                'mobile_no' => fake()->phoneNumber(),
                'date_of_birth' => fake()->dateTimeBetween('-50 years', '-30 years', 'Asia/Karachi')->format('Y-m-d H:i:s'),
                'address' => [
                    'street' => 'H.No '.rand(300, 500).' - 500 quarters bin qasim town',
                    'country' => 'Pakistan',
                    'province' => 'Sindh',
                    'city' => 'Karachi',
                    'postal_code' => rand(85030, 95030)
                ],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }


        $directory = public_path('storage/users');
        // Delete directory and all contents
        File::deleteDirectory($directory);
        // Recreate directory
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

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
        // User::factory(20)->withAvatar()->create();
    }
    
}
