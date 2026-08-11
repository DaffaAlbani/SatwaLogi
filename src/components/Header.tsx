import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Feather, 
  ShieldCheck, 
  User, 
  LayoutDashboard, 
  Settings, 
  Compass, 
  Menu,
  X,
  LogIn,
  LogOut,
  Calculator
} from 'lucide-react';
import { UserProfile } from '../data/satwaData';

interface HeaderProps {
  currentScreenId: string;
  onNavigateScreen: (screenId: string) => void;
  user: UserProfile | null;
  onLogout: () => void;
  onOpenCalculator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreenId,
  onNavigateScreen,
  user,
  onLogout,
  onOpenCalculator
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (screenId: string) => {
    onNavigateScreen(screenId);
    setIsMobileMenuOpen(false);
  };

  const isActive = (screenIds: string[]) => screenIds.includes(currentScreenId);

  const navItems = [
    { id: 'SCREEN_13', label: 'Beranda', icon: Compass, screens: ['SCREEN_13'] },
    { id: 'SCREEN_10', label: 'Katalog', icon: BookOpen, screens: ['SCREEN_10', 'SCREEN_10_DETAIL'] },
    { id: 'SCREEN_15', label: 'Jurnal', icon: Feather, screens: ['SCREEN_15', 'SCREEN_5'] },
  ];

  return (
    <>
      <header 
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled 
            ? 'header-scrolled' 
            : 'bg-white/60 backdrop-blur-md'
        }`}
        style={{
          borderBottom: isScrolled 
            ? '1px solid rgba(6, 46, 35, 0.06)' 
            : '1px solid rgba(6, 46, 35, 0.08)'
        }}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-500 ${
          isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
        }`}>
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('SCREEN_13')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className={`rounded-xl bg-[#062e23] text-[#d4a373] flex items-center justify-center font-serif font-bold shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 border border-[#d4a373]/20 shrink-0 ${
              isScrolled ? 'w-8 h-8 text-lg' : 'w-10 h-10 sm:w-11 sm:h-11 text-xl sm:text-2xl'
            }`}>
              🌿
            </div>
            <div className={`transition-all duration-300 ${isScrolled ? 'hidden sm:block' : ''}`}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`font-serif font-bold tracking-tight text-[#062e23] transition-all duration-300 ${
                  isScrolled ? 'text-lg' : 'text-xl sm:text-2xl'
                }`}>
                  Satwalogi
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#e8ede6] to-[#dce5d9] text-[#2d5a4c] border border-[#2d5a4c]/15">
                  Scientific
                </span>
              </div>
              {!isScrolled && (
                <p className="text-[10px] sm:text-[11px] text-[#2d5a4c]/70 font-medium tracking-wide">
                  Botanical Intellect & Fauna Journal
                </p>
              )}
            </div>
          </div>

          {/* Primary Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.screens);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
                    active
                      ? 'nav-link--active text-[#062e23]'
                      : 'text-[#062e23]/60 hover:text-[#062e23]'
                  }`}
                >
                  <Icon size={16} className={active ? 'text-[#d4a373]' : ''} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {user?.role === 'Admin' && (
              <button
                onClick={() => handleNavClick('SCREEN_14')}
                className={`nav-link px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
                  isActive(['SCREEN_14'])
                    ? 'nav-link--active text-[#062e23]'
                    : 'text-[#062e23]/60 hover:text-[#062e23]'
                }`}
              >
                <ShieldCheck size={16} className={isActive(['SCREEN_14']) ? 'text-[#d4a373]' : ''} />
                <span>Admin</span>
              </button>
            )}

            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="px-3.5 py-2 rounded-xl text-[#062e23]/70 hover:text-[#062e23] hover:bg-[#e8ede6]/60 transition-all duration-300 flex items-center gap-1.5 font-medium"
                title="Kalkulator Indeks Keanekaragaman Hayati"
              >
                <Calculator size={16} className="text-[#d4a373]" />
                <span>Kalkulator</span>
              </button>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('SCREEN_8')}
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-300 ${
                    isActive(['SCREEN_8'])
                      ? 'bg-[#062e23] text-[#d4a373] shadow-md'
                      : 'bg-[#e8ede6]/60 hover:bg-[#e8ede6] text-[#062e23] border border-[#062e23]/10'
                  }`}
                >
                  <LayoutDashboard size={15} />
                  <span>Dasbor</span>
                </button>

                <button
                  onClick={() => handleNavClick('SCREEN_6')}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-full border border-[#062e23]/10 bg-white/80 hover:bg-white hover:shadow-md transition-all duration-300 group"
                  title="Pengaturan Akun"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-[#d4a373]/30 group-hover:border-[#d4a373] transition-all"
                  />
                  <span className="hidden lg:inline text-xs font-semibold text-[#062e23] pr-1">
                    {user.name.split(' ')[0]}
                  </span>
                  <Settings size={14} className="text-[#2d5a4c]/50 hidden sm:inline group-hover:rotate-45 transition-transform duration-500" />
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-red-600/70 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                  title="Keluar (Logout)"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('SCREEN_11')}
                className="shimmer-btn bg-gradient-to-r from-[#062e23] to-[#1a5948] hover:from-[#0f4234] hover:to-[#2d5a4c] text-[#d4a373] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <LogIn size={15} />
                <span>Masuk / Daftar</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#062e23] hover:bg-[#e8ede6]/60 transition-colors"
              title="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer — Slide-in Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ animation: 'fade-in 0.2s ease-out' }}
          />
          
          {/* Slide-in Panel */}
          <div 
            className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#f9faf6] z-50 md:hidden shadow-2xl border-l border-[#062e23]/10 flex flex-col"
            style={{ animation: 'slide-in-right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#062e23]/8">
              <span className="text-xs font-bold text-[#2d5a4c] uppercase tracking-widest">Navigasi</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#e8ede6] transition-colors"
              >
                <X size={18} className="text-[#062e23]" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.screens);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full p-3.5 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 ${
                      active 
                        ? 'bg-[#062e23] text-[#d4a373] shadow-md' 
                        : 'text-[#062e23] hover:bg-[#e8ede6]/80'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {user?.role === 'Admin' && (
                <button
                  onClick={() => handleNavClick('SCREEN_14')}
                  className={`w-full p-3.5 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 ${
                    isActive(['SCREEN_14']) 
                      ? 'bg-[#062e23] text-[#d4a373] shadow-md' 
                      : 'text-[#062e23] hover:bg-[#e8ede6]/80'
                  }`}
                >
                  <ShieldCheck size={18} />
                  <span>Verifikasi Admin</span>
                </button>
              )}

              <div className="gradient-line my-3" />

              <button
                onClick={() => handleNavClick(user ? 'SCREEN_6' : 'SCREEN_11')}
                className={`w-full p-3.5 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 ${
                  isActive(['SCREEN_11', 'SCREEN_6']) 
                    ? 'bg-[#062e23] text-[#d4a373] shadow-md' 
                    : 'text-[#062e23] hover:bg-[#e8ede6]/80'
                }`}
              >
                <User size={18} />
                <span>{user ? 'Profil Saya' : 'Masuk / Daftar'}</span>
              </button>

              {user && (
                <button
                  onClick={() => handleNavClick('SCREEN_8')}
                  className={`w-full p-3.5 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 ${
                    isActive(['SCREEN_8']) 
                      ? 'bg-[#062e23] text-[#d4a373] shadow-md' 
                      : 'text-[#062e23] hover:bg-[#e8ede6]/80'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  <span>Dasbor Kontributor</span>
                </button>
              )}
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-[#062e23]/8">
              <div className="flex items-center gap-2 text-[10px] text-[#2d5a4c]/60 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Satwalogi Scientific Platform v1.0</span>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};
