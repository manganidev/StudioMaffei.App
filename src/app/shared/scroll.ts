/**
 * Scorre in modo fluido fino alla sezione con l'id indicato ('top' = inizio pagina).
 * Se la sezione non è nella pagina corrente (es. dalla pagina privacy) lascia fare al link:
 * grazie a <base href="/"> "#servizi" porta a "/#servizi", cioè alla home sulla sezione giusta.
 */
export function scrollToSection(event: Event, id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();

  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior });
  } else {
    target.scrollIntoView({ behavior, block: 'start' });
  }

  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
}
