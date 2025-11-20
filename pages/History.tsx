
import React from 'react';
import { useData } from '../context/DataContext';
import { BookOpen } from 'lucide-react';

const History: React.FC = () => {
  const { history } = useData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Nossa História</h1>
        <p className="text-lg text-gray-600">Das raízes humildes ao desenvolvimento contemporâneo.</p>
      </div>

      <div className="relative border-l-2 border-brand-200 ml-4 md:ml-0 md:mx-auto space-y-12">
        {history.length > 0 ? (
          history.map((item, idx) => (
            <div key={item.id} className="relative pl-8 md:pl-0">
              {/* Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-brand-600 rounded-full border-4 border-white shadow-sm md:left-1/2 md:-ml-[9px]"></div>
              
              <div className={`md:flex items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-5/12 mb-4 md:mb-0"></div>
                <div className="md:w-5/12 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 group">
                  <span className="text-accent-600 font-bold text-xl block mb-2 group-hover:scale-110 transition-transform origin-left">{item.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum registro histórico adicionado ainda.</p>
          </div>
        )}
      </div>

      {/* Seção Arquivo Municipal removida conforme solicitado */}
    </div>
  );
};

export default History;
