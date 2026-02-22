import { useState, useEffect } from 'react';
import {
  Calendar, Users, Target, Send, CheckCircle, ArrowRight, ArrowLeft,
  Sparkles, Zap, TrendingUp, Award, Clock, MapPin, Check, X, Phone, Mail,
  BookOpen, Briefcase, Star, Loader2, ChevronRight, Crown, Diamond, Gem,
  Flame, Sun, Compass, Shield, Globe, Rocket, Trophy, Heart, Brain,
  Infinity, Hexagon, Pentagon, Orbit, Atom, Lightbulb, Eye, Wind,
  Mountain, Waves, CircleDot, Fingerprint, ScanFace, Layers, Box
} from 'lucide-react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import BookingCalendar from '../components/BookingCalendar';

type BookingStep = 'category' | 'service' | 'details' | 'contact' | 'confirmation';
type BookingCategory = 'seminars' | 'coaching' | 'corporate';

interface Seminar {
  id: string;
  format: string;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  price: string;
  capacity: string;
  dates: any[];
  description: string;
  essence: string;
  includes: string[];
  transformationen: string[];
  module: any[];
  gradient: string;
  image: string;
  is_active: boolean;
  order_index: number;
}

interface CoachingPackage {
  id: string;
  tier: string;
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
  benefits: string[];
  perfect_for: string[];
  gradient: string;
  image: string;
  highlight: boolean;
  is_active: boolean;
  order_index: number;
}

interface CorporateOffer {
  id: string;
  category: string;
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
  benefits: string[];
  ideal_for: string[];
  program_outline: any[];
  gradient: string;
  image: string;
  highlight: boolean;
  is_active: boolean;
  order_index: number;
}

export default function Booking() {
  const { theme, text } = useThemeStyles();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<BookingStep>('category');
  const [selectedCategory, setSelectedCategory] = useState<BookingCategory | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedServiceData, setSelectedServiceData] = useState<Seminar | CoachingPackage | CorporateOffer | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [coachingPackages, setCoachingPackages] = useState<CoachingPackage[]>([]);
  const [corporateOffers, setCorporateOffers] = useState<CorporateOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    date: '',
    audience: '',
    budget: '',
    location: '',
    objective: '',
    message: '',
    terms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [seminarsRes, coachingRes, corporateRes] = await Promise.all([
        supabase.from('seminars').select('*').eq('is_active', true).order('order_index'),
        supabase.from('coaching_packages').select('*').eq('is_active', true).order('order_index'),
        supabase.from('corporate_offers').select('*').eq('is_active', true).order('order_index')
      ]);

      if (seminarsRes.data) setSeminars(seminarsRes.data);
      if (coachingRes.data) setCoachingPackages(coachingRes.data);
      if (corporateRes.data) setCorporateOffers(corporateRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: BookingCategory) => {
    setSelectedCategory(category);
    setCurrentStep('service');
  };

  const handleServiceSelect = (serviceId: string, serviceData: Seminar | CoachingPackage | CorporateOffer) => {
    setSelectedService(serviceId);
    setSelectedServiceData(serviceData);
    setTimeout(() => setCurrentStep('details'), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const serviceTypeName = selectedCategory === 'seminars'
        ? `Seminar: ${selectedServiceData?.title}`
        : selectedCategory === 'coaching'
        ? `Coaching: ${selectedServiceData?.title}`
        : `Corporate: ${selectedServiceData?.title}`;

      const { error } = await supabase.from('bookings').insert({
        service_type: serviceTypeName,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        company: formData.company,
        role: formData.role,
        event_date: formData.date || null,
        location: formData.location,
        audience_size: formData.audience,
        budget: formData.budget,
        objective: formData.objective,
        message: formData.message,
        status: 'pending',
        priority: 'high'
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Es gab einen Fehler beim Absenden. Bitte versuchen Sie es erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const resetBooking = () => {
    setSubmitted(false);
    setCurrentStep('category');
    setSelectedCategory(null);
    setSelectedService('');
    setSelectedServiceData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      date: '',
      audience: '',
      budget: '',
      location: '',
      objective: '',
      message: '',
      terms: false
    });
  };

  const getSteps = () => {
    return [
      { id: 'category', label: 'Kategorie', number: 1 },
      { id: 'service', label: 'Auswahl', number: 2 },
      { id: 'details', label: 'Details', number: 3 },
      { id: 'contact', label: t.contact.title, number: 4 },
      { id: 'confirmation', label: t.common.confirm, number: 5 }
    ];
  };

  const steps = getSteps();
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const categories = [
    {
      id: 'seminars' as BookingCategory,
      icon: Flame,
      accentIcon: Sun,
      secondaryIcon: Sparkles,
      title: 'Seminare',
      subtitle: 'Transformative Erlebnisse',
      description: 'Intensive Seminare und Workshops fur tiefgreifende personliche Entwicklung und nachhaltigen Wandel',
      count: seminars.length,
      accentColor: 'from-amber-400 via-yellow-400 to-orange-400',
      glowColor: 'rgba(251, 191, 36, 0.4)',
      bgGradient: 'from-amber-500/8 via-yellow-500/5 to-orange-500/8',
      features: [
        { text: 'Prasenzseminare', icon: Mountain },
        { text: 'Online Live', icon: Orbit },
        { text: 'On-Demand', icon: Infinity },
        { text: 'Hybrid-Formate', icon: Layers }
      ]
    },
    {
      id: 'coaching' as BookingCategory,
      icon: Compass,
      accentIcon: Crown,
      secondaryIcon: Heart,
      title: 'Coaching',
      subtitle: '1:1 Begleitung',
      description: 'Individuelles Coaching fur maximale Transformation und nachhaltige Veranderung auf hochstem Niveau',
      count: coachingPackages.length,
      accentColor: 'from-emerald-400 via-teal-400 to-cyan-400',
      glowColor: 'rgba(52, 211, 153, 0.4)',
      bgGradient: 'from-emerald-500/8 via-teal-500/5 to-cyan-500/8',
      features: [
        { text: 'Einzel-Coaching', icon: Fingerprint },
        { text: 'Executive Coaching', icon: Crown },
        { text: 'Team-Coaching', icon: Users },
        { text: 'Online Sessions', icon: Globe }
      ]
    },
    {
      id: 'corporate' as BookingCategory,
      icon: Hexagon,
      accentIcon: Diamond,
      secondaryIcon: Rocket,
      title: 'Corporate',
      subtitle: 'Unternehmensprogramme',
      description: 'Massgeschneiderte Programme fur Teams und Organisationen, die Exzellenz anstreben',
      count: corporateOffers.length,
      accentColor: 'from-sky-400 via-blue-400 to-cyan-400',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      bgGradient: 'from-sky-500/8 via-blue-500/5 to-cyan-500/8',
      features: [
        { text: 'Workshops', icon: Lightbulb },
        { text: 'Leadership Training', icon: Trophy },
        { text: 'Team Retreats', icon: Mountain },
        { text: 'Transformation', icon: Atom }
      ]
    }
  ];

  const budgetRanges = [
    'Bis €5.000',
    '€5.000 - €10.000',
    '€10.000 - €25.000',
    '€25.000 - €50.000',
    '€50.000+',
    'Auf Anfrage'
  ];

  if (submitted) {
    return (
      <div className={`${theme === 'dark' ? 'bg-black' : 'bg-stone-50'} min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-[800px] w-full text-center relative z-10">
          <div className="mb-12 relative inline-block">
            <div className="absolute inset-0 blur-[100px] bg-yellow-400/40 rounded-full animate-pulse" />
            <div className="relative w-36 h-36 rounded-[32px] flex items-center justify-center mx-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.25) 0%, rgba(250, 204, 21, 0.1) 100%)',
                backdropFilter: 'blur(60px)',
                WebkitBackdropFilter: 'blur(60px)',
                border: '1px solid rgba(250, 204, 21, 0.4)',
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.3),
                  0 0 80px rgba(250, 204, 21, 0.3),
                  0 20px 60px rgba(250, 204, 21, 0.2)
                `
              }}
            >
              <CheckCircle className="text-yellow-400" size={72} strokeWidth={1.5} />
            </div>
          </div>

          <h2 className={`text-[52px] lg:text-[72px] font-[800] ${text.primary} mb-7 tracking-[-0.05em] leading-[0.95]`}>
            {t.booking.bookingSuccess}
          </h2>

          <p className={`text-[20px] ${text.secondary} font-[420] leading-[1.75] mb-12 max-w-[600px] mx-auto tracking-[-0.015em]`}>
            {t.contact.successMessage}
          </p>

          <div className="p-8 rounded-[28px] mb-10 inline-block"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            <p className={`${text.tertiary} font-[420] text-[15px] mb-2`}>Bestatigungsmail gesendet an</p>
            <p className="text-yellow-400 font-[620] text-[18px] tracking-[-0.015em]">{formData.email}</p>
          </div>

          <button
            onClick={resetBooking}
            className="group relative h-[60px] px-[32px] rounded-[18px] text-[15px] font-[600] overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(250, 204, 21, 0.08) 100%)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              boxShadow: '0 0 30px rgba(250, 204, 21, 0.15)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3 text-yellow-400">
              Neue Buchung starten
              <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-stone-50'} min-h-screen relative`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-yellow-500/[0.03] to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[80px]" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-orange-500/[0.02] rounded-full blur-[80px]" />
      </div>

      <section className="relative py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full mb-10"
              style={{
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(250, 204, 21, 0.05) 100%)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(250, 204, 21, 0.3)',
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.25),
                  0 0 50px rgba(250, 204, 21, 0.2),
                  0 8px 24px rgba(250, 204, 21, 0.15)
                `
              }}
            >
              <div className="relative">
                <Diamond size={18} className="text-yellow-400" strokeWidth={2} />
                <Sparkles size={10} className="text-yellow-300 absolute -top-1 -right-1" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-[700] tracking-[0.12em] text-yellow-400 uppercase">
                Premium Booking
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
            </div>

            <h1 className={`text-[56px] lg:text-[80px] font-[800] ${text.primary} mb-8 tracking-[-0.05em] leading-[0.95]`}>
              {t.booking.title}
            </h1>
            <p className={`text-[20px] lg:text-[22px] ${text.secondary} font-[420] max-w-[800px] mx-auto leading-[1.7] tracking-[-0.015em]`}>
              {t.booking.subtitle}
            </p>
          </div>

          <div className="max-w-[1000px] mx-auto mb-24">
            <div className="flex items-center justify-between relative">
              <div className={`absolute top-1/2 left-0 right-0 h-[2px] ${theme === 'dark' ? 'bg-white/[0.06]' : 'bg-stone-200'} -translate-y-1/2`} />
              <div
                className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 transition-all duration-1000 ease-out"
                style={{
                  width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                  background: 'linear-gradient(90deg, rgba(250, 204, 21, 0.8) 0%, rgba(251, 191, 36, 1) 100%)',
                  boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)'
                }}
              />

              {steps.map((step, index) => {
                const isActive = currentStepIndex >= index;
                const isCurrent = currentStep === step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center gap-4 relative z-10">
                    <div
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-[18px] flex items-center justify-center transition-all duration-700 relative"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(250, 204, 21, 0.25) 0%, rgba(250, 204, 21, 0.1) 100%)'
                          : theme === 'dark'
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(0, 0, 0, 0.03)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: isActive ? '1.5px solid rgba(250, 204, 21, 0.4)' : `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
                        boxShadow: isActive
                          ? `0 0 40px rgba(250, 204, 21, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)`
                          : 'none',
                        transform: isCurrent ? 'scale(1.15)' : 'scale(1)'
                      }}
                    >
                      {isActive ? (
                        <Check className="text-yellow-400" size={26} strokeWidth={2.5} />
                      ) : (
                        <span className={`${theme === 'dark' ? 'text-white/30' : 'text-stone-400'} font-[650] text-[18px]`}>{step.number}</span>
                      )}
                    </div>
                    <span className={`text-[12px] lg:text-[13px] font-[${isCurrent ? '650' : '480'}] tracking-[-0.01em] transition-all duration-500 hidden md:block ${
                      isActive ? 'text-yellow-400' : theme === 'dark' ? 'text-white/30' : 'text-stone-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 blur-[40px] bg-yellow-400/30 rounded-full animate-pulse" />
              <Loader2 className="w-16 h-16 text-yellow-400 animate-spin relative z-10" />
            </div>
            <p className={`${text.secondary} font-[450] text-[17px]`}>Angebote werden geladen...</p>
          </div>
        </div>
      ) : (
        <>
          {currentStep === 'category' && (
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32 relative z-10">
              <div className="text-center mb-16">
                <h2 className={`text-[44px] lg:text-[56px] font-[750] ${text.primary} mb-6 tracking-[-0.04em]`}>
                  Was mochten Sie buchen?
                </h2>
                <p className={`text-[18px] lg:text-[20px] ${text.secondary} font-[420] max-w-[700px] mx-auto leading-[1.7] tracking-[-0.015em]`}>
                  Wahlen Sie die Kategorie, die am besten zu Ihren Zielen passt
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 max-w-[1300px] mx-auto">
                {categories.map((cat) => {
                  const isHovered = hoveredCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className="group text-left relative"
                    >
                      <div
                        className="absolute -inset-[1px] rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `linear-gradient(135deg, ${cat.glowColor} 0%, transparent 50%, ${cat.glowColor} 100%)`,
                          filter: 'blur(1px)'
                        }}
                      />

                      <div
                        className="relative p-10 rounded-[36px] transition-all duration-700 overflow-hidden h-full"
                        style={{
                          background: theme === 'dark'
                            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
                            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                          backdropFilter: 'blur(80px) saturate(200%)',
                          WebkitBackdropFilter: 'blur(80px) saturate(200%)',
                          border: theme === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.08)'
                            : '1px solid rgba(0, 0, 0, 0.05)',
                          boxShadow: theme === 'dark'
                            ? `
                              inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                              0 25px 50px -12px rgba(0, 0, 0, 0.5),
                              0 0 0 1px rgba(255, 255, 255, 0.03)
                            `
                            : `
                              inset 0 1px 0 0 rgba(255, 255, 255, 1),
                              0 25px 50px -12px rgba(0, 0, 0, 0.08)
                            `,
                          transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)'
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                        <div
                          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: `linear-gradient(90deg, transparent 0%, ${cat.glowColor} 50%, transparent 100%)`
                          }}
                        />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-8">
                            <div className="relative">
                              <div
                                className="absolute -inset-3 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{
                                  background: `radial-gradient(circle at center, ${cat.glowColor.replace('0.4', '0.3')} 0%, transparent 70%)`,
                                  filter: 'blur(12px)'
                                }}
                              />
                              <div
                                className="relative w-22 h-22 rounded-[26px] flex items-center justify-center transition-all duration-700 overflow-visible"
                                style={{
                                  width: '88px',
                                  height: '88px',
                                  background: `linear-gradient(135deg, ${cat.glowColor.replace('0.4', '0.18')} 0%, ${cat.glowColor.replace('0.4', '0.06')} 100%)`,
                                  border: `1.5px solid ${cat.glowColor.replace('0.4', '0.35')}`,
                                  boxShadow: isHovered
                                    ? `0 0 60px ${cat.glowColor}, 0 0 30px ${cat.glowColor.replace('0.4', '0.3')}, inset 0 1px 2px rgba(255, 255, 255, 0.4)`
                                    : `inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 8px 24px ${cat.glowColor.replace('0.4', '0.2')}`
                                }}
                              >
                                <cat.icon
                                  className={`transition-all duration-600 ${isHovered ? 'scale-115' : 'scale-100'}`}
                                  size={40}
                                  strokeWidth={1.6}
                                  style={{
                                    color: cat.glowColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', ''),
                                    filter: isHovered ? `drop-shadow(0 0 8px ${cat.glowColor})` : 'none'
                                  }}
                                />

                                <cat.accentIcon
                                  className="absolute -top-1 -right-1 transition-all duration-500"
                                  size={20}
                                  strokeWidth={2}
                                  style={{
                                    color: cat.glowColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', ''),
                                    opacity: isHovered ? 0.9 : 0.4,
                                    transform: isHovered ? 'scale(1.15) rotate(12deg)' : 'scale(1) rotate(0deg)'
                                  }}
                                />

                                <cat.secondaryIcon
                                  className="absolute -bottom-1 -left-1 transition-all duration-600"
                                  size={16}
                                  strokeWidth={2}
                                  style={{
                                    color: cat.glowColor.replace('0.4)', '0.8)').replace('rgba', 'rgb').replace(', 0.4', ''),
                                    opacity: isHovered ? 0.7 : 0.3,
                                    transform: isHovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0deg)',
                                    transitionDelay: '100ms'
                                  }}
                                />
                              </div>
                            </div>

                            <div
                              className="px-4 py-2 rounded-full transition-all duration-500"
                              style={{
                                background: `linear-gradient(135deg, ${cat.glowColor.replace('0.4', '0.2')} 0%, ${cat.glowColor.replace('0.4', '0.1')} 100%)`,
                                border: `1px solid ${cat.glowColor.replace('0.4', '0.3')}`,
                                boxShadow: isHovered ? `0 0 20px ${cat.glowColor.replace('0.4', '0.3')}` : 'none'
                              }}
                            >
                              <span className="text-[13px] font-[700] tracking-wide" style={{ color: cat.glowColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', '') }}>
                                {cat.count} verfugbar
                              </span>
                            </div>
                          </div>

                          <h3 className={`text-[32px] font-[750] ${text.primary} mb-3 tracking-[-0.03em]`}>
                            {cat.title}
                          </h3>

                          <p className="text-[16px] font-[550] mb-5 tracking-[-0.01em]" style={{ color: cat.glowColor.replace('0.4)', '0.9)').replace('rgba', 'rgb').replace(', 0.4', '') }}>
                            {cat.subtitle}
                          </p>

                          <p className={`text-[15px] ${text.secondary} font-[420] leading-[1.75] mb-8 tracking-[-0.01em]`}>
                            {cat.description}
                          </p>

                          <div className="grid grid-cols-2 gap-3 mb-8">
                            {cat.features.map((feature, idx) => {
                              const FeatureIcon = feature.icon;
                              return (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2.5 transition-all duration-400"
                                  style={{
                                    transform: isHovered ? `translateX(${idx % 2 === 0 ? 4 : 0}px)` : 'translateX(0)',
                                    transitionDelay: `${idx * 60}ms`
                                  }}
                                >
                                  <div
                                    className="w-7 h-7 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-all duration-500"
                                    style={{
                                      background: `linear-gradient(135deg, ${cat.glowColor.replace('0.4', '0.2')} 0%, ${cat.glowColor.replace('0.4', '0.08')} 100%)`,
                                      border: `1px solid ${cat.glowColor.replace('0.4', '0.25')}`,
                                      boxShadow: isHovered ? `0 0 12px ${cat.glowColor.replace('0.4', '0.2')}` : 'none'
                                    }}
                                  >
                                    <FeatureIcon size={14} strokeWidth={2} style={{ color: cat.glowColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', '') }} />
                                  </div>
                                  <span className={`text-[13px] ${text.tertiary} font-[480]`}>{feature.text}</span>
                                </div>
                              );
                            })}
                          </div>

                          <div className={`pt-6 border-t ${theme === 'dark' ? 'border-white/[0.06]' : 'border-stone-200/80'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-[15px] ${text.secondary} font-[500]`}>
                                Alle Angebote entdecken
                              </span>
                              <div
                                className="w-12 h-12 rounded-[14px] flex items-center justify-center transition-all duration-500"
                                style={{
                                  background: isHovered
                                    ? `linear-gradient(135deg, ${cat.glowColor.replace('0.4', '0.2')} 0%, ${cat.glowColor.replace('0.4', '0.1')} 100%)`
                                    : 'transparent',
                                  border: `1px solid ${isHovered ? cat.glowColor.replace('0.4', '0.3') : 'transparent'}`,
                                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                                }}
                              >
                                <ArrowRight
                                  size={22}
                                  strokeWidth={2.5}
                                  className="transition-all duration-500"
                                  style={{
                                    color: isHovered ? cat.glowColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', '') : theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="max-w-[1000px] mx-auto mt-20">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-yellow-400/50" />
                    <span className={`text-[13px] ${text.tertiary} font-[550] uppercase tracking-[0.15em]`}>oder</span>
                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-yellow-400/50" />
                  </div>
                  <p className={`text-[17px] ${text.secondary} font-[420] max-w-[600px] mx-auto leading-[1.7]`}>
                    Starte direkt mit einem kostenlosen Erstgesprach
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <a
                    href="#contact"
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-yellow-400/50 via-amber-400/50 to-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
                    <div
                      className="relative px-8 py-6 rounded-[24px] transition-all duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.12) 0%, rgba(250, 204, 21, 0.04) 100%)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid rgba(250, 204, 21, 0.2)',
                        boxShadow: '0 0 40px rgba(250, 204, 21, 0.1)'
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                          <div
                            className="w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                            style={{
                              background: 'linear-gradient(135deg, rgba(250, 204, 21, 1) 0%, rgba(251, 191, 36, 1) 100%)',
                              boxShadow: '0 8px 32px rgba(250, 204, 21, 0.4)'
                            }}
                          >
                            <Phone className="text-black" size={24} strokeWidth={2.5} />
                          </div>
                          <div className="text-left">
                            <h3 className={`text-[19px] font-[680] ${text.primary} tracking-[-0.02em] mb-1`}>
                              Erstgesprach buchen
                            </h3>
                            <p className={`text-[14px] ${text.tertiary} font-[420]`}>
                              Kostenfrei & unverbindlich
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="text-yellow-400 group-hover:translate-x-2 transition-transform duration-500" size={22} strokeWidth={2.5} />
                      </div>
                    </div>
                  </a>

                  <a
                    href="#contact"
                    className="group relative overflow-hidden"
                  >
                    <div
                      className="relative px-8 py-6 rounded-[24px] transition-all duration-500"
                      style={{
                        background: theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 100%)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: theme === 'dark' ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                          <div
                            className="w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                            style={{
                              background: theme === 'dark'
                                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)'
                                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.03) 100%)',
                              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)'
                            }}
                          >
                            <Mail className={text.primary} size={24} strokeWidth={2.5} />
                          </div>
                          <div className="text-left">
                            <h3 className={`text-[19px] font-[680] ${text.primary} tracking-[-0.02em] mb-1`}>
                              Kontaktformular
                            </h3>
                            <p className={`text-[14px] ${text.tertiary} font-[420]`}>
                              Schreibe uns deine Anfrage
                            </p>
                          </div>
                        </div>
                        <ArrowRight className={`${text.tertiary} group-hover:translate-x-2 group-hover:text-yellow-400 transition-all duration-500`} size={22} strokeWidth={2.5} />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'service' && selectedCategory && (
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32 relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <button
                  onClick={() => setCurrentStep('category')}
                  className={`flex items-center gap-2.5 text-[15px] ${text.secondary} hover:text-yellow-400 transition-colors font-[500] group`}
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                  Zuruck zur Auswahl
                </button>
              </div>

              <div className="text-center mb-14">
                <h2 className={`text-[44px] lg:text-[56px] font-[750] ${text.primary} mb-6 tracking-[-0.04em]`}>
                  {selectedCategory === 'seminars' && 'Seminare & Workshops'}
                  {selectedCategory === 'coaching' && 'Coaching-Pakete'}
                  {selectedCategory === 'corporate' && 'Corporate-Angebote'}
                </h2>
                <p className={`text-[18px] lg:text-[20px] ${text.secondary} font-[420] max-w-[700px] mx-auto leading-[1.7]`}>
                  Wahlen Sie das Angebot, das am besten zu Ihnen passt
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {selectedCategory === 'seminars' && seminars.map((seminar, idx) => (
                  <ServiceCard
                    key={seminar.id}
                    id={seminar.id}
                    title={seminar.title}
                    subtitle={seminar.subtitle}
                    description={seminar.description}
                    price={seminar.price}
                    duration={seminar.duration}
                    features={Array.isArray(seminar.includes) ? seminar.includes.slice(0, 4) : []}
                    highlight={false}
                    theme={theme}
                    text={text}
                    onSelect={() => handleServiceSelect(seminar.id, seminar)}
                    icon={[Flame, Sun, Lightbulb, Brain, Mountain][idx % 5]}
                    accentIcon={[Sparkles, Star, Zap][idx % 3]}
                    badge={seminar.format}
                    accentColor="rgba(251, 191, 36, 0.4)"
                  />
                ))}

                {selectedCategory === 'coaching' && coachingPackages.map((pkg, idx) => (
                  <ServiceCard
                    key={pkg.id}
                    id={pkg.id}
                    title={pkg.title}
                    subtitle={pkg.subtitle}
                    description={pkg.description}
                    price={pkg.price}
                    duration={pkg.duration}
                    features={Array.isArray(pkg.includes) ? pkg.includes.slice(0, 4) : []}
                    highlight={pkg.highlight}
                    theme={theme}
                    text={text}
                    onSelect={() => handleServiceSelect(pkg.id, pkg)}
                    icon={[Compass, Heart, Crown, Shield, Target][idx % 5]}
                    accentIcon={[Star, Diamond, Gem][idx % 3]}
                    badge={pkg.tier}
                    accentColor="rgba(52, 211, 153, 0.4)"
                  />
                ))}

                {selectedCategory === 'corporate' && corporateOffers.map((offer, idx) => (
                  <ServiceCard
                    key={offer.id}
                    id={offer.id}
                    title={offer.title}
                    subtitle={offer.subtitle}
                    description={offer.description}
                    price={offer.price}
                    duration={offer.duration}
                    features={Array.isArray(offer.includes) ? offer.includes.slice(0, 4) : []}
                    highlight={offer.highlight}
                    theme={theme}
                    text={text}
                    onSelect={() => handleServiceSelect(offer.id, offer)}
                    icon={[Hexagon, Globe, Rocket, Trophy, Atom][idx % 5]}
                    accentIcon={[Diamond, Crown, Star][idx % 3]}
                    badge={offer.category}
                    accentColor="rgba(56, 189, 248, 0.4)"
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 'details' && selectedServiceData && (
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32 relative z-10">
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                  <BookingCalendar
                    selectedDate={formData.date}
                    onDateSelect={(date) => setFormData({ ...formData, date })}
                    theme={theme}
                    text={text}
                    accentColor={
                      selectedCategory === 'seminars' ? 'rgba(251, 191, 36, 0.4)' :
                      selectedCategory === 'coaching' ? 'rgba(52, 211, 153, 0.4)' :
                      'rgba(56, 189, 248, 0.4)'
                    }
                  />

                  <div
                    className="p-8 rounded-[28px]"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                      backdropFilter: 'blur(60px)',
                      WebkitBackdropFilter: 'blur(60px)',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
                      boxShadow: theme === 'dark'
                        ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.4)'
                        : 'inset 0 1px 0 0 rgba(255, 255, 255, 1), 0 25px 50px -12px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <h2 className={`text-[24px] font-[700] ${text.primary} mb-7 tracking-[-0.03em]`}>
                      Weitere Details
                    </h2>

                    <div className="space-y-6">
                      {selectedCategory === 'corporate' && (
                        <>
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <label className={`block ${text.tertiary} text-[12px] font-[650] tracking-[0.08em] mb-3 uppercase`}>
                                Standort / Location
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="z.B. Berlin oder Remote"
                                className={`w-full px-5 py-4 rounded-[14px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[15px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                              />
                            </div>

                            <div>
                              <label className={`block ${text.tertiary} text-[12px] font-[650] tracking-[0.08em] mb-3 uppercase`}>
                                Anzahl Teilnehmer
                              </label>
                              <input
                                type="text"
                                name="audience"
                                value={formData.audience}
                                onChange={handleChange}
                                placeholder="z.B. 20 Teilnehmer"
                                className={`w-full px-5 py-4 rounded-[14px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[15px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className={`block ${text.tertiary} text-[12px] font-[650] tracking-[0.08em] mb-3 uppercase`}>
                              Budget-Rahmen
                            </label>
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className={`w-full px-5 py-4 rounded-[14px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white' : 'bg-white border-stone-200 text-stone-900'} border font-[450] text-[15px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 appearance-none cursor-pointer`}
                            >
                              <option value="" className={theme === 'dark' ? 'bg-gray-900' : ''}>Budget auswahlen</option>
                              {budgetRanges.map((range) => (
                                <option key={range} value={range} className={theme === 'dark' ? 'bg-gray-900' : ''}>
                                  {range}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}

                      <div>
                        <label className={`block ${text.tertiary} text-[12px] font-[650] tracking-[0.08em] mb-3 uppercase`}>
                          {selectedCategory === 'coaching' ? 'Coaching-Ziel' : 'Hauptziel / Erwartung'}
                        </label>
                        <input
                          type="text"
                          name="objective"
                          value={formData.objective}
                          onChange={handleChange}
                          placeholder={selectedCategory === 'coaching' ? 'Was mochten Sie erreichen?' : 'z.B. Team-Performance steigern'}
                          className={`w-full px-5 py-4 rounded-[14px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[15px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                        />
                      </div>

                      <div>
                        <label className={`block ${text.tertiary} text-[12px] font-[650] tracking-[0.08em] mb-3 uppercase`}>
                          Zusatzliche Informationen
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Erzahlen Sie uns mehr uber Ihre Situation, Herausforderungen oder spezielle Anforderungen..."
                          className={`w-full px-5 py-4 rounded-[14px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[15px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <button
                      onClick={() => setCurrentStep('service')}
                      className={`group h-[60px] px-[32px] rounded-[18px] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]`}
                      style={{
                        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <span className={`flex items-center gap-3 ${text.primary} text-[15px] font-[550]`}>
                        <ArrowLeft size={18} className="transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={2.5} />
                        {t.buttons.back}
                      </span>
                    </button>

                    <button
                      onClick={() => setCurrentStep('contact')}
                      className="group flex-1 h-[60px] px-[32px] rounded-[18px] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(250, 204, 21, 1) 0%, rgba(251, 191, 36, 1) 100%)',
                        boxShadow: '0 8px 32px rgba(250, 204, 21, 0.35)'
                      }}
                    >
                      <span className="flex items-center justify-center gap-3 text-black text-[15px] font-[650]">
                        {t.buttons.continue}
                        <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2.5} />
                      </span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit">
                  <div
                    className="p-7 rounded-[24px]"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
                      backdropFilter: 'blur(60px)',
                      WebkitBackdropFilter: 'blur(60px)',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                      boxShadow: theme === 'dark'
                        ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        : 'inset 0 1px 0 0 rgba(255, 255, 255, 1), 0 25px 50px -12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-7">
                      <h3 className={`text-[18px] font-[680] ${text.primary} tracking-[-0.02em]`}>
                        Ihre Auswahl
                      </h3>
                      <button
                        onClick={() => setCurrentStep('service')}
                        className="text-yellow-400 text-[14px] font-[550] hover:text-yellow-300 transition-colors"
                      >
                        Andern
                      </button>
                    </div>

                    <div className="relative mb-6">
                      <div
                        className="absolute -inset-2 rounded-[24px]"
                        style={{
                          background: selectedCategory === 'seminars'
                            ? 'radial-gradient(circle at center, rgba(251, 191, 36, 0.25) 0%, transparent 70%)'
                            : selectedCategory === 'coaching'
                            ? 'radial-gradient(circle at center, rgba(52, 211, 153, 0.25) 0%, transparent 70%)'
                            : 'radial-gradient(circle at center, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
                          filter: 'blur(10px)'
                        }}
                      />
                      <div
                        className="relative w-18 h-18 rounded-[22px] flex items-center justify-center"
                        style={{
                          width: '72px',
                          height: '72px',
                          background: selectedCategory === 'seminars'
                            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.08) 100%)'
                            : selectedCategory === 'coaching'
                            ? 'linear-gradient(135deg, rgba(52, 211, 153, 0.2) 0%, rgba(52, 211, 153, 0.08) 100%)'
                            : 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0.08) 100%)',
                          border: selectedCategory === 'seminars'
                            ? '1.5px solid rgba(251, 191, 36, 0.35)'
                            : selectedCategory === 'coaching'
                            ? '1.5px solid rgba(52, 211, 153, 0.35)'
                            : '1.5px solid rgba(56, 189, 248, 0.35)',
                          boxShadow: selectedCategory === 'seminars'
                            ? '0 0 40px rgba(251, 191, 36, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
                            : selectedCategory === 'coaching'
                            ? '0 0 40px rgba(52, 211, 153, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
                            : '0 0 40px rgba(56, 189, 248, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {selectedCategory === 'seminars' && <Flame className="text-yellow-400" size={32} strokeWidth={1.7} />}
                        {selectedCategory === 'coaching' && <Compass className="text-emerald-400" size={32} strokeWidth={1.7} />}
                        {selectedCategory === 'corporate' && <Hexagon className="text-sky-400" size={32} strokeWidth={1.7} />}
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className={`text-[12px] font-[650] uppercase tracking-[0.12em] ${
                        selectedCategory === 'seminars' ? 'text-yellow-400' :
                        selectedCategory === 'coaching' ? 'text-emerald-400' : 'text-sky-400'
                      }`}>
                        {selectedCategory === 'seminars' && 'Seminar'}
                        {selectedCategory === 'coaching' && 'Coaching'}
                        {selectedCategory === 'corporate' && 'Corporate'}
                      </span>
                    </div>

                    <h4 className={`text-[24px] font-[700] ${text.primary} mb-3 tracking-[-0.025em]`}>
                      {selectedServiceData.title}
                    </h4>
                    <p className={`text-[15px] ${text.tertiary} font-[420] mb-7 leading-[1.7]`}>
                      {selectedServiceData.description?.slice(0, 120)}...
                    </p>

                    <div className={`pt-6 border-t ${theme === 'dark' ? 'border-white/[0.08]' : 'border-stone-200'} space-y-4`}>
                      {'duration' in selectedServiceData && selectedServiceData.duration && (
                        <div className="flex justify-between items-center">
                          <span className={`text-[14px] ${text.tertiary} font-[480]`}>Dauer</span>
                          <span className={`text-[15px] ${text.primary} font-[550]`}>{selectedServiceData.duration}</span>
                        </div>
                      )}
                      {'price' in selectedServiceData && selectedServiceData.price && (
                        <div className="flex justify-between items-center">
                          <span className={`text-[14px] ${text.tertiary} font-[480]`}>Investition</span>
                          <span className={`text-[16px] font-[700] ${
                            selectedCategory === 'seminars' ? 'text-yellow-400' :
                            selectedCategory === 'coaching' ? 'text-emerald-400' : 'text-sky-400'
                          }`}>{selectedServiceData.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'contact' && (
            <div className="max-w-[850px] mx-auto px-6 lg:px-12 pb-32 relative z-10">
              <div
                className="p-10 lg:p-12 rounded-[36px]"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  backdropFilter: 'blur(60px)',
                  WebkitBackdropFilter: 'blur(60px)',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: theme === 'dark'
                    ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 30px 60px -15px rgba(0, 0, 0, 0.5)'
                    : 'inset 0 1px 0 0 rgba(255, 255, 255, 1), 0 30px 60px -15px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h2 className={`text-[30px] font-[720] ${text.primary} mb-10 tracking-[-0.03em]`}>
                  {t.booking.personalInfo}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block ${text.tertiary} text-[13px] font-[650] tracking-[0.08em] mb-4 uppercase`}>
                        {t.forms.name} *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Max Mustermann"
                        className={`w-full px-6 py-5 rounded-[16px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[16px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                      />
                    </div>

                    <div>
                      <label className={`block ${text.tertiary} text-[13px] font-[650] tracking-[0.08em] mb-4 uppercase`}>
                        {t.forms.email} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="max@unternehmen.de"
                        className={`w-full px-6 py-5 rounded-[16px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[16px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block ${text.tertiary} text-[13px] font-[650] tracking-[0.08em] mb-4 uppercase`}>
                        {t.forms.phone} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+49 XXX XXXXXXX"
                        className={`w-full px-6 py-5 rounded-[16px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[16px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                      />
                    </div>

                    <div>
                      <label className={`block ${text.tertiary} text-[13px] font-[650] tracking-[0.08em] mb-4 uppercase`}>
                        Unternehmen
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Ihre Firma GmbH"
                        className={`w-full px-6 py-5 rounded-[16px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[16px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block ${text.tertiary} text-[13px] font-[650] tracking-[0.08em] mb-4 uppercase`}>
                      Ihre Position
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="z.B. CEO, Geschaftsfuhrer, Manager"
                      className={`w-full px-6 py-5 rounded-[16px] ${theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/25' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'} border font-[450] text-[16px] focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                    />
                  </div>

                  <div className="pt-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={formData.terms}
                          onChange={handleChange}
                          required
                          className="peer sr-only"
                        />
                        <div className={`w-6 h-6 rounded-[8px] border-2 transition-all duration-300 ${
                          formData.terms
                            ? 'bg-yellow-400 border-yellow-400'
                            : theme === 'dark'
                            ? 'bg-white/5 border-white/20 group-hover:border-yellow-400/50'
                            : 'bg-white border-stone-300 group-hover:border-yellow-400/50'
                        }`}>
                          {formData.terms && (
                            <Check className="w-full h-full text-black p-0.5" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <span className={`text-[14px] ${text.tertiary} font-[420] leading-[1.7] group-hover:${text.secondary} transition-colors`}>
                        Ich akzeptiere die <a href="#datenschutz" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">Datenschutzerklarung</a> und stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage gespeichert werden.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-5 pt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('details')}
                      className={`group h-[60px] px-[32px] rounded-[18px] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]`}
                      style={{
                        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <span className={`flex items-center gap-3 ${text.primary} text-[15px] font-[550]`}>
                        <ArrowLeft size={18} className="transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={2.5} />
                        {t.buttons.back}
                      </span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex-1 h-[60px] px-[32px] rounded-[18px] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(250, 204, 21, 1) 0%, rgba(251, 191, 36, 1) 100%)',
                        boxShadow: '0 8px 32px rgba(250, 204, 21, 0.35)'
                      }}
                    >
                      <span className="flex items-center justify-center gap-3 text-black text-[15px] font-[650]">
                        {submitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            {t.booking.confirmBooking}
                            <Send size={18} className="transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2.5} />
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  <p className={`${text.tertiary} text-[13px] font-[420] text-center pt-4`}>
                    Alle mit * markierten Felder sind Pflichtfelder. Wir melden uns innerhalb von 24h.
                  </p>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ServiceCard({
  id,
  title,
  subtitle,
  description,
  price,
  duration,
  features,
  highlight,
  theme,
  text,
  onSelect,
  icon: Icon,
  accentIcon: AccentIcon,
  badge,
  accentColor
}: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  highlight: boolean;
  theme: string;
  text: any;
  onSelect: () => void;
  icon: any;
  accentIcon?: any;
  badge?: string;
  accentColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group text-left relative"
    >
      {highlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full z-20 flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, rgba(250, 204, 21, 1) 0%, rgba(251, 191, 36, 1) 100%)',
            boxShadow: '0 4px 20px rgba(250, 204, 21, 0.4)'
          }}
        >
          <Crown size={12} className="text-black" strokeWidth={2.5} />
          <span className="text-[11px] font-[750] uppercase tracking-[0.1em] text-black">Empfohlen</span>
        </div>
      )}

      <div
        className="absolute -inset-[1px] rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, transparent 50%, ${accentColor} 100%)`,
          filter: 'blur(1px)'
        }}
      />

      <div
        className={`relative p-8 rounded-[32px] transition-all duration-700 overflow-hidden h-full ${highlight ? 'ring-2 ring-yellow-400/30' : ''}`}
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: theme === 'dark'
            ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 20px 40px -10px rgba(0, 0, 0, 0.4)'
            : 'inset 0 1px 0 0 rgba(255, 255, 255, 1), 0 20px 40px -10px rgba(0, 0, 0, 0.06)',
          transform: isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)'
        }}
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${accentColor.replace('0.4', '0.25')} 0%, transparent 70%)`,
                  filter: 'blur(8px)'
                }}
              />
              <div
                className="relative w-18 h-18 rounded-[20px] flex items-center justify-center transition-all duration-500"
                style={{
                  width: '72px',
                  height: '72px',
                  background: `linear-gradient(135deg, ${accentColor.replace('0.4', '0.18')} 0%, ${accentColor.replace('0.4', '0.06')} 100%)`,
                  border: `1.5px solid ${accentColor.replace('0.4', '0.3')}`,
                  boxShadow: isHovered ? `0 0 40px ${accentColor}, inset 0 1px 2px rgba(255, 255, 255, 0.3)` : `inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 4px 16px ${accentColor.replace('0.4', '0.15')}`,
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                }}
              >
                <Icon
                  size={32}
                  strokeWidth={1.7}
                  style={{
                    color: accentColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', ''),
                    filter: isHovered ? `drop-shadow(0 0 6px ${accentColor})` : 'none'
                  }}
                />
                {AccentIcon && (
                  <AccentIcon
                    className="absolute -top-1 -right-1 transition-all duration-400"
                    size={16}
                    strokeWidth={2.5}
                    style={{
                      color: accentColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', ''),
                      opacity: isHovered ? 0.9 : 0.5,
                      transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)'
                    }}
                  />
                )}
              </div>
            </div>
            {badge && (
              <span
                className="px-3.5 py-1.5 rounded-full text-[11px] font-[650] uppercase tracking-[0.08em]"
                style={{
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'
                }}
              >
                {badge}
              </span>
            )}
          </div>

          <h3 className={`text-[22px] font-[700] ${text.primary} mb-2 tracking-[-0.025em] leading-tight`}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-[14px] font-[550] mb-4 tracking-[-0.01em]" style={{ color: accentColor.replace('0.4)', '0.85)').replace('rgba', 'rgb').replace(', 0.4', '') }}>
              {subtitle}
            </p>
          )}

          <p className={`text-[14px] ${text.secondary} font-[420] leading-[1.75] mb-6 line-clamp-3`}>
            {description}
          </p>

          {features.length > 0 && (
            <div className="space-y-2.5 mb-6">
              {features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div
                    className="w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor.replace('0.4', '0.2')} 0%, ${accentColor.replace('0.4', '0.08')} 100%)`,
                      border: `1px solid ${accentColor.replace('0.4', '0.25')}`
                    }}
                  >
                    <Check size={10} strokeWidth={3} style={{ color: accentColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', '') }} />
                  </div>
                  <span className={`text-[13px] ${text.tertiary} font-[450] line-clamp-1`}>{typeof feature === 'string' ? feature : ''}</span>
                </div>
              ))}
            </div>
          )}

          <div className={`flex items-center justify-between pt-5 border-t ${theme === 'dark' ? 'border-white/[0.06]' : 'border-stone-200/80'}`}>
            <div className="flex flex-col">
              {duration && <span className={`text-[12px] ${text.tertiary} font-[480]`}>{duration}</span>}
              {price && <span className="text-[17px] font-[700]" style={{ color: accentColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', '') }}>{price}</span>}
            </div>
            <div
              className="w-11 h-11 rounded-[12px] flex items-center justify-center transition-all duration-500"
              style={{
                background: isHovered ? `linear-gradient(135deg, ${accentColor.replace('0.4', '0.15')} 0%, ${accentColor.replace('0.4', '0.05')} 100%)` : 'transparent',
                border: isHovered ? `1px solid ${accentColor.replace('0.4', '0.25')}` : '1px solid transparent',
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
              }}
            >
              <ArrowRight
                size={20}
                strokeWidth={2.5}
                className="transition-all duration-500"
                style={{ color: isHovered ? accentColor.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 0.4', '') : theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
