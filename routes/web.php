<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('diagnose');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ─── PATIENT ROUTES ──────────────────────────────────────────────────────
    Route::get('/diagnose', [DiagnosisController::class, 'create'])->name('diagnose');
    Route::post('/diagnose', [DiagnosisController::class, 'store'])->name('diagnose.store');
    Route::get('/diagnose/history', [DiagnosisController::class, 'history'])->name('diagnose.history');
    Route::get('/diagnose/{diagnosis}', [DiagnosisController::class, 'show'])->name('diagnose.show');
    Route::get('/diagnose/{diagnosis}/pdf', [DiagnosisController::class, 'pdf'])->name('diagnose.pdf');

    // ─── ADMIN ROUTES ────────────────────────────────────────────────────────
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

        Route::get('/diseases', [AdminController::class, 'diseasesIndex'])->name('diseases.index');
        Route::get('/diseases/create', [AdminController::class, 'diseasesCreate'])->name('diseases.create');
        Route::post('/diseases', [AdminController::class, 'diseasesStore'])->name('diseases.store');
        Route::get('/diseases/{disease}/edit', [AdminController::class, 'diseasesEdit'])->name('diseases.edit');
        Route::put('/diseases/{disease}', [AdminController::class, 'diseasesUpdate'])->name('diseases.update');
        Route::delete('/diseases/{disease}', [AdminController::class, 'diseasesDestroy'])->name('diseases.destroy');

        Route::get('/symptoms', [AdminController::class, 'symptomsIndex'])->name('symptoms.index');
        Route::get('/symptoms/create', [AdminController::class, 'symptomsCreate'])->name('symptoms.create');
        Route::post('/symptoms', [AdminController::class, 'symptomsStore'])->name('symptoms.store');
        Route::get('/symptoms/{symptom}/edit', [AdminController::class, 'symptomsEdit'])->name('symptoms.edit');
        Route::put('/symptoms/{symptom}', [AdminController::class, 'symptomsUpdate'])->name('symptoms.update');
        Route::delete('/symptoms/{symptom}', [AdminController::class, 'symptomsDestroy'])->name('symptoms.destroy');

        Route::get('/knowledge-base', [AdminController::class, 'knowledgeBaseIndex'])->name('knowledge-base.index');
        Route::post('/knowledge-base', [AdminController::class, 'knowledgeBaseUpdate'])->name('knowledge-base.update');
        Route::delete('/knowledge-base', [AdminController::class, 'knowledgeBaseDestroy'])->name('knowledge-base.destroy');

        Route::get('/diagnoses', [AdminController::class, 'diagnosesIndex'])->name('diagnoses.index');
        Route::get('/diagnoses/{diagnosis}', [AdminController::class, 'diagnosesShow'])->name('diagnoses.show');
    });
});

require __DIR__ . '/auth.php';