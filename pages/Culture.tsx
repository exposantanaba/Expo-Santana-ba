import React from 'react';
import { Article } from '../types';

const Culture: React.FC = () => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'A Dança das Fitas',
      excerpt: 'Uma tradição secular que colore as ruas de Santana todos os anos em maio.',
      content: '...',
      author: 'Maria Silva',
      date: '10 Out 2023',
      image: 'https://picsum.photos/600/400?random=2',
      tags: ['Tradição', 'Dança']
    },
    {
      id: '2',
      title: 'Artesanato em Barro',
      excerpt: 'Conheça os mestres oleiros que mantêm viva a técnica ancestral de moldar o barro.',
      content: '...',
      author: 'João Santos',
      date: '22 Set 2023',
      image: 'https://picsum.photos/600/400?random=3',
      tags: ['Artesanato', 'Arte']
    },
    {
      id: '3',
      title: 'Lendas Urbanas',
      excerpt: 'Histórias contadas pelos mais velhos sobre os mistérios das noites de lua cheia.',
      content: '...',
      author: 'Ana Costa',
      date: '15 Ago 2023',
      image: 'https://picsum.photos/600/400?random=4',
      tags: ['Folclore', 'Mistério']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Cultura e Tradição</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Santana respira cultura. Explore nossos artigos sobre as manifestações artísticas e folclóricas que definem nossa identidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold uppercase tracking-wider text-accent-600 bg-accent-50 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
                <span>Por {article.author}</span>
                <span>{article.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Culture;