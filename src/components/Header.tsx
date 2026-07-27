import React, { useState } from 'react';
import { 
  BookOpen, 
  Feather, 
  ShieldCheck, 
  User, 
  LayoutDashboard, 
  Settings, 
  Compass, 
  Layers,
  Menu,
  X,
  LogIn,
  LogOut
} from 'lucide-react';
import { UserProfile } from '../data/satwaData';

interface HeaderProps {
  currentScreenId: string;
  onNavigateScreen: (screenId: string) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreenId,
  onNavigateScreen,
  user,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const screensList = [
    { id: 'SCREEN_13', name: '13. Beranda Satwalogi', badge: 'Public' },
    { id: 'SCREEN_10', name: '10. Detail Spesies (Taxonomy)', badge: 'Public' },
    { id: 'SCREEN_5', name: '5. Baca Artikel Scientific', badge: 'Journal' },
    { id: 'SCREEN_12', name: '12. Editor Artikel (Penulis)', badge: 'Author' },
    { id: 'SCREEN_14', name: '14. Verifikasi Admin (Moderasi)', badge: 'Admin' },
    { id: 'SCREEN_11', name: '11. Masuk & Daftar (Auth)', badge: 'Auth' },
    { id: 'SCREEN_8', name: '8. Dasbor Penulis', badge: 'Author' },
    { id: 'SCREEN_6', name: '6. Pengaturan Akun', badge: 'User' },
  ];

  const handleNavClick = (screenId: string) => {
    onNavigateScreen(screenId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f9faf6]/95 backdrop-blur-md border-b border-[#062e23]/10 transition-all shadow-sm">
      {/* Top Banner / Screen Quick Switcher Bar */}
      <div className="bg-[#062e23] text-[#e8ede6] text-xs py-1.5 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0 font-medium text-[#d4a373]">
            <Layers size={14} />
            <span className="hidden sm:inline">Botanical Intellect Switcher:</span>
            <span className="sm:hidden">Pilih Layar:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {screensList.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleNavClick(sc.id)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                  currentScreenId === sc.id
                    ? 'bg-[#d4a373] text-[#062e23] font-bold shadow-sm'
                    : 'bg-[#1a5948]/60 hover:bg-[#2d5a4c] text-[#e8ede6]'
                }`}
              >
                <span>{sc.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('SCREEN_13')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#062e23] text-[#d4a373] flex items-center justify-center font-serif text-xl sm:text-2xl font-bold shadow-md group-hover:scale-105 transition-transform border border-[#d4a373]/30 shrink-0">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#062e23]">
                Satwalogi
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#e8ede6] text-[#2d5a4c] border border-[#2d5a4c]/20">
                Scientific
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#2d5a4c] font-medium tracking-wide">
              Botanical Intellect & Fauna Journal
            </p>
          </div>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-[#062e23]/80">
          <button
            onClick={() => handleNavClick('SCREEN_13')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentScreenId === 'SCREEN_13'
                ? 'bg-[#062e23] text-[#f9faf6] font-semibold'
                : 'hover:bg-[#e8ede6] text-[#062e23]'
            }`}
          >
            <Compass size={16} />
            <span>Beranda</span>
          </button>

          <button
            onClick={() => handleNavClick('SCREEN_10')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentScreenId === 'SCREEN_10'
                ? 'bg-[#062e23] text-[#f9faf6] font-semibold'
                : 'hover:bg-[#e8ede6] text-[#062e23]'
            }`}
          >
            <BookOpen size={16} />
            <span>Katalog</span>
          </button>

          <button
            onClick={() => handleNavClick('SCREEN_5')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentScreenId === 'SCREEN_5'
                ? 'bg-[#062e23] text-[#f9faf6] font-semibold'
                : 'hover:bg-[#e8ede6] text-[#062e23]'
            }`}
          >
            <Feather size={16} />
            <span>Jurnal</span>
          </button>

          <button
            onClick={() => handleNavClick('SCREEN_12')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentScreenId === 'SCREEN_12'
                ? 'bg-[#062e23] text-[#f9faf6] font-semibold'
                : 'hover:bg-[#e8ede6] text-[#062e23]'
            }`}
          >
            <span>Tulis Artikel</span>
          </button>

          <button
            onClick={() => handleNavClick('SCREEN_14')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentScreenId === 'SCREEN_14'
                ? 'bg-[#062e23] text-[#f9faf6] font-semibold'
                : 'hover:bg-[#e8ede6] text-[#062e23]'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Verifikasi</span>
          </button>
        </nav>

        {/* User Account / Guest Auth State Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            /* Logged In User State */
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('SCREEN_8')}
                className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-[#062e23]/20 transition-all ${
                  currentScreenId === 'SCREEN_8'
                    ? 'bg-[#062e23] text-[#f9faf6]'
                    : 'bg-white hover:bg-[#e8ede6] text-[#062e23]'
                }`}
              >
                <LayoutDashboard size={15} />
                <span>Dasbor</span>
              </button>

              <button
                onClick={() => handleNavClick('SCREEN_6')}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-[#062e23]/20 bg-white hover:bg-[#e8ede6] transition-all shadow-sm"
                title="Pengaturan Akun"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#062e23]/30"
                />
                <span className="hidden lg:inline text-xs font-semibold text-[#062e23] pr-1">
                  {user.name.split(' ')[0]} ({user.role})
                </span>
                <Settings size={14} className="text-[#2d5a4c] hidden sm:inline" />
              </button>

              <button
                onClick={onLogout}
                className="p-2 rounded-full text-red-700 hover:bg-red-50 border border-red-200 transition-colors"
                title="Keluar (Logout)"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            /* Guest Unauthenticated State */
            <button
              onClick={() => handleNavClick('SCREEN_11')}
              className="bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <LogIn size={15} />
              <span>Masuk / Daftar</span>
            </button>
          )}

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#062e23] hover:bg-[#e8ede6] border border-[#062e23]/20 transition-colors"
            title="Buka Menu Navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f9faf6] border-b border-[#062e23]/10 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="text-[11px] font-bold text-[#2d5a4c] uppercase tracking-wider px-2 pt-2">
            Navigasi Utama
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('SCREEN_13')}
              className={`p-3 rounded-xl flex items-center gap-2 border ${
                currentScreenId === 'SCREEN_13' ? 'bg-[#062e23] text-white border-[#062e23]' : 'bg-white text-[#062e23] border-[#062e23]/10'
              }`}
            >
              <Compass size={16} /> Beranda
            </button>

            <button
              onClick={() => handleNavClick('SCREEN_10')}
              className={`p-3 rounded-xl flex items-center gap-2 border ${
                currentScreenId === 'SCREEN_10' ? 'bg-[#062e23] text-white border-[#062e23]' : 'bg-white text-[#062e23] border-[#062e23]/10'
              }`}
            >
              <BookOpen size={16} /> Katalog Satwa
            </button>

            <button
              onClick={() => handleNavClick('SCREEN_5')}
              className={`p-3 rounded-xl flex items-center gap-2 border ${
                currentScreenId === 'SCREEN_5' ? 'bg-[#062e23] text-white border-[#062e23]' : 'bg-white text-[#062e23] border-[#062e23]/10'
              }`}
            >
              <Feather size={16} /> Jurnal Ilmiah
            </button>

            <button
              onClick={() => handleNavClick('SCREEN_12')}
              className={`p-3 rounded-xl flex items-center gap-2 border ${
                currentScreenId === 'SCREEN_12' ? 'bg-[#062e23] text-white border-[#062e23]' : 'bg-white text-[#062e23] border-[#062e23]/10'
              }`}
            >
              Tulis Artikel
            </button>

            <button
              onClick={() => handleNavClick('SCREEN_14')}
              className={`p-3 rounded-xl flex items-center gap-2 border ${
                currentScreenId === 'SCREEN_14' ? 'bg-[#062e23] text-white border-[#062e23]' : 'bg-white text-[#062e23] border-[#062e23]/10'
              }`}
            >
              <ShieldCheck size={16} /> Verifikasi Admin
            </button>

            <button
              onClick={() => handleNavClick('SCREEN_11')}
              className={`p-3 rounded-xl flex items-center gap-2 border ${
                currentScreenId === 'SCREEN_11' ? 'bg-[#062e23] text-white border-[#062e23]' : 'bg-white text-[#062e23] border-[#062e23]/10'
              }`}
            >
              <User size={16} /> {user ? 'Profil Saya' : 'Masuk / Daftar'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
