/** Scorre in modo fluido fino alla sezione con l'id indicato ('top' = inizio pagina). */
export function scrollToSection(event: Event, id: string): void {
  event.preventDefault();

  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
  }

  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
}
