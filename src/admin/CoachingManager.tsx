import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Search, X, Check,
  Users, Video, MapPin, Star, Sparkles, GripVertical, Upload, Image as ImageIcon, Crown
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmDialog from './ConfirmDialog';

type TierType = 'einzelsession' | 'intensiv' | 'vip' | 'executive';

interface Benefit {
  title: string;
  description: string;
}

interface CoachingPackage {
  id: string;
  tier: TierType;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  price: string;
  sessions: string;
  format: string;
  availability: string;
  description: string;
  essence: string;
  includes: string[];
  benefits: Benefit[];
  perfect_for: string[];
  gradient: string;
  image: string;
  highlight: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const tierConfig = {
  einzelsession: { label: 'Einzelsession', color: '#0ea5e9', icon: Video },
  intensiv: { label: 'Intensiv', color: '#f59e0b', icon: Star },
  vip: { label: 'VIP', color: '#ec4899', icon: Crown },
  executive: { label: 'Executive', color: '#8b5cf6', icon: Users }
};

export default function CoachingManager() {
  const [packages, setPackages] = useState<CoachingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<CoachingPackage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [draggedItem, setDraggedItem] = useState<CoachingPackage | null>(null);
  const [dragOverItem, setDragOverItem] = useState<CoachingPackage | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOverUpload, setDragOverUpload] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState<string | null>(null);
  const [deletePackageTitle, setDeletePackageTitle] = useState<string>('');

  const emptyPackage: Partial<CoachingPackage> = {
    tier: 'einzelsession',
    title: '',
    subtitle: '',
    tagline: '',
    duration: '',
    price: '',
    sessions: '',
    format: '',
    availability: '',
    description: '',
    essence: '',
    includes: [],
    benefits: [],
    perfect_for: [],
    gradient: 'from-sky-500/10 via-cyan-500/5 to-blue-500/5',
    image: '',
    highlight: false,
    is_active: true,
    order_index: 0
  };

  const [formData, setFormData] = useState<Partial<CoachingPackage>>(emptyPackage);

  const [includeInput, setIncludeInput] = useState('');
  const [perfectForInput, setPerfectForInput] = useState('');
  const [benefitInput, setBenefitInput] = useState<Partial<Benefit>>({
    title: '',
    description: ''
  });

  useEffect(() => {
    loadPackages();

    const packagesChannel = supabase
      .channel('coaching-packages-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coaching_packages' }, () => {
        loadPackages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(packagesChannel);
    };
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('coaching_packages')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) {
      setPackages(data);
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
      if (!formData.title || !formData.tier) {
        alert('Bitte füllen Sie mindestens Titel und Tier aus.');
        return;
      }

      if (editingPackage) {
        const { error } = await supabase
          .from('coaching_packages')
          .update({
            tier: formData.tier,
            title: formData.title,
            subtitle: formData.subtitle || '',
            tagline: formData.tagline || '',
            duration: formData.duration || '',
            price: formData.price || '',
            sessions: formData.sessions || '',
            format: formData.format || '',
            availability: formData.availability || '',
            description: formData.description || '',
            essence: formData.essence || '',
            includes: formData.includes || [],
            benefits: formData.benefits || [],
            perfect_for: formData.perfect_for || [],
            gradient: formData.gradient || 'from-sky-500/10 via-cyan-500/5 to-blue-500/5',
            image: formData.image || '',
            highlight: formData.highlight || false,
            is_active: formData.is_active !== undefined ? formData.is_active : true,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPackage.id);

        if (error) {
          console.error('Update error:', error);
          alert('Fehler beim Speichern: ' + error.message);
          return;
        }
      } else {
        const slug = generateSlug(formData.title);
        const maxOrderIndex = packages.length > 0
          ? Math.max(...packages.map(p => p.order_index))
          : 0;

        const { error } = await supabase
          .from('coaching_packages')
          .insert([{
            id: slug,
            tier: formData.tier,
            title: formData.title,
            subtitle: formData.subtitle || '',
            tagline: formData.tagline || '',
            duration: formData.duration || '',
            price: formData.price || '',
            sessions: formData.sessions || '',
            format: formData.format || '',
            availability: formData.availability || '',
            description: formData.description || '',
            essence: formData.essence || '',
            includes: formData.includes || [],
            benefits: formData.benefits || [],
            perfect_for: formData.perfect_for || [],
            gradient: formData.gradient || 'from-sky-500/10 via-cyan-500/5 to-blue-500/5',
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

      await loadPackages();
      setShowModal(false);
      setEditingPackage(null);
      setFormData(emptyPackage);
      alert('Coaching-Paket erfolgreich gespeichert!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  const handleEdit = (pkg: CoachingPackage) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setShowModal(true);
  };

  const handleDelete = (id: string, title: string) => {
    setDeletePackageId(id);
    setDeletePackageTitle(title);
  };

  const handleDeleteConfirm = async () => {
    if (!deletePackageId) return;

    const { error } = await supabase
      .from('coaching_packages')
      .delete()
      .eq('id', deletePackageId);

    if (error) {
      console.error('Delete error:', error);
      alert('Fehler beim Löschen');
    } else {
      setDeletePackageId(null);
      setDeletePackageTitle('');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('coaching_packages')
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

  const addPerfectFor = () => {
    if (perfectForInput.trim()) {
      setFormData({
        ...formData,
        perfect_for: [...(formData.perfect_for || []), perfectForInput.trim()]
      });
      setPerfectForInput('');
    }
  };

  const removePerfectFor = (index: number) => {
    setFormData({
      ...formData,
      perfect_for: formData.perfect_for?.filter((_, i) => i !== index) || []
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

  const handleDragStart = (e: React.DragEvent, pkg: CoachingPackage) => {
    setDraggedItem(pkg);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, pkg: CoachingPackage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(pkg);
  };

  const handleDragEnd = async () => {
    if (!draggedItem || !dragOverItem || draggedItem.id === dragOverItem.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = packages.findIndex(p => p.id === draggedItem.id);
    const dragOverIndex = packages.findIndex(p => p.id === dragOverItem.id);

    const newPackages = [...packages];
    const [removed] = newPackages.splice(draggedIndex, 1);
    newPackages.splice(dragOverIndex, 0, removed);

    const updates = newPackages.map((pkg, index) => ({
      id: pkg.id,
      order_index: index + 1
    }));

    setPackages(newPackages);

    for (const update of updates) {
      await supabase
        .from('coaching_packages')
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

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'all' || pkg.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute -inset-[1px] bg-gradient-to-br from-sky-400/10 via-cyan-400/10 to-blue-400/10 rounded-[16px] sm:rounded-[24px] blur-xl" />
        <div className="relative bg-white p-5 sm:p-6 lg:p-8 rounded-[14px] sm:rounded-[22px] border border-gray-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-5 mb-5 sm:mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl shadow-lg shadow-sky-500/20">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-gray-900">
                  Coaching-Pakete
                </h2>
              </div>
              <p className="text-[14px] sm:text-[15px] text-gray-600 ml-[52px] sm:ml-[60px]">
                Verwalten Sie alle Coaching-Angebote
              </p>
            </div>
            <button
              onClick={() => {
                setEditingPackage(null);
                setFormData(emptyPackage);
                setShowModal(true);
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-br from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white rounded-xl text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 whitespace-nowrap"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Neues Paket</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Coaching-Pakete durchsuchen..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-[14px] sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:border-sky-400"
              />
            </div>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full sm:w-auto sm:min-w-[200px] px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-[14px] sm:text-[15px] font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 cursor-pointer transition-all shadow-sm hover:border-sky-400"
            >
              <option value="all">Alle Tiers</option>
              <option value="einzelsession">Einzelsession</option>
              <option value="intensiv">Intensiv</option>
              <option value="vip">VIP</option>
              <option value="executive">Executive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPackages.map((pkg) => {
          const Icon = tierConfig[pkg.tier].icon;
          const color = tierConfig[pkg.tier].color;
          const isDragging = draggedItem?.id === pkg.id;
          const isDragOver = dragOverItem?.id === pkg.id;

          return (
            <div
              key={pkg.id}
              draggable
              onDragStart={(e) => handleDragStart(e, pkg)}
              onDragOver={(e) => handleDragOver(e, pkg)}
              onDragEnd={handleDragEnd}
              className={`group relative cursor-move ${
                isDragging ? 'opacity-50 scale-95' : ''
              } ${isDragOver ? 'scale-105' : ''}`}
            >
              {/* Outer glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-sky-400/20 via-cyan-400/20 to-blue-400/20 rounded-[20px] sm:rounded-[24px] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

              {/* Card */}
              <div className={`relative bg-white rounded-[18px] sm:rounded-[22px] border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${
                isDragOver ? 'ring-2 ring-sky-500 shadow-xl' : ''
              }`}>
                {/* Image/Icon Section */}
                <div className="relative h-44 sm:h-52 overflow-hidden"
                  style={{
                    backgroundImage: pkg.image
                      ? `url(${pkg.image})`
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
                      onClick={() => toggleActive(pkg.id, pkg.is_active)}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 hover:scale-110 transition-all"
                    >
                      {pkg.is_active ? <Eye size={16} strokeWidth={2.5} /> : <EyeOff size={16} strokeWidth={2.5} />}
                    </button>
                  </div>

                  {/* Drag handle */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-lg bg-white/95 backdrop-blur-md shadow-lg cursor-grab active:cursor-grabbing">
                      <GripVertical size={16} className="text-gray-600" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Highlight badge */}
                  {pkg.highlight && (
                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2">
                      <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg">
                        <span className="text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                          Beliebt
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Inactive overlay */}
                  {!pkg.is_active && (
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
                  {/* Tier & Subtitle badges */}
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
                      {tierConfig[pkg.tier].label}
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold bg-gradient-to-br from-gray-100 to-gray-50 text-gray-700 border border-gray-200/60 shadow-sm">
                      {pkg.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] sm:text-[19px] lg:text-[20px] font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {pkg.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[13px] sm:text-[14px] text-gray-600 mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  {/* Price & Sessions */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] sm:text-[20px] font-bold bg-gradient-to-br from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                        {pkg.price}
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[12px] sm:text-[13px] font-medium text-gray-600">
                      {pkg.sessions}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-900 rounded-xl text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-md border border-gray-200/60"
                    >
                      <Edit2 size={15} strokeWidth={2.5} />
                      <span className="hidden sm:inline">Bearbeiten</span>
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id, pkg.title)}
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
          padding: '1rem',
          overflow: 'auto'
        }}>
          <div className="bg-white rounded-[24px] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8" style={{ margin: 'auto' }}>
            <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[22px] sm:text-[24px] font-[600] text-gray-900">
                  {editingPackage ? 'Paket bearbeiten' : 'Neues Paket'}
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
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Titel *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="z.B. Einzelsession 60 Min"
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
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="z.B. Intensive 1-zu-1 Begleitung"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="z.B. Dein Durchbruch beginnt jetzt"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Tier *
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value as TierType })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                    >
                      <option value="einzelsession">Einzelsession</option>
                      <option value="intensiv">Intensiv</option>
                      <option value="vip">VIP</option>
                      <option value="executive">Executive</option>
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
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="€497"
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
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="60 Minuten"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Sessions
                    </label>
                    <input
                      type="text"
                      value={formData.sessions}
                      onChange={(e) => setFormData({ ...formData, sessions: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="1 Session"
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
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Video oder Präsenz"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Innerhalb 7 Tagen"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="from-sky-500/10 via-cyan-500/5"
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

                {/* Bild Upload */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Paket-Bild
                  </label>

                  {formData.image ? (
                    <div className="relative">
                      <div className="w-full h-48 rounded-[12px] overflow-hidden bg-gray-100 mb-3">
                        <img
                          src={formData.image}
                          alt="Paket Vorschau"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                          ? 'border-sky-500 bg-sky-50'
                          : 'border-gray-300 bg-gray-50 hover:border-sky-400'
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
                            <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mb-3" />
                            <p className="text-[14px] text-gray-600 font-[500]">Bild wird hochgeladen...</p>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-4">
                              <Upload size={28} className="text-sky-600" strokeWidth={2} />
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
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Leistung eingeben und Enter drücken"
                    />
                    <button
                      onClick={addInclude}
                      className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
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

                {/* Benefits */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Vorteile (Benefits)
                  </label>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={benefitInput.title}
                      onChange={(e) => setBenefitInput({ ...benefitInput, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Benefit Titel"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={benefitInput.description}
                        onChange={(e) => setBenefitInput({ ...benefitInput, description: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Benefit Beschreibung"
                      />
                      <button
                        onClick={addBenefit}
                        className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                      >
                        <Plus size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {formData.benefits?.map((benefit, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-[8px] group">
                        <div className="flex items-start gap-2">
                          <Star size={14} className="text-sky-600 mt-1 flex-shrink-0" strokeWidth={2} />
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

                {/* Perfect For */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Perfekt für
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={perfectForInput}
                      onChange={(e) => setPerfectForInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPerfectFor())}
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Eingeben und Enter drücken"
                    />
                    <button
                      onClick={addPerfectFor}
                      className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.perfect_for?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-[8px] group">
                        <Check size={14} className="text-sky-600" strokeWidth={2} />
                        <span className="flex-1 text-[14px] text-gray-900">{item}</span>
                        <button
                          onClick={() => removePerfectFor(index)}
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
                className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                {editingPackage ? 'Änderungen speichern' : 'Paket erstellen'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <ConfirmDialog
        isOpen={deletePackageId !== null}
        onClose={() => {
          setDeletePackageId(null);
          setDeletePackageTitle('');
        }}
        onConfirm={handleDeleteConfirm}
        title="Coaching-Paket löschen?"
        message={`Möchten Sie das Paket "${deletePackageTitle}" wirklich unwiderruflich löschen?`}
        confirmText="Löschen"
        cancelText="Abbrechen"
        variant="danger"
        icon="trash"
      />
    </div>
  );
}
