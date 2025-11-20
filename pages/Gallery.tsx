import React from 'react';
import { Camera } from 'lucide-react';
import { useData } from '../context/DataContext';

const Gallery: React.FC = () => {
  const { gallery } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-4">Galeria de Fotos</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Um olhar artístico sobre as belezas de Santana. Explore nossa coleção exclusiva com créditos aos talentosos fotógrafos locais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gallery.map((item) => (
          <div key={item.id} className="group relative break-inside-avoid">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-100 aspect-[4/3]">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
                <div className="flex items-center text-brand-200 mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <Camera className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Foto por: {item.photographer}</span>
                </div>
                {item.date && (
                  <span className="text-brand-300 text-xs mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {item.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {gallery.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma foto na galeria ainda.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;