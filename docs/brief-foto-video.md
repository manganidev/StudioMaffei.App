# Brief foto e video – Studio Maffei

Guida per produrre le immagini e i video del sito: cosa serve, in che ordine, prompt pronti
per i generatori AI e specifiche tecniche per inserirli in modo ottimizzato (SEO e AI).

## 1. Prima regola: foto vere dove conta la fiducia

Per uno studio professionale le foto **reali** valgono più di qualsiasi immagine generata:
Google (criteri E-E-A-T, scheda Google Business) e gli assistenti AI premiano segnali concreti
e verificabili come persone vere, sede vera, targa sul portone.

- Usa l'AI solo per immagini **d'atmosfera** (ambienti, dettagli, texture, sfondi).
- **Non** generare con l'AI ritratti delle persone dello studio, né immagini presentate come
  "il nostro ufficio": sarebbe ingannevole e, per immagini realistiche di persone o luoghi reali,
  l'AI Act europeo (art. 50) richiede di dichiararne l'origine artificiale.
- Le foto stock attuali (ufficio e mani unite) vanno bene come atmosfera, ma vanno sostituite
  appena ci sono scatti reali.

## 2. Servizio fotografico reale (priorità)

Basta mezza giornata con un fotografo, o anche un buon smartphone, luce naturale e cavalletto.

| # | Soggetto | Dove va nel sito | Perché |
|---|----------|------------------|--------|
| 1 | Ritratto di Marialuisa Maffei, mezzo busto, sorriso naturale, sfondo studio sfocato | Sezione "Lo studio" + dati strutturati `Person.image` | Volto riconoscibile = fiducia; collega la persona allo studio nei risultati di ricerca |
| 2 | Foto di gruppo del team (paghe + contabilità) | Sezione "Contatti", sopra i referenti | Dà un volto ai referenti |
| 3 | Interno dello studio, inquadratura ampia, luce del mattino | Hero (al posto della foto stock) | Immagine principale della pagina |
| 4 | Ingresso e targa in Via Duccio di Buoninsegna 13 | Sezione "Dove siamo" + scheda Google Business | Ricerca locale: aiuta a riconoscere il portone |
| 5 | Dettagli di lavoro: scrivania, documenti, mani su tastiera (senza dati leggibili!) | Card servizi / sfondi | Atmosfera professionale autentica |

## 3. Prompt per immagini AI (solo atmosfera)

Funzionano con Midjourney, Google Imagen, DALL·E, Adobe Firefly. Sono in inglese perché i
generatori rendono meglio così. Palette del sito: blu notte `#071427`, blu `#003d85`, oro `#d6a756`.

**Hero – ambiente di lavoro**
> Bright, elegant Italian professional office in Florence, morning sunlight through tall windows,
> wooden desk with neatly stacked documents, a fountain pen and a laptop, deep navy blue and warm
> gold accents, shallow depth of field, editorial photography, calm and trustworthy mood, no people,
> no readable text, 4:5 vertical

**Sezione "Lo studio" – Firenze rinascimentale (richiama gli archi del logo)**
> Renaissance loggia arches in Florence inspired by Brunelleschi, pietra serena columns and round
> arches, soft golden hour light, minimal composition, architectural photography, warm stone and
> deep blue shadows, no people, no text, 4:5 vertical

**Card servizi – dettagli**
> Close-up of a professional's desk: payroll documents, calculator and a navy blue folder, soft
> natural light, clean minimal composition, gold and navy color accents, editorial style, no
> readable text or numbers, 4:3

**Sfondo astratto per banner e social**
> Abstract background of elegant architectural arches made of thin gold lines on deep navy blue,
> subtle grid, soft blue glow in the top right corner, minimal, premium, no text, 1200x630

## 4. Video

### 4a. Loop di sfondo per la hero (8–12 secondi, senza audio)

Si può generare con Google Veo, OpenAI Sora, Runway o Kling, oppure girare dal vero.

> Slow cinematic dolly shot across an elegant Florence office at morning, sunlight moving gently
> over a wooden desk with documents and a fountain pen, dust particles in the light, through the
> window the terracotta rooftops of Florence slightly out of focus, navy blue and warm gold tones,
> calm, no people, no text, seamless loop, 16:9

### 4b. Video di presentazione (45–60 secondi, reale, con Marialuisa)

Il contenuto video più utile per SEO e AI: una persona vera che spiega cosa fa lo studio.
Va girato dal vero: smartphone orizzontale, microfono a clip, luce frontale.

**Traccia (da adattare a parole proprie):**
1. *(0–10s)* "Sono Marialuisa Maffei, Consulente del Lavoro iscritta all'Ordine di Firenze."
2. *(10–30s)* "Nel nostro studio in via Duccio di Buoninsegna seguiamo aziende e privati: consulenza del
   lavoro, buste paga, adempimenti fiscali, tributari e contabilità."
3. *(30–45s)* "Ogni servizio ha un referente dedicato: per le paghe Ilaria e Miriam, per la
   contabilità Sandra e io."
4. *(45–60s)* "Siamo aperti dal lunedì al venerdì, dalle 9 alle 13. Ci trovate allo 055 710964."

### 4c. Clip verticali (15–30 secondi)

Per scheda Google Business, Instagram, LinkedIn: una domanda frequente per clip
(es. "Cosa fa un consulente del lavoro?"), riprese dal vero.

## 5. Specifiche tecniche e inserimento nel sito

**Foto**
- Formato sorgente: JPG o PNG, lato lungo almeno 2000 px.
- Nome file descrittivo, minuscolo, con trattini: `ritratto-marialuisa-maffei-consulente-lavoro.jpg`.
- Copiale in `design/images/` e lancia `npm run assets`: lo script crea le versioni WebP
  (480/800/1200 px) in `src/assets/img/`, da usare con `srcset` come le immagini attuali.
- Testo `alt` sempre descrittivo e veritiero (cosa si vede, non parole chiave a caso).

**Loop video della hero**
- MP4 (H.264) + WebM, 1280×720, 8–12 s, **senza audio**, peso sotto i 2–3 MB.
- Inserimento: `<video autoplay muted loop playsinline preload="none" poster="...webp">`, con la
  foto come poster, e disattivato se l'utente ha "riduci movimento" attivo.

**Video di presentazione**
- Caricalo su YouTube (titolo: "Studio Maffei – Consulente del Lavoro a Firenze") e incorporalo
  nella pagina con caricamento differito.
- Aggiungi ai dati strutturati un `VideoObject` (titolo, descrizione, miniatura, data,
  durata, URL) e pubblica nella pagina la **trascrizione** del parlato: è il testo che gli
  assistenti AI leggono e citano.
- Aggiungi il video anche alla `sitemap.xml` (estensione video) e a `public/llms.txt`.
