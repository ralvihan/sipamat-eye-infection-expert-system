import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiVirusLine, RiHospitalLine } from 'react-icons/ri';

export default function DiseasesIndex({ diseases }) {
    const handleDelete = (disease) => {
        if (confirm(`Hapus penyakit "${disease.name}"? Tindakan ini juga akan menghapus relasi gejalanya.`)) {
            router.delete(route('admin.diseases.destroy', disease.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <RiVirusLine size={17} className="text-slate-400" />
                    <h1 className="text-lg font-semibold text-slate-800">Data Penyakit</h1>
                </div>
            }
        >
            <Head title="Data Penyakit" />

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <p className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">{diseases.length}</span> penyakit terdaftar
                    </p>
                    <Link
                        href={route('admin.diseases.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                    >
                        <RiAddLine size={16} />
                        Tambah Penyakit
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                                <th className="px-5 py-3 text-center w-20">Kode</th>
                                <th className="px-5 py-3 text-left">Nama Penyakit</th>
                                <th className="px-5 py-3 text-center w-32">Gejala</th>
                                <th className="px-5 py-3 text-center w-44">Rujukan</th>
                                <th className="px-5 py-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {diseases.map((disease) => (
                                <tr key={disease.id} className="hover:bg-slate-50/60 transition-colors group">
                                    <td className="px-5 py-3.5 text-center">
                                        <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                            {disease.code}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                                <RiVirusLine size={14} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{disease.name}</p>
                                                {disease.description && (
                                                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-xs">
                                                        {disease.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                            {disease.symptoms_count} gejala
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-center">
                                        {disease.need_referral ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
                                                <RiHospitalLine size={12} />
                                                Perlu Rujukan
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Link
                                                href={route('admin.diseases.edit', disease.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                                title="Edit"
                                            >
                                                <RiEditLine size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(disease)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                title="Hapus"
                                            >
                                                <RiDeleteBinLine size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {diseases.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-16 text-center">
                                        <RiVirusLine size={32} className="text-slate-200 mx-auto mb-2" />
                                        <p className="text-slate-400 text-sm">Belum ada data penyakit.</p>
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