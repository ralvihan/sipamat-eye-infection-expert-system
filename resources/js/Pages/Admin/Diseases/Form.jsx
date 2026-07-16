import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RiArrowLeftLine, RiSaveLine, RiVirusLine } from 'react-icons/ri';

function FormField({ label, required, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default function DiseaseForm({ disease }) {
    const isEdit = !!disease;

    const { data, setData, post, put, processing, errors } = useForm({
        code: disease?.code ?? '',
        name: disease?.name ?? '',
        description: disease?.description ?? '',
        solution: disease?.solution ?? '',
        need_referral: disease?.need_referral ?? false,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.diseases.update', disease.id));
        } else {
            post(route('admin.diseases.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link
                        href={route('admin.diseases.index')}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        <RiArrowLeftLine size={18} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold text-slate-800">
                            {isEdit ? 'Edit Penyakit' : 'Tambah Penyakit'}
                        </h1>
                        <p className="text-xs text-slate-400 leading-none mt-0.5">
                            {isEdit ? `Mengubah data: ${disease.name}` : 'Tambah penyakit baru ke basis pengetahuan'}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={isEdit ? 'Edit Penyakit' : 'Tambah Penyakit'} />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit}>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {/* Section: Identitas */}
                        <div className="px-6 py-5 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <RiVirusLine size={15} className="text-slate-400" />
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Identitas Penyakit</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <FormField label="Kode" required error={errors.code}>
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        placeholder="P001"
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    />
                                </FormField>
                                <div className="col-span-2">
                                    <FormField label="Nama Penyakit" required error={errors.name}>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Contoh: Ulkus Kornea Bakteri"
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        />
                                    </FormField>
                                </div>
                            </div>
                        </div>

                        {/* Section: Deskripsi & Penanganan */}
                        <div className="px-6 py-5 border-b border-slate-100 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Informasi Klinis</p>
                            </div>
                            <FormField label="Deskripsi" required error={errors.description}>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Jelaskan penyakit ini secara singkat dan jelas"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                                />
                            </FormField>
                            <FormField label="Saran Penanganan" required error={errors.solution}>
                                <textarea
                                    value={data.solution}
                                    onChange={(e) => setData('solution', e.target.value)}
                                    rows={3}
                                    placeholder="Saran tindakan atau terapi yang disarankan untuk pasien"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                                />
                            </FormField>
                        </div>

                        {/* Section: Rujukan */}
                        <div className="px-6 py-5 border-b border-slate-100">
                            <label
                                htmlFor="need_referral"
                                className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    id="need_referral"
                                    checked={data.need_referral}
                                    onChange={(e) => setData('need_referral', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 border-slate-300 rounded mt-0.5 focus:ring-blue-500"
                                />
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Memerlukan rujukan ke dokter spesialis</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Centang jika penyakit ini memerlukan penanganan dokter spesialis mata</p>
                                </div>
                            </label>
                        </div>

                        {/* Footer actions */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50">
                            <Link
                                href={route('admin.diseases.index')}
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
                                {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Penyakit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}