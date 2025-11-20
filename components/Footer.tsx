
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { NavItem } from '../types';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { siteInfo } = useData();

  return (
    <footer className="bg-brand-900 text-brand-100 py-12 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">EXPO SANTANA BA</h3>
            <p className="text-sm text-brand-300 leading-relaxed">
              Celebrando a história, cultura e beleza de nossa amada cidade. 
              Seu portal oficial para descobrir tudo o que Santana tem a oferecer.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={NavItem.HOME} className="hover:text-accent-500 transition-colors">Home</Link></li>
              <li><Link to={NavItem.HISTORY} className="hover:text-accent-500 transition-colors">História</Link></li>
              <li><Link to={NavItem.CULTURE} className="hover:text-accent-500 transition-colors">Cultura</Link></li>
              <li><Link to={NavItem.EVENTS} className="hover:text-accent-500 transition-colors">Eventos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-brand-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {siteInfo.contactEmail}
              </li>
              <li>{siteInfo.contactAddress}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/exposantana_ba" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-accent-500 transition-colors" title="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/share/1BhpRZf8sL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-accent-500 transition-colors" title="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://x.com/exposantanaba?s=21" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-accent-500 transition-colors" title="X (Twitter)">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-brand-800 flex justify-between items-center text-xs text-brand-400">
          <div>
            &copy; {new Date().getFullYear()} EXPO SANTANA BA. Todos os direitos reservados.
          </div>
          <div>
            {/* Link discreto para Admin */}
            <Link to={NavItem.LOGIN} className="opacity-30 hover:opacity-100 transition-opacity">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
