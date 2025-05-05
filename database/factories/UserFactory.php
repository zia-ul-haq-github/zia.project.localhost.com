<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'role' => 'user',
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            // 'image_url' => fake()->imageUrl(),
            'bio_data' => fake()->sentence(45),
            'mobile_no' => fake()->phoneNumber(),
            'date_of_birth' => fake()->dateTimeBetween('-50 years', '-30 years', 'Asia/Karachi')->format('Y-m-d H:i:s')
        ];

        // https://robohash.org/zia/?set=set2
    }

    // public function withAvatar(): Factory|UserFactory
    // {
    //     return $this->afterCreating(function ($user) {
    //         // $url = "https://ui-avatars.com/api/?name=" . $user->name;
    //         $url = 'https://robohash.org/'.$user->name.'/?set=set2';
    //         $contents = Http::get($url)->body();
    //         $name = Str::random(10) . '.png';
    //         Storage::disk('public')->put($name, $contents);
    //         $user->update(['image_url' => $name]);
    //     });
    // }

    // public function withAvatar(): Factory|UserFactory
    // {
    //     return $this->afterCreating(function ($user) {
    //         $url = 'https://robohash.org/' . urlencode($user->name) . '/?set=set2';

    //         // Get image contents
    //         $contents = Http::get($url)->body();

    //         // Path for the image in /public/storage/users/
    //         $folder = 'users/';
    //         $name = $folder . Str::random(10) . '.png';

    //         // Save image directly in the "public/storage/users/" folder
    //         Storage::disk('public')->put($name, $contents);

    //         // Set the public URL so it’s accessible at domain.com/storage/users/
    //         $user->update(['image_url' => asset('storage/' . $name)]);
    //     });
    // }


    public function withAvatar(): Factory|UserFactory
    {
        return $this->afterCreating(function ($user) {
            $url = 'https://robohash.org/' . urlencode($user->name) . '/?set=set2';
        
            // Get image contents
            $contents = Http::timeout(100)->retry(3, 100)->get($url)->body();
        
            // Ensure the /public/storage/users directory exists
            $directory = public_path('storage/users');
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true); // Create with permissions if missing
            }
        
            // Generate unique filename
            $name = Str::random(10) . '.png';
        
            // Full path where the image will be stored
            $path = $directory . '/' . $name;
        
            // Store the image directly in /public/storage/users/
            file_put_contents($path, $contents);
        
            // Public URL for the image
            $user->update(['image_url' => asset('storage/users/' . $name)]);
        });
    }




    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

}
