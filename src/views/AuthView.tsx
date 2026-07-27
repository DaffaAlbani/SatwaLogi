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
  KeyRound,
  Building
} from 'lucide-react';

interface AuthViewProps {
  onNavigateScreen: (screenId: string) => void;
  onLoginSuccess?: (role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin', name: string, email: string, institution: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onNavigateScreen, onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration fields
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'LOGIN') {
      const inputUser = usernameOrEmail.trim().toLowerCase();
      const inputPass = password.trim().toLowerCase();

      // Flexible admin check: Any input containing 'admin' or password 'admin' / 'admin123'
      const isAdmin = 
        inputUser.includes('admin') || 
        inputPass === 'admin' || 
        inputPass === 'admin123';

      if (isAdmin) {
        if (onLoginSuccess) {
          onLoginSuccess('Admin', 'Admin Satwalogi', 'admin@satwalogi.or.id', 'Pusat Admin Satwalogi');
        }
        alert('🔑 Berhasil Masuk sebagai ADMIN SATWALOGI! Anda dapat memverifikasi dan menerbitkan naskah user.');
        onNavigateScreen('SCREEN_14');
      } else {
        // Regular User Login
        const loginName = usernameOrEmail.split('@')[0] || 'User Satwalogi';
        if (onLoginSuccess) {
          onLoginSuccess('Penulis', loginName, usernameOrEmail, 'Umum / Akademisi');
        }
        alert(`🎉 Berhasil Masuk sebagai User Biasa ("${loginName}")! Anda sekarang dapat menulis artikel baru.`);
        onNavigateScreen('SCREEN_8');
      }
    } else {
      // REGISTER MODE (Always registers as Regular User)
      if (!fullName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
        alert('Mohon lengkapi seluruh formulir pendaftaran!');
        return;
      }

      if (onLoginSuccess) {
        onLoginSuccess('Penulis', fullName, registerEmail, institution || 'Umum');
      }
      alert(`🎉 Pendaftaran Akun Berhasil! Anda telah terdaftar dan masuk sebagai User Biasa ("${fullName}").`);
      onNavigateScreen('SCREEN_8');
    }
  };

  return (
    <div className="min-h-[85vh] py-12 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-[#062e23]/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Visual Branding Banner (5 cols) */}
        <div className="lg:col-span-5 bg-[#062e23] text-[#f9faf6] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#2d5a4c]/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-[#d4a373]/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4a373] text-[#062e23] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                🌿
              </div>
              <span className="font-serif text-2xl font-bold text-[#f9faf6]">Satwalogi</span>
            </div>

            <div className="space-y-3 pt-6">
              <span className="px-3 py-1 rounded-full bg-[#1a5948] text-[#d4a373] text-[11px] font-bold tracking-wider uppercase">
                Portal Masuk & Pendaftaran
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f9faf6] leading-tight">
                Akses Kontributor & Admin Satwalogi
              </h2>
              <p className="text-xs text-[#e8ede6]/80 leading-relaxed font-sans">
                Masuk ke akun Anda untuk menulis artikel berita satwa, mengelola dasbor naskah, atau masuk sebagai Admin Satwalogi.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-[#1a5948] space-y-2 text-xs text-[#b4d7cd]">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck size={16} className="text-[#d4a373]" />
              <span>Penerbitan Terverifikasi Admin Satwalogi</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Globe size={16} className="text-[#d4a373]" />
              <span>Akses Terbuka & Bebas Biaya Kontribusi</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Form Container (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 bg-[#f9faf6] flex flex-col justify-center">
          
          {/* Tab Switcher: Masuk vs Daftar */}
          <div className="flex items-center bg-[#e8ede6] p-1.5 rounded-2xl border border-[#062e23]/10">
            <button
              type="button"
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
              type="button"
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
              {authMode === 'LOGIN' ? 'Masuk ke Akun Anda' : 'Pendaftaran Akun Baru'}
            </h3>
            <p className="text-xs text-[#2d5a4c]">
              {authMode === 'LOGIN'
                ? 'Masukkan username/email dan kata sandi Anda.'
                : 'Lengkapi data diri di bawah ini untuk mendaftar akun kontributor.'}
            </p>
          </div>

          {/* Auth Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* LOGIN MODE FIELDS */}
            {authMode === 'LOGIN' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Username / Email *</label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="Masukkan username atau email Anda..."
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
                      placeholder="Masukkan kata sandi..."
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

                {/* Dedicated Admin Credentials Quick Hint */}
                <div className="bg-[#e8ede6] p-3.5 rounded-xl border border-[#062e23]/15 text-xs text-[#062e23] space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-[#2d5a4c]">
                    <KeyRound size={14} className="text-[#d4a373]" />
                    <span>Akses Khusus Admin Satwalogi:</span>
                  </div>
                  <div className="font-mono text-[11px] opacity-90 pl-5">
                    Username: <strong className="text-[#062e23]">admin</strong> | Password: <strong className="text-[#062e23]">admin123</strong>
                  </div>
                </div>
              </>
            ) : (
              /* REGISTER MODE FIELDS */
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Nama Lengkap *</label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="Masukkan nama lengkap Anda..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Email *</label>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="contoh: nama@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Institusi / Afiliasi (Opsional)</label>
                  <div className="relative flex items-center">
                    <Building size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="Contoh: Universitas Indonesia / Umum"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Buat Kata Sandi *</label>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="Minimal 6 karakter..."
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
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#062e23] hover:bg-[#1a5948] text-[#f9faf6] py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md pt-3"
            >
              <span>{authMode === 'LOGIN' ? 'Masuk Akun' : 'Daftar Akun Baru'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="pt-4 border-t border-[#062e23]/10 flex flex-wrap items-center justify-between text-xs text-[#2d5a4c]">
            <button onClick={() => onNavigateScreen('SCREEN_12')} className="hover:underline font-semibold">
              Ke Editor Penulisan Artikel →
            </button>
            <button onClick={() => onNavigateScreen('SCREEN_14')} className="hover:underline font-semibold">
              Ke Verifikasi Admin →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
