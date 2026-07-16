import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    RiCheckboxCircleLine,
    RiAlertLine,
    RiHospitalLine,
    RiArrowLeftLine,
    RiPrinterLine,
    RiInformationLine,
    RiVirusLine,
    RiArrowDownSLine,
    RiCheckLine,
    RiQuestionLine,
    RiCloseLine,
} from 'react-icons/ri';

function CfBar({ value }) {
    const pct = Math.round(value * 100);
    const color =
        value >= 0.8 ? '#0D9488' : value >= 0.6 ? '#1D4ED8' : value >= 0.4 ? '#D97706' : '#94A3B8';
    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
            <span className="text-sm font-semibold w-10 text-right" style={{ color }}>
                {pct}%
            </span>
        </div>
    );
}

function labelColor(label) {
    const map = {
        'Sangat Tinggi': 'bg-teal-50 text-teal-700 border-teal-200',
        Tinggi: 'bg-blue-50 text-blue-700 border-blue-200',
        Sedang: 'bg-amber-50 text-amber-700 border-amber-200',
        Rendah: 'bg-slate-50 text-slate-500 border-slate-200',
        'Sangat Rendah': 'bg-slate-50 text-slate-400 border-slate-200',
    };
    return map[label] || 'bg-slate-50 text-slate-500 border-slate-200';
}

function answerStyle(answer) {
    const map = {
        yes: { icon: RiCheckLine, classes: 'bg-teal-50 text-teal-700 border-teal-200' },
        maybe: { icon: RiQuestionLine, classes: 'bg-amber-50 text-amber-700 border-amber-200' },
        no: { icon: RiCloseLine, classes: 'bg-slate-50 text-slate-400 border-slate-200' },
    };
    return map[answer] || map.no;
}

/**
 * Breakdown gejala yang menjadi dasar perhitungan CF untuk satu hasil diagnosis.
 * Tidak dirender jika data lama (sebelum fitur ini) tidak punya symptom_trace.
 */
function SymptomTrace({ trace, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);

    if (!trace || trace.length === 0) {
        return (
            <p className="text-xs text-slate-400 italic mt-3">
                Rincian gejala tidak tersedia untuk diagnosis ini (data lama sebelum fitur rincian gejala aktif).
            </p>
        );
    }

    const answered = trace.filter((t) => t.answer !== 'no');
    const notPresent = trace.filter((t) => t.answer === 'no');

    return (
        <div className="mt-4 border-t border-slate-100 pt-3 print:block">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-between w-full text-left print:hidden"
            >
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Rincian Gejala &amp; Perhitungan CF ({answered.length} gejala cocok)
                </span>
                <RiArrowDownSLine
                    size={16}
                    className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <div className={`${open ? 'block' : 'hidden'} print:block mt-3 space-y-4`}>
                {answered.length > 0 && (
                    <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Gejala yang cocok</p>
                        <div className="space-y-2">
                            {answered.map((t) => {
                                const { icon: Icon, classes } = answerStyle(t.answer);
                                return (
                                    <div
                                        key={t.symptom_id}
                                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-[10px] font-mono bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded shrink-0">
                                                {t.symptom_code}
                                            </span>
                                            <span className="text-sm text-slate-700 truncate">{t.symptom_name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span
                                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${classes}`}
                                            >
                                                <Icon size={11} />
                                                {t.answer_label}
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-mono w-28 text-right">
                                                {t.cf_expert.toFixed(2)} × {t.cf_user.toFixed(1)} = {t.cf_he.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {notPresent.length > 0 && (
                    <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Gejala yang tidak dialami</p>
                        <div className="flex flex-wrap gap-1.5">
                            {notPresent.map((t) => (
                                <span
                                    key={t.symptom_id}
                                    className="px-2 py-1 rounded-full text-[11px] text-slate-400 bg-slate-50 border border-slate-150 border-slate-100"
                                >
                                    {t.symptom_name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <p className="text-[11px] text-slate-400 leading-relaxed">
                    Kolom angka menunjukkan <em>CF pakar × CF pengguna = kontribusi CF</em>. Seluruh kontribusi
                    digabungkan dengan rumus CF_combine(CF1, CF2) = CF1 + CF2 × (1 - CF1) untuk menghasilkan nilai
                    akhir di atas.
                </p>
            </div>
        </div>
    );
}

export default function DiagnoseResult({ diagnosis, results, isAdmin }) {
    const topResult = results?.[0];
    const hasResult = results && results.length > 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link
                        href={isAdmin ? route('admin.diagnoses.index') : route('diagnose')}
                        className="text-slate-400 hover:text-slate-700 transition-colors print:hidden"
                    >
                        <RiArrowLeftLine size={20} />
                    </Link>
                    <h1 className="text-lg font-semibold text-slate-800">Hasil Diagnosa</h1>
                </div>
            }
        >
            <Head title="Hasil Diagnosa" />

            <div className="max-w-3xl mx-auto space-y-5">
                {/* Patient Info */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                        Informasi Pasien
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs text-slate-400 mb-0.5">Nama</p>
                            <p className="text-sm font-semibold text-slate-800">{diagnosis.patient_name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-0.5">Usia</p>
                            <p className="text-sm font-semibold text-slate-800">
                                {diagnosis.patient_age ? `${diagnosis.patient_age} tahun` : '—'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-0.5">Jenis Kelamin</p>
                            <p className="text-sm font-semibold text-slate-800">
                                {diagnosis.patient_gender === 'male' ? 'Laki-laki' : diagnosis.patient_gender === 'female' ? 'Perempuan' : '—'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-0.5">Pengguna Kontak Lens</p>
                            <p className="text-sm font-semibold text-slate-800">
                                {diagnosis.uses_contact_lens ? 'Ya' : 'Tidak'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Primary Result */}
                {hasResult ? (
                    <>
                        <div
                            className={`bg-white rounded-xl border-2 p-5 ${
                                topResult.need_referral ? 'border-amber-300' : 'border-teal-300'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                        Diagnosis Utama
                                    </p>
                                    <h2 className="text-xl font-bold text-slate-900">{topResult.disease_name}</h2>
                                    <span className="text-xs text-slate-400">{topResult.disease_code}</span>
                                </div>
                                <span
                                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${labelColor(
                                        topResult.confidence_label
                                    )}`}
                                >
                                    {topResult.confidence_label}
                                </span>
                            </div>

                            <CfBar value={topResult.cf_combined} />

                            <p className="text-sm text-slate-500 mt-3 leading-relaxed">{topResult.description}</p>

                            {/* Solution */}
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <RiInformationLine size={14} />
                                    Saran Tindakan
                                </p>
                                <p className="text-sm text-blue-900 leading-relaxed">{topResult.solution}</p>
                            </div>

                            {topResult.need_referral && (
                                <div className="mt-3 flex items-center gap-2.5 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                    <RiHospitalLine size={18} className="text-amber-600 shrink-0" />
                                    <p className="text-sm text-amber-800 font-medium">
                                        Kondisi ini memerlukan rujukan ke dokter spesialis mata.
                                    </p>
                                </div>
                            )}

                            {/* Rincian gejala untuk diagnosis utama, terbuka secara default */}
                            <SymptomTrace trace={topResult.symptom_trace} defaultOpen={true} />
                        </div>

                        {/* Other Results */}
                        {results.length > 1 && (
                            <div className="bg-white rounded-xl border border-slate-200 p-5">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                                    Kemungkinan Lainnya
                                </p>
                                <div className="space-y-5">
                                    {results.slice(1).map((r) => (
                                        <div key={r.disease_id} className="pb-1">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <div className="flex items-center gap-2">
                                                    <RiVirusLine size={14} className="text-slate-400" />
                                                    <span className="text-sm font-medium text-slate-700">
                                                        {r.disease_name}
                                                    </span>
                                                    <span className="text-xs text-slate-400">{r.disease_code}</span>
                                                </div>
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${labelColor(
                                                        r.confidence_label
                                                    )}`}
                                                >
                                                    {r.confidence_label}
                                                </span>
                                            </div>
                                            <CfBar value={r.cf_combined} />

                                            {/* Rincian gejala untuk kemungkinan lain, tertutup default */}
                                            <SymptomTrace trace={r.symptom_trace} defaultOpen={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Disclaimer */}
                        <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <RiAlertLine size={18} className="text-slate-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Hasil diagnosa ini bersifat indikatif berdasarkan gejala yang dimasukkan dan tidak menggantikan pemeriksaan langsung oleh dokter atau tenaga medis profesional. Nilai persentase menunjukkan tingkat kepercayaan (Certainty Factor) berdasarkan basis pengetahuan pakar.
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                        <RiCheckboxCircleLine size={40} className="text-slate-300 mx-auto mb-3" />
                        <p className="font-semibold text-slate-600 mb-1">Tidak ada diagnosis yang cocok</p>
                        <p className="text-sm text-slate-400">
                            Gejala yang dimasukkan tidak cukup untuk menentukan diagnosis. Silakan konsultasikan langsung ke dokter mata.
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between print:hidden">
                    {!isAdmin && (
                        <Link
                            href={route('diagnose')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
                        >
                            Diagnosa Baru
                        </Link>
                    )}
                    <a
                        href={route('diagnose.pdf', diagnosis.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
                    >
                        <RiPrinterLine size={16} />
                        Cetak / Unduh PDF
                    </a>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}