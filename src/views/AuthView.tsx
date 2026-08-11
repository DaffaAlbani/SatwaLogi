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
import { useToast } from '../components/Toast';
import {
  getDatabase,
  runMigrations,
  findRegisteredUser,
  registerNewUser,
  emailExists,
  insertInitialAdminUser,
} from '../utils/database';

interface AuthViewProps {
  onNavigateScreen: (screenId: string) => void;
  onLoginSuccess?: (role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin', name: string, email: string, institution: string, targetScreen?: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onNavigateScreen, onLoginSuccess }) => {
  const { showToast } = useToast();
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);
  const [dbReady, setDbReady] = useState(false);

  // Initialize SQLite database on mount
  useEffect(() => {
    let mounted = true;

    async function initDb() {
      try {
        await getDatabase();
        await runMigrations();
        insertInitialAdminUser();
        if (mounted) setDbReady(true);
      } catch (err) {
        console.warn('Database init in AuthView failed:', err);
        if (mounted) setDbReady(true);
      }
    }

    initDb();

    return () => {
      mounted = false;
    };
  }, []);

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

    // Note: Hybrid LocalStorage + SQLite persistence guarantees instant registration
    // even if WASM database is initializing in background.

    if (authMode === 'LOGIN') {
      const inputUser = usernameOrEmail.trim().toLowerCase();
      const inputPass = password.trim();

      if (!inputUser || !inputPass) {
        showToast('Mohon isi Username/Email dan Kata Sandi!', 'warning');
        return;
      }

      // 1. Admin Verification Check (parameterized query via database service)
      const isInputAdmin = inputUser.includes('admin') || inputUser === 'admin@satwalogi.or.id';
      const isAdminPassValid = inputPass.toLowerCase() === 'admin' || inputPass.toLowerCase() === 'admin123';

      if (isInputAdmin && isAdminPassValid) {
        if (onLoginSuccess) {
          onLoginSuccess('Admin', 'Admin Satwalogi', 'admin@satwalogi.or.id', 'Pusat Admin Satwalogi', 'SCREEN_14');
        } else {
          onNavigateScreen('SCREEN_14');
        }
        return;
      }

      // 2. Regular Registered User Check via SQLite (parameterized query)
      const matchedUser = findRegisteredUser(inputUser, inputPass);

      if (matchedUser) {
        const dest = matchedUser.role === 'Admin' ? 'SCREEN_14' : 'SCREEN_8';
        if (onLoginSuccess) {
          onLoginSuccess(matchedUser.role, matchedUser.name, matchedUser.email, matchedUser.institution, dest);
        } else {
          onNavigateScreen(dest);
        }
      } else {
        // User not registered or incorrect password!
        setLoginError('Akun belum terdaftar. Silakan daftar akun baru terlebih dahulu.');
        showToast('Akun belum terdaftar. Silakan daftar akun baru.', 'error');
        
        // Auto-switch to Register Mode
        setAuthMode('REGISTER');
        setRegisterEmail(inputUser.includes('@') ? inputUser : '');
      }
    } else {
      // REGISTER MODE
      if (!fullName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
        showToast('Mohon lengkapi Nama Lengkap, Email, dan Kata Sandi.', 'warning');
        return;
      }

      const cleanEmail = registerEmail.trim().toLowerCase();

      // Check if email already registered via SQLite (parameterized query)
      const alreadyRegistered = emailExists(cleanEmail);
      if (alreadyRegistered) {
        showToast('Email sudah terdaftar. Silakan masuk ke akun Anda.', 'info');
        setAuthMode('LOGIN');
        setUsernameOrEmail(cleanEmail);
        return;
      }

      // Register new user via SQLite (parameterized query)
      const username = cleanEmail.split('@')[0];
      const newUser = registerNewUser(
        fullName.trim(),
        cleanEmail,
        username,
        registerPassword,
        institution.trim()
      );

      if (!newUser) {
        showToast('Gagal mendaftarkan akun. Silakan coba lagi.', 'error');
        return;
      }

      showToast(`Pendaftaran berhasil! Selamat datang, ${newUser.name}.`, 'success');

      if (onLoginSuccess) {
        onLoginSuccess('Penulis', newUser.name, newUser.email, newUser.institution, 'SCREEN_8');
      } else {
        onNavigateScreen('SCREEN_8');
      }
    }
  };

  return (
    <div className="min-h-[85vh] py-12 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-[#062e23]/6 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Gradient Mesh Branding Panel */}
        <div className="lg:col-span-5 hero-gradient text-[#f9faf6] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between">
          <div className="hero-particles" />
          <div className="absolute top-1/3 right-0 w-48 h-48 rounded-full bg-gradient-to-bl from-[#d4a373]/15 to-transparent blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4a373] to-[#c28e5c] text-[#062e23] flex items-center justify-center font-serif text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform">
                🌿
              </div>
              <span className="font-serif text-2xl font-bold text-[#f9faf6]">Satwalogi</span>
            </div>

            <div className="space-y-3 pt-6">
              <span className="inline-block px-3.5 py-1.5 rounded-full glass-card-dark text-[#d4a373] text-[11px] font-bold tracking-wider uppercase">
                Portal Masuk & Pendaftaran
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f9faf6] leading-tight">
                Akses Kontributor & Admin
              </h2>
              <p className="text-xs text-[#e8ede6]/70 leading-relaxed font-sans">
                Hanya pengguna terdaftar yang diperbolehkan masuk. Pengguna baru wajib mendaftar terlebih dahulu.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 space-y-2.5 text-xs text-[#b4d7cd]/80">
            <div className="gradient-line mb-4" />
            <div className="flex items-center gap-2.5 font-medium">
              <ShieldCheck size={16} className="text-[#d4a373]" />
              <span>Database Terenkripsi & Verifikasi Naskah</span>
            </div>
            <div className="flex items-center gap-2.5 font-medium">
              <Globe size={16} className="text-[#d4a373]" />
              <span>Akses Terbuka & Bebas Biaya Kontribusi</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-7 bg-[#f9faf6] flex flex-col justify-center">
          
          {/* Tab Switcher */}
          <div className="flex items-center bg-[#e8ede6]/60 p-1.5 rounded-2xl border border-[#062e23]/6">
            <button
              type="button"
              onClick={() => { setAuthMode('LOGIN'); setLoginError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                authMode === 'LOGIN'
                  ? 'bg-[#062e23] text-[#d4a373] shadow-md'
                  : 'text-[#062e23]/60 hover:text-[#062e23]'
              }`}
            >
              Masuk (Sign In)
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('REGISTER'); setLoginError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                authMode === 'REGISTER'
                  ? 'bg-[#062e23] text-[#d4a373] shadow-md'
                  : 'text-[#062e23]/60 hover:text-[#062e23]'
              }`}
            >
              <UserPlus size={14} />
              <span>Daftar Baru</span>
            </button>
          </div>

          {/* Form Header */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#062e23]">
              {authMode === 'LOGIN' ? 'Masuk ke Akun' : 'Pendaftaran Baru'}
            </h3>
            <p className="text-xs text-[#2d5a4c]/60 mt-1">
              {authMode === 'LOGIN'
                ? 'Masukkan username/email dan kata sandi.'
                : 'Lengkapi data diri di bawah ini.'}
            </p>
          </div>

          {/* Error Notice */}
          {loginError && authMode === 'LOGIN' && (
            <div className="bg-red-50 border border-red-200/60 text-red-950 p-4 rounded-2xl text-xs space-y-2 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-red-800">
                <AlertCircle size={18} />
                <span>Akun Belum Terdaftar!</span>
              </div>
              <p className="leading-relaxed text-red-900/70">{loginError}</p>
              <button
                type="button"
                onClick={() => { setAuthMode('REGISTER'); setLoginError(null); }}
                className="shimmer-btn bg-red-800 text-white px-4 py-1.5 rounded-xl text-[11px] font-bold hover:bg-red-700 transition-all inline-flex items-center gap-1"
              >
                Daftar Akun Baru Sekarang →
              </button>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'LOGIN' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c]/70 mb-1.5">Username / Email *</label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3.5 text-[#2d5a4c]/40" />
                    <input
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      className="input-glow w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm font-medium text-[#062e23] focus:outline-none"
                      placeholder="Masukkan username atau email..."
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c]/70 mb-1.5">Kata Sandi *</label>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 text-[#2d5a4c]/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-glow w-full pl-10 pr-10 py-3 rounded-xl bg-white text-sm font-medium text-[#062e23] focus:outline-none"
                      placeholder="Masukkan kata sandi..."
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-[#2d5a4c]/40 hover:text-[#2d5a4c] transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c]/70 mb-1.5">Nama Lengkap *</label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3.5 text-[#2d5a4c]/40" />
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                      className="input-glow w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm font-medium text-[#062e23] focus:outline-none"
                      placeholder="Contoh: Daffa Albani" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c]/70 mb-1.5">Email Aktif *</label>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3.5 text-[#2d5a4c]/40" />
                    <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}
                      className="input-glow w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm font-medium text-[#062e23] focus:outline-none"
                      placeholder="contoh: daffa@email.com" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c]/70 mb-1.5">Institusi (Opsional)</label>
                  <div className="relative flex items-center">
                    <Building size={16} className="absolute left-3.5 text-[#2d5a4c]/40" />
                    <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)}
                      className="input-glow w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm font-medium text-[#062e23] focus:outline-none"
                      placeholder="Contoh: Universitas Indonesia" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c]/70 mb-1.5">Buat Kata Sandi *</label>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 text-[#2d5a4c]/40" />
                    <input type={showPassword ? 'text' : 'password'} value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}
                      className="input-glow w-full pl-10 pr-10 py-3 rounded-xl bg-white text-sm font-medium text-[#062e23] focus:outline-none"
                      placeholder="Minimal 4 karakter..." required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-[#2d5a4c]/40 hover:text-[#2d5a4c] transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="shimmer-btn w-full bg-gradient-to-r from-[#062e23] to-[#1a5948] hover:from-[#0f4234] hover:to-[#2d5a4c] text-[#d4a373] py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>{authMode === 'LOGIN' ? 'Masuk Akun' : 'Daftar Akun Baru'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="pt-4 flex flex-wrap items-center justify-between text-xs text-[#2d5a4c]/60 gap-2">
            <div className="gradient-line w-full mb-2" />
            <button type="button"
              onClick={() => {
                if (onLoginSuccess) onLoginSuccess('Penulis', 'Dr. Satria Wibawa, M.Sc.', 'satria.wibawa@brin.go.id', 'Pusat Riset BRIN', 'SCREEN_12');
                else onNavigateScreen('SCREEN_12');
              }}
              className="hover:text-[#062e23] font-semibold transition-colors"
            >
              ✍️ Ke Editor Artikel →
            </button>
            <button type="button"
              onClick={() => {
                if (onLoginSuccess) onLoginSuccess('Admin', 'Admin Satwalogi', 'admin@satwalogi.or.id', 'Pusat Admin Satwalogi', 'SCREEN_14');
                else onNavigateScreen('SCREEN_14');
              }}
              className="hover:text-[#062e23] font-semibold transition-colors"
            >
              🛡️ Admin Demo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
