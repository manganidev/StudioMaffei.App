// Contenuti del sito in un unico punto: per aggiornare testi, recapiti o
// referenti basta modificare questo file.

// Attenzione: se cambi indirizzo, orari o recapiti aggiorna anche public/llms.txt
// (riassunto testuale del sito per gli assistenti AI).

export const STUDIO = {
  siteUrl: 'https://www.studiomaffei.info/',
  name: 'Studio Maffei Marialuisa',
  owner: 'Marialuisa Maffei',
  role: 'Consulente del Lavoro',
  order: 'Ordine di Firenze',
  orderFull: 'Ordine dei Consulenti del Lavoro di Firenze',
  phone: { display: '055 710964', href: 'tel:+39055710964', intl: '+39 055 710964' },
  email: 'ufficio@studiomaffei.info',
  hours: {
    days: 'Lunedì – Venerdì',
    time: '9:00 – 13:00',
    short: 'Lun–Ven · 9:00–13:00',
    opens: '09:00',
    closes: '13:00',
  },
  address: {
    street: 'Via Duccio di Buoninsegna 13',
    city: '50142 Firenze (FI)',
    postalCode: '50142',
    locality: 'Firenze',
    region: 'FI',
    country: 'IT',
  },
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('Via Duccio di Buoninsegna 13, Firenze'),
  mapUrl: 'https://maps.google.com/?q=' + encodeURIComponent('Via Duccio di Buoninsegna 13, 50142 Firenze'),

  // Dati legali obbligatori (art. 35 DPR 633/72 e D.Lgs. 70/2003): COMPILARE prima della pubblicazione.
  legal: {
    vatNumber: '[DA COMPLETARE]', // Partita IVA
    alboNumber: '933', // Numero di iscrizione all'Ordine dei Consulenti del Lavoro di Firenze
    hosting: 'Aruba S.p.A.', // Fornitore di hosting del sito (responsabile del trattamento)
    privacyUpdated: '17 novembre 2026',
  },
} as const;

/** true se il valore è ancora un segnaposto da compilare. */
export const isPlaceholder = (value: string) => value.startsWith('[');

export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'servizi', label: 'Servizi' },
  { id: 'studio', label: 'Lo studio' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contatti', label: 'Contatti' },
  { id: 'dove', label: 'Dove siamo' },
];

import { IconName } from '../shared/icon/icons';

export interface Servizio {
  icon: IconName;
  title: string;
  text: string;
}

export const SERVIZI: Servizio[] = [
  {
    icon: 'briefcase',
    title: 'Consulenza del lavoro',
    text: 'Gestione dei rapporti di lavoro: contratti, assunzioni, cessazioni e adempimenti verso gli enti previdenziali e assicurativi.',
  },
  {
    icon: 'file-invoice-dollar',
    title: 'Elaborazione paghe',
    text: 'Cedolini, contributi e adempimenti periodici del personale, seguiti da un servizio paghe dedicato.',
  },
  {
    icon: 'scale-balanced',
    title: 'Fiscale e tributaria',
    text: 'Dichiarazioni, scadenze e adempimenti fiscali per aziende e privati, con un supporto chiaro e puntuale.',
  },
  {
    icon: 'chart-pie',
    title: 'Contabilità e società',
    text: 'Tenuta della contabilità e consulenza societaria per accompagnare l’impresa in ogni fase della sua attività.',
  },
];

export interface Referente {
  name: string;
  email: string;
}

export interface GruppoContatti {
  service: string;
  icon: IconName;
  people: Referente[];
}

export const TEAM: GruppoContatti[] = [
  {
    service: 'Servizio paghe',
    icon: 'file-invoice-dollar',
    people: [
      { name: 'Ilaria', email: 'ilaria@studiomaffei.info' },
      { name: 'Miriam', email: 'miriam@studiomaffei.info' },
    ],
  },
  {
    service: 'Servizio contabilità',
    icon: 'chart-pie',
    people: [
      { name: 'Marialuisa', email: 'marialuisa@studiomaffei.info' },
      { name: 'Sandra', email: 'sandra@studiomaffei.info' },
    ],
  },
];

export interface Faq {
  question: string;
  answer: string;
}

const emails = (service: string) =>
  TEAM.find((g) => g.service === service)!
    .people.map((p) => p.email)
    .join(' oppure ');

// Domande frequenti: visibili nella pagina e pubblicate anche come dati strutturati (FAQPage),
// così motori di ricerca e assistenti AI trovano risposte chiare e verificabili.
export const FAQ: Faq[] = [
  {
    question: 'Di cosa si occupa lo Studio Maffei?',
    answer:
      `Lo ${STUDIO.name} di Firenze offre consulenza del lavoro, elaborazione paghe e contributi, ` +
      'consulenza fiscale e tributaria, contabilità e consulenza societaria, per aziende e privati.',
  },
  {
    question: 'Chi è Marialuisa Maffei?',
    answer:
      `${STUDIO.owner} è ${STUDIO.role} iscritta all’${STUDIO.orderFull} e titolare dello studio, ` +
      'con un’esperienza decennale nella consulenza del lavoro, fiscale e societaria.',
  },
  {
    question: 'Dove si trova lo studio?',
    answer: `Lo studio si trova a Firenze, in ${STUDIO.address.street}, ${STUDIO.address.city}.`,
  },
  {
    question: 'Quali sono gli orari dello studio?',
    answer:
      'Lo studio è aperto dal lunedì al venerdì, dalle 9:00 alle 13:00. ' +
      `Il telefono dell’ufficio è ${STUDIO.phone.display}.`,
  },
  {
    question: 'Come posso contattare il servizio paghe o la contabilità?',
    answer:
      `Per il servizio paghe puoi scrivere a ${emails('Servizio paghe')}; ` +
      `per il servizio contabilità a ${emails('Servizio contabilità')}. ` +
      `Per informazioni generali scrivi a ${STUDIO.email} o chiama lo ${STUDIO.phone.display}.`,
  },
  {
    question: 'Lo studio segue anche i privati?',
    answer:
      'Sì. Lo studio garantisce una completa assistenza sia alle aziende sia ai privati, ' +
      'dalla consulenza del lavoro a quella fiscale e tributaria.',
  },
];
