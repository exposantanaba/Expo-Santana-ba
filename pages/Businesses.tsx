
import React from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Phone, ShoppingBag } from 'lucide-react';

const Businesses: React.FC = () => {
  const { businesses } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-brand-900 mb-4">Comércio Local</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Encontre supermercados, farmácias, lojas e serviços essenciais em Santana. 
          Apoie o comércio da nossa cidade!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <div key={business.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all group">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={business.image} 
                  alt={business.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-brand-800 shadow-sm">
                  {business.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors">{business.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start text-gray-600 text-sm">
                    <MapPin className="w-5 h-5 mr-3 text-brand-500 shrink-0" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone className="w-5 h-5 mr-3 text-brand-500 shrink-0" />
                    <span>{business.phone}</span>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/55${business.phone.replace(/\D/g, '')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-50 text-green-700 py-3 rounded-xl font-bold hover:bg-green-100 transition-colors"
                >
                  Entrar em Contato
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum comércio cadastrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Businesses;
