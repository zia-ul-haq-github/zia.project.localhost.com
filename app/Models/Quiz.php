<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\ClassModel;
use App\Models\Question;
use App\Models\Attempt;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Support\Facades\Log;

class Quiz extends Model
{

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
        'class_id',
    ];

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function class(): HasOne
    {
        return $this->hasOne(ClassModel::class, 'id', 'class_id');
    }

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function author(): HasOne
    {
        return $this->hasOne(User::class,  'id', 'author_id');
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'quiz_id', 'id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'quiz_users', 'quiz_id', 'user_id');
    }

    /** 
     * Relationship: One to Many / Has Many
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-many
     */
    public function attempts(): HasMany
    {
        return $this->hasMany(Attempt::class, 'quiz_id', 'id');
    }

    /** 
     * Relationship: One to Many / Has Many
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-many
     */
    public function user_attempts($user_id): HasMany
    {
        return $this->hasMany(Attempt::class, 'quiz_id', 'id')->where('user_id', '==', $user_id);
    }

}