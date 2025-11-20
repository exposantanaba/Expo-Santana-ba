import React from 'react';
import { Place } from '../types';
import { Star } from 'lucide-react';

const Gastronomy: React.FC = () => {
  const restaurants: Place[] = [
    {
      id: '1',
      name: 'Sabores da Terra',
      description: 'Culinária típica feita no fogão a lenha. O melhor feijão tropeiro da região.',
      image: 'https://picsum.photos/600/400?random=10',
      type: 'Gastronomia',
      address: 'Rua das Flores, 45',
      rating: 5
    },
    {
      id: '2',
      name: 'Café do Porto',
      description: 'Cafés especiais e bolos caseiros com vista para o rio.',
      image: 'https://picsum.photos/600/400?random=11',
      type: 'Gastronomia',
      address: 'Av. Beira Rio, 200',
      rating: 4
    },
    {
      id: '3',
      name: 'Bistrô Imperial',
      description: 'Alta gastronomia com ingredientes locais em um casarão histórico.',
      image: 'https://picsum.photos/600/400?random=12',
      type: 'Gastronomia',
      address: 'Praça Central, 10',
      rating: 5
    },
    {
      id: '4',
      name: 'Doceria da Vovó',
      description: 'Doces compotas e cristalizados tradicionais de Santana.',
      image: 'https://picsum.photos/600/400?random=13',
      type: 'Gastronomia',
      address: 'Rua do Comércio, 88',
      rating: 4
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Gastronomia</h1>
        <p className="mt-4 text-lg text-gray-600">
          Descubra onde comer em Santana. Dos pratos típicos aos cafés aconchegantes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {restaurants.map((place) => (
          <div key={place.id} className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="md:w-2/5 relative">
              <img 
                src={place.image} 
                alt={place.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{place.name}</h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    {place.rating}.0
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{place.description}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 flex items-center">
                  <span className="font-semibold mr-1">Endereço:</span> {place.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gastronomy;