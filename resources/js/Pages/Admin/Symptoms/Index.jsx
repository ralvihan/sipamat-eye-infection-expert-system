import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiAlertLine } from 'react-icons/ri';

export default function SymptomsIndex({ symptoms }) {
    const handleDelete = (symptom) => {
        if (confirm(`Hapus gejala "${symptom.name}"? Tindakan ini juga akan menghapus relasinya dengan penyakit.`)) {
            router.delete(route('admin.symptoms.destroy', symptom.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <RiAlertLine size={17} className="text-slate-400" />
                    <h1 className="text-lg font-semibold text-slate-800">Data Gejala</h1>
                </div>
            }
        >
            <Head title="Data Gejala" />

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <p className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">{symptoms.length}</span> gejala terdaftar
                    </p>
                    <Link
                        href={route('admin.symptoms.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                    >
                        <RiAddLine size={16} />
                        Tambah Gejala
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                                <th className="px-5 py-3 text-center w-20">Kode</th>
                                <th className="px-5 py-3 text-left">Nama Gejala</th>
                                <th className="px-5 py-3 text-left">Deskripsi</th>
                                <th className="px-5 py-3 text-center w-32">Dipakai di</th>
                                <th className="px-5 py-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {symptoms.map((symptom) => (
                                <tr key={symptom.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-5 py-3.5 text-center">
                                        <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                            {symptom.code}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                                                <RiAlertLine size={13} className="text-teal-500" />
                                            </div>
                                            <span className="font-medium text-slate-800">{symptom.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500 max-w-xs">
                                        <p className="truncate text-sm">{symptom.description || <span className="text-slate-300">—</span>}</p>
                                    </td>
                                    <td className="px-5 py-3.5 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                            {symptom.diseases_count} penyakit
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Link
                                                href={route('admin.symptoms.edit', symptom.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                                title="Edit"
                                            >
                                                <RiEditLine size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(symptom)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                title="Hapus"
                                            >
                                                <RiDeleteBinLine size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {symptoms.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-16 text-center">
                                        <RiAlertLine size={32} className="text-slate-200 mx-auto mb-2" />
                                        <p className="text-slate-400 text-sm">Belum ada data gejala.</p>
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