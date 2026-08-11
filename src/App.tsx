import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastProvider, useToast } from './components/Toast';

import { AudioSoundboardWidget } from './components/AudioSoundboardWidget';
import { BiodiversityCalculatorModal } from './components/BiodiversityCalculatorModal';

// Screen Views
import { HomeView } from './views/HomeView';
import { SpeciesDetailView } from './views/SpeciesDetailView';
import { SpeciesCatalogView } from './views/SpeciesCatalogView';
import { ArticleReaderView } from './views/ArticleReaderView';
import { ArticleEditorView } from './views/ArticleEditorView';
import { AdminVerificationView } from './views/AdminVerificationView';
import { AuthView } from './views/AuthView';
import { AuthorDashboardView } from './views/AuthorDashboardView';
import { JournalView } from './views/JournalView';
import { AccountSettingsView } from './views/AccountSettingsView';

import { 
  SPECIES_DATA, 
  JOURNAL_ARTICLES, 
  ADMIN_VERIFICATION_QUEUE, 
  Species, 
  UserProfile, 
  JournalArticle, 
  AdminVerificationItem 
} from './data/satwaData';

import { fetchInitialCrossRefArticles, searchCrossRefWorks } from './utils/crossrefApi';

import {
  getDatabase,
  runMigrations,
  seedInitialData,
  startAutoSave,
  stopAutoSave,
  closeDatabase,
} from './utils/database';

function AppContent() {
  const { showToast } = useToast();
  const [currentScreenId, setCurrentScreenId] = useState<string>('SCREEN_13');
  const [previousScreenId, setPreviousScreenId] = useState<string>('SCREEN_13');
  const [selectedSpecies, setSelectedSpecies] = useState<Species>(SPECIES_DATA[0]);

  // Initial user state (with session persistence check)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('satwalogi_session_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Shared state for articles & queue
  const [verificationQueue, setVerificationQueue] = useState<AdminVerificationItem[]>(ADMIN_VERIFICATION_QUEUE);
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(JOURNAL_ARTICLES);
  const [activeArticle, setActiveArticle] = useState<JournalArticle>(JOURNAL_ARTICLES[0]);

  // CrossRef loading state
  const [isCrossRefLoading, setIsCrossRefLoading] = useState(false);

  // Database initialization flag
  const [dbReady, setDbReady] = useState(false);

  // Initialize SQLite database on mount
  useEffect(() => {
    let mounted = true;

    async function initDatabase() {
      try {
        const database = await getDatabase();
        await runMigrations();
        seedInitialData();
        startAutoSave();
        if (mounted) setDbReady(true);
        console.log('SQLite database initialized successfully.', database);
      } catch (err) {
        console.warn('Database init failed, falling back to in-memory state:', err);
        if (mounted) setDbReady(true);
      }
    }

    initDatabase();

    return () => {
      mounted = false;
      stopAutoSave();
      closeDatabase();
    };
  }, []);

  // Auto-fetch CrossRef articles on mount (after db is ready)
  useEffect(() => {
    if (!dbReady) return;

    let cancelled = false;

    async function loadInitialArticles() {
      setIsCrossRefLoading(true);
      try {
        const fetchedArticles = await fetchInitialCrossRefArticles(8);
        if (!cancelled && fetchedArticles.length > 0) {
          setJournalArticles((prev) => {
            const combined = [...prev, ...fetchedArticles];
            const seen = new Set<string>();
            return combined.filter((art) => {
              const key = art.id || art.doi;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          });
        }
      } catch (err) {
        console.warn('Gagal memuat artikel dari CrossRef:', err);
      } finally {
        if (!cancelled) {
          setIsCrossRefLoading(false);
        }
      }
    }

    loadInitialArticles();

    return () => {
      cancelled = true;
    };
  }, [dbReady]);

  // Navigate with animation tracking
  const navigateTo = (screenId: string) => {
    setPreviousScreenId(currentScreenId);
    setCurrentScreenId(screenId);
  };

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreenId]);

  // Navigation guard: redirect if not authorized
  const requireAuth = (screenId: string, requiredRole?: string): boolean => {
    if (!user) {
      showToast('Silakan masuk/login terlebih dahulu untuk mengakses halaman ini.', 'warning');
      navigateTo('SCREEN_11');
      return false;
    }
    if (requiredRole === 'Admin' && user.role !== 'Admin') {
      showToast('Halaman ini khusus untuk Admin Satwalogi.', 'error');
      navigateTo('SCREEN_13');
      return false;
    }
    return true;
  };

  // Wrapped navigation that checks access
  const handleNavigateScreen = (screenId: string) => {
    // Protect sensitive screens
    if (screenId === 'SCREEN_12' && !requireAuth('SCREEN_12')) return;
    if (screenId === 'SCREEN_14' && !requireAuth('SCREEN_14', 'Admin')) return;
    if (screenId === 'SCREEN_8' && !requireAuth('SCREEN_8')) return;
    if (screenId === 'SCREEN_6' && !requireAuth('SCREEN_6')) return;
    navigateTo(screenId);
  };

  const handleSelectSpecies = (species: Species) => {
    setSelectedSpecies(species);
    navigateTo('SCREEN_10_DETAIL');
  };

  const handleSelectArticle = (article: JournalArticle) => {
    setActiveArticle(article);
    navigateTo('SCREEN_5');
  };

  const handleSearchCrossRef = async (query: string) => {
    if (!query.trim()) return;
    setIsCrossRefLoading(true);
    try {
      const results = await searchCrossRefWorks(query, 12);
      setJournalArticles(results);
    } catch (err) {
      console.error('CrossRef search error:', err);
      showToast('Gagal mencari artikel di CrossRef. Silakan coba lagi.', 'error');
    } finally {
      setIsCrossRefLoading(false);
    }
  };

  const handleResetCrossRef = () => {
    setJournalArticles([]);
    setIsCrossRefLoading(false);
  };

  const handleLoginSuccess = (
    role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin',
    name: string,
    email: string,
    institution: string,
    targetScreen?: string
  ) => {
    const isAdmin = role === 'Admin' || email.toLowerCase() === 'admin@satwalogi.or.id';
    
    // Count user's submitted articles in queue
    const userSubmissions = verificationQueue.filter(
      (item) =>
        (item.authorEmail && item.authorEmail.toLowerCase() === email.toLowerCase()) ||
        (item.authorName && item.authorName.toLowerCase().includes(name.toLowerCase()))
    );

    const newUserObj: UserProfile = {
      id: `usr-${Math.floor(Math.random() * 900 + 100)}`,
      name: name,
      title: isAdmin ? 'Admin Moderator Satwalogi' : 'Penulis Kontributor',
      institution: institution || 'Universitas / Umum',
      email: email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Kontributor aktif platform Satwalogi Indonesia.',
      scientificInterests: ['Ornitologi', 'Konservasi Genetik', 'Mamalogi'],
      stats: {
        totalArticles: isAdmin ? 12 : userSubmissions.length,
        totalCitations: isAdmin ? 340 : 0,
        totalReads: isAdmin ? 15400 : 0,
        hIndex: isAdmin ? 12 : 0
      },
      bookmarks: []
    };

    setUser(newUserObj);
    try {
      localStorage.setItem('satwalogi_session_user', JSON.stringify(newUserObj));
    } catch {
      // Ignore localStorage write error
    }

    showToast(`Selamat datang, ${name}! (${role})`, 'success');
    const destination = targetScreen || (role === 'Admin' ? 'SCREEN_14' : 'SCREEN_8');
    navigateTo(destination);
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('satwalogi_session_user');
    } catch {
      // Ignore localStorage remove error
    }
    showToast('Anda telah keluar dari akun.', 'info');
    navigateTo('SCREEN_13');
  };

  const handleAddNewArticle = (newItem: AdminVerificationItem) => {
    setVerificationQueue((prev) => [newItem, ...prev]);
    
    if (user) {
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          totalArticles: user.stats.totalArticles + 1
        }
      };
      setUser(updatedUser);
      try {
        localStorage.setItem('satwalogi_session_user', JSON.stringify(updatedUser));
      } catch {}
    }

    // Persist to SQLite (fire-and-forget)
    import('./utils/database').then(({ saveVerificationItem }) => {
      saveVerificationItem(newItem);
    });
  };

  const handleUpdateArticleStatus = (
    id: string,
    newStatus: 'APPROVED' | 'REVISION_NEEDED' | 'REJECTED',
    notes: string
  ) => {
    setVerificationQueue((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, status: newStatus, reviewerNotes: notes };
          
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
                  avatar: user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
                }
              ],
              coverImage: item.coverImage,
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

            // Persist approved article to SQLite
            import('./utils/database').then(({ saveArticle }) => {
              saveArticle(publishedJournal);
            });
          }

          // Persist status update to SQLite
          import('./utils/database').then(({ updateVerificationStatus }) => {
            updateVerificationStatus(id, newStatus, notes);
          });

          return updatedItem;
        }
        return item;
      })
    );
  };

  const renderCurrentScreen = () => {
    const screenContent = (() => {
      switch (currentScreenId) {
        case 'SCREEN_13':
          return (
            <HomeView
              onSelectSpecies={handleSelectSpecies}
              onNavigateScreen={handleNavigateScreen}
            />
          );

        case 'SCREEN_15':
          return (
            <JournalView
              journalArticles={journalArticles}
              isCrossRefLoading={isCrossRefLoading}
              onSelectArticle={handleSelectArticle}
              onSearchCrossRef={handleSearchCrossRef}
              onResetCrossRef={handleResetCrossRef}
              onNavigateScreen={handleNavigateScreen}
            />
          );

        case 'SCREEN_10':
          return (
            <SpeciesCatalogView
              onSelectSpecies={handleSelectSpecies}
              onNavigateScreen={handleNavigateScreen}
            />
          );

        case 'SCREEN_10_DETAIL':
          return (
            <SpeciesDetailView
              selectedSpecies={selectedSpecies}
              onNavigateScreen={handleNavigateScreen}
              onSelectSpecies={handleSelectSpecies}
            />
          );

        case 'SCREEN_5':
          return (
            <ArticleReaderView
              article={activeArticle}
              onNavigateScreen={handleNavigateScreen}
            />
          );

        case 'SCREEN_12':
          return (
            <ArticleEditorView
              currentUser={user}
              onNavigateScreen={handleNavigateScreen}
              onSubmitArticle={handleAddNewArticle}
            />
          );

        case 'SCREEN_14':
          return (
            <AdminVerificationView
              queue={verificationQueue}
              onUpdateStatus={handleUpdateArticleStatus}
              onNavigateScreen={handleNavigateScreen}
            />
          );

        case 'SCREEN_11':
          return (
            <AuthView
              onNavigateScreen={handleNavigateScreen}
              onLoginSuccess={handleLoginSuccess}
            />
          );

        case 'SCREEN_8':
          return (
            <AuthorDashboardView
              user={user}
              verificationQueue={verificationQueue}
              onNavigateScreen={handleNavigateScreen}
              onSelectArticle={handleSelectArticle}
            />
          );

        case 'SCREEN_6':
          return (
            <AccountSettingsView
              user={user}
              onNavigateScreen={handleNavigateScreen}
            />
          );

        default:
          return (
            <HomeView
              onSelectSpecies={handleSelectSpecies}
              onNavigateScreen={handleNavigateScreen}
            />
          );
      }
    })();

    return (
      <div className="animate-fade-in">
        {screenContent}
      </div>
    );
  };

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9faf6] text-[#062e23] font-sans relative">
      <Header
        currentScreenId={currentScreenId}
        onNavigateScreen={handleNavigateScreen}
        user={user}
        onLogout={handleLogout}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      <main className="flex-grow">
        {renderCurrentScreen()}
      </main>

      <Footer onNavigateScreen={handleNavigateScreen} />

      {/* Floating Interactive Widgets */}
      <AudioSoundboardWidget onSelectSpecies={handleSelectSpecies} />
      <BiodiversityCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
