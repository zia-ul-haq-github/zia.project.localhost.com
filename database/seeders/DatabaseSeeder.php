<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(QualificationSeeder::class);
        $this->call(ExperienceSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(ClassSeeder::class);
        $this->call(QuizSeeder::class);
        $this->call(QuestionSeeder::class);
        $this->call(FeePackageSeeder::class);
        $this->call(FeeVouchersSeeder::class);
    }
}
