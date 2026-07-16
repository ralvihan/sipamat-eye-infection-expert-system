import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RiArrowLeftLine, RiSaveLine, RiAlertLine } from 'react-icons/ri';

function FormField({ label, required, error, hint, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {hint && !error && <p className="text-slate-400 text-xs mt-1">{hint}</p>}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default function SymptomForm({ symptom }) {
    const isEdit = !!symptom;

    const { data, setData, post, put, processing, errors } = useForm({
        code: symptom?.code ?? '',
        name: symptom?.name ?? '',
        description: symptom?.description ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.symptoms.update', symptom.id));
        } else {
            post(route('admin.symptoms.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link
                        href={route('admin.symptoms.index')}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        <RiArrowLeftLine size={18} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold text-slate-800">
                            {isEdit ? 'Edit Gejala' : 'Tambah Gejala'}
                        </h1>
                        <p className="text-xs text-slate-400 leading-none mt-0.5">
                            {isEdit ? `Mengubah data: ${symptom.name}` : 'Tambah gejala baru ke basis pengetahuan'}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={isEdit ? 'Edit Gejala' : 'Tambah Gejala'} />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit}>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {/* Section: Identitas */}
                        <div className="px-6 py-5 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <RiAlertLine size={15} className="text-slate-400" />
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Identitas Gejala</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <FormField label="Kode" required error={errors.code} hint="Contoh: G001">
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        placeholder="G001"
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    />
                                </FormField>
                                <div className="col-span-2">
                                    <FormField label="Nama Gejala" required error={errors.name}>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Contoh: Mata merah dan berair"
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        />
                                    </FormField>
                                </div>
                            </div>
                        </div>

                        {/* Section: Deskripsi */}
                        <div className="px-6 py-5 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Informasi Tambahan</p>
                            </div>
                            <FormField label="Deskripsi" error={errors.description} hint="Opsional. Penjelasan lebih lanjut mengenai gejala ini.">
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Penjelasan tambahan mengenai gejala ini (opsional)"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                                />
                            </FormField>
                        </div>

                        {/* Footer actions */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50">
                            <Link
                                href={route('admin.symptoms.index')}
                                className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 disabled:opacity-40 transition-colors"
                            >
                                <RiSaveLine size={16} />
                                {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Gejala'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}