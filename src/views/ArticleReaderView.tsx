import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Share2, 
  Bookmark, 
  Quote, 
  CheckCircle2, 
  Columns, 
  Sun, 
  Moon, 
  Type, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  X
} from 'lucide-react';
import { JOURNAL_ARTICLES, JournalArticle } from '../data/satwaData';

interface ArticleReaderViewProps {
  article?: JournalArticle;
  onNavigateScreen: (screenId: string) => void;
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({ 
  article = JOURNAL_ARTICLES[0], 
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClass()} pb-24`}>
      {/* SCREEN_5 Identifier Watermark Badge */}
      <div className="bg-[#062e23] text-[#d4a373] text-[11px] font-mono py-1 px-4 text-center border-b border-[#d4a373]/30">
        [SCREEN_5] Satwalogi - Baca Artikel Scientific (Scientific Journal Reader)
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation Back & Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-current/10 pb-4">
          <button
            onClick={() => onNavigateScreen('SCREEN_13')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2d5a4c] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda [SCREEN_13]</span>
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
              <span>Peer-Reviewed BRIN</span>
            </span>
            <span className="text-xs opacity-70 font-mono">DOI: {article.doi}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Authors List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-current/10">
            {article.authors.map((auth, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img
                  src={auth.avatar}
                  alt={auth.name}
                  className="w-11 h-11 rounded-full object-cover border border-current/20"
                />
                <div>
                  <div className="font-serif font-bold text-sm">{auth.name}</div>
                  <div className="text-xs opacity-75">{auth.institution}</div>
                  <div className="text-[11px] text-[#d4a373] font-semibold">{auth.role}</div>
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
                1. Pendahuluan
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
                {' '}
                <button onClick={() => openCitation(2)} className="citation-link font-sans text-xs px-1">
                  [2]
                </button>
              </p>
            </div>

            {/* Figure / Chart Embed */}
            <div className="my-6 p-4 rounded-2xl border border-current/20 bg-white/40 dark:bg-black/40 break-inside-avoid text-center space-y-2 font-sans">
              <div className="h-48 bg-[#062e23] rounded-xl flex flex-col items-center justify-center text-[#d4a373] p-4">
                <BookOpen size={36} />
                <span className="text-xs font-bold mt-2">[Grafik 1: Distribusi Variasi Genomik & Struktur FST Populasi]</span>
              </div>
              <p className="text-xs opacity-75 italic">
                Gambar 1. Pemetaan Principal Component Analysis (PCA) lokus SNP Panthera tigris sumatrae (Kusuma et al., 2026).
              </p>
            </div>

            {/* Section 3: Results */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                3. Hasil & Analisis Data
              </h2>
              <p>
                {article.content.results}
                {' '}
                <button onClick={() => openCitation(3)} className="citation-link font-sans text-xs px-1">
                  [3]
                </button>
              </p>
            </div>

            {/* Section 4: Discussion */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                4. Diskusi
              </h2>
              <p>
                {article.content.discussion}
                {' '}
                <button onClick={() => openCitation(4)} className="citation-link font-sans text-xs px-1">
                  [4]
                </button>
              </p>
            </div>

            {/* Section 5: Conclusion */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="font-sans text-xl font-bold text-[#2d5a4c] border-b border-current/10 pb-1">
                5. Kesimpulan & Rekomendasi Konservasi
              </h2>
              <p>
                {article.content.conclusion}
              </p>
            </div>
          </div>

          {/* References & Footnotes List */}
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
                  {article.authors[0].name}. (2026). {article.title}. <i>Jurnal Satwalogi Indonesia</i>, 14(2), 104-122. https://doi.org/{article.doi}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2d5a4c]">Format BibTeX:</label>
                <pre className="p-3 bg-[#062e23] text-[#e8ede6] rounded-xl text-[10px] font-mono mt-1 overflow-x-auto">
{`@article{satwalogi2026,
  author = {${article.authors[0].name}},
  title = {${article.title}},
  journal = {Jurnal Satwalogi},
  year = {2026},
  doi = {${article.doi}}
}`}
                </pre>
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
