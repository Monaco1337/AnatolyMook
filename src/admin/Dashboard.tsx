import { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon, Users, Mail, Bell, Settings,
  Search, Plus, MoreVertical, Check, Clock, DollarSign,
  BarChart3, ChevronRight, LogOut, Package, ShoppingBag, BookOpen, MessageCircle, Star, Brain, Sparkles, Home as HomeIcon, Zap, Globe, CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import SeminarsManager from './SeminarsManager';
import Calendar from './Calendar';
import ProductsManager from './ProductsManager';
import BlogManager from './BlogManager';
import ContactsManager from './ContactsManager';
import CoachingManager from './CoachingManager';
import CorporateManager from './CorporateManager';
import QuizManager from './QuizManager';
import QuizSubmissionsManager from './QuizSubmissionsManager';
import AnamnesisManager from './AnamnesisManager';
import HomeManager from './HomeManager';
import EventsManager from './EventsManager';
import NewsManager from './NewsManager';
import SEOManager from './SEOManager';

interface Booking {
  id: string;
  service_type: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company: string;
  priority: string;
  event_date: string;
  budget: string;
  created_at: string;
  is_read: boolean;
}

type DashboardView = 'overview' | 'bookings' | 'calendar' | 'contacts' | 'seminars' | 'products' | 'blog' | 'coaching' | 'corporate' | 'quiz' | 'quiz_submissions' | 'anamnesis' | 'home' | 'events' | 'news' | 'seo';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0
  });
  const [badges, setBadges] = useState({
    contacts: 0,
    bookings: 0,
    anamnesis: 0,
    quiz_submissions: 0
  });

  useEffect(() => {
    loadDashboardData();
    loadBadgeCounts();

    const bookingsChannel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        loadDashboardData();
        loadBadgeCounts();
      })
      .subscribe();

    const contactsChannel = supabase
      .channel('contacts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_inquiries' }, () => {
        loadBadgeCounts();
      })
      .subscribe();

    const anamnesisChannel = supabase
      .channel('anamnesis-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'anamnesis_submissions' }, () => {
        loadBadgeCounts();
      })
      .subscribe();

    const quizChannel = supabase
      .channel('quiz-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'consciousness_quiz_submissions' }, () => {
        loadBadgeCounts();
      })
      .subscribe();

    const badgeInterval = setInterval(() => {
      loadBadgeCounts();
    }, 3000);

    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(contactsChannel);
      supabase.removeChannel(anamnesisChannel);
      supabase.removeChannel(quizChannel);
      clearInterval(badgeInterval);
    };
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);

    const { data: bookingsData } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (bookingsData) {
      setBookings(bookingsData);

      const pending = bookingsData.filter(b => b.status === 'pending').length;
      const confirmed = bookingsData.filter(b => b.status === 'confirmed').length;

      setStats({
        totalBookings: bookingsData.length,
        pendingBookings: pending,
        confirmedBookings: confirmed,
        totalRevenue: bookingsData.length * 35000
      });
    }

    setLoading(false);
  };

  const loadBadgeCounts = async () => {
    const { count: unreadContacts } = await supabase
      .from('contact_inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    const { count: unreadBookings } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    const { count: unreadAnamnesis } = await supabase
      .from('anamnesis_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    const { count: unreadQuizSubmissions } = await supabase
      .from('consciousness_quiz_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('read', false);

    setBadges({
      contacts: unreadContacts || 0,
      bookings: unreadBookings || 0,
      anamnesis: unreadAnamnesis || 0,
      quiz_submissions: unreadQuizSubmissions || 0
    });
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);
  };

  const markBookingAsRead = async (id: string, isRead: boolean) => {
    setBookings(prev => {
      const updated = prev.map(booking => {
        if (booking.id === id) {
          const wasUnread = !booking.is_read;
          const willBeRead = isRead;

          if (wasUnread && willBeRead) {
            setBadges(b => ({ ...b, bookings: Math.max(0, b.bookings - 1) }));
          } else if (!wasUnread && !willBeRead) {
            setBadges(b => ({ ...b, bookings: b.bookings + 1 }));
          }

          return { ...booking, is_read: isRead };
        }
        return booking;
      });
      return updated;
    });

    const { error } = await supabase
      .from('bookings')
      .update({ is_read: isRead })
      .eq('id', id);

    if (error) {
      console.error('Error updating booking:', error);
    } else {
      console.log('Successfully updated booking', id, 'to is_read:', isRead);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    window.location.href = '/';
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const StatCard = ({ icon: Icon, label, value, change, color, trend }: any) => (
    <div className="group relative">
      <div className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 rounded-[20px] transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
      />
      <div className="relative bg-white p-6 rounded-[20px] border border-gray-200/60 hover:border-gray-300/60 transition-all duration-300">
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-[16px] flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon size={22} strokeWidth={2} style={{ color }} />
          </div>
          {change && (
            <div className={`px-2.5 py-1 rounded-[8px] flex items-center gap-1 ${
              change > 0 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <ChevronRight
                size={12}
                strokeWidth={2.5}
                className={`transform ${change > 0 ? '-rotate-90' : 'rotate-90'} ${
                  change > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              />
              <span className={`text-[12px] font-semibold ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        <p className="text-gray-500 text-[13px] font-medium mb-2">{label}</p>
        <div className="flex items-end justify-between">
          <p className="text-[36px] font-semibold text-gray-900 tracking-tight leading-none">{value}</p>
          {trend && (
            <div className="h-7 flex items-end gap-0.5 mb-1">
              {trend.map((val: number, i: number) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full transition-all duration-300"
                  style={{
                    height: `${val}%`,
                    backgroundColor: color,
                    opacity: 0.4 + (i * 0.08)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pb-20 sm:pb-24">
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pb-2 sm:pb-4 pt-2 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent pointer-events-none">
        <div className="px-2 sm:px-0 pointer-events-auto">
        <div className="max-w-full sm:max-w-fit mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[20px] sm:rounded-[28px] blur-xl sm:blur-2xl opacity-60" />
            <div className="relative bg-white/70 backdrop-blur-3xl rounded-[18px] sm:rounded-[24px] border border-white/40 shadow-2xl shadow-gray-900/10 p-1.5 sm:p-2">
              <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
                {[
                  { id: 'overview', icon: BarChart3, label: 'Overview', gradient: 'from-blue-500 to-cyan-500', badge: null },
                  { id: 'home', icon: HomeIcon, label: 'Home', gradient: 'from-yellow-500 to-orange-500', badge: null },
                  { id: 'events', icon: Zap, label: 'Events', gradient: 'from-yellow-400 to-orange-500', badge: null },
                  { id: 'bookings', icon: CalendarIcon, label: 'Buchungen', gradient: 'from-orange-500 to-amber-500', badge: 'bookings' },
                  { id: 'calendar', icon: Clock, label: 'Termine', gradient: 'from-purple-500 to-pink-500', badge: null },
                  { id: 'contacts', icon: MessageCircle, label: 'Kontakte', gradient: 'from-green-500 to-emerald-500', badge: 'contacts' },
                  { id: 'seminars', icon: Package, label: 'Seminare', gradient: 'from-indigo-500 to-blue-500', badge: null },
                  { id: 'coaching', icon: Star, label: 'Coaching', gradient: 'from-sky-500 to-cyan-500', badge: null },
                  { id: 'corporate', icon: Users, label: 'Corporate', gradient: 'from-cyan-500 to-teal-500', badge: null },
                  { id: 'quiz', icon: Brain, label: 'Quiz', gradient: 'from-yellow-500 to-amber-500', badge: null },
                  { id: 'quiz_submissions', icon: Sparkles, label: 'Auswertungen', gradient: 'from-amber-500 to-orange-500', badge: 'quiz_submissions' },
                  { id: 'anamnesis', icon: Brain, label: 'Anamnese', gradient: 'from-purple-500 to-violet-500', badge: 'anamnesis' },
                  { id: 'products', icon: ShoppingBag, label: 'Produkte', gradient: 'from-pink-500 to-rose-500', badge: null },
                  { id: 'blog', icon: BookOpen, label: 'Blog', gradient: 'from-amber-500 to-yellow-500', badge: null },
                  { id: 'news', icon: Zap, label: 'News', gradient: 'from-yellow-400 to-orange-400', badge: null },
                  { id: 'seo', icon: Globe, label: 'SEO System', gradient: 'from-blue-600 to-indigo-600', badge: null }
                ].map((item) => {
                  const badgeCount = item.badge ? badges[item.badge as keyof typeof badges] : 0;
                  return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as DashboardView)}
                    className="relative flex flex-col items-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-[14px] sm:rounded-[18px] transition-all duration-300 group flex-shrink-0"
                  >
                    {currentView === item.id && (
                      <>
                        <div className="absolute inset-0 bg-white/80 rounded-[14px] sm:rounded-[18px] shadow-lg shadow-gray-900/10" />
                        <div className={`absolute -top-0.5 sm:-top-1 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 rounded-full bg-gradient-to-r ${item.gradient} opacity-80`} />
                      </>
                    )}
                    <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[14px] flex items-center justify-center transition-all duration-300 ${
                      currentView === item.id
                        ? 'scale-105 sm:scale-110 shadow-lg'
                        : 'group-hover:scale-105'
                    }`}>
                      <div className={`absolute inset-0 rounded-[12px] sm:rounded-[14px] bg-gradient-to-br ${item.gradient} opacity-${currentView === item.id ? '100' : '20 group-hover:opacity-30'} transition-opacity duration-300`} />
                      <div className="absolute inset-0 rounded-[12px] sm:rounded-[14px] bg-white/40 backdrop-blur-sm" />
                      <item.icon
                        size={16}
                        strokeWidth={2.5}
                        className={`sm:w-5 sm:h-5 relative z-10 transition-all duration-300 ${
                          currentView === item.id ? 'text-white drop-shadow-lg' : 'text-gray-700 group-hover:text-gray-900'
                        }`}
                      />
                      {badgeCount > 0 && (
                        <div className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                          {badgeCount > 99 ? '99+' : badgeCount}
                        </div>
                      )}
                    </div>
                    <span className={`relative text-[8px] sm:text-[9px] font-semibold tracking-tight transition-all duration-300 whitespace-nowrap ${
                      currentView === item.id ? 'text-gray-900 scale-105' : 'text-gray-500 group-hover:text-gray-700'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                  );
                })}

                <div className="w-px h-8 sm:h-10 bg-gray-300/40 mx-0.5 sm:mx-1 flex-shrink-0" />

                <button
                  onClick={handleLogout}
                  className="relative flex flex-col items-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-[14px] sm:rounded-[18px] transition-all duration-300 group hover:bg-red-50/80 flex-shrink-0"
                >
                  <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[14px] flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                    <div className={`absolute inset-0 rounded-[12px] sm:rounded-[14px] bg-gradient-to-br from-red-500 to-rose-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                    <div className="absolute inset-0 rounded-[12px] sm:rounded-[14px] bg-white/40 backdrop-blur-sm" />
                    <LogOut
                      size={16}
                      strokeWidth={2.5}
                      className={`sm:w-5 sm:h-5 relative z-10 transition-all duration-300 text-red-600 group-hover:text-red-700`}
                    />
                  </div>
                  <span className={`relative text-[8px] sm:text-[9px] font-semibold tracking-tight transition-all duration-300 text-red-600 group-hover:text-red-700 whitespace-nowrap`}>
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {currentView === 'overview' && (
          <div className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard
                icon={CalendarIcon}
                label="Gesamt-Buchungen"
                value={stats.totalBookings}
                change={12}
                color="#0066CC"
                trend={[30, 45, 35, 60, 50, 75, 80]}
              />
              <StatCard
                icon={Clock}
                label="Ausstehend"
                value={stats.pendingBookings}
                color="#FF9500"
                trend={[50, 40, 55, 45, 60, 50, 65]}
              />
              <StatCard
                icon={Check}
                label="Bestätigt"
                value={stats.confirmedBookings}
                change={8}
                color="#34C759"
                trend={[25, 35, 45, 55, 65, 70, 85]}
              />
              <StatCard
                icon={DollarSign}
                label="Umsatz (Geschätzt)"
                value={`€${(stats.totalRevenue / 1000).toFixed(0)}K`}
                change={15}
                color="#5856D6"
                trend={[40, 50, 45, 60, 70, 80, 90]}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 bg-white p-6 rounded-[20px] border border-gray-200/60">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[19px] font-semibold text-gray-900">Letzte Buchungen</h3>
                    <p className="text-[13px] text-gray-500 mt-0.5">Neueste Aktivitäten</p>
                  </div>
                  <button className="px-4 py-2 rounded-[10px] text-[13px] font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                    Alle anzeigen
                  </button>
                </div>
                <div className="space-y-2">
                  {bookings.slice(0, 6).map((booking) => (
                    <div key={booking.id} className="p-4 rounded-[14px] bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-[14px]">
                            {booking.customer_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium text-[14px]">{booking.customer_name}</p>
                            <p className="text-gray-500 text-[12px]">{booking.company} • {booking.service_type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-[8px] text-[11px] font-semibold uppercase tracking-wide ${
                            booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {booking.status}
                          </span>
                          <ChevronRight size={16} className="text-gray-400" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-[20px] border border-gray-200/60">
                <div className="mb-6">
                  <h3 className="text-[19px] font-semibold text-gray-900">Quick Actions</h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">Häufig verwendet</p>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: Plus, label: 'Neue Buchung', color: '#0066CC' },
                    { icon: Users, label: 'Kontakt hinzufügen', color: '#34C759' },
                    { icon: CalendarIcon, label: 'Event planen', color: '#5856D6' },
                    { icon: Mail, label: 'Email senden', color: '#FF9500' }
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      className="w-full p-3.5 rounded-[14px] flex items-center gap-3 text-left bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                        <action.icon size={19} strokeWidth={2} style={{ color: action.color }} />
                      </div>
                      <span className="text-gray-900 text-[14px] font-medium">{action.label}</span>
                      <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'bookings' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <h2 className="text-[22px] sm:text-[28px] font-[600] text-gray-900">Buchungsverwaltung</h2>
              <button className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] text-[14px] font-[500] flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
                <Plus size={16} strokeWidth={2} />
                <span>Neue Buchung</span>
              </button>
            </div>

            <div className="bg-white rounded-[12px] sm:rounded-[20px] border border-gray-200/60 overflow-hidden">
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-[12px] font-[600] text-gray-600 uppercase tracking-wider">Kunde</th>
                      <th className="text-left py-4 px-6 text-[12px] font-[600] text-gray-600 uppercase tracking-wider">Service</th>
                      <th className="text-left py-4 px-6 text-[12px] font-[600] text-gray-600 uppercase tracking-wider">Datum</th>
                      <th className="text-left py-4 px-6 text-[12px] font-[600] text-gray-600 uppercase tracking-wider">Budget</th>
                      <th className="text-left py-4 px-6 text-[12px] font-[600] text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="text-right py-4 px-6 text-[12px] font-[600] text-gray-600 uppercase tracking-wider">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-[600] text-[13px]">
                              {booking.customer_name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-gray-900 font-[500] text-[14px]">{booking.customer_name}</p>
                              <p className="text-gray-500 text-[12px]">{booking.customer_email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700 text-[14px] font-[500]">{booking.service_type}</td>
                        <td className="py-4 px-6 text-gray-700 text-[14px]">{booking.event_date || 'TBD'}</td>
                        <td className="py-4 px-6 text-gray-700 text-[14px]">{booking.budget}</td>
                        <td className="py-4 px-6">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-full text-[12px] font-[600] border-none outline-none cursor-pointer ${
                              booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              booking.status === 'completed' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markBookingAsRead(booking.id, !booking.is_read);
                              }}
                              className={`w-8 h-8 rounded-[8px] inline-flex items-center justify-center transition-colors ${
                                booking.is_read
                                  ? 'text-green-600 hover:bg-green-50'
                                  : 'text-gray-400 hover:bg-gray-100'
                              }`}
                              title={booking.is_read ? 'Als ungelesen markieren' : 'Als gelesen markieren'}
                            >
                              <CheckCircle2 size={16} strokeWidth={2} />
                            </button>
                            <button className="w-8 h-8 rounded-[8px] inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                              <MoreVertical size={16} strokeWidth={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-[600] text-[15px] flex-shrink-0">
                        {booking.customer_name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-[600] text-[15px] truncate">{booking.customer_name}</p>
                        <p className="text-gray-500 text-[13px] truncate">{booking.customer_email}</p>
                      </div>
                      <button className="w-8 h-8 rounded-[8px] flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors flex-shrink-0">
                        <MoreVertical size={16} strokeWidth={2} />
                      </button>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-500 font-[500]">Service:</span>
                        <span className="text-gray-900 font-[600]">{booking.service_type}</span>
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-500 font-[500]">Datum:</span>
                        <span className="text-gray-900 font-[500]">{booking.event_date || 'TBD'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-500 font-[500]">Budget:</span>
                        <span className="text-gray-900 font-[500]">{booking.budget}</span>
                      </div>
                    </div>

                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className={`w-full px-3 py-2 rounded-[8px] text-[13px] font-[600] border-none outline-none cursor-pointer ${
                        booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'completed' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'home' && (
          <HomeManager />
        )}

        {currentView === 'events' && (
          <EventsManager />
        )}

        {currentView === 'news' && (
          <NewsManager />
        )}

        {currentView === 'seo' && (
          <SEOManager />
        )}

        {currentView === 'seminars' && (
          <SeminarsManager />
        )}

        {currentView === 'coaching' && (
          <CoachingManager />
        )}

        {currentView === 'corporate' && (
          <CorporateManager />
        )}

        {currentView === 'quiz' && (
          <QuizManager />
        )}

        {currentView === 'quiz_submissions' && (
          <QuizSubmissionsManager />
        )}

        {currentView === 'anamnesis' && (
          <AnamnesisManager />
        )}

        {currentView === 'products' && (
          <ProductsManager />
        )}

        {currentView === 'blog' && (
          <BlogManager />
        )}

        {currentView === 'contacts' && (
          <ContactsManager />
        )}

        {currentView === 'calendar' && (
          <Calendar />
        )}
      </div>
    </div>
  );
}
