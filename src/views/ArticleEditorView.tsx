import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  List, 
  Quote, 
  Link, 
  Image, 
  Send, 
  Save, 
  Eye, 
  FileCheck, 
  Tag, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Table,
  Code
} from 'lucide-react';
import { SPECIES_DATA } from '../data/satwaData';

interface ArticleEditorViewProps {
  onNavigateScreen: (screenId: string) => void;
}

export const ArticleEditorView: React.FC<ArticleEditorViewProps> = ({ onNavigateScreen }) => {
  const [title, setTitle] = useState('Analisis Kepadatan Sarang & Adaptasi Pongo tapanuliensis Terhadap Variasi Fragmentasi Tajuk');
  const [category, setCategory] = useState('Konservasi Genetik & Bioakustik');
  const [selectedSpecies, setSelectedSpecies] = useState('Pongo tapanuliensis');
  const [abstractIndo, setAbstractIndo] = useState('Studi ini mengevaluasi dinamika kerapatan sarang malam Orangutan Tapanuli di ekosistem Batang Toru dengan mengintegrasikan data transek darat dan citra drone LIDAR...');
  const [articleBody, setArticleBody] = useState(`## 1. Pendahuluan
Keberadaan Orangutan Tapanuli (*Pongo tapanuliensis*) pada lanskap Batang Toru menghadapi tantangan berat akibat keterbatasan ruang jelajah. Penelitian ini bertujuan untuk mengukur indeks keterhubungan tajuk kanopi...

## 2. Metodologi Penelitian
Pengamatan sarang dilakukan menggunakan metode Line Transect sepanjang 12 km pada ketinggian 900-1.200 mdpl. Setiap sarang yang ditemukan diklasifikasikan ke dalam 5 kelas pelapukan (A hingga E) [1].

## 3. Hasil & Diskusi
Hasil inventarisasi menunjukkan kepadatan rata-rata 0.68 sarang/km². Tajuk pohon Shorea spp. menjadi pilihan utama pembuatan sarang malam (42%)...`);

  const [activeTab, setActiveTab] = useState<'WRITE' | 'PREVIEW'>('WRITE');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToolbarInsert = (syntax: string) => {
    setArticleBody((prev) => prev + `\n${syntax}`);
  };

  const handleSubmitPeerReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* SCREEN_12 Identifier Watermark Badge */}
      <div className="bg-[#062e23] text-[#d4a373] text-[11px] font-mono py-1 px-4 text-center border-b border-[#d4a373]/30">
        [SCREEN_12] Penulis - Editor Artikel (Bahasa Indonesia)
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Status Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#062e23]/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
              <Sparkles size={16} />
              <span>Studio Penulisan Jurnal Ilmiah</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] mt-1">
              Editor Naskah Ilmiah Satwalogi
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => alert('Draf artikel berhasil disimpan di local storage.')}
              className="px-4 py-2.5 rounded-xl border border-[#062e23]/20 hover:bg-[#e8ede6] text-xs font-semibold text-[#062e23] flex items-center gap-2 transition-colors"
            >
              <Save size={15} />
              <span>Simpan Draf</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'WRITE' ? 'PREVIEW' : 'WRITE')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'PREVIEW'
                  ? 'bg-[#d4a373] text-[#062e23]'
                  : 'bg-[#e8ede6] text-[#062e23] hover:bg-[#062e23]/10'
              }`}
            >
              <Eye size={15} />
              <span>{activeTab === 'WRITE' ? 'Preview Jurnal' : 'Kembali Edit'}</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner if Submitted */}
        {isSubmitted && (
          <div className="bg-emerald-900 text-[#f9faf6] p-6 rounded-2xl border border-emerald-700 space-y-2 animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2 text-[#d4a373] font-bold text-base">
              <CheckCircle2 size={20} />
              <span>Naskah Berhasil Dikirim ke Tim Redaksi Verifikasi [SCREEN_14]</span>
            </div>
            <p className="text-xs text-[#e8ede6]/90 leading-relaxed">
              Naskah Anda kini berstatus <span className="text-[#d4a373] font-bold">"PENDING MODERASI"</span> dan sedang ditinjau oleh Dewan Redaksi BRIN. Anda dapat mengecek status di <strong>Dasbor Penulis [SCREEN_8]</strong> atau memantau di <strong>Admin Verifikasi [SCREEN_14]</strong>.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigateScreen('SCREEN_14')}
                className="bg-[#d4a373] text-[#062e23] px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-white transition-colors"
              >
                Lihat di Panel Admin Verifikasi [SCREEN_14]
              </button>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#b4d7cd] hover:underline"
              >
                Tutup Notifikasi
              </button>
            </div>
          </div>
        )}

        {/* Main Form Layout */}
        <form onSubmit={handleSubmitPeerReview} className="space-y-8">
          {/* Metadata Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#062e23] border-b border-[#062e23]/10 pb-3 flex items-center gap-2">
              <Tag size={18} className="text-[#2d5a4c]" />
              <span>Metadata & Pengaturan Naskah</span>
            </h3>

            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-[#2d5a4c] uppercase tracking-wider mb-1">
                  Judul Artikel Ilmiah (Bahasa Indonesia) *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] font-serif text-lg font-bold text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                  placeholder="Masukkan judul naskah..."
                  required
                />
              </div>

              {/* Grid Category & Species Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Abstrak Ringkas (Maksimal 250 kata) *
                </label>
                <textarea
                  rows={3}
                  value={abstractIndo}
                  onChange={(e) => setAbstractIndo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#062e23]/20 bg-[#f9faf6] text-xs text-[#062e23] focus:outline-none leading-relaxed"
                  placeholder="Tuliskan latar belakang, metode, hasil utama, dan simpulan..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Editor Body & Toolbar */}
          <div className="bg-white rounded-2xl border border-[#062e23]/10 shadow-sm overflow-hidden space-y-0">
            {/* Rich Text Editor Toolbar */}
            <div className="bg-[#e8ede6] px-4 py-2.5 border-b border-[#062e23]/10 flex flex-wrap items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => handleToolbarInsert('## Judul Sub-Seksi Baru')}
                className="p-2 hover:bg-[#062e23]/10 rounded font-bold flex items-center gap-1 text-[#062e23]"
                title="Heading 2"
              >
                <Heading2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleToolbarInsert('**teks tebal**')}
                className="p-2 hover:bg-[#062e23]/10 rounded text-[#062e23]"
                title="Bold"
              >
                <Bold size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleToolbarInsert('*teks miring latin*')}
                className="p-2 hover:bg-[#062e23]/10 rounded text-[#062e23]"
                title="Italic"
              >
                <Italic size={16} />
              </button>
              <span className="h-5 w-px bg-[#062e23]/20 mx-1"></span>
              <button
                type="button"
                onClick={() => handleToolbarInsert('[Sitasi: Kusuma et al., 2026]')}
                className="p-2 hover:bg-[#062e23]/10 rounded font-semibold text-[#2d5a4c] flex items-center gap-1"
                title="Insert Citation Tag"
              >
                <Quote size={15} />
                <span>+Sitasi</span>
              </button>
              <button
                type="button"
                onClick={() => handleToolbarInsert('![Gambar 1: Deskripsi sampel](https://images.unsplash.com/photo-1540573133985-7585677a3281)')}
                className="p-2 hover:bg-[#062e23]/10 rounded text-[#062e23]"
                title="Insert Gambar"
              >
                <Image size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleToolbarInsert('| Parameter | Nilai |\n|---|---|\n| Transek | 12 km |')}
                className="p-2 hover:bg-[#062e23]/10 rounded text-[#062e23]"
                title="Insert Tabel Data"
              >
                <Table size={16} />
              </button>
            </div>

            {/* Writer vs Preview Mode Switch */}
            {activeTab === 'WRITE' ? (
              <div className="p-6">
                <textarea
                  rows={14}
                  value={articleBody}
                  onChange={(e) => setArticleBody(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#062e23]/10 bg-[#f9faf6] font-serif text-sm leading-relaxed text-[#062e23] focus:outline-none focus:ring-2 focus:ring-[#062e23]"
                  placeholder="Tuliskan naskah lengkap menggunakan format Markdown/Rich text..."
                  required
                />
              </div>
            ) : (
              <div className="p-8 bg-[#f9faf6] space-y-6 font-serif leading-relaxed">
                <div className="p-4 bg-[#e8ede6] rounded-xl text-xs font-sans font-bold text-[#2d5a4c]">
                  [LIVE PREVIEW MODERASI REDAKSI]
                </div>
                <h2 className="text-3xl font-bold text-[#062e23]">{title}</h2>
                <div className="text-xs font-sans text-[#2d5a4c]">
                  Tag Spesies: <strong>{selectedSpecies}</strong> | Kategori: <strong>{category}</strong>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#062e23]/10 italic text-sm">
                  "{abstractIndo}"
                </div>
                <div className="whitespace-pre-wrap text-sm text-[#062e23]">
                  {articleBody}
                </div>
              </div>
            )}
          </div>

          {/* Submit Peer Review Footer */}
          <div className="bg-[#062e23] text-[#e8ede6] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#d4a373]/30 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-serif font-bold text-base text-[#d4a373]">
                Siap Diproses Peer-Review Dewan Redaksi?
              </div>
              <p className="text-xs text-[#b4d7cd]">
                Naskah akan diperiksa otomatis (Plagiarisme, Sitasi, Taksonomi) lalu diverifikasi oleh Admin Dewan Editor.
              </p>
            </div>

            <button
              type="submit"
              className="bg-[#d4a373] hover:bg-white text-[#062e23] px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md shrink-0"
            >
              <Send size={16} />
              <span>Kirimkan Ke Verifikasi Admin [SCREEN_14]</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
