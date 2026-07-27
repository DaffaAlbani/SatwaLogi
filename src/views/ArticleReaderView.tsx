import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Bookmark, 
  Quote, 
  Columns, 
  Sun, 
  Moon, 
  Type, 
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  X,
  PenTool,
  User
} from 'lucide-react';
import { JournalArticle } from '../data/satwaData';

interface ArticleReaderViewProps {
  article?: JournalArticle | null;
  onNavigateScreen: (screenId: string) => void;
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({ 
  article, 
  onNavigateScreen 
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [columnLayout, setColumnLayout] = useState<'single' | 'double'>('single');
  const [readingTheme, setReadingTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [activeCitation, setActiveCitation] = useState<number | null>(null);
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-base sm:text-lg leading-relaxed';
      case 'xlarge': return 'text-lg sm:text-xl leading-loose';
      default: return 'text-sm sm:text-base leading-relaxed';
    }
  };

  const getThemeClass = () => {
    switch (readingTheme) {
      case 'sepia': return 'bg-[#f4ecd8] text-[#433422] border-[#e2d7be]';
      case 'dark': return 'bg-[#0a1814] text-[#e8ede6] border-[#1a5948]';
      default: return 'bg-[#f9faf6] text-[#062e23] border-[#062e23]/10';
    }
  };

  const openCitation = (id: number) => {
    setActiveCitation(id);
  };

  if (!article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#e8ede6] text-[#062e23] flex items-center justify-center text-3xl shadow-sm">
          📚
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#062e23]">Belum Ada Artikel Ilmiah Terpilih</h2>
        <p className="text-xs text-[#2d5a4c] max-w-md leading-relaxed">
          Semua sampel artikel telah dibersihkan. Tulis naskah baru di Editor Artikel dan kirimkan ke verifikasi admin untuk diterbitkan di sini!
        </p>
        <button
          onClick={() => onNavigateScreen('SCREEN_12')}
          className="bg-[#062e23] text-[#d4a373] hover:bg-[#1a5948] px-5 py-2.5 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-md"
        >
          <PenTool size={16} />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClass()} pb-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* Navigation Back & Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-current/10 pb-4">
          <button
            onClick={() => onNavigateScreen('SCREEN_13')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2d5a4c] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda</span>
          </button>

          {/* Reader Customization Toolbar */}
          <div className="flex items-center gap-3 bg-white/80 dark:bg-black/30 p-2 rounded-2xl border border-current/10 shadow-sm backdrop-blur-md">
            {/* Font Size Selector */}
            <div className="flex items-center gap-1 border-r border-current/10 pr-2">
              <Type size={14} className="opacity-60" />
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-[#062e23] text-white' : 'hover:bg-black/5'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm font-bold ${fontSize === 'large' ? 'bg-[#062e23] text-white' : 'hover:bg-black/5'}`}
              >
                A+
              </button>
            </div>

            {/* Column Toggle */}
            <div className="flex items-center gap-1 border-r border-current/10 pr-2">
              <button
                onClick={() => setColumnLayout(columnLayout === 'single' ? 'double' : 'single')}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
                  columnLayout === 'double' ? 'bg-[#062e23] text-white' : 'hover:bg-black/5'
                }`}
                title="Toggle Dual Column"
              >
                <Columns size={14} />
                <span className="hidden sm:inline">Kolom</span>
              </button>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setReadingTheme('light')}
                className={`p-1.5 rounded ${readingTheme === 'light' ? 'bg-[#062e23] text-[#d4a373]' : 'hover:bg-black/5'}`}
                title="Mode Terang"
              >
                <Sun size={15} />
              </button>
              <button
                onClick={() => setReadingTheme('sepia')}
                className={`p-1.5 rounded text-xs font-bold ${readingTheme === 'sepia' ? 'bg-[#433422] text-[#f4ecd8]' : 'hover:bg-black/5'}`}
                title="Mode Sepia"
              >
                Sepia
              </button>
              <button
                onClick={() => setReadingTheme('dark')}
                className={`p-1.5 rounded ${readingTheme === 'dark' ? 'bg-[#e8ede6] text-[#062e23]' : 'hover:bg-black/5'}`}
                title="Mode Gelap"
              >
                <Moon size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Journal Header Info */}
        <header className="space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#062e23] text-[#d4a373] text-xs font-bold">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Peer-Reviewed Admin</span>
            </span>
            <span className="text-xs opacity-70 font-mono">DOI: {article.doi}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Authors List prominently showing Author Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-current/10 bg-black/5 p-4 rounded-2xl">
            {article.authors.map((auth, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img
                  src={auth.avatar}
                  alt={auth.name}
                  className="w-11 h-11 rounded-full object-cover border border-current/20"
                />
                <div>
                  <div className="font-serif font-bold text-sm">
                    Penulis Utama: <span className="text-[#d4a373]">{auth.name}</span>
                  </div>
                  <div className="text-xs opacity-80">{auth.institution}</div>
                  <div className="text-[11px] font-semibold opacity-70">{auth.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions & Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium opacity-85">
            <div className="flex items-center gap-4">
              <span>Dipublikasi: <strong>{article.publishedDate}</strong></span>
              <span>•</span>
              <span>Waktu Baca: <strong>{article.readTime}</strong></span>
              <span>•</span>
              <span>Sitasi: <strong>{article.citationsCount}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCitationModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#062e23] text-[#d4a373] hover:bg-[#1a5948] transition-colors flex items-center gap-1.5 font-bold"
              >
                <Quote size={14} />
                <span>Kutip Artikel</span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-xl border border-current/20 transition-colors ${
                  isBookmarked ? 'bg-[#d4a373] text-[#062e23]' : 'hover:bg-black/5'
                }`}
                title="Simpan ke Favorit"
              >
                <Bookmark size={16} />
              </button>

              <button
                onClick={() => alert(`Simulasi mengunduh PDF jurnal: ${article.title}.pdf (${article.pdfSize})`)}
                className="px-3 py-2 rounded-xl border border-current/20 hover:bg-black/5 transition-colors flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>PDF ({article.pdfSize})</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured News Media Photo Banner (Like Media Online News) */}
        {article.coverImage && (
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-current/20 relative group">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div className="bg-black/60 backdrop-blur-md p-3 text-[#f9faf6] text-xs font-sans italic border-t border-white/10 flex items-center justify-between">
              <span>Dokumentasi Foto Berita Artikel: {article.title}</span>
              <span className="font-semibold text-[#d4a373]">Satwalogi Media News</span>
            </div>
          </div>
        )}

        {/* Abstract Highlight Card */}
        <section className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl border border-current/20 bg-black/5 space-y-3">
          <div className="font-serif text-sm font-bold uppercase tracking-widest text-[#d4a373]">
            Abstrak Ilmiah (Abstract)
          </div>
          <p className="font-serif italic text-sm sm:text-base leading-relaxed opacity-90">
            "{article.abstract}"
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {article.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#062e23]/10 text-[#062e23] dark:text-[#e8ede6]">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Main Article Content Grid */}
        <div className="max-w-4xl mx-auto">
          <div className={`space-y-8 font-serif ${getFontSizeClass()} ${columnLayout === 'double' ? 'md:columns-2 md:gap-8' : ''}`}>
            {/* Section 1: Introduction */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                1. Pendahuluan & Tinjauan
              </h2>
              <p>
                {article.content.introduction}
                {' '}
                <button onClick={() => openCitation(1)} className="citation-link font-sans text-xs px-1">
                  [1]
                </button>
              </p>
            </div>

            {/* Section 2: Methodology */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                2. Metodologi Penelitian
              </h2>
              <p>
                {article.content.methodology}
              </p>
            </div>

            {/* Section 3: Results */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                3. Hasil & Analisis Data
              </h2>
              <p>
                {article.content.results}
              </p>
            </div>

            {/* Section 4: Discussion */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                4. Diskusi & Rekomendasi
              </h2>
              <p>
                {article.content.discussion}
              </p>
            </div>

            {/* Section 5: Conclusion */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                5. Kesimpulan
              </h2>
              <p>
                {article.content.conclusion}
              </p>
            </div>
          </div>

          {/* References List */}
          {article.references && article.references.length > 0 && (
            <section className="mt-16 pt-8 border-t-2 border-current/20 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-lg font-bold uppercase tracking-wider text-[#2d5a4c]">
                  Daftar Pustaka & Sitasi (References)
                </h3>
                <span className="text-xs opacity-75">{article.references.length} Referensi Terverifikasi</span>
              </div>

              <div className="space-y-3 font-sans text-xs">
                {article.references.map((ref) => (
                  <div
                    key={ref.id}
                    id={`ref-${ref.id}`}
                    className={`p-3 rounded-xl border transition-all ${
                      activeCitation === ref.id
                        ? 'bg-[#d4a373]/20 border-[#d4a373] font-semibold'
                        : 'border-current/10 bg-black/5'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#2d5a4c]">[{ref.id}]</span>
                      <div className="space-y-1">
                        <p>{ref.text}</p>
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[#2d5a4c] hover:underline font-mono text-[11px]"
                        >
                          <span>https://doi.org/{ref.doi}</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Citation Popover Modal */}
      {showCitationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#062e23] max-w-lg w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-[#062e23]/20 font-sans">
            <div className="flex items-center justify-between border-b border-[#062e23]/10 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#062e23]">Kutip Jurnal Ini</h3>
              <button onClick={() => setShowCitationModal(false)} className="p-1 hover:bg-[#e8ede6] rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#2d5a4c]">Format APA (7th Edition):</label>
                <div className="p-3 bg-[#e8ede6] rounded-xl font-serif text-[11px] mt-1 select-all">
                  {article.authors[0].name}. (2026). {article.title}. <i>Jurnal Satwalogi Indonesia</i>. https://doi.org/{article.doi}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`${article.authors[0].name}. (2026). ${article.title}. https://doi.org/${article.doi}`);
                alert('Sitasi berhasil disalin ke clipboard!');
                setShowCitationModal(false);
              }}
              className="w-full bg-[#062e23] text-[#f9faf6] py-2.5 rounded-xl text-xs font-bold hover:bg-[#1a5948] transition-colors"
            >
              Salin Sitasi APA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
