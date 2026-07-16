<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Diagnosis extends Model
{
    protected $fillable = [
        'user_id',
        'patient_name',
        'patient_age',
        'patient_gender',
        'results',
        'uses_contact_lens',
    ];

    protected $casts = [
        'results'           => 'array',
        'uses_contact_lens' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}