import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Upload', page: 'upload' },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="bg-black border-b border-red-900/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => handleNavigate('home')}
            className="text-2xl tracking-widest text-red-600 hover:text-white transition-colors font-medium"
          >
            VAULT
          </button>
          
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`transition-colors uppercase text-sm tracking-widest ${
                  currentPage === item.page
                    ? 'text-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-red-600 transition-colors hidden md:block" aria-label="Search">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-red-900/20 rounded-lg transition-colors md:hidden" 
              aria-label="Menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-red-600" />
              ) : (
                <Menu className="w-6 h-6 text-red-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-b border-red-900/50 absolute w-full z-50">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`block w-full text-left px-4 py-3 border-l-2 transition-colors uppercase text-sm tracking-widest ${
                  currentPage === item.page
                    ? 'border-red-600 bg-red-950/10 text-red-600'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}