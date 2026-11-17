/** Esegue la callback una sola volta, quando l'elemento entra nello schermo. Restituisce la funzione di pulizia. */
export function onceInView(
  el: Element,
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    callback();
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      callback();
    }
  }, options);

  observer.observe(el);
  return () => observer.disconnect();
}

/** true se l'utente ha chiesto al sistema di ridurre le animazioni. */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** true su dispositivi con mouse (niente effetti legati al puntatore su touch). */
export function hasFinePointer(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;
}
