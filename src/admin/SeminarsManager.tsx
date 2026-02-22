import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Search, X, Check,
  Users, Video, Monitor, PlayCircle, Wifi, Calendar, MapPin, Sparkles, GripVertical, Upload, Image as ImageIcon
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmDialog from './ConfirmDialog';

type FormatType = 'praesenz' | 'online-live' | 'webinar' | 'on-demand' | 'hybrid';

interface DateEntry {
  month: string;
  days: string;
  year: string;
  location: string;
  available: number;
}

interface Transformation {
  von: string;
  zu: string;
}

interface Module {
  tag: string;
  title: string;
  content: string;
}

interface Seminar {
  id: string;
  format: FormatType;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  price: string;
  capacity: string;
  dates: DateEntry[];
  description: string;
  essence: string;
  includes: string[];
  transformationen: Transformation[];
  module: Module[];
  gradient: string;
  image: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const formatConfig = {
  praesenz: { label: 'Präsenz', color: '#f59e0b', icon: Users },
  'online-live': { label: 'Online Live', color: '#f97316', icon: Video },
  webinar: { label: 'Webinar', color: '#ca8a04', icon: Monitor },
  'on-demand': { label: 'On-Demand', color: '#c2410c', icon: PlayCircle },
  hybrid: { label: 'Hybrid', color: '#d97706', icon: Wifi }
};

export default function SeminarsManager() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [draggedItem, setDraggedItem] = useState<Seminar | null>(null);
  const [dragOverItem, setDragOverItem] = useState<Seminar | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOverUpload, setDragOverUpload] = useState(false);
  const [deleteSeminarId, setDeleteSeminarId] = useState<string | null>(null);
  const [deleteSeminarTitle, setDeleteSeminarTitle] = useState<string>('');

  const emptySeminar: Partial<Seminar> = {
    format: 'praesenz',
    title: '',
    subtitle: '',
    tagline: '',
    duration: '',
    price: '',
    capacity: '',
    dates: [],
    description: '',
    essence: '',
    includes: [],
    transformationen: [],
    module: [],
    gradient: 'from-amber-500/10 via-orange-500/5 to-yellow-500/5',
    image: '',
    is_active: true,
    order_index: 0
  };

  const [formData, setFormData] = useState<Partial<Seminar>>(emptySeminar);

  // Temporary inputs for arrays
  const [includeInput, setIncludeInput] = useState('');
  const [dateInput, setDateInput] = useState<Partial<DateEntry>>({
    month: '',
    days: '',
    year: '2025',
    location: '',
    available: 0
  });
  const [transformationInput, setTransformationInput] = useState<Transformation>({ von: '', zu: '' });
  const [moduleInput, setModuleInput] = useState<Module>({ tag: '', title: '', content: '' });

  useEffect(() => {
    loadSeminars();

    const seminarsChannel = supabase
      .channel('seminars-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'seminars' }, () => {
        loadSeminars();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(seminarsChannel);
    };
  }, []);

  const loadSeminars = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('seminars')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) {
      setSeminars(data);
    }
    setLoading(false);
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.format) {
        alert('Bitte füllen Sie mindestens Titel und Format aus.');
        return;
      }

      if (editingSeminar) {
        const { error } = await supabase
          .from('seminars')
          .update({
            format: formData.format,
            title: formData.title,
            subtitle: formData.subtitle || '',
            tagline: formData.tagline || '',
            duration: formData.duration || '',
            price: formData.price || '',
            capacity: formData.capacity || '',
            dates: formData.dates || [],
            description: formData.description || '',
            essence: formData.essence || '',
            includes: formData.includes || [],
            transformationen: formData.transformationen || [],
            module: formData.module || [],
            gradient: formData.gradient || 'from-amber-500/10 via-orange-500/5 to-yellow-500/5',
            image: formData.image || '',
            is_active: formData.is_active !== undefined ? formData.is_active : true,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingSeminar.id);

        if (error) {
          console.error('Update error:', error);
          alert('Fehler beim Speichern: ' + error.message);
          return;
        }
      } else {
        const slug = generateSlug(formData.title);
        const maxOrderIndex = seminars.length > 0
          ? Math.max(...seminars.map(s => s.order_index))
          : 0;

        const { error } = await supabase
          .from('seminars')
          .insert([{
            id: slug,
            format: formData.format,
            title: formData.title,
            subtitle: formData.subtitle || '',
            tagline: formData.tagline || '',
            duration: formData.duration || '',
            price: formData.price || '',
            capacity: formData.capacity || '',
            dates: formData.dates || [],
            description: formData.description || '',
            essence: formData.essence || '',
            includes: formData.includes || [],
            transformationen: formData.transformationen || [],
            module: formData.module || [],
            gradient: formData.gradient || 'from-amber-500/10 via-orange-500/5 to-yellow-500/5',
            image: formData.image || '',
            is_active: formData.is_active !== undefined ? formData.is_active : true,
            order_index: maxOrderIndex + 1
          }]);

        if (error) {
          console.error('Insert error:', error);
          alert('Fehler beim Erstellen: ' + error.message);
          return;
        }
      }

      await loadSeminars();
      setShowModal(false);
      setEditingSeminar(null);
      setFormData(emptySeminar);
      alert('Seminar erfolgreich gespeichert!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  const handleEdit = (seminar: Seminar) => {
    setEditingSeminar(seminar);
    setFormData(seminar);
    setShowModal(true);
  };

  const handleDelete = (id: string, title: string) => {
    setDeleteSeminarId(id);
    setDeleteSeminarTitle(title);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteSeminarId) return;

    const { error } = await supabase
      .from('seminars')
      .delete()
      .eq('id', deleteSeminarId);

    if (error) {
      console.error('Delete error:', error);
      alert('Fehler beim Löschen');
    } else {
      setDeleteSeminarId(null);
      setDeleteSeminarTitle('');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('seminars')
      .update({ is_active: !currentStatus })
      .eq('id', id);
  };

  // Array management functions
  const addInclude = () => {
    if (includeInput.trim()) {
      setFormData({
        ...formData,
        includes: [...(formData.includes || []), includeInput.trim()]
      });
      setIncludeInput('');
    }
  };

  const removeInclude = (index: number) => {
    setFormData({
      ...formData,
      includes: formData.includes?.filter((_, i) => i !== index) || []
    });
  };

  const addDate = () => {
    if (dateInput.month && dateInput.days && dateInput.location) {
      setFormData({
        ...formData,
        dates: [...(formData.dates || []), dateInput as DateEntry]
      });
      setDateInput({ month: '', days: '', year: '2025', location: '', available: 0 });
    }
  };

  const removeDate = (index: number) => {
    setFormData({
      ...formData,
      dates: formData.dates?.filter((_, i) => i !== index) || []
    });
  };

  const addTransformation = () => {
    if (transformationInput.von && transformationInput.zu) {
      setFormData({
        ...formData,
        transformationen: [...(formData.transformationen || []), transformationInput]
      });
      setTransformationInput({ von: '', zu: '' });
    }
  };

  const removeTransformation = (index: number) => {
    setFormData({
      ...formData,
      transformationen: formData.transformationen?.filter((_, i) => i !== index) || []
    });
  };

  const addModule = () => {
    if (moduleInput.tag && moduleInput.title && moduleInput.content) {
      setFormData({
        ...formData,
        module: [...(formData.module || []), moduleInput]
      });
      setModuleInput({ tag: '', title: '', content: '' });
    }
  };

  const removeModule = (index: number) => {
    setFormData({
      ...formData,
      module: formData.module?.filter((_, i) => i !== index) || []
    });
  };

  const handleDragStart = (e: React.DragEvent, seminar: Seminar) => {
    setDraggedItem(seminar);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, seminar: Seminar) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(seminar);
  };

  const handleDragEnd = async () => {
    if (!draggedItem || !dragOverItem || draggedItem.id === dragOverItem.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = seminars.findIndex(s => s.id === draggedItem.id);
    const dragOverIndex = seminars.findIndex(s => s.id === dragOverItem.id);

    const newSeminars = [...seminars];
    const [removed] = newSeminars.splice(draggedIndex, 1);
    newSeminars.splice(dragOverIndex, 0, removed);

    const updates = newSeminars.map((seminar, index) => ({
      id: seminar.id,
      order_index: index + 1
    }));

    setSeminars(newSeminars);

    for (const update of updates) {
      await supabase
        .from('seminars')
        .update({ order_index: update.order_index })
        .eq('id', update.id);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('seminar-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('seminar-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
      setUploadingImage(false);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Fehler beim Hochladen des Bildes');
      setUploadingImage(false);
    }
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverUpload(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageUpload(files[0]);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const filteredSeminars = seminars.filter(seminar => {
    const matchesSearch = seminar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seminar.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = filterFormat === 'all' || seminar.format === filterFormat;
    return matchesSearch && matchesFormat;
  });

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-400/10 via-orange-400/10 to-yellow-400/10 rounded-[16px] sm:rounded-[24px] blur-xl" />
        <div className="relative bg-white p-5 sm:p-6 lg:p-8 rounded-[14px] sm:rounded-[22px] border border-gray-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-5 mb-5 sm:mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-gray-900">
                  Seminare & Webinare
                </h2>
              </div>
              <p className="text-[14px] sm:text-[15px] text-gray-600 ml-[52px] sm:ml-[60px]">
                Verwalten Sie alle Seminar-Angebote und Events
              </p>
            </div>
            <button
              onClick={() => {
                setEditingSeminar(null);
                setFormData(emptySeminar);
                setShowModal(true);
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 whitespace-nowrap"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Neues Seminar</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Seminare durchsuchen..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-[14px] sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-sm hover:border-amber-400"
              />
            </div>
            <select
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="w-full sm:w-auto sm:min-w-[200px] px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-[14px] sm:text-[15px] font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer transition-all shadow-sm hover:border-amber-400"
            >
              <option value="all">Alle Formate</option>
              <option value="praesenz">Präsenz</option>
              <option value="online-live">Online Live</option>
              <option value="webinar">Webinar</option>
              <option value="on-demand">On-Demand</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Seminars Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredSeminars.map((seminar) => {
          const Icon = formatConfig[seminar.format].icon;
          const color = formatConfig[seminar.format].color;
          const isDragging = draggedItem?.id === seminar.id;
          const isDragOver = dragOverItem?.id === seminar.id;

          return (
            <div
              key={seminar.id}
              draggable
              onDragStart={(e) => handleDragStart(e, seminar)}
              onDragOver={(e) => handleDragOver(e, seminar)}
              onDragEnd={handleDragEnd}
              className={`group relative cursor-move ${
                isDragging ? 'opacity-50 scale-95' : ''
              } ${isDragOver ? 'scale-105' : ''}`}
            >
              {/* Outer glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-yellow-400/20 rounded-[20px] sm:rounded-[24px] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

              {/* Card */}
              <div className={`relative bg-white rounded-[18px] sm:rounded-[22px] border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${
                isDragOver ? 'ring-2 ring-amber-500 shadow-xl' : ''
              }`}>
                {/* Image/Icon Section */}
                <div className="relative h-44 sm:h-52 overflow-hidden"
                  style={{
                    backgroundImage: seminar.image
                      ? `url(${seminar.image})`
                      : `linear-gradient(135deg, ${color}20 0%, ${color}10 50%, ${color}05 100%)`
                  }}
                >
                  {/* Background pattern overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl opacity-30" style={{ backgroundColor: color }} />
                      <Icon
                        size={56}
                        strokeWidth={1.5}
                        style={{ color }}
                        className="relative transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Top action buttons */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleActive(seminar.id, seminar.is_active)}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 hover:scale-110 transition-all"
                    >
                      {seminar.is_active ? <Eye size={16} strokeWidth={2.5} /> : <EyeOff size={16} strokeWidth={2.5} />}
                    </button>
                  </div>

                  {/* Drag handle - visible on hover */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-lg bg-white/95 backdrop-blur-md shadow-lg cursor-grab active:cursor-grabbing">
                      <GripVertical size={16} className="text-gray-600" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Inactive overlay */}
                  {!seminar.is_active && (
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/95 rounded-xl shadow-lg">
                        <span className="text-[12px] sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider">
                          Inaktiv
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-4 sm:p-5 lg:p-6">
                  {/* Format & Category badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                        border: `1px solid ${color}30`
                      }}
                    >
                      <Sparkles size={11} strokeWidth={2.5} />
                      {formatConfig[seminar.format].label}
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold bg-gradient-to-br from-gray-100 to-gray-50 text-gray-700 border border-gray-200/60 shadow-sm">
                      {seminar.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] sm:text-[19px] lg:text-[20px] font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {seminar.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[13px] sm:text-[14px] text-gray-600 mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                    {seminar.tagline}
                  </p>

                  {/* Price & Duration */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] sm:text-[20px] font-bold bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {seminar.price}
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[12px] sm:text-[13px] font-medium text-gray-600">
                      {seminar.duration}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => handleEdit(seminar)}
                      className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-900 rounded-xl text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-md border border-gray-200/60"
                    >
                      <Edit2 size={15} strokeWidth={2.5} />
                      <span className="hidden sm:inline">Bearbeiten</span>
                    </button>
                    <button
                      onClick={() => handleDelete(seminar.id, seminar.title)}
                      className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 rounded-xl text-[13px] sm:text-[14px] font-semibold flex items-center justify-center transition-all hover:shadow-md border border-red-200/60"
                    >
                      <Trash2 size={15} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          overflow: 'auto'
        }}>
          <div className="bg-white rounded-[24px] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" style={{ margin: 'auto' }}>
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-[600] text-gray-900">
                  {editingSeminar ? 'Seminar bearbeiten' : 'Neues Seminar'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Titel *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="z.B. Neues Bewusstsein"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Untertitel *
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="z.B. Die Transformation des Seins"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="z.B. Vom Denken zur Wahrheit"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Format *
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value as FormatType })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="praesenz">Präsenz</option>
                      <option value="online-live">Online Live</option>
                      <option value="webinar">Webinar</option>
                      <option value="on-demand">On-Demand</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Status
                    </label>
                    <button
                      onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                      className={`w-full px-4 py-3 rounded-[10px] text-[15px] font-[500] flex items-center justify-center gap-2 transition-colors ${
                        formData.is_active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {formData.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                      {formData.is_active ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Preis
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="€2.997"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Dauer
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="3 Tage"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Kapazität
                    </label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="20 Teilnehmer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Beschreibung
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Ausführliche Beschreibung"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Essenz / Kernbotschaft
                  </label>
                  <input
                    type="text"
                    value={formData.essence}
                    onChange={(e) => setFormData({ ...formData, essence: e.target.value })}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Die zentrale Botschaft"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Gradient (CSS)
                  </label>
                  <input
                    type="text"
                    value={formData.gradient}
                    onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="from-amber-500/10 via-orange-500/5"
                  />
                </div>

                {/* Bild Upload mit Drag & Drop */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Seminar-Bild
                  </label>

                  {formData.image ? (
                    <div className="relative">
                      <div className="w-full h-48 rounded-[12px] overflow-hidden bg-gray-100 mb-3">
                        <img
                          src={formData.image}
                          alt="Seminar Vorschau"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="https://..."
                        />
                        <button
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-[10px] transition-colors"
                        >
                          <X size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverUpload(true);
                      }}
                      onDragLeave={() => setDragOverUpload(false)}
                      onDrop={handleImageDrop}
                      className={`relative border-2 border-dashed rounded-[12px] p-8 transition-all ${
                        dragOverUpload
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-300 bg-gray-50 hover:border-amber-400'
                      }`}
                    >
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        {uploadingImage ? (
                          <>
                            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-3" />
                            <p className="text-[14px] text-gray-600 font-[500]">Bild wird hochgeladen...</p>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                              <Upload size={28} className="text-amber-600" strokeWidth={2} />
                            </div>
                            <p className="text-[15px] text-gray-900 font-[500] mb-1">
                              Bild hochladen
                            </p>
                            <p className="text-[13px] text-gray-500">
                              Datei hierher ziehen oder klicken zum Auswählen
                            </p>
                            <p className="text-[12px] text-gray-400 mt-2">
                              PNG, JPG, WEBP bis 5MB
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  )}
                </div>

                {/* Termine */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Termine
                  </label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    <input
                      type="text"
                      value={dateInput.month}
                      onChange={(e) => setDateInput({ ...dateInput, month: e.target.value })}
                      className="px-3 py-2 rounded-[8px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Monat"
                    />
                    <input
                      type="text"
                      value={dateInput.days}
                      onChange={(e) => setDateInput({ ...dateInput, days: e.target.value })}
                      className="px-3 py-2 rounded-[8px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Tage"
                    />
                    <input
                      type="text"
                      value={dateInput.location}
                      onChange={(e) => setDateInput({ ...dateInput, location: e.target.value })}
                      className="px-3 py-2 rounded-[8px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ort"
                    />
                    <input
                      type="number"
                      value={dateInput.available}
                      onChange={(e) => setDateInput({ ...dateInput, available: parseInt(e.target.value) || 0 })}
                      className="px-3 py-2 rounded-[8px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Plätze"
                    />
                    <button
                      onClick={addDate}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-[8px] text-[14px] font-[500] transition-colors"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.dates?.map((date, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-[8px] group">
                        <Calendar size={14} className="text-amber-600" strokeWidth={2} />
                        <span className="flex-1 text-[14px] text-gray-900">
                          {date.days} {date.month} - {date.location} ({date.available} Plätze)
                        </span>
                        <button
                          onClick={() => removeDate(index)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Includes */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Enthaltene Leistungen
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={includeInput}
                      onChange={(e) => setIncludeInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclude())}
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Leistung eingeben und Enter drücken"
                    />
                    <button
                      onClick={addInclude}
                      className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.includes?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-[8px] group">
                        <Check size={14} className="text-green-600" strokeWidth={2} />
                        <span className="flex-1 text-[14px] text-gray-900">{item}</span>
                        <button
                          onClick={() => removeInclude(index)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transformationen */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Transformationen
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={transformationInput.von}
                      onChange={(e) => setTransformationInput({ ...transformationInput, von: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Von..."
                    />
                    <input
                      type="text"
                      value={transformationInput.zu}
                      onChange={(e) => setTransformationInput({ ...transformationInput, zu: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Zu..."
                    />
                    <button
                      onClick={addTransformation}
                      className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.transformationen?.map((t, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-[8px] group">
                        <Sparkles size={14} className="text-amber-600" strokeWidth={2} />
                        <span className="flex-1 text-[14px] text-gray-900">
                          {t.von} → {t.zu}
                        </span>
                        <button
                          onClick={() => removeTransformation(index)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Programm-Module
                  </label>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={moduleInput.tag}
                      onChange={(e) => setModuleInput({ ...moduleInput, tag: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Tag (z.B. Tag 1)"
                    />
                    <input
                      type="text"
                      value={moduleInput.title}
                      onChange={(e) => setModuleInput({ ...moduleInput, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Titel"
                    />
                    <textarea
                      value={moduleInput.content}
                      onChange={(e) => setModuleInput({ ...moduleInput, content: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      placeholder="Inhalt"
                    />
                    <button
                      onClick={addModule}
                      className="w-full px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                    >
                      Modul hinzufügen
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.module?.map((mod, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-[8px] group">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-700 rounded text-[12px] font-[600]">
                              {mod.tag}
                            </span>
                            <span className="text-[14px] font-[600] text-gray-900">{mod.title}</span>
                          </div>
                          <button
                            onClick={() => removeModule(index)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                          >
                            <X size={16} strokeWidth={2} />
                          </button>
                        </div>
                        <p className="text-[13px] text-gray-600">{mod.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                {editingSeminar ? 'Änderungen speichern' : 'Seminar erstellen'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <ConfirmDialog
        isOpen={deleteSeminarId !== null}
        onClose={() => {
          setDeleteSeminarId(null);
          setDeleteSeminarTitle('');
        }}
        onConfirm={handleDeleteConfirm}
        title="Seminar löschen?"
        message={`Möchten Sie das Seminar "${deleteSeminarTitle}" wirklich unwiderruflich löschen?`}
        confirmText="Löschen"
        cancelText="Abbrechen"
        variant="danger"
        icon="trash"
      />
    </div>
  );
}
