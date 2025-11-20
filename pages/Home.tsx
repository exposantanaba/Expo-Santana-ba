
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Map, ArrowRight, BookOpen, Camera } from 'lucide-react';
import { NavItem } from '../types';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { siteInfo } = useData();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Dynamic Background Image */}
          <img
            src={siteInfo.heroBackgroundImage}
            alt="Cidade de Santana"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight drop-shadow-lg">
            {siteInfo.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-brand-50 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {siteInfo.heroSubtitle}
          </p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={NavItem.EVENTS}
              className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-accent-500/30 transform hover:-translate-y-1 border border-transparent"
            >
              Próximos Eventos
            </Link>
            <Link
              to={NavItem.GALLERY}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-bold rounded-full transition-all shadow-lg"
            >
              Ver Galeria
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-24 relative z-20">
          {[
            { icon: Calendar, title: "Agenda Cultural", desc: "Festivais e shows.", link: NavItem.EVENTS },
            { icon: Map, title: "Pontos Turísticos", desc: "Belezas naturais.", link: NavItem.ATTRACTIONS },
            { icon: BookOpen, title: "Nossa História", desc: "Raízes e tradições.", link: NavItem.HISTORY },
            { icon: Camera, title: "Galeria de Fotos", desc: "Olhares da cidade.", link: NavItem.GALLERY },
          ].map((item, idx) => (
            <Link key={idx} to={item.link} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 group border border-brand-50">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
                <item.icon className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-brand-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 mb-4 text-sm leading-relaxed">{item.desc}</p>
              <div className="flex items-center text-brand-600 font-semibold text-sm group-hover:text-brand-700">
                Explorar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-3 bg-brand-50 inline-block px-3 py-1 rounded-full">Destaques</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-900">O Que Está Acontecendo</h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{siteInfo.welcomeMessage}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-6 items-start group p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-brand-50">
              <div className="w-24 text-center shrink-0 bg-brand-100 rounded-xl py-3 text-brand-800">
                <span className="block text-3xl font-bold">12</span>
                <span className="block text-xs font-bold uppercase tracking-wider">Out</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">Festival de Gastronomia Local</h4>
                <p className="text-gray-500 mb-3 text-sm">Venha provar os sabores únicos de Santana na praça principal.</p>
                <Link to={NavItem.GASTRONOMY} className="text-sm font-bold text-accent-600 hover:text-accent-700 flex items-center">Ver detalhes &rarr;</Link>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200"></div>
            <div className="flex gap-6 items-start group p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-brand-50">
              <div className="w-24 text-center shrink-0 bg-brand-100 rounded-xl py-3 text-brand-800">
                <span className="block text-3xl font-bold">05</span>
                <span className="block text-xs font-bold uppercase tracking-wider">Nov</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">Aniversário da Cidade</h4>
                <p className="text-gray-500 mb-3 text-sm">Desfiles, música ao vivo e queima de fogos para celebrar nossa história.</p>
                <Link to={NavItem.EVENTS} className="text-sm font-bold text-accent-600 hover:text-accent-700 flex items-center">Ver programação &rarr;</Link>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
            <img 
              src="https://picsum.photos/800/600?random=1" 
              alt="Imagem destaque" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 to-transparent flex items-end p-10">
              <p className="text-white font-serif text-2xl italic leading-relaxed">"Santana é onde a tradição encontra a modernidade em perfeita harmonia."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
