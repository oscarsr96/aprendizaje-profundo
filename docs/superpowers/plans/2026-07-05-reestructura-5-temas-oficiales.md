# Reestructura del sitio a los 5 temas oficiales — Plan de implementación

> **Para quien ejecute (agente o persona):** implementar tarea a tarea. Los pasos usan
> checkbox (`- [ ]`) para seguimiento. Verificación de cada tarea en navegador con Playwright
> (patrón cache-bust `?v=N`, ver `tasks/lessons.md`). Commit por tarea.

**Goal:** Reorganizar el sitio del curso (hoy 9 "temas" planos) para que refleje los **5 temas oficiales de la Guía Docente G227**, con el material existente y el nuevo colocado como **subtemas**, sin romper URLs públicas ni de Colab.

**Architecture:** El sitio es estático (Vercel), decks que reusan `script.js`+`styles.css`, interactivos autocontenidos, repasos con motor de quiz, labs con notebooks en `files/tema-N/`. La reestructura es **de capa de presentación**: se reconstruye `index.html` en 5 secciones (una por tema oficial), cada una con sub-bloques de subtema que enlazan a los ficheros existentes (sin renombrarlos). Se reetiquetan las cabeceras de los decks al esquema `Tema X · Subtema`. Se crea el contenido nuevo que exige el Tema 3 oficial (no supervisado / autoencoders / RBF).

**Tech Stack:** HTML/CSS/JS estático · Keras/TensorFlow (notebooks `.ipynb`) · `generate-manifest.js` (Node) · Playwright (verificación) · Vercel (deploy en push a `main`).

## Global Constraints

- **No renombrar ficheros existentes.** `sesion-t7.html`, `files/tema-7/…`, URLs de Colab, etc. se mantienen como **slugs internos estables**. Solo cambian las etiquetas visibles. (Evita romper enlaces guardados y URLs de Colab.)
- **Contenido nuevo con slugs descriptivos**, no numéricos (p. ej. `sesion-autoencoders.html`, `files/autoencoders/`).
- Sistema de diseño existente: variables CSS `--ink #1a1f6c / --accent #ff5700 / --gold #fe961f / --ok #0796a3`; fuentes Taviraj + Inter Tight + JetBrains Mono. Reusar clases existentes (`.picker`, `.picker-four`, `.card`, `.level-band`, `.level-title`, `.card-temaN`).
- Cada deck nuevo reusa `./script.js` + `./styles.css` y sigue la estructura de `sesion-t9.html` (portada, agenda, divisores, cierre, ~18 slides).
- Notebooks: validar JSON (`python3 -c "import json; json.load(open(...))"`) y regenerar manifest (`node generate-manifest.js`) antes de commit.
- Verificación obligatoria en navegador antes de cada commit (Playwright, cache-bust `?v=N`). 0 errores de consola.
- Commits en `main`; push despliega en Vercel.
- **Autoridad pedagógica del contenido = profesor.** El contenido curricular nuevo (Tema 3) queda para validación del experto; los notebooks no se ejecutan aquí.

---

## Decisiones cerradas (2026-07-04, confirmadas por el usuario)

1. **Evaluación → Tema 5** (coincide con el subtema oficial "Validación y métricas de evaluación"). No va al Tema 1.
2. **Se crea el contenido nuevo del Tema 3** (no supervisado + autoencoders + RBF), no solo se recoloca lo existente.
3. **Navegación simple:** 5 secciones de tema, cada una con una lista de subtemas (sub-bandas), sin plegables ni JS extra.
4. **Sin renombrado de ficheros** (ver Global Constraints).

---

## Mapeo definitivo (pieza por pieza)

Cada "pieza" es un fichero HTML/notebook existente. Columna derecha = su destino (tema oficial · subtema).

| Pieza actual (fichero) | Destino (Tema oficial · Subtema) |
|---|---|
| `sesion-t5.html`, `repaso-t5.html` (panorámica) | **T1** · 1.1 Panorámica y estado del arte |
| `sesion1.html`, `sesion2.html`, `lab-t1.html`, `repaso1.html` (perceptrón) | **T2** · 2.1 El perceptrón |
| `sesion-t2.html`, `practica-t2.html`, `lab-t2.html`, `repaso-t2.html` (MLP) | **T2** · 2.2 Perceptrón multicapa (MLP) |
| `sesion-t7.html`, `practica-t7.html`, `lab-t7.html`, `repaso-t7.html` (entrenamiento) | **T2** · 2.3 Entrenamiento |
| `sesion-t8.html`, `practica-t8.html`, `lab-t8.html`, `repaso-t8.html` (generalización) | **T2** · 2.4 Sobreajuste y regularización |
| *(nuevo)* deck+práctica+lab+repaso autoencoders | **T3** · 3.1 No supervisado y autoencoders |
| `lab-t5.html` + *(nuevo deck breve)* GAN | **T3** · 3.2 Modelos generativos (GAN) |
| *(nuevo, ligero)* RBF | **T3** · 3.3 Redes de base radial (RBF) |
| `sesion-t4.html`, `practica-t4.html`, `lab-t4.html`, `repaso-t4.html` (CNN) | **T4** · 4.1 Redes convolucionales (CNN) |
| `sesion-t3.html`, `practica-t3.html`, `lab-t3.html`, `repaso-t3.html` (LSTM) | **T4** · 4.2 Modelos dinámicos: RNN / LSTM |
| `sesion-t6.html`, `practica-t6.html`, `lab-t6.html`, `repaso-t6.html` (Transformers) | **T4** · 4.3 Atención y Transformers |
| `practica-t5.html` (ataque adversario) | **T4** · 4.4 Limitaciones y desafíos |
| `sesion-t9.html`, `practica-t9.html`, `lab-t9.html`, `repaso-t9.html` (evaluación) | **T5** · 5.1 Validación y métricas de evaluación |
| *(landing curado)* enlaces a todos los labs Keras | **T5** · 5.2 Librerías y casos aplicados |

**Notas del mapeo:**
- El actual T5 se **reparte**: deck+repaso → T1; lab GAN → T3; práctica adversario → T4.
- `repaso-t5.html` cubre toda la panorámica (incluye alguna pregunta generativa/adversaria); se deja en T1 tal cual (aceptable como "foto completa"). Si se quiere pureza, reescoparlo es opcional y NO bloquea el plan.
- Los labs se quedan con su subtema; el subtema **5.2** es un índice curado que los reagrupa como "casos de implementación" (sin duplicar ficheros).

**Etiquetas visibles nuevas** (fichero → cabecera que debe mostrar):

| Fichero | `brand-text` / `bar-sub` nuevo | `cover-meta` Tema (solo decks) |
|---|---|---|
| sesion-t5 | `Aprendizaje Profundo · Tema 1 · Panorámica` | `1 · Panorámica y estado del arte` |
| sesion1 / sesion2 | `… · Tema 2 · El perceptrón` | `2.1 · El perceptrón` |
| sesion-t2 | `… · Tema 2 · MLP` | `2.2 · Perceptrón multicapa` |
| sesion-t7 | `… · Tema 2 · Entrenamiento` | `2.3 · Entrenamiento` |
| sesion-t8 | `… · Tema 2 · Regularización` | `2.4 · Sobreajuste y regularización` |
| sesion-t4 | `… · Tema 4 · CNN` | `4.1 · Redes convolucionales` |
| sesion-t3 | `… · Tema 4 · LSTM` | `4.2 · Modelos dinámicos (RNN/LSTM)` |
| sesion-t6 | `… · Tema 4 · Transformers` | `4.3 · Atención y Transformers` |
| sesion-t9 | `… · Tema 5 · Evaluación` | `5.1 · Validación y métricas` |
| (prácticas/labs/repasos) | análogo: `Tema X · <subtema>` en su `.bar-sub` | — |

---

## Fase A — Reestructura de la landing (`index.html`)

Objetivo: pasar de 9 `section#tema-N` planas a 5 secciones (temas oficiales) con sub-bloques de subtema.

### Task A1: CSS de sub-banda de subtema

**Files:**
- Modify: `index.html` (bloque `<style>`, junto a `.level-band`)

**Interfaces:**
- Produces: clases `.subtema-band`, `.subtema-name`, `.subtema-rule` usadas por A2–A6.

- [ ] **Paso 1:** Añadir CSS tras las reglas `.level-band` (reusa su estética, un escalón menor):

```css
.subtema-band { display: flex; align-items: center; gap: 14px; margin: 30px 0 10px; }
.subtema-band .subtema-name {
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent-deep);
  white-space: nowrap;
}
.subtema-band .subtema-rule { flex: 1; height: 1px; background: var(--line); }
```

- [ ] **Paso 2:** Verificar que compila (no rompe layout): abrir `index.html?v=a1` en Playwright, 0 errores de consola.
- [ ] **Paso 3:** Commit: `docs/index: CSS de sub-banda de subtema (reestructura 5 temas)`.

### Task A2: Sección Tema 1 · Introducción

**Files:**
- Modify: `index.html` (reemplazar `section#tema-1` y colocar el nuevo `section#tema-1` con el subtema panorámica)

**Interfaces:**
- Consumes: `.subtema-band` (A1).
- Produces: ancla `#tema-1` con `.level-band` "Tema 1 · Introducción al Aprendizaje Profundo" + subtema "1.1 Panorámica y estado del arte" con picker (cards → `sesion-t5.html`, `repaso-t5.html`).

- [ ] **Paso 1:** Sustituir el contenido de `section#tema-1` por: `.level-band` (nombre "Tema 1 · Introducción al Aprendizaje Profundo") + `.level-title` + una `.subtema-band` ("1.1 · Panorámica y estado del arte") + `.picker` con 2 cards (`card-tema5` → `sesion-t5.html` "Teoría · Panorámica"; `card-repaso` → `repaso-t5.html"). Reusar los `.card-orn` SVG existentes de esas piezas.
- [ ] **Paso 2:** Verificar en `index.html?v=a2`: `section#tema-1` existe, tiene 1 subtema-band, 2 cards con hrefs correctos, 0 errores consola.
- [ ] **Paso 3:** Commit: `docs/index: Tema 1 (Introducción · panorámica)`.

### Task A3: Sección Tema 2 · Fundamentos de Redes Neuronales

**Files:** Modify: `index.html` (reemplazar `section#tema-2`; **eliminar** las antiguas `section#tema-7`, `#tema-8` y la vieja `#tema-1` de perceptrón, integrándolas aquí como subtemas).

- [ ] **Paso 1:** Construir `section#tema-2` con `.level-band` "Tema 2 · Fundamentos de Redes Neuronales" y **4 sub-bloques** (cada uno `.subtema-band` + `.picker`):
  - 2.1 El perceptrón → cards a `sesion1.html`, `sesion2.html`, `lab-t1.html`, `repaso1.html` (picker-four).
  - 2.2 Perceptrón multicapa → `sesion-t2`, `practica-t2`, `lab-t2`, `repaso-t2` (picker-four).
  - 2.3 Entrenamiento → `sesion-t7`, `practica-t7`, `lab-t7`, `repaso-t7` (picker-four).
  - 2.4 Sobreajuste y regularización → `sesion-t8`, `practica-t8`, `lab-t8`, `repaso-t8` (picker-four).
  - Reutilizar los `.card-orn` y textos de las cards actuales de esas secciones (copiar del index actual antes de borrarlas).
- [ ] **Paso 2:** Borrar del `index.html` las antiguas secciones `#tema-7` y `#tema-8` (ya integradas) y la vieja sección de perceptrón. Confirmar que no quedan duplicados de esas cards.
- [ ] **Paso 3:** Verificar `index.html?v=a3`: `section#tema-2` con 4 subtema-bands y 16 cards; hrefs correctos; sin secciones huérfanas.
- [ ] **Paso 4:** Commit: `docs/index: Tema 2 (Fundamentos: perceptrón, MLP, entrenamiento, regularización)`.

### Task A4: Sección Tema 4 · Arquitecturas y Modelos Profundos

*(Se hace antes que el Tema 3 porque el 3 es contenido nuevo; el 4 solo recoloca.)*

**Files:** Modify: `index.html` (nueva `section#tema-4`; integrar antiguas `#tema-3` (LSTM), `#tema-6` (Transformers) y la práctica adversaria del `#tema-5`).

- [ ] **Paso 1:** Construir `section#tema-4` "Tema 4 · Arquitecturas y Modelos Profundos" con 4 sub-bloques:
  - 4.1 Redes convolucionales → `sesion-t4`, `practica-t4`, `lab-t4`, `repaso-t4`.
  - 4.2 Modelos dinámicos: RNN/LSTM → `sesion-t3`, `practica-t3`, `lab-t3`, `repaso-t3`.
  - 4.3 Atención y Transformers → `sesion-t6`, `practica-t6`, `lab-t6`, `repaso-t6`.
  - 4.4 Limitaciones y desafíos → 1 card a `practica-t5.html` (ataque adversario). Subtema ligero (picker de 1 card; usar layout `picker-three`/estilo simple).
- [ ] **Paso 2:** Borrar antiguas `#tema-3` y `#tema-6`; quitar la card de `practica-t5` de donde estuviera.
- [ ] **Paso 3:** Verificar `index.html?v=a4`: 4 subtemas, hrefs correctos.
- [ ] **Paso 4:** Commit: `docs/index: Tema 4 (Arquitecturas: CNN, LSTM, Transformers, límites)`.

### Task A5: Sección Tema 5 · Implementación y Aplicaciones Prácticas

**Files:** Modify: `index.html` (nueva `section#tema-5`; integrar antigua `#tema-9` (evaluación); construir subtema 5.2 "casos aplicados" como índice curado de labs).

- [ ] **Paso 1:** `section#tema-5` "Tema 5 · Implementación y Aplicaciones Prácticas":
  - 5.1 Validación y métricas → `sesion-t9`, `practica-t9`, `lab-t9`, `repaso-t9`.
  - 5.2 Librerías y casos aplicados → picker de cards-enlace a los labs Keras existentes (`lab-t1`, `lab-t2`, `lab-t3`, `lab-t4`, `lab-t5`, `lab-t6`, `lab-t7`, `lab-t8`, `lab-t9`), presentados como "casos". Reusar `card-orn` de laboratorio. (Sin ficheros nuevos: son enlaces.)
- [ ] **Paso 2:** Borrar antigua `#tema-9`.
- [ ] **Paso 3:** Verificar `index.html?v=a5`.
- [ ] **Paso 4:** Commit: `docs/index: Tema 5 (Implementación + evaluación + casos)`.

### Task A6: TOC lateral + scroll-spy a 5 temas

**Files:** Modify: `index.html` (bloque `.toc-link` de navegación lateral y el JS de scroll-spy al final).

- [ ] **Paso 1:** Reemplazar los 9 `.toc-link` por 5, uno por tema oficial (`#tema-1`…`#tema-5`) con etiquetas cortas ("Tema 1 · Introducción", etc.).
- [ ] **Paso 2:** Confirmar que el scroll-spy (`document.querySelectorAll('.toc-link')` + observer de `.section`) sigue funcionando con 5 anclas (mismo mecanismo, menos elementos).
- [ ] **Paso 3:** Verificar `index.html?v=a6`: TOC tiene 5 enlaces; al hacer scroll, `.is-active` se mueve; `badLinks` (fetch HEAD de todos los hrefs de cards) vacío.
- [ ] **Paso 4:** Commit: `docs/index: TOC y scroll-spy a 5 temas`.

---

## Fase B — Reetiquetado de cabeceras y enlaces cruzados

Objetivo: que cada deck/página muestre su tema·subtema nuevo, y que los enlaces "Tema X" internos sean coherentes. **No se renombran ficheros.**

### Task B1: Reetiquetar cabeceras (barra superior + portada de decks)

**Files:** Modify (solo texto de cabecera): todos los `sesion*.html`, `practica-t*.html`, `lab-t*.html`, `repaso-t*.html`. Ver tabla "Etiquetas visibles nuevas" arriba.

**Patrón (ejemplo worked, `sesion-t7.html`):**
- `<span class="brand-text">Aprendizaje Profundo · Tema 7</span>` → `… · Tema 2 · Entrenamiento`
- `<span class="meta-val">7 · Entrenamiento</span>` (cover-meta) → `2.3 · Entrenamiento`
- En prácticas/labs/repasos: `<span class="bar-sub">· Aprendizaje Profundo · Tema 7</span>` → `· Aprendizaje Profundo · Tema 2 · Entrenamiento`; `<span class="hero-kicker">Tema 7 · Repaso</span>` → `Tema 2 · Entrenamiento · Repaso`.

- [ ] **Paso 1:** Aplicar el reetiquetado fichero a fichero según la tabla. Un `grep -rn "Tema 7"` (y 1–9) por fichero para no dejar ninguno.
- [ ] **Paso 2:** Verificar una muestra representativa en Playwright (un deck de cada tema): la cabecera muestra la etiqueta nueva; 0 errores.
- [ ] **Paso 3:** Commit por tema (5 commits) o uno global: `docs: reetiquetar cabeceras al esquema tema·subtema`.

### Task B2: Corregir enlaces cruzados en cierres de decks

**Files:** Modify: cierres (`slide-close`) y CTAs de los decks que referencian "Tema N siguiente" o numeraciones viejas (revisar `sesion-t2`, `sesion-t3`, `sesion-t4`, `sesion-t5`, `sesion-t6`…).

- [ ] **Paso 1:** `grep -rn "Tema [0-9]" sesion*.html` y actualizar cada mención al nuevo esquema (p. ej. el cierre de `sesion-t5` ya apunta a "Tema 6 · Atención" → debe pasar a "Tema 4 · Atención y Transformers", y el flujo "seguir el curso" debe apuntar al siguiente subtema lógico).
- [ ] **Paso 2:** Verificar que los `href` de esos CTAs siguen resolviendo (los ficheros no cambian de nombre, así que sólo cambia el texto).
- [ ] **Paso 3:** Commit: `docs: coherencia de enlaces cruzados entre temas`.

---

## Fase C — Contenido nuevo del Tema 3 (No supervisado / Autoencoders / RBF)

Objetivo: rellenar el Tema 3 oficial. **Sigue el patrón de construcción por tema** ya probado (spec → deck `sesion-*` reusando `script.js`+`styles.css` → `practica-*` interactivo autocontenido → `repaso-*` con motor de quiz → `lab-*` + notebook → card en index → verificar → commit). Slugs descriptivos.

> **Scope note:** esta fase es esencialmente construir 1–3 bundles de contenido nuevo y es el trozo más grande. Puede ejecutarse en su propia sesión. El contenido curricular debe validarlo el profesor.

### Task C1: Subtema 3.1 — No supervisado y autoencoders (bundle completo)

**Files:**
- Create: `sesion-autoencoders.html` (deck, ~16–18 slides: aprendizaje no supervisado, idea de compresión, encoder/decoder, cuello de botella, reconstrucción, denoising, usos).
- Create: `practica-autoencoders.html` (interactivo autocontenido: p. ej. slider de tamaño del código latente → calidad de reconstrucción; canvas + JS puro, sin libs).
- Create: `repaso-autoencoders.html` (motor de quiz copiado de `repaso-t9.html`; 10 preguntas).
- Create: `lab-autoencoders.html` + `files/autoencoders/Lab_Autoencoder_MNIST.ipynb` (Keras: autoencoder denoising sobre MNIST; interpolación en el espacio latente).
- Modify: `index.html` (subtema 3.1 con su picker-four).

- [ ] **Paso 1:** Deck `sesion-autoencoders.html` (reusar chasis de `sesion-t9.html`; cabecera "Tema 3 · No supervisado y autoencoders").
- [ ] **Paso 2:** Interactivo `practica-autoencoders.html` (autocontenido).
- [ ] **Paso 3:** Repaso `repaso-autoencoders.html` (10 retos).
- [ ] **Paso 4:** Lab `lab-autoencoders.html` + notebook; validar JSON; `node generate-manifest.js`.
- [ ] **Paso 5:** Card/subtema 3.1 en `index.html`.
- [ ] **Paso 6:** Verificar bundle en Playwright (deck ~18 slides, interactivo funciona, repaso arranca, lab 200); 0 errores.
- [ ] **Paso 7:** Commit: `feat: Tema 3.1 (No supervisado y autoencoders) — bundle completo`.

### Task C2: Subtema 3.2 — Modelos generativos (GAN)

**Files:**
- Create: `sesion-generativos.html` (deck breve, ~12–16 slides: generativos vs discriminativos, la idea adversaria, generador/discriminador, el duelo, panorámica GAN/VAE/difusión). Puede reutilizar/ampliar el material generativo que hoy vive en `sesion-t5`.
- Reuse: `lab-t5.html` + `files/tema-5/Lab_Tema5_GAN_MNIST.ipynb` (ya existe; **no** renombrar).
- Create (opcional): `repaso-generativos.html`.
- Modify: `index.html` (subtema 3.2 con cards a `sesion-generativos` + `lab-t5`).

- [ ] **Paso 1:** Deck `sesion-generativos.html`.
- [ ] **Paso 2:** (Opcional) repaso.
- [ ] **Paso 3:** Subtema 3.2 en index (enlaza al lab existente `lab-t5.html`).
- [ ] **Paso 4:** Verificar; commit: `feat: Tema 3.2 (Modelos generativos · GAN)`.

### Task C3: Subtema 3.3 — Redes de base radial (RBF) (ligero)

**Files:**
- Create: `sesion-rbf.html` (deck ligero, ~10–12 slides: idea de función de base radial, centros y anchura, RBF vs MLP, cuándo usarlas).
- Create (opcional): `repaso-rbf.html`.
- Modify: `index.html` (subtema 3.3).

- [ ] **Paso 1:** Deck `sesion-rbf.html`.
- [ ] **Paso 2:** Subtema 3.3 en index.
- [ ] **Paso 3:** Verificar; commit: `feat: Tema 3.3 (Redes de base radial · RBF)`.

---

## Fase D — Verificación integral y cierre

### Task D1: Auditoría global del index

- [ ] **Paso 1:** En Playwright sobre `index.html?v=final`: exactamente **5** `section[id^=tema-]`; cada una con sus subtema-bands esperadas; **fetch HEAD de todos los hrefs de cards → todos 200** (sin enlaces rotos); TOC con 5 enlaces; 0 errores de consola.
- [ ] **Paso 2:** `grep -rn "Tema [6-9]"` en todo el repo para cazar etiquetas viejas olvidadas (los ficheros conservan su slug, pero **ningún texto visible** debe decir "Tema 6/7/8/9").
- [ ] **Paso 3:** `node generate-manifest.js` y confirmar que el manifest incluye los notebooks nuevos.

### Task D2: Actualizar memoria y specs

- [ ] **Paso 1:** Actualizar `curso-ampliacion-plan.md` (memoria): marcar la reestructura hecha, dejar constancia del mapeo 5-temas y de qué quedó (validación del profesor, ejecución de notebooks).
- [ ] **Paso 2:** Anotar en `tasks/lessons.md` cualquier aprendizaje nuevo.
- [ ] **Paso 3:** Push final a `main`; confirmar deploy en Vercel.

---

## Verificación (patrón)

Para cada tarea con cambios visibles, tras editar:
1. Arrancar servidor local: `python3 -m http.server 8899` (en background).
2. En Playwright, navegar con **cache-bust**: `http://localhost:8899/<pagina>.html?v=<N incremental>` (el navegador sirve JS/HTML viejo si no se cambia la query — ver `tasks/lessons.md`).
3. Comprobar estructura con `browser_evaluate` (contar secciones/cards, leer hrefs, `fetch HEAD` para enlaces rotos) y `browser_console_messages` nivel `error` (debe ser 0).
4. Para notebooks: `python3 -c "import json; json.load(open('<ruta>'))"` + `node generate-manifest.js`.

---

## Self-review (checklist antes de ejecutar)

1. **Cobertura del mapeo:** cada uno de los 9 bundles actuales tiene destino en la tabla — ✔. Cada tema oficial (1–5) tiene al menos un subtema con contenido — ✔ (T3 vía Fase C).
2. **Sin placeholders:** las tareas de contenido nuevo (Fase C) remiten al patrón de construcción por tema ya probado; los ficheros y slugs están nombrados.
3. **Consistencia de nombres:** clases nuevas (`.subtema-band/.subtema-name/.subtema-rule`) definidas en A1 y usadas en A2–A6; slugs nuevos (`sesion-autoencoders`, `sesion-generativos`, `sesion-rbf`, `files/autoencoders/`) coherentes entre Fase C e index.
4. **Riesgo controlado:** no se renombran ficheros existentes → URLs de Colab y enlaces guardados intactos. Cada fase es commit independiente y reversible.

## Riesgos y mitigaciones

- **`repaso-t5` cubre varios temas nuevos** → se deja en T1 (panorámica); reescopar es opcional, no bloquea.
- **Desajuste slug↔etiqueta** (fichero `sesion-t7` muestra "Tema 2") → invisible para el alumno (navega por cards); documentado como deuda aceptada.
- **Fase C es grande** (contenido nuevo) → puede ir en sesión aparte; el resto (A, B, D) deja el sitio ya reestructurado y coherente aunque el Tema 3 empiece con solo 1 subtema.

## Handoff de ejecución

Al retomar: ejecutar Fase A → B → D primero (reestructura completa con lo existente), y Fase C (contenido nuevo T3) como bloque siguiente, idealmente en su propia sesión. Recomendado: subagente por tarea con revisión entre tareas, o ejecución inline con checkpoints por fase.
