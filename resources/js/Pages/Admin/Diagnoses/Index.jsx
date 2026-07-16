import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RiFileList3Line, RiHospitalLine, RiEyeLine } from 'react-icons/ri';

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

export default function DiagnosesIndex({ diagnoses }) {
    const goToPage = (url) => {
        if (url) router.get(url, {}, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <RiFileList3Line size={17} className="text-slate-400" />
                    <h1 className="text-lg font-semibold text-slate-800">Riwayat Diagnosa Pasien</h1>
                </div>
            }
        >
            <Head title="Riwayat Diagnosa" />

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Toolbar */}
                <div className="px-5 py-4 border-b border-slate-100">
                    <p className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">{diagnoses.total}</span> total diagnosa tercatat
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                                <th className="px-5 py-3 text-left w-32">Tanggal</th>
                                <th className="px-5 py-3 text-left">Pasien</th>
                                <th className="px-5 py-3 text-left">Diagnosis Utama</th>
                                <th className="px-5 py-3 text-center w-32">Keyakinan</th>
                                <th className="px-5 py-3 text-center w-36">Rujukan</th>
                                <th className="px-5 py-3 text-center w-20">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {diagnoses.data.map((d) => {
                                const top = d.results?.[0];
                                return (
                                    <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap text-xs">
                                            {new Date(d.created_at).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="font-medium text-slate-800">{d.patient_name}</p>
                                            {d.patient_age && (
                                                <p className="text-xs text-slate-400">{d.patient_age} tahun</p>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {top ? (
                                                <p className="text-slate-700 font-medium">{top.disease_name}</p>
                                            ) : (
                                                <span className="text-xs text-slate-400">Tidak ada hasil</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-center whitespace-nowrap">
                                            {top ? (
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${labelColor(top.confidence_label)}`}>
                                                    {top.confidence_label}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-300">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            {top?.need_referral ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                    <RiHospitalLine size={12} />
                                                    Perlu Rujukan
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-300">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            <Link
                                                href={route('admin.diagnoses.show', d.id)}
                                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                                title="Lihat Detail"
                                            >
                                                <RiEyeLine size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                            {diagnoses.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-5 py-16 text-center">
                                        <RiFileList3Line size={32} className="text-slate-200 mx-auto mb-2" />
                                        <p className="text-slate-400 text-sm">Belum ada data diagnosa.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {diagnoses.last_page > 1 && (
                    <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
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
            </div>
        </AuthenticatedLayout>
    );
}