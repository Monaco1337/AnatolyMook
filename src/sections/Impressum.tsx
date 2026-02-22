import { Building2, Phone, Mail, Scale, ShieldCheck, AlertCircle, FileText, Link2, Copyright, UserCheck, Globe, Shield, AlertTriangle } from 'lucide-react';

interface SectionContent {
  label: string;
  value: string;
  link?: string;
  isText?: boolean;
  isLink?: boolean;
}

interface Section {
  icon: any;
  title: string;
  subtitle?: string;
  content: SectionContent[];
}

export default function Impressum() {
  const sections: Section[] = [
    {
      icon: Building2,
      title: 'Angaben gemäß § 5 TMG',
      content: [
        { label: 'Unternehmen', value: 'Anatoly Mook Academy' },
        { label: 'Inhaber', value: 'Anatoly Mook' },
        { label: 'Anschrift', value: 'Ackerstraße 56, 59423 Unna' }
      ]
    },
    {
      icon: Phone,
      title: 'Kontakt',
      content: [
        { label: 'Telefon', value: '02303 334 0628', link: 'tel:023033340628' },
        { label: 'E-Mail', value: 'mail@anatoly-mook.de', link: 'mailto:mail@anatoly-mook.de' },
        { label: 'Website', value: 'www.anatoly-mook.de' }
      ]
    },
    {
      icon: UserCheck,
      title: 'Verantwortlich für den Inhalt',
      subtitle: 'nach § 55 Abs. 2 RStV',
      content: [
        { label: 'Redaktionell verantwortlich', value: 'Anatoly Mook' },
        { label: 'Anschrift', value: 'Ackerstraße 56, 59423 Unna' }
      ]
    },
    {
      icon: Scale,
      title: 'EU-Streitschlichtung',
      content: [
        {
          label: 'Online-Streitbeilegung',
          value: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Die Plattform finden Sie unter folgendem Link. Unsere E-Mail-Adresse finden Sie oben im Impressum.',
          isText: true
        },
        {
          label: 'OS-Plattform',
          value: 'https://ec.europa.eu/consumers/odr',
          link: 'https://ec.europa.eu/consumers/odr/',
          isLink: true
        }
      ]
    },
    {
      icon: AlertCircle,
      title: 'Verbraucherstreitbeilegung / Universalschlichtungsstelle',
      content: [
        {
          label: 'Hinweis',
          value: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
          isText: true
        }
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Haftung für Inhalte',
      content: [
        {
          label: '§ 7 Abs. 1 TMG',
          value: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
          isText: true
        },
        {
          label: 'Hinweis',
          value: 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
          isText: true
        }
      ]
    },
    {
      icon: Link2,
      title: 'Haftung für Links',
      content: [
        {
          label: 'Externe Links',
          value: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
          isText: true
        },
        {
          label: 'Rechtsprüfung',
          value: 'Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
          isText: true
        }
      ]
    },
    {
      icon: Copyright,
      title: 'Urheberrecht',
      content: [
        {
          label: 'Eigene Inhalte',
          value: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
          isText: true
        },
        {
          label: 'Downloads & Kopien',
          value: 'Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
          isText: true
        }
      ]
    },
    {
      icon: Shield,
      title: 'Datenschutz',
      content: [
        {
          label: 'DSGVO-Konformität',
          value: 'Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.',
          isText: true
        },
        {
          label: 'Datensicherheit',
          value: 'Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Detaillierte Informationen zum Umgang mit Nutzerdaten finden Sie in unserer Datenschutzerklärung.',
          isText: true
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Haftungsausschluss',
      content: [
        {
          label: 'Gewährleistung',
          value: 'Die Informationen auf dieser Website wurden mit größter Sorgfalt zusammengestellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte verantwortlich, jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.',
          isText: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#000000] to-[#0a0a0a]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)',
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <div className="relative">
        <div className="max-w-[900px] mx-auto px-6 pt-32 pb-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div
                className="relative w-[52px] h-[52px] rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: `
                    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                    0 8px 24px rgba(0, 0, 0, 0.4)
                  `
                }}
              >
                <div
                  className="absolute -inset-12 rounded-full opacity-20 blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(250, 204, 21, 0.2) 0%, transparent 70%)'
                  }}
                />
                <ShieldCheck
                  size={26}
                  className="text-yellow-400/80 relative z-10"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <h1
              className="text-[48px] lg:text-[64px] font-[700] tracking-[-0.04em] mb-5"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.75) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Impressum
            </h1>

            <p className="text-white/35 text-[14px] font-[450] leading-[1.7] tracking-[0.01em] max-w-[520px] mx-auto">
              Rechtliche Informationen gemäß den gesetzlichen Bestimmungen
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;

              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: `
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.06),
                      0 4px 16px rgba(0, 0, 0, 0.3)
                    `
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8 lg:p-10">
                    <div className="flex items-start gap-6">
                      <div
                        className="relative flex-shrink-0 w-[48px] h-[48px] rounded-xl flex items-center justify-center transition-all duration-500"
                        style={{
                          background: 'rgba(250, 204, 21, 0.06)',
                          border: '1px solid rgba(250, 204, 21, 0.12)',
                          boxShadow: 'inset 0 1px 0 0 rgba(250, 204, 21, 0.15)'
                        }}
                      >
                        <Icon
                          size={22}
                          className="text-yellow-400/70 transition-all duration-500 group-hover:text-yellow-400/90"
                          strokeWidth={1.5}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="mb-6">
                          <h2 className="text-white/90 text-[18px] font-[600] tracking-[-0.02em]">
                            {section.title}
                          </h2>
                          {section.subtitle && (
                            <p className="text-white/40 text-[12px] font-[500] tracking-[0.01em] mt-1.5">
                              {section.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="space-y-5">
                          {section.content.map((item, itemIdx) => (
                            <div key={itemIdx}>
                              {item.isText ? (
                                <div>
                                  <div className="text-white/40 text-[11px] font-[600] tracking-[0.12em] uppercase mb-2">
                                    {item.label}
                                  </div>
                                  <p className="text-white/55 text-[14px] font-[450] leading-[1.7] tracking-[0.005em]">
                                    {item.value}
                                  </p>
                                </div>
                              ) : item.isLink ? (
                                <div>
                                  <div className="text-white/40 text-[11px] font-[600] tracking-[0.12em] uppercase mb-2">
                                    {item.label}
                                  </div>
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-yellow-400/70 hover:text-yellow-400/90 text-[14px] font-[500] tracking-[0.005em] transition-colors duration-300 underline underline-offset-4 decoration-yellow-400/30 hover:decoration-yellow-400/60"
                                  >
                                    {item.value}
                                  </a>
                                </div>
                              ) : (
                                <div className="flex items-baseline justify-between gap-6">
                                  <span className="text-white/40 text-[11px] font-[600] tracking-[0.12em] uppercase flex-shrink-0">
                                    {item.label}
                                  </span>
                                  {item.link ? (
                                    <a
                                      href={item.link}
                                      className="text-white/65 hover:text-yellow-400/80 text-[14px] font-[500] tracking-[0.005em] text-right transition-colors duration-300"
                                    >
                                      {item.value}
                                    </a>
                                  ) : (
                                    <span className="text-white/65 text-[14px] font-[500] tracking-[0.005em] text-right">
                                      {item.value}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div
              className="inline-block px-6 py-3 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <p className="text-white/30 text-[12px] font-[450] tracking-[0.01em]">
                Stand: Dezember 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
