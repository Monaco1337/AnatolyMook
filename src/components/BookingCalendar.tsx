import { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft, ChevronRight, Calendar, Check, X, Clock,
  Sparkles, Sun, Moon, Sunrise, CalendarDays, CalendarCheck,
  Info, AlertCircle, CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlockedSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  reason?: string;
}

interface Booking {
  id: string;
  event_date: string;
  status: string;
}

interface BookingCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  theme: string;
  text: any;
  accentColor?: string;
}

const MONTHS_DE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

const DAYS_DE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export default function BookingCalendar({
  selectedDate,
  onDateSelect,
  theme,
  text,
  accentColor = 'rgba(250, 204, 21, 0.4)'
}: BookingCalendarProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [currentYear]);

  const loadData = async () => {
    setLoading(true);
    try {
      const startDate = `${currentYear}-01-01`;
      const endDate = `${currentYear}-12-31`;

      const [blockedRes, bookingsRes] = await Promise.all([
        supabase
          .from('blocked_time_slots')
          .select('*')
          .gte('date', startDate)
          .lte('date', endDate),
        supabase
          .from('bookings')
          .select('id, event_date, status')
          .gte('event_date', startDate)
          .lte('event_date', endDate)
          .in('status', ['confirmed', 'pending'])
      ]);

      if (blockedRes.data) setBlockedSlots(blockedRes.data);
      if (bookingsRes.data) setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const blockedDatesMap = useMemo(() => {
    const map = new Map<string, { isFullyBlocked: boolean; slots: BlockedSlot[] }>();

    blockedSlots.forEach(slot => {
      const existing = map.get(slot.date);
      const slots = existing ? [...existing.slots, slot] : [slot];

      const totalBlockedHours = slots.reduce((sum, s) => {
        const start = parseInt(s.start_time.split(':')[0]);
        const end = parseInt(s.end_time.split(':')[0]);
        return sum + (end - start);
      }, 0);

      map.set(slot.date, {
        isFullyBlocked: totalBlockedHours >= 8,
        slots
      });
    });

    return map;
  }, [blockedSlots]);

  const bookedDatesMap = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach(booking => {
      if (booking.event_date) {
        map.set(booking.event_date, (map.get(booking.event_date) || 0) + 1);
      }
    });
    return map;
  }, [bookings]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const isDateBlocked = (dateStr: string) => {
    const blocked = blockedDatesMap.get(dateStr);
    return blocked?.isFullyBlocked || false;
  };

  const isDatePartiallyBlocked = (dateStr: string) => {
    const blocked = blockedDatesMap.get(dateStr);
    return blocked && !blocked.isFullyBlocked;
  };

  const hasBookings = (dateStr: string) => {
    return (bookedDatesMap.get(dateStr) || 0) > 0;
  };

  const isPastDate = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const getDateStatus = (dateStr: string) => {
    if (isPastDate(dateStr)) return 'past';
    if (isDateBlocked(dateStr)) return 'blocked';
    if (isDatePartiallyBlocked(dateStr)) return 'partial';
    if (hasBookings(dateStr)) return 'busy';
    return 'available';
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (dateStr: string) => {
    const status = getDateStatus(dateStr);
    if (status === 'past' || status === 'blocked') return;
    onDateSelect(dateStr);
  };

  const renderMonthGrid = (year: number, month: number, compact = false) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const status = getDateStatus(dateStr);
      const isSelected = selectedDate === dateStr;
      const isHovered = hoveredDate === dateStr;
      const todayDate = isToday(dateStr);

      const statusStyles = {
        past: {
          bg: theme === 'dark' ? 'bg-white/[0.02]' : 'bg-stone-100/50',
          text: theme === 'dark' ? 'text-white/20' : 'text-stone-300',
          cursor: 'cursor-not-allowed'
        },
        blocked: {
          bg: theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50',
          text: theme === 'dark' ? 'text-red-400/60' : 'text-red-400',
          cursor: 'cursor-not-allowed'
        },
        partial: {
          bg: theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50',
          text: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
          cursor: 'cursor-pointer'
        },
        busy: {
          bg: theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50',
          text: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
          cursor: 'cursor-pointer'
        },
        available: {
          bg: theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-50',
          text: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
          cursor: 'cursor-pointer'
        }
      };

      const style = statusStyles[status];

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(dateStr)}
          onMouseEnter={() => setHoveredDate(dateStr)}
          onMouseLeave={() => setHoveredDate(null)}
          disabled={status === 'past' || status === 'blocked'}
          className={`
            aspect-square rounded-[12px] flex items-center justify-center relative
            transition-all duration-300 ${style.cursor}
            ${compact ? 'text-[11px]' : 'text-[14px]'}
            ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
            ${theme === 'dark' ? 'ring-offset-black' : 'ring-offset-white'}
          `}
          style={{
            background: isSelected
              ? 'linear-gradient(135deg, rgba(250, 204, 21, 0.3) 0%, rgba(250, 204, 21, 0.15) 100%)'
              : isHovered && status !== 'past' && status !== 'blocked'
              ? theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
              : 'transparent',
            transform: isHovered && status !== 'past' && status !== 'blocked' ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <span className={`font-[550] ${isSelected ? 'text-yellow-400' : style.text}`}>
            {day}
          </span>

          {todayDate && !isSelected && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-400" />
          )}

          {status === 'available' && !compact && (
            <div className="absolute top-1 right-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          )}

          {status === 'blocked' && !compact && (
            <div className="absolute top-1 right-1">
              <X size={10} className="text-red-400" strokeWidth={3} />
            </div>
          )}

          {status === 'partial' && !compact && (
            <div className="absolute top-1 right-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const renderYearView = () => {
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, month) => (
          <button
            key={month}
            onClick={() => {
              setCurrentMonth(month);
              setViewMode('month');
            }}
            className={`
              p-4 rounded-[20px] transition-all duration-300 text-left
              ${currentMonth === month ? 'ring-2 ring-yellow-400/50' : ''}
            `}
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <p className={`text-[13px] font-[650] ${text.primary} mb-3`}>
              {MONTHS_DE[month]}
            </p>
            <div className="grid grid-cols-7 gap-0.5">
              {renderMonthGrid(currentYear, month, true)}
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div
        className="p-6 rounded-[28px]"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: theme === 'dark'
            ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            : 'inset 0 1px 0 0 rgba(255, 255, 255, 1), 0 25px 50px -12px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(250, 204, 21, 0.08) 100%)',
                border: '1px solid rgba(250, 204, 21, 0.3)'
              }}
            >
              <CalendarDays className="text-yellow-400" size={24} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className={`text-[18px] font-[680] ${text.primary} tracking-[-0.02em]`}>
                Wunschtermin wahlen
              </h3>
              <p className={`text-[13px] ${text.tertiary} font-[420]`}>
                Verfugbare Termine fur {currentYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'month' ? 'year' : 'month')}
              className={`
                px-4 py-2.5 rounded-[12px] text-[13px] font-[550] transition-all duration-300
                flex items-center gap-2
              `}
              style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              {viewMode === 'month' ? <CalendarDays size={16} /> : <Calendar size={16} />}
              <span className={text.secondary}>
                {viewMode === 'month' ? 'Jahresansicht' : 'Monatsansicht'}
              </span>
            </button>
          </div>
        </div>

        {viewMode === 'month' ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className={`
                  w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                  hover:scale-105 active:scale-95
                `}
                style={{
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)'
                }}
              >
                <ChevronLeft className={text.secondary} size={20} strokeWidth={2} />
              </button>

              <div className="text-center">
                <h4 className={`text-[24px] font-[720] ${text.primary} tracking-[-0.03em]`}>
                  {MONTHS_DE[currentMonth]}
                </h4>
                <p className={`text-[14px] ${text.tertiary} font-[480]`}>{currentYear}</p>
              </div>

              <button
                onClick={handleNextMonth}
                className={`
                  w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                  hover:scale-105 active:scale-95
                `}
                style={{
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)'
                }}
              >
                <ChevronRight className={text.secondary} size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {DAYS_DE.map((day) => (
                <div key={day} className="text-center py-2">
                  <span className={`text-[12px] font-[650] ${text.tertiary} uppercase tracking-[0.05em]`}>
                    {day}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {renderMonthGrid(currentYear, currentMonth)}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentYear(currentYear - 1)}
                className={`
                  w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                  hover:scale-105 active:scale-95
                `}
                style={{
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)'
                }}
              >
                <ChevronLeft className={text.secondary} size={20} strokeWidth={2} />
              </button>

              <h4 className={`text-[28px] font-[750] ${text.primary} tracking-[-0.03em]`}>
                {currentYear}
              </h4>

              <button
                onClick={() => setCurrentYear(currentYear + 1)}
                className={`
                  w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                  hover:scale-105 active:scale-95
                `}
                style={{
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)'
                }}
              >
                <ChevronRight className={text.secondary} size={20} strokeWidth={2} />
              </button>
            </div>

            {renderYearView()}
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className={`text-[12px] ${text.tertiary} font-[480]`}>Verfugbar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span className={`text-[12px] ${text.tertiary} font-[480]`}>Teilweise belegt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400" />
          <span className={`text-[12px] ${text.tertiary} font-[480]`}>Termine vorhanden</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span className={`text-[12px] ${text.tertiary} font-[480]`}>Nicht verfugbar</span>
        </div>
      </div>

      {selectedDate && (
        <div
          className="p-5 rounded-[20px] flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(250, 204, 21, 0.05) 100%)',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            boxShadow: '0 0 30px rgba(250, 204, 21, 0.1)'
          }}
        >
          <div
            className="w-14 h-14 rounded-[16px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.3) 0%, rgba(250, 204, 21, 0.15) 100%)',
              border: '1px solid rgba(250, 204, 21, 0.4)'
            }}
          >
            <CalendarCheck className="text-yellow-400" size={28} strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className={`text-[13px] ${text.tertiary} font-[500] mb-1`}>Ausgewahlter Termin</p>
            <p className="text-[18px] font-[680] text-yellow-400 tracking-[-0.02em]">
              {new Date(selectedDate).toLocaleDateString('de-DE', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <CheckCircle2 className="text-yellow-400" size={28} strokeWidth={2} />
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[28px]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <span className={`${text.secondary} font-[480]`}>Lade Verfugbarkeit...</span>
          </div>
        </div>
      )}
    </div>
  );
}
