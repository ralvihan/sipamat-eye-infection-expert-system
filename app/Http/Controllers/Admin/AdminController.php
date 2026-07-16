<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Diagnosis;
use App\Models\Disease;
use App\Models\DiseaseSymptom;
use App\Models\Symptom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'diseases'  => Disease::count(),
                'symptoms'  => Symptom::count(),
                'diagnoses' => Diagnosis::count(),
                'patients'  => Diagnosis::distinct('user_id')->count('user_id'),
            ],
            'recentDiagnoses' => Diagnosis::with('user')
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }

    // ─── DISEASES ────────────────────────────────────────────────────────────

    public function diseasesIndex()
    {
        return Inertia::render('Admin/Diseases/Index', [
            'diseases' => Disease::withCount('symptoms')->orderBy('code')->get(),
        ]);
    }

    public function diseasesCreate()
    {
        return Inertia::render('Admin/Diseases/Form', [
            'disease' => null,
        ]);
    }

    public function diseasesStore(Request $request)
    {
        $validated = $request->validate([
            'code'          => 'required|string|max:10|unique:diseases,code',
            'name'          => 'required|string|max:255',
            'description'   => 'required|string',
            'solution'      => 'required|string',
            'need_referral' => 'boolean',
        ]);

        Disease::create($validated);

        return redirect()->route('admin.diseases.index')
            ->with('success', 'Penyakit berhasil ditambahkan.');
    }

    public function diseasesEdit(Disease $disease)
    {
        return Inertia::render('Admin/Diseases/Form', [
            'disease' => $disease,
        ]);
    }

    public function diseasesUpdate(Request $request, Disease $disease)
    {
        $validated = $request->validate([
            'code'          => 'required|string|max:10|unique:diseases,code,' . $disease->id,
            'name'          => 'required|string|max:255',
            'description'   => 'required|string',
            'solution'      => 'required|string',
            'need_referral' => 'boolean',
        ]);

        $disease->update($validated);

        return redirect()->route('admin.diseases.index')
            ->with('success', 'Penyakit berhasil diperbarui.');
    }

    public function diseasesDestroy(Disease $disease)
    {
        $disease->delete();

        return redirect()->route('admin.diseases.index')
            ->with('success', 'Penyakit berhasil dihapus.');
    }

    // ─── SYMPTOMS ────────────────────────────────────────────────────────────

    public function symptomsIndex()
    {
        return Inertia::render('Admin/Symptoms/Index', [
            'symptoms' => Symptom::withCount('diseases')->orderBy('code')->get(),
        ]);
    }

    public function symptomsCreate()
    {
        return Inertia::render('Admin/Symptoms/Form', [
            'symptom' => null,
        ]);
    }

    public function symptomsStore(Request $request)
    {
        $validated = $request->validate([
            'code'        => 'required|string|max:10|unique:symptoms,code',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Symptom::create($validated);

        return redirect()->route('admin.symptoms.index')
            ->with('success', 'Gejala berhasil ditambahkan.');
    }

    public function symptomsEdit(Symptom $symptom)
    {
        return Inertia::render('Admin/Symptoms/Form', [
            'symptom' => $symptom,
        ]);
    }

    public function symptomsUpdate(Request $request, Symptom $symptom)
    {
        $validated = $request->validate([
            'code'        => 'required|string|max:10|unique:symptoms,code,' . $symptom->id,
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $symptom->update($validated);

        return redirect()->route('admin.symptoms.index')
            ->with('success', 'Gejala berhasil diperbarui.');
    }

    public function symptomsDestroy(Symptom $symptom)
    {
        $symptom->delete();

        return redirect()->route('admin.symptoms.index')
            ->with('success', 'Gejala berhasil dihapus.');
    }

    // ─── KNOWLEDGE BASE ──────────────────────────────────────────────────────

    public function knowledgeBaseIndex()
    {
        $diseases = Disease::with(['symptoms' => function ($q) {
            $q->orderBy('code');
        }])->orderBy('code')->get();

        $symptoms = Symptom::orderBy('code')->get(['id', 'code', 'name']);

        return Inertia::render('Admin/KnowledgeBase/Index', [
            'diseases' => $diseases,
            'symptoms' => $symptoms,
        ]);
    }

    public function knowledgeBaseUpdate(Request $request)
    {
        $validated = $request->validate([
            'disease_id' => 'required|exists:diseases,id',
            'symptom_id' => 'required|exists:symptoms,id',
            'cf_expert'  => 'required|numeric|min:0|max:1',
        ]);

        DiseaseSymptom::updateOrCreate(
            [
                'disease_id' => $validated['disease_id'],
                'symptom_id' => $validated['symptom_id'],
            ],
            ['cf_expert' => $validated['cf_expert']]
        );

        return back()->with('success', 'Nilai CF berhasil diperbarui.');
    }

    public function knowledgeBaseDestroy(Request $request)
    {
        $request->validate([
            'disease_id' => 'required|exists:diseases,id',
            'symptom_id' => 'required|exists:symptoms,id',
        ]);

        DiseaseSymptom::where('disease_id', $request->disease_id)
            ->where('symptom_id', $request->symptom_id)
            ->delete();

        return back()->with('success', 'Relasi gejala berhasil dihapus.');
    }

    // ─── DIAGNOSES ───────────────────────────────────────────────────────────

    public function diagnosesIndex()
    {
        $diagnoses = Diagnosis::with('user')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Diagnoses/Index', [
            'diagnoses' => $diagnoses,
        ]);
    }

    public function diagnosesShow(Diagnosis $diagnosis)
    {
        return Inertia::render('Patient/DiagnoseResult', [
            'diagnosis' => $diagnosis->load('user'),
            'results'   => $diagnosis->results,
            'isAdmin'   => true,
        ]);
    }
}