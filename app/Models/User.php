<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

use App\Models\Qualification;
use App\Models\Experience;
use App\Models\ClassModel;
use App\Models\Category;

use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        'date_of_birth',
        'address'
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
            'address' => 'array',
        ];
    }


    /**
     * Set the address attribute - automatically serializes array to JSON
     */
    public function setAddressAttribute($value)
    {
        $this->attributes['address'] = json_encode($value);
    }

    /**
     * Get the address attribute - automatically deserializes JSON to array
     */
    public function getAddressAttribute($value)
    {
        return json_decode($value, true);
    }

    /** 
     * Qualifications
     * 
     * Purpose: Get All qualifications associated by user
     * Relationship: One to Many / Has Many
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-many
     * 
     * @return object Eloquent qualifications object
     */
    public function qualifications(): HasMany
    {
        return $this->hasMany(Qualification::class)->orderBy('id', 'desc');
    }

    
    /** 
     * Experiences
     * 
     * Purpose: Get All Experiences associated by user
     * Relationship: One to Many / Has Many
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-many
     * 
     * @return object Eloquent Experiences object
     */
    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('id', 'desc');
    }

    /** 
     * Relationship: Many to Many
     * https://laravel.com/docs/12.x/eloquent-relationships#many-to-many
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_users', 'user_id', 'category_id');
    }

    /** 
     * Relationship: Many to Many
     * https://laravel.com/docs/12.x/eloquent-relationships#many-to-many
     */
    public function classes(): BelongsToMany
    {
        return $this->belongsToMany(ClassModel::class, 'class_users', 'user_id', 'class_id');
    }


}
