import React from 'react';
import { Globe, ShieldCheck, ExternalLink, ArrowRight, BookOpen, User } from 'lucide-react';
import { JournalArticle } from '../data/satwaData';

interface JournalCardProps {
  article: JournalArticle;
  onSelect: (article: JournalArticle) => void;
  index?: number;
}

export const JournalCard: React.FC<JournalCardProps> = ({ article, onSelect, index = 0 }) => {
  return (
    <div
      onClick={() => onSelect(article)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-[#062e23]/10 bg-white flex flex-col justify-between"
    >
      {/* Cover Photo Header */}
      {article.coverImage && (
        <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-900">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062e23]/90 via-[#062e23]/20 to-transparent" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Category Ribbon Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-black/50 backdrop-blur-md text-[#d4a373] text-[10px] font-bold border border-[#d4a373]/30 uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-900/80 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 border border-emerald-400/30">
              <ShieldCheck size={12} /> Peer-Reviewed
            </span>
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white/80 text-[11px]">
            <span className="font-mono text-[#b4d7cd] truncate">DOI: {article.doi}</span>
            <span className="text-white/60 font-medium shrink-0">{article.readTime}</span>
          </div>
        </div>
      )}

      {/* Editorial Top Line Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#062e23] via-[#d4a373] to-[#1a5948]" />

      {/* Card Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {!article.coverImage && (
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-[#062e23]/10 text-[#062e23] text-[10px] font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-xs text-[#2d5a4c] font-semibold">{article.publishedDate}</span>
            </div>
          )}

          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#062e23] group-hover:text-[#d4a373] transition-colors duration-300 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-[#062e23]/75 line-clamp-3 leading-relaxed font-sans">
            {article.abstract}
          </p>
        </div>

        {/* Author Strip & Action */}
        <div className="pt-4 border-t border-[#062e23]/8 space-y-3">
          <div className="flex items-center justify-between gap-3 bg-[#f9faf6] p-3 rounded-2xl border border-[#062e23]/6">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={article.authors[0]?.avatar}
                alt={article.authors[0]?.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#d4a373]/40 shrink-0"
              />
              <div className="min-w-0">
                <div className="font-bold text-[#062e23] text-xs truncate">
                  {article.authors[0]?.name || 'Penulis Utama'}
                </div>
                <div className="text-[10px] text-[#2d5a4c]/70 truncate max-w-[180px]">
                  {article.authors[0]?.institution || 'Peneliti'}
                </div>
              </div>
            </div>

            {article.doi && (
              <a
                href={`https://doi.org/${article.doi}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white border border-[#062e23]/10 hover:bg-[#e8ede6] text-blue-700 transition-colors shadow-sm"
                title="Buka DOI Resmi"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(article);
            }}
            className="shimmer-btn w-full bg-gradient-to-r from-[#062e23] to-[#1a5948] hover:from-[#0f4234] hover:to-[#2d5a4c] text-[#d4a373] text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md"
          >
            <span>Baca Artikel Ilmiah</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
