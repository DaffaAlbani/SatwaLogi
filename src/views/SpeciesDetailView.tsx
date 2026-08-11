import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  Share2, 
  ArrowLeft, 
  Layers,
  Sparkles,
  Info,
  ArrowRight
} from 'lucide-react';
import { Species, SPECIES_DATA } from '../data/satwaData';
import { playSynthesizedVocalization } from '../utils/audioSynth';

interface SpeciesDetailViewProps {
  selectedSpecies?: Species;
  onNavigateScreen: (screenId: string) => void;
  onSelectSpecies?: (species: Species) => void;
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

export const SpeciesDetailView: React.FC<SpeciesDetailViewProps> = ({ 
  selectedSpecies = SPECIES_DATA[0], 
  onNavigateScreen,
  onSelectSpecies
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const synthCleanupRef = useRef<(() => void) | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useScrollReveal();

  const toggleDetailAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (synthCleanupRef.current) { synthCleanupRef.current(); synthCleanupRef.current = null; }

    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if (selectedSpecies.audioUrl) {
        const audio = new Audio(selectedSpecies.audioUrl);
        audioRef.current = audio;
        audio.play().catch(() => {
          const cleanup = playSynthesizedVocalization(selectedSpecies.id);
          if (cleanup) synthCleanupRef.current = cleanup;
          setTimeout(() => setIsPlayingAudio(false), 3000);
        });
        audio.onended = () => { setIsPlayingAudio(false); audioRef.current = null; };
      }
    }
  };

  const species = selectedSpecies;
  const otherSpecies = SPECIES_DATA.filter((sp) => sp.id !== species.id);

  const taxonomyList = [
    { level: 'Kerajaan (Kingdom)', value: species.kingdom },
    { level: 'Filum (Phylum)', value: species.phylum },
    { level: 'Kelas (Class)', value: species.class },
    { level: 'Ordo (Order)', value: species.order },
    { level: 'Famili (Family)', value: species.family },
    { level: 'Genus', value: species.genus, italic: true },
    { level: 'Spesies', value: species.latinName, italic: true },
  ];

  const iucnLevels = [
    { code: 'EX', label: 'Punas' },
    { code: 'EW', label: 'Punas Alam' },
    { code: 'CR', label: 'Kritis' },
    { code: 'EN', label: 'Terancam' },
    { code: 'VU', label: 'Rentan' },
    { code: 'NT', label: 'Hampir' },
    { code: 'LC', label: 'Rendah' },
  ];

  const iucnColors: Record<string, string> = {
    EX: 'bg-gray-800', EW: 'bg-gray-700',
    CR: 'bg-gradient-to-r from-red-600 to-red-700', EN: 'bg-gradient-to-r from-orange-500 to-orange-600',
    VU: 'bg-gradient-to-r from-yellow-500 to-yellow-600', NT: 'bg-gradient-to-r from-lime-500 to-lime-600',
    LC: 'bg-gradient-to-r from-green-500 to-green-600'
  };

  return (
    <div ref={containerRef} className="space-y-8 sm:space-y-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 pt-6">
        {/* Back & Quick Selector */}
        <div className="reveal flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-card p-3.5 rounded-2xl">
          <button
            onClick={() => onNavigateScreen('SCREEN_10')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5a4c] hover:text-[#062e23] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Katalog</span>
          </button>

          <div className="flex items-center gap-2">
            <select
              value={species.id}
              onChange={(e) => {
                const found = SPECIES_DATA.find((s) => s.id === e.target.value);
                if (found && onSelectSpecies) {
                  onSelectSpecies(found);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="input-glow bg-white text-[#062e23] text-xs font-bold px-3 py-2 rounded-xl focus:outline-none cursor-pointer max-w-[220px] sm:max-w-full"
            >
              <optgroup label="🌿 FLORA">
                {SPECIES_DATA.filter(s => s.kingdom === 'Plantae').map(s => (
                  <option key={s.id} value={s.id}>🌿 {s.commonName} ({s.latinName})</option>
                ))}
              </optgroup>
              <optgroup label="🐾 FAUNA">
                {SPECIES_DATA.filter(s => s.kingdom === 'Animalia').map(s => (
                  <option key={s.id} value={s.id}>🐾 {s.commonName} ({s.latinName})</option>
                ))}
              </optgroup>
            </select>

            <button className="p-2 rounded-xl bg-white border border-[#062e23]/10 hover:bg-[#e8ede6] text-[#062e23] transition-all shadow-sm shrink-0">
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* ═══ Hero Species Banner ═══ */}
        <div className="reveal bg-white rounded-3xl overflow-hidden border border-[#062e23]/8 shadow-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Image */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 lg:min-h-[500px] overflow-hidden bg-slate-900">
            <img
              src={species.imageUrl}
              alt={species.commonName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = species.kingdom === 'Plantae'
                  ? 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1574063413132-355dbfd83e0c?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`iucn-badge iucn-badge--${species.iucnStatus}`}>
                  IUCN: {species.iucnStatus}
                </span>
                <span className="bg-black/50 backdrop-blur-md text-white/90 text-[10px] px-2.5 py-0.5 rounded-lg font-medium">
                  {species.englishName}
                </span>
              </div>
              <p className="text-[11px] text-[#b4d7cd] italic truncate">{species.audioTitle}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-6 flex flex-col justify-between bg-[#f9faf6]">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#d4a373]">
                  Nomenklatur Biologi & Taksa
                </div>
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#062e23] mt-1">{species.commonName}</h1>
                <div className="text-base sm:text-lg scientific-name text-[#2d5a4c]/80 mt-0.5">{species.latinName}</div>
              </div>

              <p className="text-xs sm:text-sm text-[#062e23]/70 leading-relaxed font-sans">{species.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                {[
                  { label: 'Populasi Alam', value: species.population },
                  { label: 'Habitat Utama', value: species.habitat },
                  { label: species.kingdom === 'Plantae' ? 'Nutrisi' : 'Jenis Makanan', value: species.diet },
                ].map((info, i) => (
                  <div key={i} className={`glass-card p-3.5 rounded-xl ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                    <div className="text-[#2d5a4c]/60 font-bold text-[10px] uppercase tracking-wider">{info.label}</div>
                    <div className="font-semibold text-[#062e23] text-xs mt-1 truncate">{info.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Player */}
            {species.audioUrl && species.kingdom !== 'Plantae' && (
              <div className="glass-card-dark p-4 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a373] to-[#c28e5c] text-[#062e23] flex items-center justify-center font-bold shrink-0 shadow-md">
                    <Volume2 size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#d4a373]">Bioakustik Vokalisasi</div>
                    <div className="text-[11px] italic text-[#b4d7cd]/70 truncate max-w-[240px]">{species.audioTitle}</div>
                  </div>
                </div>
                <button
                  onClick={toggleDetailAudio}
                  className="shimmer-btn px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a373] to-[#e8c9a4] text-[#062e23] text-xs font-bold transition-all duration-300 shrink-0 shadow-sm hover:shadow-md"
                >
                  {isPlayingAudio ? 'Jeda Suara' : 'Putar Vokalisasi'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ═══ IUCN Conservation Meter ═══ */}
        <section className="reveal glass-card rounded-2xl p-5 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4a373] uppercase tracking-widest">
            <ShieldAlert size={16} />
            <span>Status Konservasi IUCN</span>
          </div>

          {/* Horizontal meter bar */}
          <div className="relative">
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-7 gap-2 no-scrollbar pb-1">
              {iucnLevels.map((lvl) => {
                const isActive = species.iucnStatus === lvl.code;
                return (
                  <div
                    key={lvl.code}
                    className={`relative p-3 sm:p-4 rounded-xl text-center transition-all duration-500 shrink-0 w-24 sm:w-auto ${
                      isActive
                        ? `${iucnColors[lvl.code]} text-white shadow-lg ring-2 ring-white/20 scale-105`
                        : 'bg-[#e8ede6]/40 text-[#062e23]/40 border border-[#062e23]/5'
                    }`}
                  >
                    <div className={`text-sm sm:text-lg font-black ${isActive ? '' : ''}`}>{lvl.code}</div>
                    <div className="text-[9px] sm:text-[10px] mt-0.5 leading-tight font-semibold">{lvl.label}</div>
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white shadow-md animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#f9faf6] p-4 rounded-xl border border-[#062e23]/6 text-xs text-[#062e23]/70">
            <Info size={16} className="text-[#d4a373] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#062e23]">Kategori {species.iucnStatus}:</strong> {species.iucnLabel}. Berada dalam pengawasan BKSDA dan Kementerian LHK.
            </span>
          </div>
        </section>

        {/* ═══ Taxonomy & Distribution Grid ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Taxonomy */}
          <div className="reveal lg:col-span-5 glass-card rounded-2xl p-5 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4a373] uppercase tracking-widest pb-3 border-b border-[#062e23]/6">
              <Layers size={16} />
              <span>Hierarki Taksonomi</span>
            </div>

            {/* Vertical tree-style */}
            <div className="space-y-0">
              {taxonomyList.map((item, idx) => (
                <div key={item.level} className="flex items-stretch">
                  {/* Tree line */}
                  <div className="flex flex-col items-center mr-3 shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${idx === taxonomyList.length - 1 ? 'bg-[#d4a373]' : 'bg-[#2d5a4c]/30'} border-2 ${idx === taxonomyList.length - 1 ? 'border-[#d4a373]' : 'border-[#e8ede6]'}`} />
                    {idx < taxonomyList.length - 1 && <div className="w-px flex-1 bg-[#062e23]/10" />}
                  </div>
                  <div className="flex items-center justify-between flex-1 py-2.5 text-xs">
                    <span className="font-semibold text-[#2d5a4c]/70">{item.level}</span>
                    <span className={`font-bold ${item.italic ? 'italic text-[#062e23]' : 'text-[#062e23]'}`}>
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Physical Characteristics */}
            <div className="pt-3 border-t border-[#062e23]/6 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#062e23]">Karakteristik Fisik</h4>
              <ul className="space-y-2 text-xs text-[#062e23]/70">
                {species.physicalCharacteristics.map((char, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-[#d4a373] shrink-0 mt-0.5" />
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Distribution & Threats */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Distribution */}
            <div className="reveal glass-card rounded-2xl p-5 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4a373] uppercase tracking-widest pb-3 border-b border-[#062e23]/6">
                <MapPin size={16} />
                <span>Sebaran Geografis Habitat</span>
              </div>

              <div className="glass-card-dark rounded-xl p-4 sm:p-6 space-y-4">
                <div className="text-[11px] font-bold text-[#d4a373] uppercase tracking-widest">
                  Lanskap Ekosistem Kritis
                </div>
                <div className="flex flex-wrap gap-2">
                  {species.distributionRegion.map((region, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-white/8 text-[#e8ede6] text-xs font-medium border border-white/10 flex items-center gap-1.5 hover:bg-white/15 transition-all">
                      <MapPin size={12} className="text-[#d4a373]" />
                      <span>{region}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Threats & Conservation */}
            <div className="reveal glass-card rounded-2xl p-5 sm:p-8 space-y-5">
              <div>
                <h4 className="font-serif text-sm font-bold text-red-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldAlert size={16} />
                  <span>Faktor Ancaman Utama</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {species.threats.map((threat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-red-50/80 border border-red-200/50 text-xs text-red-900 font-medium flex items-start gap-2">
                      <span className="text-red-400 shrink-0 mt-0.5">•</span>
                      <span>{threat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gradient-line" />

              <div>
                <h4 className="font-serif text-sm font-bold text-[#062e23] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#d4a373]" />
                  <span>Upaya Konservasi</span>
                </h4>
                <p className="text-xs text-[#062e23]/70 glass-card p-4 rounded-xl leading-relaxed">
                  {species.conservationEfforts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Explore Others ═══ */}
        <section className="reveal pt-8 space-y-5">
          <div className="gradient-line" />
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="text-[11px] font-bold text-[#d4a373] uppercase tracking-widest">Keanekaragaman Hayati</div>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#062e23]">Jelajahi Spesies Lainnya</h3>
            </div>
            <button
              onClick={() => onNavigateScreen('SCREEN_10')}
              className="text-xs font-bold text-[#2d5a4c] hover:text-[#062e23] flex items-center gap-1 transition-colors"
            >
              Lihat Semua ({SPECIES_DATA.length})
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {otherSpecies.slice(0, 8).map((sp, idx) => (
              <div
                key={sp.id}
                onClick={() => {
                  if (onSelectSpecies) onSelectSpecies(sp);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`reveal-scale stagger-${Math.min((idx % 6) + 1, 6)} specimen-card p-3 flex flex-col group cursor-pointer`}
              >
                <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={sp.imageUrl}
                    alt={sp.commonName}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded-md font-medium">
                    {sp.kingdom === 'Plantae' ? '🌿' : '🐾'}
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="text-[10px] text-[#2d5a4c]/60 italic font-semibold truncate">{sp.latinName}</div>
                  <h4 className="text-xs font-bold font-serif text-[#062e23] truncate group-hover:text-[#d4a373] transition-colors duration-300">{sp.commonName}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
