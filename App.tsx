
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiGuide from './components/AiGuide';
import Home from './pages/Home';
import History from './pages/History';
import Culture from './pages/Culture';
import Gastronomy from './pages/Gastronomy';
import Attractions from './pages/Attractions';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Businesses from './pages/Businesses';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Radio from './pages/Radio';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-brand-200 selection:text-brand-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/historia" element={<History />} />
              <Route path="/cultura" element={<Culture />} />
              <Route path="/gastronomia" element={<Gastronomy />} />
              <Route path="/atracoes" element={<Attractions />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/comercio" element={<Businesses />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <AiGuide />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
