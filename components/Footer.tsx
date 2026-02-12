import type { Page } from '../App';
import { useTheme } from './ThemeContext';
import { Globe, Lock } from 'lucide-react';

interface FooterProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Footer({ currentPage, onNavigate }: FooterProps) {
  const { isPublic, toggleTheme } = useTheme();
  
  const getLinkClass = (page: Page) => {
    const isActive = currentPage === page;
    const activeColor = isPublic ? 'text-blue-600 font-medium' : 'text-red-600 font-medium';
    const inactiveColor = isPublic ? 'text-slate-500' : 'text-gray-400';
    const hoverColor = isPublic ? 'hover:text-blue-800' : 'hover:text-white';
    
    return `${isActive ? activeColor : inactiveColor} ${hoverColor} transition-colors uppercase`;
  };

  const themeColors = {
    bg: isPublic ? 'bg-white border-blue-200' : 'bg-black border-red-900/50',
    textPrimary: isPublic ? 'text-slate-900' : 'text-white',
    textSecondary: isPublic ? 'text-slate-500' : 'text-gray-400',
    border: isPublic ? 'border-blue-200' : 'border-red-900/50',
    accent: isPublic ? 'text-blue-600' : 'text-red-600',
    accentHover: isPublic ? 'hover:text-blue-800' : 'hover:text-red-600',
    decoration: isPublic ? 'decoration-slate-300' : 'decoration-gray-600',
  };

  return (
    <footer className={`${themeColors.bg} border-t py-16 mt-20 transition-colors duration-500 relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h2 className={`text-2xl ${themeColors.textPrimary} tracking-widest font-medium`}>VAULT</h2>
            <p className={`${themeColors.textSecondary} text-sm tracking-wide`}>
              "Our business is security of life itself..."
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className={`${themeColors.textPrimary} mb-6 uppercase tracking-widest text-sm`}>Quick Links</h3>
            <ul className="space-y-3 text-sm tracking-wide">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className={getLinkClass('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className={getLinkClass('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('protocols')}
                  className={getLinkClass('protocols')}
                >
                  Protocols
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('upload')}
                  className={getLinkClass('upload')}
                >
                  Upload
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className={`${themeColors.textPrimary} mb-6 uppercase tracking-widest text-sm`}>Contact Us</h3>
            <div className={`space-y-4 text-sm tracking-wide ${themeColors.textSecondary}`}>
              <p>Do you have any queries or suggestions?</p>
              <a href="mailto:yourinfo@gmail.com" className={`block ${isPublic ? 'text-slate-600' : 'text-gray-300'} ${themeColors.accentHover} underline ${themeColors.decoration} underline-offset-4 transition-colors`}>
                yourinfo@gmail.com
              </a>
              <div className="pt-2">
                <p>If you need support? Just give us a call.</p>
                <a href="tel:+5511122233344" className={`block ${themeColors.textPrimary} ${themeColors.accentHover} underline ${isPublic ? 'decoration-slate-400' : 'decoration-white'} underline-offset-4 transition-colors mt-1`}>
                  +55 111 222 333 44
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className={`border-t ${themeColors.border} pt-8 flex items-center justify-between`}>
           <div className={`text-xs ${themeColors.textSecondary}`}>© 2026 VAULT Corp. All Rights Reserved.</div>
           
           {/* Discreet Toggle */}
           <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full opacity-30 hover:opacity-100 transition-all duration-300 ${
                isPublic ? 'text-slate-400 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-900/20'
              }`}
              aria-label="Toggle System Mode"
              title="System Access"
            >
              {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
        </div>
      </div>
    </footer>
  );
}
