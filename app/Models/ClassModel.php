<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

use App\Models\Category;
use App\Models\User;

use Illuminate\Support\Facades\Log;

class ClassModel extends Model
{

    // Explicitly specify the table name if it doesn't follow Laravel's naming convention
    protected $table = 'classes'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'author_id',
        'category_id',
    ];


    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function author(): HasOne
    {
        return $this->hasOne(User::class,  'id', 'author_id');
    }

    /** 
     * Relationship: Many to Many
     * https://laravel.com/docs/12.x/eloquent-relationships#many-to-many
     */
    // public function users(): BelongsToMany
    // {
    //     return $this->belongsToMany(User::class, 'class_users', 'class_id', 'user_id');
    // }

    public function users()
    {
        // $category = $this->category()->with('users');
        // return $category->users->toArray();
        // return [];
        return $this->belongsToMany(User::class, 'category_users', 'category_id', 'user_id');
    }

    /** 
     * Relationship: One to Many / Has Many
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-many
     */
    public function quizzes(): HasMany
    {
        return $this->hasMany(Quiz::class, 'class_id', 'id');
    }

}