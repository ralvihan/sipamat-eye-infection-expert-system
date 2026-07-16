<?php

namespace App\Http\Controllers;

use App\Models\Diagnosis;
use App\Models\Symptom;
use App\Services\CertaintyFactorService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiagnosisController extends Controller
{
    public function __construct(
        private CertaintyFactorService $cfService
    ) {}

    public function create()
    {
        $symptoms = Symptom::orderBy('code')->get(['id', 'code', 'name', 'description']);

        return Inertia::render('Patient/Diagnose', [
            'symptoms' => $symptoms,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_name'      => 'required|string|max:100',
            'patient_age'       => 'nullable|integer|min:1|max:120',
            'patient_gender'    => 'nullable|in:male,female',
            'uses_contact_lens' => 'boolean',
            'symptoms'          => 'required|array',
            'symptoms.*'        => 'in:yes,maybe,no',
        ]);

        $results = $this->cfService->diagnose($validated['symptoms']);

        $diagnosis = Diagnosis::create([
            'user_id'           => auth()->id(),
            'patient_name'      => $validated['patient_name'],
            'patient_age'       => $validated['patient_age'],
            'patient_gender'    => $validated['patient_gender'],
            'uses_contact_lens' => $validated['uses_contact_lens'] ?? false,
            'results'           => $results,
        ]);

        return redirect()->route('diagnose.show', $diagnosis->id);
    }

    public function history()
    {
        $diagnoses = Diagnosis::where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Patient/History', [
            'diagnoses' => $diagnoses,
        ]);
    }

    public function show(Diagnosis $diagnosis)
    {
        if (!auth()->user()->isAdmin() && $diagnosis->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Patient/DiagnoseResult', [
            'diagnosis' => $diagnosis,
            'results'   => $diagnosis->results,
            'cfUserMap' => CertaintyFactorService::CF_USER_MAP,
            'isAdmin'   => auth()->user()->isAdmin(),
        ]);
    }

    public function pdf(Diagnosis $diagnosis)
    {
        if (!auth()->user()->isAdmin() && $diagnosis->user_id !== auth()->id()) {
            abort(403);
        }

        $pdf = Pdf::loadView('pdf.diagnosis', [
            'diagnosis' => $diagnosis,
        ])->setPaper('a4');

        $filename = 'diagnosa-' . str_pad($diagnosis->id, 6, '0', STR_PAD_LEFT) . '.pdf';

        return $pdf->stream($filename);
    }
}