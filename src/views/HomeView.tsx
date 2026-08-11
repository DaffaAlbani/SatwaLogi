import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Volume2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Compass,
  BookOpen,
  Feather,
  ExternalLink
} from 'lucide-react';
import { SPECIES_DATA, Species, JOURNAL_ARTICLES } from '../data/satwaData';
import { playSynthesizedVocalization } from '../utils/audioSynth';
import { HabitatMapExplorer } from '../components/HabitatMapExplorer';
import { SpecimenCard } from '../components/SpecimenCard';
import { JournalCard } from '../components/JournalCard';

interface HomeViewProps {
  onSelectSpecies: (species: Species) => void;
  onNavigateScreen: (screenId: string) => void;
}

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = el.querySelectorAll('.reveal, .reveal-scale');
    revealElements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onSelectSpecies, 
  onNavigateScreen 
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useScrollReveal();

  const toggleAudio = (species: Species) => {
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current = null;
    }

    if (activeAudioId === species.id) {
      setActiveAudioId(null);
    } else {
      setActiveAudioId(species.id);
      if (species.audioUrl) {
        const audio = new Audio(species.audioUrl);
        audioInstanceRef.current = audio;
        audio.play().catch(() => {
          const cleanup = playSynthesizedVocalization(species.id);
          if (cleanup) {
            setTimeout(() => setActiveAudioId(null), 3000);
          }
        });
        audio.onended = () => {
          setActiveAudioId(null);
          audioInstanceRef.current = null;
        };
      }
    }
  };

  const filteredSpecies = SPECIES_DATA.filter((sp) => {
    let matchesCategory = true;
    if (selectedClass === 'FAUNA') {
      matchesCategory = sp.kingdom === 'Animalia';
    } else if (selectedClass === 'FLORA') {
      matchesCategory = sp.kingdom === 'Plantae';
    } else if (selectedClass !== 'ALL') {
      matchesCategory = 
        sp.class.toUpperCase() === selectedClass.toUpperCase() || 
        sp.kingdom.toUpperCase() === selectedClass.toUpperCase();
    }

    const matchesSearch = 
      sp.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.kingdom.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const iucnBadgeClass = (status: string) => `iucn-badge iucn-badge--${status}`;

  const filterTabLabels: Record<string, string> = {
    ALL: 'Semua Taksa',
    FAUNA: '🐾 Fauna',
    FLORA: '🌿 Flora',
    MAMMALIA: 'Mamalia',
    AVES: 'Aves',
    REPTILIA: 'Reptilia',
    MAGNOLIOPSIDA: 'Tumbuhan Bunga'
  };

  return (
    <div ref={containerRef} className="space-y-0 pb-16 sm:pb-20">
      {/* ═══ HERO SECTION ═══ */}
      <section className="hero-gradient relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        {/* Floating particles */}
        <div className="hero-particles" />
        
        {/* Decorative orbs */}
        <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#d4a373]/10 to-transparent blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#2d5a4c]/20 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark text-[#d4a373] text-[11px] sm:text-xs font-semibold tracking-wide">
            <Sparkles size={13} className="shrink-0 animate-pulse" />
            <span>Pusat Data Biosistemasi Flora & Fauna Tropis</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
            <span className="text-[#f9faf6]">Dokumentasi Ilmiah</span>
            <br />
            <span className="gradient-text">Flora & Fauna</span>
            <br />
            <span className="text-[#f9faf6]">Indonesia</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base lg:text-lg text-[#e8ede6]/80 max-w-2xl mx-auto font-sans leading-relaxed">
            Platform publikasi ilmiah untuk meneliti, mendokumentasikan keanekaragaman flora & fauna tropis, dan menerbitkan karya ilmiah secara terbuka.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onNavigateScreen('SCREEN_10')}
              className="shimmer-btn bg-gradient-to-r from-[#d4a373] to-[#e8c9a4] hover:from-[#c28e5c] hover:to-[#d4a373] text-[#062e23] px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <Compass size={18} />
              <span>Jelajahi Katalog</span>
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => onNavigateScreen('SCREEN_15')}
              className="glass-card-dark hover:bg-[#1a5948]/90 text-[#f9faf6] px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <Feather size={18} />
              <span>Jurnal Ilmiah</span>
              <ExternalLink size={14} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative glass-card rounded-2xl p-1.5 sm:p-2 border border-white/20 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center flex-1 px-3">
                  <Search className="text-[#2d5a4c] shrink-0" size={18} />
                  <input
                    type="text"
                    placeholder="Cari harimau, rafflesia, orangutan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2.5 text-[#062e23] placeholder-[#2d5a4c]/50 bg-transparent text-sm focus:outline-none font-medium"
                  />
                </div>
                <button 
                  onClick={() => {}}
                  className="bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
                >
                  <span>Cari Taksa</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS SECTION — Floating Glass Cards ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { value: '1.240+', label: 'Spesies Flora & Satwa', accent: 'text-[#062e23]' },
            { value: '180 Juta+', label: 'Metadata CrossRef', accent: 'text-[#062e23]' },
            { value: '450+', label: 'Bioakustik & Ambien', accent: 'text-[#062e23]' },
            { value: '100%', label: 'Peer-Review', accent: 'text-[#d4a373]' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className={`glass-card gradient-border p-5 sm:p-6 text-center hover:shadow-lg transition-all duration-500 stagger-${i + 1}`}
            >
              <div className={`font-serif text-2xl sm:text-3xl font-bold stat-value ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-[#2d5a4c]/70 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SPECIES CATALOG GRID ═══ */}
      <section id="katalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 scroll-mt-24 pt-16 sm:pt-20">
        {/* Section Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-[#d4a373] uppercase tracking-widest">
              <Compass size={15} />
              <span>Eksplorasi Keanekaragaman Hayati</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#062e23] mt-1">
              Katalog Spesies Terproteksi
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['ALL', 'FAUNA', 'FLORA', 'MAMMALIA', 'AVES', 'REPTILIA', 'MAGNOLIOPSIDA'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 whitespace-nowrap ${
                  selectedClass === cls
                    ? 'bg-[#062e23] text-[#d4a373] shadow-md scale-[1.02]'
                    : 'bg-[#e8ede6]/60 text-[#2d5a4c] hover:bg-[#e8ede6]'
                }`}
              >
                {filterTabLabels[cls] || cls}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-14">
          {/* ─── FAUNA SECTION ─── */}
          {(selectedClass === 'ALL' || selectedClass === 'FAUNA' || selectedClass === 'MAMMALIA' || selectedClass === 'AVES' || selectedClass === 'REPTILIA') && (
            <section className="space-y-5">
              <div className="reveal flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg shadow-sm border border-amber-200/50">🐾</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#062e23]">Satwa Unggulan Nusantara</h2>
                    <p className="text-xs text-[#2d5a4c]/70">Megafauna terancam punah, avifauna endemik, & mamalia langka</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateScreen('SCREEN_10')}
                  className="hidden sm:flex text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-all duration-300 items-center gap-1.5 border border-amber-200/60 shadow-sm hover:shadow-md"
                >
                  <span>Lihat Semua</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredSpecies.filter(s => s.kingdom === 'Animalia').slice(0, 6).map((species, idx) => (
                  <div key={species.id} className={`reveal-scale stagger-${Math.min(idx + 1, 6)}`}>
                    <SpecimenCard species={species} onSelect={onSelectSpecies} index={idx} />
                  </div>
                ))}
              </div>

              <div className="reveal pt-2 text-center">
                <button
                  onClick={() => onNavigateScreen('SCREEN_10')}
                  className="inline-flex items-center gap-2 text-sm font-bold bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Buka Semua Satwa di Katalog</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          )}

          {/* ─── FLORA SECTION ─── */}
          {(selectedClass === 'ALL' || selectedClass === 'FLORA' || selectedClass === 'MAGNOLIOPSIDA') && (
            <section className="space-y-5">
              <div className="reveal flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-lg shadow-sm border border-emerald-200/50">🌿</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#062e23]">Flora Unggulan Tropis</h2>
                    <p className="text-xs text-[#2d5a4c]/70">Tumbuhan endemik, kayu aromatik, & puspa bangsa nusantara</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateScreen('SCREEN_10')}
                  className="hidden sm:flex text-xs font-bold text-emerald-900 bg-emerald-50 hover:emerald-100 px-4 py-2 rounded-xl transition-all duration-300 items-center gap-1.5 border border-emerald-200/60 shadow-sm hover:shadow-md"
                >
                  <span>Lihat Semua</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredSpecies.filter(s => s.kingdom === 'Plantae').slice(0, 6).map((species, idx) => (
                  <div key={species.id} className={`reveal-scale stagger-${Math.min(idx + 1, 6)}`}>
                    <SpecimenCard species={species} onSelect={onSelectSpecies} index={idx} />
                  </div>
                ))}
              </div>

              <div className="reveal pt-2 text-center">
                <button
                  onClick={() => onNavigateScreen('SCREEN_10')}
                  className="inline-flex items-center gap-2 text-sm font-bold bg-emerald-900 hover:bg-emerald-800 text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Buka Semua Flora di Katalog</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          )}
        </div>

        {/* ═══ HABITAT MAP EXPLORER ═══ */}
        <div className="reveal pt-10">
          <HabitatMapExplorer onSelectSpecies={onSelectSpecies} />
        </div>

        {/* ═══ BOTTOM CTA ═══ */}
        <div className="reveal mt-16 sm:mt-20 relative overflow-hidden rounded-3xl">
          {/* Gradient mesh bg */}
          <div className="hero-gradient p-8 sm:p-12 lg:p-16 text-center text-[#f9faf6] relative">
            <div className="hero-particles" />
            
            {/* Bokeh circles */}
            <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-[#d4a373]/10 blur-xl" />
            <div className="absolute bottom-8 right-12 w-32 h-32 rounded-full bg-[#2d5a4c]/15 blur-2xl" />
            
            <div className="max-w-2xl mx-auto space-y-5 relative z-10">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold">
                Jelajahi Jurnal Ilmiah Satwalogi
              </h2>
              <p className="text-sm sm:text-base text-[#e8ede6]/75 leading-relaxed">
                Akses lebih dari 180 juta metadata artikel ilmiah dari seluruh dunia melalui integrasi CrossRef API.
              </p>
              <button
                onClick={() => onNavigateScreen('SCREEN_15')}
                className="shimmer-btn bg-gradient-to-r from-[#d4a373] to-[#e8c9a4] text-[#062e23] px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 inline-flex items-center gap-2.5 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <Feather size={18} />
                <span>Buka Jurnal Ilmiah</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
