import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { RiEyeOffLine, RiEyeLine, RiMailLine, RiLockPasswordLine, RiArrowRightLine } from 'react-icons/ri';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#10223a',
            padding: '16px 16px',
        }}>
            <Head title="Masuk — SIPAMAT" />
            
            <div style={{
                display: 'flex', width: '100%', maxWidth: 860, maxHeight: 500,
                borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}>
                <div style={{ flex: '0 0 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 48px', background: '#fff', position: 'relative' }}>
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 36 }}>
                        <img src="/images/logo_eye.png" alt="SIPAMAT" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                        <span style={{ fontWeight: 800, fontSize: 12, color: '#0f172a' }}>SIPAMAT</span>
                    </Link>

                    <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Selamat datang!</h1>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 28px', lineHeight: 1.6 }}>
                        Sistem pakar diagnosa infeksi mata berbasis Certainty Factor.
                    </p>

                    {status && (
                        <div style={{ marginBottom: 14, padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, fontSize: 12, color: '#15803d' }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <RiMailLine size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                                <input
                                    type="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@email.com"
                                    style={{
                                        width: '100%', boxSizing: 'border-box',
                                        padding: '9px 12px 9px 34px',
                                        border: `1px solid ${errors.email ? '#fca5a5' : '#e2e8f0'}`,
                                        borderRadius: 9, fontSize: 12,
                                        background: errors.email ? '#fff5f5' : '#f8fafc',
                                        color: '#0f172a', outline: 'none',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#166289'}
                                    onBlur={e => e.target.style.borderColor = errors.email ? '#fca5a5' : '#e2e8f0'}
                                />
                            </div>
                            {errors.email && <p style={{ fontSize: 11, color: '#ef4444', margin: '3px 0 0' }}>{errors.email}</p>}
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <RiLockPasswordLine size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%', boxSizing: 'border-box',
                                        padding: '9px 34px 9px 34px',
                                        border: `1px solid ${errors.password ? '#fca5a5' : '#e2e8f0'}`,
                                        borderRadius: 9, fontSize: 12,
                                        background: errors.password ? '#fff5f5' : '#f8fafc',
                                        color: '#0f172a', outline: 'none',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#166289'}
                                    onBlur={e => e.target.style.borderColor = errors.password ? '#fca5a5' : '#e2e8f0'}
                                />
                                <button type="button" onClick={() => setShowPassword(v => !v)}
                                    style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                                    {showPassword ? <RiEyeOffLine size={13} /> : <RiEyeLine size={13} />}
                                </button>
                            </div>
                            {errors.password && <p style={{ fontSize: 11, color: '#ef4444', margin: '3px 0 0' }}>{errors.password}</p>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} style={{ width: 12, height: 12, accentColor: '#166289' }} />
                                <span style={{ fontSize: 11, color: '#64748b' }}>Ingat saya</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} style={{ fontSize: 11, color: '#166289', fontWeight: 600, textDecoration: 'none' }}>
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        <button type="submit" disabled={processing} style={{
                            width: '100%', padding: '10px',
                            background: processing ? '#94a3b8' : '#166289',
                            color: '#fff', fontWeight: 700, fontSize: 12,
                            border: 'none', borderRadius: 9,
                            cursor: processing ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            marginTop: 2,
                        }}>
                            {processing ? 'Memuat...' : <> Masuk <RiArrowRightLine size={13} /> </>}
                        </button>
                    </form>

                    <p style={{ marginTop: 20, fontSize: 11, color: '#64748b', textAlign: 'center' }}>
                        Belum punya akun?{' '}
                        <Link href={route('register')} style={{ color: '#166289', fontWeight: 700, textDecoration: 'none' }}>
                            Daftar di sini
                        </Link>
                    </p>

                </div>

                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    <img
                        src="/images/login.jpg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '30% 20%' }}
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, rgba(10,15,26,0.1) 0%, rgba(10,15,26,0.65) 100%)',
                    }} />
                    <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
                        <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.5 }}>
                            Deteksi dini infeksi mata lebih cepat dengan basis pengetahuan dari pakar laboratorium profesional.
                        </p>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: 0 }}>Lutfi Imam, A.Md.AK</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Analis Lab. Mata · RSCM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}