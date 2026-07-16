<?php

namespace App\Services;

use App\Models\Disease;

class CertaintyFactorService
{
    const CF_USER_MAP = [
        'yes'   => 1.0,
        'maybe' => 0.6,
        'no'    => 0.0,
    ];

    const ANSWER_LABEL_MAP = [
        'yes'   => 'Ya',
        'maybe' => 'Mungkin',
        'no'    => 'Tidak',
    ];

    const MIN_CF       = 0.2;
    const MIN_ANSWERED = 2;

    const REQUIRED_SYMPTOMS = [
        'P001' => ['G006', 'G007'],
        'P002' => ['G006', 'G007'],
        'P003' => ['G011', 'G013', 'G014', 'G015'],
        'P004' => ['G009'],
    ];

    public function diagnose(array $selectedSymptoms): array
    {
        $diseases = Disease::with('symptoms')->get();
        $results  = [];

        foreach ($diseases as $disease) {
            $cfCombined    = 0.0;
            $symptomTrace  = [];
            $answeredCount = 0;

            foreach ($disease->symptoms as $symptom) {
                $answer   = $selectedSymptoms[(string) $symptom->id]
                    ?? $selectedSymptoms[$symptom->id]
                    ?? 'no';
                $cfUser   = self::CF_USER_MAP[$answer] ?? 0.0;
                $cfExpert = (float) $symptom->pivot->cf_expert;
                $cfHE     = $cfExpert * $cfUser;

                $symptomTrace[] = [
                    'symptom_id'   => $symptom->id,
                    'symptom_code' => $symptom->code,
                    'symptom_name' => $symptom->name,
                    'answer'       => $answer,
                    'answer_label' => self::ANSWER_LABEL_MAP[$answer] ?? $answer,
                    'cf_expert'    => round($cfExpert, 2),
                    'cf_user'      => $cfUser,
                    'cf_he'        => round($cfHE, 4),
                ];

                if ($answer === 'no') {
                    continue;
                }

                $answeredCount++;
                $cfCombined = $this->combine($cfCombined, $cfHE);
            }

            if ($cfCombined < self::MIN_CF || $answeredCount < self::MIN_ANSWERED) {
                continue;
            }

            if (isset(self::REQUIRED_SYMPTOMS[$disease->code])) {
                $requiredCodes = self::REQUIRED_SYMPTOMS[$disease->code];
                $answeredCodes = array_map(
                    fn($t) => $t['symptom_code'],
                    array_filter($symptomTrace, fn($t) => $t['answer'] !== 'no')
                );
                $hasRequired = count(array_intersect($requiredCodes, $answeredCodes)) > 0;

                if (!$hasRequired) {
                    continue;
                }
            }

            usort($symptomTrace, function ($a, $b) {
                if ($a['answer'] === 'no' && $b['answer'] !== 'no') return 1;
                if ($a['answer'] !== 'no' && $b['answer'] === 'no') return -1;
                return $b['cf_he'] <=> $a['cf_he'];
            });

            $results[] = [
                'disease_id'       => $disease->id,
                'disease_code'     => $disease->code,
                'disease_name'     => $disease->name,
                'description'      => $disease->description,
                'solution'         => $disease->solution,
                'need_referral'    => $disease->need_referral,
                'cf_combined'      => round($cfCombined, 4),
                'percentage'       => round($cfCombined * 100, 2),
                'confidence_label' => self::confidenceLabel($cfCombined),
                'symptom_trace'    => $symptomTrace,
            ];
        }

        usort($results, fn($a, $b) => $b['cf_combined'] <=> $a['cf_combined']);

        return $results;
    }

    private function combine(float $cf1, float $cf2): float
    {
        if ($cf1 >= 0 && $cf2 >= 0) {
            return $cf1 + $cf2 * (1 - $cf1);
        }

        if ($cf1 < 0 && $cf2 < 0) {
            return $cf1 + $cf2 * (1 + $cf1);
        }

        $denominator = 1 - min(abs($cf1), abs($cf2));

        return $denominator == 0.0 ? 0.0 : ($cf1 + $cf2) / $denominator;
    }

    public static function confidenceLabel(float $cf): string
    {
        return match (true) {
            $cf >= 0.8 => 'Sangat Tinggi',
            $cf >= 0.6 => 'Tinggi',
            $cf >= 0.4 => 'Sedang',
            $cf >= 0.2 => 'Rendah',
            default    => 'Sangat Rendah',
        };
    }
}