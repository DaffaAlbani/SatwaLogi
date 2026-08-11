import React, { useState } from 'react';
import { 
  Send, 
  Eye, 
  FileText, 
  Tag, 
  Bold, 
  Italic, 
  Link, 
  Image as ImageIcon, 
  List, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  LogIn,
  Upload
} from 'lucide-react';
import { SPECIES_DATA, AdminVerificationItem, UserProfile } from '../data/satwaData';
import { useToast } from '../components/Toast';

interface ArticleEditorViewProps {
  currentUser: UserProfile | null;
  onNavigateScreen: (screenId: string) => void;
  onSubmitArticle: (newItem: AdminVerificationItem) => void;
}

const PRESET_ARTICLE_IMAGES = [
  { name: 'Orangutan Tapanuli', url: 'https://images.unsplash.com/photo-1540573133985-7585677a3281?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Harimau Sumatra', url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Jalak Bali', url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Komodo', url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Penyu Hijau', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Hutan Tropis', url: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1000&q=80' }
];

export const ArticleEditorView: React.FC<ArticleEditorViewProps> = ({ 
  currentUser, 
  onNavigateScreen, 
  onSubmitArticle 
}) => {
  const { showToast } = useToast();
  const [guestName, setGuestName] = useState('');
  const [guestInstitution, setGuestInstitution] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Konservasi Genetik & Bioakustik');
  const [selectedSpecies, setSelectedSpecies] = useState('Pongo tapanuliensis');
  const [abstractIndo, setAbstractIndo] = useState('');
  const [articleBody, setArticleBody] = useState('');

  // Article Cover Photo (like media online)
  const [coverImage, setCoverImage] = useState(PRESET_ARTICLE_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');

  const [activeTab, setActiveTab] = useState<'WRITE' | 'PREVIEW'>('WRITE');
  const [submittedItem, setSubmittedItem] = useState<AdminVerificationItem | null>(null);

  const authorName = currentUser ? currentUser.name : guestName || 'Penulis Satwalogi';
  const authorInst = currentUser ? currentUser.institution : guestInstitution || 'Umum';

  const handleToolbarInsert = (syntax: string) => {
    setArticleBody((prev) => prev + `\n${syntax}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPeerReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Mohon isi Judul Artikel Ilmiah!', 'warning');
      return;
    }
    if (!authorName.trim()) {
      showToast('Mohon isi Nama Lengkap Penulis!', 'warning');
      return;
    }

    const newId = `ver-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: AdminVerificationItem = {
      id: newId,
      articleTitle: title,
      authorName: authorName,
      authorEmail: currentUser ? currentUser.email : '',
      authorInstitution: authorInst,
      category: category,
      submittedDate: 'Hari ini',
      status: 'PENDING',
      plagiarismScore: Number((Math.random() * 2.5 + 0.5).toFixed(1)),
      taxonomyAccuracyScore: Math.floor(Math.random() * 5 + 95),
      citationsVerified: true,
      abstractText: abstractIndo || 'Tidak ada abstrak yang dilampirkan.',
      previewSnippet: articleBody.substring(0, 180) + '...',
      fullBody: articleBody,
      speciesTag: selectedSpecies,
      coverImage: coverImage,
      tags: [category, selectedSpecies, 'Naskah User Baru']
    };

    onSubmitArticle(newItem);
    setSubmittedItem(newItem);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Status Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#062e23]/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
              <FileText size={16} />
              <span>Submission Naskah Karya Pengguna</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#062e23] mt-1">
              Editor Penulisan Artikel Ilmiah
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="bg-[#e8ede6] px-3.5 py-2 rounded-xl text-xs font-bold text-[#062e23] flex items-center gap-2 border border-[#062e23]/10">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-5 h-5 rounded-full object-cover" />
                <span>Status: {currentUser.name} ({currentUser.role})</span>
              </div>
            ) : (
              <button
                onClick={() => onNavigateScreen('SCREEN_11')}
                className="bg-[#062e23] text-[#d4a373] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <LogIn size={15} />
                <span>Masuk Akun Pengguna</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab(activeTab === 'WRITE' ? 'PREVIEW' : 'WRITE')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'PREVIEW'
                  ? 'bg-[#d4a373] text-[#062e23]'
                  : 'bg-[#e8ede6] text-[#062e23] hover:bg-[#062e23]/10'
              }`}
            >
              <Eye size={15} />
              <span>{activeTab === 'WRITE' ? 'Preview Jurnal' : 'Edit Naskah'}</span>
            </button>
          </div>
        </div>

        {/* Unauthenticated Guest Notice */}
        {!currentUser && (
          <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-[#062e23]/10">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-[#d4a373] shrink-0" />
              <span>Anda belum login. Anda dapat langsung menulis sebagai <strong>Penulis Tamu</strong> atau <strong>Masuk Portal Login</strong>.</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateScreen('SCREEN_11')}
              className="bg-[#062e23] text-[#d4a373] px-4 py-2 rounded-xl font-bold shrink-0 hover:bg-[#1a5948] transition-colors shadow-sm"
            >
              Portal Login User / Admin
            </button>
          </div>
        )}

        {/* Success Alert Banner if Submitted */}
        {submittedItem && (
          <div className="hero-gradient text-[#f9faf6] p-6 sm:p-8 rounded-3xl border border-[#d4a373]/30 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="hero-particles" />
            <div className="flex items-center gap-2.5 text-[#d4a373] font-bold text-base relative z-10">
              <CheckCircle2 size={24} />
              <span>Naskah Berhasil Dikirim ke Antrean Moderasi Admin (ID: {submittedItem.id})!</span>
            </div>
            <p className="text-xs sm:text-sm text-[#e8ede6]/90 leading-relaxed font-sans relative z-10">
              Artikel karya <strong>{authorName}</strong> berjudul <em>"{submittedItem.articleTitle}"</em> telah masuk ke antrean verifikasi dengan status <span className="text-[#d4a373] font-bold">"PENDING"</span>. Admin sekarang dapat meninjau, menyetujui, atau meminta revisi di panel Admin Verifikasi.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 relative z-10">
              <button
                onClick={() => onNavigateScreen('SCREEN_14')}
                className="shimmer-btn bg-gradient-to-r from-[#d4a373] to-[#e8c9a4] text-[#062e23] px-5 py-2.5 rounded-xl text-xs font-bold hover:scale-[1.02] transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Periksa sebagai Admin di Verifikasi</span>
              </button>
              <button
                onClick={() => onNavigateScreen('SCREEN_8')}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/20"
              >
                <span>Lihat Status di Dasbor Penulis</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Form Layout */}
        <form onSubmit={handleSubmitPeerReview} className="space-y-8">
          {/* Guest Author Profile Details if Not Logged In */}
          {!currentUser && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-[#062e23] border-b border-[#062e23]/10 pb-2">
                Identitas Penulis Artikel
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Nama Lengkap Penulis *</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-semibold text-[#062e23]"
                    placeholder="Masukkan nama lengkap Anda..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] mb-1">Institusi / Universitas *</label>
                  <input
                    type="text"
                    value={guestInstitution}
                    onChange={(e) => setGuestInstitution(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-semibold text-[#062e23]"
                    placeholder="Contoh: Universitas Indonesia / Umum"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Metadata Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#062e23] border-b border-[#062e23]/10 pb-3 flex items-center gap-2">
              <Tag size={18} className="text-[#2d5a4c]" />
              <span>Pengaturan Metadata Naskah Karya User</span>
            </h3>

            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-[#2d5a4c] uppercase tracking-wider mb-1">
                  Judul Artikel Ilmiah / Berita Satwa *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] font-serif text-lg font-bold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                  placeholder="Contoh: Studi Persebaran & Pelestarian Harimau Sumatra di Lanskap Hutan Tropis..."
                  required
                />
              </div>

              {/* Cover Image Uploader (Like Media Online News) */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
                  Foto Utama / Cover Berita Artikel (seperti Media Online News) *
                </label>

                {/* Cover Image Preview */}
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-[#062e23]/20 shadow-md">
                  <img
                    src={coverImage}
                    alt="Preview Cover"
                    className="w-full h-full object-cover"
                    onError={() => setCoverImage(PRESET_ARTICLE_IMAGES[0].url)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white text-xs font-semibold flex items-center gap-2">
                      <ImageIcon size={16} className="text-[#d4a373]" />
                      <span>Preview Foto Sampul Artikel Berita</span>
                    </div>
                  </div>
                </div>

                {/* Preset Selector + File Upload + Custom URL */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#062e23]">Pilih Foto Sampul Satwa atau Unggah Foto Sendiri:</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {PRESET_ARTICLE_IMAGES.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => setCoverImage(img.url)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          coverImage === img.url
                            ? 'bg-[#062e23] text-[#d4a373] border-[#d4a373] shadow'
                            : 'bg-[#f9faf6] text-[#062e23] border-[#062e23]/20 hover:bg-[#e8ede6]'
                        }`}
                      >
                        {img.name}
                      </button>
                    ))}

                    {/* File Upload Button */}
                    <label className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#d4a373] text-[#062e23] cursor-pointer hover:bg-white transition-colors flex items-center gap-1.5 shadow">
                      <Upload size={14} />
                      <span>Unggah Foto dari Perangkat</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Custom URL Input */}
                  <div className="pt-1 flex items-center gap-2">
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => {
                        setCustomImageUrl(e.target.value);
                        if (e.target.value.startsWith('http')) {
                          setCoverImage(e.target.value);
                        }
                      }}
                      placeholder="Atau tempel URL gambar dari internet (https://...)"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs text-[#062e23]"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Category & Species Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] uppercase tracking-wider mb-1">
                    Kategori Jurnal *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-semibold text-[#062e23] focus:outline-none"
                  >
                    <option>Konservasi Genetik & Bioakustik</option>
                    <option>Taksonomi & Ekologi Megafauna</option>
                    <option>Ornitologi Tropis</option>
                    <option>Biologi Kelautan & Herpetologi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d5a4c] uppercase tracking-wider mb-1">
                    Spesies Terkait (Tag Taksa) *
                  </label>
                  <select
                    value={selectedSpecies}
                    onChange={(e) => setSelectedSpecies(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-semibold text-[#062e23] focus:outline-none"
                  >
                    {SPECIES_DATA.map((sp) => (
                      <option key={sp.id} value={sp.latinName}>
                        {sp.commonName} ({sp.latinName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Abstract Input */}
              <div>
                <label className="block text-xs font-bold text-[#2d5a4c] uppercase tracking-wider mb-1">
                  Abstrak Ringkas Berita / Artikel *
                </label>
                <textarea
                  rows={3}
                  value={abstractIndo}
                  onChange={(e) => setAbstractIndo(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs font-serif text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                  placeholder="Tuliskan ringkasan singkat temuan atau isi berita artikel..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Article Main Body Editor */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#062e23]/10 pb-3 gap-2">
              <h3 className="font-serif text-lg font-bold text-[#062e23]">
                Isi Teks Naskah Ilmiah
              </h3>

              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar bg-[#f9faf6] p-1.5 rounded-xl border border-[#062e23]/10">
                <button
                  type="button"
                  onClick={() => handleToolbarInsert('**Teks Tebal**')}
                  className="p-2 hover:bg-[#e8ede6] rounded text-[#062e23]"
                  title="Tebal"
                >
                  <Bold size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarInsert('*Teks Miring*')}
                  className="p-2 hover:bg-[#e8ede6] rounded text-[#062e23]"
                  title="Miring"
                >
                  <Italic size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarInsert('[Teks Tautan](https://doi.org/)')}
                  className="p-2 hover:bg-[#e8ede6] rounded text-[#062e23]"
                  title="Tautan Sitasi DOI"
                >
                  <Link size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarInsert('![Keterangan Gambar](https://images.unsplash.com/photo-1540573133985-7585677a3281?auto=format&fit=crop&w=1000&q=80)')}
                  className="p-2 hover:bg-[#e8ede6] rounded text-[#062e23]"
                  title="Sisipkan Gambar Berita"
                >
                  <ImageIcon size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarInsert('- Poin 1\n- Poin 2')}
                  className="p-2 hover:bg-[#e8ede6] rounded text-[#062e23]"
                  title="Daftar List"
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            <textarea
              rows={12}
              value={articleBody}
              onChange={(e) => setArticleBody(e.target.value)}
              className="w-full p-4 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] font-serif text-sm text-[#062e23] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#062e23]"
              placeholder="Tulis naskah berita / artikel lengkap di sini (mendukung Markdown)..."
              required
            />
          </div>

          {/* Submit CTA Footer */}
          <div className="bg-[#062e23] text-[#e8ede6] p-6 sm:p-8 rounded-3xl border border-[#d4a373]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-serif font-bold text-base text-[#d4a373] flex items-center justify-center sm:justify-start gap-2">
                <Sparkles size={18} />
                Kirim Naskah Karya {authorName} ke Verifikasi Admin?
              </div>
              <p className="text-xs text-[#b4d7cd]">
                Setelah dikirim, naskah akan langsung muncul di antrean moderasi Admin Verifikasi.
              </p>
            </div>

            <button
              type="submit"
              className="bg-[#d4a373] hover:bg-white text-[#062e23] px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md shrink-0"
            >
              <Send size={16} />
              <span>Kirimkan Ke Admin Verifikasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
