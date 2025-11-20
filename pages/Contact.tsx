
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { siteInfo } = useData();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-xl border border-green-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h2>
          <p className="text-gray-600 mb-6">Obrigado pelo seu contato. Nossa equipe responderá em breve.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-brand-600 font-medium hover:underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">Fale Conosco</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Tem alguma sugestão, dúvida ou quer compartilhar uma história sobre Santana? 
            Ficaremos felizes em ouvir você. Não é necessário cadastro para entrar em contato.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center shrink-0 mr-4">
                <Mail className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">{siteInfo.contactEmail}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center shrink-0 mr-4">
                <Phone className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Telefone</p>
                <p className="text-lg font-semibold text-gray-900">{siteInfo.contactPhone}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center shrink-0 mr-4">
                <MapPin className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Localização</p>
                <p className="text-lg font-semibold text-gray-900">{siteInfo.contactAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                id="name"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
              <select
                id="subject"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-brand-500 focus:border-brand-500 transition-shadow bg-white"
              >
                <option>Sugestão de Evento</option>
                <option>Dúvida sobre Turismo</option>
                <option>Reportar Erro</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea
                id="message"
                rows={4}
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-brand-500 focus:border-brand-500 transition-shadow resize-none"
                placeholder="Como podemos ajudar?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
