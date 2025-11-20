import React from 'react';
import { Place } from '../types';
import { MapPin } from 'lucide-react';

const Attractions: React.FC = () => {
  const attractions: Place[] = [
    {
      id: 'a1',
      name: 'Igreja Matriz de Santana',
      description: 'Construída no século XVIII, possui arquitetura barroca e um acervo de arte sacra impressionante.',
      image: 'https://picsum.photos/800/600?random=20',
      type: 'Histórico'
    },
    {
      id: 'a2',
      name: 'Parque das Águas',
      description: 'Área de preservação ambiental ideal para caminhadas, piqueniques e observação de pássaros.',
      image: 'https://picsum.photos/800/600?random=21',
      type: 'Atração'
    },
    {
      id: 'a3',
      name: 'Mercado Municipal',
      description: 'O coração pulsante da cidade, onde se encontram artesanato, temperos e a cultura local.',
      image: 'https://picsum.photos/800/600?random=22',
      type: 'Atração'
    }
  ];

  return (
    <div className="bg-white pb-16">
      <div className="bg-brand-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Explore Santana</h1>
        <p className="text-brand-200 text-lg max-w-2xl mx-auto">
          Roteiros imperdíveis para quem quer conhecer a essência da nossa cidade.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 gap-12">
          {attractions.map((place, index) => (
            <div key={place.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-brand-800">
                    {place.type}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">{place.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {place.description}
                </p>
                <button className="flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group">
                  <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                  Ver no mapa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attractions;