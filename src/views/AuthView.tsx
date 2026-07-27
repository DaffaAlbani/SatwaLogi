import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck,
  Globe,
  Building,
  UserPlus,
  AlertCircle
} from 'lucide-react';
import { INITIAL_USERS_DATABASE, RegisteredUser } from '../data/satwaData';

interface AuthViewProps {
  onNavigateScreen: (screenId: string) => void;
  onLoginSuccess?: (role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin', name: string, email: string, institution: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onNavigateScreen, onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);

  // Registered Users Database state (Persisted in localStorage)
  const [userDb, setUserDb] = useState<RegisteredUser[]>(() => {
    try {
      const saved = localStorage.getItem('satwalogi_users_db');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error(err);
    }
    return INITIAL_USERS_DATABASE;
  });

  // Save to localStorage whenever userDb updates
  useEffect(() => {
    try {
      localStorage.setItem('satwalogi_users_db', JSON.stringify(userDb));
    } catch (err) {
      console.error(err);
    }
  }, [userDb]);

  // Login form fields
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form fields
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (authMode === 'LOGIN') {
      const inputUser = usernameOrEmail.trim().toLowerCase();
      const inputPass = password.trim();

      if (!inputUser || !inputPass) {
        alert('Mohon isi Username/Email dan Kata Sandi!');
        return;
      }

      // 1. Admin Verification Check
      const isInputAdmin = inputUser.includes('admin') || inputUser === 'admin@satwalogi.or.id';
      const isAdminPassValid = inputPass.toLowerCase() === 'admin' || inputPass.toLowerCase() === 'admin123';

      if (isInputAdmin && isAdminPassValid) {
        if (onLoginSuccess) {
          onLoginSuccess('Admin', 'Admin Satwalogi', 'admin@satwalogi.or.id', 'Pusat Admin Satwalogi');
        }
        alert('🔑 Berhasil Masuk sebagai ADMIN SATWALOGI! Anda dapat memverifikasi dan menerbitkan naskah user di menu Verifikasi Admin.');
        onNavigateScreen('SCREEN_14');
        return;
      }

      // 2. Regular Registered User Check in Database
      const matchedUser = userDb.find((u) => {
        const emailMatch = u.email.toLowerCase() === inputUser;
        const usernameMatch = u.username.toLowerCase() === inputUser;
        return (emailMatch || usernameMatch) && u.password === inputPass;
      });

      if (matchedUser) {
        if (onLoginSuccess) {
          onLoginSuccess(matchedUser.role, matchedUser.name, matchedUser.email, matchedUser.institution);
        }
        alert(`🎉 Selamat Datang Kembali, ${matchedUser.name}! Anda berhasil masuk.`);
        onNavigateScreen('SCREEN_8');
      } else {
        // User not registered or incorrect password!
        const notRegisteredMessage = `❌ AKUN BELUM TERDAFTAR ATAU KATA SANDI SALAH!\n\nEmail/Username "${usernameOrEmail}" belum terdaftar di database Satwalogi. Pengguna yang belum terdaftar TIDAK DIPERBOLEHKAN MASUK.\n\nSilakan klik OK untuk berpindah ke formulir "Daftar Baru (Register)" terlebih dahulu.`;
        
        setLoginError(`Email/Username "${usernameOrEmail}" belum terdaftar di sistem database. Silakan daftar akun baru terlebih dahulu.`);
        alert(notRegisteredMessage);
        
        // Auto-switch to Register Mode
        setAuthMode('REGISTER');
        setRegisterEmail(inputUser.includes('@') ? inputUser : '');
      }
    } else {
      // REGISTER MODE
      if (!fullName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
        alert('Mohon lengkapi Nama Lengkap, Email, dan Kata Sandi!');
        return;
      }

      const cleanEmail = registerEmail.trim().toLowerCase();

      // Check if email already registered in database
      const alreadyRegistered = userDb.some((u) => u.email.toLowerCase() === cleanEmail);
      if (alreadyRegistered) {
        alert(`⚠️ Email "${registerEmail}" sudah terdaftar sebelumnya! Silakan pindah ke tab "Masuk Akun" untuk login.`);
        setAuthMode('LOGIN');
        setUsernameOrEmail(cleanEmail);
        return;
      }

      // Register new user into database
      const newUser: RegisteredUser = {
        id: `usr-${Date.now()}`,
        name: fullName.trim(),
        email: cleanEmail,
        username: cleanEmail.split('@')[0],
        password: registerPassword,
        institution: institution.trim() || 'Umum',
        role: 'Penulis'
      };

      const updatedDb = [...userDb, newUser];
      setUserDb(updatedDb);

      if (onLoginSuccess) {
        onLoginSuccess('Penulis', newUser.name, newUser.email, newUser.institution);
      }

      alert(`🎉 PENDAFTARAN BERHASIL!\n\nAkun atas nama "${newUser.name}" telah tersimpan secara resmi di database Satwalogi.\n\nAnda sekarang telah masuk dan dapat langsung menulis artikel baru!`);
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
                Portal Masuk & Pendaftaran Resmikan
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f9faf6] leading-tight">
                Akses Kontributor & Admin Satwalogi
              </h2>
              <p className="text-xs text-[#e8ede6]/80 leading-relaxed font-sans">
                Hanya pengguna yang terdaftar di database yang diperbolehkan masuk. Pengguna baru diwajibkan melakukan pendaftaran akun terlebih dahulu.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-[#1a5948] space-y-2 text-xs text-[#b4d7cd]">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck size={16} className="text-[#d4a373]" />
              <span>Database Terenkripsi & Verifikasi Naskah</span>
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
              onClick={() => {
                setAuthMode('LOGIN');
                setLoginError(null);
              }}
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
              onClick={() => {
                setAuthMode('REGISTER');
                setLoginError(null);
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'REGISTER'
                  ? 'bg-[#062e23] text-[#f9faf6] shadow-md'
                  : 'text-[#062e23] hover:text-[#2d5a4c]'
              }`}
            >
              <UserPlus size={14} />
              <span>Daftar Baru (Register)</span>
            </button>
          </div>

          {/* Form Header */}
          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-bold text-[#062e23]">
              {authMode === 'LOGIN' ? 'Masuk ke Akun Terdaftar' : 'Pendaftaran Akun Baru'}
            </h3>
            <p className="text-xs text-[#2d5a4c]">
              {authMode === 'LOGIN'
                ? 'Masukkan username/email dan kata sandi yang sudah terdaftar.'
                : 'Pengguna baru wajib mendaftar data diri di bawah ini terlebih dahulu.'}
            </p>
          </div>

          {/* Error Notice if unregistered user attempts login */}
          {loginError && authMode === 'LOGIN' && (
            <div className="bg-red-50 border border-red-200 text-red-950 p-4 rounded-2xl text-xs space-y-2 animate-fadeIn shadow-sm">
              <div className="flex items-center gap-2 font-bold text-red-800">
                <AlertCircle size={18} />
                <span>Akun Belum Terdaftar di Database!</span>
              </div>
              <p className="leading-relaxed">{loginError}</p>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('REGISTER');
                  setLoginError(null);
                }}
                className="bg-red-800 text-white px-3.5 py-1.5 rounded-xl text-[11px] font-bold hover:bg-red-700 transition-colors inline-flex items-center gap-1"
              >
                <span>Klik Di Sini Untuk Daftar Akun Baru Sekarang →</span>
              </button>
            </div>
          )}

          {/* Auth Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* LOGIN MODE FIELDS */}
            {authMode === 'LOGIN' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Username / Email Terdaftar *</label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="Masukkan username atau email terdaftar..."
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
              </>
            ) : (
              /* REGISTER MODE FIELDS */
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Nama Lengkap Pengguna *</label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="Contoh: Daffa Albani"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Email Aktif *</label>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-white text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                      placeholder="contoh: daffa@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Institusi / Universitas (Opsional)</label>
                  <div className="relative flex items-center">
                    <Building size={16} className="absolute left-3 text-[#2d5a4c]" />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#ffffff] text-xs font-semibold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
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
                      placeholder="Buat kata sandi minimal 4 karakter..."
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
              <span>{authMode === 'LOGIN' ? 'Masuk Akun Terdaftar' : 'Simpan & Daftar Akun Baru'}</span>
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
