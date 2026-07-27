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

import { SPECIES_DATA, CURRENT_USER, Species, UserProfile } from './data/satwaData';

export function App() {
  const [currentScreenId, setCurrentScreenId] = useState<string>('SCREEN_13');
  const [selectedSpecies, setSelectedSpecies] = useState<Species>(SPECIES_DATA[0]);
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreenId]);

  const handleSelectSpecies = (species: Species) => {
    setSelectedSpecies(species);
    setCurrentScreenId('SCREEN_10');
  };

  const handleLoginSuccess = (roleName: string) => {
    setUser((prev) => ({
      ...prev,
      role: roleName as any
    }));
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
            onNavigateScreen={setCurrentScreenId}
          />
        );

      case 'SCREEN_12':
        return (
          <ArticleEditorView
            onNavigateScreen={setCurrentScreenId}
          />
        );

      case 'SCREEN_14':
        return (
          <AdminVerificationView
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
