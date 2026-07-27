import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Tag, 
  Save, 
  LogIn,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../data/satwaData';

interface AccountSettingsViewProps {
  user: UserProfile | null;
  onNavigateScreen: (screenId: string) => void;
}

export const AccountSettingsView: React.FC<AccountSettingsViewProps> = ({ user, onNavigateScreen }) => {
  const [activeSubTab, setActiveSubTab] = useState<'PROFIL' | 'MINAT' | 'KEAMANAN' | 'NOTIFIKASI'>('PROFIL');
  const [name, setName] = useState(user ? user.name : 'Ahmad Fauzi, S.Si.');
  const [title, setTitle] = useState(user ? user.title : 'Peneliti Terkait Satwa');
  const [institution, setInstitution] = useState(user ? user.institution : 'Universitas Indonesia');
  const [bio, setBio] = useState(user ? user.bio : 'Peneliti biosistemasi dan konservasi megafauna Indonesia.');
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user ? user.scientificInterests : ['Ornitologi', 'Mamalogi']);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifyPeerReview, setNotifyPeerReview] = useState(true);
  const [notifyJournalPublish, setNotifyJournalPublish] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableTags = [
    'Ornitologi',
    'Konservasi Genetik',
    'Bioakustik',
    'Mamalogi',
    'Herpetologi Indonesia',
    'GIS & Pemetaan Habitat',
    'Biologi Kelautan',
    'Primatologi Tropis',
    'Eksplorasi Taksonomi',
    'Restorasi Lanskap Hutan'
  ];

  const toggleInterest = (tag: string) => {
    if (selectedInterests.includes(tag)) {
      setSelectedInterests(selectedInterests.filter((t) => t !== tag));
    } else {
      setSelectedInterests([...selectedInterests, tag]);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-[#062e23]/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
            <Settings size={16} />
            <span>Manajemen Profil Akademis & Preferensi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] mt-1">
            Pengaturan Akun Pengguna
          </h1>
        </div>

        {/* Guest alert if not logged in */}
        {!user && (
          <div className="bg-[#062e23] text-[#e8ede6] p-6 rounded-3xl border border-[#d4a373]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-[#d4a373]">Anda Belum Masuk Akun</h3>
              <p className="text-xs text-[#b4d7cd]">Masuk sebagai User Biasa atau Admin untuk menyimpan profil dan minat saintifik secara permanen.</p>
            </div>
            <button
              onClick={() => onNavigateScreen('SCREEN_11')}
              className="bg-[#d4a373] text-[#062e23] px-5 py-2 rounded-xl text-xs font-bold hover:bg-white transition-colors flex items-center gap-2 shrink-0"
            >
              <LogIn size={15} />
              <span>Masuk / Daftar Portal</span>
            </button>
          </div>
        )}

        {/* Success Banner */}
        {savedSuccess && (
          <div className="bg-emerald-900 text-[#f9faf6] p-4 rounded-2xl border border-emerald-700 flex items-center gap-3 text-xs font-semibold shadow-md">
            <CheckCircle2 size={18} className="text-[#d4a373]" />
            <span>Pengaturan profil dan minat saintifik Anda telah diperbarui!</span>
          </div>
        )}

        {/* Layout: Sub-Tab Sidebar (Left 3 cols) vs Content (Right 9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sub-Tab Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-2 sm:p-3 border border-[#062e23]/10 shadow-sm flex flex-row overflow-x-auto lg:flex-col lg:overflow-visible gap-1.5 no-scrollbar">
              <button
                onClick={() => setActiveSubTab('PROFIL')}
                className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${
                  activeSubTab === 'PROFIL'
                    ? 'bg-[#062e23] text-[#f9faf6]'
                    : 'text-[#062e23] hover:bg-[#e8ede6]'
                }`}
              >
                <User size={15} />
                <span>Profil & Bio</span>
              </button>

              <button
                onClick={() => setActiveSubTab('MINAT')}
                className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${
                  activeSubTab === 'MINAT'
                    ? 'bg-[#062e23] text-[#f9faf6]'
                    : 'text-[#062e23] hover:bg-[#e8ede6]'
                }`}
              >
                <Tag size={15} />
                <span>Minat Riset</span>
              </button>

              <button
                onClick={() => setActiveSubTab('KEAMANAN')}
                className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${
                  activeSubTab === 'KEAMANAN'
                    ? 'bg-[#062e23] text-[#f9faf6]'
                    : 'text-[#062e23] hover:bg-[#e8ede6]'
                }`}
              >
                <Shield size={15} />
                <span>Keamanan & 2FA</span>
              </button>

              <button
                onClick={() => setActiveSubTab('NOTIFIKASI')}
                className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${
                  activeSubTab === 'NOTIFIKASI'
                    ? 'bg-[#062e23] text-[#f9faf6]'
                    : 'text-[#062e23] hover:bg-[#e8ede6]'
                }`}
              >
                <Bell size={15} />
                <span>Notifikasi</span>
              </button>
            </div>
          </div>

          {/* Sub-Tab Workspace Content */}
          <div className="lg:col-span-9">
            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-6">
              {activeSubTab === 'PROFIL' && (
                <div className="space-y-6">
                  <h3 className="font-serif text-lg font-bold text-[#062e23] border-b border-[#062e23]/10 pb-3">
                    Profil Akademis & Bio Peneliti
                  </h3>

                  {/* Avatar Upload Preview */}
                  <div className="flex items-center gap-6">
                    <img
                      src={user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt="Avatar"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#062e23]/20"
                    />
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => alert('Simulasi unggah foto avatar peneliti baru.')}
                        className="px-4 py-2 rounded-xl bg-[#e8ede6] hover:bg-[#062e23] text-[#062e23] hover:text-[#f9faf6] text-xs font-bold transition-colors"
                      >
                        Ubah Foto Avatar
                      </button>
                      <p className="text-[11px] text-[#062e23]/60">Format JPG, PNG (Maksimal 2 MB)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-semibold text-[#062e23] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Jabatan Fungsional Peneliti</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-semibold text-[#062e23] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Institusi / Universitas Utama</label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-semibold text-[#062e23] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Biografi Singkat Peneliti</label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs text-[#062e23] focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {activeSubTab === 'MINAT' && (
                <div className="space-y-6">
                  <div className="border-b border-[#062e23]/10 pb-3">
                    <h3 className="font-serif text-lg font-bold text-[#062e23]">
                      Minat Saintifik & Kepakaran Taksonomi
                    </h3>
                    <p className="text-xs text-[#2d5a4c] mt-0.5">
                      Pilih bidang kepakaran Anda untuk menerima rekomendasi naskah peer-review dan riset terkini.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => {
                      const isSelected = selectedInterests.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleInterest(tag)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            isSelected
                              ? 'bg-[#062e23] text-[#d4a373] border-[#d4a373] shadow-sm'
                              : 'bg-[#f9faf6] text-[#062e23] border-[#062e23]/10 hover:bg-[#e8ede6]'
                          }`}
                        >
                          {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeSubTab === 'KEAMANAN' && (
                <div className="space-y-6">
                  <h3 className="font-serif text-lg font-bold text-[#062e23] border-b border-[#062e23]/10 pb-3">
                    Keamanan Akun & Autentikasi 2FA
                  </h3>

                  <div className="p-4 rounded-xl bg-[#e8ede6] border border-[#062e23]/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#062e23]">Autentikasi Dua Faktor (2FA)</div>
                      <div className="text-[11px] text-[#2d5a4c]">Proteksi akun menggunakan Google Authenticator / SMS</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                      className="w-5 h-5 accent-[#062e23]"
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Kata Sandi Saat Ini</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Kata Sandi Baru</label>
                      <input
                        type="password"
                        placeholder="Minimal 8 karakter..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'NOTIFIKASI' && (
                <div className="space-y-6">
                  <h3 className="font-serif text-lg font-bold text-[#062e23] border-b border-[#062e23]/10 pb-3">
                    Preferensi Alert & Email Jurnal
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 cursor-pointer">
                      <div>
                        <div className="font-bold text-xs text-[#062e23]">Update Status Peer-Review</div>
                        <div className="text-[11px] text-[#2d5a4c]">Notifikasi saat naskah Anda disetujui / diminta revisi</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifyPeerReview}
                        onChange={(e) => setNotifyPeerReview(e.target.checked)}
                        className="w-5 h-5 accent-[#062e23]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 cursor-pointer">
                      <div>
                        <div className="font-bold text-xs text-[#062e23]">Rilis Jurnal Spesies Baru</div>
                        <div className="text-[11px] text-[#2d5a4c]">Email bulanan rangkuman artikel terpopuler</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifyJournalPublish}
                        onChange={(e) => setNotifyJournalPublish(e.target.checked)}
                        className="w-5 h-5 accent-[#062e23]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-4 border-t border-[#062e23]/10 flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] px-6 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md"
                >
                  <Save size={16} />
                  <span>Simpan Perubahan Pengaturan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
