import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  UserCheck, 
  RefreshCw,
  ListFilter,
  FileText
} from 'lucide-react';
import { AdminVerificationItem } from '../data/satwaData';

interface AdminVerificationViewProps {
  queue: AdminVerificationItem[];
  onUpdateStatus: (id: string, newStatus: 'APPROVED' | 'REVISION_NEEDED' | 'REJECTED', notes: string) => void;
  onNavigateScreen: (screenId: string) => void;
}

export const AdminVerificationView: React.FC<AdminVerificationViewProps> = ({ 
  queue, 
  onUpdateStatus, 
  onNavigateScreen 
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(queue[0]?.id || '');
  const [reviewerComment, setReviewerComment] = useState<string>(queue[0]?.reviewerNotes || '');
  const [mobileTab, setMobileTab] = useState<'QUEUE' | 'DETAILS'>('QUEUE');

  const selectedItem = queue.find((item) => item.id === selectedItemId) || queue[0];

  const handleUpdateStatusAction = (newStatus: 'APPROVED' | 'REVISION_NEEDED' | 'REJECTED') => {
    if (!selectedItem) return;
    onUpdateStatus(selectedItem.id, newStatus, reviewerComment);

    if (newStatus === 'APPROVED') {
      alert(`🎉 Artikel "${selectedItem.articleTitle}" karya ${selectedItem.authorName} telah DISETUJUI & DITERBITKAN secara otomatis ke Jurnal Ilmiah & Beranda!`);
    } else if (newStatus === 'REVISION_NEEDED') {
      alert(`📝 Permintaan revisi berhasil dikirimkan kepada ${selectedItem.authorName}. Status artikel diperbarui di Dasbor Penulis.`);
    } else {
      alert(`❌ Artikel "${selectedItem.articleTitle}" ditolak.`);
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-800 text-[#f9faf6] text-[11px] font-bold flex items-center gap-1"><CheckCircle size={12} /> Disetujui</span>;
      case 'REVISION_NEEDED':
        return <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1"><AlertTriangle size={12} /> Perlu Revisi</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 rounded-full bg-red-700 text-white text-[11px] font-bold flex items-center gap-1"><XCircle size={12} /> Ditolak</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1"><Clock size={12} /> Pending</span>;
    }
  };

  if (!selectedItem) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4 px-4">
        <h2 className="text-2xl font-serif font-bold text-[#062e23]">Belum Ada Naskah dalam Antrean</h2>
        <p className="text-xs text-[#2d5a4c]">Silakan tulis artikel baru di Editor untuk mengirimkan ke antrean ini.</p>
        <button onClick={() => onNavigateScreen('SCREEN_12')} className="px-4 py-2 bg-[#062e23] text-white rounded-xl text-xs font-bold">
          Ke Editor Artikel
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 pt-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#062e23]/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Panel Moderasi Admin Verifikasi Artikel User</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#062e23] mt-0.5">
              Verifikasi Naskah Masuk
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#e8ede6] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#062e23] flex items-center gap-1.5">
              <UserCheck size={15} className="text-[#2d5a4c]" />
              <span>Admin BRIN</span>
            </div>
          </div>
        </div>

        {/* Mobile Tab Toggle (< 1024px) */}
        <div className="flex lg:hidden bg-[#e8ede6] p-1 rounded-xl border border-[#062e23]/10 text-xs font-bold">
          <button
            onClick={() => setMobileTab('QUEUE')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'QUEUE' ? 'bg-[#062e23] text-[#f9faf6] shadow' : 'text-[#062e23]'
            }`}
          >
            <ListFilter size={14} />
            <span>Antrean Naskah ({queue.length})</span>
          </button>

          <button
            onClick={() => setMobileTab('DETAILS')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'DETAILS' ? 'bg-[#062e23] text-[#f9faf6] shadow' : 'text-[#062e23]'
            }`}
          >
            <FileText size={14} />
            <span>Detail Review</span>
          </button>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column: Queue List */}
          <div className={`lg:col-span-4 space-y-4 ${mobileTab === 'DETAILS' ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white rounded-2xl p-4 border border-[#062e23]/10 shadow-sm space-y-3">
              <div className="flex items-center justify-between font-serif font-bold text-sm text-[#062e23] border-b border-[#062e23]/10 pb-2">
                <span>Antrean Naskah ({queue.length})</span>
                <RefreshCw size={14} className="text-[#2d5a4c] cursor-pointer hover:rotate-180 transition-transform" />
              </div>

              <div className="space-y-3">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedItemId(item.id);
                      setReviewerComment(item.reviewerNotes || '');
                      setMobileTab('DETAILS');
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      selectedItemId === item.id
                        ? 'bg-[#062e23] text-[#f9faf6] border-[#d4a373] shadow-md ring-2 ring-[#d4a373]/40'
                        : 'bg-[#f9faf6] hover:bg-[#e8ede6] border-[#062e23]/10 text-[#062e23]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${selectedItemId === item.id ? 'bg-[#1a5948] text-[#d4a373]' : 'bg-[#e8ede6] text-[#2d5a4c]'}`}>
                        {item.category}
                      </span>
                      {statusBadge(item.status)}
                    </div>

                    <h4 className="font-serif font-bold text-xs leading-snug line-clamp-2">
                      {item.articleTitle}
                    </h4>

                    <div className="text-[11px] opacity-80 flex items-center justify-between pt-1 border-t border-current/10">
                      <span>Penulis: <strong>{item.authorName}</strong></span>
                      <span>{item.submittedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Reviewer Workspace */}
          <div className={`lg:col-span-8 space-y-6 ${mobileTab === 'QUEUE' ? 'hidden lg:block' : 'block'}`}>
            {/* Audit Checklist Banner */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#062e23]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#062e23]/10 pb-3">
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#062e23] flex items-center gap-2">
                  <Sparkles size={16} className="text-[#d4a373]" />
                  <span>Audit Pembacaan Otomatis</span>
                </h3>
                <span className="text-xs text-[#2d5a4c] font-mono">ID: {selectedItem.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 space-y-0.5">
                  <div className="text-[10px] font-bold text-[#2d5a4c] uppercase tracking-wider">Kepatuhan Plagiasi</div>
                  <div className="text-lg font-serif font-bold text-emerald-800">
                    {selectedItem.plagiarismScore}% <span className="text-xs font-sans font-normal">(Lolos)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 space-y-0.5">
                  <div className="text-[10px] font-bold text-[#2d5a4c] uppercase tracking-wider">Akurasi Taksonomi</div>
                  <div className="text-lg font-serif font-bold text-[#062e23]">
                    {selectedItem.taxonomyAccuracyScore}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 space-y-0.5">
                  <div className="text-[10px] font-bold text-[#2d5a4c] uppercase tracking-wider">DOI Sitasi</div>
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-1">
                    <CheckCircle size={14} />
                    <span>Terverifikasi Valid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content Preview */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#062e23]/10 pb-3 gap-2">
                <div>
                  <div className="text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
                    Naskah Karya User
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#062e23] mt-0.5">
                    {selectedItem.articleTitle}
                  </h3>
                </div>
                {statusBadge(selectedItem.status)}
              </div>

              <div className="text-xs text-[#062e23]/80 space-y-1 bg-[#f9faf6] p-3 rounded-xl border border-[#062e23]/10">
                <div><strong>Penulis User:</strong> {selectedItem.authorName} ({selectedItem.authorInstitution})</div>
                <div><strong>Kategori:</strong> {selectedItem.category} | <strong>Tanggal Submit:</strong> {selectedItem.submittedDate}</div>
              </div>

              {/* Cover Image Attachment Preview */}
              {selectedItem.coverImage && (
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-900 border border-[#062e23]/20 shadow-md">
                  <img
                    src={selectedItem.coverImage}
                    alt={selectedItem.articleTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[11px] font-semibold">
                    📷 Foto Berita Artikel Dilampirkan Penulis
                  </div>
                </div>
              )}

              <div className="bg-[#f9faf6] p-4 rounded-xl border border-[#062e23]/10 space-y-1.5">
                <div className="text-xs font-bold text-[#d4a373] uppercase tracking-widest font-serif">
                  Abstrak Ilmiah
                </div>
                <p className="text-xs font-serif leading-relaxed text-[#062e23]">
                  "{selectedItem.abstractText}"
                </p>
              </div>

              <div className="bg-[#e8ede6] p-4 rounded-xl border border-[#062e23]/10 space-y-1.5 font-serif text-xs leading-relaxed">
                <div className="font-bold font-sans text-[#2d5a4c]">Teks Lengkap Karya User:</div>
                <p className="whitespace-pre-wrap">{selectedItem.fullBody || selectedItem.previewSnippet}</p>
              </div>
            </div>

            {/* Admin Decision Panel */}
            <div className="bg-[#062e23] text-[#e8ede6] p-5 sm:p-8 rounded-2xl border border-[#d4a373]/30 shadow-xl space-y-4">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#d4a373] flex items-center gap-2">
                <MessageSquare size={18} />
                <span>Keputusan Dewan Redaksi Admin</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#b4d7cd] uppercase tracking-wider mb-1">
                  Catatan Evaluasi / Masukan Reviewer untuk Penulis:
                </label>
                <textarea
                  rows={3}
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1a5948] text-xs text-[#f9faf6] border border-[#d4a373]/40 focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                  placeholder="Tuliskan masukan atau permintaan revisi sitasi/taksonomi..."
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  onClick={() => handleUpdateStatusAction('APPROVED')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <Check size={16} />
                  <span>Setujui & Terbitkan Naskah Live</span>
                </button>

                <button
                  onClick={() => handleUpdateStatusAction('REVISION_NEEDED')}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <AlertTriangle size={16} />
                  <span>Minta Revisi Penulis</span>
                </button>

                <button
                  onClick={() => handleUpdateStatusAction('REJECTED')}
                  className="px-4 py-2.5 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <XCircle size={16} />
                  <span>Tolak Naskah</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
