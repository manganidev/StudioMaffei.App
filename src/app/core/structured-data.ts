import { FAQ, SERVIZI, STUDIO, TEAM, isPlaceholder } from './studio.data';

/**
 * Dati strutturati schema.org (JSON-LD) dello studio: aiutano Google e gli assistenti AI
 * a capire con certezza chi è lo studio, cosa fa, dove si trova e come contattarlo.
 * Vengono generati dagli stessi dati mostrati nella pagina, così restano sempre allineati.
 */
export function buildStructuredData(): object {
  const url = STUDIO.siteUrl;
  const studioId = `${url}#studio`;
  const personId = `${url}#marialuisa-maffei`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AccountingService',
        '@id': studioId,
        name: STUDIO.name,
        alternateName: 'Studio Maffei',
        description:
          `${STUDIO.role} a Firenze (${STUDIO.order}). Consulenza del lavoro, elaborazione paghe, ` +
          'consulenza fiscale, tributaria e societaria per aziende e privati.',
        url,
        logo: `${url}brand/logo-512.png`,
        image: `${url}og-image.png`,
        telephone: STUDIO.phone.intl,
        email: STUDIO.email,
        ...(isPlaceholder(STUDIO.legal.vatNumber) ? {} : { vatID: STUDIO.legal.vatNumber }),
        address: {
          '@type': 'PostalAddress',
          streetAddress: STUDIO.address.street,
          postalCode: STUDIO.address.postalCode,
          addressLocality: STUDIO.address.locality,
          addressRegion: STUDIO.address.region,
          addressCountry: STUDIO.address.country,
        },
        hasMap: STUDIO.mapUrl,
        areaServed: { '@type': 'City', name: 'Firenze' },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: STUDIO.hours.opens,
            closes: STUDIO.hours.closes,
          },
        ],
        founder: { '@id': personId },
        knowsAbout: [
          'Consulenza del lavoro',
          'Elaborazione paghe e contributi',
          'Consulenza fiscale',
          'Consulenza tributaria',
          'Contabilità',
          'Consulenza societaria',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi dello studio',
          itemListElement: SERVIZI.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.text },
          })),
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            name: 'Segreteria dello studio',
            telephone: STUDIO.phone.intl,
            email: STUDIO.email,
            availableLanguage: 'it',
          },
          ...TEAM.flatMap((gruppo) =>
            gruppo.people.map((p) => ({
              '@type': 'ContactPoint',
              contactType: gruppo.service,
              name: `${p.name} – ${gruppo.service}`,
              email: p.email,
              availableLanguage: 'it',
            })),
          ),
        ],
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: STUDIO.owner,
        jobTitle: STUDIO.role,
        worksFor: { '@id': studioId },
        memberOf: { '@type': 'Organization', name: STUDIO.orderFull },
        ...(isPlaceholder(STUDIO.legal.alboNumber)
          ? {}
          : {
              identifier: {
                '@type': 'PropertyValue',
                name: `Iscrizione all'${STUDIO.orderFull}`,
                value: STUDIO.legal.alboNumber,
              },
            }),
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: STUDIO.name,
        inLanguage: 'it-IT',
        publisher: { '@id': studioId },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
}

/** Inserisce (o aggiorna, se già presente dal prerendering) lo script JSON-LD nel <head>. */
export function setJsonLd(doc: Document, id: string, data: object): void {
  let script = doc.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = doc.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    doc.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}
