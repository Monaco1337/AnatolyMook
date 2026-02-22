import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Save, X, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Zap, Eye, EyeOff, Type, Palette, Layers, Pencil } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ImageUpload from './ImageUpload';
import ConfirmDialog from './ConfirmDialog';

interface EventsHeaderContent {
  heading: string;
  highlight: string;
  linkText: string;
  linkTarget: string;
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
  title_font_family: string;
  title_font_weight: number;
  title_font_size: string;
  title_letter_spacing: string;
  title_text_transform: string;
  subtitle_font_family: string;
  subtitle_font_weight: number;
  subtitle_font_size: string;
  description_font_size: string;
  card_height: string;
  overlay_opacity: number;
  show_author_badge: boolean;
  custom_css_classes: string;
}

const EVENT_TYPES = [
  { value: 'keynote', label: 'Keynote', icon: '🎤' },
  { value: 'seminar', label: 'Seminar', icon: '🎓' },
  { value: 'workshop', label: 'Workshop', icon: '🛠️' },
  { value: 'coaching', label: 'Coaching', icon: '⭐' },
  { value: 'corporate', label: 'Corporate Training', icon: '🏢' },
  { value: 'webinar', label: 'Webinar', icon: '💻' },
  { value: 'retreat', label: 'Retreat', icon: '🏔️' },
  { value: 'masterclass', label: 'Masterclass', icon: '👑' },
  { value: 'live-event', label: 'Live Event', icon: '🔴' },
  { value: 'online-live', label: 'Online Live', icon: '🌐' },
  { value: 'transformation', label: 'Transformation', icon: '✨' }
];

const FONT_FAMILIES = [
  { value: 'SF Pro Display', label: 'SF Pro Display (Apple)' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Playfair Display', label: 'Playfair Display (Serif)' },
  { value: 'Bebas Neue', label: 'Bebas Neue (Display)' }
];

const FONT_WEIGHTS = [
  { value: 100, label: 'Thin (100)' },
  { value: 200, label: 'Extra Light (200)' },
  { value: 300, label: 'Light (300)' },
  { value: 400, label: 'Regular (400)' },
  { value: 500, label: 'Medium (500)' },
  { value: 600, label: 'Semi Bold (600)' },
  { value: 700, label: 'Bold (700)' },
  { value: 800, label: 'Extra Bold (800)' },
  { value: 900, label: 'Black (900)' }
];

const FONT_SIZES = {
  title: [
    { value: 'xl', label: 'XL (1.25rem)' },
    { value: '2xl', label: '2XL (1.5rem)' },
    { value: '3xl', label: '3XL (1.875rem)' },
    { value: '4xl', label: '4XL (2.25rem)' },
    { value: '5xl', label: '5XL (3rem)' },
    { value: '6xl', label: '6XL (3.75rem)' }
  ],
  text: [
    { value: 'xs', label: 'XS (0.75rem)' },
    { value: 'sm', label: 'SM (0.875rem)' },
    { value: 'base', label: 'Base (1rem)' },
    { value: 'lg', label: 'LG (1.125rem)' },
    { value: 'xl', label: 'XL (1.25rem)' }
  ]
};

const LETTER_SPACING = [
  { value: 'tighter', label: 'Tighter' },
  { value: 'tight', label: 'Tight' },
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Wide' },
  { value: 'wider', label: 'Wider' },
  { value: 'widest', label: 'Widest' }
];

const TEXT_TRANSFORM = [
  { value: 'none', label: 'None' },
  { value: 'uppercase', label: 'UPPERCASE' },
  { value: 'lowercase', label: 'lowercase' },
  { value: 'capitalize', label: 'Capitalize' }
];

const CARD_HEIGHTS = [
  { value: '350px', label: 'Kompakt (350px)' },
  { value: '400px', label: 'Standard (400px)' },
  { value: '450px', label: 'Mittel (450px)' },
  { value: '500px', label: 'Groß (500px)' },
  { value: '550px', label: 'Extra Groß (550px)' }
];

export default function EventsManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [headerContent, setHeaderContent] = useState<EventsHeaderContent>({
    heading: '',
    highlight: '',
    linkText: '',
    linkTarget: ''
  });
  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<HomeEvent | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'typography' | 'styling'>('content');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('[EventsManager] Auth check on mount:', {
        authenticated: !!session,
        user: session?.user?.email,
        expires: session?.expires_at
      });

      if (!session) {
        console.error('[EventsManager] ⚠️ NOT AUTHENTICATED! User needs to log in.');
      }

      await loadContent();
    };

    checkAuthAndLoad();
  }, []);

  const loadContent = async () => {
    try {
      const [headerRes, eventsRes] = await Promise.all([
        supabase
          .from('home_content')
          .select('content')
          .eq('section', 'events_header')
          .eq('is_active', true)
          .maybeSingle(),
        supabase
          .from('home_events')
          .select('*')
          .order('display_order')
      ]);

      console.log('Header loaded:', headerRes);

      if (headerRes.data?.content) {
        console.log('Setting header content:', headerRes.data.content);
        setHeaderContent(headerRes.data.content as EventsHeaderContent);
      } else {
        console.warn('No header data found, using defaults');
        setHeaderContent({
          heading: 'Events, die',
          highlight: 'befreien',
          linkText: 'Events entdecken',
          linkTarget: '#seminare'
        });
      }

      if (eventsRes.data) {
        setEvents(eventsRes.data);
      }
    } catch (error) {
      console.error('Error loading events content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHeader = async () => {
    setSaving(true);
    try {
      console.log('=== ULTIMATIVER SAVE ATTEMPT ===');

      const session = await supabase.auth.getSession();
      console.log('Auth session:', session.data.session ? 'AUTHENTICATED ✅' : 'NOT AUTHENTICATED ❌');
      console.log('User:', session.data.session?.user?.email);

      console.log('Saving content:', headerContent);

      const { data: beforeData } = await supabase
        .from('home_content')
        .select('*')
        .eq('section', 'events_header')
        .single();
      console.log('BEFORE update:', beforeData);

      const { data, error, status, count } = await supabase
        .from('home_content')
        .update({ content: headerContent })
        .eq('section', 'events_header')
        .select();

      console.log('HTTP Status:', status);
      console.log('Rows affected:', count);
      console.log('AFTER update:', data);

      if (error) {
        console.error('🚨 SUPABASE ERROR:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        const { data: allRows } = await supabase
          .from('home_content')
          .select('*')
          .eq('section', 'events_header');
        console.error('No rows updated. All rows with events_header:', allRows);
        throw new Error(`UPDATE FAILED: Keine Zeilen aktualisiert. Status: ${status}`);
      }

      console.log('🎉 SUCCESS! Content:', data[0].content);

      await loadContent();

      const successBox = document.createElement('div');
      successBox.className = 'fixed top-4 right-4 z-[9999] bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce';
      successBox.innerHTML = `
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
          <div>
            <div class="font-black text-lg">GESPEICHERT!</div>
            <div class="text-sm">Sofort aktiv auf Frontend</div>
          </div>
        </div>
      `;
      document.body.appendChild(successBox);
      setTimeout(() => {
        successBox.style.transition = 'all 0.3s';
        successBox.style.opacity = '0';
        successBox.style.transform = 'translateX(100%)';
        setTimeout(() => successBox.remove(), 300);
      }, 3000);

    } catch (error: any) {
      console.error('💥 SAVE FAILED:', error);

      const errorBox = document.createElement('div');
      errorBox.className = 'fixed top-4 right-4 z-[9999] bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-4 rounded-xl shadow-2xl border-2 border-red-400';
      errorBox.innerHTML = `
        <div class="flex items-start gap-3">
          <svg class="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <div>
            <div class="font-black text-lg">FEHLER BEIM SPEICHERN</div>
            <div class="text-sm mt-1">${error.message}</div>
            <div class="text-xs mt-2 opacity-75">Console (F12) für Details öffnen</div>
          </div>
        </div>
      `;
      document.body.appendChild(errorBox);
      setTimeout(() => {
        errorBox.style.transition = 'all 0.3s';
        errorBox.style.opacity = '0';
        setTimeout(() => errorBox.remove(), 300);
      }, 8000);
    } finally {
      setSaving(false);
    }
  };

  const saveEvent = async () => {
    if (!editingEvent) return;

    setSaving(true);
    try {
      console.log('Saving event:', editingEvent);

      if (editingEvent.id && editingEvent.id !== 'new') {
        const { data, error } = await supabase
          .from('home_events')
          .update(editingEvent)
          .eq('id', editingEvent.id)
          .select();

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        console.log('Event updated:', data);
      } else {
        const { id, ...eventData } = editingEvent;
        const { data, error } = await supabase
          .from('home_events')
          .insert([eventData])
          .select();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Event created:', data);
      }

      await loadContent();
      setShowEventForm(false);
      setEditingEvent(null);

      const successBox = document.createElement('div');
      successBox.className = 'fixed top-4 right-4 z-[9999] bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce';
      successBox.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="font-bold">Event erfolgreich gespeichert!</span>
      `;
      document.body.appendChild(successBox);
      setTimeout(() => successBox.remove(), 3000);

    } catch (error: any) {
      console.error('Error saving event:', error);

      const errorBox = document.createElement('div');
      errorBox.className = 'fixed top-4 right-4 z-[9999] bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3';
      errorBox.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <div>
          <div class="font-bold">Fehler beim Speichern</div>
          <div class="text-sm opacity-90">${error.message || 'Unbekannter Fehler'}</div>
        </div>
      `;
      document.body.appendChild(errorBox);
      setTimeout(() => errorBox.remove(), 5000);
    } finally {
      setSaving(false);
    }
  };

  const toggleEventActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('home_events')
        .update({ is_active: !currentActive })
        .eq('id', id);

      if (error) throw error;
      await loadContent();
    } catch (error) {
      console.error('Error toggling event:', error);
      alert('Fehler beim Ändern des Status');
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('home_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadContent();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Fehler beim Löschen');
    }
  };

  const moveEvent = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === events.length - 1)
    ) {
      return;
    }

    const newEvents = [...events];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newEvents[index], newEvents[targetIndex]] = [newEvents[targetIndex], newEvents[index]];

    const updates = newEvents.map((event, idx) => ({
      id: event.id,
      display_order: idx
    }));

    try {
      for (const update of updates) {
        await supabase
          .from('home_events')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }
      await loadContent();
    } catch (error) {
      console.error('Error reordering events:', error);
      alert('Fehler beim Sortieren');
    }
  };

  const gradientOptions = [
    { value: 'yellow-400', label: '🌟 Gelb Hell' },
    { value: 'yellow-500', label: '💛 Gelb' },
    { value: 'orange-400', label: '🧡 Orange Hell' },
    { value: 'orange-500', label: '🔶 Orange' },
    { value: 'blue-400', label: '💙 Blau Hell' },
    { value: 'blue-500', label: '🔵 Blau' },
    { value: 'purple-400', label: '💜 Lila Hell' },
    { value: 'purple-500', label: '🟣 Lila' },
    { value: 'green-400', label: '💚 Grün Hell' },
    { value: 'green-500', label: '🟢 Grün' },
    { value: 'pink-400', label: '💗 Pink Hell' },
    { value: 'pink-500', label: '🩷 Pink' },
    { value: 'red-400', label: '❤️ Rot Hell' },
    { value: 'red-500', label: '🔴 Rot' },
    { value: 'cyan-400', label: '🩵 Cyan Hell' },
    { value: 'cyan-500', label: '🔷 Cyan' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HIGH-END HEADER with NEON EFFECTS */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
        <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl" />

        <div className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/90 to-zinc-900/90 backdrop-blur-xl rounded-2xl border-2 border-yellow-500/30 shadow-[0_0_80px_rgba(234,179,8,0.3),inset_0_0_60px_rgba(234,179,8,0.05)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.6)]">
                  <Zap className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                  Events Section
                </h2>
                <p className="text-white/60 text-sm mt-1">Überschrift und Event-Karten verwalten</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-yellow-300 mb-2">Haupttext</label>
                <input
                  type="text"
                  value={headerContent.heading}
                  onChange={(e) => setHeaderContent({ ...headerContent, heading: e.target.value })}
                  placeholder="Events, die"
                  className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-orange-300 mb-2">Hervorgehobener Text</label>
                <input
                  type="text"
                  value={headerContent.highlight}
                  onChange={(e) => setHeaderContent({ ...headerContent, highlight: e.target.value })}
                  placeholder="befreien"
                  className="w-full px-4 py-3 bg-black/40 border border-orange-500/30 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-yellow-300 mb-2">Link Text</label>
                <input
                  type="text"
                  value={headerContent.linkText}
                  onChange={(e) => setHeaderContent({ ...headerContent, linkText: e.target.value })}
                  placeholder="Events entdecken"
                  className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-orange-300 mb-2">Link Ziel</label>
                <input
                  type="text"
                  value={headerContent.linkTarget}
                  onChange={(e) => setHeaderContent({ ...headerContent, linkTarget: e.target.value })}
                  placeholder="#seminare"
                  className="w-full px-4 py-3 bg-black/40 border border-orange-500/30 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                />
              </div>
            </div>

            <button
              onClick={saveHeader}
              disabled={saving}
              className="group/btn relative px-6 py-3 rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 transition-all group-hover/btn:from-yellow-300 group-hover/btn:via-orange-400 group-hover/btn:to-yellow-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-white/30 to-yellow-400/0 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-xl" />
              <div className="relative flex items-center gap-2 text-black font-bold">
                <Save size={18} />
                {saving ? 'Speichert...' : 'Header Speichern'}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* EVENT CARDS MANAGEMENT */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-50" />

        <div className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/90 to-zinc-900/90 backdrop-blur-xl rounded-2xl border border-orange-500/20 shadow-[0_0_60px_rgba(249,115,22,0.2)]">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-white">Event Karten</h3>
              <button
                onClick={() => {
                  setEditingEvent({
                    id: 'new',
                    title: '',
                    subtitle: '',
                    description: '',
                    image_url: '',
                    event_type: 'keynote',
                    gradient_from: 'yellow-400',
                    gradient_to: 'orange-500',
                    is_active: true,
                    display_order: events.length,
                    title_font_family: 'SF Pro Display',
                    title_font_weight: 900,
                    title_font_size: '3xl',
                    title_letter_spacing: 'tight',
                    title_text_transform: 'uppercase',
                    subtitle_font_family: 'Inter',
                    subtitle_font_weight: 400,
                    subtitle_font_size: 'sm',
                    description_font_size: 'sm',
                    card_height: '450px',
                    overlay_opacity: 70,
                    show_author_badge: true,
                    custom_css_classes: ''
                  });
                  setShowEventForm(true);
                }}
                className="group/add relative px-5 py-2.5 rounded-xl overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500" />
                <div className="relative flex items-center gap-2 text-black font-bold text-sm">
                  <Plus size={16} />
                  Event hinzufügen
                </div>
              </button>
            </div>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="group/item relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-orange-400/40 transition-all"
                >
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-400/0 via-orange-400/20 to-yellow-400/0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity blur-xl" />

                  <div className="relative flex items-start gap-6">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-white">{event.title}</h4>
                        {!event.is_active && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                            INAKTIV
                          </span>
                        )}
                      </div>
                      <p className="text-white/60 text-sm mb-2">{event.subtitle}</p>
                      <p className="text-white/40 text-xs mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                          {EVENT_TYPES.find(t => t.value === event.event_type)?.icon} {event.event_type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-400/10 text-purple-400 border border-purple-400/20">
                          {event.title_font_family} {event.title_font_weight}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-400/10 text-blue-400 border border-blue-400/20">
                          {event.card_height}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleEventActive(event.id, event.is_active)}
                        className={`p-2 rounded-lg transition-all ${
                          event.is_active
                            ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                            : 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                        }`}
                        title={event.is_active ? 'Deaktivieren' : 'Aktivieren'}
                      >
                        {event.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button
                        onClick={() => moveEvent(index, 'up')}
                        disabled={index === 0}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Nach oben"
                      >
                        <ArrowUp size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => moveEvent(index, 'down')}
                        disabled={index === events.length - 1}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Nach unten"
                      >
                        <ArrowDown size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingEvent(event);
                          setShowEventForm(true);
                        }}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all"
                        title="Bearbeiten"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Event löschen',
                            message: `Möchten Sie "${event.title}" wirklich löschen?`,
                            onConfirm: () => deleteEvent(event.id)
                          });
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                        title="Löschen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ULTRA HIGH-END EVENT FORM MODAL */}
      {showEventForm && editingEvent && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem',
          overflow: 'auto'
        }}>
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto" style={{ margin: 'auto' }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30 rounded-3xl blur-2xl animate-pulse" />

            <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl border-2 border-yellow-500/30 shadow-[0_0_100px_rgba(234,179,8,0.4)]">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-200 to-orange-400 bg-clip-text text-transparent">
                    {editingEvent.id === 'new' ? 'Neues Event' : 'Event bearbeiten'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowEventForm(false);
                      setEditingEvent(null);
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* TABS */}
                <div className="flex gap-2 mb-6 border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                      activeTab === 'content'
                        ? 'text-yellow-400 border-b-2 border-yellow-400'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <Layers size={18} />
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('typography')}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                      activeTab === 'typography'
                        ? 'text-orange-400 border-b-2 border-orange-400'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <Type size={18} />
                    Typografie
                  </button>
                  <button
                    onClick={() => setActiveTab('styling')}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                      activeTab === 'styling'
                        ? 'text-purple-400 border-b-2 border-purple-400'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <Palette size={18} />
                    Styling
                  </button>
                </div>

                {/* CONTENT TAB */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-yellow-300 mb-2">Titel *</label>
                        <input
                          type="text"
                          value={editingEvent.title}
                          onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-yellow-300 mb-2">Event Typ</label>
                        <select
                          value={editingEvent.event_type}
                          onChange={(e) => setEditingEvent({ ...editingEvent, event_type: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                        >
                          {EVENT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.icon} {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-orange-300 mb-2">Untertitel</label>
                      <input
                        type="text"
                        value={editingEvent.subtitle}
                        onChange={(e) => setEditingEvent({ ...editingEvent, subtitle: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-yellow-300 mb-2">Beschreibung</label>
                      <textarea
                        value={editingEvent.description}
                        onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-orange-300 mb-2">Bild</label>
                      <ImageUpload
                        currentImage={editingEvent.image_url}
                        onImageChange={(url) => setEditingEvent({ ...editingEvent, image_url: url })}
                        bucket="home-images"
                        path="events"
                      />
                    </div>
                  </div>
                )}

                {/* TYPOGRAPHY TAB */}
                {activeTab === 'typography' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-300 mb-4">📝 Titel Typografie</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftart</label>
                          <select
                            value={editingEvent.title_font_family}
                            onChange={(e) => setEditingEvent({ ...editingEvent, title_font_family: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                          >
                            {FONT_FAMILIES.map((font) => (
                              <option key={font.value} value={font.value}>
                                {font.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftstärke</label>
                          <select
                            value={editingEvent.title_font_weight}
                            onChange={(e) => setEditingEvent({ ...editingEvent, title_font_weight: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                          >
                            {FONT_WEIGHTS.map((weight) => (
                              <option key={weight.value} value={weight.value}>
                                {weight.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftgröße</label>
                          <select
                            value={editingEvent.title_font_size}
                            onChange={(e) => setEditingEvent({ ...editingEvent, title_font_size: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                          >
                            {FONT_SIZES.title.map((size) => (
                              <option key={size.value} value={size.value}>
                                {size.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Buchstabenabstand</label>
                          <select
                            value={editingEvent.title_letter_spacing}
                            onChange={(e) => setEditingEvent({ ...editingEvent, title_letter_spacing: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                          >
                            {LETTER_SPACING.map((spacing) => (
                              <option key={spacing.value} value={spacing.value}>
                                {spacing.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-white/80 mb-2">Text-Transformation</label>
                          <select
                            value={editingEvent.title_text_transform}
                            onChange={(e) => setEditingEvent({ ...editingEvent, title_text_transform: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                          >
                            {TEXT_TRANSFORM.map((transform) => (
                              <option key={transform.value} value={transform.value}>
                                {transform.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-orange-300 mb-4">📋 Untertitel Typografie</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftart</label>
                          <select
                            value={editingEvent.subtitle_font_family}
                            onChange={(e) => setEditingEvent({ ...editingEvent, subtitle_font_family: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400"
                          >
                            {FONT_FAMILIES.map((font) => (
                              <option key={font.value} value={font.value}>
                                {font.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftstärke</label>
                          <select
                            value={editingEvent.subtitle_font_weight}
                            onChange={(e) => setEditingEvent({ ...editingEvent, subtitle_font_weight: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 bg-black/40 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400"
                          >
                            {FONT_WEIGHTS.map((weight) => (
                              <option key={weight.value} value={weight.value}>
                                {weight.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftgröße</label>
                          <select
                            value={editingEvent.subtitle_font_size}
                            onChange={(e) => setEditingEvent({ ...editingEvent, subtitle_font_size: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400"
                          >
                            {FONT_SIZES.text.map((size) => (
                              <option key={size.value} value={size.value}>
                                {size.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-300 mb-4">📄 Beschreibung Typografie</h4>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Schriftgröße</label>
                        <select
                          value={editingEvent.description_font_size}
                          onChange={(e) => setEditingEvent({ ...editingEvent, description_font_size: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400"
                        >
                          {FONT_SIZES.text.map((size) => (
                            <option key={size.value} value={size.value}>
                              {size.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STYLING TAB */}
                {activeTab === 'styling' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-yellow-300 mb-2">Gradient Von</label>
                        <select
                          value={editingEvent.gradient_from}
                          onChange={(e) => setEditingEvent({ ...editingEvent, gradient_from: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                        >
                          {gradientOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-orange-300 mb-2">Gradient Bis</label>
                        <select
                          value={editingEvent.gradient_to}
                          onChange={(e) => setEditingEvent({ ...editingEvent, gradient_to: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        >
                          {gradientOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-purple-300 mb-2">Kartenhöhe</label>
                        <select
                          value={editingEvent.card_height}
                          onChange={(e) => setEditingEvent({ ...editingEvent, card_height: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        >
                          {CARD_HEIGHTS.map((height) => (
                            <option key={height.value} value={height.value}>
                              {height.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-blue-300 mb-2">
                          Overlay Transparenz: {editingEvent.overlay_opacity}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editingEvent.overlay_opacity}
                          onChange={(e) => setEditingEvent({ ...editingEvent, overlay_opacity: parseInt(e.target.value) })}
                          className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cyan-300 mb-2">Custom CSS Klassen</label>
                      <input
                        type="text"
                        value={editingEvent.custom_css_classes}
                        onChange={(e) => setEditingEvent({ ...editingEvent, custom_css_classes: e.target.value })}
                        placeholder="custom-class-1 custom-class-2"
                        className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      />
                      <p className="text-white/40 text-xs mt-1">Zusätzliche CSS-Klassen für erweiterte Anpassungen</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="show-author"
                          checked={editingEvent.show_author_badge}
                          onChange={(e) => setEditingEvent({ ...editingEvent, show_author_badge: e.target.checked })}
                          className="w-5 h-5 rounded border-green-500/30 bg-black/40"
                        />
                        <label htmlFor="show-author" className="text-white font-medium">
                          Author Badge anzeigen
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="event-active"
                          checked={editingEvent.is_active}
                          onChange={(e) => setEditingEvent({ ...editingEvent, is_active: e.target.checked })}
                          className="w-5 h-5 rounded border-yellow-500/30 bg-black/40"
                        />
                        <label htmlFor="event-active" className="text-white font-medium">
                          Event ist aktiv
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={saveEvent}
                    disabled={saving || !editingEvent.title}
                    className="flex-1 group/save relative px-6 py-3 rounded-xl overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />
                    <div className="relative flex items-center justify-center gap-2 text-black font-bold">
                      <Save size={18} />
                      {saving ? 'Speichert...' : 'Event Speichern'}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowEventForm(false);
                      setEditingEvent(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={() => {
          confirmDialog.onConfirm();
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </div>
  );
}
