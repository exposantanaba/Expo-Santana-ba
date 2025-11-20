
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { NavItem, Event, GalleryItem, Business, HistoryItem } from '../types';
import { Plus, Trash2, Edit2, Save, Image as ImageIcon, Calendar, Type, LogOut, Upload, Radio, Code, Copy, CheckCircle, Github, HelpCircle, ChevronDown, ChevronUp, Link as LinkIcon, Store, BookOpen, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { 
    events, addEvent, deleteEvent,
    gallery, addGalleryItem, deleteGalleryItem,
    businesses, addBusiness, deleteBusiness,
    history, addHistoryItem, deleteHistoryItem,
    siteInfo, updateSiteInfo
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'info' | 'events' | 'gallery' | 'businesses' | 'history' | 'deploy'>('info');
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate(NavItem.LOGIN);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate(NavItem.HOME);
  };

  // Helper function for Image Upload (Base64)
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    callback: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3000000) {
        alert('Atenção: Essa imagem é muito grande (+3MB). Isso pode deixar o site lento. Tente usar uma imagem menor ou cole o Link da imagem (URL).');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        callback(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Info Handlers ---
  const [infoForm, setInfoForm] = useState(siteInfo);
  
  useEffect(() => {
    setInfoForm(siteInfo);
  }, [siteInfo]);

  const handleInfoSave = () => {
    updateSiteInfo(infoForm);
    alert('Informações salvas temporariamente! Não esqueça de ir na aba "Publicar" para gerar o código final.');
  };

  // --- Event Handlers ---
  const [newEvent, setNewEvent] = useState<Partial<Event>>({ category: 'Música', image: '' });
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return alert('Preencha título e data');
    addEvent({
      id: Date.now().toString(),
      title: newEvent.title!,
      date: newEvent.date!,
      location: newEvent.location || '',
      description: newEvent.description || '',
      image: newEvent.image || 'https://picsum.photos/600/400',
      category: newEvent.category as any
    });
    setNewEvent({ category: 'Música', image: '' });
    alert('Evento adicionado! Vá em "Publicar" para salvar definitivamente.');
  };

  // --- Gallery Handlers ---
  const [newPhoto, setNewPhoto] = useState<Partial<GalleryItem>>({ imageUrl: '' });
  const handleAddPhoto = () => {
    if (!newPhoto.title || !newPhoto.imageUrl) return alert('Preencha título e imagem (Link ou Upload)');
    addGalleryItem({
      id: Date.now().toString(),
      title: newPhoto.title!,
      photographer: newPhoto.photographer || 'Desconhecido',
      imageUrl: newPhoto.imageUrl!,
      date: new Date().getFullYear().toString()
    });
    setNewPhoto({ title: '', photographer: '', imageUrl: '' });
    alert('Foto adicionada! Vá em "Publicar" para salvar definitivamente.');
  };

  // --- Business Handlers ---
  const [newBusiness, setNewBusiness] = useState<Partial<Business>>({ category: 'Loja', image: '' });
  const handleAddBusiness = () => {
    if (!newBusiness.name || !newBusiness.address) return alert('Preencha nome e endereço');
    addBusiness({
      id: Date.now().toString(),
      name: newBusiness.name!,
      category: newBusiness.category || 'Outros',
      address: newBusiness.address!,
      phone: newBusiness.phone || '',
      image: newBusiness.image || 'https://picsum.photos/600/400',
    });
    setNewBusiness({ category: 'Loja', image: '' });
    alert('Comércio adicionado! Vá em "Publicar" para salvar definitivamente.');
  };

  // --- History Handlers ---
  const [newHistory, setNewHistory] = useState<Partial<HistoryItem>>({});
  const handleAddHistory = () => {
    if (!newHistory.year || !newHistory.title) return alert('Preencha ano e título');
    addHistoryItem({
      id: Date.now().toString(),
      year: newHistory.year!,
      title: newHistory.title!,
      description: newHistory.description || ''
    });
    setNewHistory({});
    alert('Registro histórico adicionado! Vá em "Publicar" para salvar definitivamente.');
  };

  // --- Deploy / Export Logic ---
  const generateDeployCode = () => {
    const eventsJSON = JSON.stringify(events, null, 2);
    const galleryJSON = JSON.stringify(gallery, null, 2);
    const businessesJSON = JSON.stringify(businesses, null, 2);
    const historyJSON = JSON.stringify(history, null, 2);
    const siteInfoJSON = JSON.stringify(siteInfo, null, 2);

    return `
// ==================================================================================
// ÁREA DE DADOS INICIAIS (Cole o JSON gerado no Painel Admin AQUI)
// ==================================================================================

const DEFAULT_EVENTS: Event[] = ${eventsJSON};

const DEFAULT_GALLERY: GalleryItem[] = ${galleryJSON};

const DEFAULT_BUSINESSES: Business[] = ${businessesJSON};

const DEFAULT_HISTORY: HistoryItem[] = ${historyJSON};

const DEFAULT_SITE_INFO: SiteInfo = ${siteInfoJSON};

// ==================================================================================
// FIM DA ÁREA DE DADOS INICIAIS
// ==================================================================================
    `;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateDeployCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-900">Painel Administrativo</h1>
            <p className="text-gray-500">Gerencie o conteúdo do EXPO SANTANA BA</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center px-4 py-2 text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors font-medium"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Como Atualizar?
              {showHelp ? <ChevronUp className="w-4 h-4 ml-2"/> : <ChevronDown className="w-4 h-4 ml-2"/>}
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </button>
          </div>
        </div>

        {/* Help Box */}
        {showHelp && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 animate-fadeIn">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center text-lg">
              <Github className="w-5 h-5 mr-2" /> 
              Fluxo de Atualização do Site
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                <span className="text-blue-500 font-bold text-xl mb-2 block">1. Edite</span>
                <p className="text-sm text-gray-600">Faça suas alterações aqui no Painel (Textos, Eventos, Fotos).</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                <span className="text-blue-500 font-bold text-xl mb-2 block">2. Gere o Código</span>
                <p className="text-sm text-gray-600">Vá na aba <strong>"Publicar"</strong> e clique em Copiar Código.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                <span className="text-blue-500 font-bold text-xl mb-2 block">3. Atualize</span>
                <p className="text-sm text-gray-600">Cole o código no arquivo <code>DataContext.tsx</code> no seu computador.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                <span className="text-blue-500 font-bold text-xl mb-2 block">4. Envie</span>
                <p className="text-sm text-gray-600">Faça o upload (push) para o GitHub e aguarde uns minutos.</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Tabs */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex items-center p-3 rounded-xl transition-colors text-left ${activeTab === 'info' ? 'bg-brand-600 text-white shadow-md font-bold' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <Type className="w-5 h-5 mr-3" /> Info Gerais
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`flex items-center p-3 rounded-xl transition-colors text-left ${activeTab === 'events' ? 'bg-brand-600 text-white shadow-md font-bold' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <Calendar className="w-5 h-5 mr-3" /> Eventos
            </button>
            <button 
              onClick={() => setActiveTab('businesses')}
              className={`flex items-center p-3 rounded-xl transition-colors text-left ${activeTab === 'businesses' ? 'bg-brand-600 text-white shadow-md font-bold' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <Store className="w-5 h-5 mr-3" /> Comércio
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center p-3 rounded-xl transition-colors text-left ${activeTab === 'history' ? 'bg-brand-600 text-white shadow-md font-bold' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <BookOpen className="w-5 h-5 mr-3" /> História
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center p-3 rounded-xl transition-colors text-left ${activeTab === 'gallery' ? 'bg-brand-600 text-white shadow-md font-bold' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <ImageIcon className="w-5 h-5 mr-3" /> Galeria
            </button>
            <div className="my-2 border-t border-gray-200"></div>
            <button 
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center p-3 rounded-xl transition-colors text-left ${activeTab === 'deploy' ? 'bg-green-600 text-white shadow-md font-bold' : 'bg-green-50 text-green-800 hover:bg-green-100 border border-green-200'}`}
            >
              <Github className="w-5 h-5 mr-3" /> Publicar
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
            
            {activeTab === 'info' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Configurações do Site</h2>
                
                <div className="grid gap-6">
                  
                  {/* Hero Image Upload */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa (Hero Background)</label>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="w-full md:w-48 h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-inner">
                        <img src={infoForm.heroBackgroundImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 w-full space-y-3">
                         {/* Opção 1: URL */}
                         <div>
                            <label className="text-xs font-bold text-gray-500">Opção 1: Colar Link da Imagem (Recomendado)</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="https://..." 
                                className="w-full p-2 border rounded text-sm"
                                value={infoForm.heroBackgroundImage.startsWith('data:') ? '' : infoForm.heroBackgroundImage}
                                onChange={(e) => setInfoForm({...infoForm, heroBackgroundImage: e.target.value})}
                              />
                            </div>
                         </div>

                         <div className="text-center text-gray-400 text-xs font-bold">OU</div>

                         {/* Opção 2: Upload */}
                         <label className="cursor-pointer flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white hover:bg-brand-50 hover:text-brand-700 text-sm font-medium text-gray-700 transition-colors border-dashed">
                            <Upload className="w-4 h-4 mr-2" />
                            Opção 2: Enviar do Computador (Max 3MB)
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, (base64) => setInfoForm({...infoForm, heroBackgroundImage: base64}))}
                            />
                         </label>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 space-y-4">
                    <h3 className="text-lg font-bold text-brand-900 flex items-center border-b border-brand-200 pb-2">
                      <Store className="w-5 h-5 mr-2" /> Informações de Contato
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-800 mb-1 flex items-center">
                          <Mail className="w-3 h-3 mr-1" /> E-mail de Suporte
                        </label>
                        <input 
                          type="text" 
                          value={infoForm.contactEmail || ''}
                          onChange={e => setInfoForm({...infoForm, contactEmail: e.target.value})}
                          className="w-full p-2 border border-brand-200 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                          placeholder="suporte@exposantanaba.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-800 mb-1 flex items-center">
                          <Phone className="w-3 h-3 mr-1" /> Telefone
                        </label>
                        <input 
                          type="text" 
                          value={infoForm.contactPhone || ''}
                          onChange={e => setInfoForm({...infoForm, contactPhone: e.target.value})}
                          className="w-full p-2 border border-brand-200 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                          placeholder="(00) 1234-5678"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-brand-800 mb-1 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" /> Endereço
                        </label>
                        <input 
                          type="text" 
                          value={infoForm.contactAddress || ''}
                          onChange={e => setInfoForm({...infoForm, contactAddress: e.target.value})}
                          className="w-full p-2 border border-brand-200 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                          placeholder="Praça da Matriz, 123, Centro"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Radio Config */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center">
                      <Radio className="w-4 h-4 mr-2" />
                      URL da Rádio (Embed/Player)
                    </label>
                    <input 
                      type="text" 
                      value={infoForm.radioUrl}
                      onChange={e => setInfoForm({...infoForm, radioUrl: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                      placeholder="ex: https://www.radios.com.br/play/187832"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                      <input 
                        type="text" 
                        value={infoForm.heroTitle}
                        onChange={e => setInfoForm({...infoForm, heroTitle: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem de Boas-vindas</label>
                      <input 
                        type="text" 
                        value={infoForm.welcomeMessage}
                        onChange={e => setInfoForm({...infoForm, welcomeMessage: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                    <textarea 
                      value={infoForm.heroSubtitle}
                      onChange={e => setInfoForm({...infoForm, heroSubtitle: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:ring-brand-500 focus:border-brand-500 h-24 resize-none"
                    />
                  </div>

                  <button onClick={handleInfoSave} className="bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 self-start flex items-center font-bold shadow-md transform hover:-translate-y-0.5 transition-all">
                    <Save className="w-4 h-4 mr-2" /> Salvar Alterações
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-8 animate-fadeIn">
                 <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                  <h3 className="text-lg font-bold text-brand-900 mb-4 flex items-center"><Plus className="w-5 h-5 mr-2"/> Adicionar Novo Evento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nome do Evento</label>
                        <input placeholder="Ex: Festival de Verão" className="w-full p-2 rounded border" value={newEvent.title || ''} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Data</label>
                        <input placeholder="Ex: 15 Out, 19:00" className="w-full p-2 rounded border" value={newEvent.date || ''} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Local</label>
                        <input placeholder="Ex: Praça da Matriz" className="w-full p-2 rounded border" value={newEvent.location || ''} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Categoria</label>
                        <select className="w-full p-2 rounded border bg-white" value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value as any})}>
                        <option value="Música">Música</option>
                        <option value="Festival">Festival</option>
                        <option value="Arte">Arte</option>
                        <option value="Esporte">Esporte</option>
                        </select>
                    </div>
                    
                    {/* Image Selection for Event */}
                    <div className="md:col-span-2 border p-4 rounded-lg bg-white border-gray-200">
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Imagem do Evento</label>
                        
                        {/* Option 1: URL */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                             <LinkIcon className="w-3 h-3 text-gray-400"/>
                             <span className="text-xs font-semibold text-gray-600">Opção 1: Colar Link (URL)</span>
                          </div>
                          <input 
                            type="text" 
                            placeholder="https://exemplo.com/foto.jpg" 
                            className="w-full p-2 border rounded text-sm bg-gray-50"
                            value={newEvent.image?.startsWith('data:') ? '' : newEvent.image}
                            onChange={(e) => setNewEvent({...newEvent, image: e.target.value})}
                          />
                        </div>

                        <div className="text-center text-gray-300 text-xs font-bold mb-3">- OU -</div>

                        {/* Option 2: File Upload */}
                        <div className="flex gap-2 items-center">
                            <label className="cursor-pointer bg-brand-50 hover:bg-brand-100 text-brand-700 px-4 py-2 rounded text-sm flex items-center font-bold transition-colors border border-brand-200">
                                <Upload className="w-4 h-4 mr-2" /> Carregar do PC
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload(e, (base64) => setNewEvent({...newEvent, image: base64}))}
                                />
                            </label>
                            <span className="text-xs text-gray-400">Max: 3MB</span>
                        </div>
                        
                        {/* Preview */}
                        {newEvent.image && (
                            <div className="mt-3 relative inline-block">
                                <p className="text-xs text-green-600 font-bold mb-1">Imagem Selecionada:</p>
                                <img src={newEvent.image} alt="Preview" className="h-24 rounded-lg object-cover shadow-sm border border-gray-200" />
                                <button onClick={() => setNewEvent({...newEvent, image: ''})} className="absolute top-4 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"><Trash2 className="w-3 h-3"/></button>
                            </div>
                        )}
                    </div>

                    <textarea placeholder="Descrição do evento..." className="p-2 rounded border md:col-span-2 h-20 resize-none" value={newEvent.description || ''} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                    <button onClick={handleAddEvent} className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 md:col-span-2 font-bold shadow-sm transition-colors">Adicionar Evento</button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Eventos Atuais</h3>
                  <div className="space-y-4">
                    {events.length === 0 && <p className="text-gray-400 italic">Nenhum evento cadastrado.</p>}
                    {events.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <img src={event.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{event.title}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-500 mt-1">
                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1"/> {event.date}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors" title="Excluir">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'businesses' && (
              <div className="space-y-8 animate-fadeIn">
                 <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                  <h3 className="text-lg font-bold text-brand-900 mb-4 flex items-center"><Plus className="w-5 h-5 mr-2"/> Adicionar Comércio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nome do Estabelecimento</label>
                        <input placeholder="Ex: Supermercado Santa" className="w-full p-2 rounded border" value={newBusiness.name || ''} onChange={e => setNewBusiness({...newBusiness, name: e.target.value})} />
                    </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Categoria</label>
                        <select className="w-full p-2 rounded border bg-white" value={newBusiness.category} onChange={e => setNewBusiness({...newBusiness, category: e.target.value})}>
                        <option value="Supermercado">Supermercado</option>
                        <option value="Farmácia">Farmácia</option>
                        <option value="Loja">Loja</option>
                        <option value="Restaurante">Restaurante</option>
                        <option value="Serviços">Serviços</option>
                        <option value="Outros">Outros</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Endereço</label>
                        <input placeholder="Ex: Rua Principal, 100" className="w-full p-2 rounded border" value={newBusiness.address || ''} onChange={e => setNewBusiness({...newBusiness, address: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Telefone / Zap</label>
                        <input placeholder="Ex: (77) 99999-8888" className="w-full p-2 rounded border" value={newBusiness.phone || ''} onChange={e => setNewBusiness({...newBusiness, phone: e.target.value})} />
                    </div>
                    
                    {/* Image Selection for Business */}
                    <div className="md:col-span-2 border p-4 rounded-lg bg-white border-gray-200">
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Foto do Local</label>
                        
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                             <LinkIcon className="w-3 h-3 text-gray-400"/>
                             <span className="text-xs font-semibold text-gray-600">Opção 1: Colar Link (URL)</span>
                          </div>
                          <input 
                            type="text" 
                            placeholder="https://..." 
                            className="w-full p-2 border rounded text-sm bg-gray-50"
                            value={newBusiness.image?.startsWith('data:') ? '' : newBusiness.image}
                            onChange={(e) => setNewBusiness({...newBusiness, image: e.target.value})}
                          />
                        </div>

                        <div className="text-center text-gray-300 text-xs font-bold mb-3">- OU -</div>

                        <div className="flex gap-2 items-center">
                            <label className="cursor-pointer bg-brand-50 hover:bg-brand-100 text-brand-700 px-4 py-2 rounded text-sm flex items-center font-bold transition-colors border border-brand-200">
                                <Upload className="w-4 h-4 mr-2" /> Carregar do PC
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload(e, (base64) => setNewBusiness({...newBusiness, image: base64}))}
                                />
                            </label>
                            <span className="text-xs text-gray-400">Max: 3MB</span>
                        </div>
                        
                         {newBusiness.image && (
                            <div className="mt-3 relative inline-block">
                                <p className="text-xs text-green-600 font-bold mb-1">Imagem Selecionada:</p>
                                <img src={newBusiness.image} alt="Preview" className="h-24 rounded-lg object-cover shadow-sm border border-gray-200" />
                                <button onClick={() => setNewBusiness({...newBusiness, image: ''})} className="absolute top-4 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"><Trash2 className="w-3 h-3"/></button>
                            </div>
                        )}
                    </div>

                    <button onClick={handleAddBusiness} className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 md:col-span-2 font-bold shadow-sm transition-colors">Adicionar Comércio</button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Comércios Cadastrados</h3>
                  <div className="space-y-4">
                    {businesses.length === 0 && <p className="text-gray-400 italic">Nenhum comércio cadastrado.</p>}
                    {businesses.map(biz => (
                      <div key={biz.id} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <img src={biz.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{biz.name}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-500 mt-1">
                                <span className="flex items-center bg-brand-50 text-brand-700 px-2 py-0.5 rounded">{biz.category}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{biz.phone}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => deleteBusiness(biz.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors" title="Excluir">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                  <h3 className="text-lg font-bold text-brand-900 mb-4 flex items-center"><Plus className="w-5 h-5 mr-2"/> Adicionar Marco Histórico</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Ano</label>
                        <input placeholder="Ex: 1950" className="w-full p-2 rounded border" value={newHistory.year || ''} onChange={e => setNewHistory({...newHistory, year: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Título do Evento</label>
                        <input placeholder="Ex: Construção da Matriz" className="w-full p-2 rounded border" value={newHistory.title || ''} onChange={e => setNewHistory({...newHistory, title: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Descrição</label>
                        <textarea placeholder="Detalhes do que aconteceu neste ano..." className="w-full p-2 rounded border h-20 resize-none" value={newHistory.description || ''} onChange={e => setNewHistory({...newHistory, description: e.target.value})} />
                    </div>
                    <button onClick={handleAddHistory} className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 md:col-span-2 font-bold shadow-sm transition-colors">Adicionar Marco</button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Linha do Tempo</h3>
                  <div className="space-y-4">
                    {history.length === 0 && <p className="text-gray-400 italic">Nenhum histórico cadastrado.</p>}
                    {history.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex gap-4 items-start">
                          <div className="bg-brand-100 text-brand-800 font-bold px-3 py-2 rounded-lg text-center min-w-[4rem]">
                            {item.year}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <button onClick={() => deleteHistoryItem(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex-shrink-0" title="Excluir">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                  <h3 className="text-lg font-bold text-brand-900 mb-4 flex items-center"><Plus className="w-5 h-5 mr-2"/> Adicionar Foto à Galeria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                        <input placeholder="Ex: Pôr do sol" className="w-full p-2 rounded border" value={newPhoto.title || ''} onChange={e => setNewPhoto({...newPhoto, title: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Fotógrafo</label>
                        <input placeholder="Ex: João Silva" className="w-full p-2 rounded border" value={newPhoto.photographer || ''} onChange={e => setNewPhoto({...newPhoto, photographer: e.target.value})} />
                    </div>
                    
                    {/* Image Selection for Gallery */}
                    <div className="md:col-span-2 border p-4 rounded-lg bg-white border-gray-200">
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Imagem da Foto</label>
                        
                        {/* Option 1: URL */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                             <LinkIcon className="w-3 h-3 text-gray-400"/>
                             <span className="text-xs font-semibold text-gray-600">Opção 1: Colar Link (URL)</span>
                          </div>
                          <input 
                            type="text" 
                            placeholder="https://..." 
                            className="w-full p-2 border rounded text-sm bg-gray-50"
                            value={newPhoto.imageUrl?.startsWith('data:') ? '' : newPhoto.imageUrl}
                            onChange={(e) => setNewPhoto({...newPhoto, imageUrl: e.target.value})}
                          />
                        </div>

                        <div className="text-center text-gray-300 text-xs font-bold mb-3">- OU -</div>

                        {/* Option 2: File Upload */}
                        <div className="flex gap-2 items-center">
                            <label className="cursor-pointer bg-brand-50 hover:bg-brand-100 text-brand-700 px-4 py-2 rounded text-sm flex items-center font-bold transition-colors border border-brand-200">
                                <Upload className="w-4 h-4 mr-2" /> Carregar do PC
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload(e, (base64) => setNewPhoto({...newPhoto, imageUrl: base64}))}
                                />
                            </label>
                            <span className="text-xs text-gray-400">Max: 3MB</span>
                        </div>

                        {newPhoto.imageUrl && (
                             <div className="mt-3 relative inline-block">
                                <p className="text-xs text-green-600 font-bold mb-1">Imagem Selecionada:</p>
                                <img src={newPhoto.imageUrl} alt="Preview" className="h-32 rounded-lg object-cover shadow-sm border border-gray-200" />
                                <button onClick={() => setNewPhoto({...newPhoto, imageUrl: ''})} className="absolute top-4 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"><Trash2 className="w-3 h-3"/></button>
                            </div>
                        )}
                    </div>

                    <button onClick={handleAddPhoto} className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 md:col-span-2 font-bold shadow-sm transition-colors">Adicionar Foto</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map(item => (
                    <div key={item.id} className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
                      <div className="p-3 bg-white">
                        <p className="font-bold text-sm truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 truncate">Foto: {item.photographer}</p>
                      </div>
                      <button 
                        onClick={() => deleteGalleryItem(item.id)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'deploy' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h2 className="text-xl font-bold text-green-900 mb-2 flex items-center">
                    <Github className="w-6 h-6 mr-2"/> Publicar Oficialmente
                  </h2>
                  <p className="text-green-800 text-sm mb-4 leading-relaxed">
                    Este código contém todas as alterações que você fez (novas fotos, eventos, textos). 
                    Ao copiá-lo para o arquivo original e subir para o GitHub, você torna essas mudanças permanentes.
                  </p>
                  <div className="flex flex-col gap-2 text-xs text-green-700 bg-green-100 p-3 rounded mb-4 border border-green-200">
                    <div className="flex items-center gap-2 font-bold">
                        <CheckCircle className="w-4 h-4" />
                        <span>1. Copie o código abaixo.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        <span>2. Cole no arquivo <strong>src/context/DataContext.tsx</strong> (substitua a área indicada).</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        <span>3. Faça o Commit e Push para o GitHub.</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-orange-700 font-bold">
                        <AlertCircle className="w-4 h-4" />
                        <span>Atenção: O GitHub Pages pode levar até 5 minutos para atualizar o site online.</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700">Código Gerado</label>
                    <button 
                      onClick={copyToClipboard}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${copied ? 'bg-green-600 text-white ring-2 ring-green-300' : 'bg-brand-600 text-white hover:bg-brand-700'}`}
                    >
                      {copied ? <><CheckCircle className="w-4 h-4 mr-2" /> Copiado!</> : <><Copy className="w-4 h-4 mr-2" /> Copiar Código</>}
                    </button>
                  </div>
                  <textarea 
                    readOnly
                    className="w-full h-96 p-4 font-mono text-xs bg-gray-900 text-green-400 rounded-xl border border-gray-700 focus:outline-none shadow-inner"
                    value={generateDeployCode()}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
