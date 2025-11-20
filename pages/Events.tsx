import React from 'react';
import { useData } from '../context/DataContext';
import { Calendar as CalendarIcon, MapPin, Ticket } from 'lucide-react';

const Events: React.FC = () => {
  const { events } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-brand-900">Eventos</h1>
          <p className="mt-2 text-gray-600">Acompanhe o que acontece em Santana.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md border bg-white text-gray-700">
            <option>Todos os eventos</option>
            <option>Música</option>
            <option>Festivais</option>
            <option>Arte</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-gray-100 flex flex-col md:flex-row group">
              <div className="md:w-1/4 h-48 md:h-auto relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-white/95 backdrop-blur px-2 py-1 rounded text-xs font-bold text-brand-800 shadow-sm">
                  {event.category}
                </div>
              </div>
              <div className="p-6 md:w-3/4 flex flex-col justify-center">
                <div className="flex items-center text-accent-600 font-semibold text-sm mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                  <button className="flex items-center bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm">
                    <Ticket className="w-4 h-4 mr-2" />
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">Nenhum evento programado no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;