import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  PenTool,
  ExternalLink,
  Loader2,
  Globe,
  X,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { JournalArticle } from '../data/satwaData';
import { JournalCard } from '../components/JournalCard';

interface JournalViewProps {
  journalArticles: JournalArticle[];
  isCrossRefLoading: boolean;
  onSelectArticle: (article: JournalArticle) => void;
  onSearchCrossRef: (query: string) => void;
  onResetCrossRef: () => void;
  onNavigateScreen: (screenId: string) => void;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    el.querySelectorAll('.reveal, .reveal-scale').forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export const JournalView: React.FC<JournalViewProps> = ({
  journalArticles,
  isCrossRefLoading,
  onSelectArticle,
  onSearchCrossRef,
  onResetCrossRef,
  onNavigateScreen,
}) => {
  const [crossrefSearchQuery, setCrossrefSearchQuery] = useState<string>('');
  const containerRef = useScrollReveal();

  const handleCrossRefSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (crossrefSearchQuery.trim()) {
      onSearchCrossRef(crossrefSearchQuery);
    }
  };

  return (
    <div ref={containerRef} className="min-h-[80vh] space-y-8 pb-20 pt-4">
      {/* ═══ Header Section ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-gradient rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl text-[#f9faf6]">
          <div className="hero-particles" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#d4a373]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-3xl">
            <button
              onClick={() => onNavigateScreen('SCREEN_13')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4a373] hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Beranda</span>
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4a373] uppercase tracking-widest px-3 py-1 rounded-full glass-card-dark">
                <BookOpen size={14} />
                <span>Publikasi Ilmiah Terbuka</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
                Jurnal Ilmiah Satwalogi
              </h1>
              <p className="text-xs sm:text-sm text-[#e8ede6]/80 max-w-2xl leading-relaxed font-sans">
                Jelajahi jutaan naskah riset keanekaragaman hayati & publikasi ilmiah tropis dari seluruh dunia via integrasi CrossRef API.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleCrossRefSearch} className="max-w-2xl pt-2">
              <div className="relative glass-card rounded-2xl p-1.5 sm:p-2 border border-white/20 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center flex-1 px-3">
                    <Globe className="text-[#2d5a4c] shrink-0" size={18} />
                    <input
                      type="text"
                      placeholder="Cari naskah: 'Sumatran tiger', 'Rafflesia', 'coral reef'..."
                      value={crossrefSearchQuery}
                      onChange={(e) => setCrossrefSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 text-[#062e23] placeholder-[#2d5a4c]/50 bg-transparent text-xs sm:text-sm focus:outline-none font-medium"
                    />
                    {crossrefSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setCrossrefSearchQuery('')}
                        className="p-1 hover:bg-[#e8ede6] rounded-full shrink-0"
                      >
                        <X size={14} className="text-[#2d5a4c]" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isCrossRefLoading || !crossrefSearchQuery.trim()}
                    className="bg-[#062e23] hover:bg-[#1a5948] disabled:opacity-50 text-[#d4a373] px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0 shadow-md"
                  >
                    {isCrossRefLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Mencari...</span>
                      </>
                    ) : (
                      <>
                        <Search size={15} />
                        <span>Cari CrossRef</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ Content Area ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Action Bar */}
        <div className="reveal flex flex-wrap items-center justify-between gap-3 glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            {journalArticles.length > 0 && (
              <button
                onClick={() => {
                  setCrossrefSearchQuery('');
                  onResetCrossRef();
                }}
                className="text-xs text-[#2d5a4c] hover:text-[#062e23] flex items-center gap-1.5 font-bold px-3.5 py-2 rounded-xl hover:bg-[#e8ede6] transition-colors border border-[#062e23]/10"
              >
                <RefreshCw size={14} />
                <span>Reset Hasil</span>
              </button>
            )}
            <span className="px-3.5 py-1.5 rounded-xl bg-blue-900/10 text-blue-800 text-[10px] font-extrabold border border-blue-200/60 inline-flex items-center gap-1.5">
              <Globe size={13} /> Integrasi Crossref API
            </span>
          </div>

          <div className="flex items-center gap-3">
            {journalArticles.length > 0 && (
              <p className="text-xs text-[#2d5a4c] font-semibold">
                <strong>{journalArticles.length}</strong> naskah ditemukan
              </p>
            )}
            <button
              onClick={() => onNavigateScreen('SCREEN_12')}
              className="shimmer-btn bg-gradient-to-r from-[#062e23] to-[#1a5948] hover:from-[#0f4234] hover:to-[#2d5a4c] text-[#d4a373] text-xs font-bold px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-md"
            >
              <PenTool size={14} />
              <span>Tulis Naskah Ilmiah</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isCrossRefLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 space-y-4">
                <div className="h-4 bg-[#e8ede6] rounded w-3/4"></div>
                <div className="h-3 bg-[#e8ede6] rounded w-full"></div>
                <div className="h-3 bg-[#e8ede6] rounded w-5/6"></div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 bg-[#e8ede6] rounded-full"></div>
                  <div className="h-3 bg-[#e8ede6] rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isCrossRefLoading && journalArticles.length === 0 && (
          <div className="reveal glass-card rounded-3xl p-8 sm:p-12 text-center space-y-5 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a373]/20 to-[#2d5a4c]/20 text-[#062e23] flex items-center justify-center mx-auto text-3xl shadow-sm border border-[#d4a373]/30">
              📡
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-bold text-[#062e23]">
                Jelajahi Artikel Ilmiah Internasional
              </h2>
              <p className="text-xs text-[#2d5a4c]/80 leading-relaxed max-w-lg mx-auto">
                Gunakan pencarian di atas untuk query database CrossRef atau pilih salah satu kata kunci populer di bawah ini.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {[
                'Sumatran elephant',
                'Bali myna conservation',
                'Rafflesia arnoldii',
                'Komodo dragon habitat',
                'coral reef Indonesia',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setCrossrefSearchQuery(suggestion);
                    onSearchCrossRef(suggestion);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#e8ede6] text-[#062e23] text-xs font-semibold transition-all border border-[#062e23]/10 shadow-sm"
                >
                  🔍 {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {!isCrossRefLoading && journalArticles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {journalArticles.map((article, idx) => (
              <div key={article.id} className={`reveal-scale stagger-${Math.min((idx % 6) + 1, 6)}`}>
                <JournalCard article={article} onSelect={onSelectArticle} index={idx} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
