import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ProtocolsPage } from './components/pages/ProtocolsPage';
import { UploadPage } from './components/pages/UploadPage';
import { Footer } from './components/Footer';
import { ThemeProvider, useTheme } from './components/ThemeContext';

export type Page = 'home' | 'about' | 'upload' | 'protocols';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isPublic } = useTheme();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'protocols':
        return <ProtocolsPage />;
      case 'upload':
        return <UploadPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isPublic ? 'bg-slate-50' : 'bg-black'}`}>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
