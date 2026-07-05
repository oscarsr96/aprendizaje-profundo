# Tarea (Fase B): Reetiquetar cabeceras y referencias al esquema de 5 temas

## Contexto
Sitio estático de un curso. Se acaba de reestructurar la landing: los 9 "temas" planos ahora
se agrupan en **5 temas oficiales con subtemas**. Los **ficheros NO se han renombrado** (siguen
`sesion-t7.html`, etc., como slugs internos), pero sus **etiquetas visibles** todavía dicen el
número viejo ("Tema 7"). Hay que actualizarlas al nuevo esquema `Tema X · Subtema`.

**Edita solo los ficheros de página listados abajo. NO toques `index.html` ni `files/`.**

## Mapa maestro (tema/subtema nuevo por grupo de ficheros)

| Grupo (contenido) | Ficheros | Nº y nombre nuevos |
|---|---|---|
| Panorámica | `sesion-t5.html`, `repaso-t5.html` | **Tema 1** · Panorámica y estado del arte |
| Perceptrón | `sesion1.html`, `sesion2.html`, `lab-t1.html`, `repaso1.html` | **Tema 2** · El perceptrón *(subtema 2.1)* |
| MLP | `sesion-t2.html`, `practica-t2.html`, `lab-t2.html`, `repaso-t2.html` | **Tema 2** · Perceptrón multicapa *(2.2)* |
| Entrenamiento | `sesion-t7.html`, `practica-t7.html`, `lab-t7.html`, `repaso-t7.html` | **Tema 2** · Entrenamiento *(2.3)* |
| Regularización | `sesion-t8.html`, `practica-t8.html`, `lab-t8.html`, `repaso-t8.html` | **Tema 2** · Sobreajuste y regularización *(2.4)* |
| GAN | `lab-t5.html` | **Tema 3** · Modelos generativos *(3.2)* |
| CNN | `sesion-t4.html`, `practica-t4.html`, `lab-t4.html`, `repaso-t4.html` | **Tema 4** · Redes convolucionales *(4.1)* |
| RNN/LSTM | `sesion-t3.html`, `practica-t3.html`, `lab-t3.html`, `repaso-t3.html` | **Tema 4** · Modelos dinámicos: RNN/LSTM *(4.2)* |
| Transformers | `sesion-t6.html`, `practica-t6.html`, `lab-t6.html`, `repaso-t6.html` | **Tema 4** · Atención y Transformers *(4.3)* |
| Adversario | `practica-t5.html` | **Tema 4** · Limitaciones y desafíos *(4.4)* |
| Evaluación | `sesion-t9.html`, `practica-t9.html`, `lab-t9.html`, `repaso-t9.html` | **Tema 5** · Validación y métricas *(5.1)* |

## Parte 1 — Etiquetas de cabecera (mecánico, por fichero)

En cada fichero, según su tipo, actualiza estos textos al nuevo tema·subtema:

- **Decks (`sesion*.html`):**
  - `<span class="brand-text">Aprendizaje Profundo · Tema N</span>` → `… · Tema X · <subtema corto>`
    (ej. `Aprendizaje Profundo · Tema 2 · Entrenamiento`).
  - cover-meta: `<span class="meta-val">N · Título</span>` → `<span class="meta-val">X.Y · <subtema></span>`
    (ej. `2.3 · Entrenamiento`).
  - `<title>… · Tema N</title>` → `… · Tema X · <subtema>`.
- **`practica-*.html` y `lab-*.html`:**
  - `<span class="bar-sub">· Aprendizaje Profundo · Tema N</span>` → `· Aprendizaje Profundo · Tema X · <subtema>`.
  - `<title>… · Tema N · …</title>` → sustituir el `Tema N` por `Tema X`.
- **`repaso-*.html`:**
  - `<span class="bar-sub">· Aprendizaje Profundo · Repaso Tema N</span>` → `· … · Repaso · Tema X · <subtema>`.
  - `<span class="hero-kicker">Tema N · Repaso</span>` → `Tema X · <subtema> · Repaso`.
  - `<title>… Repaso Tema N</title>` → `… Repaso Tema X`.

**Subtemas cortos a usar** (para brand-text/bar-sub): "El perceptrón", "Perceptrón multicapa",
"Entrenamiento", "Sobreajuste y regularización", "Panorámica", "Modelos generativos",
"Redes convolucionales", "Modelos dinámicos", "Atención y Transformers",
"Limitaciones y desafíos", "Validación y métricas".

## Parte 2 — Referencias de contenido a otros temas (requiere criterio)

Dentro de las diapositivas hay frases que **referencian otro tema por su número viejo**. Hay que
reapuntarlas al número NUEVO del tema al que se refieren (no al del fichero). Usa este mapa
**tema-contenido → nueva ubicación**:

- Perceptrón → Tema 2 · Panorámica → Tema 1 · MLP → Tema 2 · Entrenamiento → Tema 2 ·
  Regularización/sobreajuste → Tema 2 · **CNN → Tema 4** · **LSTM/RNN/secuencias → Tema 4** ·
  **Atención/Transformers → Tema 4** · Evaluación/métricas → Tema 5 · Generativo/GAN → Tema 3 ·
  Autoencoders → Tema 3 · Ataque adversario → Tema 4.

**Cómo distinguirlas:** haz `grep -n "Tema [0-9]" <fichero>` en cada deck. Cada resultado es:
  (a) una **etiqueta de cabecera** (brand-text/cover-meta/title) → ya cubierta en la Parte 1; o
  (b) una **referencia de contenido** dentro de una diapositiva (texto tipo "El Tema 3 nos dejó
      con las LSTM…", "lo verás en el Tema 6", "como en el Tema 4 con las CNN") → reescríbela con
      el número nuevo del tema referido según el mapa (ej. "El Tema 3 nos dejó con las LSTM" →
      "El Tema 4 nos dejó con las LSTM"; "lo verás en el Tema 6" [Transformers] → "en el Tema 4").

Casos concretos que sabemos que existen (revísalos, y busca más con grep):
- `sesion-t6.html`: menciona "el Tema 3" refiriéndose a las LSTM → debe decir "el Tema 4".
- `sesion-t6.html`: su cierre/CTA "seguir el curso" no aplica; solo corrige referencias factuales.
- Los cierres de `sesion-t5.html` (ya reescrito antes) apuntan a "Tema 6 · Atención y
  Transformers" → debe decir "Tema 4 · Atención y Transformers".

**No reescribas el "flujo de siguiente tema"** (CTAs genéricos de "seguir el curso") inventando un
orden; si un CTA apunta a un fichero concreto, deja el `href` como está y solo corrige el número
en el texto si nombra un tema-contenido del mapa. Si dudas de una mención, anótala en el informe
en vez de adivinar.

## Verificación (hazla y repórtala)
1. `grep -rn "Tema [6-9]" sesion*.html practica-t*.html lab-t*.html repaso-t*.html` →
   **no debe quedar ninguna** etiqueta de cabecera ni referencia con Tema 6/7/8/9
   (salvo que sea claramente contenido histórico correcto; si queda alguna, justifícala).
2. Para 3 ficheros de muestra (un deck, una práctica, un repaso de temas distintos), pega el
   `brand-text`/`bar-sub`/`hero-kicker` resultante en el informe para confirmar el formato.
3. `git diff --stat` → solo ficheros de página modificados (ni `index.html` ni `files/`).

## Entregable
- UN commit en la rama `reestructura-5-temas`, mensaje:
  `docs: reetiquetar cabeceras y referencias al esquema de 5 temas (Fase B)`
- Informe completo en `.superpowers/sdd/faseB-report.md` (lista de ficheros tocados, resultado de
  las 3 verificaciones, y cualquier mención dudosa que dejaras sin cambiar).
- Devuélveme SOLO: estado (DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_CONTEXT), hash del commit,
  y un resumen de una línea.
