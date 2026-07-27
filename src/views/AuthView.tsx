import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck,
  Globe,
  CheckCircle2
} from 'lucide-react';

interface AuthViewProps {
  onNavigateScreen: (screenId: string) => void;
  onLoginSuccess?: (role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin', name: string, email: string, institution: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onNavigateScreen, onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [role, setRole] = useState<'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin'>('Penulis');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('kontributor.biasa@satwalogi.or.id');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Budi Pratama, S.Si.');
  const [institution, setInstitution] = useState('Universitas Indonesia');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(role, fullName, email, institution);
    }
    alert(`Berhasil Masuk sebagai "${fullName}" (${role}) dari ${institution}! Anda sekarang dapat menulis artikel di Editor [SCREEN_12] atau mengelola status di Dasbor [SCREEN_8].`);
    onNavigateScreen('SCREEN_8');
  };

  return (
    <div className="min-h-[85vh] py-12 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* SCREEN_11 Identifier Watermark Badge */}
      <div className="fixed top-20 right-4 bg-[#062e23] text-[#d4a373] text-[10px] font-mono py-1 px-3 rounded-full border border-[#d4a373]/30 z-30 shadow-md">
        [SCREEN_11] Auth Portal User & Admin
      </div>

      <div className="max-w-5xl w-full bg-white rounded-3xl border border-[#062e23]/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Immersive Nature Visual Backdrop (5 cols) */}
        <div className="lg:col-span-5 bg-[#062e23] text-[#f9faf6] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#2d5a4c]/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-[#d4a373]/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4a373] text-[#062e23] flex items-center justify-center font-serif text-2xl font-bold">
                🌿
              </div>
              <span className="font-serif text-2xl font-bold text-[#f9faf6]">Satwalogi</span>
            </div>

            <div className="space-y-3 pt-6">
              <span className="px-3 py-1 rounded-full bg-[#1a5948] text-[#d4a373] text-[11px] font-bold tracking-wider uppercase">
                Portal Masuk User & Admin
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f9faf6] leading-tight">
                Login User Biasa & Pengiriman Naskah Artikel
              </h2>
              <p className="text-xs text-[#e8ede6]/80 leading-relaxed font-sans">
                Masuk sebagai <strong>Penulis User Biasa</strong> untuk menulis artikel baru dan mengirim ke dewan redaksi, atau masuk sebagai <strong>Admin</strong> untuk memverifikasi naskah.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-[#1a5948] space-y-2 text-xs text-[#b4d7cd]">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck size={16} className="text-[#d4a373]" />
              <span>Verifikasi Berjenjang (User Biasa → Moderasi Admin)</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Globe size={16} className="text-[#d4a373]" />
              <span>Penerbitan Terbuka ke Katalog Jurnal Live</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Form Container (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 bg-[#f9faf6] flex flex-col justify-center">
          {/* Tab Switcher: Masuk vs Daftar */}
          <div className="flex items-center bg-[#e8ede6] p-1.5 rounded-2xl border border-[#062e23]/10">
            <button
              onClick={() => setAuthMode('LOGIN')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                authMode === 'LOGIN'
                  ? 'bg-[#062e23] text-[#f9faf6] shadow-md'
                  : 'text-[#062e23] hover:text-[#2d5a4c]'
              }`}
            >
              Masuk Akun (Sign In)
            </button>
            <button
              onClick={() => setAuthMode('REGISTER')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                authMode === 'REGISTER'
                  ? 'bg-[#062e23] text-[#f9faf6] shadow-md'
                  : 'text-[#062e23] hover:text-[#2d5a4c]'
              }`}
            >
              Daftar Baru (Register)
            </button>
          </div>

          {/* Form Header */}
          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-bold text-[#062e23]">
              {authMode === 'LOGIN' ? 'Portal Masuk Pengguna' : 'Pendaftaran Kontributor Baru'}
            </h3>
            <p className="text-xs text-[#2d5a4c]">
              Pilih peran Anda (User Biasa/Penulis/Admin) untuk memulai alur penulisan dan verifikasi.
            </p>
          </div>

          {/* Role Selector Buttons */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2d5a4c]">
              Pilih Peran Pengguna (Role Login):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Penulis', 'Pembaca', 'Peneliti', 'Admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    role === r
                      ? 'bg-[#062e23] text-[#d4a373] border-[#d4a373] shadow-sm'
                      : 'bg-white text-[#062e23] border-[#062e23]/10 hover:bg-[#e8ede6]'
                  }`}
                >
                  {r === 'Penulis' ? 'User Biasa (Penulis)' : r}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Nama Lengkap Pengguna *</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3 text-[#2d5a4c]" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                  placeholder="Budi Pratama, S.Si."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Institusi / Afiliasi User *</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                placeholder="Universitas Indonesia / Umum"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Email Pengguna *</label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3 text-[#2d5a4c]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                  placeholder="budi@universitas.ac.id"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Kata Sandi *</label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3 text-[#2d5a4c]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#2d5a4c]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#062e23] hover:bg-[#1a5948] text-[#f9faf6] py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md pt-3"
            >
              <span>Masuk Sebagai {role === 'Penulis' ? 'User Biasa (Penulis)' : role}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="pt-4 border-t border-[#062e23]/10 flex flex-wrap items-center justify-between text-xs text-[#2d5a4c]">
            <button onClick={() => onNavigateScreen('SCREEN_12')} className="hover:underline font-semibold">
              Ke Editor Penulisan Artikel [SCREEN_12] →
            </button>
            <button onClick={() => onNavigateScreen('SCREEN_14')} className="hover:underline font-semibold">
              Ke Verifikasi Admin [SCREEN_14] →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
