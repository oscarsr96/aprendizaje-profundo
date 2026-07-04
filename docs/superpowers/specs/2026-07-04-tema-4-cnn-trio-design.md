# Tema 4 (Redes convolucionales) — trío completo — Diseño

**Fecha:** 2026-07-04
**Autor:** Óscar Sánchez Rueda (con Claude Code)

## Objetivo

Completar el Tema 4 con las tres piezas, siguiendo el patrón de los Temas 2–3:

1. **`sesion-t4.html`** — deck de teoría (CNN), clon de `sesion-t3.html`.
2. **`practica-t4.html`** — herramienta interactiva: **visualizador de convolución + pooling** (clon del chasis de `practica-t3.html`).
3. **`repaso-t4.html`** — repaso autocorregible (10 retos), clon de `repaso-t3.html`.

Y añadir el bloque **Tema 4** a la landing.

## Contexto y fuentes

- Plantillas: `sesion-t3.html`, `practica-t3.html`, `repaso-t3.html`; sistema de diseño del sitio (navy/naranja/teal, Taviraj/Inter Tight/JetBrains Mono).
- Fuente teoría: `files/tema-4/T4. Redes convolucionales (mejorado).pptx` (18 slides, 4 bloques). Existe también el pptx fuente en inglés (`4. CNN.pptx`, Hung-yi Lee) y dos interactivos antiguos (`data_augmentation.html`, `fashion_mnist_dashboard.html`) con **otra estética**: no se reutilizan; se construye nuevo en el diseño del sitio.

## Parte A — `sesion-t4.html` (deck de teoría)

Réplica de `sesion-t3.html`. Título: `CUNEF · Aprendizaje Profundo · Tema 4`. Mapeo (18 pptx → 18 deck):

| # | Slide | Origen |
|---|-------|--------|
| 1 | Portada "Redes convolucionales" | s1 |
| 2 | Agenda / índice | s2–s3 |
| 3 | **Divider** Bloque 1 · La intuición | s4 |
| 4 | Aprender una imagen (patrones locales, pequeños, repetidos) | s5 |
| 5 | Conexiones locales y pesos compartidos | s6 |
| 6 | **Divider** Bloque 2 · Convolución y filtros | s7 |
| 7 | La capa convolucional (filtros) | s8 |
| 8 | La operación de convolución (producto escalar, stride, feature map) + **diagrama** | s9 |
| 9 | Imágenes RGB · 3 canales | s10 |
| 10 | **Divider** Bloque 3 · Pooling y arquitectura | s11 |
| 11 | Max pooling · submuestreo | s12 |
| 12 | La CNN completa (conv→pool→…→flatten→FC) + **diagrama de arquitectura** | s13 |
| 13 | Cómo comprime una CNN (3 formas) | s14 |
| 14 | **Divider** Bloque 4 · En la práctica | s15 |
| 15 | CNN en Keras (vector→tensor, params) | s16 |
| 16 | **slide-exercise** Aplicaciones (visión, AlphaGo, voz, texto) | s17 |
| 17 | **Cierre** Ideas clave (close-grid, → Tema 5) | s18 |
| 18 | **slide-close** Gracias / ¿Preguntas? | — |

- Diagrama SVG de **convolución** (filtro 3×3 sobre una malla → una celda del feature map) en la slide 8.
- Diagrama SVG de **arquitectura CNN** (imagen → conv → pool → conv → pool → flatten → FC → clase) en la slide 12.

## Parte B — `practica-t4.html` (visualizador de convolución)

Chasis de `practica-t3.html` (canvas + controles, diseño del sitio). Topbar → `index.html`, título "Tema 4 · Práctica".

**Bloque 1 — Convolución interactiva:**
- **Imagen de entrada**: malla editable ~7×7 con valores 0/1 (clic para alternar); presets de patrón (X, cruz, diagonal, borde).
- **Filtro 3×3**: editable con sliders/celdas; presets (borde vertical, borde horizontal, diagonal, identidad).
- **Stride**: 1 ó 2.
- **Feature map**: se calcula el producto escalar deslizante (convolución "valid") y se pinta como heatmap (divergente: negativo→azul, positivo→naranja).
- **Animación** "▶ deslizar": recorre las posiciones marcando la región receptiva y rellenando el mapa; también paso a paso.
- **Lectura en vivo** del producto escalar en la posición actual (los 9 productos y su suma).

**Bloque 2 — Pooling y código:**
- **Max pooling 2×2** sobre el feature map → mapa reducido (toggle/visualización).
- **Panel NumPy** (conv 2-D con bucles + max pool) y **snippet Keras** (`Conv2D`, `MaxPooling2D`, `Flatten`, `Dense`).

**Bloque 3 — Retos + encaje:** retos (diseña un filtro que detecte bordes verticales; observa cómo el stride 2 reduce el mapa; ¿qué le hace el pooling al tamaño?). Tarjeta Práctica en la landing.

## Parte C — `repaso-t4.html` (10 retos)

Motor de `repaso-t3.html`. 10 preguntas de CNN (mezcla de tipos):

1. Qué explotan las CNN (patrones locales y repetidos) (única)
2. Qué es un filtro / kernel (única)
3. La operación de convolución (producto escalar deslizante) (única)
4. Qué controla el stride (única)
5. Qué es un feature map (única)
6. Cómo comprime una CNN vs red densa (múltiple: conexiones locales, pesos compartidos, pooling)
7. Qué hace el max pooling (única)
8. Imágenes RGB: cuántos canales / cómo se aplica el filtro (única)
9. Orden de la arquitectura (clasificar/orden: conv, pooling, flatten, FC)
10. Aplicaciones de las CNN (clasificar: visión / AlphaGo / voz-texto)

Textos de resultados a Tema 4 (→ Tema 5). Enlace "Ver la sesión" → `sesion-t4.html`.

## Parte D — Landing (`index.html`)

- Nueva sección **`#tema-4` "Tema 4 · Redes convolucionales"**, `picker-three`: Teoría (`sesion-t4.html`, `card-tema4`), Práctica (`practica-t4.html`, `card-tema4`), Repaso (`repaso-t4.html`, `card-repaso`).
- TOC lateral: añadir **Tema 4**.
- La nota final pasa de "Temas 4–5" a **"Tema 5 · próximamente"**.
- `card-tema4` ya existe en el CSS de `index.html`.

## Fuera de alcance (YAGNI)

- Entrenar una CNN real en el navegador (solo snippets).
- Reutilizar/reescribir los interactivos antiguos de `files/tema-4/`.
- Tema 5 y renombrados.

## Verificación

- `sesion-t4.html`: 18 slides, contador, 0 errores de consola, diagramas renderizan.
- `practica-t4.html`: la convolución calculada coincide con una referencia (comprobación numérica de un caso conocido); animación, pooling y código reactivos; 0 errores.
- `repaso-t4.html`: motor 10/10 end-to-end, sin refs a Tema 3.
- Landing: 4 secciones, TOC actualizado, enlaces correctos, nota "Tema 5 · próximamente".
- Revisión visual en navegador.
