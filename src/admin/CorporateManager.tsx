import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Search, X, Check,
  Briefcase, GripVertical, Upload, Star, Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmDialog from './ConfirmDialog';

interface Benefit {
  title: string;
  description: string;
}

interface CorporateOffer {
  id: string;
  category: 'workshop' | 'training-series' | 'team-retreat' | 'leadership' | 'transformation';
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  participants: string;
  format: string;
  availability: string;
  price: string;
  description: string;
  essence: string;
  includes: string[];
  benefits: Benefit[];
  ideal_for: string[];
  program_outline: string[];
  gradient: string;
  image: string;
  highlight: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const categoryConfig = {
  workshop: { label: 'Workshop', color: '#0ea5e9' },
  'training-series': { label: 'Training-Serie', color: '#f59e0b' },
  'team-retreat': { label: 'Team-Retreat', color: '#ec4899' },
  leadership: { label: 'Leadership', color: '#8b5cf6' },
  transformation: { label: 'Transformation', color: '#10b981' }
};

export default function CorporateManager() {
  const [offers, setOffers] = useState<CorporateOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<CorporateOffer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [draggedItem, setDraggedItem] = useState<CorporateOffer | null>(null);
  const [dragOverItem, setDragOverItem] = useState<CorporateOffer | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOverUpload, setDragOverUpload] = useState(false);
  const [deleteOfferId, setDeleteOfferId] = useState<string | null>(null);
  const [deleteOfferTitle, setDeleteOfferTitle] = useState<string>('');

  const emptyOffer: Partial<CorporateOffer> = {
    category: 'workshop',
    title: '',
    subtitle: '',
    tagline: '',
    duration: '',
    participants: '',
    format: '',
    availability: '',
    price: '',
    description: '',
    essence: '',
    includes: [],
    benefits: [],
    ideal_for: [],
    program_outline: [],
    gradient: 'from-blue-500/10 via-cyan-500/5 to-teal-500/5',
    image: '',
    highlight: false,
    is_active: true,
    order_index: 0
  };

  const [formData, setFormData] = useState<Partial<CorporateOffer>>(emptyOffer);
  const [includeInput, setIncludeInput] = useState('');
  const [idealForInput, setIdealForInput] = useState('');
  const [programInput, setProgramInput] = useState('');
  const [benefitInput, setBenefitInput] = useState<Partial<Benefit>>({
    title: '',
    description: ''
  });

  useEffect(() => {
    loadOffers();

    const offersChannel = supabase
      .channel('corporate-offers-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'corporate_offers' }, () => {
        loadOffers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(offersChannel);
    };
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('corporate_offers')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) {
      setOffers(data);
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
      if (!formData.title || !formData.category) {
        alert('Bitte füllen Sie mindestens Titel und Kategorie aus.');
        return;
      }

      if (editingOffer) {
        const { error } = await supabase
          .from('corporate_offers')
          .update({
            category: formData.category,
            title: formData.title,
            subtitle: formData.subtitle || '',
            tagline: formData.tagline || '',
            duration: formData.duration || '',
            participants: formData.participants || '',
            format: formData.format || '',
            availability: formData.availability || '',
            price: formData.price || '',
            description: formData.description || '',
            essence: formData.essence || '',
            includes: formData.includes || [],
            benefits: formData.benefits || [],
            ideal_for: formData.ideal_for || [],
            program_outline: formData.program_outline || [],
            gradient: formData.gradient || 'from-blue-500/10 via-cyan-500/5 to-teal-500/5',
            image: formData.image || '',
            highlight: formData.highlight || false,
            is_active: formData.is_active !== undefined ? formData.is_active : true,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingOffer.id);

        if (error) {
          console.error('Update error:', error);
          alert('Fehler beim Speichern: ' + error.message);
          return;
        }
      } else {
        const slug = generateSlug(formData.title);
        const maxOrderIndex = offers.length > 0
          ? Math.max(...offers.map(o => o.order_index))
          : 0;

        const { error } = await supabase
          .from('corporate_offers')
          .insert([{
            id: slug,
            category: formData.category,
            title: formData.title,
            subtitle: formData.subtitle || '',
            tagline: formData.tagline || '',
            duration: formData.duration || '',
            participants: formData.participants || '',
            format: formData.format || '',
            availability: formData.availability || '',
            price: formData.price || '',
            description: formData.description || '',
            essence: formData.essence || '',
            includes: formData.includes || [],
            benefits: formData.benefits || [],
            ideal_for: formData.ideal_for || [],
            program_outline: formData.program_outline || [],
            gradient: formData.gradient || 'from-blue-500/10 via-cyan-500/5 to-teal-500/5',
            image: formData.image || '',
            highlight: formData.highlight || false,
            is_active: formData.is_active !== undefined ? formData.is_active : true,
            order_index: maxOrderIndex + 1
          }]);

        if (error) {
          console.error('Insert error:', error);
          alert('Fehler beim Erstellen: ' + error.message);
          return;
        }
      }

      await loadOffers();
      setShowModal(false);
      setEditingOffer(null);
      setFormData(emptyOffer);
      alert('Corporate Angebot erfolgreich gespeichert!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  const handleEdit = (offer: CorporateOffer) => {
    setEditingOffer(offer);
    setFormData(offer);
    setShowModal(true);
  };

  const handleDelete = (id: string, title: string) => {
    setDeleteOfferId(id);
    setDeleteOfferTitle(title);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteOfferId) return;

    const { error } = await supabase
      .from('corporate_offers')
      .delete()
      .eq('id', deleteOfferId);

    if (error) {
      console.error('Delete error:', error);
      alert('Fehler beim Löschen');
    } else {
      setDeleteOfferId(null);
      setDeleteOfferTitle('');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('corporate_offers')
      .update({ is_active: !currentStatus })
      .eq('id', id);
  };

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

  const addIdealFor = () => {
    if (idealForInput.trim()) {
      setFormData({
        ...formData,
        ideal_for: [...(formData.ideal_for || []), idealForInput.trim()]
      });
      setIdealForInput('');
    }
  };

  const removeIdealFor = (index: number) => {
    setFormData({
      ...formData,
      ideal_for: formData.ideal_for?.filter((_, i) => i !== index) || []
    });
  };

  const addProgram = () => {
    if (programInput.trim()) {
      setFormData({
        ...formData,
        program_outline: [...(formData.program_outline || []), programInput.trim()]
      });
      setProgramInput('');
    }
  };

  const removeProgram = (index: number) => {
    setFormData({
      ...formData,
      program_outline: formData.program_outline?.filter((_, i) => i !== index) || []
    });
  };

  const addBenefit = () => {
    if (benefitInput.title && benefitInput.description) {
      setFormData({
        ...formData,
        benefits: [...(formData.benefits || []), benefitInput as Benefit]
      });
      setBenefitInput({ title: '', description: '' });
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits?.filter((_, i) => i !== index) || []
    });
  };

  const handleDragStart = (e: React.DragEvent, offer: CorporateOffer) => {
    setDraggedItem(offer);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, offer: CorporateOffer) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(offer);
  };

  const handleDragEnd = async () => {
    if (!draggedItem || !dragOverItem || draggedItem.id === dragOverItem.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = offers.findIndex(o => o.id === draggedItem.id);
    const dragOverIndex = offers.findIndex(o => o.id === dragOverItem.id);

    const newOffers = [...offers];
    const [removed] = newOffers.splice(draggedIndex, 1);
    newOffers.splice(dragOverIndex, 0, removed);

    const updates = newOffers.map((offer, index) => ({
      id: offer.id,
      order_index: index + 1
    }));

    setOffers(newOffers);

    for (const update of updates) {
      await supabase
        .from('corporate_offers')
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

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || offer.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div className="relative">
        <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-teal-400/10 rounded-[16px] sm:rounded-[24px] blur-xl" />
        <div className="relative bg-white p-5 sm:p-6 lg:p-8 rounded-[14px] sm:rounded-[22px] border border-gray-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-5 mb-5 sm:mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/20">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-gray-900">
                  Corporate Angebote
                </h2>
              </div>
              <p className="text-[14px] sm:text-[15px] text-gray-600 ml-[52px] sm:ml-[60px]">
                Verwalten Sie alle Unternehmensangebote
              </p>
            </div>
            <button
              onClick={() => {
                setEditingOffer(null);
                setFormData(emptyOffer);
                setShowModal(true);
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 whitespace-nowrap"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Neues Angebot</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Angebote durchsuchen..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-[14px] sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-400"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full sm:w-auto sm:min-w-[200px] px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-[14px] sm:text-[15px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all shadow-sm hover:border-blue-400"
            >
              <option value="all">Alle Kategorien</option>
              {Object.entries(categoryConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredOffers.map((offer) => {
          const color = categoryConfig[offer.category].color;
          const isDragging = draggedItem?.id === offer.id;
          const isDragOver = dragOverItem?.id === offer.id;

          return (
            <div
              key={offer.id}
              draggable
              onDragStart={(e) => handleDragStart(e, offer)}
              onDragOver={(e) => handleDragOver(e, offer)}
              onDragEnd={handleDragEnd}
              className={`group relative cursor-move ${
                isDragging ? 'opacity-50 scale-95' : ''
              } ${isDragOver ? 'scale-105' : ''}`}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-teal-400/20 rounded-[20px] sm:rounded-[24px] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

              <div className={`relative bg-white rounded-[18px] sm:rounded-[22px] border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${
                isDragOver ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}>
                <div className="relative h-44 sm:h-52 overflow-hidden"
                  style={{
                    backgroundImage: offer.image
                      ? `url(${offer.image})`
                      : `linear-gradient(135deg, ${color}20 0%, ${color}10 50%, ${color}05 100%)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />

                  {!offer.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 blur-2xl opacity-30" style={{ backgroundColor: color }} />
                        <Briefcase
                          size={56}
                          strokeWidth={1.5}
                          style={{ color }}
                          className="relative transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleActive(offer.id, offer.is_active)}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 hover:scale-110 transition-all"
                    >
                      {offer.is_active ? <Eye size={16} strokeWidth={2.5} /> : <EyeOff size={16} strokeWidth={2.5} />}
                    </button>
                  </div>

                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-lg bg-white/95 backdrop-blur-md shadow-lg cursor-grab active:cursor-grabbing">
                      <GripVertical size={16} className="text-gray-600" strokeWidth={2.5} />
                    </div>
                  </div>

                  {offer.highlight && (
                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2">
                      <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg">
                        <span className="text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                          Beliebt
                        </span>
                      </div>
                    </div>
                  )}

                  {!offer.is_active && (
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/95 rounded-xl shadow-lg">
                        <span className="text-[12px] sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider">
                          Inaktiv
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent" />
                </div>

                <div className="relative p-4 sm:p-5 lg:p-6">
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
                      {categoryConfig[offer.category].label}
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold bg-gradient-to-br from-gray-100 to-gray-50 text-gray-700 border border-gray-200/60 shadow-sm">
                      {offer.subtitle}
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[19px] lg:text-[20px] font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {offer.title}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-gray-600 mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                    {offer.tagline}
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] sm:text-[20px] font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {offer.price}
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[12px] sm:text-[13px] font-medium text-gray-600">
                      {offer.participants}
                    </span>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-900 rounded-xl text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-md border border-gray-200/60"
                    >
                      <Edit2 size={15} strokeWidth={2.5} />
                      <span className="hidden sm:inline">Bearbeiten</span>
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id, offer.title)}
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
            <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[22px] sm:text-[24px] font-[600] text-gray-900">
                  {editingOffer ? 'Angebot bearbeiten' : 'Neues Angebot'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 sm:py-6">
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Titel *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="z.B. Team-Workshop Halbtag"
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
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="z.B. Fokussierte Team-Intervention"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="z.B. Klarheit und Kraft in 4 Stunden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Kategorie *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {Object.entries(categoryConfig).map(([key, config]) => (
                        <option key={key} value={key}>{config.label}</option>
                      ))}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Preis
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ab €2.497"
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
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="4 Stunden"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Teilnehmer
                    </label>
                    <input
                      type="text"
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Bis 15 Personen"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Format
                    </label>
                    <input
                      type="text"
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Präsenz oder Online"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Verfügbarkeit
                  </label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Innerhalb 14 Tagen"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Beschreibung
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="from-blue-500/10 via-cyan-500/5"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Highlight
                  </label>
                  <button
                    onClick={() => setFormData({ ...formData, highlight: !formData.highlight })}
                    className={`w-full px-4 py-3 rounded-[10px] text-[15px] font-[500] flex items-center justify-center gap-2 transition-colors ${
                      formData.highlight
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Star size={16} />
                    {formData.highlight ? 'Hervorgehoben' : 'Normal'}
                  </button>
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Angebots-Bild
                  </label>

                  {formData.image ? (
                    <div className="relative">
                      <div className="w-full h-48 rounded-[12px] overflow-hidden bg-gray-100 mb-3">
                        <img
                          src={formData.image}
                          alt="Angebot Vorschau"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 bg-gray-50 hover:border-blue-400'
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
                            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-3" />
                            <p className="text-[14px] text-gray-600 font-[500]">Bild wird hochgeladen...</p>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                              <Upload size={28} className="text-blue-600" strokeWidth={2} />
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
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Leistung eingeben und Enter drücken"
                    />
                    <button
                      onClick={addInclude}
                      className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
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

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Vorteile (Benefits)
                  </label>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={benefitInput.title}
                      onChange={(e) => setBenefitInput({ ...benefitInput, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Benefit Titel"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={benefitInput.description}
                        onChange={(e) => setBenefitInput({ ...benefitInput, description: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Benefit Beschreibung"
                      />
                      <button
                        onClick={addBenefit}
                        className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                      >
                        <Plus size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {formData.benefits?.map((benefit, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-[8px] group">
                        <div className="flex items-start gap-2">
                          <Star size={14} className="text-blue-600 mt-1 flex-shrink-0" strokeWidth={2} />
                          <div className="flex-1 min-w-0">
                            <div className="font-[600] text-[14px] text-gray-900">{benefit.title}</div>
                            <div className="text-[13px] text-gray-600 mt-1">{benefit.description}</div>
                          </div>
                          <button
                            onClick={() => removeBenefit(index)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all flex-shrink-0"
                          >
                            <X size={16} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Ideal für
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={idealForInput}
                      onChange={(e) => setIdealForInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIdealFor())}
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Eingeben und Enter drücken"
                    />
                    <button
                      onClick={addIdealFor}
                      className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.ideal_for?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-[8px] group">
                        <Check size={14} className="text-blue-600" strokeWidth={2} />
                        <span className="flex-1 text-[14px] text-gray-900">{item}</span>
                        <button
                          onClick={() => removeIdealFor(index)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Programm-Übersicht
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={programInput}
                      onChange={(e) => setProgramInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProgram())}
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Programmpunkt eingeben und Enter drücken"
                    />
                    <button
                      onClick={addProgram}
                      className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.program_outline?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-[8px] group">
                        <Check size={14} className="text-blue-600" strokeWidth={2} />
                        <span className="flex-1 text-[14px] text-gray-900">{item}</span>
                        <button
                          onClick={() => removeProgram(index)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-5 sm:py-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                {editingOffer ? 'Änderungen speichern' : 'Angebot erstellen'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <ConfirmDialog
        isOpen={deleteOfferId !== null}
        onClose={() => {
          setDeleteOfferId(null);
          setDeleteOfferTitle('');
        }}
        onConfirm={handleDeleteConfirm}
        title="Corporate Angebot löschen?"
        message={`Möchten Sie das Angebot "${deleteOfferTitle}" wirklich unwiderruflich löschen?`}
        confirmText="Löschen"
        cancelText="Abbrechen"
        variant="danger"
        icon="trash"
      />
    </div>
  );
}
