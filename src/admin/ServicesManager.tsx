import { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, Search,
  Presentation, Users, Briefcase, Calendar, Building, X, Check
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  title: string;
  description: string;
  short_description: string;
  category: 'keynote' | 'workshop' | 'coaching' | 'event' | 'corporate';
  price: string;
  duration: string;
  max_participants: number;
  features: string[];
  image_url: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const categoryIcons = {
  keynote: Presentation,
  workshop: Users,
  coaching: Briefcase,
  event: Calendar,
  corporate: Building
};

const categoryColors = {
  keynote: '#0066CC',
  workshop: '#34C759',
  coaching: '#5856D6',
  event: '#FF9500',
  corporate: '#FF3B30'
};

const categoryLabels = {
  keynote: 'Keynote-Vortrag',
  workshop: 'Workshop',
  coaching: 'Coaching',
  event: 'Event',
  corporate: 'Corporate Training'
};

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const emptyService: Partial<Service> = {
    title: '',
    description: '',
    short_description: '',
    category: 'keynote',
    price: '',
    duration: '',
    max_participants: 0,
    features: [],
    image_url: '',
    is_active: true,
    order_index: 0
  };

  const [formData, setFormData] = useState<Partial<Service>>(emptyService);
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    loadServices();

    const servicesChannel = supabase
      .channel('services-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
        loadServices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(servicesChannel);
    };
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) {
      setServices(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingService) {
      await supabase
        .from('services')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingService.id);
    } else {
      await supabase
        .from('services')
        .insert([formData]);
    }

    setShowModal(false);
    setEditingService(null);
    setFormData(emptyService);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Möchten Sie diesen Service wirklich löschen?')) {
      await supabase
        .from('services')
        .delete()
        .eq('id', id);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('services')
      .update({ is_active: !currentStatus })
      .eq('id', id);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || []
    });
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header with integrated search and filters */}
      <div className="bg-white p-6 rounded-[20px] border border-gray-200/60">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-[28px] font-[600] text-gray-900">Services & Produkte</h2>
            <p className="text-[15px] text-gray-600 mt-1">Verwalten Sie alle Angebote auf der Website</p>
          </div>
          <button
            onClick={() => {
              setEditingService(null);
              setFormData(emptyService);
              setShowModal(true);
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] text-[14px] font-[500] flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Plus size={16} strokeWidth={2} />
            Neuer Service
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Services durchsuchen..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[14px] font-[500] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[180px]"
          >
            <option value="all">Alle Kategorien</option>
            <option value="keynote">Keynotes</option>
            <option value="workshop">Workshops</option>
            <option value="coaching">Coaching</option>
            <option value="event">Events</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => {
          const Icon = categoryIcons[service.category];
          const color = categoryColors[service.category];

          return (
            <div
              key={service.id}
              className="bg-white rounded-[20px] border border-gray-200/60 overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Image/Icon */}
              <div className="h-48 bg-gradient-to-br relative"
                style={{
                  backgroundImage: service.image_url
                    ? `url(${service.image_url})`
                    : `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon size={48} strokeWidth={1.5} style={{ color }} />
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => toggleActive(service.id, service.is_active)}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {service.is_active ? <Eye size={16} strokeWidth={2} /> : <EyeOff size={16} strokeWidth={2} />}
                  </button>
                </div>
                {!service.is_active && (
                  <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/90 rounded-[10px] text-[13px] font-[600] text-gray-900">
                      Inaktiv
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-[6px] text-[11px] font-[600] uppercase tracking-wider"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {categoryLabels[service.category]}
                  </span>
                </div>

                <h3 className="text-[18px] font-[600] text-gray-900 mb-2 line-clamp-2">
                  {service.title}
                </h3>
                <p className="text-[14px] text-gray-600 mb-4 line-clamp-2">
                  {service.short_description}
                </p>

                <div className="flex items-center gap-4 text-[13px] text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <span className="font-[600] text-gray-900">{service.price}</span>
                  <span>•</span>
                  <span>{service.duration}</span>
                  {service.max_participants > 0 && (
                    <>
                      <span>•</span>
                      <span>bis {service.max_participants} TN</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[8px] text-[13px] font-[500] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit2 size={14} strokeWidth={2} />
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-[8px] text-[13px] font-[500] flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[24px] max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-[600] text-gray-900">
                  {editingService ? 'Service bearbeiten' : 'Neuer Service'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Titel *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="z.B. Keynote-Vortrag"
                  />
                </div>

                {/* Category & Active Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Kategorie *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="keynote">Keynote-Vortrag</option>
                      <option value="workshop">Workshop</option>
                      <option value="coaching">Coaching</option>
                      <option value="event">Event</option>
                      <option value="corporate">Corporate Training</option>
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

                {/* Short Description */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Kurzbeschreibung
                  </label>
                  <input
                    type="text"
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kurzer Teaser-Text"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Beschreibung
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Ausführliche Beschreibung des Services"
                  />
                </div>

                {/* Price, Duration, Max Participants */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Preis
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ab €5.000"
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
                      placeholder="45-90 Min"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                      Max. TN
                    </label>
                    <input
                      type="number"
                      value={formData.max_participants}
                      onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Bild URL
                  </label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-gray-700 text-[14px] font-[500] mb-2">
                    Features / Leistungen
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-1 px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-900 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Feature eingeben und Enter drücken"
                    />
                    <button
                      onClick={addFeature}
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-[8px] group">
                        <Check size={14} className="text-green-600" strokeWidth={2} />
                        <span className="flex-1 text-[14px] text-gray-900">{feature}</span>
                        <button
                          onClick={() => removeFeature(index)}
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

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                {editingService ? 'Änderungen speichern' : 'Service erstellen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
