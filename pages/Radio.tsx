
import React, { useState } from 'react';
import { Radio as RadioIcon, ExternalLink, Headphones, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

const Radio: React.FC = () => {
  const { siteInfo } = useData();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-900 text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-800/50 mix-blend-overlay z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm animate-pulse">
              <RadioIcon className="w-8 h-8 text-accent-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2 tracking-tight">
            Rádio Nativa <span className="text-accent-500">104.9 FM</span>
          </h1>
          <p className="text-brand-200 text-base max-w-2xl mx-auto font-light">
            A voz de Santana.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 -mt-8 relative z-20">
        {/* Main Player Card */}
        <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
          
          {/* Player Area - Embeds the External Player directly */}
          <div className="relative w-full aspect-video md:aspect-[21/9] bg-black flex flex-col">
            
            <div className="flex-1 relative bg-black">
              {/* Cover / Loader behind iframe */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                 <div className="text-center">
                    <Headphones className="w-16 h-16 text-gray-700 mx-auto mb-2 animate-bounce" />
                    <p className="text-gray-600 text-sm">Carregando player...</p>
                 </div>
              </div>

              {/* The Embed */}
              <iframe 
                key={refreshKey}
                src={siteInfo.radioUrl} 
                title="Player Rádio Nativa"
                className="w-full h-full absolute inset-0 z-10 border-0"
                allow="autoplay; encrypted-media"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              ></iframe>
            </div>

            {/* Control Bar (Visual) */}
            <div className="bg-gray-800 p-3 flex justify-between items-center border-t border-gray-700 z-20 relative">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Ao Vivo</span>
               </div>
               
               <div className="flex gap-3">
                 <button 
                   onClick={handleRefresh}
                   className="text-gray-400 hover:text-white transition-colors flex items-center text-xs gap-1"
                   title="Recarregar Player"
                 >
                   <RefreshCw className="w-3 h-3" /> Recarregar
                 </button>
                 <a 
                   href={siteInfo.radioUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-accent-500 hover:text-accent-400 transition-colors flex items-center text-xs gap-1 font-bold"
                 >
                   Abrir no Site Oficial <ExternalLink className="w-3 h-3" />
                 </a>
               </div>
            </div>
          </div>
        </div>
        
        {/* Info Adicional */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group hover:border-brand-200 transition-all">
                <h3 className="font-bold text-gray-900 mb-2">Programação Local</h3>
                <p className="text-sm text-gray-500">Notícias e eventos da nossa região.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group hover:border-brand-200 transition-all">
                <h3 className="font-bold text-gray-900 mb-2">Música</h3>
                <p className="text-sm text-gray-500">Os maiores sucessos tocam aqui.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group hover:border-brand-200 transition-all">
                <h3 className="font-bold text-gray-900 mb-2">Créditos</h3>
                <p className="text-sm text-gray-500">Transmissão oficial via Rádios.com.br</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Radio;