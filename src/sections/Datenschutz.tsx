import { Shield, Lock, Eye, Database, Server, Cookie, Mail, Calendar, CreditCard, Users, FileText, AlertTriangle, CheckCircle, UserX, Download, Edit3, XCircle, Globe, Share2, MessageSquare, Phone, Cloud, HardDrive, Key, ShieldCheck, Info, Clock, BarChart3, Settings, Tag, Target, TrendingUp, Activity, Zap, Smartphone, Monitor, RefreshCw } from 'lucide-react';

interface DataItem {
  label: string;
  value: string;
  items?: string[];
  link?: string;
  isText?: boolean;
  isList?: boolean;
}

interface Section {
  icon: any;
  title: string;
  subtitle?: string;
  content: DataItem[];
  highlight?: boolean;
}

export default function Datenschutz() {
  const sections: Section[] = [
    {
      icon: Shield,
      title: 'Datenschutz',
      subtitle: 'Stand: Dezember 2025',
      content: [
        {
          label: 'Einleitung',
          value: 'Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie ausführlich über den Umgang mit Ihren Daten gemäß Art. 13, 14 Datenschutz-Grundverordnung (DSGVO).',
          isText: true
        },
        {
          label: 'Verantwortlicher',
          value: 'Verantwortlicher im Sinne der DSGVO ist: Anatoly Mook, Anatoly Mook Academy, Ackerstraße 56, 59423 Unna, Deutschland. E-Mail: mail@anatoly-mook.de, Telefon: 02303 334 0628',
          isText: true
        }
      ],
      highlight: true
    },
    {
      icon: Info,
      title: 'Grundsätze der Datenverarbeitung',
      subtitle: 'Art. 5 DSGVO',
      content: [
        {
          label: 'Rechtmäßigkeit und Transparenz',
          value: 'Wir verarbeiten personenbezogene Daten ausschließlich auf Grundlage gesetzlicher Bestimmungen (DSGVO, TKG 2021). Eine Datenverarbeitung erfolgt nur mit Ihrer Einwilligung oder wenn dies zur Vertragserfüllung, aufgrund rechtlicher Verpflichtungen oder zur Wahrung berechtigter Interessen erforderlich ist.',
          isText: true
        },
        {
          label: 'Zweckbindung und Datenminimierung',
          value: 'Personenbezogene Daten werden nur für festgelegte, eindeutige und rechtmäßige Zwecke erhoben. Wir erheben nur die Daten, die für den jeweiligen Zweck erforderlich sind und speichern diese nicht länger als notwendig.',
          isText: true
        },
        {
          label: 'Richtigkeit und Integrität',
          value: 'Wir treffen angemessene Maßnahmen, um sicherzustellen, dass unrichtige personenbezogene Daten unverzüglich gelöscht oder berichtigt werden. Die Verarbeitung erfolgt in einer Weise, die eine angemessene Sicherheit der Daten gewährleistet.',
          isText: true
        }
      ]
    },
    {
      icon: Server,
      title: 'Hosting und Server',
      subtitle: 'Netlify Inc.',
      content: [
        {
          label: 'Hosting-Anbieter',
          value: 'Diese Website wird bei Netlify Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA gehostet. Netlify ist unser Auftragsverarbeiter gemäß Art. 28 DSGVO. Mit Netlify wurde ein Auftragsverarbeitungsvertrag (AVV) geschlossen.',
          isText: true
        },
        {
          label: 'Server-Standort und Datenübermittlung',
          value: 'Die Server befinden sich in Rechenzentren in den USA und der EU. Netlify ist nach dem EU-U.S. Data Privacy Framework zertifiziert. Die Datenübermittlung in die USA erfolgt auf Grundlage von Art. 46 DSGVO (Standardvertragsklauseln) und Art. 45 DSGVO (Angemessenheitsbeschluss).',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Bei jedem Zugriff auf unsere Website werden automatisch Informationen erfasst und in Server-Log-Dateien gespeichert:',
          isList: true,
          items: [
            'IP-Adresse des zugreifenden Rechners',
            'Datum und Uhrzeit des Zugriffs',
            'Name und URL der abgerufenen Datei',
            'Übertragene Datenmenge',
            'Meldung über erfolgreichen Abruf (HTTP-Statuscode)',
            'Verwendeter Browser und Betriebssystem',
            'Referrer URL (zuvor besuchte Seite)',
            'Hostname des zugreifenden Rechners'
          ]
        },
        {
          label: 'Rechtsgrundlage und Zweck',
          value: 'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Unser berechtigtes Interesse liegt in der Bereitstellung, Sicherheit und Optimierung unserer Website sowie der Fehleranalyse und Missbrauchsprävention.',
          isText: true
        },
        {
          label: 'Speicherdauer',
          value: 'Die Server-Log-Daten werden für maximal 30 Tage gespeichert und anschließend automatisch gelöscht, sofern keine längere Aufbewahrung aus Sicherheitsgründen erforderlich ist.',
          isText: true
        }
      ]
    },
    {
      icon: Database,
      title: 'Datenbanken und Datenspeicherung',
      subtitle: 'Supabase Inc.',
      content: [
        {
          label: 'Datenbank-Anbieter',
          value: 'Für die Speicherung und Verwaltung von Buchungsdaten, Kundendaten und weiteren personenbezogenen Daten nutzen wir Supabase Inc., 970 Toa Payoh North, #07-04, Singapore 318992. Supabase ist unser Auftragsverarbeiter gemäß Art. 28 DSGVO.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'In unserer Datenbank werden folgende personenbezogene Daten verarbeitet:',
          isList: true,
          items: [
            'Kontaktdaten: Name, E-Mail-Adresse, Telefonnummer, Unternehmen',
            'Buchungsdaten: Gewählte Dienstleistung, Buchungsdatum, Buchungsuhrzeit, Notizen',
            'Vertragsdaten: Vertragsdetails, Rechnungsinformationen',
            'Kommunikationsdaten: Nachrichten, Anfragen, Support-Tickets',
            'Nutzungsdaten: Account-Status, Präferenzen, Einstellungen'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), lit. a DSGVO (Einwilligung) oder lit. f DSGVO (berechtigtes Interesse an der Geschäftsabwicklung und Kundenverwaltung).',
          isText: true
        },
        {
          label: 'Datensicherheit',
          value: 'Alle in Supabase gespeicherten Daten werden verschlüsselt übertragen (TLS/SSL) und im Ruhezustand verschlüsselt gespeichert (AES-256 Encryption at Rest). Der Zugriff auf die Datenbank ist durch Multi-Faktor-Authentifizierung und Row Level Security (RLS) gesichert.',
          isText: true
        },
        {
          label: 'Server-Standort',
          value: 'Die Datenbank-Server befinden sich in ISO 27001 zertifizierten Rechenzentren innerhalb der Europäischen Union (primär Deutschland und Irland). Eine Datenübermittlung in Drittländer findet nicht statt.',
          isText: true
        },
        {
          label: 'Speicherdauer',
          value: 'Kundendaten werden für die Dauer der Geschäftsbeziehung gespeichert. Nach Beendigung der Geschäftsbeziehung werden die Daten gemäß den gesetzlichen Aufbewahrungsfristen (HGB, AO) gespeichert und anschließend gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung eingewilligt haben.',
          isText: true
        }
      ]
    },
    {
      icon: Lock,
      title: 'SSL/TLS-Verschlüsselung',
      content: [
        {
          label: 'Transportverschlüsselung',
          value: 'Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.',
          isText: true
        },
        {
          label: 'Schutzumfang',
          value: 'Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden. Dies betrifft insbesondere Formulareingaben, Buchungen und Kontaktanfragen.',
          isText: true
        }
      ]
    },
    {
      icon: Calendar,
      title: 'Online-Buchungssystem',
      subtitle: 'Buchung von Vorträgen, Events und Dienstleistungen',
      content: [
        {
          label: 'Beschreibung und Umfang',
          value: 'Über unsere Website können Sie Vorträge, Events, Corporate-Dienstleistungen und persönliche Beratungen online buchen. Hierfür ist die Angabe bestimmter personenbezogener Daten erforderlich.',
          isText: true
        },
        {
          label: 'Erforderliche Daten',
          value: 'Bei einer Buchung erheben wir folgende Daten:',
          isList: true,
          items: [
            'Pflichtangaben: Vor- und Nachname, E-Mail-Adresse, Telefonnummer',
            'Optionale Angaben: Unternehmen/Organisation, Position, Anschrift',
            'Buchungsdetails: Art der Dienstleistung, gewünschtes Datum und Uhrzeit',
            'Zusätzliche Informationen: Besondere Wünsche, Notizen, Teilnehmerzahl',
            'Zeitstempel: Datum und Uhrzeit der Buchung',
            'Technische Daten: IP-Adresse zum Zeitpunkt der Buchung'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, da die Datenverarbeitung zur Erfüllung des Buchungsvertrags erforderlich ist. Ohne diese Daten können wir die Buchung nicht bearbeiten und die Dienstleistung nicht erbringen.',
          isText: true
        },
        {
          label: 'Verwendungszweck',
          value: 'Die erhobenen Daten verwenden wir ausschließlich für folgende Zwecke:',
          isList: true,
          items: [
            'Bearbeitung und Bestätigung Ihrer Buchung',
            'Kommunikation bezüglich der gebuchten Dienstleistung',
            'Versand von Buchungsbestätigungen und Erinnerungen per E-Mail',
            'Terminkoordination und Planung',
            'Rechnungsstellung und Zahlungsabwicklung',
            'Erfüllung gesetzlicher Aufbewahrungspflichten',
            'Qualitätssicherung und Kundenzufriedenheit'
          ]
        },
        {
          label: 'Weitergabe an Dritte',
          value: 'Ihre Buchungsdaten werden nicht an Dritte weitergegeben, es sei denn, dies ist zur Vertragserfüllung erforderlich (z.B. bei Co-Speakern oder Veranstaltungsorten) oder gesetzlich vorgeschrieben. Auftragsverarbeiter (Supabase, E-Mail-Provider) erhalten nur Zugriff im Rahmen eines Auftragsverarbeitungsvertrags gemäß Art. 28 DSGVO.',
          isText: true
        },
        {
          label: 'Speicherdauer',
          value: 'Buchungsdaten werden für die Dauer der Vertragsabwicklung und anschließend gemäß den gesetzlichen Aufbewahrungsfristen gespeichert (10 Jahre nach HGB/AO für steuerrechtlich relevante Unterlagen). Marketing-Einwilligungen können jederzeit widerrufen werden.',
          isText: true
        },
        {
          label: 'Automatisierte Entscheidungsfindung',
          value: 'Bei der Buchungsabwicklung findet keine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 DSGVO statt. Jede Buchung wird individuell geprüft und bearbeitet.',
          isText: true
        }
      ]
    },
    {
      icon: Mail,
      title: 'Kontaktaufnahme',
      subtitle: 'E-Mail, Telefon und Kontaktformular',
      content: [
        {
          label: 'E-Mail-Kontakt',
          value: 'Bei der Kontaktaufnahme per E-Mail (mail@anatoly-mook.de) werden die von Ihnen mitgeteilten Daten (Name, E-Mail-Adresse, Nachrichteninhalt) bei uns gespeichert, um Ihre Anfrage zu bearbeiten. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage) oder lit. b DSGVO, wenn Ihre Anfrage auf einen Vertragsabschluss abzielt.',
          isText: true
        },
        {
          label: 'Telefonischer Kontakt',
          value: 'Bei der Kontaktaufnahme per Telefon (02303 334 0628) werden keine personenbezogenen Daten automatisiert erfasst oder gespeichert, es sei denn, Sie willigen in eine Aufzeichnung ein oder wir sind gesetzlich dazu verpflichtet. Notizen zu Telefonaten werden nur zur Bearbeitung Ihres Anliegens gespeichert.',
          isText: true
        },
        {
          label: 'Kontaktformular',
          value: 'Sofern Sie ein Kontaktformular auf unserer Website nutzen, werden die eingegebenen Daten (Name, E-Mail-Adresse, Betreff, Nachricht) sowie Datum und Uhrzeit der Anfrage gespeichert. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) oder zur Vertragsanbahnung (Art. 6 Abs. 1 lit. b DSGVO).',
          isText: true
        },
        {
          label: 'Speicherdauer',
          value: 'Kontaktdaten werden gelöscht, sobald die Kommunikation abgeschlossen ist und der Zweck entfallen ist, sofern keine gesetzlichen Aufbewahrungspflichten bestehen. Bei Vertragsanbahnungen gelten die üblichen Aufbewahrungsfristen.',
          isText: true
        }
      ]
    },
    {
      icon: Cookie,
      title: 'Cookies und lokale Speicherung',
      subtitle: 'Art. 6 Abs. 1 lit. a DSGVO, § 25 TTDSG',
      content: [
        {
          label: 'Was sind Cookies?',
          value: 'Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und bestimmte Einstellungen und Daten zum Austausch mit unserem System über Ihren Browser speichern. Ein Cookie enthält in der Regel den Namen der Domain, von der die Cookie-Daten gesendet wurden, Informationen über das Alter des Cookies und einen alphanumerischen Identifikator.',
          isText: true
        },
        {
          label: 'Arten von Cookies',
          value: 'Wir unterscheiden zwischen verschiedenen Kategorien nach Zweck und Lebensdauer:',
          isList: true,
          items: [
            'Technisch notwendige Cookies (Essential): Unverzichtbar für den Betrieb der Website, Session-Management, Sicherheitsfunktionen, Load-Balancing',
            'Funktionale Cookies (Functional): Speichern Ihre Präferenzen, Spracheinstellungen, Login-Status',
            'Analyse-Cookies (Analytics): Erfassen Nutzungsstatistiken, Besucherzahlen, Verweildauer (nur mit Einwilligung)',
            'Marketing-Cookies (Marketing): Tracking über mehrere Websites, personalisierte Werbung, Remarketing (nur mit ausdrücklicher Einwilligung)',
            'Session-Cookies: Temporär, werden nach Schließen des Browsers gelöscht',
            'Persistente Cookies: Bleiben für einen festgelegten Zeitraum auf Ihrem Gerät gespeichert'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Technisch notwendige Cookies setzen wir auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb einer funktionsfähigen Website). Alle anderen Cookies und Tracking-Technologien werden nur mit Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 TTDSG (Telekommunikation-Telemedien-Datenschutz-Gesetz) gesetzt.',
          isText: true
        },
        {
          label: 'Einwilligungsmanagement (Consent Management)',
          value: 'Beim ersten Besuch unserer Website wird Ihnen ein Cookie-Banner angezeigt. Sie können frei wählen, welche Cookie-Kategorien Sie akzeptieren möchten. Ihre Einwilligung wird für 12 Monate gespeichert und kann jederzeit widerrufen werden. Ohne Ihre Einwilligung werden nur technisch notwendige Cookies gesetzt.',
          isText: true
        },
        {
          label: 'Cookie-Verwaltung und Browser-Einstellungen',
          value: 'Sie haben verschiedene Möglichkeiten, Cookies zu kontrollieren:',
          isList: true,
          items: [
            'Browser-Einstellungen: Konfigurieren Sie Ihren Browser so, dass Sie über das Setzen von Cookies informiert werden',
            'Selektive Annahme: Erlauben Sie Cookies nur im Einzelfall oder für bestimmte Websites',
            'Generelle Ablehnung: Schließen Sie die Annahme von Cookies generell aus',
            'Automatisches Löschen: Aktivieren Sie das automatische Löschen beim Schließen des Browsers',
            'Drittanbieter-Cookies blockieren: Verhindern Sie das Setzen von Cookies durch externe Dienste',
            'Cookie-Einstellungen auf unserer Website: Rufen Sie jederzeit die Cookie-Einstellungen auf, um Ihre Präferenzen zu ändern'
          ]
        },
        {
          label: 'Local Storage und Session Storage',
          value: 'Zusätzlich zu Cookies verwenden wir moderne Webspeicher-Technologien (Local Storage, Session Storage, IndexedDB). Diese ermöglichen eine verbesserte Nutzererfahrung und können mehr Daten als Cookies speichern. Die Daten bleiben lokal auf Ihrem Gerät und werden nicht automatisch bei jeder Serveranfrage übertragen. Die Rechtsgrundlage entspricht der von Cookies (§ 25 TTDSG).',
          isText: true
        },
        {
          label: 'Cookie-Details und Auflistung',
          value: 'Eine detaillierte Liste aller eingesetzten Cookies mit Name, Anbieter, Zweck und Speicherdauer finden Sie in unseren erweiterten Cookie-Einstellungen. Diese können Sie jederzeit über den Link in der Fußzeile aufrufen.',
          isText: true
        }
      ]
    },
    {
      icon: BarChart3,
      title: 'Google Analytics 4 (GA4)',
      subtitle: 'Webanalyse und Nutzungsstatistiken',
      content: [
        {
          label: 'Beschreibung des Dienstes',
          value: 'Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland ("Google"). Google Analytics verwendet Cookies und ähnliche Technologien, um die Nutzung unserer Website zu analysieren. Die durch Cookies erzeugten Informationen über Ihre Nutzung werden in der Regel an einen Server von Google übertragen und dort gespeichert.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Google Analytics erfasst folgende Informationen über die Nutzung unserer Website:',
          isList: true,
          items: [
            'Seitenaufrufe und Verweildauer auf einzelnen Seiten',
            'Technische Informationen: Gerätetyp, Bildschirmauflösung, Betriebssystem, Browser',
            'Geografische Daten: Land, Region, Stadt (basierend auf IP-Adresse)',
            'Verkehrsquellen: Wie Nutzer auf die Website gelangen (Suchmaschinen, direkte Eingabe, Verweise)',
            'Nutzerinteraktionen: Klicks, Scrolltiefe, Downloads',
            'Demografische Merkmale und Interessen (sofern aktiviert und eingewilligt)',
            'Conversion-Daten: Buchungen, Formularabsendungen, definierte Ziele',
            'Event-Tracking: Spezifische Nutzeraktionen auf der Website',
            'User-ID und Client-ID: Pseudonyme Identifikatoren zur Sitzungsverwaltung'
          ]
        },
        {
          label: 'IP-Anonymisierung',
          value: 'Wir haben auf dieser Website die IP-Anonymisierung aktiviert. Google Analytics 4 kürzt IP-Adressen standardmäßig bereits vor der Speicherung. Ihre IP-Adresse wird von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.',
          isText: true
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Die Nutzung von Google Analytics erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG. Die Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden, entweder über unsere Cookie-Einstellungen oder durch entsprechende Browser-Einstellungen.',
          isText: true
        },
        {
          label: 'Zweck der Datenverarbeitung',
          value: 'Wir nutzen Google Analytics, um die Nutzung unserer Website zu analysieren und regelmäßig zu verbessern. Die gewonnenen Statistiken ermöglichen uns:',
          isList: true,
          items: [
            'Verbesserung der Benutzerfreundlichkeit und Navigation',
            'Optimierung unserer Inhalte und Angebote',
            'Technische Optimierung der Website-Performance',
            'Identifikation und Behebung von Fehlern',
            'Analyse der Wirksamkeit von Marketing-Kampagnen',
            'Verständnis der Bedürfnisse unserer Zielgruppen',
            'Datenbasierte Geschäftsentscheidungen'
          ]
        },
        {
          label: 'Datenübermittlung in die USA',
          value: 'Google verarbeitet Ihre Daten unter Umständen auch in den USA. Google ist nach dem EU-U.S. Data Privacy Framework zertifiziert. Die Datenübermittlung erfolgt zusätzlich auf Grundlage der EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO. Details finden Sie unter: https://privacy.google.com/businesses/controllerterms/mccs/',
          isText: true
        },
        {
          label: 'Auftragsverarbeitung',
          value: 'Wir haben mit Google einen Auftragsverarbeitungsvertrag (AVV) abgeschlossen. Google verarbeitet Daten nur nach unseren Weisungen und gemäß den Anforderungen der DSGVO. Der AVV regelt die Verantwortlichkeiten und Pflichten von Google als Auftragsverarbeiter.',
          isText: true
        },
        {
          label: 'Speicherdauer',
          value: 'Die von Google Analytics gesammelten Daten werden nach 14 Monaten automatisch gelöscht. Daten, deren Aufbewahrungsdauer erreicht ist, werden einmal im Monat automatisch gelöscht. Sie können die Löschung auch früher veranlassen.',
          isText: true
        },
        {
          label: 'Google Signals',
          value: 'Wir haben Google Signals aktiviert. Dies ermöglicht geräteübergreifendes Tracking, wenn Sie in Ihrem Google-Konto angemeldet sind und die personalisierte Werbung aktiviert haben. Google Signals liefert aggregierte demografische Daten und Informationen über Interessen. Die Nutzung erfolgt nur mit Ihrer ausdrücklichen Einwilligung.',
          isText: true
        },
        {
          label: 'Widerspruch und Opt-Out',
          value: 'Sie können der Datenerfassung durch Google Analytics widersprechen:',
          isList: true,
          items: [
            'Cookie-Einstellungen: Widerrufen Sie Ihre Einwilligung in unseren Cookie-Einstellungen',
            'Browser-Add-on: Installieren Sie das Google Analytics Opt-out Browser-Add-on: https://tools.google.com/dlpage/gaoptout',
            'Browser-Einstellungen: Blockieren Sie Cookies von Google Analytics in Ihren Browser-Einstellungen',
            'Do Not Track: Aktivieren Sie die "Do Not Track"-Funktion in Ihrem Browser (wird derzeit nicht von allen Diensten respektiert)'
          ]
        },
        {
          label: 'Weitere Informationen',
          value: 'Mehr Informationen zum Datenschutz bei Google Analytics: https://policies.google.com/privacy und https://support.google.com/analytics/answer/6004245',
          isText: true
        }
      ]
    },
    {
      icon: Tag,
      title: 'Google Tag Manager',
      subtitle: 'Verwaltung von Website-Tags',
      content: [
        {
          label: 'Beschreibung',
          value: 'Wir verwenden den Google Tag Manager der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Google Tag Manager ist eine Lösung, mit der wir Website-Tags über eine Oberfläche verwalten und so z.B. Google Analytics sowie andere Google-Marketing-Dienste in unser Online-Angebot einbinden können.',
          isText: true
        },
        {
          label: 'Funktionsweise',
          value: 'Der Tag Manager selbst (der die Tags implementiert) verarbeitet keine personenbezogenen Daten der Nutzer. Der Tag Manager ermöglicht es uns jedoch, andere Dienste zu aktivieren, die ihrerseits Daten verarbeiten können. Der Google Tag Manager greift nicht auf diese Daten zu.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Der Google Tag Manager erfasst technische Informationen:',
          isList: true,
          items: [
            'Browser-Informationen und Gerätetyp',
            'Referrer-URL (Herkunftsseite)',
            'Zeitpunkt des Besuchs',
            'Betriebssystem',
            'Keine direkten personenbezogenen Daten werden vom Tag Manager selbst erfasst'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Der Einsatz erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 TTDSG. Über den Tag Manager integrierte Dienste unterliegen jeweils eigenen Einwilligungen.',
          isText: true
        },
        {
          label: 'Zweck',
          value: 'Der Google Tag Manager ermöglicht uns eine effiziente und zentrale Verwaltung aller eingebundenen Marketing- und Analyse-Tools. Dadurch können wir schnell auf Änderungen reagieren und die Website-Performance optimieren.',
          isText: true
        },
        {
          label: 'Speicherdauer und Cookies',
          value: 'Der Google Tag Manager selbst setzt keine Cookies. Die über den Tag Manager eingebundenen Dienste können jedoch Cookies setzen, sofern Sie hierfür Ihre Einwilligung erteilt haben.',
          isText: true
        },
        {
          label: 'Weitere Informationen',
          value: 'Mehr Informationen: https://marketingplatform.google.com/about/analytics/tag-manager/use-policy/ und https://policies.google.com/privacy',
          isText: true
        }
      ]
    },
    {
      icon: Target,
      title: 'Google Ads Conversion-Tracking',
      subtitle: 'Erfolgsmessung von Werbekampagnen',
      content: [
        {
          label: 'Beschreibung',
          value: 'Sofern wir Google Ads nutzen, setzen wir das Conversion-Tracking von Google Ads ein. Google Ads ist ein Online-Werbeprogramm der Google Ireland Limited. Wenn Sie auf eine von Google geschaltete Anzeige klicken, wird ein Cookie für das Conversion-Tracking gesetzt.',
          isText: true
        },
        {
          label: 'Funktionsweise',
          value: 'Conversion-Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung. Wenn das Cookie noch gültig ist und Sie eine bestimmte Seite unserer Website besuchen, können sowohl wir als auch Google erkennen, dass Sie auf eine Anzeige geklickt und zu unserer Seite weitergeleitet wurden.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Im Rahmen von Google Ads Conversion-Tracking werden folgende Daten verarbeitet:',
          isList: true,
          items: [
            'Klick-Daten: Informationen über das Klicken auf Anzeigen',
            'Conversion-Daten: Informationen über abgeschlossene Aktionen (z.B. Buchungen, Anfragen)',
            'Cookie-IDs und Werbe-IDs',
            'IP-Adresse (gekürzt)',
            'Geräteinformationen und Browser-Typ',
            'Zeitstempel der Conversion'
          ]
        },
        {
          label: 'Rechtsgrundlage und Zweck',
          value: 'Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 TTDSG. Wir nutzen Conversion-Tracking, um die Wirksamkeit unserer Werbekampagnen zu messen, unsere Anzeigen zu optimieren und unser Marketing-Budget effizient einzusetzen.',
          isText: true
        },
        {
          label: 'Datenübermittlung',
          value: 'Die durch das Conversion-Cookie erzeugten Informationen werden an Google-Server übertragen und dort gespeichert, auch in den USA. Es gelten die gleichen Garantien wie bei Google Analytics (EU-U.S. Data Privacy Framework, Standardvertragsklauseln).',
          isText: true
        },
        {
          label: 'Widerspruch',
          value: 'Sie können Cookies für Conversion-Tracking deaktivieren, indem Sie Ihren Browser so einstellen, dass Cookies von der Domain "googleadservices.com" blockiert werden. Sie können auch die personalisierte Werbung in den Google-Werbeeinstellungen deaktivieren: https://adssettings.google.com/',
          isText: true
        },
        {
          label: 'Weitere Informationen',
          value: 'Datenschutzhinweise zu Google Ads: https://policies.google.com/technologies/ads',
          isText: true
        }
      ]
    },
    {
      icon: RefreshCw,
      title: 'Google Remarketing und Zielgruppen',
      subtitle: 'Personalisierte Werbeansprache',
      content: [
        {
          label: 'Beschreibung',
          value: 'Wir nutzen die Remarketing- oder "Ähnliche Zielgruppen"-Funktion von Google Ads. Mit dieser Funktion können wir Nutzer, die unsere Website besucht haben, auf anderen Websites im Google Display-Netzwerk mit gezielter Werbung ansprechen.',
          isText: true
        },
        {
          label: 'Funktionsweise',
          value: 'Remarketing ermöglicht es, Besuchern unserer Website personalisierte, interessenbezogene Werbung anzuzeigen, wenn sie andere Websites im Google Display-Netzwerk besuchen. Die Ansprache erfolgt über Cookies, die das Nutzungsverhalten aufzeichnen. Google erstellt auf Basis der besuchten Seiten Interessenkategorien und zeigt entsprechende Anzeigen.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Für Remarketing werden folgende Daten verarbeitet:',
          isList: true,
          items: [
            'Cookie-IDs und Werbe-IDs',
            'Besuchte Seiten und Produkte auf unserer Website',
            'Zeitpunkt und Dauer des Besuchs',
            'IP-Adresse (gekürzt)',
            'Browser- und Geräteinformationen',
            'Demografische Merkmale und Interessen',
            'Conversion-Daten'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Die Nutzung von Google Remarketing erfolgt ausschließlich mit Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 TTDSG. Ohne Ihre Einwilligung findet kein Remarketing statt.',
          isText: true
        },
        {
          label: 'Zweck',
          value: 'Remarketing dient dazu, ehemalige Besucher unserer Website mit relevanten Werbeanzeigen anzusprechen und sie an unsere Angebote zu erinnern. Dies ermöglicht eine effizientere Werbeansprache und verbessert das Nutzererlebnis durch relevante statt zufällige Werbung.',
          isText: true
        },
        {
          label: 'Widerspruch und Deaktivierung',
          value: 'Sie können Remarketing und personalisierte Werbung deaktivieren:',
          isList: true,
          items: [
            'Widerrufen Sie Ihre Einwilligung in unseren Cookie-Einstellungen',
            'Deaktivieren Sie personalisierte Werbung in den Google-Werbeeinstellungen: https://adssettings.google.com/',
            'Opt-out über die Network Advertising Initiative: https://optout.networkadvertising.org/',
            'Browser-Plugin zur Deaktivierung von Google Analytics: https://tools.google.com/dlpage/gaoptout',
            'Blockieren Sie Drittanbieter-Cookies in Ihren Browser-Einstellungen'
          ]
        },
        {
          label: 'Datenschutz und Sicherheit',
          value: 'Bei der Nutzung von Remarketing werden keine Daten erfasst oder gespeichert, mit denen Sie als Person identifiziert werden können. Die Verarbeitung erfolgt pseudonym über Cookie-IDs. Google verpflichtet sich, Ihre Daten gemäß den Datenschutzrichtlinien zu schützen.',
          isText: true
        }
      ]
    },
    {
      icon: Smartphone,
      title: 'Google Fonts',
      subtitle: 'Einbindung von Web-Schriftarten',
      content: [
        {
          label: 'Beschreibung',
          value: 'Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in Ihren Browser-Cache, um Texte und Schriftarten korrekt anzuzeigen.',
          isText: true
        },
        {
          label: 'Datenübertragung',
          value: 'Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung unserer Online-Angebote.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Bei der Einbindung von Google Fonts werden folgende Daten an Google übermittelt:',
          isList: true,
          items: [
            'IP-Adresse des Nutzers',
            'Angefragte Schriftart (Font)',
            'Browser-Typ und Version',
            'Betriebssystem',
            'Referrer URL (Seite, von der aus die Schrift angefordert wird)',
            'Datum und Uhrzeit der Anfrage'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden Darstellung unserer Website und einheitlichen Schriftarten).',
          isText: true
        },
        {
          label: 'Datenübermittlung in die USA',
          value: 'Google speichert die Daten (IP-Adresse) nach eigenen Angaben dauerhaft und nutzt sie zur Verbesserung der Dienste. Die Server von Google Fonts befinden sich weltweit, auch in den USA. Google ist nach dem EU-U.S. Data Privacy Framework zertifiziert.',
          isText: true
        },
        {
          label: 'Verhinderung der Datenübertragung',
          value: 'Wenn Ihr Browser Web Fonts nicht unterstützt oder Sie die Übertragung verhindern möchten, wird eine Standardschrift von Ihrem Computer verwendet. Sie können die Übertragung verhindern, indem Sie JavaScript in Ihrem Browser deaktivieren oder einen Script-Blocker installieren.',
          isText: true
        },
        {
          label: 'Weitere Informationen',
          value: 'Details zu Google Fonts: https://developers.google.com/fonts/faq und Datenschutzerklärung: https://policies.google.com/privacy',
          isText: true
        }
      ]
    },
    {
      icon: Monitor,
      title: 'Content Delivery Network (CDN)',
      subtitle: 'Beschleunigte Auslieferung von Inhalten',
      content: [
        {
          label: 'Beschreibung',
          value: 'Wir nutzen ein Content Delivery Network (CDN), um Inhalte unserer Website schneller auszuliefern. Ein CDN ist ein Netzwerk geografisch verteilter Server, die zusammenarbeiten, um Inhalte schnell an Nutzer zu übermitteln.',
          isText: true
        },
        {
          label: 'Funktionsweise',
          value: 'Statische Dateien unserer Website (Bilder, CSS, JavaScript) werden über das CDN ausgeliefert. Das CDN wählt automatisch den Server aus, der geografisch am nächsten zu Ihnen liegt, um die Ladezeiten zu minimieren.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Das CDN verarbeitet folgende technische Daten:',
          isList: true,
          items: [
            'IP-Adresse',
            'Angefragte Dateien',
            'Browser-Informationen',
            'Referrer-URL',
            'Datum und Uhrzeit des Zugriffs',
            'Übertragene Datenmenge'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Die Nutzung eines CDN erfolgt auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) an einer schnellen, sicheren und effizienten Bereitstellung unseres Online-Angebots.',
          isText: true
        },
        {
          label: 'Zweck',
          value: 'Das CDN dient der Optimierung der Ladegeschwindigkeit, der Entlastung unserer Server, dem Schutz vor DDoS-Angriffen und der Verbesserung der Verfügbarkeit unserer Website.',
          isText: true
        },
        {
          label: 'Speicherdauer',
          value: 'Die vom CDN erfassten Daten werden in der Regel für maximal 30 Tage in Logfiles gespeichert und anschließend gelöscht.',
          isText: true
        }
      ]
    },
    {
      icon: TrendingUp,
      title: 'Webanalyse und Nutzerverhalten',
      subtitle: 'Optimierung der User Experience',
      content: [
        {
          label: 'Heatmaps und Session Recordings',
          value: 'Sofern Sie eingewilligt haben, können wir Heatmaps und Session Recordings nutzen, um das Nutzerverhalten zu analysieren. Heatmaps zeigen, wo Nutzer klicken, wie weit sie scrollen und welche Bereiche besonders beachtet werden. Session Recordings zeichnen anonymisierte Nutzersitzungen auf.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Bei Webanalyse-Tools werden folgende Daten erfasst:',
          isList: true,
          items: [
            'Mausbewegungen, Klicks und Scrollverhalten',
            'Tastatureingaben (ohne sensible Daten wie Passwörter oder Kreditkartennummern)',
            'Besuchte Seiten und Navigationspfade',
            'Verweildauer auf Seiten',
            'Abbruchpunkte in Formularen',
            'Technische Daten: Bildschirmauflösung, Browser, Gerät',
            'Keine personenbezogenen Identifikationsdaten'
          ]
        },
        {
          label: 'Datenschutzmaßnahmen',
          value: 'Bei der Aufzeichnung werden sensible Eingabefelder (Passwörter, Kreditkartendaten, persönliche Informationen) automatisch maskiert und nicht erfasst. Die Aufzeichnungen sind pseudonymisiert und können nicht einzelnen Personen zugeordnet werden.',
          isText: true
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Session Recordings und Heatmaps werden nur mit Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 TTDSG durchgeführt.',
          isText: true
        },
        {
          label: 'Zweck',
          value: 'Die Analyse des Nutzerverhaltens hilft uns zu verstehen, wie Nutzer unsere Website verwenden, wo Probleme auftreten und wie wir die Benutzerfreundlichkeit verbessern können. Dies ermöglicht uns eine datenbasierte Optimierung der User Experience.',
          isText: true
        },
        {
          label: 'Widerspruch',
          value: 'Sie können Ihre Einwilligung jederzeit in unseren Cookie-Einstellungen widerrufen. Nach dem Widerruf werden keine weiteren Aufzeichnungen erstellt.',
          isText: true
        }
      ]
    },
    {
      icon: Activity,
      title: 'Einwilligungsverwaltung und Cookie-Banner',
      subtitle: '§ 25 TTDSG und Art. 7 DSGVO',
      content: [
        {
          label: 'Cookie-Consent-Management-Plattform',
          value: 'Wir setzen eine Cookie-Consent-Management-Plattform (CMP) ein, um Ihre Einwilligungen für Cookies und andere Tracking-Technologien rechtskonform zu verwalten. Beim ersten Besuch unserer Website erscheint ein Cookie-Banner, über den Sie Ihre Präferenzen festlegen können.',
          isText: true
        },
        {
          label: 'Funktionsweise',
          value: 'Die CMP speichert Ihre Einwilligungsentscheidungen lokal auf Ihrem Gerät und stellt sicher, dass nur die von Ihnen genehmigten Cookies und Tracking-Technologien aktiviert werden. Technisch notwendige Cookies werden auch ohne Einwilligung gesetzt.',
          isText: true
        },
        {
          label: 'Gespeicherte Informationen',
          value: 'Die CMP speichert folgende Informationen über Ihre Einwilligung:',
          isList: true,
          items: [
            'Zeitpunkt der Einwilligung',
            'Cookie-Kategorien, denen Sie zugestimmt haben',
            'Version der Datenschutzerklärung',
            'Technische Parameter (Browser, Gerät)',
            'Eindeutige Consent-ID',
            'IP-Adresse (gekürzt) zum Nachweis der Einwilligung'
          ]
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Die Speicherung Ihrer Einwilligungsentscheidung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung zur Dokumentation von Einwilligungen) und lit. f DSGVO (berechtigtes Interesse am Nachweis ordnungsgemäß eingeholter Einwilligungen).',
          isText: true
        },
        {
          label: 'Verwaltung Ihrer Einstellungen',
          value: 'Sie können Ihre Cookie-Einstellungen jederzeit ändern:',
          isList: true,
          items: [
            'Klicken Sie auf den Link "Cookie-Einstellungen" in der Fußzeile',
            'Passen Sie Ihre Präferenzen für jede Cookie-Kategorie an',
            'Widerrufen Sie erteilte Einwilligungen',
            'Aktualisieren Sie Ihre Einstellungen bei Änderungen unserer Cookie-Verwendung'
          ]
        },
        {
          label: 'Dokumentation und Nachweis',
          value: 'Wir sind rechtlich verpflichtet, Ihre Einwilligungen zu dokumentieren. Die Einwilligungsdaten werden verschlüsselt gespeichert und dienen ausschließlich dem Nachweis ordnungsgemäß eingeholter Einwilligungen. Eine anderweitige Nutzung findet nicht statt.',
          isText: true
        },
        {
          label: 'Speicherdauer',
          value: 'Ihre Einwilligungsentscheidung wird für 12 Monate gespeichert. Nach Ablauf dieser Frist werden Sie erneut um Ihre Einwilligung gebeten. Dokumentationsdaten zum Nachweis werden für maximal 3 Jahre aufbewahrt.',
          isText: true
        }
      ]
    },
    {
      icon: Zap,
      title: 'Widerspruchsrecht gegen Webanalyse und Marketing',
      subtitle: 'Art. 21 DSGVO',
      highlight: true,
      content: [
        {
          label: 'Allgemeines Widerspruchsrecht',
          value: 'Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten zu Webanalyse- und Marketing-Zwecken Widerspruch einzulegen. Dies gilt insbesondere für Verarbeitungen, die auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) erfolgen.',
          isText: true
        },
        {
          label: 'Widerspruch gegen Google Analytics',
          value: 'Sie können der Datenerfassung durch Google Analytics wie folgt widersprechen:',
          isList: true,
          items: [
            'Cookie-Einstellungen: Widerrufen Sie Ihre Einwilligung für Analytics-Cookies',
            'Browser-Add-on installieren: https://tools.google.com/dlpage/gaoptout',
            'Opt-out-Cookie setzen (verhindert zukünftige Erfassung auf dieser Website)',
            'Browser so konfigurieren, dass Cookies von google-analytics.com blockiert werden'
          ]
        },
        {
          label: 'Widerspruch gegen personalisierte Werbung',
          value: 'Für personalisierte Werbung und Remarketing können Sie hier widersprechen:',
          isList: true,
          items: [
            'Google Werbeeinstellungen: https://adssettings.google.com/',
            'Opt-out über Network Advertising Initiative: https://optout.networkadvertising.org/',
            'Opt-out über Digital Advertising Alliance: https://optout.aboutads.info/',
            'Opt-out über European Interactive Digital Advertising Alliance: https://youronlinechoices.eu/',
            'Deaktivierung in den Cookie-Einstellungen auf unserer Website'
          ]
        },
        {
          label: 'Do Not Track (DNT)',
          value: 'Wir respektieren das "Do Not Track"-Signal Ihres Browsers. Wenn DNT aktiviert ist, werden keine Tracking-Cookies gesetzt, die auf einer Einwilligung basieren. Technisch notwendige Cookies werden weiterhin gesetzt.',
          isText: true
        },
        {
          label: 'Globale Datenschutzsteuerung (GPC)',
          value: 'Wir unterstützen die Global Privacy Control (GPC), einen Standard, der es Ihnen ermöglicht, Ihre Datenschutzpräferenzen automatisch an alle besuchten Websites zu kommunizieren.',
          isText: true
        },
        {
          label: 'Auswirkungen des Widerspruchs',
          value: 'Nach einem Widerspruch werden wir Ihre personenbezogenen Daten nicht mehr für die betreffenden Zwecke verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen. Die Funktionalität unserer Website bleibt auch ohne Webanalyse und Marketing-Cookies vollständig erhalten.',
          isText: true
        }
      ]
    },
    {
      icon: Users,
      title: 'Kundenbeziehung und CRM',
      content: [
        {
          label: 'Customer Relationship Management',
          value: 'Zur Verwaltung unserer Kundenbeziehungen nutzen wir ein eigenes CRM-System, das auf unserer Supabase-Datenbank basiert. Hierbei verarbeiten wir Kontakt- und Kommunikationsdaten unserer Kunden und Interessenten.',
          isText: true
        },
        {
          label: 'Verarbeitete Daten',
          value: 'Im Rahmen der Kundenbeziehung verarbeiten wir:',
          isList: true,
          items: [
            'Stammdaten: Name, Unternehmen, Position, Kontaktdaten',
            'Vertragsdaten: Gebuchte Leistungen, Konditionen, Vertragshistorie',
            'Kommunikationsdaten: E-Mail-Verlauf, Notizen, Gesprächsprotokolle',
            'Rechnungsdaten: Rechnungsinformationen, Zahlungsstatus',
            'Präferenzen: Interessensgebiete, bevorzugte Kontaktwege'
          ]
        },
        {
          label: 'Rechtsgrundlage und Zweck',
          value: 'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und lit. f DSGVO (berechtigtes Interesse an effizienter Kundenbetreuung und Geschäftsabwicklung).',
          isText: true
        }
      ]
    },
    {
      icon: FileText,
      title: 'Auftragsverarbeiter',
      subtitle: 'Art. 28 DSGVO',
      content: [
        {
          label: 'Eingesetzte Auftragsverarbeiter',
          value: 'Wir setzen externe Dienstleister als Auftragsverarbeiter ein. Mit allen Auftragsverarbeitern wurden Verträge gemäß Art. 28 DSGVO geschlossen:',
          isList: true,
          items: [
            'Netlify Inc. (USA/EU) - Hosting und Content Delivery',
            'Supabase Inc. (Singapur/EU) - Datenbank und Backend-Services',
            'E-Mail-Provider - Versand von transaktionalen E-Mails (wenn zutreffend)'
          ]
        },
        {
          label: 'Garantien',
          value: 'Alle Auftragsverarbeiter bieten ausreichende Garantien dafür, dass geeignete technische und organisatorische Maßnahmen durchgeführt werden und die Verarbeitung im Einklang mit der DSGVO erfolgt. Die Auftragsverarbeiter verarbeiten personenbezogene Daten nur nach dokumentierter Weisung.',
          isText: true
        }
      ]
    },
    {
      icon: Globe,
      title: 'Datenübermittlung in Drittländer',
      content: [
        {
          label: 'EU-U.S. Data Privacy Framework',
          value: 'Einige unserer Dienstleister (z.B. Netlify) haben Server in den USA. Die Datenübermittlung erfolgt auf Grundlage des EU-U.S. Data Privacy Framework und zusätzlich abgesichert durch EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO.',
          isText: true
        },
        {
          label: 'Schutzmaßnahmen',
          value: 'Wir haben zusätzliche technische und organisatorische Maßnahmen getroffen, um ein angemessenes Datenschutzniveau zu gewährleisten, darunter Verschlüsselung, Zugriffskontrollen und regelmäßige Sicherheitsaudits.',
          isText: true
        }
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Ihre Rechte als betroffene Person',
      subtitle: 'Art. 15-22 DSGVO',
      highlight: true,
      content: [
        {
          label: 'Auskunftsrecht (Art. 15 DSGVO)',
          value: 'Sie haben das Recht, jederzeit unentgeltlich Auskunft über die zu Ihrer Person gespeicherten Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung zu erhalten.',
          isText: true
        },
        {
          label: 'Recht auf Berichtigung (Art. 16 DSGVO)',
          value: 'Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung unvollständiger personenbezogener Daten zu verlangen.',
          isText: true
        },
        {
          label: 'Recht auf Löschung (Art. 17 DSGVO)',
          value: 'Sie haben das Recht auf Löschung Ihrer personenbezogenen Daten, sofern die Voraussetzungen des Art. 17 DSGVO erfüllt sind. Dies gilt nicht, wenn die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung, zur Erfüllung rechtlicher Verpflichtungen, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist.',
          isText: true
        },
        {
          label: 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
          value: 'Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, wenn eine der gesetzlichen Voraussetzungen gegeben ist (z.B. Sie die Richtigkeit bestreiten, die Verarbeitung unrechtmäßig ist, Sie die Daten zur Geltendmachung von Rechtsansprüchen benötigen).',
          isText: true
        },
        {
          label: 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
          value: 'Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und diese Daten einem anderen Verantwortlichen zu übermitteln, sofern die Verarbeitung auf einer Einwilligung oder einem Vertrag beruht.',
          isText: true
        },
        {
          label: 'Widerspruchsrecht (Art. 21 DSGVO)',
          value: 'Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen. Wir verarbeiten die personenbezogenen Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen.',
          isText: true
        },
        {
          label: 'Widerrufsrecht bei Einwilligung (Art. 7 Abs. 3 DSGVO)',
          value: 'Sofern die Verarbeitung auf Ihrer Einwilligung beruht, haben Sie das Recht, diese Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.',
          isText: true
        },
        {
          label: 'Beschwerderecht (Art. 77 DSGVO)',
          value: 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die für uns zuständige Aufsichtsbehörde ist: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2-4, 40213 Düsseldorf.',
          isText: true
        }
      ]
    },
    {
      icon: Key,
      title: 'Ausübung Ihrer Rechte',
      content: [
        {
          label: 'Kontaktaufnahme',
          value: 'Zur Ausübung Ihrer Rechte oder bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:',
          isList: true,
          items: [
            'E-Mail: mail@anatoly-mook.de',
            'Telefon: 02303 334 0628',
            'Postanschrift: Anatoly Mook Academy, Ackerstraße 56, 59423 Unna'
          ]
        },
        {
          label: 'Identitätsprüfung',
          value: 'Zur Wahrung Ihrer Datensicherheit können wir Sie im Rahmen der Ausübung Ihrer Rechte bitten, Ihre Identität nachzuweisen, bevor wir personenbezogene Daten offenlegen oder ändern.',
          isText: true
        }
      ]
    },
    {
      icon: HardDrive,
      title: 'Datensicherheit und technische Maßnahmen',
      subtitle: 'Art. 32 DSGVO',
      content: [
        {
          label: 'Technische Sicherheitsmaßnahmen',
          value: 'Wir setzen umfassende technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen:',
          isList: true,
          items: [
            'SSL/TLS-Verschlüsselung für alle Datenübertragungen (HTTPS)',
            'Verschlüsselung gespeicherter Daten (AES-256 Encryption at Rest)',
            'Regelmäßige Sicherheits-Updates und Patches',
            'Firewall-Systeme und Intrusion Detection',
            'Multi-Faktor-Authentifizierung für administrative Zugänge',
            'Row Level Security (RLS) in der Datenbank',
            'Regelmäßige Backups mit verschlüsselter Speicherung',
            'Zugriffsprotokolle und Monitoring',
            'Regelmäßige Sicherheitsaudits und Penetrationstests'
          ]
        },
        {
          label: 'Organisatorische Maßnahmen',
          value: 'Ergänzend zu technischen Maßnahmen haben wir organisatorische Vorkehrungen getroffen:',
          isList: true,
          items: [
            'Zugriffsbeschränkung nach dem Need-to-know-Prinzip',
            'Vertraulichkeitsverpflichtung aller Mitarbeiter',
            'Regelmäßige Schulungen zum Datenschutz',
            'Dokumentierte Prozesse zur Datenschutz-Folgenabschätzung',
            'Notfallpläne für Datenschutzverletzungen (Art. 33, 34 DSGVO)'
          ]
        },
        {
          label: 'Sicherheitsupdates',
          value: 'Unsere Sicherheitsmaßnahmen werden kontinuierlich dem Stand der Technik angepasst und regelmäßig überprüft.',
          isText: true
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Datenschutzverletzungen',
      subtitle: 'Art. 33, 34 DSGVO',
      content: [
        {
          label: 'Meldepflicht',
          value: 'Im Falle einer Verletzung des Schutzes personenbezogener Daten werden wir die zuständige Aufsichtsbehörde unverzüglich, möglichst binnen 72 Stunden, informieren, sofern die Verletzung voraussichtlich ein Risiko für Ihre Rechte und Freiheiten zur Folge hat.',
          isText: true
        },
        {
          label: 'Benachrichtigung Betroffener',
          value: 'Wenn die Datenschutzverletzung voraussichtlich ein hohes Risiko für Ihre persönlichen Rechte und Freiheiten zur Folge hat, werden wir Sie unverzüglich über die Verletzung informieren und Sie über empfohlene Maßnahmen zum Schutz unterrichten.',
          isText: true
        }
      ]
    },
    {
      icon: Clock,
      title: 'Speicherfristen',
      content: [
        {
          label: 'Allgemeine Speicherdauer',
          value: 'Wir speichern personenbezogene Daten nur so lange, wie dies für die Erfüllung des jeweiligen Zwecks erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.',
          isText: true
        },
        {
          label: 'Gesetzliche Aufbewahrungsfristen',
          value: 'Folgende gesetzliche Aufbewahrungsfristen sind zu beachten:',
          isList: true,
          items: [
            'Handelsrechtliche Aufbewahrungspflichten (HGB): 10 Jahre für Bücher, Aufzeichnungen, Lageberichte, Buchungsbelege, Handelsbücher, Jahresabschlüsse',
            'Steuerrechtliche Aufbewahrungspflichten (AO): 10 Jahre für Bücher, Aufzeichnungen, Rechnungen; 6 Jahre für empfangene Handels- und Geschäftsbriefe',
            'Verjährungsfristen nach BGB: Regelverjährung 3 Jahre, besondere Fristen bis zu 30 Jahren'
          ]
        },
        {
          label: 'Löschung',
          value: 'Nach Ablauf der Speicherfristen werden die entsprechenden Daten routinemäßig und datenschutzkonform gelöscht, sofern keine Einwilligung zur längeren Speicherung vorliegt oder eine weitere Speicherung gesetzlich erforderlich ist.',
          isText: true
        }
      ]
    },
    {
      icon: MessageSquare,
      title: 'Newsletter und Marketing-Kommunikation',
      content: [
        {
          label: 'Newsletter-Versand',
          value: 'Sofern Sie sich für unseren Newsletter anmelden, verwenden wir Ihre E-Mail-Adresse ausschließlich für den Versand von Informationen über unsere Dienstleistungen, Events und Angebote. Die Anmeldung erfolgt im Double-Opt-In-Verfahren.',
          isText: true
        },
        {
          label: 'Rechtsgrundlage',
          value: 'Der Newsletter-Versand erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 7 Abs. 2 Nr. 3 UWG.',
          isText: true
        },
        {
          label: 'Widerruf',
          value: 'Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. In jedem Newsletter befindet sich ein Abmeldelink. Alternativ können Sie Ihren Widerruf auch per E-Mail an mail@anatoly-mook.de senden.',
          isText: true
        }
      ]
    },
    {
      icon: Share2,
      title: 'Social Media und externe Links',
      content: [
        {
          label: 'Social Media Profile',
          value: 'Wir unterhalten Profile auf verschiedenen Social Media Plattformen (LinkedIn, Instagram, YouTube). Wenn Sie mit uns über Social Media interagieren, gelten die Datenschutzbestimmungen der jeweiligen Plattform. Wir haben auf die Datenverarbeitung durch die Plattformbetreiber keinen Einfluss.',
          isText: true
        },
        {
          label: 'Externe Links',
          value: 'Unsere Website enthält Links zu externen Websites. Wir haben keinen Einfluss auf die Einhaltung datenschutzrechtlicher Bestimmungen durch die Betreiber dieser Websites. Informieren Sie sich daher bitte auf den verlinkten Websites über den jeweiligen Umgang mit Ihren Daten.',
          isText: true
        }
      ]
    },
    {
      icon: UserX,
      title: 'Keine automatisierte Entscheidungsfindung',
      subtitle: 'Art. 22 DSGVO',
      content: [
        {
          label: 'Verzicht auf Profiling',
          value: 'Wir setzen keine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 DSGVO ein. Alle Entscheidungen, die Ihre Person betreffen, werden von unseren Mitarbeitern individuell getroffen.',
          isText: true
        }
      ]
    },
    {
      icon: Download,
      title: 'Minderjährigenschutz',
      content: [
        {
          label: 'Verarbeitung von Daten Minderjähriger',
          value: 'Unser Angebot richtet sich grundsätzlich an Erwachsene. Sofern wir Kenntnis davon erlangen, dass wir personenbezogene Daten von Personen unter 16 Jahren ohne erforderliche Einwilligung der Eltern oder Erziehungsberechtigten verarbeitet haben, werden wir diese Daten unverzüglich löschen.',
          isText: true
        }
      ]
    },
    {
      icon: Edit3,
      title: 'Änderungen der Datenschutzerklärung',
      content: [
        {
          label: 'Aktualität',
          value: 'Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Dezember 2025. Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.',
          isText: true
        },
        {
          label: 'Benachrichtigung',
          value: 'Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website abgerufen werden. Bei wesentlichen Änderungen werden wir Sie aktiv informieren, sofern uns Ihre Kontaktdaten vorliegen.',
          isText: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="max-w-[1000px] mx-auto px-6 py-20">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="text-white/70 text-[13px] font-[500] tracking-[0.02em]">
                DSGVO-konforme Datenschutzerklärung
              </span>
            </div>

            <h1 className="text-white text-[42px] md:text-[52px] font-[700] tracking-[-0.03em] mb-5 leading-[1.1]">
              Datenschutzerklärung
            </h1>

            <p className="text-white/50 text-[16px] font-[450] tracking-[0.005em] leading-[1.7] max-w-[700px] mx-auto">
              Transparente Information über die Verarbeitung Ihrer personenbezogenen Daten gemäß
              EU-Datenschutz-Grundverordnung (DSGVO) und Bundesdatenschutzgesetz (BDSG)
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, idx) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                    section.highlight
                      ? 'bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent border-2 border-yellow-500/20'
                      : 'bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8 md:p-10">
                    <div className="flex gap-6">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${
                        section.highlight
                          ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10'
                          : 'bg-white/5'
                      } border ${
                        section.highlight ? 'border-yellow-500/30' : 'border-white/10'
                      } flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <IconComponent
                          className={section.highlight ? 'text-yellow-400' : 'text-white/60'}
                          size={24}
                          strokeWidth={1.5}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="mb-6">
                          <h2 className={`text-[22px] font-[600] tracking-[-0.02em] mb-1 ${
                            section.highlight ? 'text-yellow-400' : 'text-white/90'
                          }`}>
                            {section.title}
                          </h2>
                          {section.subtitle && (
                            <p className="text-white/40 text-[13px] font-[500] tracking-[0.01em] mt-2">
                              {section.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="space-y-6">
                          {section.content.map((item, itemIdx) => (
                            <div key={itemIdx}>
                              {item.isText ? (
                                <div className="space-y-3">
                                  <h3 className="text-white/80 text-[15px] font-[600] tracking-[0.005em]">
                                    {item.label}
                                  </h3>
                                  <p className="text-white/60 text-[14px] font-[450] leading-[1.8] tracking-[0.002em]">
                                    {item.value}
                                  </p>
                                </div>
                              ) : item.isList ? (
                                <div className="space-y-3">
                                  <h3 className="text-white/80 text-[15px] font-[600] tracking-[0.005em]">
                                    {item.label}
                                  </h3>
                                  <p className="text-white/60 text-[14px] font-[450] leading-[1.8] tracking-[0.002em] mb-3">
                                    {item.value}
                                  </p>
                                  <ul className="space-y-2.5 ml-1">
                                    {item.items?.map((listItem, listIdx) => (
                                      <li key={listIdx} className="flex items-start gap-3 text-white/60 text-[14px] font-[450] leading-[1.7]">
                                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/30 mt-2" />
                                        <span className="flex-1">{listItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                                  <span className="text-white/50 text-[13px] font-[500] tracking-[0.01em] min-w-[140px]">
                                    {item.label}
                                  </span>
                                  {item.link ? (
                                    <a
                                      href={item.link}
                                      className="text-yellow-400 hover:text-yellow-300 text-[14px] font-[500] transition-colors duration-300 break-all"
                                    >
                                      {item.value}
                                    </a>
                                  ) : (
                                    <span className="text-white/70 text-[14px] font-[450] flex-1 break-words">
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

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border-2 border-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Info className="text-blue-400" size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-blue-400 text-[16px] font-[600] tracking-[-0.01em] mb-2">
                  Fragen zum Datenschutz?
                </h3>
                <p className="text-white/60 text-[14px] font-[450] leading-[1.7] mb-4">
                  Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer Rechte
                  können Sie sich jederzeit an uns wenden:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="text-white/40" size={16} />
                    <a href="mailto:mail@anatoly-mook.de" className="text-blue-400 hover:text-blue-300 text-[14px] font-[500] transition-colors">
                      mail@anatoly-mook.de
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-white/40" size={16} />
                    <a href="tel:023033340628" className="text-blue-400 hover:text-blue-300 text-[14px] font-[500] transition-colors">
                      02303 334 0628
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/30 text-[12px] font-[450] tracking-[0.01em]">
              Letzte Aktualisierung: Dezember 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
