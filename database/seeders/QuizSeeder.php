<?php

namespace Database\Seeders;

use App\Models\ClassModel;
use App\Models\Quiz;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;


use Carbon\Carbon;

class QuizSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // $classes = ClassModel::all()->with('category', 'quizzes', 'author', 'users');
        // $classes = ClassModel::all();
        $classes = ClassModel::with('category', 'quizzes', 'author', 'users')->get();

        foreach ($classes as $class) {
            for ($i = 1; $i <= 3; $i++) {
                $quiz = Quiz::create([
                    'title' => "{$class->title} - Quiz {$i}",
                    'description' => "A quiz on {$class->title} covering key concepts.",
                    'status' => 'active',
                    'passing_percentage' => 60,
                    'attempts_limit' => 3,
                    'author_id' => $class->author->id, // Replace with appropriate author ID
                    'class_id' => $class->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $users_ids = $class->users->pluck('id');

                Log::warning('quiz-seeder = class-users');
                Log::warning(print_r($users_ids, true));
                // Attach fifteen random users to the category
                $quiz->users()->attach( $users_ids, ['created_at' => now(), 'updated_at' => now()]);
                

            }
        }
        

    }

    
}
