import { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock,
  User, Mail, Phone, Building, DollarSign, X, Ban, Trash2, Plus,
  Presentation, Users, Briefcase, CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Booking {
  id: string;
  service_type: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company: string;
  event_date: string;
  event_time: string;
  duration_hours: number;
  budget: string;
  created_at: string;
}

interface BlockedSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  reason?: string;
}

interface TimeSelection {
  date: Date;
  startHour: number;
  endHour: number;
  dayIndex: number;
}

interface Service {
  id: string;
  title: string;
  category: string;
  price: string;
  duration: string;
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);
const DAYS_OF_WEEK = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const categoryColors: Record<string, string> = {
  'Keynote-Vortrag': '#0066CC',
  'Workshop': '#34C759',
  'Executive Coaching': '#5856D6',
  'Event Tickets': '#FF9500',
  'Corporate Training': '#FF3B30',
  'default': '#6B7280'
};

const serviceIcons: Record<string, any> = {
  'Keynote-Vortrag': Presentation,
  'Workshop': Users,
  'Executive Coaching': Briefcase,
  'Event Tickets': CalendarIcon,
  'Corporate Training': Building
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ date: Date; hour: number; dayIndex: number } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ date: Date; hour: number; dayIndex: number } | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSelection | null>(null);
  const [modalStep, setModalStep] = useState<'choice' | 'create-appointment' | 'block-time'>('choice');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    company: '',
    budget: ''
  });

  useEffect(() => {
    loadBookings();
    loadBlockedSlots();
    loadServices();

    const bookingsChannel = supabase
      .channel('bookings-calendar')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        loadBookings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
    };
  }, [currentDate]);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, title, category, price, duration')
      .eq('is_active', true)
      .order('order_index');

    if (data) {
      setServices(data);
    }
  };

  const loadBookings = async () => {
    const weekStart = getWeekStart(currentDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const { data } = await supabase
      .from('bookings')
      .select('*')
      .gte('event_date', weekStart.toISOString().split('T')[0])
      .lte('event_date', weekEnd.toISOString().split('T')[0])
      .in('status', ['confirmed', 'pending']);

    if (data) {
      setBookings(data);
    }
  };

  const loadBlockedSlots = async () => {
    const weekStart = getWeekStart(currentDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const { data } = await supabase
      .from('blocked_time_slots')
      .select('*')
      .gte('date', weekStart.toISOString().split('T')[0])
      .lte('date', weekEnd.toISOString().split('T')[0]);

    if (data) {
      setBlockedSlots(data);
    }
  };

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getWeekDates = () => {
    const start = getWeekStart(currentDate);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatWeekRange = () => {
    const weekDates = getWeekDates();
    const start = weekDates[0];
    const end = weekDates[6];
    return `${start.getDate()}. ${start.toLocaleDateString('de-DE', { month: 'long' })} - ${end.getDate()}. ${end.toLocaleDateString('de-DE', { month: 'long' })} ${end.getFullYear()}`;
  };

  const getBookingsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(b => b.event_date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getEventPosition = (timeStr: string, duration: number) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const startMinutes = (hours - 8) * 60 + minutes;
    const top = (startMinutes / 60) * 50;
    const height = (duration * 50);
    return { top, height };
  };

  const getColorForService = (serviceType: string) => {
    return categoryColors[serviceType] || categoryColors['default'];
  };

  const isSlotOccupied = (date: Date, hour: number) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayBookings = getBookingsForDay(date);
    const hasBooking = dayBookings.some(booking => {
      if (!booking.event_time) return false;
      const [bookingHour] = booking.event_time.split(':').map(Number);
      const duration = booking.duration_hours || 1;
      return hour >= bookingHour && hour < bookingHour + duration;
    });

    const isBlocked = blockedSlots.some(slot => {
      if (slot.date !== dateStr) return false;
      const [startHour] = slot.start_time.split(':').map(Number);
      const [endHour] = slot.end_time.split(':').map(Number);
      return hour >= startHour && hour < endHour;
    });

    return hasBooking || isBlocked;
  };

  const handleMouseDown = (date: Date, hour: number, dayIndex: number) => {
    if (isSlotOccupied(date, hour)) {
      const dateStr = date.toISOString().split('T')[0];
      const booking = bookings.find(b => {
        if (b.event_date !== dateStr || !b.event_time) return false;
        const [bookingHour] = b.event_time.split(':').map(Number);
        const duration = b.duration_hours || 1;
        return hour >= bookingHour && hour < bookingHour + duration;
      });
      if (booking) {
        setSelectedBooking(booking);
      }
      return;
    }

    setIsSelecting(true);
    setSelectionStart({ date, hour, dayIndex });
    setSelectionEnd({ date, hour, dayIndex });
  };

  const handleMouseEnter = (date: Date, hour: number, dayIndex: number) => {
    if (isSelecting && selectionStart && selectionStart.dayIndex === dayIndex) {
      setSelectionEnd({ date, hour, dayIndex });
    }
  };

  const handleMouseUp = () => {
    if (isSelecting && selectionStart && selectionEnd) {
      const startHour = Math.min(selectionStart.hour, selectionEnd.hour);
      const endHour = Math.max(selectionStart.hour, selectionEnd.hour) + 1;

      setSelectedTimeSlot({
        date: selectionStart.date,
        startHour,
        endHour,
        dayIndex: selectionStart.dayIndex
      });
      setShowActionModal(true);
      setModalStep('choice');
    }
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const isSlotSelected = (hour: number, dayIndex: number) => {
    if (!isSelecting || !selectionStart || !selectionEnd) return false;
    if (dayIndex !== selectionStart.dayIndex) return false;
    const minHour = Math.min(selectionStart.hour, selectionEnd.hour);
    const maxHour = Math.max(selectionStart.hour, selectionEnd.hour);
    return hour >= minHour && hour <= maxHour;
  };

  const handleBlockTimeSlot = async () => {
    if (!selectedTimeSlot) return;

    const dateStr = selectedTimeSlot.date.toISOString().split('T')[0];
    const startTime = `${selectedTimeSlot.startHour.toString().padStart(2, '0')}:00`;
    const endTime = `${selectedTimeSlot.endHour.toString().padStart(2, '0')}:00`;

    await supabase.from('blocked_time_slots').insert({
      date: dateStr,
      start_time: startTime,
      end_time: endTime,
      reason: 'Manuell gesperrt'
    });

    closeModal();
    loadBlockedSlots();
  };

  const handleCreateAppointment = async () => {
    if (!selectedTimeSlot || !selectedService) return;

    const dateStr = selectedTimeSlot.date.toISOString().split('T')[0];
    const startTime = `${selectedTimeSlot.startHour.toString().padStart(2, '0')}:00`;
    const duration = selectedTimeSlot.endHour - selectedTimeSlot.startHour;

    await supabase.from('bookings').insert({
      service_type: selectedService,
      status: 'confirmed',
      customer_name: formData.customerName,
      customer_email: formData.customerEmail,
      customer_phone: formData.customerPhone,
      company: formData.company,
      budget: formData.budget,
      event_date: dateStr,
      event_time: startTime,
      duration_hours: duration
    });

    closeModal();
    loadBookings();
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', selectedBooking.id);

    setSelectedBooking(null);
    loadBookings();
  };

  const closeModal = () => {
    setShowActionModal(false);
    setSelectedTimeSlot(null);
    setModalStep('choice');
    setSelectedService('');
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      company: '',
      budget: ''
    });
  };

  const weekDates = getWeekDates();

  useEffect(() => {
    if (isSelecting) {
      window.addEventListener('mouseup', handleMouseUp);
      return () => window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isSelecting, selectionStart, selectionEnd]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-[600] text-gray-900">Terminkalender</h2>
          <p className="text-[15px] text-gray-600 mt-1">Klicken & Ziehen zum Auswählen</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 rounded-[10px] text-[14px] font-[500] border border-gray-200 transition-colors"
          >
            Heute
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-[20px] border border-gray-200/60">
        <div className="flex items-center justify-between">
          <button
            onClick={previousWeek}
            className="w-9 h-9 rounded-[8px] flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div className="text-center">
            <h3 className="text-[18px] font-[600] text-gray-900">{formatWeekRange()}</h3>
          </div>
          <button
            onClick={nextWeek}
            className="w-9 h-9 rounded-[8px] flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-gray-200/60 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-400px)]">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
              <div className="p-2" />
              {weekDates.map((date, idx) => (
                <div key={idx} className="p-2 text-center border-l border-gray-200">
                  <div className="text-[11px] font-[500] text-gray-600 mb-0.5">
                    {DAYS_OF_WEEK[idx]}
                  </div>
                  <div className={`text-[16px] font-[600] ${
                    isToday(date) ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </div>
                  {isToday(date) && (
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mx-auto mt-0.5" />
                  )}
                </div>
              ))}
            </div>

            <div className="relative select-none">
              {HOURS.map((hour) => (
                <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-100">
                  <div className="p-2 text-right pr-2">
                    <span className="text-[11px] font-[500] text-gray-500">
                      {hour.toString().padStart(2, '0')}:00
                    </span>
                  </div>
                  {weekDates.map((date, dayIdx) => {
                    const isOccupied = isSlotOccupied(date, hour);
                    const isSelected = isSlotSelected(hour, dayIdx);
                    return (
                      <div
                        key={`${hour}-${dayIdx}`}
                        onMouseDown={() => handleMouseDown(date, hour, dayIdx)}
                        onMouseEnter={() => handleMouseEnter(date, hour, dayIdx)}
                        className={`h-[50px] border-l border-gray-100 relative cursor-pointer transition-colors ${
                          isOccupied ? 'bg-red-50/40' : isSelected ? 'bg-blue-100' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {isOccupied && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <X size={14} className="text-red-400" strokeWidth={2} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {weekDates.map((date, dayIdx) => {
                const dayBookings = getBookingsForDay(date);
                return dayBookings.map((booking) => {
                  if (!booking.event_time) return null;
                  const { top, height } = getEventPosition(
                    booking.event_time,
                    booking.duration_hours || 1
                  );
                  const color = getColorForService(booking.service_type);
                  const leftOffset = 60 + (dayIdx * (100 / 7)) + '%';

                  return (
                    <div
                      key={booking.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                      className="absolute cursor-pointer group pointer-events-auto"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        left: leftOffset,
                        width: `calc(${100 / 7}% - 2px)`,
                        marginLeft: '1px'
                      }}
                    >
                      <div
                        className="h-full rounded-[6px] p-2 overflow-hidden border-2 group-hover:shadow-lg transition-all"
                        style={{
                          backgroundColor: `${color}15`,
                          borderColor: color
                        }}
                      >
                        <div className="flex items-start gap-1.5">
                          <div
                            className="w-0.5 h-full rounded-full flex-shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-[11px] font-[600] mb-0.5 truncate"
                              style={{ color }}
                            >
                              {booking.service_type}
                            </p>
                            <p className="text-[10px] text-gray-700 font-[500] truncate">
                              {booking.customer_name}
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              {booking.event_time} • {booking.duration_hours}h
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </div>
      </div>

      {showActionModal && selectedTimeSlot && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {modalStep === 'choice' && (
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-[16px] flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon size={32} className="text-blue-600" strokeWidth={2} />
                  </div>
                  <h3 className="text-[24px] font-[600] text-gray-900 mb-2">
                    Zeitraum ausgewählt
                  </h3>
                  <p className="text-[16px] text-gray-600">
                    {selectedTimeSlot.date.toLocaleDateString('de-DE', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-[18px] font-[600] text-gray-900 mt-2">
                    {selectedTimeSlot.startHour}:00 - {selectedTimeSlot.endHour}:00 Uhr
                  </p>
                  <p className="text-[14px] text-gray-500 mt-1">
                    ({selectedTimeSlot.endHour - selectedTimeSlot.startHour} Stunden)
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setModalStep('create-appointment')}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] text-[15px] font-[600] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
                  >
                    <Plus size={20} strokeWidth={2} />
                    Neuen Termin anlegen
                  </button>
                  <button
                    onClick={() => setModalStep('block-time')}
                    className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-[12px] text-[15px] font-[600] transition-colors flex items-center justify-center gap-3"
                  >
                    <Ban size={20} strokeWidth={2} />
                    Zeit sperren
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[12px] text-[15px] font-[500] transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            )}

            {modalStep === 'create-appointment' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[24px] font-[600] text-gray-900">Neuer Termin</h3>
                  <button
                    onClick={closeModal}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} strokeWidth={2} />
                  </button>
                </div>

                <div className="bg-blue-50 rounded-[12px] p-4 mb-6">
                  <div className="flex items-center gap-3 text-blue-900">
                    <Clock size={18} strokeWidth={2} />
                    <div>
                      <p className="text-[14px] font-[600]">
                        {selectedTimeSlot.date.toLocaleDateString('de-DE', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long'
                        })}
                      </p>
                      <p className="text-[13px]">
                        {selectedTimeSlot.startHour}:00 - {selectedTimeSlot.endHour}:00 Uhr • {selectedTimeSlot.endHour - selectedTimeSlot.startHour}h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-[600] text-gray-900 mb-3">
                      Service auswählen *
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {services.map((service) => {
                        const Icon = serviceIcons[service.title] || CalendarIcon;
                        const color = getColorForService(service.title);
                        const isSelected = selectedService === service.title;

                        return (
                          <button
                            key={service.id}
                            onClick={() => setSelectedService(service.title)}
                            className={`p-4 rounded-[12px] border-2 transition-all text-left ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${color}15` }}
                              >
                                <Icon size={24} strokeWidth={2} style={{ color }} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[15px] font-[600] text-gray-900">
                                  {service.title}
                                </p>
                                <p className="text-[13px] text-gray-600">
                                  {service.price} • {service.duration}
                                </p>
                              </div>
                              {isSelected && (
                                <CheckCircle2 size={24} className="text-blue-600" strokeWidth={2} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-[16px] font-[600] text-gray-900 mb-4">
                      Kundendaten
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[13px] font-[500] text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          placeholder="Max Mustermann"
                          className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-[14px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px] font-[500] text-gray-700 mb-2">
                            E-Mail *
                          </label>
                          <input
                            type="email"
                            value={formData.customerEmail}
                            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                            placeholder="max@beispiel.de"
                            className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-[14px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-[500] text-gray-700 mb-2">
                            Telefon *
                          </label>
                          <input
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                            placeholder="+49 123 456789"
                            className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-[14px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px] font-[500] text-gray-700 mb-2">
                            Firma
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Firmenname"
                            className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-[14px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-[500] text-gray-700 mb-2">
                            Budget
                          </label>
                          <input
                            type="text"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            placeholder="5.000 - 10.000€"
                            className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-[14px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setModalStep('choice')}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[12px] text-[14px] font-[500] transition-colors"
                    >
                      Zurück
                    </button>
                    <button
                      onClick={handleCreateAppointment}
                      disabled={!selectedService || !formData.customerName || !formData.customerEmail || !formData.customerPhone}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] text-[14px] font-[600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={18} strokeWidth={2} />
                      Termin erstellen
                    </button>
                  </div>
                </div>
              </div>
            )}

            {modalStep === 'block-time' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[24px] font-[600] text-gray-900">Zeit sperren</h3>
                  <button
                    onClick={closeModal}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} strokeWidth={2} />
                  </button>
                </div>

                <div className="bg-red-50 rounded-[12px] p-4 mb-6">
                  <div className="flex items-center gap-3 text-red-900">
                    <Ban size={18} strokeWidth={2} />
                    <div>
                      <p className="text-[14px] font-[600]">
                        {selectedTimeSlot.date.toLocaleDateString('de-DE', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long'
                        })}
                      </p>
                      <p className="text-[13px]">
                        {selectedTimeSlot.startHour}:00 - {selectedTimeSlot.endHour}:00 Uhr wird gesperrt
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] text-gray-600 mb-6">
                  Dieser Zeitraum wird für Buchungen gesperrt und kann nicht mehr ausgewählt werden.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModalStep('choice')}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[12px] text-[14px] font-[500] transition-colors"
                  >
                    Zurück
                  </button>
                  <button
                    onClick={handleBlockTimeSlot}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-[12px] text-[14px] font-[600] transition-colors flex items-center justify-center gap-2"
                  >
                    <Ban size={18} strokeWidth={2} />
                    Jetzt sperren
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[24px] max-w-lg w-full">
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                    style={{
                      backgroundColor: `${getColorForService(selectedBooking.service_type)}15`
                    }}
                  >
                    <CalendarIcon
                      size={24}
                      strokeWidth={2}
                      style={{ color: getColorForService(selectedBooking.service_type) }}
                    />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-[600] text-gray-900">
                      Termin Details
                    </h3>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-[6px] text-[11px] font-[600] uppercase mt-1"
                      style={{
                        backgroundColor: `${getColorForService(selectedBooking.service_type)}15`,
                        color: getColorForService(selectedBooking.service_type)
                      }}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="px-8 py-6 space-y-5">
              <div>
                <p className="text-[13px] font-[500] text-gray-500 mb-1">Service</p>
                <p className="text-[16px] font-[600] text-gray-900">
                  {selectedBooking.service_type}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[13px] font-[500] text-gray-500 mb-1">Datum</p>
                  <p className="text-[15px] font-[600] text-gray-900">
                    {new Date(selectedBooking.event_date).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] font-[500] text-gray-500 mb-1">Uhrzeit</p>
                  <p className="text-[15px] font-[600] text-gray-900">
                    {selectedBooking.event_time} Uhr • {selectedBooking.duration_hours}h
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[13px] font-[500] text-gray-500 mb-3">Kunde</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400" strokeWidth={2} />
                    <span className="text-[14px] text-gray-900">{selectedBooking.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gray-400" strokeWidth={2} />
                    <a
                      href={`mailto:${selectedBooking.customer_email}`}
                      className="text-[14px] text-blue-600 hover:text-blue-700"
                    >
                      {selectedBooking.customer_email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400" strokeWidth={2} />
                    <a
                      href={`tel:${selectedBooking.customer_phone}`}
                      className="text-[14px] text-blue-600 hover:text-blue-700"
                    >
                      {selectedBooking.customer_phone}
                    </a>
                  </div>
                  {selectedBooking.company && (
                    <div className="flex items-center gap-3">
                      <Building size={16} className="text-gray-400" strokeWidth={2} />
                      <span className="text-[14px] text-gray-900">{selectedBooking.company}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedBooking.budget && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <DollarSign size={16} className="text-gray-400" strokeWidth={2} />
                    <div>
                      <p className="text-[13px] font-[500] text-gray-500">Budget</p>
                      <p className="text-[15px] font-[600] text-gray-900">{selectedBooking.budget}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 py-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleDeleteBooking}
                className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-[10px] text-[14px] font-[500] transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={16} strokeWidth={2} />
                Löschen
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[10px] text-[14px] font-[500] transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
