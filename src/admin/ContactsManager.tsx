import { useState, useEffect } from 'react';
import { Mail, Phone, Building2, Calendar, Eye, Trash2, X, Check, AlertCircle, Flag, MessageCircle, User, Filter, Search, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactInquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiry_type: string;
  status: string;
  priority: string;
  notes: string;
  replied_at: string | null;
  created_at: string;
  is_read: boolean;
}

export default function ContactsManager() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<ContactInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadInquiries();

    const channel = supabase
      .channel('contact_inquiries_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_inquiries' }, () => {
        loadInquiries();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterInquiriesData();
  }, [inquiries, filterStatus, filterType, searchQuery]);

  const loadInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setInquiries(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading inquiries:', error);
      setLoading(false);
    }
  };

  const filterInquiriesData = () => {
    let filtered = [...inquiries];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(inq => inq.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(inq => inq.inquiry_type === filterType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(inq =>
        inq.first_name.toLowerCase().includes(query) ||
        inq.last_name.toLowerCase().includes(query) ||
        inq.email.toLowerCase().includes(query) ||
        inq.company.toLowerCase().includes(query) ||
        inq.subject.toLowerCase().includes(query) ||
        inq.message.toLowerCase().includes(query)
      );
    }

    setFilteredInquiries(filtered);
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const updates: any = { status };
      if (status === 'replied') {
        updates.replied_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('contact_inquiries')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      loadInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateInquiryPriority = async (id: string, priority: string) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ priority })
        .eq('id', id);

      if (error) throw error;
      loadInquiries();
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const saveNotes = async () => {
    if (!selectedInquiry) return;

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ notes })
        .eq('id', selectedInquiry.id);

      if (error) throw error;
      alert('Notizen gespeichert!');
      loadInquiries();
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Fehler beim Speichern der Notizen');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Möchten Sie diese Anfrage wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSelectedInquiry(null);
      loadInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const markAsRead = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ is_read: isRead })
        .eq('id', id);

      if (error) throw error;

      setInquiries(prev => prev.map(inq =>
        inq.id === id ? { ...inq, is_read: isRead } : inq
      ));
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const openInquiry = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setNotes(inquiry.notes);
    if (!inquiry.is_read) {
      markAsRead(inquiry.id, true);
    }
    if (inquiry.status === 'new') {
      updateInquiryStatus(inquiry.id, 'read');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Neu', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      read: { label: 'Gelesen', color: 'bg-yellow-100 text-yellow-800', icon: Eye },
      replied: { label: 'Beantwortet', color: 'bg-green-100 text-green-800', icon: Check },
      closed: { label: 'Geschlossen', color: 'bg-gray-100 text-gray-800', icon: X }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Niedrig', color: 'text-gray-500' },
      medium: { label: 'Mittel', color: 'text-blue-500' },
      high: { label: 'Hoch', color: 'text-orange-500' },
      urgent: { label: 'Dringend', color: 'text-red-500' }
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;

    return (
      <span className={`inline-flex items-center gap-1 ${config.color}`}>
        <Flag size={14} fill="currentColor" />
        <span className="text-xs font-medium">{config.label}</span>
      </span>
    );
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      coaching: 'Coaching',
      seminar: 'Seminar',
      corporate: 'Corporate',
      keynote: 'Keynote',
      shop: 'Shop',
      general: 'Allgemein'
    };
    return types[type] || type;
  };

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    read: inquiries.filter(i => i.status === 'read').length,
    replied: inquiries.filter(i => i.status === 'replied').length
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Kontaktanfragen</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Verwalten Sie alle eingehenden Anfragen</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gesamt</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <MessageCircle className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Neu</p>
              <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <AlertCircle className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gelesen</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.read}</p>
            </div>
            <Eye className="text-yellow-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Beantwortet</p>
              <p className="text-3xl font-bold text-green-600">{stats.replied}</p>
            </div>
            <Check className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Alle Status</option>
            <option value="new">Neu</option>
            <option value="read">Gelesen</option>
            <option value="replied">Beantwortet</option>
            <option value="closed">Geschlossen</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Alle Typen</option>
            <option value="coaching">Coaching</option>
            <option value="seminar">Seminar</option>
            <option value="corporate">Corporate</option>
            <option value="keynote">Keynote</option>
            <option value="shop">Shop</option>
            <option value="general">Allgemein</option>
          </select>

          <div className="w-full sm:flex-1 sm:min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suche nach Name, E-Mail, Firma..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Keine Anfragen gefunden</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontakt
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Betreff
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priorität
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      inquiry.status === 'new' ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => openInquiry(inquiry)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 font-medium text-gray-900">
                          <User size={16} className="text-gray-400" />
                          {inquiry.first_name} {inquiry.last_name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Mail size={14} />
                          {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Phone size={14} />
                            {inquiry.phone}
                          </div>
                        )}
                        {inquiry.company && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Building2 size={14} />
                            {inquiry.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="font-medium text-gray-900 line-clamp-1">{inquiry.subject}</p>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{inquiry.message}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                        {getTypeLabel(inquiry.inquiry_type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(inquiry.status)}
                    </td>
                    <td className="px-6 py-4">
                      {getPriorityBadge(inquiry.priority)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        {new Date(inquiry.created_at).toLocaleDateString('de-DE')}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(inquiry.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(inquiry.id, !inquiry.is_read);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            inquiry.is_read
                              ? 'text-green-600 hover:bg-green-50'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={inquiry.is_read ? 'Als ungelesen markieren' : 'Als gelesen markieren'}
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openInquiry(inquiry);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedInquiry && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
              <div className="flex-1 min-w-0 pr-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">Anfrage Details</h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date(selectedInquiry.created_at).toLocaleDateString('de-DE')} um{' '}
                  {new Date(selectedInquiry.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Schließen"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateInquiryStatus(selectedInquiry.id, e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="new">Neu</option>
                    <option value="read">Gelesen</option>
                    <option value="replied">Beantwortet</option>
                    <option value="closed">Geschlossen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Priorität</label>
                  <select
                    value={selectedInquiry.priority}
                    onChange={(e) => updateInquiryPriority(selectedInquiry.id, e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Niedrig</option>
                    <option value="medium">Mittel</option>
                    <option value="high">Hoch</option>
                    <option value="urgent">Dringend</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Kontaktinformationen</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <User size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-900 text-xs break-words">{selectedInquiry.first_name} {selectedInquiry.last_name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">E-Mail</p>
                      <a href={`mailto:${selectedInquiry.email}`} className="font-medium text-blue-600 hover:underline text-xs break-all">
                        {selectedInquiry.email}
                      </a>
                    </div>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Telefon</p>
                        <a href={`tel:${selectedInquiry.phone}`} className="font-medium text-blue-600 hover:underline text-xs break-words">
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {selectedInquiry.company && (
                    <div className="flex items-start gap-2">
                      <Building2 size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Unternehmen</p>
                        <p className="font-medium text-gray-900 text-xs break-words">{selectedInquiry.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Typ</label>
                <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-800 font-medium inline-block text-xs">
                  {getTypeLabel(selectedInquiry.inquiry_type)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Betreff</label>
                <p className="text-gray-900 font-medium text-sm break-words">{selectedInquiry.subject}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Nachricht</label>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-900 text-xs whitespace-pre-wrap leading-relaxed break-words">{selectedInquiry.message}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Interne Notizen</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Fügen Sie interne Notizen hinzu..."
                />
                <button
                  onClick={saveNotes}
                  className="mt-2 px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Notizen speichern
                </button>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Mail size={14} />
                  E-Mail
                </a>
                <button
                  onClick={() => deleteInquiry(selectedInquiry.id)}
                  className="px-3 py-2 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 size={14} />
                  Löschen
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-3 py-2 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
