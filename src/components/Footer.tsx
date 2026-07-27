import React from 'react';
import { BookOpen, Shield, Globe, Award, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateScreen: (screenId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateScreen }) => {
  return (
    <footer className="bg-[#062e23] text-[#e8ede6] pt-16 pb-12 border-t border-[#d4a373]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1a5948]">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4a373] text-[#062e23] flex items-center justify-center font-serif text-2xl font-bold">
                🌿
              </div>
              <span className="font-serif text-2xl font-bold text-[#f9faf6]">Satwalogi</span>
            </div>
            <p className="text-xs text-[#b4d7cd] leading-relaxed">
              Platform ensiklopedia & jurnal publikasi ilmiah keanekaragaman hayati satwa Indonesia berlandaskan Design System <span className="text-[#d4a373] font-semibold">Botanical Intellect</span>.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#81b8aa]">
              <span className="inline-flex items-center gap-1 bg-[#0f4234] px-2.5 py-1 rounded border border-[#1a5948]">
                <Globe size={13} /> Open Access CC-BY 4.0
              </span>
              <span className="inline-flex items-center gap-1 bg-[#0f4234] px-2.5 py-1 rounded border border-[#1a5948]">
                <Award size={13} /> Peer-Reviewed
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#d4a373] uppercase tracking-wider mb-4">
              Jelajahi Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#b4d7cd]">
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_13')} className="hover:text-white transition-colors">
                  Beranda & Katalog Satwa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_10')} className="hover:text-white transition-colors">
                  Taksonomi & Detail Spesies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_5')} className="hover:text-white transition-colors">
                  Baca Jurnal Ilmiah
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_12')} className="hover:text-white transition-colors">
                  Editor Penulisan Artikel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Peran */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#d4a373] uppercase tracking-wider mb-4">
              Portal Akademis & Admin
            </h4>
            <ul className="space-y-2.5 text-xs text-[#b4d7cd]">
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_14')} className="hover:text-white transition-colors">
                  Panel Moderasi Admin Verifikasi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_8')} className="hover:text-white transition-colors">
                  Dasbor Kontributor & Penulis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_6')} className="hover:text-white transition-colors">
                  Pengaturan Akun & Minat Riset
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateScreen('SCREEN_11')} className="hover:text-white transition-colors">
                  Masuk & Portal Autentikasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Bioakustik & Konservasi */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#d4a373] uppercase tracking-wider mb-4">
              Konsorsium Riset
            </h4>
            <p className="text-xs text-[#b4d7cd] leading-relaxed mb-3">
              Didukung oleh jejaring peneliti biosistemasi BRIN, perguruan tinggi nasional, dan balai taman nasional di seluruh Indonesia.
            </p>
            <div className="p-3 rounded-lg bg-[#0f4234] border border-[#1a5948] text-[11px] text-[#81b8aa]">
              <div className="font-bold text-[#d4a373] mb-1">Standard Indeksasi:</div>
              Crossref DOI, Scopus Bio-Taxonomy, LIPI Botanical-Fauna Registry.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#81b8aa] gap-4">
          <div>
            &copy; 2026 Satwalogi Indonesia. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-1">
            <span>Didesain dengan pendekatan</span>
            <span className="text-[#d4a373] font-semibold">Botanical Intellect Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
