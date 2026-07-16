import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { RiEyeOffLine, RiEyeLine, RiMailLine, RiLockPasswordLine, RiUserLine } from 'react-icons/ri';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#eaf3fb] via-[#dceefb] to-[#eef7fc] px-4 py-10">
            <Head title="Daftar — SIPAMAT" />

            {/* Background animation layer */}
            <EyeBackground />

            {/* Logo top-left */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <img src="/images/logo_eye.png" alt="SIPAMAT" className="w-8 h-8 object-contain" />
                <span className="font-semibold text-[#16344a] text-sm">SIPAMAT</span>
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-sm bg-white/85 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_1px_24px_rgba(20,60,90,0.08)] px-7 py-8">
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center p-2.5">
                        <img src="/images/logo_eye.png" alt="" className="w-full h-full object-contain" />
                    </div>
                </div>

                <h1 className="text-center text-xl font-semibold text-[#16344a] mb-1">Buat akun SIPAMAT</h1>
                <p className="text-center text-xs text-[#5a7a8f] leading-relaxed mb-6">
                    Daftar untuk mulai menggunakan sistem diagnosa infeksi mata
                </p>

                <form onSubmit={submit} className="space-y-3.5">
                    {/* Name */}
                    <div>
                        <div className="relative">
                            <RiUserLine size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="text"
                                value={data.name}
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Nama lengkap"
                                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                    errors.name ? 'border-red-400 bg-red-50' : 'border-slate-300'
                                }`}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <div className="relative">
                            <RiMailLine size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email"
                                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                    errors.email ? 'border-red-400 bg-red-50' : 'border-slate-300'
                                }`}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <RiLockPasswordLine size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password (min. 8 karakter)"
                                className={`w-full pl-9 pr-10 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                    errors.password ? 'border-red-400 bg-red-50' : 'border-slate-300'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <div className="relative">
                            <RiLockPasswordLine size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Konfirmasi password"
                                className={`w-full pl-9 pr-10 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                    errors.password_confirmation ? 'border-red-400 bg-red-50' : 'border-slate-300'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showConfirm ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                            </button>
                        </div>
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center py-2.5 px-4 bg-[#103a52] text-white text-sm font-semibold rounded-lg hover:bg-[#0c2c3f] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-1"
                    >
                        {processing ? 'Mendaftar...' : 'Daftar sekarang'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </div>
    );
}

function EyeBackground() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <defs>
                <radialGradient id="irisGlowBig" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8fc6e0" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#7fb8d8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7fb8d8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="irisGlowSmall" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#9fd4e8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#9fd4e8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="pupilGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#bcdff0" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#bcdff0" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Large iris top-right, well clear of the centered card */}
            <EyeMotif cx={1180} cy={190} scale={1.4} />

            {/* Smaller iris bottom-left */}
            <EyeMotif cx={220} cy={760} scale={1} />

            <FloatingDots />
        </svg>
    );
}

function EyeMotif({ cx, cy, scale }) {
    const rGlow = 260 * scale;
    const rRing1 = 150 * scale;
    const rRing2 = 190 * scale;
    const rRing3 = 230 * scale;
    const rPupil = 70 * scale;
    const rInner = 95 * scale;
    const rOuter = 145 * scale;

    return (
        <g>
            <circle cx={cx} cy={cy} r={rGlow} fill="url(#irisGlowBig)" />
            <circle cx={cx} cy={cy} r={rRing1} fill="none" stroke="#5a9fc4" strokeWidth="0.8" opacity="0.4" />
            <circle cx={cx} cy={cy} r={rRing2} fill="none" stroke="#5a9fc4" strokeWidth="0.6" opacity="0.3" />
            <circle cx={cx} cy={cy} r={rRing3} fill="none" stroke="#5a9fc4" strokeWidth="0.6" opacity="0.2" />
            <circle cx={cx} cy={cy} r={rPupil} fill="#103a52" opacity="0.8" />
            <circle cx={cx} cy={cy} r={rPupil} fill="url(#pupilGlow)" />
            <circle cx={cx - rPupil * 0.4} cy={cy - rPupil * 0.4} r={rPupil * 0.2} fill="#ffffff" opacity="0.5" />
            <IrisRays cx={cx} cy={cy} rInner={rInner} rOuter={rOuter} count={40} />
        </g>
    );
}

function IrisRays({ cx, cy, rInner, rOuter, count }) {
    const lines = [];
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x1 = cx + Math.cos(angle) * rInner;
        const y1 = cy + Math.sin(angle) * rInner;
        const x2 = cx + Math.cos(angle) * rOuter;
        const y2 = cy + Math.sin(angle) * rOuter;
        lines.push(
            <line
                key={i}
                x1={x1.toFixed(1)}
                y1={y1.toFixed(1)}
                x2={x2.toFixed(1)}
                y2={y2.toFixed(1)}
                stroke="#5a9fc4"
                strokeWidth="1"
                opacity="0.3"
            />
        );
    }
    return <g>{lines}</g>;
}

function FloatingDots() {
    const [dots] = useState(() =>
        Array.from({ length: 16 }, () => ({
            x: Math.random() * 1440,
            y: Math.random() * 900,
            r: 1.5 + Math.random() * 1.8,
            opacity: 0.2 + Math.random() * 0.3,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.5,
        }))
    );
    const [tick, setTick] = useState(0);

    useEffect(() => {
        let frame;
        let t = 0;
        const step = () => {
            t += 0.01;
            setTick(t);
            frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <g fill="#6fb3d6">
            {dots.map((d, i) => {
                const cy = d.y + Math.sin(tick * d.speed + d.phase) * 14;
                const cx = d.x + Math.cos(tick * d.speed * 0.6 + d.phase) * 10;
                return <circle key={i} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r={d.r} opacity={d.opacity} />;
            })}
        </g>
    );
}