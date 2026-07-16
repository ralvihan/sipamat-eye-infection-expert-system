import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    RiVirusLine,
    RiAlertLine,
    RiFileList3Line,
    RiUserLine,
    RiArrowRightLine,
    RiHospitalLine,
    RiEyeLine,
} from 'react-icons/ri';

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
            <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${color}1A` }}
            >
                <Icon size={20} style={{ color }} />
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
                <p className="text-xs text-slate-400 mt-1">{label}</p>
            </div>
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

export default function Dashboard({ stats, recentDiagnoses }) {
    return (
        <AuthenticatedLayout
            header={<h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>}
        >
            <Head title="Dashboard Admin" />

            <div className="space-y-5">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={RiVirusLine} label="Penyakit Terdaftar" value={stats.diseases} color="#1E40AF" />
                    <StatCard icon={RiAlertLine} label="Gejala Terdaftar" value={stats.symptoms} color="#0D9488" />
                    <StatCard icon={RiFileList3Line} label="Total Diagnosa" value={stats.diagnoses} color="#D97706" />
                    <StatCard icon={RiUserLine} label="Pasien" value={stats.patients} color="#7C3AED" />
                </div>

                {/* Recent Diagnoses */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                        <p className="text-sm font-semibold text-slate-700">Diagnosa Terbaru</p>
                        <Link
                            href={route('admin.diagnoses.index')}
                            className="flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 transition-colors"
                        >
                            Lihat Semua
                            <RiArrowRightLine size={14} />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
    <table className="w-full text-sm">
        <thead>
            <tr className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                <th className="px-5 py-3 text-center">Pasien</th>
                <th className="px-5 py-3 text-center">Hasil Diagnosis Utama</th>
                <th className="px-5 py-3 text-center">Tingkat Keyakinan</th>
                <th className="px-5 py-3 text-center">Rujukan</th>
                <th className="px-5 py-3 text-center">Aksi</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
            {recentDiagnoses.map((d) => {
                const top = d.results?.[0];
                return (
                    <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5">
                            <p className="font-medium text-slate-800">{d.patient_name}</p>
                            <p className="text-xs text-slate-400">{d.user?.name}</p>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 text-center">
                            {top ? top.disease_name : '—'}
                        </td>
                        <td className="px-5 py-3.5 flex items-center justify-center">
                            {top ? (
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${labelColor(
                                        top.confidence_label
                                    )}`}
                                >
                                    {top.confidence_label}
                                </span>
                            ) : (
                                <span className="text-xs text-slate-400">—</span>
                            )}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                            {top?.need_referral ? (
                                <span className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full w-fit mx-auto">
                                    <RiHospitalLine size={12} /> Perlu Rujukan
                                </span>
                            ) : (
                                <span className="text-xs text-slate-400">Tidak Perlu Rujukan</span>
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
            {recentDiagnoses.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                        Belum ada data diagnosa.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}