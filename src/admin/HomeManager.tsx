import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, GripVertical, Home, BookOpen, User, Target, Briefcase, MessageSquare, Anchor, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmDialog from './ConfirmDialog';
import ImageUpload from './ImageUpload';
import HomeNewsBoxesManager from './HomeNewsBoxesManager';

interface HomeContent {
  id: string;
  section: string;
  content: any;
  is_active: boolean;
  display_order: number;
}

interface HomeEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  event_type: string;
  gradient_from: string;
  gradient_to: string;
  is_active: boolean;
  display_order: number;
  cta_text?: string;
}

const iconOptions = [
  'Calendar', 'Zap', 'Book', 'Sparkles', 'Target', 'Brain', 'Heart', 'Shield',
  'Award', 'Users', 'Star', 'TrendingUp', 'Briefcase', 'Coffee', 'Home'
];

const colorOptions = [
  'yellow-400', 'blue-400', 'green-400', 'purple-400', 'red-400', 'orange-400',
  'pink-400', 'teal-400', 'indigo-400', 'cyan-400'
];

const gradientOptions = [
  { from: 'yellow-400', to: 'orange-500', name: 'Sonnengelb' },
  { from: 'blue-400', to: 'purple-500', name: 'Ozeanblau' },
  { from: 'green-400', to: 'green-500', name: 'Naturgrün' },
  { from: 'orange-400', to: 'orange-500', name: 'Feuerrot' },
  { from: 'purple-400', to: 'pink-500', name: 'Violett' },
  { from: 'blue-400', to: 'blue-500', name: 'Himmelblau' },
  { from: 'pink-400', to: 'pink-500', name: 'Rosa' },
  { from: 'yellow-500', to: 'yellow-400', name: 'Gold' }
];

export default function HomeManager() {
  const [activeTab, setActiveTab] = useState<'hero' | 'themes' | 'teacher' | 'target' | 'services' | 'cta' | 'anchor' | 'events' | 'news-boxes'>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [homeContent, setHomeContent] = useState<Record<string, HomeContent>>({});
  const [editedContent, setEditedContent] = useState<Record<string, any>>({});
  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [editedEvents, setEditedEvents] = useState<HomeEvent[]>([]);

  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id: string; type: 'event' }>({
    isOpen: false,
    id: '',
    type: 'event'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [contentRes, eventsRes] = await Promise.all([
        supabase.from('home_content').select('*').order('display_order'),
        supabase.from('home_events').select('*').order('display_order')
      ]);

      if (contentRes.data) {
        const contentMap: Record<string, HomeContent> = {};
        const editedMap: Record<string, any> = {};
        contentRes.data.forEach(item => {
          contentMap[item.section] = item;
          editedMap[item.section] = { ...item.content };
        });
        setHomeContent(contentMap);
        setEditedContent(editedMap);
      }

      if (eventsRes.data) {
        setEvents(eventsRes.data);
        setEditedEvents(JSON.parse(JSON.stringify(eventsRes.data)));
      }

    } catch (error) {
      console.error('Error loading home data:', error);
      alert('Fehler beim Laden der Daten');
    } finally {
      setLoading(false);
    }
  };

  const updateLocalContent = (section: string, updates: any) => {
    setEditedContent(prev => ({
      ...prev,
      [section]: { ...(prev[section] || {}), ...updates }
    }));
  };

  const saveContent = async (section: string) => {
    try {
      setSaving(true);
      const content = editedContent[section];

      const { error } = await supabase
        .from('home_content')
        .update({ content })
        .eq('section', section);

      if (error) throw error;

      setHomeContent(prev => ({
        ...prev,
        [section]: { ...prev[section], content }
      }));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  };

  const updateLocalEvent = (id: string, updates: Partial<HomeEvent>) => {
    setEditedEvents(prev => prev.map(evt =>
      evt.id === id ? { ...evt, ...updates } : evt
    ));
  };

  const saveEvent = async (id: string) => {
    try {
      setSaving(true);
      const event = editedEvents.find(e => e.id === id);
      if (!event) return;

      const { error } = await supabase
        .from('home_events')
        .update(event)
        .eq('id', id);

      if (error) throw error;

      setEvents(prev => prev.map(e =>
        e.id === id ? event : e
      ));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  };

  const addEvent = async () => {
    try {
      setSaving(true);
      const maxOrder = Math.max(...events.map(e => e.display_order), 0);

      const { data, error } = await supabase
        .from('home_events')
        .insert({
          title: 'Neues Event',
          subtitle: 'Untertitel',
          description: 'Beschreibung',
          event_type: 'keynote',
          cta_text: 'Details & Termine',
          gradient_from: 'yellow-400',
          gradient_to: 'orange-500',
          display_order: maxOrder + 1
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setEvents(prev => [...prev, data]);
        setEditedEvents(prev => [...prev, data]);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Fehler beim Hinzufügen');
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('home_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setEvents(prev => prev.filter(evt => evt.id !== id));
      setEditedEvents(prev => prev.filter(evt => evt.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Fehler beim Löschen');
    }
  };

  const handleEventDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleEventDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleEventDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex === dropIndex) return;

    const newEvents = [...editedEvents];
    const [draggedEvent] = newEvents.splice(dragIndex, 1);
    newEvents.splice(dropIndex, 0, draggedEvent);

    const updatedEvents = newEvents.map((evt, idx) => ({
      ...evt,
      display_order: idx
    }));

    setEditedEvents(updatedEvents);

    try {
      setSaving(true);
      for (const evt of updatedEvents) {
        await supabase
          .from('home_events')
          .update({ display_order: evt.display_order })
          .eq('id', evt.id);
      }
      setEvents(updatedEvents);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error reordering events:', error);
      alert('Fehler beim Neuordnen der Events');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Lade Home-Inhalte...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Home },
    { id: 'themes', label: 'Themen', icon: BookOpen },
    { id: 'teacher', label: 'Lehrerbild', icon: User },
    { id: 'target', label: 'Zielgruppen', icon: Target },
    { id: 'services', label: 'Leistungen', icon: Briefcase },
    { id: 'cta', label: 'CTA', icon: MessageSquare },
    { id: 'anchor', label: 'Identitäts-Anker', icon: Anchor },
    { id: 'news-boxes', label: 'News Boxes', icon: Calendar },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Home className="w-8 h-8 text-yellow-400" />
            Home-Seite verwalten
          </h2>
          <p className="text-white/60 mt-1">Bearbeite alle Inhalte der Startseite</p>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold'
                    : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'hero' && editedContent.hero && (
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <Home size={20} className="text-black" strokeWidth={2.5} />
              </div>
              Hero-Bereich
            </h3>
            <button
              onClick={() => saveContent('hero')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Hauptüberschrift</label>
            <textarea
              value={editedContent.hero?.mainHeading || ''}
              onChange={(e) => updateLocalContent('hero', { mainHeading: e.target.value })}
              rows={3}
              placeholder="Innere Ruhe. Klarheit im Denken..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Unterüberschrift</label>
            <textarea
              value={editedContent.hero?.subheading || ''}
              onChange={(e) => updateLocalContent('hero', { subheading: e.target.value })}
              rows={3}
              placeholder="Wenn dein Leben nach außen funktioniert..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Beschreibung</label>
            <textarea
              value={editedContent.hero?.description || ''}
              onChange={(e) => updateLocalContent('hero', { description: e.target.value })}
              rows={2}
              placeholder="Hier geht es nicht um Motivation..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Zitat</label>
            <input
              type="text"
              value={editedContent.hero?.quote || ''}
              onChange={(e) => updateLocalContent('hero', { quote: e.target.value })}
              placeholder="Ich bringe Klarheit. Du gehst den nächsten Schritt."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">CTA Button Text</label>
              <input
                type="text"
                value={editedContent.hero?.ctaText || ''}
                onChange={(e) => updateLocalContent('hero', { ctaText: e.target.value })}
                placeholder="Kostenlos Erstgespräch"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">CTA Subtext</label>
              <input
                type="text"
                value={editedContent.hero?.ctaSubtext || ''}
                onChange={(e) => updateLocalContent('hero', { ctaSubtext: e.target.value })}
                placeholder="15 Minuten · vertraulich · unverbindlich"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {saveSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save size={18} />
                  <span className="font-semibold">Erfolgreich gespeichert!</span>
                </div>
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Homepage ansehen
                </a>
              </div>
              <p className="text-sm mt-2 text-green-600">
                Öffne die Homepage in einem neuen Tab, um die Änderungen zu sehen
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'news-boxes' && (
        <HomeNewsBoxesManager />
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black">Events & Keynotes</h3>
            <button
              onClick={addEvent}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus size={18} />
              Neues Event
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <GripVertical size={16} className="text-gray-400" />
              <span>Ziehen Sie die Events per Drag & Drop, um die Reihenfolge zu ändern</span>
            </p>
          </div>

          {editedEvents.map((event, index) => (
            <div
              key={event.id}
              draggable
              onDragStart={(e) => handleEventDragStart(e, index)}
              onDragOver={handleEventDragOver}
              onDrop={(e) => handleEventDrop(e, index)}
              className="bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-5 cursor-move hover:border-yellow-400 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h4 className="text-lg font-bold text-black flex items-center gap-2">
                  <button
                    className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Ziehen zum Neuordnen"
                  >
                    <GripVertical size={20} className="text-gray-400" />
                  </button>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  Event {index + 1}
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveEvent(event.id)}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={16} />
                    Speichern
                  </button>
                  <button
                    onClick={() => updateLocalEvent(event.id, { is_active: !event.is_active })}
                    className={`p-2 rounded-lg transition-all ${
                      event.is_active
                        ? 'bg-green-500/30 text-green-400 ring-2 ring-green-400/30'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {event.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => setDeleteDialog({ isOpen: true, id: event.id, type: 'event' })}
                    className="p-2 bg-red-500/30 text-red-400 rounded-lg hover:bg-red-500/40 transition-all ring-2 ring-red-400/20"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Titel</label>
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => updateLocalEvent(event.id, { title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Event-Typ</label>
                  <select
                    value={event.event_type}
                    onChange={(e) => updateLocalEvent(event.id, { event_type: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="keynote">Keynote</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Untertitel</label>
                <input
                  type="text"
                  value={event.subtitle || ''}
                  onChange={(e) => updateLocalEvent(event.id, { subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Beschreibung</label>
                <textarea
                  value={event.description || ''}
                  onChange={(e) => updateLocalEvent(event.id, { description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">CTA-Button-Text</label>
                <input
                  type="text"
                  value={event.cta_text || ''}
                  onChange={(e) => updateLocalEvent(event.id, { cta_text: e.target.value })}
                  placeholder="z.B. Details & Termine, Erstgespräch, Workshop anfragen"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Standard: "Jetzt Anmelden" (wenn leer)
                </p>
              </div>

              <ImageUpload
                currentImage={event.image_url || ''}
                onImageChange={(url) => updateLocalEvent(event.id, { image_url: url })}
                label="Event-Bild"
              />

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Gradient</label>
                <select
                  value={`${event.gradient_from}|${event.gradient_to}`}
                  onChange={(e) => {
                    const gradient = gradientOptions.find(g => `${g.from}|${g.to}` === e.target.value);
                    if (gradient) {
                      updateLocalEvent(event.id, {
                        gradient_from: gradient.from,
                        gradient_to: gradient.to
                      });
                    }
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  {gradientOptions.map(gradient => (
                    <option key={gradient.name} value={`${gradient.from}|${gradient.to}`}>
                      {gradient.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'themes' && editedContent.themes && (
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <BookOpen size={20} className="text-black" strokeWidth={2.5} />
              </div>
              Themen-Bereich
            </h3>
            <button
              onClick={() => saveContent('themes')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Hauptüberschrift</label>
            <textarea
              value={editedContent.themes?.mainHeading || ''}
              onChange={(e) => updateLocalContent('themes', { mainHeading: e.target.value })}
              rows={2}
              placeholder="Viele Menschen sind nicht falsch..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 1</label>
            <textarea
              value={editedContent.themes?.paragraph1 || ''}
              onChange={(e) => updateLocalContent('themes', { paragraph1: e.target.value })}
              rows={3}
              placeholder="Du denkst viel. Du trägst Verantwortung..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 2</label>
            <textarea
              value={editedContent.themes?.paragraph2 || ''}
              onChange={(e) => updateLocalContent('themes', { paragraph2: e.target.value })}
              rows={3}
              placeholder="Aber dein Kopf kommt nicht zur Ruhe..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 3</label>
            <textarea
              value={editedContent.themes?.paragraph3 || ''}
              onChange={(e) => updateLocalContent('themes', { paragraph3: e.target.value })}
              rows={2}
              placeholder="Du funktionierst. Aber du bist nicht wirklich da."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          {saveSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save size={18} />
                  <span className="font-semibold">Erfolgreich gespeichert!</span>
                </div>
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Homepage ansehen
                </a>
              </div>
              <p className="text-sm mt-2 text-green-600">
                Öffne die Homepage in einem neuen Tab, um die Änderungen zu sehen
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'teacher' && editedContent.teacher && (
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <User size={20} className="text-black" strokeWidth={2.5} />
              </div>
              Lehrerbild-Bereich
            </h3>
            <button
              onClick={() => saveContent('teacher')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Überschrift</label>
            <input
              type="text"
              value={editedContent.teacher?.heading || ''}
              onChange={(e) => updateLocalContent('teacher', { heading: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 1</label>
            <textarea
              value={editedContent.teacher?.paragraph1 || ''}
              onChange={(e) => updateLocalContent('teacher', { paragraph1: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 2</label>
            <textarea
              value={editedContent.teacher?.paragraph2 || ''}
              onChange={(e) => updateLocalContent('teacher', { paragraph2: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 3</label>
            <textarea
              value={editedContent.teacher?.paragraph3 || ''}
              onChange={(e) => updateLocalContent('teacher', { paragraph3: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 4</label>
            <textarea
              value={editedContent.teacher?.paragraph4 || ''}
              onChange={(e) => updateLocalContent('teacher', { paragraph4: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Tagline</label>
            <input
              type="text"
              value={editedContent.teacher?.tagline || ''}
              onChange={(e) => updateLocalContent('teacher', { tagline: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <ImageUpload
            currentImage={editedContent.teacher?.imageUrl || ''}
            onImageChange={(url) => updateLocalContent('teacher', { imageUrl: url })}
            label="Lehrerbild"
          />

          {saveSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save size={18} />
                  <span className="font-semibold">Erfolgreich gespeichert!</span>
                </div>
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Homepage ansehen
                </a>
              </div>
              <p className="text-sm mt-2 text-green-600">
                Öffne die Homepage in einem neuen Tab, um die Änderungen zu sehen
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'target' && editedContent.target_audience && (
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <Target size={20} className="text-black" strokeWidth={2.5} />
              </div>
              Zielgruppen-Bereich
            </h3>
            <button
              onClick={() => saveContent('target_audience')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Überschrift</label>
            <input
              type="text"
              value={editedContent.target_audience?.heading || ''}
              onChange={(e) => updateLocalContent('target_audience', { heading: e.target.value })}
              placeholder="Für wen ist das richtig?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Richtig für (ein Punkt pro Zeile)</label>
            <textarea
              value={(editedContent.target_audience?.rightFor || []).join('\n')}
              onChange={(e) => updateLocalContent('target_audience', {
                rightFor: e.target.value.split('\n').filter(line => line.trim())
              })}
              rows={5}
              placeholder="Führungskräfte&#10;Unternehmer&#10;Selbstständige..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Nicht richtig für (ein Punkt pro Zeile)</label>
            <textarea
              value={(editedContent.target_audience?.notRightFor || []).join('\n')}
              onChange={(e) => updateLocalContent('target_audience', {
                notRightFor: e.target.value.split('\n').filter(line => line.trim())
              })}
              rows={3}
              placeholder="Menschen, die nach schnellen Lösungen suchen..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Abschlusstext</label>
            <textarea
              value={editedContent.target_audience?.conclusionText || ''}
              onChange={(e) => updateLocalContent('target_audience', { conclusionText: e.target.value })}
              rows={3}
              placeholder="Du bist hier richtig, wenn..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          {saveSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save size={18} />
                  <span className="font-semibold">Erfolgreich gespeichert!</span>
                </div>
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Homepage ansehen
                </a>
              </div>
              <p className="text-sm mt-2 text-green-600">
                Öffne die Homepage in einem neuen Tab, um die Änderungen zu sehen
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'cta' && editedContent.cta && (
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <MessageSquare size={20} className="text-black" strokeWidth={2.5} />
              </div>
              CTA-Bereich
            </h3>
            <button
              onClick={() => saveContent('cta')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Überschrift</label>
            <textarea
              value={editedContent.cta?.heading || ''}
              onChange={(e) => updateLocalContent('cta', { heading: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 1</label>
            <textarea
              value={editedContent.cta?.paragraph1 || ''}
              onChange={(e) => updateLocalContent('cta', { paragraph1: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Paragraph 2</label>
            <textarea
              value={editedContent.cta?.paragraph2 || ''}
              onChange={(e) => updateLocalContent('cta', { paragraph2: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Button Text</label>
              <input
                type="text"
                value={editedContent.cta?.buttonText || ''}
                onChange={(e) => updateLocalContent('cta', { buttonText: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Subtext</label>
              <input
                type="text"
                value={editedContent.cta?.subtext || ''}
                onChange={(e) => updateLocalContent('cta', { subtext: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <ImageUpload
            currentImage={editedContent.cta?.imageUrl || ''}
            onImageChange={(url) => updateLocalContent('cta', { imageUrl: url })}
            label="Hintergrundbild"
          />

          {saveSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save size={18} />
                  <span className="font-semibold">Erfolgreich gespeichert!</span>
                </div>
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Homepage ansehen
                </a>
              </div>
              <p className="text-sm mt-2 text-green-600">
                Öffne die Homepage in einem neuen Tab, um die Änderungen zu sehen
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'anchor' && editedContent.anchor && (
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <Anchor size={20} className="text-black" strokeWidth={2.5} />
              </div>
              Identitäts-Anker
            </h3>
            <button
              onClick={() => saveContent('anchor')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Abschlusstext</label>
            <textarea
              value={editedContent.anchor?.text || ''}
              onChange={(e) => updateLocalContent('anchor', { text: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {saveSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save size={18} />
                  <span className="font-semibold">Erfolgreich gespeichert!</span>
                </div>
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Homepage ansehen
                </a>
              </div>
              <p className="text-sm mt-2 text-green-600">
                Öffne die Homepage in einem neuen Tab, um die Änderungen zu sehen
              </p>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Event löschen?"
        message="Diese Aktion kann nicht rückgängig gemacht werden."
        confirmLabel="Löschen"
        onConfirm={async () => {
          await deleteEvent(deleteDialog.id);
          setDeleteDialog({ isOpen: false, id: '', type: 'event' });
        }}
        onCancel={() => setDeleteDialog({ isOpen: false, id: '', type: 'event' })}
      />
    </div>
  );
}
