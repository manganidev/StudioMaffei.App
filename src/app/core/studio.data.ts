// Contenuti del sito in un unico punto: per aggiornare testi, recapiti o
// referenti basta modificare questo file.

export const STUDIO = {
  name: 'Studio Maffei Marialuisa',
  owner: 'Marialuisa Maffei',
  role: 'Consulente del Lavoro',
  order: 'Ordine di Firenze',
  phone: { display: '055 710964', href: 'tel:+39055710964' },
  email: 'ufficio@studiomaffei.info',
  hours: { days: 'Lunedì – Venerdì', time: '9:00 – 13:00', short: 'Lun–Ven · 9:00–13:00' },
  address: { street: 'Via Duccio di Buoninsegna 13', city: '50142 Firenze (FI)' },
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('Via Duccio di Buoninsegna 13, Firenze'),
} as const;

export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'servizi', label: 'Servizi' },
  { id: 'studio', label: 'Lo studio' },
  { id: 'contatti', label: 'Contatti' },
  { id: 'dove', label: 'Dove siamo' },
];

export interface Servizio {
  icon: string;
  title: string;
  text: string;
}

export const SERVIZI: Servizio[] = [
  {
    icon: 'fa-solid fa-briefcase',
    title: 'Consulenza del lavoro',
    text: 'Gestione dei rapporti di lavoro: contratti, assunzioni, cessazioni e adempimenti verso gli enti previdenziali e assicurativi.',
  },
  {
    icon: 'fa-solid fa-file-invoice-dollar',
    title: 'Elaborazione paghe',
    text: 'Cedolini, contributi e adempimenti periodici del personale, seguiti da un servizio paghe dedicato.',
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    title: 'Fiscale e tributaria',
    text: 'Dichiarazioni, scadenze e adempimenti fiscali per aziende e privati, con un supporto chiaro e puntuale.',
  },
  {
    icon: 'fa-solid fa-chart-pie',
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
  icon: string;
  people: Referente[];
}

export const TEAM: GruppoContatti[] = [
  {
    service: 'Servizio paghe',
    icon: 'fa-solid fa-file-invoice-dollar',
    people: [
      { name: 'Ilaria', email: 'ilaria@studiomaffei.info' },
      { name: 'Miriam', email: 'miriam@studiomaffei.info' },
    ],
  },
  {
    service: 'Servizio contabilità',
    icon: 'fa-solid fa-chart-pie',
    people: [
      { name: 'Marialuisa', email: 'marialuisa@studiomaffei.info' },
      { name: 'Sandra', email: 'sandra@studiomaffei.info' },
    ],
  },
];
