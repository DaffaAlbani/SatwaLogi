import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Compass, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Filter,
  RefreshCw
} from 'lucide-react';
import { SPECIES_DATA, Species } from '../data/satwaData';
import { SpecimenCard } from '../components/SpecimenCard';

interface SpeciesCatalogViewProps {
  onSelectSpecies: (species: Species) => void;
  onNavigateScreen: (screenId: string) => void;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    el.querySelectorAll('.reveal, .reveal-scale').forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export const SpeciesCatalogView: React.FC<SpeciesCatalogViewProps> = ({
  onSelectSpecies,
  onNavigateScreen
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const containerRef = useScrollReveal();

  const filteredSpecies = SPECIES_DATA.filter((species) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      species.commonName.toLowerCase().includes(query) ||
      species.latinName.toLowerCase().includes(query) ||
      species.family.toLowerCase().includes(query) ||
      species.description.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    switch (selectedCategory) {
      case 'FAUNA':
        return species.kingdom === 'Animalia';
      case 'FLORA':
        return species.kingdom === 'Plantae';
      case 'MAMMALIA':
        return species.class === 'Mammalia';
      case 'AVES':
        return species.class === 'Aves';
      case 'REPTILIA':
        return species.class === 'Reptilia';
      case 'MAGNOLIOPSIDA':
        return species.class === 'Magnoliopsida' || species.class === 'Liliopsida';
      default:
        return true;
    }
  });

  const categories = [
    { id: 'ALL', label: 'Semua Taksa', icon: '🌿' },
    { id: 'FAUNA', label: 'Fauna (Satwa)', icon: '🐾' },
    { id: 'FLORA', label: 'Flora (Tumbuhan)', icon: '🌱' },
    { id: 'MAMMALIA', label: 'Mamalia', icon: '🐅' },
    { id: 'AVES', label: 'Avifauna (Burung)', icon: '🐦' },
    { id: 'REPTILIA', label: 'Reptilia', icon: '🐊' },
    { id: 'MAGNOLIOPSIDA', label: 'Tumbuhan Bunga', icon: '🌺' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen space-y-8 pb-20 pt-4">
      {/* ═══ Header Section ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-gradient rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl text-[#f9faf6]">
          <div className="hero-particles" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#d4a373]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card-dark text-[#d4a373] text-xs font-semibold uppercase tracking-widest border border-[#d4a373]/30">
              <Compass size={14} />
              <span>Katalog Taksonomi Terproteksi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              Ensiklopedia Taksa Nusantara
            </h1>

            <p className="text-xs sm:text-sm text-[#e8ede6]/80 leading-relaxed max-w-2xl font-sans">
              Jelajahi spesimen flora & fauna tropis terlindungi dengan status IUCN Red List, rekaman bioakustik vokalisasi, dan pemetaan biogeografi.
            </p>

            {/* Search Input Box */}
            <div className="pt-2 max-w-xl">
              <div className="relative glass-card rounded-2xl p-2 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 px-3">
                  <Search size={18} className="text-[#2d5a4c] shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari taksa: 'Harimau', 'Pongo', 'Ornitologi', 'Aves'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 text-[#062e23] placeholder-[#2d5a4c]/50 bg-transparent text-xs sm:text-sm focus:outline-none font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-bold text-[#2d5a4c] hover:bg-[#e8ede6] px-2 py-1 rounded-lg"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Main Content Grid ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills Slider */}
        <div className="reveal flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#062e23] text-[#d4a373] shadow-md scale-105 border border-[#d4a373]/30'
                    : 'glass-card text-[#062e23] hover:bg-[#e8ede6]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="reveal flex items-center justify-between text-xs font-semibold text-[#2d5a4c]">
          <div>
            Menampilkan <strong>{filteredSpecies.length}</strong> dari <strong>{SPECIES_DATA.length}</strong> spesimen terdaftar
          </div>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="text-[#062e23] hover:underline flex items-center gap-1"
            >
              <RefreshCw size={13} /> Clear filter
            </button>
          )}
        </div>

        {/* Grid Cards Container */}
        {filteredSpecies.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#e8ede6] text-[#062e23] flex items-center justify-center text-3xl mx-auto">
              🔍
            </div>
            <h3 className="text-lg font-serif font-bold text-[#062e23]">Tidak ada taksa yang cocok</h3>
            <p className="text-xs text-[#2d5a4c]">
              Coba cari dengan kata kunci lain atau pilih kategori "Semua Taksa".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSpecies.map((species, idx) => (
              <div key={species.id} className={`reveal-scale stagger-${Math.min((idx % 6) + 1, 6)}`}>
                <SpecimenCard species={species} onSelect={onSelectSpecies} index={idx} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
