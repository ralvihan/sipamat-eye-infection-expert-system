import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RiHistoryLine, RiHospitalLine, RiArrowRightLine, RiMicroscopeLine, RiEyeLine } from 'react-icons/ri';

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

function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getDateGroup(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.round((startOfToday - startOfDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari yang lalu`;

    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function groupDiagnoses(data) {
    const groups = [];
    const seen = new Map();
    for (const d of data) {
        const label = getDateGroup(d.created_at);
        if (!seen.has(label)) {
            seen.set(label, groups.length);
            groups.push({ label, items: [] });
        }
        groups[seen.get(label)].items.push(d);
    }
    return groups;
}

export default function History({ diagnoses }) {
    const goToPage = (url) => {
        if (url) router.get(url, {}, { preserveScroll: true });
    };

    const grouped = groupDiagnoses(diagnoses.data);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <RiHistoryLine size={17} className="text-slate-400" />
                    <h1 className="text-lg font-semibold text-slate-800">Riwayat Diagnosa Saya</h1>
                </div>
            }
        >
            <Head title="Riwayat Diagnosa" />

            <div className="max-w-3xl mx-auto space-y-5">
                {diagnoses.data.length > 0 ? (
                    <>
                        {grouped.map((group) => (
                            <div key={group.label} className="space-y-2">
                                <div className="flex items-center gap-2 px-1">
                                    <span className="text-xs font-medium text-slate-400">{group.label}</span>
                                    <div className="flex-1 h-px bg-slate-200" />
                                </div>

                                {group.items.map((d) => {
                                    const top = d.results?.[0];
                                    return (
                                        <Link
                                            key={d.id}
                                            href={route('diagnose.show', d.id)}
                                            className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 px-5 py-4 hover:border-slate-300 hover:shadow-sm transition-all group"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                                <RiEyeLine size={16} className="text-blue-500" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-semibold text-slate-800 truncate">
                                                        {top ? top.disease_name : 'Tidak ada diagnosis yang cocok'}
                                                    </span>
                                                    {top && (
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${labelColor(top.confidence_label)} shrink-0`}>
                                                            {top.confidence_label} · {top.percentage}%
                                                        </span>
                                                    )}
                                                    {top?.need_referral && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded shrink-0">
                                                            <RiHospitalLine size={11} />
                                                            Perlu Rujukan
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    Pasien: {d.patient_name} · {formatTime(d.created_at)} WIB
                                                </p>
                                            </div>

                                            <RiArrowRightLine
                                                size={15}
                                                className="text-slate-300 group-hover:text-blue-500 shrink-0 transition-colors"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}

                        {diagnoses.last_page > 1 && (
                            <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-5 py-3.5">
                                <p className="text-xs text-slate-400">
                                    Halaman <span className="font-medium text-slate-600">{diagnoses.current_page}</span> dari {diagnoses.last_page}
                                </p>
                                <div className="flex items-center gap-1">
                                    {diagnoses.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() => goToPage(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-blue-700 text-white'
                                                    : link.url
                                                    ? 'text-slate-500 hover:bg-slate-100'
                                                    : 'text-slate-300 cursor-not-allowed'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <RiMicroscopeLine size={26} className="text-slate-300" />
                        </div>
                        <p className="font-semibold text-slate-700 mb-1">Belum ada riwayat diagnosa</p>
                        <p className="text-sm text-slate-400 mb-5">
                            Mulai diagnosa pertama kamu untuk memeriksa kondisi mata.
                        </p>
                        <Link
                            href={route('diagnose')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
                        >
                            Mulai Diagnosa
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}