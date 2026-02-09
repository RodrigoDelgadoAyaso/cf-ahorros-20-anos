import React from 'react';
import { HelpCircle } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <header className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          {/* Stylized N Logo Representation */}
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#FF7A00] to-[#E66E00] flex items-center justify-center text-white font-black text-lg">
            N
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Nationale-Nederlanden
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <HelpCircle size={16} />
          <span className="hidden sm:inline">¿Necesitas ayuda?</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      <footer className="bg-[#F5F5F5] py-8 px-6 md:px-12 text-center md:text-left border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Nationale-Nederlanden. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#FF7A00]">Privacidad</a>
            <a href="#" className="hover:text-[#FF7A00]">Cookies</a>
            <a href="#" className="hover:text-[#FF7A00]">Aviso Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};