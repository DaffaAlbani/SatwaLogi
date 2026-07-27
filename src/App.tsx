import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Screen Views
import { HomeView } from './views/HomeView';
import { SpeciesDetailView } from './views/SpeciesDetailView';
import { ArticleReaderView } from './views/ArticleReaderView';
import { ArticleEditorView } from './views/ArticleEditorView';
import { AdminVerificationView } from './views/AdminVerificationView';
import { AuthView } from './views/AuthView';
import { AuthorDashboardView } from './views/AuthorDashboardView';
import { AccountSettingsView } from './views/AccountSettingsView';

import { 
  SPECIES_DATA, 
  JOURNAL_ARTICLES, 
  ADMIN_VERIFICATION_QUEUE, 
  CURRENT_USER, 
  Species, 
  UserProfile, 
  JournalArticle, 
  AdminVerificationItem 
} from './data/satwaData';

export function App() {
  const [currentScreenId, setCurrentScreenId] = useState<string>('SCREEN_13');
  const [selectedSpecies, setSelectedSpecies] = useState<Species>(SPECIES_DATA[0]);
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);

  // Dynamic shared state for user submissions & admin moderation
  const [verificationQueue, setVerificationQueue] = useState<AdminVerificationItem[]>(ADMIN_VERIFICATION_QUEUE);
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(JOURNAL_ARTICLES);
  const [activeArticle, setActiveArticle] = useState<JournalArticle>(JOURNAL_ARTICLES[0]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreenId]);

  const handleSelectSpecies = (species: Species) => {
    setSelectedSpecies(species);
    setCurrentScreenId('SCREEN_10');
  };

  const handleLoginSuccess = (
    role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin',
    name: string,
    email: string,
    institution: string
  ) => {
    setUser((prev) => ({
      ...prev,
      role: role,
      name: name,
      email: email,
      institution: institution
    }));
  };

  // User submits a new article from Editor (SCREEN_12) -> enters Admin Verification Queue (SCREEN_14)
  const handleAddNewArticle = (newItem: AdminVerificationItem) => {
    setVerificationQueue((prev) => [newItem, ...prev]);
  };

  // Admin approves / requests revision / rejects in SCREEN_14
  const handleUpdateArticleStatus = (
    id: string,
    newStatus: 'APPROVED' | 'REVISION_NEEDED' | 'REJECTED',
    notes: string
  ) => {
    setVerificationQueue((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, status: newStatus, reviewerNotes: notes };
          
          // If admin approves, convert and publish directly to live journal feed!
          if (newStatus === 'APPROVED') {
            const publishedJournal: JournalArticle = {
              id: `art-pub-${Math.floor(Math.random() * 1000)}`,
              doi: `10.1038/s41559-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
              title: item.articleTitle,
              abstract: item.abstractText,
              authors: [
                {
                  name: item.authorName,
                  institution: item.authorInstitution,
                  role: 'Penulis Utama',
                  avatar: user.avatar
                }
              ],
              category: item.category,
              tags: item.tags || [item.category, 'Publikasi Terverifikasi'],
              publishedDate: 'Hari ini (Baru Saja)',
              readTime: '8 menit baca',
              citationsCount: 0,
              viewsCount: 1,
              pdfSize: '1.9 MB',
              peerReviewed: true,
              content: {
                introduction: item.fullBody || item.previewSnippet,
                methodology: 'Penelitian ini menggunakan transek lapangan terverifikasi dan analisis spasial habitat tropis.',
                results: 'Data lapangan mengonfirmasi akurasi taksonomi dan tingkat keterhubungan vegetasi.',
                discussion: 'Temuan memperkuat rekomendasi pelindungan koridor habitat megasatwa terancam punah.',
                conclusion: 'Naskah ini disetujui dan diterbitkan melalui proses peer-review Dewan Redaksi BRIN.'
              },
              references: [
                { id: 1, text: `${item.authorName}. (2026). ${item.articleTitle}. Jurnal Satwalogi Indonesia.`, doi: `10.1038/satwalogi.2026.${item.id}` }
              ]
            };

            setJournalArticles((articles) => [publishedJournal, ...articles]);
            setActiveArticle(publishedJournal);
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const renderCurrentScreen = () => {
    switch (currentScreenId) {
      case 'SCREEN_13':
        return (
          <HomeView
            onSelectSpecies={handleSelectSpecies}
            onNavigateScreen={setCurrentScreenId}
          />
        );

      case 'SCREEN_10':
        return (
          <SpeciesDetailView
            selectedSpecies={selectedSpecies}
            onNavigateScreen={setCurrentScreenId}
          />
        );

      case 'SCREEN_5':
        return (
          <ArticleReaderView
            article={activeArticle}
            onNavigateScreen={setCurrentScreenId}
          />
        );

      case 'SCREEN_12':
        return (
          <ArticleEditorView
            currentUser={user}
            onNavigateScreen={setCurrentScreenId}
            onSubmitArticle={handleAddNewArticle}
          />
        );

      case 'SCREEN_14':
        return (
          <AdminVerificationView
            queue={verificationQueue}
            onUpdateStatus={handleUpdateArticleStatus}
            onNavigateScreen={setCurrentScreenId}
          />
        );

      case 'SCREEN_11':
        return (
          <AuthView
            onNavigateScreen={setCurrentScreenId}
            onLoginSuccess={handleLoginSuccess}
          />
        );

      case 'SCREEN_8':
        return (
          <AuthorDashboardView
            user={user}
            verificationQueue={verificationQueue}
            onNavigateScreen={setCurrentScreenId}
          />
        );

      case 'SCREEN_6':
        return (
          <AccountSettingsView
            user={user}
            onNavigateScreen={setCurrentScreenId}
          />
        );

      default:
        return (
          <HomeView
            onSelectSpecies={handleSelectSpecies}
            onNavigateScreen={setCurrentScreenId}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9faf6] text-[#062e23] font-sans">
      <Header
        currentScreenId={currentScreenId}
        onNavigateScreen={setCurrentScreenId}
        user={user}
      />

      <main className="flex-grow">
        {renderCurrentScreen()}
      </main>

      <Footer onNavigateScreen={setCurrentScreenId} />
    </div>
  );
}

export default App;
