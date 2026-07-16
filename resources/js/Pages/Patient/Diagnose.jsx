import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    RiMicroscopeLine,
    RiUserLine,
    RiArrowLeftLine,
    RiArrowRightLine,
    RiInformationLine,
    RiCheckLine,
    RiQuestionLine,
    RiCloseLine,
    RiEyeLine,
} from 'react-icons/ri';

export default function Diagnose({ symptoms }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_name: '',
        patient_age: '',
        patient_gender: '',
        uses_contact_lens: false,
        symptoms: {},
    });

    const [step, setStep] = useState(1);

    const handleNameChange = (e) => {
        const val = e.target.value.replace(/[^a-zA-Z\s.'-]/g, '');
        setData('patient_name', val);
    };

    const handleAgeChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 120)) {
            setData('patient_age', val);
        }
    };

    const handleSymptomChange = (id, value) => {
        setData('symptoms', { ...data.symptoms, [String(id)]: value });
    };

    const allAnswered = symptoms.every((s) => data.symptoms[String(s.id)] !== undefined);
    const answeredCount = Object.keys(data.symptoms).length;

    const submit = (e) => {
        e.preventDefault();
        post(route('diagnose.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <RiMicroscopeLine size={18} className="text-slate-500" />
                    <h1 className="text-lg font-semibold text-slate-800">Diagnosis Infeksi Mata</h1>
                </div>
            }
        >
            <Head title="Diagnosa" />

            <div className="max-w-3xl mx-auto space-y-5">
                <div className="flex items-center justify-center gap-3">
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                            step === 1
                                ? 'bg-[#166289] text-white border-[#166289]'
                                : 'bg-teal-100 text-teal-700 border-teal-100'
                        }`}
                    >
                        {step > 1 ? <RiCheckLine size={14} /> : <RiUserLine size={14} />}
                        1. Data Pasien
                    </div>
                    <div className="w-10 sm:w-16 h-px bg-slate-200" />
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                            step === 2
                                ? 'bg-[#166289] text-white border-[#166289]'
                                : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                    >
                        <RiEyeLine size={14} />
                        2. Gejala
                    </div>
                </div>

                {step === 1 && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                        <div>
                            <h3 className="text-base font-semibold text-slate-800 mb-1">Data Pasien</h3>
                            <p className="text-sm text-slate-500">Isi data terlebih dahulu sebelum memilih gejala.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Nama Pasien <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.patient_name}
                                onChange={handleNameChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan nama lengkap"
                                maxLength={100}
                            />
                            {errors.patient_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.patient_name}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Usia</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={data.patient_age}
                                    onChange={handleAgeChange}
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: 25"
                                    maxLength={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Jenis Kelamin</label>
                                <select
                                    value={data.patient_gender}
                                    onChange={(e) => setData('patient_gender', e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Pilih...</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                            </div>
                        </div>

                        <label
                            htmlFor="contact_lens"
                            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <input
                                type="checkbox"
                                id="contact_lens"
                                checked={data.uses_contact_lens}
                                onChange={(e) => setData('uses_contact_lens', e.target.checked)}
                                className="h-4 w-4 text-blue-700 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-700">Saya adalah pengguna kontak lens</span>
                        </label>

                        <div className="flex justify-end pt-2 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                disabled={!data.patient_name.trim()}
                                className="flex items-center gap-1.5 bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Lanjut ke Gejala
                                <RiArrowRightLine size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={submit} className="space-y-4">
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-800 transition-colors pb-5"
                                    >
                                        <RiArrowLeftLine size={16} />
                                        Kembali
                                    </button>
                                    <h3 className="text-base font-semibold text-slate-800">Pilih Gejala yang Dirasakan</h3>
                                    <p className="text-sm text-slate-500 mt-0.5">
                                        Jawab setiap gejala dengan jujur untuk hasil yang akurat.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-lg p-3 mb-5">
                                <RiInformationLine size={16} className="text-blue-700 shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-900 leading-relaxed">
                                    <strong>Panduan:</strong> Pilih <em>Ya</em> jika gejala benar-benar ada,{' '}
                                    <em>Mungkin</em> jika tidak yakin, atau <em>Tidak</em> jika tidak ada gejala tersebut.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {symptoms.map((symptom) => (
                                    <div
                                        key={symptom.id}
                                        className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded mt-0.5">
                                                {symptom.code}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-slate-800">{symptom.name}</p>
                                                {symptom.description && (
                                                    <p className="text-xs text-slate-500 mt-0.5">{symptom.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-3 ml-10">
                                            {[
                                                { val: 'yes', label: 'Ya', icon: RiCheckLine, active: 'bg-teal-600 text-white border-teal-600' },
                                                { val: 'maybe', label: 'Mungkin', icon: RiQuestionLine, active: 'bg-amber-500 text-white border-amber-500' },
                                                { val: 'no', label: 'Tidak', icon: RiCloseLine, active: 'bg-slate-400 text-white border-slate-400' },
                                            ].map(({ val, label, icon: Icon, active }) => (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => handleSymptomChange(symptom.id, val)}
                                                    className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                                        data.symptoms[String(symptom.id)] === val
                                                            ? active
                                                            : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400'
                                                    }`}
                                                >
                                                    <Icon size={13} />
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {answeredCount} / {symptoms.length} gejala dijawab
                            </p>
                            <button
                                type="submit"
                                disabled={!allAnswered || processing}
                                className="flex items-center gap-1.5 bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <RiMicroscopeLine size={16} />
                                {processing ? 'Memproses...' : 'Diagnosa Sekarang'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AuthenticatedLayout>
    );
}