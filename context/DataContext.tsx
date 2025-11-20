
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Event, GalleryItem, SiteInfo, Business, HistoryItem } from '../types';

interface DataContextType {
  events: Event[];
  gallery: GalleryItem[];
  siteInfo: SiteInfo;
  businesses: Business[];
  history: HistoryItem[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  updateSiteInfo: (info: SiteInfo) => void;
  addBusiness: (business: Business) => void;
  deleteBusiness: (id: string) => void;
  addHistoryItem: (item: HistoryItem) => void;
  deleteHistoryItem: (id: string) => void;
}

// ==================================================================================
// ÁREA DE DADOS INICIAIS (Cole o JSON gerado no Painel Admin AQUI)
// ==================================================================================

const DEFAULT_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Festival de Jazz de Santana',
    date: '15 Out, 19:00',
    location: 'Teatro Municipal',
    description: 'Três dias de música instrumental com artistas locais e nacionais.',
    image: 'https://picsum.photos/600/400?random=30',
    category: 'Música'
  },
  {
    id: 'e2',
    title: 'Feira de Artesanato',
    date: 'Todos os Domingos, 09:00',
    location: 'Praça da Matriz',
    description: 'Exposição e venda de produtos artesanais feitos pela comunidade.',
    image: 'https://picsum.photos/600/400?random=31',
    category: 'Arte'
  },
  {
    id: 'e3',
    title: 'Corrida Histórica',
    date: '20 Nov, 07:00',
    location: 'Parque das Águas',
    description: 'Maratona de 5km passando pelos principais pontos históricos.',
    image: 'https://picsum.photos/600/400?random=32',
    category: 'Esporte'
  },
];

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Pôr do sol no Rio',
    photographer: 'Carlos Almeida',
    imageUrl: 'https://picsum.photos/800/600?random=50',
    date: '2023'
  },
  {
    id: 'g2',
    title: 'Festa da Padroeira',
    photographer: 'Ana Souza',
    imageUrl: 'https://picsum.photos/800/600?random=51',
    date: '2023'
  },
  {
    id: 'g3',
    title: 'Casarões Antigos',
    photographer: 'Marcos Lima',
    imageUrl: 'https://picsum.photos/800/600?random=52',
    date: '2022'
  }
];

const DEFAULT_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'Supermercado Santana',
    category: 'Supermercado',
    address: 'Av. Principal, 100, Centro',
    phone: '(77) 3456-7890',
    image: 'https://picsum.photos/600/400?random=60'
  },
  {
    id: 'b2',
    name: 'Farmácia Saúde',
    category: 'Farmácia',
    address: 'Rua das Flores, 25',
    phone: '(77) 3456-1234',
    image: 'https://picsum.photos/600/400?random=61'
  }
];

const DEFAULT_HISTORY: HistoryItem[] = [
  { id: 'h1', year: '1758', title: 'Fundação', description: 'A cidade foi fundada inicialmente como um pequeno povoado à beira do rio.' },
  { id: 'h2', year: '1822', title: 'Independência Econômica', description: 'Com o crescimento da agricultura local, Santana tornou-se um polo comercial.' },
  { id: 'h3', year: '1950', title: 'Modernização', description: 'Abertura das primeiras estradas pavimentadas e construção da Praça Matriz.' },
  { id: 'h4', year: '2000', title: 'Patrimônio Cultural', description: 'O centro histórico foi tombado como patrimônio cultural do estado.' },
];

const DEFAULT_SITE_INFO: SiteInfo = {
  heroTitle: 'Descubra a Alma de Santana',
  heroSubtitle: 'Um guia completo sobre a história, gastronomia e eventos que tornam nossa cidade única.',
  welcomeMessage: 'Bem-vindo ao EXPO SANTANA BA, o portal oficial de turismo e cultura da nossa região.',
  heroBackgroundImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
  radioUrl: 'https://www.radios.com.br/play/187832',
  contactEmail: 'suporte@exposantanaba.com',
  contactPhone: '(77) 1234-5678',
  contactAddress: 'Praça da Matriz, 123, Centro, Santana'
};

// ==================================================================================
// FIM DA ÁREA DE DADOS INICIAIS
// ==================================================================================

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Helper para carregar dados com segurança (try-catch) para evitar tela branca
  const loadState = <T,>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.error(`Erro ao carregar ${key} do cache, usando padrão.`, e);
      return defaultValue;
    }
  };

  const [events, setEvents] = useState<Event[]>(() => loadState('app_events', DEFAULT_EVENTS));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadState('app_gallery', DEFAULT_GALLERY));
  const [businesses, setBusinesses] = useState<Business[]>(() => loadState('app_businesses', DEFAULT_BUSINESSES));
  const [history, setHistory] = useState<HistoryItem[]>(() => loadState('app_history', DEFAULT_HISTORY));

  const [siteInfo, setSiteInfo] = useState<SiteInfo>(() => {
    try {
      const saved = localStorage.getItem('app_site_info');
      if (saved) {
        // Merge com DEFAULT para garantir que novos campos existam
        return { ...DEFAULT_SITE_INFO, ...JSON.parse(saved) };
      }
      return DEFAULT_SITE_INFO;
    } catch (e) {
      console.error("Erro ao carregar siteInfo, resetando.", e);
      return DEFAULT_SITE_INFO;
    }
  });

  // Persistência local
  useEffect(() => { localStorage.setItem('app_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('app_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('app_businesses', JSON.stringify(businesses)); }, [businesses]);
  useEffect(() => { localStorage.setItem('app_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('app_site_info', JSON.stringify(siteInfo)); }, [siteInfo]);

  const addEvent = (event: Event) => setEvents([...events, event]);
  const updateEvent = (updatedEvent: Event) => setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  const deleteEvent = (id: string) => setEvents(events.filter(e => e.id !== id));

  const addGalleryItem = (item: GalleryItem) => setGallery([...gallery, item]);
  const deleteGalleryItem = (id: string) => setGallery(gallery.filter(g => g.id !== id));

  const addBusiness = (business: Business) => setBusinesses([...businesses, business]);
  const deleteBusiness = (id: string) => setBusinesses(businesses.filter(b => b.id !== id));

  const addHistoryItem = (item: HistoryItem) => setHistory([...history, item].sort((a, b) => a.year.localeCompare(b.year)));
  const deleteHistoryItem = (id: string) => setHistory(history.filter(h => h.id !== id));

  const updateSiteInfo = (info: SiteInfo) => setSiteInfo(info);

  return (
    <DataContext.Provider value={{
      events, gallery, siteInfo, businesses, history,
      addEvent, updateEvent, deleteEvent,
      addGalleryItem, deleteGalleryItem,
      addBusiness, deleteBusiness,
      addHistoryItem, deleteHistoryItem,
      updateSiteInfo
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
