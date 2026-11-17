import { DOCUMENT, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { STUDIO } from './studio.data';

export interface PageSeo {
  /** Percorso relativo alla radice del sito, es. '' per la home o 'privacy'. */
  path: string;
  description?: string;
  /** false = la pagina non va indicizzata (es. informativa privacy). */
  index?: boolean;
}

/**
 * Imposta URL canonico, robots e descrizione della pagina corrente.
 * Va chiamata nel costruttore del componente di pagina: con il prerendering i valori
 * finiscono direttamente nell'HTML statico di ciascuna pagina.
 */
export function setPageSeo({ path, description, index = true }: PageSeo): void {
  const doc = inject(DOCUMENT);
  const meta = inject(Meta);
  const url = STUDIO.siteUrl + path;

  let canonical = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = doc.createElement('link');
    canonical.rel = 'canonical';
    doc.head.appendChild(canonical);
  }
  canonical.href = url;

  meta.updateTag({ property: 'og:url', content: url });
  meta.updateTag({
    name: 'robots',
    content: index
      ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'noindex, follow',
  });

  if (description) {
    meta.updateTag({ name: 'description', content: description });
  }
}
