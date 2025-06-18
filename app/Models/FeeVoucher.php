<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Category;
use App\Models\FeePackage;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

use Illuminate\Support\Facades\Log;

class FeeVoucher extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'amount',
        'due_date',
        'status',
        'payment_proof_image_url',
        'verification_status',
        'category_id',
        'tutor_id',
        'fee_package_id',
        'user_id',
        'author_id'
    ];

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function author(): HasOne
    {
        return $this->hasOne(User::class,  'id', 'author_id');
    }

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function tutor(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'tutor_id');
    }

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function category(): HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    /** 
     * Relationship: One to One / Has One
     * https://laravel.com/docs/12.x/eloquent-relationships#one-to-one
     */
    public function fee_package(): HasOne
    {
        return $this->hasOne(FeePackage::class, 'id', 'fee_package_id');
    }



}