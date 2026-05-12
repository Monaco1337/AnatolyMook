import { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Building2,
  User,
  Briefcase,
  Brain,
  Mic,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";

const BRONZE = '#C99B62';
const BRONZE_MUTED = 'rgba(214,168,94,0.65)';

/** Einheitlicher dunkler Input-Stil zur Start-/Erstgespräch-Optik */
const INPUT_BASE =
  'w-full rounded-[12px] border bg-[rgba(10,9,8,0.6)] px-4 py-3.5 text-[14px] font-light outline-none transition-all duration-300 ';
const INPUT_COLORS_NORMAL = 'border-[rgba(214,168,94,0.14)] text-[rgba(248,243,232,0.92)] ';
const INPUT_PLACEHOLDER =
  'placeholder-[rgba(238,230,216,0.35)] ';
const INPUT_FOCUS =
  'focus:border-[rgba(214,168,94,0.45)] focus:shadow-[0_0_0_1px_rgba(214,168,94,0.12)]';

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
    inquiry_type: 'general',
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
    { value: 'keynote', label: 'Keynote', icon: Mic },
    { value: 'shop', label: t.nav.shop || 'Shop-Anfrage', icon: Briefcase },
    { value: 'general', label: 'Allgemein', icon: Mail },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch {
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
        [field]: validateField(field, value),
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
      newErrors.message =
        t.forms.validation?.required || 'Nachricht muss mindestens 20 Zeichen lang sein';
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
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          ...formData,
          status: 'new',
          priority: 'medium',
        },
      ]);

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
        inquiry_type: 'general',
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

  const inputClass = (
    field: keyof typeof formData | 'company' | 'phone',
    hasError?: boolean,
    isValidExtra?: boolean
  ) =>
    INPUT_BASE +
    INPUT_COLORS_NORMAL +
    INPUT_PLACEHOLDER +
    INPUT_FOCUS +
    (errors[field]
      ? ' border-[rgba(220,140,140,0.45)] '
      : isValidExtra
        ? ' border-[rgba(120,170,130,0.35)] '
        : focusedField === field
          ? ' border-[rgba(214,168,94,0.38)] '
          : ' ') +
    'pl-11';

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#050505' }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-fade { animation: fade-up 0.55s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .contact-fade { animation: none !important; }
        }
      `}</style>

      {/* Stein */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 50% 28%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.82) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(46% 36% at 50% 16%, rgba(214,168,94,0.07) 0%, rgba(0,0,0,0) 65%)',
        }}
      />

      <div
        className="relative z-[1] mx-auto w-full max-w-[960px] px-6 sm:px-8 md:px-12 lg:px-14 pt-20 sm:pt-24 md:pt-28 pb-24"
        style={{ fontFamily: FONT_BODY }}
      >
        {/* Hero */}
        <header className="contact-fade mx-auto mb-12 max-w-[560px] text-center">
          <div className="mb-5 flex justify-center gap-2.5">
            <span
              aria-hidden
              className="mt-2 block h-px w-10"
              style={{
                background: 'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.55) 100%)',
              }}
            />
            <span
              className="text-[10.5px] font-medium uppercase tracking-[0.3em]"
              style={{ color: BRONZE_MUTED }}
            >
              {t.contact.getInTouch}
            </span>
            <span
              aria-hidden
              className="mt-2 block h-px w-10"
              style={{
                background: 'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)',
              }}
            />
          </div>
          <h1
            className="m-0 mb-4 text-[2rem] font-extralight leading-tight tracking-[-0.02em] sm:text-[2.35rem]"
            style={{
              fontFamily: FONT_HEAD,
              color: 'rgba(248,243,232,0.96)',
              textShadow: '0 1px 0 rgba(20,12,6,0.5)',
            }}
          >
            {t.contact.title}
          </h1>
          <p className="m-0 text-[14.5px] font-light leading-[1.65]" style={{ color: 'rgba(244,239,230,0.62)' }}>
            {t.contact.subtitle}
          </p>
        </header>

        {/* Kontakt-Karten — inkl. Anamnese, gleiche Proportionen */}
        <div
          className="contact-fade mb-12 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
          style={{ animationDelay: '0.08s' }}
        >
          {[
            {
              Icon: Mail,
              label: t.forms.email,
              href: 'mailto:mail@anatoly-mook.de',
              value: 'mail@anatoly-mook.de',
            },
            {
              Icon: Phone,
              label: t.forms.phone,
              href: 'tel:+4923033340628',
              value: '+49 230 333 40628',
            },
            {
              Icon: MapPin,
              label: t.contact.locationLabel,
              href: undefined,
              value: 'Deutschland',
            },
          ].map((row, i) => (
            <div
              key={i}
              className="flex h-full min-h-[148px] flex-col rounded-[14px] px-4 py-4 text-center sm:text-left"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,17,14,0.72) 0%, rgba(8,7,6,0.82) 100%)',
                border: '1px solid rgba(214,168,94,0.14)',
                boxShadow: '0 14px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div className="mb-3 flex justify-center sm:justify-start">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    border: '1px solid rgba(214,168,94,0.22)',
                    color: BRONZE,
                    background: 'rgba(214,168,94,0.06)',
                  }}
                >
                  <row.Icon size={18} strokeWidth={1.65} aria-hidden />
                </span>
              </div>
              <p
                className="m-0 mb-1 text-[10px] font-medium uppercase tracking-[0.26em]"
                style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
              >
                {row.label}
              </p>
              {row.href ? (
                <a
                  href={row.href}
                  className="text-[14px] font-light underline-offset-4 transition-colors hover:opacity-95"
                  style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.88)' }}
                >
                  {row.value}
                </a>
              ) : (
                <p className="m-0 text-[14px] font-light" style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.85)' }}>
                  {row.value}
                </p>
              )}
            </div>
          ))}

          <Link
            to="/anamnesis"
            className="group flex h-full min-h-[148px] flex-col rounded-[14px] px-4 py-4 text-center no-underline transition-[border-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(214,168,94,0.45)] sm:text-left"
            style={{
              background:
                'linear-gradient(180deg, rgba(20,17,14,0.72) 0%, rgba(8,7,6,0.82) 100%)',
              border: '1px solid rgba(214,168,94,0.14)',
              boxShadow: '0 14px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="mb-3 flex justify-center sm:justify-start">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 group-hover:border-[rgba(214,168,94,0.32)]"
                style={{
                  border: '1px solid rgba(214,168,94,0.22)',
                  color: BRONZE,
                  background: 'rgba(214,168,94,0.06)',
                }}
              >
                <Brain size={18} strokeWidth={1.65} aria-hidden />
              </span>
            </div>
            <p
              className="m-0 mb-1 text-[10px] font-medium uppercase tracking-[0.26em]"
              style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
            >
              {t.contact.anamnesisCardLabel}
            </p>
            <p
              className="m-0 mb-1.5 text-[14px] font-light leading-snug"
              style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.92)' }}
            >
              {t.contact.anamnesisCardTitle}
            </p>
            <p
              className="m-0 mb-auto line-clamp-2 text-[11px] font-light leading-[1.45]"
              style={{ fontFamily: FONT_BODY, color: 'rgba(238,230,216,0.48)' }}
            >
              {t.contact.anamnesisCardHint}
            </p>
            <span
              className="mt-4 inline-flex items-center justify-center gap-1.5 text-[11.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 sm:justify-start"
              style={{ fontFamily: FONT_HEAD, color: BRONZE }}
            >
              {t.contact.anamnesisCardAction}
              <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </div>

        {/* Formular */}
        <div
          className="contact-fade mx-auto rounded-[22px] p-6 sm:p-9 md:p-10"
          style={{
            animationDelay: '0.15s',
            background: 'linear-gradient(180deg, rgba(18,16,14,0.74) 0%, rgba(8,7,6,0.86) 100%)',
            border: '1px solid rgba(214,168,94,0.14)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div className="mb-8 text-center">
            <h2
              className="m-0 mb-2 text-[1.35rem] font-light tracking-[-0.01em] sm:text-[1.55rem]"
              style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.95)' }}
            >
              {t.contact.sendMessage}
            </h2>
            <p className="mx-auto m-0 max-w-[440px] text-[13.5px] font-light leading-[1.6]" style={{ color: 'rgba(238,230,216,0.55)' }}>
              Wir antworten zeitnah und vertraulich. Pflichtfelder sind mit Stern markiert.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div
              className="mb-8 rounded-[14px] border px-4 py-4"
              role="status"
              style={{
                borderColor: 'rgba(120,155,125,0.35)',
                background: 'rgba(12,28,18,0.45)',
              }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 size={22} strokeWidth={1.6} style={{ color: BRONZE, flexShrink: 0 }} />
                <div>
                  <p className="m-0 text-[14px] font-medium" style={{ color: 'rgba(244,239,232,0.92)' }}>
                    {t.forms.success}
                  </p>
                  <p className="m-0 mt-1 text-[13px] font-light leading-[1.55]" style={{ color: 'rgba(238,230,216,0.58)' }}>
                    {t.contact.successMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div
              className="mb-8 rounded-[14px] border px-4 py-4"
              role="alert"
              style={{
                borderColor: 'rgba(200,130,115,0.4)',
                background: 'rgba(28,14,12,0.45)',
              }}
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={22} strokeWidth={1.6} className="shrink-0 text-[rgba(226,165,155,0.95)]" />
                <div>
                  <p className="m-0 text-[14px] font-medium" style={{ color: 'rgba(248,238,236,0.92)' }}>
                    {t.forms.error}
                  </p>
                  <p className="m-0 mt-1 text-[13px] font-light leading-[1.55]" style={{ color: 'rgba(238,220,218,0.65)' }}>
                    {t.contact.errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-3 block text-[10.5px] font-medium uppercase tracking-[0.26em]" style={{ color: BRONZE_MUTED }}>
                {t.contact.inquiry} <span style={{ color: BRONZE }}>*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
                {inquiryTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.inquiry_type === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiry_type: type.value })}
                      className="rounded-[12px] border px-3 py-3 transition-all duration-300"
                      style={{
                        borderColor: isSelected ? 'rgba(214,168,94,0.45)' : 'rgba(214,168,94,0.12)',
                        background: isSelected
                          ? 'linear-gradient(180deg, rgba(214,168,94,0.14) 0%, rgba(120,78,42,0.12) 100%)'
                          : 'rgba(10,9,8,0.45)',
                      }}
                    >
                      <Icon
                        size={20}
                        className="mx-auto mb-1.5 block"
                        strokeWidth={1.6}
                        style={{ color: isSelected ? BRONZE : 'rgba(238,230,216,0.35)' }}
                        aria-hidden
                      />
                      <span
                        className="block text-center text-[11px] font-semibold uppercase tracking-[0.14em]"
                        style={{
                          color: isSelected ? 'rgba(248,243,232,0.95)' : 'rgba(238,230,216,0.52)',
                        }}
                      >
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 opacity-55"
                  size={16}
                  strokeWidth={1.6}
                  style={{ color: BRONZE }}
                />
                <input
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) => handleFieldChange('first_name', e.target.value)}
                  onFocus={() => setFocusedField('first_name')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClass('first_name', !!errors.first_name, !!validatedFields.first_name)}
                  placeholder={t.forms.placeholders?.name?.split?.(' ')?.[0] || 'Vorname'}
                />
                {errors.first_name && (
                  <p className="mt-2 flex items-center gap-1 text-[12px] font-medium text-[rgba(232,172,164,0.95)]">
                    <AlertCircle size={12} aria-hidden /> {errors.first_name}
                  </p>
                )}
              </div>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 opacity-55"
                  size={16}
                  strokeWidth={1.6}
                  style={{ color: BRONZE }}
                />
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => handleFieldChange('last_name', e.target.value)}
                  onFocus={() => setFocusedField('last_name')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClass('last_name', !!errors.last_name, !!validatedFields.last_name)}
                  placeholder="Nachname"
                />
                {errors.last_name && (
                  <p className="mt-2 flex items-center gap-1 text-[12px] font-medium text-[rgba(232,172,164,0.95)]">
                    <AlertCircle size={12} aria-hidden /> {errors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 opacity-55"
                  size={16}
                  strokeWidth={1.6}
                  style={{ color: BRONZE }}
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClass('email', !!errors.email, !!validatedFields.email)}
                  placeholder={t.forms.placeholders?.email || 'E-Mail'}
                />
                {errors.email && (
                  <p className="mt-2 flex items-center gap-1 text-[12px] font-medium text-[rgba(232,172,164,0.95)]">
                    <AlertCircle size={12} aria-hidden /> {errors.email}
                  </p>
                )}
              </div>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 opacity-55"
                  size={16}
                  strokeWidth={1.6}
                  style={{ color: BRONZE }}
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClass('phone')}
                  placeholder={t.forms.placeholders?.phone || 'Telefon (optional)'}
                />
                <p className="mt-1 text-[11px]" style={{ color: 'rgba(238,230,216,0.38)' }}>
                  {t.common.optional}
                </p>
              </div>
            </div>

            <div className="relative">
              <Building2
                className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 opacity-55"
                size={16}
                strokeWidth={1.6}
                style={{ color: BRONZE }}
              />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                className={inputClass('company')}
                placeholder="Unternehmen (optional)"
              />
              <p className="mt-1 text-[11px]" style={{ color: 'rgba(238,230,216,0.38)' }}>
                {t.common.optional}
              </p>
            </div>

            <div className="relative">
              <MessageCircle
                className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 opacity-55"
                size={16}
                strokeWidth={1.6}
                style={{ color: BRONZE }}
              />
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleFieldChange('subject', e.target.value)}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                className={inputClass('subject', !!errors.subject, !!validatedFields.subject)}
                placeholder={t.forms.placeholders?.subject || 'Betreff'}
              />
              {errors.subject && (
                <p className="mt-2 flex items-center gap-1 text-[12px] font-medium text-[rgba(232,172,164,0.95)]">
                  <AlertCircle size={12} aria-hidden /> {errors.subject}
                </p>
              )}
            </div>

            <div>
              <textarea
                required
                value={formData.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={6}
                className={`${INPUT_BASE} ${INPUT_COLORS_NORMAL} ${INPUT_PLACEHOLDER} ${INPUT_FOCUS} resize-none px-4 py-4 ${
                  errors.message ? 'border-[rgba(220,140,140,0.45)]' : ''
                } ${validatedFields.message && !errors.message ? 'border-[rgba(120,170,130,0.35)]' : ''} ${
                  focusedField === 'message' ? 'border-[rgba(214,168,94,0.38)]' : ''
                } border-[rgba(214,168,94,0.14)]`}
                placeholder={t.forms.placeholders?.message || 'Ihre Nachricht …'}
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11.5px]" style={{ color: 'rgba(238,230,216,0.42)' }}>
                {errors.message ? (
                  <span className="flex items-center gap-1 text-[rgba(232,172,164,0.92)]">
                    <AlertCircle size={11} aria-hidden /> {errors.message}
                  </span>
                ) : (
                  <span>{formData.message.length} Zeichen · min. 20</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-2 flex w-full items-center justify-center gap-3 rounded-[14px] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] transition-[opacity,box-shadow] duration-300 disabled:cursor-not-allowed disabled:opacity-45"
              style={{
                fontFamily: FONT_BODY,
                background:
                  'linear-gradient(180deg, rgba(214,168,94,0.96) 0%, rgba(166,116,60,0.92) 50%, rgba(120,78,40,0.95) 100%)',
                color: 'rgba(12,8,6,0.92)',
                border: '1px solid rgba(255,230,200,0.22)',
                boxShadow: '0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.16)',
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-[rgba(20,14,10,0.25)] border-t-[rgba(20,14,10,0.85)]" />
                  {t.common.loading}
                </>
              ) : (
                <>
                  <Send size={17} strokeWidth={2} className="-mt-px" aria-hidden />
                  {t.contact.sendMessage}
                  <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </>
              )}
            </button>

            <div
              className="mt-10 border-t pt-8"
              style={{ borderColor: 'rgba(214,168,94,0.1)' }}
            >
              <p
                className="m-0 mb-4 text-center text-[13px] font-light tracking-[0.01em]"
                style={{ fontFamily: FONT_BODY, color: 'rgba(238,230,216,0.5)' }}
              >
                {t.contact.orBookAppointment}
              </p>
              <Link
                to="/booking"
                className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-[13px] border px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.2em] transition-[border-color,background,color] duration-200 hover:border-[rgba(214,168,94,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(214,168,94,0.38)] sm:py-3"
                style={{
                  fontFamily: FONT_HEAD,
                  borderColor: 'rgba(214,168,94,0.22)',
                  color: 'rgba(244,239,232,0.9)',
                  background: 'rgba(10,9,8,0.45)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                {t.buttons.bookNow}
                <ArrowRight size={14} strokeWidth={2} aria-hidden />
              </Link>
            </div>

            <p className="m-0 mt-8 text-center text-[11px] font-light" style={{ color: 'rgba(238,230,216,0.38)' }}>
              SSL · DSGVO · verschlüsselte Übertragung zum Server
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
