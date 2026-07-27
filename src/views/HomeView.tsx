import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Play, 
  Pause, 
  Share2, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { SPECIES_DATA, JOURNAL_ARTICLES, Species } from '../data/satwaData';

interface HomeViewProps {
  onSelectSpecies: (species: Species) => void;
  onNavigateScreen: (screenId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectSpecies, onNavigateScreen }) => {
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const filteredSpecies = SPECIES_DATA.filter((sp) => {
    const matchesClass = selectedClass === 'ALL' || sp.class.toUpperCase() === selectedClass.toUpperCase();
    const matchesSearch = 
      sp.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.family.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const toggleAudio = (id: string) => {
    if (activeAudioId === id) {
      setActiveAudioId(null);
    } else {
      setActiveAudioId(id);
    }
  };

  const iucnBadgeColor = (status: string) => {
    switch (status) {
      case 'CR': return 'bg-red-700 text-white';
      case 'EN': return 'bg-amber-600 text-white';
      case 'VU': return 'bg-yellow-500 text-slate-900';
      default: return 'bg-emerald-700 text-white';
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* SCREEN_13 Identifier Watermark Badge */}
      <div className="bg-[#062e23] text-[#d4a373] text-[11px] font-mono py-1 px-4 text-center border-b border-[#d4a373]/30">
        [SCREEN_13] Satwalogi - Beranda (Bahasa Indonesia)
      </div>

      {/* Hero Section with Botanical Intellect Aesthetic */}
      <section className="relative overflow-hidden bg-[#062e23] text-[#f9faf6] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#d4a373]/20 shadow-xl">
        {/* Background Decorative Botanical Shapes */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#2d5a4c]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-[#d4a373]/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a5948]/70 border border-[#d4a373]/40 text-[#d4a373] text-xs font-semibold tracking-wide">
            <Sparkles size={14} />
            <span>Pusat Data Biosistemasi & Konservasi Fauna Indonesia</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight text-[#f9faf6]">
            Dokumentasi Ilmiah & Jurnal Terbuka Keanekaragaman Satwa
          </h1>

          <p className="text-base sm:text-lg text-[#e8ede6]/90 max-w-3xl mx-auto font-sans leading-relaxed">
            Menghubungkan peneliti, akademisi, dan konservasionis dengan informasi taksonomi komprehensif, pemetaan sebaran habitat, serta publikasi peer-reviewed berbasis bukti.
          </p>

          {/* Interactive Search Bar */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-[#f9faf6] rounded-2xl shadow-2xl p-2 border-2 border-[#d4a373]/40 focus-within:border-[#d4a373] transition-all">
              <Search className="ml-3 text-[#2d5a4c]" size={22} />
              <input
                type="text"
                placeholder="Cari harimau, orangutan, Panthera, Leucopsar, atau taksa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2.5 text-[#062e23] placeholder-[#2d5a4c]/60 bg-transparent text-sm focus:outline-none font-medium"
              />
              <button 
                onClick={() => {}}
                className="bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Cari Taksa</span>
                <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-[#b4d7cd]">
              <span className="font-semibold text-[#d4a373]">Pencarian Populer:</span>
              <button onClick={() => setSearchQuery('Panthera')} className="hover:underline text-[#e8ede6]">Panthera tigris</button>
              <span>•</span>
              <button onClick={() => setSearchQuery('Pongo')} className="hover:underline text-[#e8ede6]">Pongo tapanuliensis</button>
              <span>•</span>
              <button onClick={() => setSearchQuery('Bali')} className="hover:underline text-[#e8ede6]">Jalak Bali</button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Counter Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#e8ede6] p-6 rounded-2xl border border-[#062e23]/10 shadow-sm">
          <div className="text-center p-3 border-r border-[#062e23]/10 last:border-0">
            <div className="font-serif text-3xl font-bold text-[#062e23]">740+</div>
            <div className="text-xs font-semibold text-[#2d5a4c] uppercase tracking-wider mt-1">Spesies Terdaftar</div>
          </div>
          <div className="text-center p-3 border-r border-[#062e23]/10 last:border-0">
            <div className="font-serif text-3xl font-bold text-[#062e23]">1,280+</div>
            <div className="text-xs font-semibold text-[#2d5a4c] uppercase tracking-wider mt-1">Jurnal Scientific</div>
          </div>
          <div className="text-center p-3 border-r border-[#062e23]/10 last:border-0">
            <div className="font-serif text-3xl font-bold text-[#062e23]">310</div>
            <div className="text-xs font-semibold text-[#2d5a4c] uppercase tracking-wider mt-1">Vokalisasi Akustik</div>
          </div>
          <div className="text-center p-3 border-r border-[#062e23]/10 last:border-0">
            <div className="font-serif text-3xl font-bold text-[#d4a373]">100%</div>
            <div className="text-xs font-semibold text-[#062e23] uppercase tracking-wider mt-1">Peer-Reviewed BRIN</div>
          </div>
        </div>
      </section>

      {/* Species Catalog Grid (Katalog Satwa) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#062e23]/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
              <Compass size={16} />
              <span>Eksplorasi Keanekaragaman Hayati</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] mt-1">
              Katalog Spesies Satwa Terproteksi
            </h2>
          </div>

          {/* Taxonomy Class Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {['ALL', 'MAMMALIA', 'AVES', 'REPTILIA'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedClass === cls
                    ? 'bg-[#062e23] text-[#f9faf6] shadow'
                    : 'bg-[#e8ede6] text-[#2d5a4c] hover:bg-[#062e23]/10'
                }`}
              >
                {cls === 'ALL' ? 'Semua Taksa' : cls}
              </button>
            ))}
          </div>
        </div>

        {/* Species Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#062e23]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Image & IUCN Badge Overlay */}
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={species.imageUrl}
                  alt={species.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

                {/* IUCN Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider ${iucnBadgeColor(species.iucnStatus)}`}>
                    {species.iucnStatus}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-medium">
                    {species.class}
                  </span>
                </div>

                {/* Audio vocalization play button */}
                {species.audioUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAudio(species.id);
                    }}
                    className={`absolute bottom-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs font-semibold ${
                      activeAudioId === species.id
                        ? 'bg-[#d4a373] text-[#062e23] ring-4 ring-[#d4a373]/30 scale-105'
                        : 'bg-[#062e23]/80 text-[#f9faf6] hover:bg-[#062e23]'
                    }`}
                    title="Dengarkan Suara Satwa"
                  >
                    {activeAudioId === species.id ? <Volume2 size={16} /> : <Volume2 size={16} />}
                    <span className="hidden sm:inline">Vokalisasi</span>
                  </button>
                )}
              </div>

              {/* Audio player active notice */}
              {activeAudioId === species.id && (
                <div className="bg-[#062e23] text-[#e8ede6] text-xs px-4 py-2 flex items-center justify-between border-t border-[#d4a373]/30">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-ping"></span>
                    <span className="truncate italic">{species.audioTitle}</span>
                  </div>
                  <audio autoPlay src={species.audioUrl} onEnded={() => setActiveAudioId(null)} />
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#2d5a4c] font-semibold italic">
                    {species.latinName}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#062e23] mt-0.5 group-hover:text-[#2d5a4c] transition-colors">
                    {species.commonName}
                  </h3>
                  <p className="text-xs text-[#062e23]/70 line-clamp-2 mt-2 leading-relaxed">
                    {species.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#062e23]/10">
                  <div className="flex items-center justify-between text-xs text-[#062e23]/80">
                    <span className="font-semibold text-[#2d5a4c]">Populasi Est:</span>
                    <span className="font-medium">{species.population}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#062e23]/80">
                    <span className="font-semibold text-[#2d5a4c]">Habitat Utama:</span>
                    <span className="truncate max-w-[170px]">{species.habitat}</span>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectSpecies(species)}
                      className="w-full bg-[#062e23] hover:bg-[#1a5948] text-[#f9faf6] text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Lihat Detail Spesies</span>
                      <ArrowRight size={14} />
                    </button>
                    
                    <button
                      onClick={() => onNavigateScreen('SCREEN_10')}
                      className="p-2.5 rounded-xl border border-[#062e23]/20 hover:bg-[#e8ede6] text-[#062e23] transition-colors"
                      title="Navigasi ke SCREEN_10"
                    >
                      <ExternalLink size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Journal Articles Section (Jurnal Ilmiah Terbaru) */}
      <section className="bg-[#e8ede6]/60 py-16 px-4 sm:px-6 lg:px-8 border-y border-[#062e23]/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
                <BookOpen size={16} />
                <span>Publikasi Sains Terakreditasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] mt-1">
                Jurnal & Riset Taksonomi Terbaru
              </h2>
            </div>

            <button
              onClick={() => onNavigateScreen('SCREEN_5')}
              className="bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>Buka Layar Baca Jurnal [SCREEN_5]</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {JOURNAL_ARTICLES.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigateScreen('SCREEN_5')}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#062e23]/10 text-[#062e23] text-xs font-semibold">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-[#2d5a4c]">
                      <ShieldCheck size={14} className="text-emerald-700" />
                      <span>Peer-Reviewed BRIN</span>
                      <span>•</span>
                      <span>DOI: {article.doi}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#062e23] group-hover:text-[#2d5a4c] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#062e23]/80 line-clamp-3 leading-relaxed">
                    {article.abstract}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#062e23]/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={article.authors[0].avatar}
                      alt={article.authors[0].name}
                      className="w-9 h-9 rounded-full object-cover border border-[#062e23]/20"
                    />
                    <div>
                      <div className="font-bold text-[#062e23]">{article.authors[0].name}</div>
                      <div className="text-[11px] text-[#2d5a4c]">{article.authors[0].institution}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[#062e23]/70 font-medium">
                    <span>{article.publishedDate}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#2d5a4c]">{article.citationsCount} Sitasi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
