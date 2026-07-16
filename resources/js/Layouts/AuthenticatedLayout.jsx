import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    RiEyeLine,
    RiDashboardLine,
    RiMicroscopeLine,
    RiVirusLine,
    RiAlertLine,
    RiDatabase2Line,
    RiFileList3Line,
    RiUserLine,
    RiLogoutBoxLine,
    RiMenuLine,
    RiHistoryLine,
    RiShieldUserLine,
    RiCloseLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
} from 'react-icons/ri';

function NavItem({ href, icon: Icon, label, active, collapsed }) {
    return (
        <Link
            href={href}
            title={collapsed ? label : undefined}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 10,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: '8px 10px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.15s, color 0.15s',
                background: active ? '#f8fafc' : 'transparent',
                color: active ? '#166289' : 'rgba(255,255,255,0.6)',
                marginRight: -20,
            }}
            onMouseEnter={e => {
                if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#fff';
                }
            }}
            onMouseLeave={e => {
                if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }
            }}
        >
            <Icon
                size={17}
                style={{ flexShrink: 0, color: active ? '#166289' : 'rgba(255,255,255,0.5)', marginLeft: collapsed ? -20 : 0 }}
            />
            {!collapsed && (
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {label}
                </span>
            )}
        </Link>
    );
}

function SidebarSection({ title, children, collapsed }) {
    return (
        <div style={{ marginBottom: 16 }}>
            {!collapsed && (
                <p style={{
                    padding: '0 10px',
                    marginBottom: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}>
                    {title}
                </p>
            )}
            {collapsed && (
                <div style={{ margin: '0 10px 4px', borderTop: '1px solid rgba(255,255,255,0.15)' }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {children}
            </div>
        </div>
    );
}

function SidebarContent({ user, isAdmin, onClose, collapsed, onToggle, roundedEdge }) {
    return (
        <aside
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: '#166289',
                borderRight: 'none',
                transition: 'width 0.3s',
                width: collapsed ? 64 : 224,
                borderTopRightRadius: roundedEdge ? 18 : 0,
                borderBottomRightRadius: roundedEdge ? 18 : 0,
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                height: 56,
                padding: collapsed ? '0 8px' : '0 16px',
                borderTopRightRadius: roundedEdge ? 18 : 0,
            }}>
                {!collapsed && (
                    <Link
                        href={isAdmin ? route('admin.dashboard') : route('diagnose')}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', minWidth: 0 }}
                    >
                        <img src="/images/logo_eye.png" alt="SIPAMAT" style={{ width: 28, height: 28, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                            <p style={{ color: '#ffffff', fontWeight: 700, fontSize: 13, lineHeight: 1, margin: 0 }}>SIPAMAT</p>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>Sistem Pakar Infeksi Mata</p>
                        </div>
                    </Link>
                )}
                {collapsed && (
                    <Link href={isAdmin ? route('admin.dashboard') : route('diagnose')}>
                        <img src="/images/logo_eye.png" alt="SIPAMAT" style={{ width: 28, height: 28, borderRadius: 8, objectFit: 'cover' }} />
                    </Link>
                )}
            </div>

            <nav style={{ flex: 1, padding: '16px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
                {isAdmin ? (
                    <>
                        <SidebarSection title="Utama" collapsed={collapsed}>
                            <NavItem href={route('admin.dashboard')} icon={RiDashboardLine} label="Dashboard" active={route().current('admin.dashboard')} collapsed={collapsed} />
                        </SidebarSection>
                        <SidebarSection title="Basis Pengetahuan" collapsed={collapsed}>
                            <NavItem href={route('admin.diseases.index')} icon={RiVirusLine} label="Data Penyakit" active={route().current('admin.diseases.*')} collapsed={collapsed} />
                            <NavItem href={route('admin.symptoms.index')} icon={RiAlertLine} label="Data Gejala" active={route().current('admin.symptoms.*')} collapsed={collapsed} />
                            <NavItem href={route('admin.knowledge-base.index')} icon={RiDatabase2Line} label="Knowledge Base (CF)" active={route().current('admin.knowledge-base.*')} collapsed={collapsed} />
                        </SidebarSection>
                        <SidebarSection title="Data Pasien" collapsed={collapsed}>
                            <NavItem href={route('admin.diagnoses.index')} icon={RiFileList3Line} label="Riwayat Diagnosa" active={route().current('admin.diagnoses.*')} collapsed={collapsed} />
                        </SidebarSection>
                    </>
                ) : (
                    <SidebarSection title="Menu" collapsed={collapsed}>
                        <NavItem href={route('diagnose')} icon={RiMicroscopeLine} label="Diagnosa Mata" active={route().current('diagnose')} collapsed={collapsed} />
                        <NavItem href={route('diagnose.history')} icon={RiHistoryLine} label="Riwayat Diagnosa" active={route().current('diagnose.history')} collapsed={collapsed} />
                    </SidebarSection>
                )}
            </nav>

            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.12)',
                padding: '12px 8px',
                borderBottomRightRadius: roundedEdge ? 18 : 0,
            }}>
                {collapsed ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <Link
                            href={route('profile.edit')}
                            style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s', textDecoration: 'none' }}
                            title="Profil"
                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            <RiUserLine size={17} />
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s' }}
                            title="Keluar"
                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            <RiLogoutBoxLine size={17} />
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Link
                            href={route('profile.edit')}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, flex: 1, minWidth: 0, textDecoration: 'none', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: '#ffffff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, lineHeight: 1 }}>
                                    {user?.name}
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, display: 'flex', alignItems: 'center', gap: 3, margin: '3px 0 0' }}>
                                    {isAdmin ? <><RiShieldUserLine size={10} /> Analis Mata</> : <><RiUserLine size={10} /> Pasien</>}
                                </p>
                            </div>
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', padding: '4px 10px 4px 14px', display: 'flex', alignItems: 'center', transition: 'color 0.15s', flexShrink: 0 }}
                            title="Keluar"
                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            <RiLogoutBoxLine size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default function AuthenticatedLayout({ children, header }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = user?.role === 'admin';
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

            <div style={{ display: 'none', flexDirection: 'column', flexShrink: 0, position: 'relative' }} className="lg-sidebar">
                <style>{`
                    @media (min-width: 1024px) {
                        .lg-sidebar { display: flex !important; }
                        .mobile-menu-btn { display: none !important; }
                    }
                `}</style>
                <SidebarContent user={user} isAdmin={isAdmin} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} roundedEdge />
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ position: 'absolute', right: -10, top: '4.25rem', width: 20, height: 20, borderRadius: '50%', background: '#166289', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(22,98,137,0.3)', cursor: 'pointer', zIndex: 10, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#4f8dbb'}
                    onMouseLeave={e => e.currentTarget.style.background = '#166289'}
                >
                    {collapsed ? <RiArrowRightSLine size={13} /> : <RiArrowLeftSLine size={13} />}
                </button>
            </div>

            {sidebarOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,15,26,0.4)' }} onClick={() => setSidebarOpen(false)} />
                    <div style={{ position: 'relative', height: '100%', boxShadow: '4px 0 24px rgba(10,15,26,0.12)' }}>
                        <SidebarContent user={user} isAdmin={isAdmin} onClose={() => setSidebarOpen(false)} collapsed={false} />
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                <header style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', height: 56, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setSidebarOpen(true)}
                        style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                    >
                        <RiMenuLine size={20} />
                    </button>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#475569' }}>
                        {header}
                    </div>
                </header>

                <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}