<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;


use Carbon\Carbon;

class CategorySeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $authorId = 1; // Replace with a valid user ID from your 'users' table

        $categories = [
            [
                'title' => 'Math', 
                'description' => 'Explore topics like algebra, geometry, and calculus.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Physics', 
                'description' => 'Understand the laws of nature, motion, and energy.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Chemistry', 
                'description' => 'Study the composition and reactions of matter.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Biology', 
                'description' => 'Discover the science of life, cells, and organisms.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'English', 
                'description' => 'Master grammar, writing, and literary analysis.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Computer Science', 
                'description' => 'Learn programming, data structures, and algorithms.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'History', 
                'description' => 'Dive into world history, civilizations, and revolutions.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Geography', 
                'description' => 'Explore physical features and human geography.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Economics', 
                'description' => 'Understand markets, trade, and financial systems.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Psychology', 
                'description' => 'Study human behavior, cognition, and emotion.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Political Science', 
                'description' => 'Learn about governments, policies, and political theory.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Art', 
                'description' => 'Appreciate visual arts, design, and creativity.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Music', 
                'description' => 'Study music theory, instruments, and composition.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Environmental Science', 
                'description' => 'Explore ecosystems, sustainability, and conservation.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Philosophy', 
                'description' => 'Examine logic, ethics, and metaphysical questions.',
                'image_url' => 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        $dummyimage_bg_color = config('services.dummyimage.bg_color');
        $dummyimage_text_color = config('services.dummyimage.text_color');


        $directory = public_path('storage/categories');
        // Delete directory and all contents
        File::deleteDirectory($directory);
        // Recreate directory
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        foreach ($categories as $category_data) {
            $category = Category::create($category_data);

            $api_image_url = 'https://dummyimage.com/600x400/'.$dummyimage_bg_color.'/'.$dummyimage_text_color.'.jpg&text='.urlencode($category->title).' - Online Classes';
            // Fetch image contents
            $contents = Http::timeout(100)->retry(3, 100)->get($api_image_url)->body();
            
            // Generate filename
            $imageName = urlencode($category->title) . '.jpg';
            // Store image in /public/storage/categories/
            $imagePath = $directory . '/' . $imageName;
            file_put_contents($imagePath, $contents);

            // Update user's image_url field
            $category->update(['image_url' => asset('storage/categories/' . $imageName)]);

            // Attach three random tutors to the category
            $random_tutors_ids = collect(range(2, 6))
            ->shuffle()
            ->take(3)
            ->values()
            ->all();
            $category->tutors()->attach($random_tutors_ids, ['created_at' => now(), 'updated_at' => now()]);


            $random_users_ids = collect(range(7, 25))
            ->shuffle()
            ->take(10)
            ->values()
            ->all();

            // Attach three random tutors to the category
            $category->users()->attach($random_users_ids, ['created_at' => now(), 'updated_at' => now()]);

        }

    }

    
}
