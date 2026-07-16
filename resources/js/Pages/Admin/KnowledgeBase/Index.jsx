import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RiDatabase2Line, RiCloseLine, RiCheckLine, RiInformationLine } from 'react-icons/ri';

function cfBadgeColor(cf) {
    if (cf === undefined || cf === null) return null;
    if (cf >= 0.8) return 'bg-teal-50 text-teal-700 border-teal-200';
    if (cf >= 0.6) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (cf >= 0.4) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-500 border-slate-200';
}

export default function KnowledgeBaseIndex({ diseases, symptoms }) {
    const [editing, setEditing] = useState(null);
    const [value, setValue] = useState('');
    const [saving, setSaving] = useState(false);

    const cfMap = (diseaseId) => {
        const disease = diseases.find((d) => d.id === diseaseId);
        const map = {};
        disease?.symptoms?.forEach((s) => {
            map[s.id] = parseFloat(s.pivot.cf_expert);
        });
        return map;
    };

    const openEditor = (diseaseId, symptomId, currentCf) => {
        setEditing({ diseaseId, symptomId });
        setValue(currentCf !== undefined && currentCf !== null ? currentCf : '0.5');
    };

    const closeEditor = () => setEditing(null);

    const save = () => {
        const cf = parseFloat(value);
        if (isNaN(cf) || cf < 0 || cf > 1) return;

        setSaving(true);
        router.post(
            route('admin.knowledge-base.update'),
            { disease_id: editing.diseaseId, symptom_id: editing.symptomId, cf_expert: cf },
            { preserveScroll: true, onFinish: () => { setSaving(false); setEditing(null); } }
        );
    };

    const removeRelation = (diseaseId, symptomId) => {
        if (!confirm('Hapus relasi gejala ini dari penyakit?')) return;
        router.delete(route('admin.knowledge-base.destroy'), {
            data: { disease_id: diseaseId, symptom_id: symptomId },
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <RiDatabase2Line size={17} className="text-slate-400" />
                    <h1 className="text-lg font-semibold text-slate-800">Knowledge Base — Certainty Factor</h1>
                </div>
            }
        >
            <Head title="Knowledge Base" />

            <div className="flex flex-col gap-4">

                {/* Info bar */}
                <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-500">
                        <RiInformationLine size={15} className="shrink-0" />
                        <p className="text-xs">Klik sel untuk mengubah nilai CF (0.0–1.0). Klik dua kali untuk menghapus relasi.</p>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        {[
                            { label: '≥ 0.8 Sangat Tinggi', cls: 'bg-teal-50 text-teal-700 border-teal-200' },
                            { label: '≥ 0.6 Tinggi', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
                            { label: '≥ 0.4 Sedang', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
                            { label: '< 0.4 Rendah', cls: 'bg-slate-50 text-slate-500 border-slate-200' },
                        ].map(({ label, cls }) => (
                            <span key={label} className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${cls}`}>
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50 border-b border-r border-slate-200 sticky left-0 z-20 min-w-[220px]">
                                    Gejala
                                </th>
                                {diseases.map((disease) => (
                                    <th
                                        key={disease.id}
                                        className="px-3 py-3 text-center text-xs bg-slate-50 border-b border-l border-slate-200 min-w-[140px]"
                                    >
                                        <span className="font-mono text-[10px] text-slate-400 block">{disease.code}</span>
                                        <span className="font-semibold text-slate-600 text-xs block leading-tight mt-0.5">{disease.name}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {symptoms.map((symptom, idx) => (
                                <tr key={symptom.id} className={`hover:bg-slate-50/50 transition-colors ${idx % 2 === 0 ? '' : 'bg-slate-50/20'}`}>
                                    <td className="px-4 py-2.5 sticky left-0 bg-white z-10 border-r border-slate-100">
                                        <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mr-2">
                                            {symptom.code}
                                        </span>
                                        <span className="text-sm font-medium text-slate-700">{symptom.name}</span>
                                    </td>
                                    {diseases.map((disease) => {
                                        const map = cfMap(disease.id);
                                        const cf = map[symptom.id];
                                        const isEditing =
                                            editing?.diseaseId === disease.id && editing?.symptomId === symptom.id;

                                        return (
                                            <td key={disease.id} className="px-3 py-2.5 text-center border-l border-slate-100">
                                                {isEditing ? (
                                                    <div className="flex items-center justify-center gap-1">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="1"
                                                            step="0.05"
                                                            autoFocus
                                                            value={value}
                                                            onChange={(e) => setValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') save();
                                                                if (e.key === 'Escape') closeEditor();
                                                            }}
                                                            className="w-16 border border-blue-400 rounded-lg px-2 py-1 text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        <button
                                                            onClick={save}
                                                            disabled={saving}
                                                            className="w-6 h-6 flex items-center justify-center rounded-md text-teal-600 hover:bg-teal-50 disabled:opacity-40 transition-colors"
                                                            title="Simpan"
                                                        >
                                                            <RiCheckLine size={14} />
                                                        </button>
                                                        <button
                                                            onClick={closeEditor}
                                                            className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 transition-colors"
                                                            title="Batal"
                                                        >
                                                            <RiCloseLine size={14} />
                                                        </button>
                                                    </div>
                                                ) : cf !== undefined ? (
                                                    <button
                                                        onClick={() => openEditor(disease.id, symptom.id, cf)}
                                                        onDoubleClick={() => removeRelation(disease.id, symptom.id)}
                                                        title="Klik untuk edit, klik dua kali untuk hapus"
                                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-opacity hover:opacity-70 ${cfBadgeColor(cf)}`}
                                                    >
                                                        {cf.toFixed(2)}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => openEditor(disease.id, symptom.id, null)}
                                                        title="Tambah relasi"
                                                        className="w-7 h-7 rounded-full text-slate-300 hover:text-blue-600 hover:bg-blue-50 transition-colors text-base font-light"
                                                    >
                                                        +
                                                    </button>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            {symptoms.length === 0 && (
                                <tr>
                                    <td colSpan={diseases.length + 1} className="px-5 py-16 text-center text-slate-400">
                                        Belum ada data gejala.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}