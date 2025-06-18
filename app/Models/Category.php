<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\ClassModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Support\Facades\Log;

class Category extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'image_url',
        'author_id',
    ];


     /** 
     * Relationship: Many to Many
     * https://laravel.com/docs/12.x/eloquent-relationships#many-to-many
     */
    public function tutors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_tutors', 'category_id', 'tutor_id');
    }

    /** 
     * Relationship: Many to Many
     * https://laravel.com/docs/12.x/eloquent-relationships#many-to-many
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_users', 'category_id', 'user_id');
    }

    /** 
     * Relationship: One to Many / Has Many
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-many
     */
    public function classes(): HasMany
    {
        return $this->hasMany(ClassModel::class, 'category_id', 'id');
    }

}