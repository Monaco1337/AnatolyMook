import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Check, Sparkles, MessageCircle, Building2, User, Briefcase, Brain, CheckCircle2, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validatedFields, setValidatedFields] = useState<Record<string, boolean>>({});

  const inquiryTypes = [
    { value: 'coaching', label: t.nav.coaching || 'Coaching', icon: User },
    { value: 'seminar', label: t.nav.seminare || 'Seminar', icon: MessageCircle },
    { value: 'corporate', label: t.nav.business || 'Corporate', icon: Building2 },
    { value: 'keynote', label: 'Keynote', icon: Sparkles },
    { value: 'shop', label: t.nav.shop || 'Shop-Anfrage', icon: Briefcase },
    { value: 'general', label: 'Allgemein', icon: Mail }
  ];

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load saved form data');
      }
    }
  }, []);

  useEffect(() => {
    if (submitStatus !== 'success') {
      localStorage.setItem('contactFormDraft', JSON.stringify(formData));
    } else {
      localStorage.removeItem('contactFormDraft');
    }
  }, [formData, submitStatus]);

  // Live field validation
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        return /\S+@\S+\.\S+/.test(value);
      case 'first_name':
      case 'last_name':
      case 'subject':
        return value.trim().length > 0;
      case 'message':
        return value.trim().length >= 20;
      default:
        return true;
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (value.trim()) {
      setValidatedFields({
        ...validatedFields,
        [field]: validateField(field, value)
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = t.forms.validation?.required || 'Vorname ist erforderlich';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = t.forms.validation?.required || 'Nachname ist erforderlich';
    }
    if (!formData.email.trim()) {
      newErrors.email = t.forms.validation?.required || 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.forms.validation?.email || 'Ungültige E-Mail-Adresse';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t.forms.validation?.required || 'Betreff ist erforderlich';
    }
    if (!formData.message.trim()) {
      newErrors.message = t.forms.validation?.required || 'Nachricht ist erforderlich';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = t.forms.validation?.required || 'Nachricht muss mindestens 20 Zeichen lang sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          ...formData,
          status: 'new',
          priority: 'medium'
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiry_type: 'general'
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes success-scale {
          0% { transform: scale(0.8) rotate(-5deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
          50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.6); }
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.7s ease-out; }
        .animate-success { animation: success-scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-icon-bounce { animation: icon-bounce 2s ease-in-out infinite; }

        .luxury-gradient {
          background: linear-gradient(135deg,
            #FDFAF5 0%,
            #F8F3EB 20%,
            #FFF9F0 40%,
            #F5EFE7 60%,
            #FAF6F1 80%,
            #FDFAF5 100%
          );
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(212, 175, 55, 0.15);
        }

        .glass-card-premium {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 250, 240, 0.95) 100%
          );
          backdrop-filter: blur(40px) saturate(200%);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }

        .glass-card-premium::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg,
            rgba(212, 175, 55, 0.3),
            rgba(251, 191, 36, 0.2),
            rgba(212, 175, 55, 0.3)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .shimmer-text {
          background: linear-gradient(90deg,
            #8B7355 0%,
            #D4AF37 20%,
            #F5E6D3 40%,
            #FFD700 50%,
            #F5E6D3 60%,
            #D4AF37 80%,
            #8B7355 100%
          );
          background-size: 300% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .input-premium {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .input-premium:focus {
          transform: translateY(-3px);
          box-shadow:
            0 12px 32px rgba(212, 175, 55, 0.15),
            0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .input-premium:hover:not(:focus) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }

        .floating-label {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .floating-label-active {
          transform: translateY(-28px) scale(0.85);
          color: #D4AF37;
          font-weight: 600;
        }

        .inquiry-type-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .inquiry-type-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(212, 175, 55, 0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .inquiry-type-card:hover {
          transform: translateY(-6px) scale(1.02);
        }

        .inquiry-type-card:hover::before {
          opacity: 1;
        }

        .btn-premium {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .btn-premium::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .btn-premium:hover::before {
          transform: translateX(100%);
        }

        .btn-premium:hover {
          transform: scale(1.03) translateY(-2px);
          box-shadow:
            0 20px 50px rgba(212, 175, 55, 0.4),
            0 0 60px rgba(212, 175, 55, 0.2);
        }

        .validation-icon {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div className="luxury-gradient min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-32 pb-32">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="text-amber-600" size={18} />
              <span className="text-sm font-medium text-stone-700">{t.contact.getInTouch}</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
              <span className="shimmer-text">{t.contact.title}</span>
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-fade-in-up group" style={{ animationDelay: '100ms' }}>
              <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-600 to-amber-400 text-white mb-4 sm:mb-6 shadow-xl group-hover:shadow-amber-400/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Mail size={28} strokeWidth={2.5} className="sm:w-9 sm:h-9 animate-icon-bounce" />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 mb-2 sm:mb-3">{t.forms.email}</h3>
              <a href="mailto:mail@anatoly-mook.de" className="text-amber-600 hover:text-amber-700 transition-colors text-sm sm:text-base md:text-lg font-semibold block break-all">
                mail@anatoly-mook.de
              </a>
            </div>

            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-fade-in-up group" style={{ animationDelay: '200ms' }}>
              <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-600 to-amber-400 text-white mb-4 sm:mb-6 shadow-xl group-hover:shadow-amber-400/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Phone size={28} strokeWidth={2.5} className="sm:w-9 sm:h-9 animate-icon-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 mb-2 sm:mb-3">{t.forms.phone}</h3>
              <a href="tel:+491234567890" className="text-amber-600 hover:text-amber-700 transition-colors text-sm sm:text-base md:text-lg font-semibold block">
                +49 123 456 7890
              </a>
            </div>

            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-fade-in-up group sm:col-span-2 lg:col-span-1" style={{ animationDelay: '300ms' }}>
              <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-600 to-amber-400 text-white mb-4 sm:mb-6 shadow-xl group-hover:shadow-amber-400/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <MapPin size={28} strokeWidth={2.5} className="sm:w-9 sm:h-9 animate-icon-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 mb-2 sm:mb-3">Standort</h3>
              <p className="text-stone-600 text-sm sm:text-base md:text-lg font-medium">
                Deutschland
              </p>
            </div>
          </div>

          <div className="glass-card-premium rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 max-w-5xl mx-auto animate-fade-in-up shadow-2xl" style={{ animationDelay: '400ms' }}>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/50 mb-4 sm:mb-6 shadow-lg">
                <Zap className="text-amber-600 animate-pulse" size={18} />
                <span className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wider">Premium Kontaktformular</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 mb-4 sm:mb-6 tracking-tight px-2">
                <span className="shimmer-text">Ihre Nachricht an uns</span>
              </h2>
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed px-4">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-8 sm:mb-10 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 animate-success shadow-xl">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg animate-pulse-glow flex-shrink-0">
                    <CheckCircle2 size={24} className="text-white sm:w-8 sm:h-8" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-1">{t.forms.success}</h3>
                    <p className="text-green-700 text-sm sm:text-base md:text-lg">{t.contact.successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 sm:mb-10 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 shadow-xl">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg flex-shrink-0">
                    <AlertCircle size={24} className="text-white sm:w-8 sm:h-8" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900 mb-1">{t.forms.error}</h3>
                    <p className="text-red-700 text-sm sm:text-base md:text-lg">{t.contact.errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div>
                <label className="block text-sm sm:text-base font-bold text-stone-800 mb-4 sm:mb-5 flex items-center gap-2 px-1">
                  <Sparkles size={16} className="text-amber-600 sm:w-[18px] sm:h-[18px]" />
                  {t.contact.inquiry}
                  <span className="text-amber-600">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {inquiryTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.inquiry_type === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, inquiry_type: type.value })}
                        className={`inquiry-type-card relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all shadow-lg ${
                          isSelected
                            ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-amber-200'
                            : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-xl'
                        }`}
                      >
                        <Icon
                          size={24}
                          className={`mx-auto mb-2 sm:mb-3 transition-all sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                            isSelected
                              ? 'text-amber-600 animate-icon-bounce'
                              : 'text-stone-400'
                          }`}
                          strokeWidth={isSelected ? 2.5 : 2}
                        />
                        <span className={`block text-xs sm:text-sm font-bold ${isSelected ? 'text-amber-900' : 'text-stone-700'}`}>
                          {type.label}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                            <CheckCircle2 size={16} className="text-amber-600 sm:w-5 sm:h-5" strokeWidth={2.5} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 z-10" size={20} />
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => handleFieldChange('first_name', e.target.value)}
                      onFocus={() => setFocusedField('first_name')}
                      onBlur={() => setFocusedField(null)}
                      className={`input-premium w-full pl-12 pr-12 py-4 rounded-2xl border-2 text-stone-900 font-medium text-base bg-white shadow-md ${
                        errors.first_name
                          ? 'border-red-400'
                          : validatedFields.first_name
                          ? 'border-green-400'
                          : focusedField === 'first_name'
                          ? 'border-amber-400'
                          : 'border-stone-200'
                      } focus:border-amber-500 focus:outline-none`}
                      placeholder={t.forms.placeholders?.name || 'Ihr Vorname'}
                    />
                    {validatedFields.first_name && !errors.first_name && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 validation-icon">
                        <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                  {errors.first_name && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                      <AlertCircle size={14} />
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 z-10" size={20} />
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => handleFieldChange('last_name', e.target.value)}
                      onFocus={() => setFocusedField('last_name')}
                      onBlur={() => setFocusedField(null)}
                      className={`input-premium w-full pl-12 pr-12 py-4 rounded-2xl border-2 text-stone-900 font-medium text-base bg-white shadow-md ${
                        errors.last_name
                          ? 'border-red-400'
                          : validatedFields.last_name
                          ? 'border-green-400'
                          : focusedField === 'last_name'
                          ? 'border-amber-400'
                          : 'border-stone-200'
                      } focus:border-amber-500 focus:outline-none`}
                      placeholder={t.forms.placeholders?.name || 'Ihr Nachname'}
                    />
                    {validatedFields.last_name && !errors.last_name && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 validation-icon">
                        <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                  {errors.last_name && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                      <AlertCircle size={14} />
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 z-10" size={20} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`input-premium w-full pl-12 pr-12 py-4 rounded-2xl border-2 text-stone-900 font-medium text-base bg-white shadow-md ${
                        errors.email
                          ? 'border-red-400'
                          : validatedFields.email
                          ? 'border-green-400'
                          : focusedField === 'email'
                          ? 'border-amber-400'
                          : 'border-stone-200'
                      } focus:border-amber-500 focus:outline-none`}
                      placeholder={t.forms.placeholders?.email || 'ihre.email@beispiel.com'}
                    />
                    {validatedFields.email && !errors.email && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 validation-icon">
                        <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 z-10" size={20} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className={`input-premium w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-stone-900 font-medium text-base bg-white shadow-md ${
                        focusedField === 'phone' ? 'border-amber-400' : 'border-stone-200'
                      } focus:border-amber-500 focus:outline-none`}
                      placeholder={t.forms.placeholders?.phone || '+49 123 456789'}
                    />
                  </div>
                  <p className="text-stone-500 text-xs mt-2 ml-1">{t.common.optional}</p>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 z-10" size={20} />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    className={`input-premium w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-stone-900 font-medium text-base bg-white shadow-md ${
                      focusedField === 'company' ? 'border-amber-400' : 'border-stone-200'
                    } focus:border-amber-500 focus:outline-none`}
                    placeholder="Ihr Unternehmen"
                  />
                </div>
                <p className="text-stone-500 text-xs mt-2 ml-1">{t.common.optional}</p>
              </div>

              <div className="relative">
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 z-10" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className={`input-premium w-full pl-12 pr-12 py-4 rounded-2xl border-2 text-stone-900 font-medium text-base bg-white shadow-md ${
                      errors.subject
                        ? 'border-red-400'
                        : validatedFields.subject
                        ? 'border-green-400'
                        : focusedField === 'subject'
                        ? 'border-amber-400'
                        : 'border-stone-200'
                    } focus:border-amber-500 focus:outline-none`}
                    placeholder={t.forms.placeholders?.subject || 'Worum geht es?'}
                  />
                  {validatedFields.subject && !errors.subject && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 validation-icon">
                      <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                {errors.subject && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle size={14} />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="relative">
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={7}
                    className={`input-premium w-full px-6 py-5 rounded-2xl border-2 text-stone-900 font-medium text-base bg-white shadow-md resize-none ${
                      errors.message
                        ? 'border-red-400'
                        : validatedFields.message
                        ? 'border-green-400'
                        : focusedField === 'message'
                        ? 'border-amber-400'
                        : 'border-stone-200'
                    } focus:border-amber-500 focus:outline-none`}
                    placeholder={t.forms.placeholders?.message || 'Teilen Sie uns mit, wie wir Ihnen helfen können...'}
                  />
                  {validatedFields.message && !errors.message && (
                    <div className="absolute right-5 top-5 validation-icon">
                      <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3 px-1">
                  {errors.message ? (
                    <p className="text-red-600 text-sm flex items-center gap-1 font-medium">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        formData.message.length >= 20 ? 'bg-green-500' : 'bg-stone-300'
                      }`} />
                      <p className={`text-sm font-medium ${
                        formData.message.length >= 20 ? 'text-green-600' : 'text-stone-500'
                      }`}>
                        {formData.message.length} Zeichen
                      </p>
                    </div>
                  )}
                  <p className="text-stone-500 text-xs">
                    Mindestens 20 Zeichen erforderlich
                  </p>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-premium w-full py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-white transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 shadow-2xl ${
                    isSubmitting
                      ? 'bg-stone-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-size-200 hover:bg-pos-100'
                  }`}
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 0%'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 sm:border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-base sm:text-lg">{t.common.loading}</span>
                    </>
                  ) : (
                    <>
                      <Zap size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                      <span className="text-base sm:text-lg">{t.contact.sendMessage}</span>
                      <ArrowRight size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                    </>
                  )}
                </button>

                <div className="mt-5 sm:mt-6 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-green-500 sm:w-4 sm:h-4" />
                      <span>SSL gesichert</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-stone-300" />
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-green-500 sm:w-4 sm:h-4" />
                      <span>DSGVO-konform</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-stone-300 hidden xs:block" />
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-green-500 sm:w-4 sm:h-4" />
                      <span>Verschlüsselt</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* HIGH-END SYSTEM: Anamnesebogen CTA */}
          <div className="mt-16 sm:mt-20 md:mt-24 max-w-5xl mx-auto px-4 sm:px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mb-12 sm:mb-16" />

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl sm:rounded-[2rem] blur-3xl opacity-50" />

              <div className="relative glass-card rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 border-2 border-amber-200/50 shadow-2xl">
                <div className="text-center mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/30 mb-4 sm:mb-6">
                    <Brain className="text-amber-600" size={20} />
                    <span className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wider">Premium Profiling</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-tight px-2">
                    <span className="shimmer-text">Persönlicher Anamnesebogen</span>
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl text-stone-700 max-w-3xl mx-auto font-light leading-relaxed mb-3 sm:mb-4 px-2">
                    Für Menschen, die wirklich verstanden werden wollen.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed px-2">
                    Grundlage für ein klares, passendes Coaching.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 text-xs sm:text-sm text-stone-600 px-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500" />
                    <span>3–6 Minuten</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500" />
                    <span>Vertraulich</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500" />
                    <span>Strukturiert</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500" />
                    <span>Keine Diagnose</span>
                  </div>
                </div>

                <div className="text-center px-2">
                  <a
                    href="/anamnesis"
                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251,146,60,1) 0%, rgba(249,115,22,1) 100%)',
                      boxShadow: '0 10px 40px rgba(251,146,60,0.4)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Brain className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" strokeWidth={2} />
                    <span className="relative z-10 text-base sm:text-lg md:text-xl font-bold text-white">Anamnesebogen starten</span>
                    <Sparkles className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 text-center px-4 sm:px-6">
            <p className="text-sm sm:text-base text-stone-600 mb-3 sm:mb-4">
              Oder buchen Sie direkt einen Termin
            </p>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white border border-stone-200 text-stone-900 text-sm sm:text-base font-medium hover:border-amber-500 hover:shadow-lg transition-all duration-300"
            >
              <Sparkles size={18} className="text-amber-600 sm:w-5 sm:h-5" />
              {t.buttons.bookNow}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
