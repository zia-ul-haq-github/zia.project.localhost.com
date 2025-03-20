<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Qualification;
use App\Models\Experience;
use Illuminate\Notifications\Notifiable;

use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'role',
        'email',
        'password',
        'image_url',
        'bio_data',
        'mobile_no',
        'date_of_birth'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Qualifications
     *
     * Get All qualifications uploaded by user
     *
     * @return object Eloquent qualifications object
     */
    public function qualifications()
    {
        return $this->hasMany(Qualification::class)->orderBy('id', 'desc');
    }

    /**
     * Experiences
     *
     * Get All experiences uploaded by user
     *
     * @return object Eloquent experiences object
     */
    public function experiences()
    {
        return $this->hasMany(Experience::class)->orderBy('id', 'desc');
    }

}
