import React, { useState } from 'react';
import { 
  FileText, 
  Quote, 
  Eye, 
  Plus, 
  Edit3, 
  Clock, 
  Award, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { UserProfile, JOURNAL_ARTICLES, AdminVerificationItem } from '../data/satwaData';

interface AuthorDashboardViewProps {
  user: UserProfile;
  verificationQueue: AdminVerificationItem[];
  onNavigateScreen: (screenId: string) => void;
}

export const AuthorDashboardView: React.FC<AuthorDashboardViewProps> = ({ 
  user, 
  verificationQueue, 
  onNavigateScreen 
}) => {
  const [activeTab, setActiveTab] = useState<'MY_SUBMISSIONS' | 'FAVORITES'>('MY_SUBMISSIONS');

  // Filter items submitted by current user or show current queue items
  const userSubmissions = verificationQueue;

  const statusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-800 text-[#f9faf6] font-bold text-[11px] inline-flex items-center gap-1"><CheckCircle2 size={12} /> Disetujui Admin</span>;
      case 'REVISION_NEEDED':
        return <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white font-bold text-[11px] inline-flex items-center gap-1"><AlertTriangle size={12} /> Minta Revisi</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 rounded-full bg-red-700 text-white font-bold text-[11px] inline-flex items-center gap-1"><XCircle size={12} /> Ditolak</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-blue-700 text-white font-bold text-[11px] inline-flex items-center gap-1"><Clock size={12} /> Pending Moderasi Admin</span>;
    }
  };

  return (
    <div className="space-y-8 pb-24">
      {/* SCREEN_8 Identifier Watermark Badge */}
      <div className="bg-[#062e23] text-[#d4a373] text-[11px] font-mono py-1 px-4 text-center border-b border-[#d4a373]/30">
        [SCREEN_8] Dasbor Penulis - Satwalogi (Manajemen Naskah User Biasa)
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Author Header Banner */}
        <div className="bg-[#062e23] text-[#f9faf6] p-6 sm:p-8 rounded-3xl border border-[#d4a373]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#d4a373]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-[#f9faf6]">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#d4a373] text-[#062e23] text-[10px] font-bold uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-[#b4d7cd] mt-0.5">{user.title} • {user.institution}</p>
            </div>
          </div>

          {/* New Article CTA */}
          <button
            onClick={() => onNavigateScreen('SCREEN_12')}
            className="bg-[#d4a373] hover:bg-white text-[#062e23] px-5 py-3 rounded-2xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md shrink-0"
          >
            <Plus size={18} />
            <span>Tulis & Submit Artikel Baru [SCREEN_12]</span>
          </button>
        </div>

        {/* 4 Key Performance Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-[#062e23]/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#2d5a4c]">
              <span className="text-xs font-bold uppercase tracking-wider">Artikel Dikirim</span>
              <FileText size={18} />
            </div>
            <div className="text-3xl font-serif font-bold text-[#062e23]">{userSubmissions.length}</div>
            <div className="text-[11px] text-[#062e23]/70 font-medium">Dalam Antrean / Terbit</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#062e23]/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#2d5a4c]">
              <span className="text-xs font-bold uppercase tracking-wider">Total Sitasi Jurnal</span>
              <Quote size={18} />
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-800">{user.stats.totalCitations}</div>
            <div className="text-[11px] text-emerald-700 font-medium">Indeks Google Scholar / DOI</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#062e23]/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#2d5a4c]">
              <span className="text-xs font-bold uppercase tracking-wider">Total Pembaca</span>
              <Eye size={18} />
            </div>
            <div className="text-3xl font-serif font-bold text-[#062e23]">{user.stats.totalReads.toLocaleString()}</div>
            <div className="text-[11px] text-[#062e23]/70 font-medium">Akses Terbuka</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#062e23]/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#d4a373]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#062e23]">Metrik h-Index</span>
              <Award size={18} />
            </div>
            <div className="text-3xl font-serif font-bold text-[#d4a373]">{user.stats.hIndex}</div>
            <div className="text-[11px] text-[#062e23]/70 font-medium">Pengaruh Riset</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#062e23]/10 pb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('MY_SUBMISSIONS')}
                className={`font-serif text-lg font-bold pb-2 transition-all border-b-2 ${
                  activeTab === 'MY_SUBMISSIONS'
                    ? 'border-[#062e23] text-[#062e23]'
                    : 'border-transparent text-[#062e23]/50 hover:text-[#062e23]'
                }`}
              >
                Status Artikel Karya User ({userSubmissions.length})
              </button>

              <button
                onClick={() => setActiveTab('FAVORITES')}
                className={`font-serif text-lg font-bold pb-2 transition-all border-b-2 ${
                  activeTab === 'FAVORITES'
                    ? 'border-[#062e23] text-[#062e23]'
                    : 'border-transparent text-[#062e23]/50 hover:text-[#062e23]'
                }`}
              >
                Jurnal Terfavorit ({JOURNAL_ARTICLES.length})
              </button>
            </div>
          </div>

          {activeTab === 'MY_SUBMISSIONS' ? (
            /* Submissions Table */
            <div className="bg-white rounded-2xl border border-[#062e23]/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#e8ede6] text-[#062e23] font-bold border-b border-[#062e23]/10">
                      <th className="p-4 font-serif text-sm">Judul Artikel Dikirim User</th>
                      <th className="p-4 font-sans">Penulis Utama</th>
                      <th className="p-4 font-sans">Kategori</th>
                      <th className="p-4 font-sans">Tanggal Submit</th>
                      <th className="p-4 font-sans">Status Verifikasi Admin</th>
                      <th className="p-4 font-sans text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#062e23]/10">
                    {userSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-[#f9faf6] transition-colors">
                        <td className="p-4 font-serif font-bold text-[#062e23] max-w-xs">
                          <div>{sub.articleTitle}</div>
                          {sub.reviewerNotes && (
                            <div className="text-[10px] text-[#2d5a4c] font-normal italic mt-1 line-clamp-1">
                              Catatan Admin: "{sub.reviewerNotes}"
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-[#062e23] font-semibold">{sub.authorName}</td>
                        <td className="p-4 text-[#2d5a4c] font-semibold">{sub.category}</td>
                        <td className="p-4 text-[#062e23]/70">{sub.submittedDate}</td>
                        <td className="p-4">
                          {statusBadge(sub.status)}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => onNavigateScreen('SCREEN_12')}
                            className="p-2 rounded-lg bg-[#e8ede6] hover:bg-[#062e23] text-[#062e23] hover:text-[#f9faf6] transition-colors"
                            title="Edit Naskah di Editor [SCREEN_12]"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => onNavigateScreen('SCREEN_14')}
                            className="p-2 rounded-lg bg-[#062e23] text-[#d4a373] hover:bg-[#1a5948] transition-colors"
                            title="Tinjau di Panel Admin Verifikasi [SCREEN_14]"
                          >
                            <ExternalLink size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Bookmarked Favorites Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {JOURNAL_ARTICLES.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onNavigateScreen('SCREEN_5')}
                  className="bg-white p-6 rounded-2xl border border-[#062e23]/10 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-[#2d5a4c]">
                    <span className="font-bold">{art.category}</span>
                    <span className="font-mono">DOI: {art.doi}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#062e23]">{art.title}</h4>
                  <p className="text-xs text-[#062e23]/70 line-clamp-2">{art.abstract}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
