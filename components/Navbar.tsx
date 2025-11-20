
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Radio, Store } from 'lucide-react';
import { NavItem } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: NavItem.HOME },
    { name: 'Eventos', path: NavItem.EVENTS },
    { name: 'Comércio', path: NavItem.BUSINESSES },
    { name: 'Galeria', path: NavItem.GALLERY },
    { name: 'Rádio', path: NavItem.RADIO },
    { name: 'História', path: NavItem.HISTORY },
    { name: 'Cultura', path: NavItem.CULTURE },
    { name: 'Gastronomia', path: NavItem.GASTRONOMY },
    { name: 'Atrações', path: NavItem.ATTRACTIONS },
    { name: 'Contato', path: NavItem.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              {/* Ícone removido conforme solicitado */}
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-brand-900 tracking-tight group-hover:text-brand-700 transition-colors">EXPO SANTANA BA</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-brand-700 bg-brand-50 font-bold'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {link.name === 'Rádio' ? (
                  <span className="flex items-center gap-1">
                    <Radio className="w-4 h-4" />
                    {link.name}
                  </span>
                ) : link.name === 'Comércio' ? (
                   <span className="flex items-center gap-1">
                    <Store className="w-4 h-4" />
                    {link.name}
                  </span>
                ) : (
                  link.name
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-600 hover:bg-brand-50 focus:outline-none"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
