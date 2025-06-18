<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\ClassModel;
use App\Models\Question;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Support\Facades\Log;

class Question extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'choices',
        'answer',
        'marks',
        'author_id',
        'quiz_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'choices' => 'array',
        ];
    }

    /**
     * Set the choices attribute - automatically serializes array to JSON
     */
    public function setChoicesAttribute($value)
    {
        $this->attributes['choices'] = json_encode($value);
    }

    /**
     * Get the choices attribute - automatically deserializes JSON to array
     */
    public function getChoicesAttribute($value)
    {
        return json_decode($value, true);
    }

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function quiz(): HasOne
    {
        return $this->hasOne(Quiz::class, 'id', 'quiz_id');
    }

}