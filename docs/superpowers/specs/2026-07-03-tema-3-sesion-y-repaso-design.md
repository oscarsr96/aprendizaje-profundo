# Tema 3 (Redes LSTM) — teoría + repaso — Diseño

**Fecha:** 2026-07-03
**Autor:** Óscar Sánchez Rueda (con Claude Code)

## Objetivo

Crear las dos primeras piezas del Tema 3 replicando el patrón ya aprobado del Tema 2:

1. **`sesion-t3.html`** — deck de teoría (Redes LSTM), clon de `sesion-t2.html`.
2. **`repaso-t3.html`** — repaso autocorregible (10 retos), clon de `repaso-t2.html`.

Y añadir el bloque **Tema 3** a la landing. La **práctica** queda fuera de alcance (no hay material fuente en `files/tema-3/`; sería un interactivo inventado, para más adelante).

## Contexto

- Plantillas: `sesion-t2.html` (deck: `<section class="slide">` + `script.js` + `styles.css`) y `repaso-t2.html` (motor de quiz autocontenido inline).
- Landing (`index.html`): secciones por tema (`#tema-1`, `#tema-2`), TOC lateral, una nota "Temas 3–5 · próximamente".
- Fuente: `files/tema-3/T3. Redes LSTM (mejorado).pptx` (19 slides, 4 bloques).

## Parte A — `sesion-t3.html` (deck de teoría)

Réplica de `sesion-t2.html`. Título de pestaña: `CUNEF · Aprendizaje Profundo · Tema 3`. Mapeo del pptx (19 slides) → deck (19 slides):

| # | Slide | Origen |
|---|-------|--------|
| 1 | Portada "Redes LSTM" | s1 |
| 2 | Agenda / índice | s2–s3 |
| 3 | **Divider** Bloque 1 · El problema | s4 |
| 4 | Vanishing / exploding gradient | s5 |
| 5 | Dependencias a largo plazo | s6 |
| 6 | **Divider** Bloque 2 · La celda LSTM | s7 |
| 7 | Tres puertas por celda (con diagrama de celda) | s8 |
| 8 | Cell state · la cinta de memoria | s9 |
| 9 | Las puertas en detalle (sigmoide / tanh) | s10 |
| 10 | **Divider** Bloque 3 · Entrenamiento y aplicaciones | s11 |
| 11 | Entrenamiento (BPTT, ADAM, requisitos) | s12 |
| 12 | Aplicaciones y arquitecturas (seq2seq…) | s13 |
| 13 | Aplicaciones reales (voz, NLP, visión) | s14 |
| 14 | **Divider** Bloque 4 · Variantes | s15 |
| 15 | Bi-LSTM | s16 |
| 16 | GRU | s17 |
| 17 | Atención → Transformers | s18 |
| 18 | **Cierre** Ideas clave (close-grid, → Tema 4) | s19 |
| 19 | **slide-close** Gracias / ¿Preguntas? | — |

- Diagrama SVG de una **celda LSTM** (estado Cₜ como cinta superior; puertas forget/input/output con sigmoides y tanh) en la slide 7 o 9.
- Diagrama de **decaimiento del gradiente** (RNN desplegada, magnitud que decae) en la slide 4.
- La slide de atención puede usar `slide-exercise` para el momento "de aquí salen los Transformers".

## Parte B — `repaso-t3.html` (10 retos)

Mismo motor que `repaso-t2.html`. 10 preguntas de Tema 3, mezcla de tipos (única, múltiple, clasificar), con explicación:

1. Qué es el vanishing/exploding gradient (única)
2. Por qué una RNN simple no aprende dependencias largas (única)
3. Las tres puertas y su función (clasificar: forget/input/output)
4. Qué es el cell state Cₜ (única)
5. Sigmoide (0–1) vs tanh (−1 a 1): rol de cada una (clasificar)
6. Cómo se entrena una LSTM (múltiple: BPTT, ADAM, muchos datos/GPU)
7. Qué arquitectura resuelve cada tarea (clasificar: etiquetado/clasificación/seq2seq)
8. Bi-LSTM: qué aporta (única)
9. GRU frente a LSTM (única)
10. Qué hace el mecanismo de atención (única)

Textos de resultados adaptados a Tema 3 (→ Tema 4). Enlace "Ver la sesión" → `sesion-t3.html`.

## Parte C — Landing (`index.html`)

- Nueva sección **`#tema-3` "Tema 3 · Redes LSTM"** con `picker-two`: tarjetas **Teoría** (`sesion-t3.html`, `card-tema3`) y **Repaso** (`repaso-t3.html`, `card-repaso`).
- TOC lateral: añadir **Tema 3**.
- La nota final pasa de "Temas 3–5" a **"Temas 4–5 · próximamente"**.

## Fuera de alcance (YAGNI)

- Práctica de Tema 3 (sin material fuente; interactivo a inventar más adelante).
- Temas 4–5 y renombrado de ficheros.

## Verificación

- `sesion-t3.html`: 19 slides, contador correcto, 0 errores de consola, diagramas renderizan.
- `repaso-t3.html`: motor 10/10 end-to-end, sin referencias a Tema 2.
- Landing: 3 secciones (Tema 1/2/3), TOC actualizado, enlaces correctos, una sola nota "Temas 4–5".
- Revisión visual en navegador.
