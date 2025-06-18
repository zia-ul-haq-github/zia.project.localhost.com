<?php

namespace Database\Seeders;


use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;


use Carbon\Carbon;

class QuestionSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $quizzes = Quiz::all();

        $choices = [
            ['label' => 'Option A', 'value' => 'A', 'marks' => 1],
            ['label' => 'Option B', 'value' => 'B', 'marks' => 1],
            ['label' => 'Option C', 'value' => 'C', 'marks' => 1],
            ['label' => 'Option D', 'value' => 'D', 'marks' => 1],
        ];

        foreach ($quizzes as $quiz) {
            for ($i = 1; $i <= 10; $i++) {

                $answer = collect(array_column($choices,'value'))->shuffle()->take(1);
                $answer = $answer[0];

                Question::create([
                    'title' => "Sample question {$i} for {$quiz->title}",
                    // 'choices' => json_encode(),
                    'choices' => $choices,
                    'answer' => $answer, // Replace with correct answer
                    'marks' => 1,
                    'author_id' => $quiz->author_id, // Replace with appropriate author ID
                    'quiz_id' => $quiz->id,
                ]);
            }
        }

    }   


}