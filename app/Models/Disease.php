<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Disease extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'solution',
        'need_referral',
    ];

    protected $casts = [
        'need_referral' => 'boolean',
    ];

    public function symptoms(): BelongsToMany
    {
        return $this->belongsToMany(Symptom::class, 'disease_symptom')
                    ->withPivot('cf_expert')
                    ->withTimestamps();
    }
}