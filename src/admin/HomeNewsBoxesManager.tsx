import { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, ArrowUp, ArrowDown, Type, Palette, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmDialog from './ConfirmDialog';

interface NewsBox {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  gradient_from: string;
  gradient_to: string;
  target_section: string;
  button_text: string;
  button_color: string;
  is_active: boolean;
  display_order: number;
  heading_font_family: string;
  heading_font_weight: number;
  heading_font_size: string;
  heading_letter_spacing: string;
  heading_text_transform: string;
  heading_color: string;
  description_font_family: string;
  description_font_weight: number;
  description_font_size: string;
  description_color: string;
  button_style: string;
  button_color_custom: string;
  button_text_color: string;
  background_type: string;
  background_color: string;
  background_gradient_from: string;
  background_gradient_to: string;
  border_style: string;
  border_color: string;
  custom_css_classes: string;
}

const ICON_OPTIONS = [
  'Calendar', 'Users', 'Mail', 'Bell', 'Settings', 'Package', 'ShoppingBag', 'BookOpen',
  'Brain', 'Sparkles', 'Star', 'Zap', 'Heart', 'Award', 'Target', 'Traning', 'Infinity'
];

const FONT_FAMILIES = [
  { value: 'SF Pro Display', label: 'SF Pro Display (Apple)' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Playfair Display', label: 'Playfair Display' }
];

const FONT_WEIGHTS = [
  { value: 100, label: 'Thin' },
  { value: 300, label: 'Light' },
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semi Bold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
  { value: 900, label: 'Black' }
];

const FONT_SIZES = {
  heading: [
    { value: 'sm', label: 'Small (0.875rem)' },
    { value: 'base', label: 'Base (1rem)' },
    { value: 'lg', label: 'Large (1.125rem)' },
    { value: 'xl', label: 'XL (1.25rem)' },
    { value: '2xl', label: '2XL (1.5rem)' },
    { value: '3xl', label: '3XL (1.875rem)' }
  ],
  text: [
    { value: 'xs', label: 'XS (0.75rem)' },
    { value: 'sm', label: 'SM (0.875rem)' },
    { value: 'base', label: 'Base (1rem)' },
    { value: 'lg', label: 'LG (1.125rem)' }
  ]
};

const LETTER_SPACING = [
  { value: 'tight', label: 'Tight' },
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Wide' },
  { value: 'wider', label: 'Wider' }
];

const TEXT_TRANSFORM = [
  { value: 'none', label: 'None' },
  { value: 'uppercase', label: 'UPPERCASE' },
  { value: 'lowercase', label: 'lowercase' },
  { value: 'capitalize', label: 'Capitalize' }
];

export default function HomeNewsBoxesManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [boxes, setBoxes] = useState<NewsBox[]>([]);
  const [editingBox, setEditingBox] = useState<NewsBox | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'typography' | 'design'>('content');
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
    loadBoxes();
  }, []);

  const loadBoxes = async () => {
    try {
      const { data, error } = await supabase
        .from('home_news_boxes')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setBoxes(data || []);
    } catch (error) {
      console.error('Error loading boxes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBox = async () => {
    if (!editingBox) return;

    setSaving(true);
    try {
      if (editingBox.id && editingBox.id !== 'new') {
        const { error } = await supabase
          .from('home_news_boxes')
          .update(editingBox)
          .eq('id', editingBox.id);

        if (error) throw error;
      } else {
        const { id, ...boxData } = editingBox;
        const { error } = await supabase
          .from('home_news_boxes')
          .insert([boxData]);

        if (error) throw error;
      }

      await loadBoxes();
      setShowForm(false);
      setEditingBox(null);
      alert('News Box erfolgreich gespeichert!');
    } catch (error) {
      console.error('Error saving box:', error);
      alert('Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  };

  const deleteBox = async (id: string) => {
    try {
      const { error } = await supabase
        .from('home_news_boxes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadBoxes();
    } catch (error) {
      console.error('Error deleting box:', error);
      alert('Fehler beim Löschen');
    }
  };

  const moveBox = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === boxes.length - 1)) {
      return;
    }

    const newBoxes = [...boxes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBoxes[index], newBoxes[targetIndex]] = [newBoxes[targetIndex], newBoxes[index]];

    const updates = newBoxes.map((box, idx) => ({
      id: box.id,
      display_order: idx
    }));

    try {
      for (const update of updates) {
        await supabase
          .from('home_news_boxes')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }
      await loadBoxes();
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div>Lädt...</div></div>;
  }

  return (
    <div className="space-y-8">
      {/* HIGH-END HEADER */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
        <div className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/90 to-zinc-900/90 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/30 shadow-[0_0_80px_rgba(34,211,238,0.3)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                  <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  News Boxes
                </h2>
                <p className="text-white/60 text-sm mt-1">Featured Boxen unter dem Hero verwalten</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEWS BOXES MANAGEMENT */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50" />
        <div className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/90 to-zinc-900/90 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-white">Featured Boxen</h3>
              <button
                onClick={() => {
                  setEditingBox({
                    id: 'new',
                    title: '',
                    description: '',
                    icon_name: 'Calendar',
                    gradient_from: 'yellow-500',
                    gradient_to: 'orange-500',
                    target_section: '#seminare',
                    button_text: 'Mehr erfahren',
                    button_color: 'yellow-400',
                    is_active: true,
                    display_order: boxes.length,
                    heading_font_family: 'SF Pro Display',
                    heading_font_weight: 700,
                    heading_font_size: '2xl',
                    heading_letter_spacing: 'normal',
                    heading_text_transform: 'none',
                    heading_color: '#000000',
                    description_font_family: 'Inter',
                    description_font_weight: 400,
                    description_font_size: 'sm',
                    description_color: '#666666',
                    button_style: 'solid',
                    button_color_custom: '#facc15',
                    button_text_color: '#000000',
                    background_type: 'transparent',
                    background_color: '#ffffff',
                    background_gradient_from: '#ffffff',
                    background_gradient_to: '#f3f4f6',
                    border_style: 'none',
                    border_color: '#e5e7eb',
                    custom_css_classes: ''
                  });
                  setShowForm(true);
                }}
                className="group/add relative px-5 py-2.5 rounded-xl overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500" />
                <div className="relative flex items-center gap-2 text-black font-bold text-sm">
                  <Plus size={16} />
                  Box hinzufügen
                </div>
              </button>
            </div>

            <div className="space-y-4">
              {boxes.map((box, index) => (
                <div
                  key={box.id}
                  className="group/item relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all"
                >
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity blur-xl" />

                  <div className="relative flex items-start gap-6">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-1">{box.title}</h4>
                      <p className="text-white/60 text-sm mb-3">{box.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                          {box.icon_name}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-400/10 text-purple-400 border border-purple-400/20">
                          {box.heading_font_family} {box.heading_font_weight}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-400/10 text-blue-400 border border-blue-400/20">
                          {box.heading_font_size}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => moveBox(index, 'up')}
                        disabled={index === 0}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30"
                      >
                        <ArrowUp size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => moveBox(index, 'down')}
                        disabled={index === boxes.length - 1}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30"
                      >
                        <ArrowDown size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingBox(box);
                          setShowForm(true);
                        }}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Box löschen',
                            message: `Möchten Sie "${box.title}" wirklich löschen?`,
                            onConfirm: () => deleteBox(box.id)
                          });
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
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

      {/* FORM MODAL */}
      {showForm && editingBox && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl animate-pulse" />

            <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl border-2 border-cyan-500/30 shadow-[0_0_100px_rgba(34,211,238,0.4)]">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-200 to-blue-400 bg-clip-text text-transparent">
                    {editingBox.id === 'new' ? 'Neue Box' : 'Box bearbeiten'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingBox(null);
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
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
                        ? 'text-cyan-400 border-b-2 border-cyan-400'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('typography')}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                      activeTab === 'typography'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <Type size={18} />
                    Typografie
                  </button>
                  <button
                    onClick={() => setActiveTab('design')}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                      activeTab === 'design'
                        ? 'text-purple-400 border-b-2 border-purple-400'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <Palette size={18} />
                    Design
                  </button>
                </div>

                {/* CONTENT TAB */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-cyan-300 mb-2">Titel *</label>
                      <input
                        type="text"
                        value={editingBox.title}
                        onChange={(e) => setEditingBox({ ...editingBox, title: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-blue-300 mb-2">Beschreibung</label>
                      <textarea
                        value={editingBox.description}
                        onChange={(e) => setEditingBox({ ...editingBox, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-cyan-300 mb-2">Icon</label>
                        <select
                          value={editingBox.icon_name}
                          onChange={(e) => setEditingBox({ ...editingBox, icon_name: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                        >
                          {ICON_OPTIONS.map((icon) => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-blue-300 mb-2">Button Text</label>
                        <input
                          type="text"
                          value={editingBox.button_text}
                          onChange={(e) => setEditingBox({ ...editingBox, button_text: e.target.value })}
                          className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-purple-300 mb-2">Target Section</label>
                      <input
                        type="text"
                        value={editingBox.target_section}
                        onChange={(e) => setEditingBox({ ...editingBox, target_section: e.target.value })}
                        placeholder="#seminare"
                        className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                )}

                {/* TYPOGRAPHY TAB */}
                {activeTab === 'typography' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-cyan-300 mb-4">📝 Titel Typografie</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftart</label>
                          <select
                            value={editingBox.heading_font_family}
                            onChange={(e) => setEditingBox({ ...editingBox, heading_font_family: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                          >
                            {FONT_FAMILIES.map((f) => (
                              <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftstärke</label>
                          <select
                            value={editingBox.heading_font_weight}
                            onChange={(e) => setEditingBox({ ...editingBox, heading_font_weight: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                          >
                            {FONT_WEIGHTS.map((w) => (
                              <option key={w.value} value={w.value}>{w.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftgröße</label>
                          <select
                            value={editingBox.heading_font_size}
                            onChange={(e) => setEditingBox({ ...editingBox, heading_font_size: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                          >
                            {FONT_SIZES.heading.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Buchstabenabstand</label>
                          <select
                            value={editingBox.heading_letter_spacing}
                            onChange={(e) => setEditingBox({ ...editingBox, heading_letter_spacing: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                          >
                            {LETTER_SPACING.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-white/80 mb-2">Text-Transformation</label>
                          <select
                            value={editingBox.heading_text_transform}
                            onChange={(e) => setEditingBox({ ...editingBox, heading_text_transform: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                          >
                            {TEXT_TRANSFORM.map((t) => (
                              <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-white/80 mb-2">Titel Farbe</label>
                          <input
                            type="color"
                            value={editingBox.heading_color}
                            onChange={(e) => setEditingBox({ ...editingBox, heading_color: e.target.value })}
                            className="w-full h-10 bg-black/40 border border-cyan-500/30 rounded-xl cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-4">📄 Beschreibung Typografie</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftart</label>
                          <select
                            value={editingBox.description_font_family}
                            onChange={(e) => setEditingBox({ ...editingBox, description_font_family: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-400"
                          >
                            {FONT_FAMILIES.map((f) => (
                              <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftstärke</label>
                          <select
                            value={editingBox.description_font_weight}
                            onChange={(e) => setEditingBox({ ...editingBox, description_font_weight: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-400"
                          >
                            {FONT_WEIGHTS.map((w) => (
                              <option key={w.value} value={w.value}>{w.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Schriftgröße</label>
                          <select
                            value={editingBox.description_font_size}
                            onChange={(e) => setEditingBox({ ...editingBox, description_font_size: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-400"
                          >
                            {FONT_SIZES.text.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-sm font-semibold text-white/80 mb-2">Beschreibung Farbe</label>
                          <input
                            type="color"
                            value={editingBox.description_color}
                            onChange={(e) => setEditingBox({ ...editingBox, description_color: e.target.value })}
                            className="w-full h-10 bg-black/40 border border-blue-500/30 rounded-xl cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DESIGN TAB */}
                {activeTab === 'design' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-300 mb-4">🎨 Button Design</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Button Style</label>
                          <select
                            value={editingBox.button_style}
                            onChange={(e) => setEditingBox({ ...editingBox, button_style: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400"
                          >
                            <option value="solid">Solid</option>
                            <option value="outline">Outline</option>
                            <option value="gradient">Gradient</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Button Farbe</label>
                          <input
                            type="color"
                            value={editingBox.button_color_custom}
                            onChange={(e) => setEditingBox({ ...editingBox, button_color_custom: e.target.value })}
                            className="w-full h-10 bg-black/40 border border-purple-500/30 rounded-xl cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Button Text Farbe</label>
                          <input
                            type="color"
                            value={editingBox.button_text_color}
                            onChange={(e) => setEditingBox({ ...editingBox, button_text_color: e.target.value })}
                            className="w-full h-10 bg-black/40 border border-purple-500/30 rounded-xl cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-pink-300 mb-4">🎯 Hintergrund & Rahmen</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Hintergrund Typ</label>
                          <select
                            value={editingBox.background_type}
                            onChange={(e) => setEditingBox({ ...editingBox, background_type: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-pink-500/30 rounded-xl text-white focus:outline-none focus:border-pink-400"
                          >
                            <option value="transparent">Transparent</option>
                            <option value="solid">Solid</option>
                            <option value="gradient">Gradient</option>
                          </select>
                        </div>

                        {editingBox.background_type === 'solid' && (
                          <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">Hintergrund Farbe</label>
                            <input
                              type="color"
                              value={editingBox.background_color}
                              onChange={(e) => setEditingBox({ ...editingBox, background_color: e.target.value })}
                              className="w-full h-10 bg-black/40 border border-pink-500/30 rounded-xl cursor-pointer"
                            />
                          </div>
                        )}

                        {editingBox.background_type === 'gradient' && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-white/80 mb-2">Gradient Von</label>
                              <input
                                type="color"
                                value={editingBox.background_gradient_from}
                                onChange={(e) => setEditingBox({ ...editingBox, background_gradient_from: e.target.value })}
                                className="w-full h-10 bg-black/40 border border-pink-500/30 rounded-xl cursor-pointer"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-white/80 mb-2">Gradient Bis</label>
                              <input
                                type="color"
                                value={editingBox.background_gradient_to}
                                onChange={(e) => setEditingBox({ ...editingBox, background_gradient_to: e.target.value })}
                                className="w-full h-10 bg-black/40 border border-pink-500/30 rounded-xl cursor-pointer"
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Rahmen Stil</label>
                          <select
                            value={editingBox.border_style}
                            onChange={(e) => setEditingBox({ ...editingBox, border_style: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border border-pink-500/30 rounded-xl text-white focus:outline-none focus:border-pink-400"
                          >
                            <option value="none">None</option>
                            <option value="solid">Solid</option>
                            <option value="gradient">Gradient</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">Rahmen Farbe</label>
                          <input
                            type="color"
                            value={editingBox.border_color}
                            onChange={(e) => setEditingBox({ ...editingBox, border_color: e.target.value })}
                            className="w-full h-10 bg-black/40 border border-pink-500/30 rounded-xl cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cyan-300 mb-2">Custom CSS Klassen</label>
                      <input
                        type="text"
                        value={editingBox.custom_css_classes}
                        onChange={(e) => setEditingBox({ ...editingBox, custom_css_classes: e.target.value })}
                        placeholder="custom-class-1 custom-class-2"
                        className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={saveBox}
                    disabled={saving || !editingBox.title}
                    className="flex-1 group/save relative px-6 py-3 rounded-xl overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />
                    <div className="relative flex items-center justify-center gap-2 text-white font-bold">
                      <Save size={18} />
                      {saving ? 'Speichert...' : 'Box Speichern'}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingBox(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
