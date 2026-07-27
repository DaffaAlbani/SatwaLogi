import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Search, 
  Clock, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { ADMIN_VERIFICATION_QUEUE, AdminVerificationItem } from '../data/satwaData';

interface AdminVerificationViewProps {
  onNavigateScreen: (screenId: string) => void;
}

export const AdminVerificationView: React.FC<AdminVerificationViewProps> = ({ onNavigateScreen }) => {
  const [queue, setQueue] = useState<AdminVerificationItem[]>(ADMIN_VERIFICATION_QUEUE);
  const [selectedItemId, setSelectedItemId] = useState<string>(ADMIN_VERIFICATION_QUEUE[0].id);
  const [reviewerComment, setReviewerComment] = useState<string>(ADMIN_VERIFICATION_QUEUE[0].reviewerNotes || '');

  const selectedItem = queue.find((item) => item.id === selectedItemId) || queue[0];

  const handleUpdateStatus = (newStatus: 'APPROVED' | 'REVISION_NEEDED' | 'REJECTED') => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === selectedItemId
          ? { ...item, status: newStatus, reviewerNotes: reviewerComment }
          : item
      )
    );
    alert(`Status artikel "${selectedItem.articleTitle}" berhasil diperbarui menjadi: ${newStatus}`);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-800 text-[#f9faf6] text-xs font-bold flex items-center gap-1"><CheckCircle size={12} /> Disetujui</span>;
      case 'REVISION_NEEDED':
        return <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> Perlu Revisi</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 rounded-full bg-red-700 text-white text-xs font-bold flex items-center gap-1"><XCircle size={12} /> Ditolak</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center gap-1"><Clock size={12} /> Pending Verifikasi</span>;
    }
  };

  return (
    <div className="space-y-8 pb-24">
      {/* SCREEN_14 Identifier Watermark Badge */}
      <div className="bg-[#062e23] text-[#d4a373] text-[11px] font-mono py-1 px-4 text-center border-b border-[#d4a373]/30">
        [SCREEN_14] Admin - Verifikasi Artikel (Bahasa Indonesia)
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#062e23]/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Panel Moderasi Dewan Redaksi & Admin Reviewer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#062e23] mt-1">
              Verifikasi & Moderasi Naskah Ilmiah
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#e8ede6] px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#062e23] flex items-center gap-2">
              <UserCheck size={16} className="text-[#2d5a4c]" />
              <span>Role: Admin Peer-Reviewer BRIN</span>
            </div>
          </div>
        </div>

        {/* Split Screen Layout: Queue List (Left 4 cols) vs Detailed Reviewer Panel (Right 8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Moderation Queue List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-[#062e23]/10 shadow-sm space-y-3">
              <div className="flex items-center justify-between font-serif font-bold text-sm text-[#062e23] border-b border-[#062e23]/10 pb-2">
                <span>Antrean Naskah Masuk ({queue.length})</span>
                <RefreshCw size={14} className="text-[#2d5a4c] cursor-pointer hover:rotate-180 transition-transform" />
              </div>

              <div className="space-y-3">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedItemId(item.id);
                      setReviewerComment(item.reviewerNotes || '');
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      selectedItemId === item.id
                        ? 'bg-[#062e23] text-[#f9faf6] border-[#d4a373] shadow-md ring-2 ring-[#d4a373]/40'
                        : 'bg-[#f9faf6] hover:bg-[#e8ede6] border-[#062e23]/10 text-[#062e23]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${selectedItemId === item.id ? 'bg-[#1a5948] text-[#d4a373]' : 'bg-[#e8ede6] text-[#2d5a4c]'}`}>
                        {item.category}
                      </span>
                      {statusBadge(item.status)}
                    </div>

                    <h4 className="font-serif font-bold text-xs leading-snug line-clamp-2">
                      {item.articleTitle}
                    </h4>

                    <div className="text-[11px] opacity-80 flex items-center justify-between pt-1 border-t border-current/10">
                      <span>{item.authorName}</span>
                      <span>{item.submittedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Reviewer Split Workspace */}
          <div className="lg:col-span-8 space-y-6">
            {/* Automated Audit Checklist Banner */}
            <div className="bg-white rounded-2xl p-6 border border-[#062e23]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#062e23]/10 pb-3">
                <h3 className="font-serif font-bold text-base text-[#062e23] flex items-center gap-2">
                  <Sparkles size={18} className="text-[#d4a373]" />
                  <span>Audit Pembacaan Otomatis (Algoritma Verifikasi Satwalogi)</span>
                </h3>
                <span className="text-xs text-[#2d5a4c] font-mono">ID: {selectedItem.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1: Plagiarism */}
                <div className="p-3.5 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 space-y-1">
                  <div className="text-[11px] font-bold text-[#2d5a4c] uppercase tracking-wider">Skor Kepatuhan Plagiasi</div>
                  <div className="text-xl font-serif font-bold text-emerald-800">
                    {selectedItem.plagiarismScore}% <span className="text-xs font-sans text-emerald-700 font-normal">(Sangat Rendah)</span>
                  </div>
                  <div className="text-[10px] text-[#062e23]/70">Lolos ambang batas &lt; 15% Turnitin</div>
                </div>

                {/* Metric 2: Taxonomy Accuracy */}
                <div className="p-3.5 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 space-y-1">
                  <div className="text-[11px] font-bold text-[#2d5a4c] uppercase tracking-wider">Akurasi Taksonomi</div>
                  <div className="text-xl font-serif font-bold text-[#062e23]">
                    {selectedItem.taxonomyAccuracyScore}%
                  </div>
                  <div className="text-[10px] text-[#062e23]/70">Nomenklatur Latin terverifikasi BRIN</div>
                </div>

                {/* Metric 3: Citation Verified */}
                <div className="p-3.5 rounded-xl bg-[#f9faf6] border border-[#062e23]/10 space-y-1">
                  <div className="text-[11px] font-bold text-[#2d5a4c] uppercase tracking-wider">Verifikasi Crossref DOI</div>
                  <div className="text-sm font-bold text-emerald-700 flex items-center gap-1 mt-1">
                    <CheckCircle size={16} />
                    <span>Sitasi Valid</span>
                  </div>
                  <div className="text-[10px] text-[#062e23]/70">Seluruh DOI aktif dan dapat diakses</div>
                </div>
              </div>
            </div>

            {/* Article Draft Preview Container */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#062e23]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#062e23]/10 pb-3">
                <div>
                  <div className="text-xs font-bold text-[#2d5a4c] uppercase tracking-wider">
                    Draf Naskah Penulis
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#062e23] mt-0.5">
                    {selectedItem.articleTitle}
                  </h3>
                </div>
                {statusBadge(selectedItem.status)}
              </div>

              <div className="text-xs text-[#062e23]/80 space-y-1">
                <div><strong>Penulis Utama:</strong> {selectedItem.authorName} ({selectedItem.authorInstitution})</div>
                <div><strong>Kategori:</strong> {selectedItem.category} | <strong>Tanggal Kirim:</strong> {selectedItem.submittedDate}</div>
              </div>

              <div className="bg-[#f9faf6] p-4 rounded-xl border border-[#062e23]/10 space-y-2">
                <div className="text-xs font-bold text-[#d4a373] uppercase tracking-widest font-serif">
                  Abstrak Ilmiah
                </div>
                <p className="text-xs font-serif leading-relaxed text-[#062e23]">
                  "{selectedItem.abstractText}"
                </p>
              </div>

              <div className="bg-[#e8ede6] p-4 rounded-xl border border-[#062e23]/10 space-y-2 font-serif text-xs leading-relaxed">
                <div className="font-bold font-sans text-[#2d5a4c]">Cuplikan Isi Naskah:</div>
                <p>{selectedItem.previewSnippet}</p>
              </div>
            </div>

            {/* Admin Decision & Notes Panel */}
            <div className="bg-[#062e23] text-[#e8ede6] p-6 sm:p-8 rounded-2xl border border-[#d4a373]/30 shadow-xl space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#d4a373] flex items-center gap-2">
                <MessageSquare size={18} />
                <span>Catatan Verifikasi & Keputusan Dewan Redaksi</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#b4d7cd] uppercase tracking-wider mb-1">
                  Catatan Evaluasi Reviewer untuk Penulis:
                </label>
                <textarea
                  rows={3}
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1a5948] text-xs text-[#f9faf6] border border-[#d4a373]/40 focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                  placeholder="Tuliskan masukan atau permintaan revisi sitasi/taksonomi..."
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleUpdateStatus('APPROVED')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
                >
                  <Check size={16} />
                  <span>Setujui & Terbitkan Naskah</span>
                </button>

                <button
                  onClick={() => handleUpdateStatus('REVISION_NEEDED')}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
                >
                  <AlertTriangle size={16} />
                  <span>Minta Revisi Penulis</span>
                </button>

                <button
                  onClick={() => handleUpdateStatus('REJECTED')}
                  className="px-5 py-2.5 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
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
