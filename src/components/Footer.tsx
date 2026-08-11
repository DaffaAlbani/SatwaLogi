import React from 'react';
import { BookOpen, Shield, Globe, Award, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateScreen: (screenId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateScreen }) => {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031913] via-[#062e23] to-[#0f4234]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#2d5a4c]/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#d4a373]/8 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
            {/* Col 1: Brand */}
            <div className="space-y-5 md:col-span-1">
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigateScreen('SCREEN_13')}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4a373] to-[#c28e5c] text-[#062e23] flex items-center justify-center font-serif text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  🌿
                </div>
                <span className="font-serif text-2xl font-bold text-[#f9faf6]">Satwalogi</span>
              </div>
              <p className="text-xs text-[#b4d7cd]/80 leading-relaxed">
                Platform ensiklopedia & jurnal publikasi ilmiah keanekaragaman hayati satwa Indonesia berlandaskan Design System <span className="text-[#d4a373] font-semibold">Botanical Intellect</span>.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <span className="inline-flex items-center gap-1.5 glass-card-dark px-3 py-1.5 rounded-xl text-xs text-[#81b8aa] font-medium">
                  <Globe size={13} className="text-[#d4a373]" />
                  Open Access CC-BY 4.0
                </span>
                <span className="inline-flex items-center gap-1.5 glass-card-dark px-3 py-1.5 rounded-xl text-xs text-[#81b8aa] font-medium">
                  <Award size={13} className="text-[#d4a373]" />
                  Peer-Reviewed
                </span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="font-serif text-sm font-bold text-[#d4a373] uppercase tracking-wider mb-5">
                Jelajahi Portal
              </h4>
              <ul className="space-y-3 text-xs text-[#b4d7cd]/70">
                {[
                  { screen: 'SCREEN_13', label: 'Beranda & Katalog Satwa' },
                  { screen: 'SCREEN_10', label: 'Taksonomi & Detail Spesies' },
                  { screen: 'SCREEN_15', label: 'Baca Jurnal Ilmiah' },
                  { screen: 'SCREEN_12', label: 'Editor Penulisan Artikel' },
                ].map((item) => (
                  <li key={item.screen}>
                    <button 
                      onClick={() => onNavigateScreen(item.screen)} 
                      className="hover:text-white transition-all duration-300 relative group"
                    >
                      <span>{item.label}</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#d4a373] group-hover:w-full transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Portal Peran */}
            <div>
              <h4 className="font-serif text-sm font-bold text-[#d4a373] uppercase tracking-wider mb-5">
                Portal Akademis
              </h4>
              <ul className="space-y-3 text-xs text-[#b4d7cd]/70">
                {[
                  { screen: 'SCREEN_14', label: 'Panel Moderasi Admin' },
                  { screen: 'SCREEN_8', label: 'Dasbor Kontributor' },
                  { screen: 'SCREEN_6', label: 'Pengaturan Akun' },
                  { screen: 'SCREEN_11', label: 'Masuk & Autentikasi' },
                ].map((item) => (
                  <li key={item.screen}>
                    <button 
                      onClick={() => onNavigateScreen(item.screen)} 
                      className="hover:text-white transition-all duration-300 relative group"
                    >
                      <span>{item.label}</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#d4a373] group-hover:w-full transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Research */}
            <div>
              <h4 className="font-serif text-sm font-bold text-[#d4a373] uppercase tracking-wider mb-5">
                Konsorsium Riset
              </h4>
              <p className="text-xs text-[#b4d7cd]/70 leading-relaxed mb-4">
                Didukung oleh jejaring peneliti biosistemasi BRIN, perguruan tinggi nasional, dan balai taman nasional di seluruh Indonesia.
              </p>
              <div className="glass-card-dark p-3.5 rounded-xl text-[11px] text-[#81b8aa]/80">
                <div className="font-bold text-[#d4a373] mb-1.5">Standard Indeksasi:</div>
                <div className="leading-relaxed">Crossref DOI, Scopus Bio-Taxonomy, LIPI Botanical-Fauna Registry.</div>
              </div>
            </div>
          </div>

          {/* Gradient separator */}
          <div className="gradient-line mb-8" />

          {/* Bottom copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-[#81b8aa]/60 gap-4">
            <div>
              &copy; 2026 Satwalogi Indonesia. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex items-center gap-1.5">
              <span>Didesain dengan pendekatan</span>
              <span className="text-[#d4a373]/80 font-semibold">Botanical Intellect Design System</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
