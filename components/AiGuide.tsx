import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Bot } from 'lucide-react';
import { generateCityGuideResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AiGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Olá! Sou seu guia virtual de Santana. Posso ajudar com dicas de restaurantes, contar a história da cidade ou encontrar eventos. O que você gostaria de saber?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateCityGuideResponse(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-brand-600 text-white'
        }`}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
          Guia IA
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[90vw] md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right border border-gray-200 ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 to-brand-600 p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Guia de Santana</h3>
              <p className="text-xs text-brand-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full block"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                 {/* Very basic markdown parsing for lists */}
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Pergunte sobre Santana..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-brand-600 text-white p-2.5 rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2">IA pode cometer erros. Verifique informações importantes.</p>
        </div>
      </div>
    </>
  );
};

export default AiGuide;