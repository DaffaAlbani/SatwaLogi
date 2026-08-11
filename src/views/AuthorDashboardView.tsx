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
  XCircle,
  LogIn,
  UserCheck,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { UserProfile, JOURNAL_ARTICLES, AdminVerificationItem, JournalArticle } from '../data/satwaData';

interface AuthorDashboardViewProps {
  user: UserProfile | null;
  verificationQueue: AdminVerificationItem[];
  onNavigateScreen: (screenId: string) => void;
  onSelectArticle?: (article: JournalArticle) => void;
}

export const AuthorDashboardView: React.FC<AuthorDashboardViewProps> = ({ 
  user, 
  verificationQueue, 
  onNavigateScreen,
  onSelectArticle
}) => {
  const [activeTab, setActiveTab] = useState<'MY_SUBMISSIONS' | 'FAVORITES'>('MY_SUBMISSIONS');
  const [expandedSubmissionId, setExpandedSubmissionId] = useState<string | null>(null);

  const isAdmin = user?.role === 'Admin' || user?.email?.toLowerCase() === 'admin@satwalogi.or.id';

  const userSubmissions = verificationQueue.filter((item) => {
    if (isAdmin) return true;
    if (!user) return false;
    const matchEmail = item.authorEmail && item.authorEmail.toLowerCase() === user.email.toLowerCase();
    const matchName = item.authorName && user.name && item.authorName.toLowerCase().includes(user.name.toLowerCase());
    return matchEmail || matchName;
  });

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
    <div className="space-y-8 pb-24 pt-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Guest Banner if not logged in */}
        {!user && (
          <div className="hero-gradient text-[#f9faf6] p-6 sm:p-8 rounded-3xl border border-[#d4a373]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden">
            <div className="hero-particles" />
            <div className="space-y-1 text-center sm:text-left relative z-10">
              <h3 className="font-serif font-bold text-lg text-[#d4a373]">Sesi Pengunjung Tamu</h3>
              <p className="text-xs text-[#b4d7cd]">Masuk ke akun Anda untuk mengelola draf naskah pribadi dan melihat indeks sitasi.</p>
            </div>
            <button
              onClick={() => onNavigateScreen('SCREEN_11')}
              className="shimmer-btn bg-gradient-to-r from-[#d4a373] to-[#e8c9a4] text-[#062e23] px-5 py-2.5 rounded-xl font-bold text-xs hover:scale-[1.02] transition-all flex items-center gap-2 shrink-0 shadow-md relative z-10"
            >
              <LogIn size={16} />
              <span>Masuk / Daftar</span>
            </button>
          </div>
        )}

        {/* Author Header Banner if logged in */}
        {user && (
          <div className="hero-gradient text-[#f9faf6] p-6 sm:p-8 rounded-3xl border border-[#d4a373]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="hero-particles" />
            <div className="flex items-center gap-4 relative z-10">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#d4a373] shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-serif font-bold text-[#f9faf6]">{user.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d4a373] text-[#062e23] text-[10px] font-extrabold uppercase shadow-sm">
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-[#b4d7cd] mt-0.5">{user.title} • {user.institution}</p>
              </div>
            </div>

            {/* New Article CTA */}
            <button
              onClick={() => onNavigateScreen('SCREEN_12')}
              className="shimmer-btn bg-gradient-to-r from-[#d4a373] to-[#e8c9a4] text-[#062e23] px-5 py-3 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 shadow-md shrink-0 relative z-10 hover:scale-[1.02]"
            >
              <Plus size={18} />
              <span>Tulis & Submit Artikel Baru</span>
            </button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card gradient-border p-6 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[#2d5a4c]">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Artikel Dikirim</span>
              <FileText size={18} />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] stat-value">{userSubmissions.length}</div>
            <div className="text-[10px] sm:text-[11px] text-[#062e23]/70 font-medium">Antrean Verifikasi & Live</div>
          </div>

          <div className="glass-card gradient-border p-6 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[#2d5a4c]">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Total Sitasi Jurnal</span>
              <Quote size={18} />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800 stat-value">{user ? user.stats.totalCitations : 0}</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-700 font-medium">Indeks Google Scholar / DOI</div>
          </div>

          <div className="glass-card gradient-border p-6 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[#2d5a4c]">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Total Pembaca</span>
              <Eye size={18} />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] stat-value">{user ? user.stats.totalReads.toLocaleString() : '0'}</div>
            <div className="text-[10px] sm:text-[11px] text-[#062e23]/70 font-medium">Akses Terbuka</div>
          </div>

          <div className="glass-card gradient-border p-6 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[#d4a373]">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#062e23]">Metrik h-Index</span>
              <Award size={18} />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#d4a373] stat-value">{user ? user.stats.hIndex : 0}</div>
            <div className="text-[10px] sm:text-[11px] text-[#062e23]/70 font-medium">Pengaruh Riset</div>
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
                    {userSubmissions.length === 0 ? (
                      <tr className="bg-white">
                        <td colSpan={6} className="p-12 text-center space-y-3">
                          <div className="w-12 h-12 rounded-full bg-[#e8ede6] text-[#062e23] border border-[#062e23]/10 flex items-center justify-center mx-auto text-xl">
                            📝
                          </div>
                          <div className="font-serif font-bold text-lg text-[#062e23]">Belum Ada Artikel yang Dikirim</div>
                          <p className="text-xs text-[#062e23]/60 max-w-md mx-auto">
                            Selamat datang, {user?.name || 'Penulis'}! Akun Anda masih baru dan belum memiliki draf atau naskah ilmiah yang dikirim. Klik tombol di bawah untuk memublikasikan karya ilmiah Anda.
                          </p>
                          <button
                            onClick={() => onNavigateScreen('SCREEN_12')}
                            className="mt-2 inline-flex items-center gap-2 bg-[#062e23] text-[#f9faf6] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#d4a373] hover:text-[#062e23] transition-colors shadow-md"
                          >
                            <Plus size={16} />
                            <span>Tulis & Submit Artikel Baru</span>
                          </button>
                        </td>
                      </tr>
                    ) : (
                      userSubmissions.map((sub) => (
                      <React.Fragment key={sub.id}>
                      <tr
                        className="hover:bg-[#f9faf6] transition-colors cursor-pointer"
                        onClick={() => setExpandedSubmissionId(expandedSubmissionId === sub.id ? null : sub.id)}
                      >
                        <td className="p-4 font-serif font-bold text-[#062e23] max-w-xs">
                          <div className="flex items-center gap-2">
                            {expandedSubmissionId === sub.id ? <ChevronUp size={14} className="text-[#2d5a4c] shrink-0" /> : <ChevronDown size={14} className="text-[#2d5a4c] shrink-0" />}
                            <div>
                              {sub.articleTitle}
                              {sub.reviewerNotes && (
                                <div className="text-[10px] text-[#2d5a4c] font-normal italic mt-1 line-clamp-1">
                                  Catatan Admin: "{sub.reviewerNotes}"
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-[#062e23] font-semibold">{sub.authorName}</td>
                        <td className="p-4 text-[#2d5a4c] font-semibold">{sub.category}</td>
                        <td className="p-4 text-[#062e23]/70">{sub.submittedDate}</td>
                        <td className="p-4">
                          {statusBadge(sub.status)}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); onNavigateScreen('SCREEN_12'); }}
                            className="p-2 rounded-lg bg-[#e8ede6] hover:bg-[#062e23] text-[#062e23] hover:text-[#f9faf6] transition-colors"
                            title="Edit Naskah di Editor"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); onNavigateScreen('SCREEN_14'); }}
                            className="p-2 rounded-lg bg-[#062e23] text-[#d4a373] hover:bg-[#1a5948] transition-colors"
                            title="Tinjau di Panel Admin Verifikasi"
                          >
                            <ExternalLink size={15} />
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Detail Row */}
                      {expandedSubmissionId === sub.id && (
                        <tr>
                          <td colSpan={6} className="p-0">
                            <div className="bg-[#f9faf6] border-t border-b border-[#062e23]/10 p-5 sm:p-6 space-y-4 animate-fadeIn">
                              {/* Abstract / Preview */}
                              <div className="space-y-2">
                                <h5 className="text-xs font-bold text-[#2d5a4c] uppercase tracking-wider flex items-center gap-1.5">
                                  <BookOpen size={14} />
                                  Abstrak / Preview Konten
                                </h5>
                                <p className="text-xs text-[#062e23]/80 leading-relaxed bg-white p-4 rounded-xl border border-[#062e23]/10">
                                  {sub.abstractText || sub.previewSnippet || 'Tidak tersedia.'}
                                </p>
                              </div>

                              {/* Scores Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div className="bg-white p-3 rounded-xl border border-[#062e23]/10 space-y-1">
                                  <div className="text-[10px] font-bold text-[#2d5a4c] uppercase">Skor Plagiarisme</div>
                                  <div className={`text-lg font-serif font-bold ${sub.plagiarismScore <= 15 ? 'text-emerald-700' : sub.plagiarismScore <= 30 ? 'text-amber-600' : 'text-red-700'}`}>
                                    {sub.plagiarismScore}%
                                  </div>
                                  <div className="text-[10px] text-[#062e23]/60">{sub.plagiarismScore <= 15 ? 'Aman — originalitas tinggi' : sub.plagiarismScore <= 30 ? 'Perlu review' : 'Tinggi — perlu revisi'}</div>
                                </div>

                                <div className="bg-white p-3 rounded-xl border border-[#062e23]/10 space-y-1">
                                  <div className="text-[10px] font-bold text-[#2d5a4c] uppercase">Akurasi Taksonomi</div>
                                  <div className={`text-lg font-serif font-bold ${sub.taxonomyAccuracyScore >= 85 ? 'text-emerald-700' : sub.taxonomyAccuracyScore >= 60 ? 'text-amber-600' : 'text-red-700'}`}>
                                    {sub.taxonomyAccuracyScore}%
                                  </div>
                                  <div className="text-[10px] text-[#062e23]/60">{sub.taxonomyAccuracyScore >= 85 ? 'Akurat' : 'Perlu verifikasi'}</div>
                                </div>

                                <div className="bg-white p-3 rounded-xl border border-[#062e23]/10 space-y-1">
                                  <div className="text-[10px] font-bold text-[#2d5a4c] uppercase">Sitasi Terverifikasi</div>
                                  <div className="text-lg font-serif font-bold">
                                    {sub.citationsVerified
                                      ? <span className="text-emerald-700 flex items-center gap-1"><CheckCircle2 size={18} /> Ya</span>
                                      : <span className="text-red-700 flex items-center gap-1"><XCircle size={18} /> Belum</span>
                                    }
                                  </div>
                                </div>
                              </div>

                              {/* Reviewer Notes */}
                              {sub.reviewerNotes && (
                                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-1">
                                  <div className="text-[10px] font-bold text-amber-800 uppercase flex items-center gap-1">
                                    <ShieldCheck size={13} />
                                    Catatan Reviewer / Admin
                                  </div>
                                  <p className="text-xs text-amber-900 leading-relaxed italic">
                                    "{sub.reviewerNotes}"
                                  </p>
                                </div>
                              )}

                              {/* Full Body Preview */}
                              {sub.fullBody && (
                                <div className="space-y-2">
                                  <h5 className="text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">Naskah Lengkap</h5>
                                  <div className="text-xs text-[#062e23]/80 leading-relaxed bg-white p-4 rounded-xl border border-[#062e23]/10 max-h-40 overflow-y-auto">
                                    {sub.fullBody}
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                      </React.Fragment>
                      ))
                    )}
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
                  onClick={() => onSelectArticle ? onSelectArticle(art) : onNavigateScreen('SCREEN_5')}
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
