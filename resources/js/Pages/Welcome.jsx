import { Head, Link } from '@inertiajs/react';
    import { useState, useEffect, useRef } from 'react';
    import {
        RiMicroscopeLine,
        RiShieldCheckLine,
        RiArrowRightLine,
        RiVirusLine,
        RiDatabase2Line,
        RiUserHeartLine,
        RiInstagramLine,
        RiTiktokLine,
        RiTwitterXLine,
    } from 'react-icons/ri';
    import { MdVerified } from "react-icons/md";

    const features = [
        { icon: RiMicroscopeLine,  title: 'Diagnosa Berbasis CF',     desc: 'Metode Certainty Factor menghasilkan nilai kepastian diagnosis berdasarkan gejala yang dipilih.' },
        { icon: RiVirusLine,       title: '4 Jenis Infeksi',          desc: 'Ulkus Kornea Bakteri, Ulkus Kornea Jamur, Konjungtivitis Bakteri, dan Infeksi akibat Kontak Lens.' },
        { icon: RiDatabase2Line,   title: 'Basis Pengetahuan Pakar',  desc: 'Disusun dari wawancara langsung dengan analis mata laboratorium berpengalaman sejak 1997.' },
        { icon: RiShieldCheckLine, title: 'Saran Rujukan',            desc: 'Sistem merekomendasikan apakah pasien perlu segera dirujuk ke dokter spesialis mata.' },
    ];

    const marqueeItems = [
        'ULKUS KORNEA', 'INFEKSI BAKTERI', 'INFEKSI JAMUR',
        'KONJUNGTIVITIS BAKTERI ', 'KONTAK LENS', 'CERTAINTY FACTOR',
        'SISTEM PAKAR', 'ANALIS LABORATORIUM',
    ];

    const NAV = [
        { label: 'Beranda',      id: 'hero' },
        { label: 'Fitur',        id: 'fitur' },
        { label: 'Cara Kerja',   id: 'cara-kerja' },
        { label: 'Profile Pakar',        id: 'pakar' },
    ];

    function scrollTo(id) {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    function Marquee() {
        return (
            <div style={{ position: 'relative', zIndex: 20, overflow: 'visible' }}>
                <div style={{
                    background: '#166289',
                    border: '1px solid #1e293b',
                    padding: '22px 0',
                    transform: 'skewY(-2deg)',
                    marginLeft: -40,
                    marginRight: -40,
                }}>
                    <style>{`
                        @keyframes marquee {
                            0%   { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .marquee-track {
                            display: flex;
                            width: max-content;
                            animation: marquee 30s linear infinite;
                        }
                        .marquee-track:hover { animation-play-state: paused; }
                    `}</style>
                    <div className="marquee-track">
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} style={{
                                color: '#FFFFFF',
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '0 32px',
                                fontSize: 30, fontWeight: 900,
                                whiteSpace: 'nowrap',
                                letterSpacing: '0.01em',
                            }}>
                                <span style={{ color: '#FFFFFF', fontSize: 20 }}>+</span>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    export default function Welcome({ auth }) {
        const [activeNav, setActiveNav] = useState('Beranda');
        const [menuOpen, setMenuOpen] = useState(false);
        const isManualScroll = useRef(false);
        const manualScrollTimer = useRef(null);

        useEffect(() => {
            const sectionIds = NAV.map(n => n.id);
            const observers = sectionIds.map(id => {
                const el = id === 'hero' ? document.documentElement : document.getElementById(id);
                if (!el) return null;
                const target = id === 'hero' ? document.getElementById('hero') : el;
                if (!target) return null;
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (isManualScroll.current) return;
                        if (entry.isIntersecting) {
                            const matched = NAV.find(n => n.id === id);
                            if (matched) setActiveNav(matched.label);
                        }
                    },
                    { threshold: 0.3 }
                );
                observer.observe(target);
                return observer;
            });
            return () => { observers.forEach(obs => obs && obs.disconnect()); };
        }, []);

        function handleNav(item) {
            setActiveNav(item.label);
            setMenuOpen(false);
            isManualScroll.current = true;
            scrollTo(item.id);
            if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current);
            manualScrollTimer.current = setTimeout(() => { isManualScroll.current = false; }, 1000);
        }

        return (
            <>
                <Head title="Sistem Pakar Deteksi Infeksi Mata" />

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
                    *, *::before, *::after { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
                    html { scroll-behavior: smooth; }
                    html, body { overflow-x: hidden; max-width: 100%; }

                    .nav-pill {
                        font-size: 11px; font-weight: 600;
                        padding: 10px 20px; border-radius: 999px;
                        border: none; background: transparent; cursor: pointer;
                        color: #000000;
                        transition: background 0.15s, color 0.15s;
                        text-decoration: none;
                        display: inline-flex; align-items: center;
                    }
                    .nav-pill:hover { background: #f1f5f9; color: #0f172a; }
                    .nav-pill.active { background: #166289; color: #fff; }

                    .btn-primary {
                        display: inline-flex; align-items: center; gap: 6px;
                        padding: 10px 20px; border-radius: 999px;
                        background: #166289; color: #fff;
                        font-size: 11px; font-weight: 700; border: none; cursor: pointer;
                        text-decoration: none;
                        transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
                    }
                    .btn-primary:hover { background: #4f8dbb; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(13,148,136,0.3); }

                    .auth-group { display: flex; align-items: stretch; }
                    .auth-masuk {
                        display: inline-flex; align-items: center;
                        padding: 10px 50px 10px 20px;
                        font-size: 11px; font-weight: 700;
                        color: #475569; background: #fff;
                        border: 1px solid #e2e8f0; border-radius: 999px;
                        text-decoration: none;
                        transition: background 0.15s, color 0.15s;
                        white-space: nowrap; position: relative; z-index: 1;
                    }
                    .auth-masuk:hover { background: #f1f5f9; color: #0f172a; }
                    .auth-daftar {
                        display: inline-flex; align-items: center; gap: 6px;
                        padding: 10px 20px;
                        font-size: 11px; font-weight: 700;
                        color: #fff; background: #166289;
                        border: 1px solid #166289; border-radius: 999px;
                        text-decoration: none; white-space: nowrap;
                        transition: background 0.15s;
                        position: relative; z-index: 2; margin-left: -40px;
                    }
                    .auth-daftar:hover { background: #0f766e; }

                    .step-card {
                        background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
                        padding: 28px 24px; display: flex; flex-direction: column; gap: 12px;
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .step-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(15,23,42,0.08); }

                    /* ── DESKTOP NAV ── */
                    .nav-desktop { display: flex; }
                    .nav-mobile-btn { display: none; }
                    .nav-mobile-menu { display: none; }
                    .auth-desktop { display: flex; }
                    .auth-mobile { display: none; }

                    /* ── FEATURE / STEP GRIDS ── */
                    .grid-features { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                    .grid-steps    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
                    .feat-card-offset { margin-top: 28px; }
                    .step-card-offset { margin-top: 28px; }

                    /* ── HERO IMAGE ── */
                    .hero-img {
                        width: min(380px, 90vw);
                        height: min(500px, 90vw);
                    }
                    .hero-card-left-top  { position: absolute; top: 120px; left: -80px; }
                    .hero-card-right-mid { position: absolute; top: 40%; right: -90px; }
                    .hero-card-left-bot  { position: absolute; bottom: 80px; left: -60px; }

                    /* ── EXPERT GRID ── */
                    .expert-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px; }

                    @media print {
                        .marquee-track { animation: none !important; transform: skewY(2deg) !important; }
                    }

                    /* ════════════════════════════════
                       MOBILE  ≤ 768px
                    ════════════════════════════════ */
                    @media (max-width: 768px) {

                        /* NAV */
                        .nav-desktop { display: none !important; }
                        .nav-mobile-btn { display: flex !important; }
                        .auth-desktop { display: none !important; }
                        .auth-mobile  { display: flex !important; }

                        .nav-mobile-menu {
                            display: flex;
                            flex-direction: column;
                            position: fixed;
                            top: 60px; left: 12px; right: 12px;
                            background: #fff;
                            border: 1px solid #e2e8f0;
                            border-radius: 16px;
                            padding: 8px;
                            z-index: 100;
                            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                        }
                        .nav-mobile-menu.hidden { display: none !important; }
                        .nav-mobile-menu button {
                            text-align: left;
                            border-radius: 10px;
                            padding: 12px 16px;
                            font-size: 13px;
                        }

                        /* HERO */
                        .hero-title { font-size: clamp(2.4rem, 12vw, 3.5rem) !important; }
                        .hero-img { width: min(280px, 80vw) !important; height: min(360px, 80vw) !important; }
                        .hero-card-left-top  { top: 80px !important; left: -10px !important; }
                        .hero-card-right-mid { top: 38% !important; right: -10px !important; }
                        .hero-card-left-bot  { bottom: 60px !important; left: -8px !important; }

                        /* GRIDS → 1 kolom */
                        .grid-features { grid-template-columns: 1fr !important; }
                        .grid-steps    { grid-template-columns: 1fr !important; }
                        .feat-card-offset { margin-top: 0 !important; }
                        .step-card-offset { margin-top: 0 !important; }

                        /* EXPERT */
                        .expert-info-grid { grid-template-columns: 1fr !important; }
                        .expert-span2     { grid-column: span 1 !important; }

                        /* SECTION PADDING */
                        .section-pad { padding: 52px 0 !important; }
                        .section-inner { padding: 0 16px !important; }

                        /* FOOTER */
                        .footer-inner { flex-direction: column !important; gap: 4px !important; text-align: center !important; }
                        .footer-inner p { text-align: center !important; max-width: 100% !important; }

                        /* AUTH overlap buttons → stack on mobile */
                        .auth-masuk { padding-right: 20px !important; }
                        .auth-daftar { margin-left: 0 !important; }
                    }
                `}</style>

                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0b151f', overflowX: 'hidden', width: '100%' }}>

                    {/* ── HEADER ── */}
                    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30, background: 'transparent' }}>
                        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            {/* Logo */}
                            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none', background: '#FFFFFF', padding: '10px 20px', borderRadius: 999, border: '1px solid #e2e8f0' }}>
                                <img src="/images/logo_eye.png" alt="SIPAMAT" style={{ width: 20, height: 20, borderRadius: 6, objectFit: 'cover' }} />
                                <p style={{ fontWeight: 800, fontSize: 12, color: '#0f172a', lineHeight: 1, margin: 0 }}>SIPAMAT</p>
                            </Link>

                            {/* Desktop nav */}
                            <nav className="nav-desktop" style={{ alignItems: 'center', gap: 2, border: '1px solid #e2e8f0', borderRadius: 999, padding: '5px 5px', background: '#fff' }}>
                                {NAV.map(item => (
                                    <button key={item.label} onClick={() => handleNav(item)} className={`nav-pill ${activeNav === item.label ? 'active' : ''}`}>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>

                            {/* Desktop auth */}
                            <div className="auth-desktop" style={{ alignItems: 'center' }}>
                                {auth?.user ? (
                                    <Link href={auth.user.role === 'admin' ? route('admin.dashboard') : route('diagnose')} className="btn-primary">
                                        Buka Aplikasi <RiArrowRightLine size={15} />
                                    </Link>
                                ) : (
                                    <div className="auth-group">
                                        <Link href={route('login')} className="auth-masuk">Masuk</Link>
                                        <Link href={route('register')} className="auth-daftar">Daftar Sekarang <RiArrowRightLine size={15} /></Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile: hamburger + daftar */}
                            <div className="auth-mobile" style={{ alignItems: 'center', gap: 8 }}>
                                <Link href={route('register')} className="btn-primary" style={{ fontSize: 11 }}>
                                    Daftar <RiArrowRightLine size={14} />
                                </Link>
                                <button
                                    className="nav-mobile-btn"
                                    onClick={() => setMenuOpen(v => !v)}
                                    style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4 }}
                                    aria-label="Menu"
                                >
                                    <span style={{ width: 18, height: 2, background: '#0f172a', borderRadius: 2, display: 'block' }} />
                                    <span style={{ width: 18, height: 2, background: '#0f172a', borderRadius: 2, display: 'block' }} />
                                    <span style={{ width: 18, height: 2, background: '#0f172a', borderRadius: 2, display: 'block' }} />
                                </button>
                            </div>
                        </div>

                        {/* Mobile dropdown menu */}
                        <div className={`nav-mobile-menu${menuOpen ? '' : ' hidden'}`}>
                            {NAV.map(item => (
                                <button key={item.label} onClick={() => handleNav(item)} className={`nav-pill ${activeNav === item.label ? 'active' : ''}`} style={{ width: '100%' }}>
                                    {item.label}
                                </button>
                            ))}
                            <div style={{ borderTop: '1px solid #f1f5f9', margin: '6px 0', paddingTop: 6, display: 'flex', gap: 8 }}>
                                <Link href={route('login')} style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12, fontWeight: 700, color: '#475569', textDecoration: 'none' }}>
                                    Masuk
                                </Link>
                                <Link href={route('register')} style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: 10, background: '#166289', fontSize: 12, fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main style={{ flex: 1, paddingTop: 72 }}>

                        {/* ── HERO ── */}
                        <section id="hero" style={{ position: 'relative', background: '#0a0f1a', overflow: 'visible', paddingBottom: 10 }}>
                            <div style={{ position: 'relative', overflow: 'visible' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 60% at 50% 30%, rgba(13,148,136,0.18) 0%, rgba(10,15,26,0) 70%)' }} />

                                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '5px 32px 0' }}>
                                    <h1 className="hero-title" style={{
                                        fontSize: 'clamp(3rem, 8vw, 6.2rem)',
                                        fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0, color: '#fff',
                                    }}>
                                        DETEKSI<br />
                                        <span style={{ color: '#4f8dbb' }}>INFEKSI MATA</span>
                                    </h1>
                                </div>

                                <div style={{ position: 'relative', zIndex: 1, maxWidth: 1152, margin: '-90px auto 0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
                                    <div style={{ position: 'relative', flex: '0 0 auto' }}>
                                        <img
                                            src="/images/eye_hero.png"
                                            alt=""
                                            className="hero-img"
                                            style={{ objectFit: 'cover', objectPosition: 'center 80%', position: 'relative', zIndex: 2, marginBottom: -90, display: 'block' }}
                                        />

                                        <div className="hero-card-left-top" style={{
                                            zIndex: 1, background: 'rgba(255,255,255,0.10)',
                                            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                                            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '12px 16px', minWidth: 120,
                                        }}>
                                            <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 2px' }}>4+</p>
                                            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Jenis infeksi mata</p>
                                        </div>

                                        <div className="hero-card-right-mid" style={{
                                            zIndex: 2, background: 'rgba(255,255,255,0.10)',
                                            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                                            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '12px 16px', minWidth: 120,
                                        }}>
                                            <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 2px' }}>29+</p>
                                            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Tahun pengalaman pakar</p>
                                        </div>

                                        <div className="hero-card-left-bot" style={{
                                            zIndex: 2, background: 'rgba(255,255,255,0.10)',
                                            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                                            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '12px 16px', minWidth: 100,
                                        }}>
                                            <p style={{ fontSize: 20, fontWeight: 900, color: '#8ec5c4', margin: '0 0 2px' }}>CF</p>
                                            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Metode diagnosa</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div style={{ position: 'relative', height: 0, zIndex: 20 }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: 'translateY(-50%)' }}>
                                <Marquee />
                            </div>
                        </div>

                        {/* ── FITUR ── */}
                        <section id="fitur" className="section-pad" style={{ background: '#f8fafc', padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <div className="section-inner" style={{ maxWidth: 1152, margin: '0 auto', padding: '0 32px' }}>
                                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#166289', margin: '0 0 12px' }}>Kemampuan Sistem</p>
                                    <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.1 }}>Fitur SIPAMAT</h2>
                                    <p style={{ fontSize: 13, lineHeight: 1.8, color: '#64748b', margin: '0 auto', maxWidth: 400 }}>
                                        Sistem pakar untuk deteksi dini infeksi mata secara cepat dan terarah berbasis metode Certainty Factor.
                                    </p>
                                </div>

                                <div className="grid-features">
                                    {features.map((feat, i) => {
                                        const Icon = feat.icon;
                                        const isEven = i % 2 === 0;
                                        return (
                                            <div key={i} className={isEven ? '' : 'feat-card-offset'} style={{
                                                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18,
                                                padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em' }}>
                                                        {String(i + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                                                    </span>
                                                    <div style={{ width: 36, height: 36, borderRadius: 11, background: '#EFF6FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Icon size={17} color="#166289" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: '0 0 5px', lineHeight: 1.3 }}>{feat.title}</p>
                                                    <p style={{ fontSize: 12, lineHeight: 1.7, color: '#64748b', margin: 0 }}>{feat.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* ── CARA KERJA ── */}
                        <section id="cara-kerja" className="section-pad" style={{ background: '#f8fafc', padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <div className="section-inner" style={{ maxWidth: 1152, margin: '0 auto', padding: '0 32px' }}>
                                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#166289', margin: '0 0 12px' }}>Alur Penggunaan</p>
                                    <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.1 }}>Cara Kerja</h2>
                                    <p style={{ fontSize: 13, lineHeight: 1.8, color: '#64748b', margin: '0 auto', maxWidth: 800 }}>
                                        Tiga langkah mudah untuk mendapatkan hasil diagnosa infeksi mata secara cepat dan akurat.
                                    </p>
                                </div>

                                <div className="grid-steps">
                                    {[
                                        { num: '01', icon: RiUserHeartLine,   label: 'Buat Akun',    desc: 'Daftar sebagai pasien secara gratis dan masuk ke sistem.' },
                                        { num: '02', icon: RiMicroscopeLine,  label: 'Input Gejala', desc: 'Pilih gejala mata yang Anda rasakan dari daftar yang tersedia.' },
                                        { num: '03', icon: RiShieldCheckLine, label: 'Terima Hasil', desc: 'Sistem menghitung nilai CF dan memberikan hasil diagnosa beserta saran rujukan.' },
                                    ].map(({ num, icon: Icon, label, desc }, i) => (
                                        <div key={num} className={`step-card${i === 1 ? ' step-card-offset' : ''}`} style={{ padding: '20px', borderRadius: 18, gap: 12 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em' }}>{num} / 03</span>
                                                <div style={{ width: 36, height: 36, borderRadius: 11, background: '#EFF6FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon size={17} color="#166289" />
                                                </div>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: '0 0 5px', lineHeight: 1.3 }}>{label}</p>
                                                <p style={{ fontSize: 12, lineHeight: 1.7, color: '#64748b', margin: 0 }}>{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ── PAKAR ── */}
                        <section id="pakar" className="section-pad" style={{ background: '#f8fafc', padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <div className="section-inner" style={{ maxWidth: 1152, margin: '0 auto', padding: '0 32px' }}>
                                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#166289', margin: '0 0 12px' }}>Sumber Pengetahuan</p>
                                    <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.1 }}>Profil Pakar</h2>
                                    <p style={{ fontSize: 13, lineHeight: 1.8, color: '#64748b', margin: '0 auto', maxWidth: 800 }}>
                                        Basis pengetahuan sistem disusun dari wawancara langsung dengan analis laboratorium mata profesional.
                                    </p>
                                </div>

                                <div style={{ maxWidth: 680, margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, overflow: 'hidden' }}>
                                    <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
                                        <img src="/images/expert-profile.jpeg" alt="Lutfi Imam" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
                                    </div>

                                    <div style={{ padding: '24px 24px 32px' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>Lutfi Imam, A.Md.AK</h3>
                                                    <MdVerified size={18} color="#2563eb" />
                                                </div>
                                                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 4px' }}>Analis Laboratorium Mata • RSUPN Dr. Cipto Mangkusumo</p>
                                            </div>
                                            <div style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                                padding: '8px 16px', borderRadius: 999, border: '1px solid #e2e8f0',
                                                background: '#fff', fontSize: 11, fontWeight: 700, color: '#166289', flexShrink: 0,
                                            }}>
                                                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                                                NIP · 197401292007011014
                                            </div>
                                        </div>

                                        <div className="expert-info-grid">
                                            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '14px 16px' }}>
                                                <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>Institusi</p>
                                                <p style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.4 }}>RSUPN Dr. Cipto Mangkusumo</p>
                                            </div>
                                            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '14px 16px' }}>
                                                <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>Golongan</p>
                                                <p style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.4 }}>Penata Muda / IIIa</p>
                                            </div>
                                            <div className="expert-span2" style={{ background: '#f8fafc', borderRadius: 12, padding: '14px 16px', gridColumn: 'span 2' }}>
                                                <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>Pelatihan</p>
                                                <p style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.4, wordBreak: 'break-word' }}>
                                                    Konseling Bank Mata RSCM & Teknisi Bank Mata RSCM
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                                            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                                                <div>
                                                    <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 2px' }}>Pendidikan</p>
                                                    <p style={{ fontSize: 12, fontWeight: 600, color: '#475569', margin: 0 }}>STIKES Kesetiakawanan Sosial Indonesia</p>
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 2px' }}>Lokasi</p>
                                                    <p style={{ fontSize: 12, fontWeight: 600, color: '#475569', margin: 0 }}>Laboratorium Mikrobiologi Terpadu RSCM Kirana Mata</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </main>

                    <footer style={{ background: '#166289', borderTop: '1px solid #e2e8f0' }}>
                        <div className="footer-inner" style={{ maxWidth: 1152, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                            <p style={{ fontSize: 12, color: '#FFFFFF', margin: 0 }}>© SIPAMAT · Universitas Global Jakarta</p>
                            <p style={{ fontSize: 12, color: '#FFFFFF', margin: 0, textAlign: 'right', maxWidth: 420 }}>
                                Hasil diagnosa bersifat indikatif dan tidak menggantikan pemeriksaan langsung oleh tenaga medis profesional.
                            </p>
                        </div>
                    </footer>

                </div>
            </>
        );
    }