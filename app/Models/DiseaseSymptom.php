<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiseaseSymptom extends Model
{
    protected $table = 'disease_symptom';

    protected $fillable = [
        'disease_id',
        'symptom_id',
        'cf_expert',
    ];

    protected $casts = [
        'cf_expert' => 'float',
    ];

    public function disease(): BelongsTo
    {
        return $this->belongsTo(Disease::class);
    }

    public function symptom(): BelongsTo
    {
        return $this->belongsTo(Symptom::class);
    }
}