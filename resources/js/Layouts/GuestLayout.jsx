import { Link } from '@inertiajs/react';
import { RiEyeLine } from 'react-icons/ri';

export default function GuestLayout({ children }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12"
        >
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <Link href={route('welcome')} className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center shadow-sm">
                            <RiEyeLine size={20} className="text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-lg leading-none">SIPAMAT</p>
                            <p className="text-slate-400 text-xs mt-0.5">Sistem Pakar Infeksi Mata</p>
                        </div>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-8 py-8">
                    {children}
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    © 2025 SIPAMAT · Universitas Global Jakarta
                </p>
            </div>
        </div>
    );
}