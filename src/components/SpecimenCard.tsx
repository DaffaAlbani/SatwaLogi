import React, { useState, useRef } from 'react';
import { Volume2, ArrowRight, ShieldAlert, Sparkles, MapPin, Activity } from 'lucide-react';
import { Species } from '../data/satwaData';
import { playSynthesizedVocalization } from '../utils/audioSynth';

interface SpecimenCardProps {
  species: Species;
  onSelect: (species: Species) => void;
  index?: number;
  featured?: boolean;
}

export const SpecimenCard: React.FC<SpecimenCardProps> = ({
  species,
  onSelect,
  index = 0,
  featured = false
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if (species.audioUrl) {
        const audio = new Audio(species.audioUrl);
        audioRef.current = audio;
        audio.play().catch(() => {
          const cleanup = playSynthesizedVocalization(species.id);
          if (cleanup) setTimeout(() => setIsPlayingAudio(false), 3000);
        });
        audio.onended = () => {
          setIsPlayingAudio(false);
          audioRef.current = null;
        };
      } else {
        const cleanup = playSynthesizedVocalization(species.id);
        if (cleanup) setTimeout(() => setIsPlayingAudio(false), 3000);
      }
    }
  };

  const isFauna = species.kingdom === 'Animalia';
  const iucnBadgeClass = `iucn-badge iucn-badge--${species.iucnStatus}`;

  return (
    <div
      onClick={() => onSelect(species)}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-[#062e23]/10 ${
        featured ? 'sm:col-span-2 sm:row-span-2' : ''
      }`}
      style={{
        background: isFauna
          ? 'linear-gradient(165deg, #ffffff 0%, #fdfbf7 60%, #f9faf6 100%)'
          : 'linear-gradient(165deg, #ffffff 0%, #f2f8f4 60%, #f9faf6 100%)'
      }}
    >
      {/* Top Image Box with Shimmer Beam */}
      <div className={`relative overflow-hidden ${featured ? 'h-72 sm:h-96' : 'h-60 sm:h-64'}`}>
        <img
          src={species.imageUrl}
          alt={species.commonName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = isFauna
              ? 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80'
              : 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Shimmer Beam Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Vignette Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062e23]/85 via-[#062e23]/20 to-transparent" />

        {/* Top Badges Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className={iucnBadgeClass}>{species.iucnStatus}</span>
            <span className="px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md text-[#d4a373] text-[10px] font-bold border border-[#d4a373]/30 tracking-wide uppercase">
              {isFauna ? `🐾 ${species.class}` : `🌿 ${species.family}`}
            </span>
          </div>

          {/* Endemic Flag Badge */}
          <span className="px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
            Endemik IDN 🇮🇩
          </span>
        </div>

        {/* Floating Audio Button on Image */}
        {species.audioUrl && (
          <button
            onClick={toggleAudio}
            className={`absolute bottom-3.5 right-3.5 p-2.5 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 text-xs font-bold ${
              isPlayingAudio
                ? 'bg-[#d4a373] text-[#062e23] ring-4 ring-[#d4a373]/40 scale-105'
                : 'bg-black/50 hover:bg-black/80 text-white border border-white/20'
            }`}
            title="Dengarkan Suara Satwa"
          >
            <Volume2 size={15} />
            {isPlayingAudio ? (
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono font-bold">SUARA LIVE</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4].map((n) => (
                    <span key={n} className="waveform-bar w-0.5 bg-[#062e23] rounded-full inline-block" />
                  ))}
                </div>
              </div>
            ) : (
              <span className="hidden sm:inline text-[11px]">Dengar Suara</span>
            )}
          </button>
        )}

        {/* Latin Nomenklatur overlay on image bottom */}
        <div className="absolute bottom-3.5 left-3.5 pointer-events-none pr-16">
          <div className="text-white/80 font-serif italic text-xs font-medium tracking-wide drop-shadow-sm truncate">
            {species.latinName}
          </div>
        </div>
      </div>

      {/* Decorative Accent Separator Line */}
      <div className={`h-1 w-full bg-gradient-to-r ${isFauna ? 'from-[#d4a373] via-[#c28e5c] to-[#2d5a4c]' : 'from-[#2d5a4c] via-[#3d7867] to-[#d4a373]'}`} />

      {/* Card Body Content */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#062e23] group-hover:text-[#d4a373] transition-colors duration-300">
              {species.commonName}
            </h3>
          </div>

          <p className="text-xs text-[#062e23]/75 line-clamp-2 leading-relaxed font-sans">
            {species.description}
          </p>
        </div>

        {/* Key Attributes Strip */}
        <div className="space-y-3 pt-3 border-t border-[#062e23]/8">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-black/5 p-2 rounded-xl border border-[#062e23]/5">
              <span className="text-[#2d5a4c]/70 font-semibold block text-[9px] uppercase tracking-wider">
                {isFauna ? 'Est. Populasi' : 'Nutrisi & Tipe'}
              </span>
              <span className="font-bold text-[#062e23] truncate block mt-0.5">
                {isFauna ? species.population : species.diet.split(':')[0]}
              </span>
            </div>

            <div className="bg-black/5 p-2 rounded-xl border border-[#062e23]/5">
              <span className="text-[#2d5a4c]/70 font-semibold block text-[9px] uppercase tracking-wider">
                Lanskap Utama
              </span>
              <span className="font-bold text-[#062e23] truncate block mt-0.5">
                {species.distributionRegion[0]}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(species);
            }}
            className={`shimmer-btn w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md ${
              isFauna
                ? 'bg-[#062e23] group-hover:bg-[#1a5948] text-[#d4a373]'
                : 'bg-emerald-900 group-hover:bg-emerald-800 text-white'
            }`}
          >
            <span>Buka Specimen Detail</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
