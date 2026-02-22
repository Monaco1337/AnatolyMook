import { Mail, Linkedin, Instagram, Youtube, ArrowUp, Sparkles, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const getSectionUrl = (section: string): string => {
  const urlMap: { [key: string]: string } = {
    'home': '/',
    'about': '/about',
    'transformation': '/transformation',
    'resources': '/resources',
    'seminare': '/seminare',
    'coaching': '/coaching',
    'keynotes': '/keynotes',
    'corporate': '/corporate',
    'produkte': '/produkte',
    'kontakt': '/kontakt',
    'quiz': '/quiz',
    'anamnesis': '/anamnesis',
    'blog': '/blog',
    'faq': '/faq',
    'booking': '/booking',
    'geschaeftskunden': '/corporate',
    'impressum': '/impressum',
    'datenschutz': '/datenschutz'
  };
  return urlMap[section] || `/${section}`;
};

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    if (onNavigate && section) {
      e.preventDefault();
      onNavigate(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#000000] to-[#0a0a0a]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />

        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-400/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-px">
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(250, 204, 21, 0.2) 50%, transparent 100%)'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16">

          <div className="mb-24 sm:mb-32 md:mb-40 text-center">
            <div className="inline-block mb-8 sm:mb-10">
              <div className="relative">
                <div
                  className="absolute -inset-12 rounded-full opacity-30 blur-[80px] animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(250, 204, 21, 0.2) 0%, transparent 70%)',
                    animationDuration: '4s'
                  }}
                />
                <div
                  className="absolute -inset-8 rounded-full opacity-20 blur-[60px]"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
                  }}
                />
                <h3
                  className="relative text-[40px] sm:text-[56px] lg:text-[72px] font-[750] tracking-[-0.05em] leading-[0.95]"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 50%, rgba(250, 204, 21, 0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 80px rgba(250, 204, 21, 0.3)'
                  }}
                >
                  ANATOLY MOOK
                </h3>
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }} />
              </div>
            </div>

            <div className="max-w-[680px] mx-auto px-4 space-y-4 mb-12">
              <p className="text-white/60 text-[15px] sm:text-[17px] font-[650] leading-[1.6] tracking-[0.005em]">
                {t('footer.tagline')}
              </p>
              <p className="text-white/40 text-[14px] sm:text-[15px] font-[480] leading-[1.8] tracking-[0.005em]">
                {t('footer.description')}
              </p>
            </div>

            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              {[
                { Icon: Mail, href: 'mailto:mail@anatoly-mook.de', label: 'Email', color: 'rgba(250, 204, 21, 0.4)' },
                { Icon: Phone, href: 'tel:+491234567890', label: 'Phone', color: 'rgba(59, 130, 246, 0.4)' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'rgba(14, 118, 168, 0.4)' },
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'rgba(225, 48, 108, 0.4)' },
                { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'rgba(255, 0, 0, 0.4)' }
              ].map(({ Icon, href, label, color }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="group relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-2xl flex items-center justify-center transition-all duration-700"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    transform: 'translate3d(0, 0, 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.08) translate3d(0, 0, 0)';
                    e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.4)';
                    e.currentTarget.style.boxShadow = `0 20px 60px ${color}, inset 0 0 20px rgba(250, 204, 21, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1) translate3d(0, 0, 0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                    className="relative z-10 text-white/50 transition-all duration-700 group-hover:text-yellow-400 group-hover:scale-110 sm:w-[21px] sm:h-[21px]"
                  />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" style={{ background: color }} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 sm:gap-x-10 gap-y-12 sm:gap-y-16 mb-20 sm:mb-24 max-w-[1200px] mx-auto">

            <div>
              <h4 className="text-white/70 text-[11px] font-[680] tracking-[0.15em] mb-6 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                {t('footer.sections.offer')}
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: t('footer.links.seminars'), section: 'seminare' },
                  { label: t('footer.links.coaching'), section: 'coaching' },
                  { label: t('footer.links.corporate'), section: 'geschaeftskunden' },
                  { label: t('footer.links.products'), section: 'produkte' }
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={getSectionUrl(link.section)}
                      onClick={(e) => handleLinkClick(e, link.section)}
                      className="group relative text-white/35 hover:text-white/90 text-[13.5px] font-[500] tracking-[0.005em] transition-all duration-500 inline-flex items-center gap-2.5"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/70 text-[11px] font-[680] tracking-[0.15em] mb-6 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                {t('footer.sections.discover')}
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: t('footer.links.about'), section: 'about' },
                  { label: t('footer.links.blog'), section: 'blog' },
                  { label: t('footer.links.faq'), section: 'faq' },
                  { label: t('nav.formate'), section: 'booking' }
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={getSectionUrl(link.section)}
                      onClick={(e) => handleLinkClick(e, link.section)}
                      className="group relative text-white/35 hover:text-white/90 text-[13.5px] font-[500] tracking-[0.005em] transition-all duration-500 inline-flex items-center gap-2.5"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/70 text-[11px] font-[680] tracking-[0.15em] mb-6 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                {t('footer.sections.legal')}
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: t('footer.links.imprint'), section: 'impressum' },
                  { label: t('footer.links.privacy'), section: 'datenschutz' }
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={getSectionUrl(link.section)}
                      onClick={(e) => handleLinkClick(e, link.section)}
                      className="group relative text-white/35 hover:text-white/90 text-[13.5px] font-[500] tracking-[0.005em] transition-all duration-500 inline-flex items-center gap-2.5"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/70 text-[11px] font-[680] tracking-[0.15em] mb-6 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                {t('footer.sections.contact')}
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: t('footer.links.contact'), href: '/kontakt', section: 'kontakt' },
                  { label: t('footer.links.email'), href: 'mailto:mail@anatoly-mook.de', section: '' }
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.section ? getSectionUrl(link.section) : link.href}
                      onClick={(e) => link.section && handleLinkClick(e, link.section)}
                      className="group relative text-white/35 hover:text-white/90 text-[13.5px] font-[500] tracking-[0.005em] transition-all duration-500 inline-flex items-center gap-2.5"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/70 text-[11px] font-[680] tracking-[0.15em] mb-6 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                {t('nav.home')}
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: 'Transformation', href: '#transformation', section: 'transformation' },
                  { label: 'Consciousness Quiz', href: '#quiz', section: 'quiz' },
                  { label: 'Anamnesis', href: '#anamnesis', section: 'anamnesis' }
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.section)}
                      className="group relative text-white/35 hover:text-white/90 text-[13.5px] font-[500] tracking-[0.005em] transition-all duration-500 inline-flex items-center gap-2.5"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-500" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative pt-16 pb-8">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-px"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(250, 204, 21, 0.15) 50%, transparent 100%)'
              }}
            />

            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex flex-col items-center md:items-start gap-3">
                <p className="text-white/25 text-[12px] font-[500] tracking-[0.01em]">
                  {t('footer.copyright')}
                </p>
                <p className="text-white/15 text-[11px] font-[450] tracking-[0.01em]">
                  Designed & Developed with Excellence
                </p>
              </div>

              <button
                onClick={scrollToTop}
                className="group relative overflow-hidden rounded-2xl transition-all duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                  border: '1px solid rgba(250, 204, 21, 0.2)',
                  padding: '14px 28px',
                  backdropFilter: 'blur(20px)',
                  transform: 'translate3d(0, 0, 0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)';
                  e.currentTarget.style.transform = 'translateY(-4px) translate3d(0, 0, 0)';
                  e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.4)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(250, 204, 21, 0.2), inset 0 0 30px rgba(250, 204, 21, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)';
                  e.currentTarget.style.transform = 'translateY(0) translate3d(0, 0, 0)';
                  e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-white/10 to-yellow-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                <span className="relative flex items-center gap-3">
                  <Sparkles
                    size={15}
                    className="text-yellow-400/70 transition-all duration-700 group-hover:text-yellow-400 group-hover:rotate-180"
                    strokeWidth={2.5}
                  />
                  <span className="text-white/50 text-[13px] font-[600] tracking-[0.02em] group-hover:text-white/90 transition-all duration-700">
                    {t('footer.backToTop')}
                  </span>
                  <ArrowUp
                    size={15}
                    className="text-white/50 transition-all duration-700 group-hover:text-yellow-400 group-hover:-translate-y-2"
                    strokeWidth={2.5}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
