import React, { useState } from 'react';
import { 
  Search, 
  Volume2, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
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
    <div className="space-y-10 sm:space-y-16 pb-16 sm:pb-20">

      {/* Hero Section with Mobile Optimized Padding & Typography */}
      <section className="relative overflow-hidden bg-[#062e23] text-[#f9faf6] py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#d4a373]/20 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 sm:w-96 h-72 sm:h-96 bg-[#2d5a4c]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-60 sm:w-80 h-60 sm:h-80 bg-[#d4a373]/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#1a5948]/70 border border-[#d4a373]/40 text-[#d4a373] text-[11px] sm:text-xs font-semibold tracking-wide max-w-full">
            <Sparkles size={13} className="shrink-0" />
            <span className="truncate">Pusat Data Biosistemasi & Konservasi Satwa</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-serif font-bold tracking-tight leading-tight text-[#f9faf6]">
            Dokumentasi Ilmiah & Jurnal Keanekaragaman Satwa
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#e8ede6]/90 max-w-3xl mx-auto font-sans leading-relaxed">
            Menghubungkan peneliti, akademisi, dan publik dengan taksonomi komprehensif, sebaran habitat, serta jurnal ilmiah terverifikasi.
          </p>

          {/* Responsive Search Bar */}
          <div className="pt-2 sm:pt-4 max-w-2xl mx-auto">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[#f9faf6] rounded-2xl shadow-2xl p-1.5 sm:p-2 border-2 border-[#d4a373]/40 focus-within:border-[#d4a373] transition-all gap-2">
              <div className="flex items-center flex-1 px-2">
                <Search className="text-[#2d5a4c] shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Cari harimau, orangutan, Panthera, Leucopsar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-2 text-[#062e23] placeholder-[#2d5a4c]/60 bg-transparent text-xs sm:text-sm focus:outline-none font-medium"
                />
              </div>
              <button 
                onClick={() => {}}
                className="bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1 shrink-0 shadow-sm"
              >
                <span>Cari Taksa</span>
                <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 text-[11px] text-[#b4d7cd]">
              <span className="font-semibold text-[#d4a373]">Populer:</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-[#e8ede6] p-4 sm:p-6 rounded-2xl border border-[#062e23]/10 shadow-sm text-center">
          <div className="p-2 border-r border-[#062e23]/10 sm:last:border-r-0">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#062e23]">740+</div>
            <div className="text-[10px] sm:text-xs font-semibold text-[#2d5a4c] uppercase tracking-wider mt-0.5">Spesies Satwa</div>
          </div>
          <div className="p-2 sm:border-r border-[#062e23]/10">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#062e23]">1,280+</div>
            <div className="text-[10px] sm:text-xs font-semibold text-[#2d5a4c] uppercase tracking-wider mt-0.5">Jurnal Riset</div>
          </div>
          <div className="p-2 border-r border-[#062e23]/10">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#062e23]">310</div>
            <div className="text-[10px] sm:text-xs font-semibold text-[#2d5a4c] uppercase tracking-wider mt-0.5">Vokalisasi</div>
          </div>
          <div className="p-2">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#d4a373]">100%</div>
            <div className="text-[10px] sm:text-xs font-semibold text-[#062e23] uppercase tracking-wider mt-0.5">Peer-Reviewed</div>
          </div>
        </div>
      </section>

      {/* Species Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#062e23]/10 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
              <Compass size={15} />
              <span>Eksplorasi Keanekaragaman Hayati</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#062e23] mt-0.5">
              Katalog Spesies Satwa Terproteksi
            </h2>
          </div>

          {/* Taxonomy Class Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['ALL', 'MAMMALIA', 'AVES', 'REPTILIA'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
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

        {/* Species Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#062e23]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-900">
                <img
                  src={species.imageUrl}
                  alt={species.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

                {/* IUCN Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wider ${iucnBadgeColor(species.iucnStatus)}`}>
                    {species.iucnStatus}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
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
                    className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-lg flex items-center gap-1 text-[11px] font-semibold ${
                      activeAudioId === species.id
                        ? 'bg-[#d4a373] text-[#062e23] ring-4 ring-[#d4a373]/30 scale-105'
                        : 'bg-[#062e23]/80 text-[#f9faf6] hover:bg-[#062e23]'
                    }`}
                  >
                    <Volume2 size={15} />
                    <span>Vokalisasi</span>
                  </button>
                )}
              </div>

              {/* Audio player active notice */}
              {activeAudioId === species.id && (
                <div className="bg-[#062e23] text-[#e8ede6] text-[11px] px-3.5 py-1.5 flex items-center justify-between border-t border-[#d4a373]/30">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-ping"></span>
                    <span className="truncate italic">{species.audioTitle}</span>
                  </div>
                  <audio autoPlay src={species.audioUrl} onEnded={() => setActiveAudioId(null)} />
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-[#2d5a4c] font-semibold italic">
                    {species.latinName}
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#062e23] mt-0.5 group-hover:text-[#2d5a4c] transition-colors">
                    {species.commonName}
                  </h3>
                  <p className="text-xs text-[#062e23]/70 line-clamp-2 mt-1.5 leading-relaxed">
                    {species.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#062e23]/10">
                  <div className="flex items-center justify-between text-xs text-[#062e23]/80">
                    <span className="font-semibold text-[#2d5a4c]">Populasi Est:</span>
                    <span className="font-medium truncate max-w-[150px]">{species.population}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onSelectSpecies(species)}
                      className="w-full bg-[#062e23] hover:bg-[#1a5948] text-[#f9faf6] text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Lihat Detail Spesies</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Journal Articles Section */}
      <section className="bg-[#e8ede6]/60 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-[#062e23]/10">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
                <BookOpen size={15} />
                <span>Publikasi Sains Terakreditasi</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#062e23] mt-0.5">
                Jurnal & Riset Taksonomi Terbaru
              </h2>
            </div>

            <button
              onClick={() => onNavigateScreen('SCREEN_5')}
              className="bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Buka Jurnal Ilmiah</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {JOURNAL_ARTICLES.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigateScreen('SCREEN_5')}
                className="bg-white rounded-2xl p-5 sm:p-8 border border-[#062e23]/10 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-3 sm:space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#062e23]/10 text-[#062e23] text-[11px] font-semibold">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#2d5a4c]">
                      <ShieldCheck size={13} className="text-emerald-700" />
                      <span>Peer-Reviewed</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#062e23] group-hover:text-[#2d5a4c] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#062e23]/80 line-clamp-3 leading-relaxed">
                    {article.abstract}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#062e23]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={article.authors[0].avatar}
                      alt={article.authors[0].name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#062e23]/20"
                    />
                    <div>
                      <div className="font-bold text-[#062e23] text-xs">{article.authors[0].name}</div>
                      <div className="text-[10px] sm:text-[11px] text-[#2d5a4c] truncate max-w-[180px]">{article.authors[0].institution}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#062e23]/70 font-medium">
                    <span>{article.publishedDate}</span>
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
