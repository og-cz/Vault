import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";
import { useTheme } from "./ThemeContext";

// CONFIG: Set to false if you don't want VAULT logo to toggle theme
const ENABLE_LOGO_THEME_TOGGLE = true;

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isPublic, toggleTheme } = useTheme();

  const navItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "About Us", page: "about" },
    { label: "Protocols", page: "protocols" },
    { label: "Upload", page: "upload" },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  // Dynamic styles based on theme
  const headerBg = isPublic
    ? "bg-white border-blue-200"
    : "bg-black border-red-900/50";
  const brandColor = isPublic ? "text-blue-700" : "text-red-600";
  const navTextColor = isPublic
    ? "text-slate-600 hover:text-blue-700"
    : "text-gray-400 hover:text-white";
  const activeNavColor = isPublic ? "text-blue-700" : "text-red-600";
  const iconColor = isPublic ? "text-slate-600" : "text-white";

  return (
    <header
      className={`${headerBg} border-b sticky top-0 z-50 transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                ENABLE_LOGO_THEME_TOGGLE
                  ? toggleTheme()
                  : handleNavigate("home")
              }
              className={`text-2xl tracking-widest transition-colors font-medium ${brandColor} hover:scale-105 active:scale-95`}
              title={
                ENABLE_LOGO_THEME_TOGGLE
                  ? "Click to toggle theme"
                  : "Go to home"
              }
            >
              VAULT
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`transition-colors uppercase text-sm tracking-widest ${
                  currentPage === item.page ? activeNavColor : navTextColor
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              className={`p-2 transition-colors hidden md:block hover:${isPublic ? "text-blue-700" : "text-red-600"}`}
              aria-label="Search"
            >
              <Search className={`w-5 h-5 ${iconColor}`} />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg transition-colors md:hidden ${
                isPublic ? "hover:bg-blue-50" : "hover:bg-red-900/20"
              }`}
              aria-label="Menu"
            >
              {menuOpen ? (
                <X
                  className={`w-6 h-6 ${isPublic ? "text-blue-700" : "text-red-600"}`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${isPublic ? "text-blue-700" : "text-red-600"}`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden border-b absolute w-full z-50 ${isPublic ? "bg-white border-blue-200" : "bg-black border-red-900/50"}`}
        >
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`block w-full text-left px-4 py-3 border-l-2 transition-colors uppercase text-sm tracking-widest ${
                  currentPage === item.page
                    ? isPublic
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-red-600 bg-red-950/10 text-red-600"
                    : isPublic
                      ? "border-transparent text-slate-500 hover:text-blue-700 hover:bg-slate-50"
                      : "border-transparent text-gray-400 hover:text-white hover:bg-zinc-900"
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
