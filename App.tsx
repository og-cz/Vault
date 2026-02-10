import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { UploadPage } from './components/pages/UploadPage';
import { Footer } from './components/Footer';

export type Page = 'home' | 'about' | 'upload';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'upload':
        return <UploadPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}