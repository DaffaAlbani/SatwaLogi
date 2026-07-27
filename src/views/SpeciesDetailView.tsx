import React, { useState } from 'react';
import { 
  Volume2, 
  MapPin, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Share2, 
  ArrowLeft, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Species, SPECIES_DATA } from '../data/satwaData';

interface SpeciesDetailViewProps {
  selectedSpecies?: Species;
  onNavigateScreen: (screenId: string) => void;
}

export const SpeciesDetailView: React.FC<SpeciesDetailViewProps> = ({ 
  selectedSpecies = SPECIES_DATA[0], 
  onNavigateScreen 
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'TAKSONOMI' | 'SEBARAN' | 'STATUS'>('TAKSONOMI');

  const species = selectedSpecies;

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
    { code: 'EX', name: 'Extinct', label: 'Punas' },
    { code: 'EW', name: 'Extinct in Wild', label: 'Punas di Alam' },
    { code: 'CR', name: 'Critically Endangered', label: 'Kritis' },
    { code: 'EN', name: 'Endangered', label: 'Terguncang' },
    { code: 'VU', name: 'Vulnerable', label: 'Rentan' },
    { code: 'NT', name: 'Near Threatened', label: 'Hampir Terancam' },
    { code: 'LC', name: 'Least Concern', label: 'Risiko Rendah' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* SCREEN_10 Identifier Watermark Badge */}
      <div className="bg-[#062e23] text-[#d4a373] text-[11px] font-mono py-1 px-4 text-center border-b border-[#d4a373]/30">
        [SCREEN_10] Satwalogi - Detail Spesies (Taxonomy & Distribution)
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigateScreen('SCREEN_13')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2d5a4c] hover:text-[#062e23] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda Katalog Satwa [SCREEN_13]</span>
          </button>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#062e23]/20 hover:bg-[#e8ede6] text-xs font-semibold text-[#062e23] flex items-center gap-1.5">
              <Share2 size={14} />
              <span>Bagikan Spesies</span>
            </button>
          </div>
        </div>

        {/* Hero Species Banner Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#062e23]/10 shadow-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Image Side */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-[500px] bg-slate-900">
            <img
              src={species.imageUrl}
              alt={species.commonName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#d90429] text-white text-xs font-bold uppercase tracking-wider">
                  Status IUCN: {species.iucnStatus}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs font-medium">
                  {species.englishName}
                </span>
              </div>
              <p className="text-xs text-[#b4d7cd] italic">
                {species.audioTitle}
              </p>
            </div>
          </div>

          {/* Species Meta Side */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-[#f9faf6]">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-[#2d5a4c]">
                  Nomenklatur Biologi & Taksa
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#062e23]">
                  {species.commonName}
                </h1>
                <div className="text-lg font-serif italic text-[#2d5a4c] font-semibold">
                  {species.latinName}
                </div>
              </div>

              <p className="text-sm text-[#062e23]/80 leading-relaxed font-sans">
                {species.description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#062e23]/10 text-xs">
                <div className="bg-[#e8ede6] p-3 rounded-xl">
                  <div className="text-[#2d5a4c] font-bold">Populasi Alam</div>
                  <div className="font-semibold text-[#062e23] mt-0.5">{species.population}</div>
                </div>

                <div className="bg-[#e8ede6] p-3 rounded-xl">
                  <div className="text-[#2d5a4c] font-bold">Habitat Utama</div>
                  <div className="font-semibold text-[#062e23] mt-0.5">{species.habitat}</div>
                </div>

                <div className="bg-[#e8ede6] p-3 rounded-xl col-span-2 sm:col-span-1">
                  <div className="text-[#2d5a4c] font-bold">Jenis Makanan</div>
                  <div className="font-semibold text-[#062e23] mt-0.5 truncate">{species.diet}</div>
                </div>
              </div>
            </div>

            {/* Vocalization Audio Player Bar */}
            {species.audioUrl && (
              <div className="bg-[#062e23] text-[#e8ede6] p-4 rounded-2xl flex items-center justify-between gap-4 border border-[#d4a373]/30 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4a373] text-[#062e23] flex items-center justify-center font-bold">
                    <Volume2 size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#d4a373]">Pemutar Akustik Vokalisasi Satwa</div>
                    <div className="text-xs italic text-[#b4d7cd] truncate max-w-[280px]">
                      {species.audioTitle}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="px-4 py-2 rounded-xl bg-[#d4a373] text-[#062e23] text-xs font-bold hover:bg-white transition-colors shrink-0"
                >
                  {isPlayingAudio ? 'Jeda Audio' : 'Putar Vokalisasi'}
                </button>

                {isPlayingAudio && <audio autoPlay src={species.audioUrl} onEnded={() => setIsPlayingAudio(false)} />}
              </div>
            )}
          </div>
        </div>

        {/* IUCN Conservation Status Visual Scale */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
            <ShieldAlert size={16} />
            <span>Meter Status Konservasi IUCN (Red List Index)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
            {iucnLevels.map((lvl) => {
              const isActive = species.iucnStatus === lvl.code;
              return (
                <div
                  key={lvl.code}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    isActive
                      ? 'bg-[#062e23] text-[#d4a373] border-[#d4a373] ring-2 ring-[#d4a373]/50 font-bold scale-105 shadow-md'
                      : 'bg-[#e8ede6]/50 text-[#062e23]/6-[#2d5a4c] border-[#062e23]/10 opacity-60'
                  }`}
                >
                  <div className="text-base font-extrabold">{lvl.code}</div>
                  <div className="text-[10px] mt-0.5 leading-tight">{lvl.label}</div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-[#062e23]/70 pt-2 flex items-center gap-2 bg-[#f9faf6] p-3 rounded-xl border border-[#062e23]/10">
            <Info size={16} className="text-[#2d5a4c] shrink-0" />
            <span>
              <strong>Kategori {species.iucnStatus}:</strong> {species.iucnLabel}. Berada dalam pengawasan intensif Balai Konservasi Sumber Daya Alam (BKSDA) dan Kementerian LHK RI.
            </span>
          </div>
        </section>

        {/* Taxonomy Tree & Distribution Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Taxonomy Column (Left 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider border-b border-[#062e23]/10 pb-3">
              <Layers size={16} />
              <span>Hierarki Taksonomi Biologi</span>
            </div>

            <div className="space-y-2">
              {taxonomyList.map((item, idx) => (
                <div
                  key={item.level}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#f9faf6] border border-[#062e23]/5 text-xs hover:bg-[#e8ede6] transition-colors"
                >
                  <span className="font-semibold text-[#2d5a4c]">{item.level}</span>
                  <span className={`font-bold ${item.italic ? 'italic text-[#062e23]' : 'text-[#062e23]'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Physical Characteristics List */}
            <div className="pt-4 border-t border-[#062e23]/10 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#062e23]">Karakteristik Fisik Spesifik</h4>
              <ul className="space-y-2 text-xs text-[#062e23]/80">
                {species.physicalCharacteristics.map((char, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#2d5a4c] shrink-0 mt-0.5" />
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Distribution Map & Threats (Right 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Sebaran Geografis Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#062e23]/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
                  <MapPin size={16} />
                  <span>Sebaran Geografis & Lanskap Habitat</span>
                </div>
                <span className="text-xs bg-[#e8ede6] text-[#062e23] px-2.5 py-0.5 rounded-full font-semibold">
                  Indonesia Tropis
                </span>
              </div>

              {/* Map Graphic Visual Placeholder */}
              <div className="bg-[#062e23] rounded-xl p-6 text-[#f9faf6] relative overflow-hidden space-y-4">
                <div className="text-xs font-bold text-[#d4a373] uppercase tracking-widest">
                  Peta Lanskap Ekosistem Kritis
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {species.distributionRegion.map((region, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[#1a5948] text-[#e8ede6] text-xs font-medium border border-[#d4a373]/30 flex items-center gap-1.5"
                    >
                      <MapPin size={12} className="text-[#d4a373]" />
                      <span>{region}</span>
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#1a5948] text-[11px] text-[#b4d7cd] flex items-center justify-between">
                  <span>Data Spasial: GIS Konservasi BRIN & Taman Nasional</span>
                  <button 
                    onClick={() => onNavigateScreen('SCREEN_5')}
                    className="text-[#d4a373] hover:underline font-semibold"
                  >
                    Buka Publikasi Riset Habitat →
                  </button>
                </div>
              </div>
            </div>

            {/* Ancaman & Upaya Konservasi */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-6">
              <div>
                <h4 className="font-serif text-sm font-bold text-red-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldAlert size={16} />
                  <span>Faktor Ancaman Utama Habitat</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {species.threats.map((threat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-950 font-medium">
                      • {threat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#062e23]/10">
                <h4 className="font-serif text-sm font-bold text-[#062e23] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#d4a373]" />
                  <span>Upaya Konservasi Berjalan</span>
                </h4>
                <p className="text-xs text-[#062e23]/80 bg-[#e8ede6] p-4 rounded-xl leading-relaxed">
                  {species.conservationEfforts}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
