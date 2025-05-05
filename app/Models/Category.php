<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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


    public function tutors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_tutors', 'category_id', 'tutor_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_users', 'category_id', 'user_id');
    }

}