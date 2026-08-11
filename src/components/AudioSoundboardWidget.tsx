import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, X, Sparkles, Sliders } from 'lucide-react';
import { SPECIES_DATA, Species } from '../data/satwaData';
import { playSynthesizedVocalization } from '../utils/audioSynth';

interface AudioSoundboardWidgetProps {
  onSelectSpecies?: (species: Species) => void;
}

export const AudioSoundboardWidget: React.FC<AudioSoundboardWidgetProps> = ({ onSelectSpecies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSpeciesId, setActiveSpeciesId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSpecies = SPECIES_DATA.filter((s) => s.audioUrl || s.kingdom === 'Animalia');
  const activeSpecies = SPECIES_DATA.find((s) => s.id === activeSpeciesId) || audioSpecies[0];

  const handlePlaySpecies = (species: Species) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (activeSpeciesId === species.id && isPlaying) {
      setIsPlaying(false);
      setActiveSpeciesId(null);
    } else {
      setActiveSpeciesId(species.id);
      setIsPlaying(true);
      if (species.audioUrl) {
        const audio = new Audio(species.audioUrl);
        audio.volume = isMuted ? 0 : volume;
        audioRef.current = audio;
        audio.play().catch(() => {
          const cleanup = playSynthesizedVocalization(species.id);
          if (cleanup) setTimeout(() => setIsPlaying(false), 3500);
        });
        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
        };
      }
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.volume = nextMute ? 0 : volume;
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`shimmer-btn p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#062e23] to-[#1a5948] text-[#d4a373] shadow-2xl border border-[#d4a373]/30 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 ${
            isPlaying ? 'ring-4 ring-[#d4a373]/40' : ''
          }`}
          title="Soundboard Bioakustik Satwa"
        >
          <div className="relative">
            <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#d4a373] animate-ping" />
            )}
          </div>
          <span className="hidden sm:inline text-xs font-bold font-serif">Soundboard Bioakustik</span>
        </button>
      </div>

      {/* Soundboard Popover Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[400px] glass-card-dark rounded-3xl p-5 border border-white/20 shadow-2xl space-y-4 text-[#f9faf6] animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d4a373] to-[#c28e5c] text-[#062e23] flex items-center justify-center font-bold text-sm">
                🎙️
              </span>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#f9faf6]">Soundboard Bioakustik</h3>
                <p className="text-[10px] text-[#b4d7cd]/80">Vokalisasi & Rekaman Satwa Tropis</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/70 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Active Playing Info & Waveform */}
          {activeSpecies && (
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={activeSpecies.imageUrl}
                  alt={activeSpecies.commonName}
                  className="w-12 h-12 rounded-xl object-cover border border-[#d4a373]/40 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#d4a373] truncate">{activeSpecies.commonName}</div>
                  <div className="text-[11px] italic text-[#b4d7cd] truncate">{activeSpecies.latinName}</div>
                  <div className="text-[10px] text-white/60 truncate mt-0.5">{activeSpecies.audioTitle || 'Vokalisasi Teritorial'}</div>
                </div>

                <button
                  onClick={() => handlePlaySpecies(activeSpecies)}
                  className="w-10 h-10 rounded-xl bg-[#d4a373] text-[#062e23] flex items-center justify-center font-bold shadow-md hover:scale-105 transition-transform shrink-0"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
              </div>

              {/* Animated Waveform Visualizer */}
              {isPlaying && (
                <div className="flex items-center justify-center gap-1 h-8 pt-1">
                  {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 35, 75, 65, 85, 40].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-gradient-to-t from-[#d4a373] to-[#e8c9a4] rounded-full inline-block waveform-bar"
                      style={{
                        height: `${Math.max(20, (h * Math.random()) % 100)}%`,
                        animationDelay: `${(i % 5) * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Volume Slider */}
              <div className="flex items-center gap-2 pt-1">
                <button onClick={toggleMute} className="text-[#d4a373] hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d4a373]"
                />
                <span className="text-[10px] font-mono text-white/60">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
              </div>
            </div>
          )}

          {/* Soundboard Buttons Grid */}
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
            <div className="text-[10px] font-bold text-[#d4a373] uppercase tracking-wider px-1 mb-1">
              Pilih Vokalisasi Satwa:
            </div>
            {audioSpecies.map((sp) => {
              const isSelected = activeSpeciesId === sp.id;
              return (
                <div
                  key={sp.id}
                  onClick={() => handlePlaySpecies(sp)}
                  className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected && isPlaying
                      ? 'bg-[#d4a373] text-[#062e23] border-[#d4a373] font-bold shadow-md'
                      : 'bg-white/5 hover:bg-white/12 border-white/10 text-white/90'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-sm shrink-0">{sp.class === 'Aves' ? '🐦' : sp.class === 'Mammalia' ? '🐾' : '🐊'}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">{sp.commonName}</div>
                      <div className={`text-[10px] italic truncate ${isSelected && isPlaying ? 'text-[#062e23]/80' : 'text-[#b4d7cd]/70'}`}>
                        {sp.latinName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isSelected && isPlaying ? (
                      <span className="text-[10px] font-mono font-bold animate-pulse">▶ PLAYING</span>
                    ) : (
                      <Play size={12} className="opacity-60" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
