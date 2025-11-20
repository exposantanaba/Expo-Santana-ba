
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  category: 'Festival' | 'Música' | 'Arte' | 'Esporte';
}

export interface GalleryItem {
  id: string;
  title: string;
  photographer: string;
  imageUrl: string;
  date?: string;
}

export interface HistoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface SiteInfo {
  heroTitle: string;
  heroSubtitle: string;
  welcomeMessage: string;
  heroBackgroundImage: string;
  radioUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'Gastronomia' | 'Atração' | 'Histórico';
  rating?: number;
  address?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  image: string;
}

export enum NavItem {
  HOME = '/',
  HISTORY = '/historia',
  CULTURE = '/cultura',
  GASTRONOMY = '/gastronomia',
  ATTRACTIONS = '/atracoes',
  EVENTS = '/eventos',
  GALLERY = '/galeria',
  RADIO = '/radio',
  BUSINESSES = '/comercio',
  CONTACT = '/contato',
  ADMIN = '/admin',
  LOGIN = '/login'
}
