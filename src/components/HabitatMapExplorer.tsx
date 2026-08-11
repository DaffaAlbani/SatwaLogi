import React, { useState } from 'react';
import { MapPin, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { SPECIES_DATA, Species } from '../data/satwaData';

interface RegionData {
  id: string;
  name: string;
  island: string;
  color: string;
  bgGradient: string;
  icon: string;
  description: string;
}

const REGIONS: RegionData[] = [
  { id: 'sumatra', name: 'Lanskap Ekosistem Sumatra', island: 'Sumatra', color: 'text-amber-800', bgGradient: 'from-amber-100 to-amber-50', icon: '🐅', description: 'Hutan hujan tropis dataran rendah, Leuser, Batang Toru, & Bukit Barisan Selatan.' },
  { id: 'kalimantan', name: 'Lanskap Jantung Borneo', island: 'Kalimantan', color: 'text-emerald-800', bgGradient: 'from-emerald-100 to-emerald-50', icon: '🦧', description: 'Hutan gambut dan koridor vegetasi alam tempat berkembangnya primata langka & flora kayu aromatik.' },
  { id: 'papua', name: 'Kawasan Konservasi Papua', island: 'Papua', color: 'text-[#d4a373]', bgGradient: 'from-amber-900/20 to-amber-800/10', icon: '🦜', description: 'Hutan hujan dataran tinggi, Pegunungan Arfak, Lorentz, & avifauna Cendrawasih endemik.' },
  { id: 'sulawesi', name: 'Zona Wallacea Sulawesi', island: 'Sulawesi', color: 'text-purple-900', bgGradient: 'from-purple-100 to-purple-50', icon: '🐃', description: 'Garis transisi biogeografi unik Wallacea yang dihuni oleh Anoa, Babirusa, & Maleo.' },
  { id: 'jawa', name: 'Kawasan Konservasi Jawa & Bali', island: 'Jawa & Bali', color: 'text-blue-900', bgGradient: 'from-blue-100 to-blue-50', icon: '🦏', description: 'Taman Nasional Ujung Kulon, Meru Betiri, & Taman Nasional Bali Barat.' },
  { id: 'nusa_tenggara', name: 'Kepulauan Komodo & Sunda Kecil', island: 'Nusa Tenggara', color: 'text-orange-900', bgGradient: 'from-orange-100 to-orange-50', icon: '🦎', description: 'Savana dan pulau-pulau vulkanik habitat asli kadal raksasa purba Komodo.' },
];

interface HabitatMapExplorerProps {
  onSelectSpecies: (species: Species) => void;
}

export const HabitatMapExplorer: React.FC<HabitatMapExplorerProps> = ({ onSelectSpecies }) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('sumatra');

  const selectedRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];

  const matchedSpecies = SPECIES_DATA.filter((sp) =>
    sp.distributionRegion.some((r) =>
      r.toLowerCase().includes(selectedRegion.island.toLowerCase()) ||
      r.toLowerCase().includes(selectedRegion.id.toLowerCase())
    )
  );

  return (
    <section className="glass-card rounded-3xl p-6 sm:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#062e23]/8 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4a373] uppercase tracking-widest">
            <Compass size={16} />
            <span>Sebaran Geografis Bio-Wilayah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] mt-1">
            Peta Habitat & Koridor Ekosistem Tropis
          </h2>
        </div>
        <div className="text-xs text-[#2d5a4c]/70 font-semibold">
          Pilih pulau/lanskap untuk memfilter taksa spesies endemik
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {REGIONS.map((reg) => {
          const isActive = reg.id === selectedRegionId;
          const count = SPECIES_DATA.filter((sp) =>
            sp.distributionRegion.some((r) =>
              r.toLowerCase().includes(reg.island.toLowerCase()) ||
              r.toLowerCase().includes(reg.id.toLowerCase())
            )
          ).length;

          return (
            <button
              key={reg.id}
              onClick={() => setSelectedRegionId(reg.id)}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2 ${
                isActive
                  ? 'bg-[#062e23] text-[#d4a373] border-[#062e23] shadow-lg scale-[1.02]'
                  : 'bg-white hover:bg-[#e8ede6]/60 border-[#062e23]/10 text-[#062e23]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{reg.icon}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-[#d4a373] text-[#062e23]' : 'bg-[#e8ede6] text-[#2d5a4c]'
                }`}>
                  {count} Taksa
                </span>
              </div>
              <div>
                <div className="text-xs font-bold font-serif">{reg.island}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Region Info & Matched Species Grid */}
      <div className="space-y-4 pt-2">
        <div className="glass-card-dark p-5 rounded-2xl text-[#f9faf6] space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="text-[#d4a373]" size={18} />
            <h3 className="font-serif font-bold text-base text-[#d4a373]">{selectedRegion.name}</h3>
          </div>
          <p className="text-xs text-[#b4d7cd] leading-relaxed font-sans">{selectedRegion.description}</p>
        </div>

        {/* Species Card Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchedSpecies.slice(0, 3).map((sp) => (
            <div
              key={sp.id}
              onClick={() => onSelectSpecies(sp)}
              className="specimen-card p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer group"
            >
              <img
                src={sp.imageUrl}
                alt={sp.commonName}
                className="w-16 h-16 rounded-xl object-cover border border-[#062e23]/10 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] text-[#2d5a4c] font-bold uppercase tracking-wider">{sp.iucnStatus} • {sp.class}</div>
                <h4 className="text-sm font-bold font-serif text-[#062e23] truncate group-hover:text-amber-800 transition-colors">
                  {sp.commonName}
                </h4>
                <div className="text-xs italic text-[#2d5a4c]/70 truncate">{sp.latinName}</div>
              </div>
              <ArrowRight size={14} className="text-[#2d5a4c] group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
