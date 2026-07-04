# Tema 5 (Aprendizaje profundo · panorámica) — trío completo — Diseño

**Fecha:** 2026-07-04
**Autor:** Óscar Sánchez Rueda (con Claude Code)

## Objetivo

Cerrar el curso con las tres piezas del Tema 5, siguiendo el patrón de los Temas 2–4:

1. **`sesion-t5.html`** — deck de teoría (panorámica del DL), clon de `sesion-t4.html`.
2. **`practica-t5.html`** — herramienta interactiva: **demo de ataque adversario (FGSM)** sobre un clasificador lineal fijo (chasis de `practica-t4.html`).
3. **`repaso-t5.html`** — repaso autocorregible (10 retos), clon de `repaso-t4.html`.

Y añadir el bloque **Tema 5** a la landing, dejando el curso **completo (T1–T5)**.

## Fuente

`files/tema-5/T5. Aprendizaje profundo (mejorado).pptx` (22 slides, 4 bloques): introducción (por qué ahora) → clasificación → regresión → representación y generación.

## Parte A — `sesion-t5.html` (deck)

Réplica de `sesion-t4.html`. Título: `CUNEF · Aprendizaje Profundo · Tema 5`. ~20 slides:

| # | Slide | Origen |
|---|-------|--------|
| 1 | Portada "Aprendizaje profundo · panorámica" | s1 |
| 2 | Agenda / índice | s2–s3 |
| 3 | **Divider** Bloque 1 · ¿Por qué ahora? | s4 |
| 4 | Una larga historia | s5 |
| 5 | La era de las GPUs | s6 |
| 6 | Datos, software y comunidad | s7 |
| 7 | Procesado por capas | s8 |
| 8 | Profundidad → abstracción (+ **diagrama** bordes→partes→objeto) | s9 |
| 9 | Corrección iterativa y sesgos | s10 |
| 10 | **Divider** Bloque 2 · Clasificación | s11 |
| 11 | Tipos de problema (clasificación vs regresión) | s12 |
| 12 | El problema estrella · ImageNet (25%→3%) | s13 |
| 13 | **slide-exercise** ¿Nos podemos fiar? · ataques adversarios | s14 |
| 14 | **Divider** Bloque 3 · Regresión | s15 |
| 15 | Predecir un número / transformar datos | s16 |
| 16 | **Divider** Bloque 4 · Representación y generación | s17 |
| 17 | Representation learning (espacio interno) | s18 |
| 18 | Generación · GANs (+ **diagrama** generador vs discriminador) | s19–s20 |
| 19 | Aplicación real · Archivo de Indias | s21 |
| 20 | **Cierre** Ideas clave + fin de curso (close-grid / slide-close) | s22 |

- Diagrama SVG **profundidad → abstracción**: capas que van de bordes/texturas a partes a objeto completo.
- Diagrama SVG **GAN**: ruido → generador → (falsa/real) → discriminador → real/falso.
- El cierre celebra el **fin del curso** (enlaces a todos los temas y al repaso).

## Parte B — `practica-t5.html` (ataque adversario · FGSM)

Chasis de `practica-t4.html` (diseño del sitio). Fiel al mecanismo lineal de los adversarial examples (Goodfellow et al.), sin modelo entrenado:

**Modelo:**
- "Imagen" 12×12 en escala de grises `x ∈ [0,1]` (144 píxeles).
- **Clasificador lineal fijo**: `score = Σ wᵢ·xᵢ + b`; `prob = sigmoide(k·score)`. Dos clases: **"panda"** (prob alta) / **"gibón"** (prob baja). `w` es un patrón determinista fijo (sin `Math.random`).
- Presets de imagen: una que puntúa como "panda".
- **FGSM**: `x_adv = clip(x + ε·signo(w), 0, 1)`, slider **ε** (0 … ~0.15).

**Interfaz (3 grids):** imagen original (+ prob), perturbación `ε·signo(w)` ampliada (parece ruido), imagen adversaria (+ prob volteada). Lectura en vivo: *diferencia por píxel = ε (imperceptible)* vs *cambio en score = ε·Σ|wᵢ|* → por qué un ruido diminuto voltea la predicción. Nota de mitigación: **aumento de datos**. Panel de código: NumPy (FGSM con `np.sign(grad)`) + nota Keras.

**Retos:** encontrar el ε mínimo que voltea la clase; observar que la perturbación es casi invisible; relacionar el efecto con el número de píxeles.

## Parte C — `repaso-t5.html` (10 retos)

Motor de `repaso-t4.html`. 10 preguntas (mezcla de tipos):

1. Qué hizo posible el DL (datos + cómputo + software) (múltiple)
2. Qué aporta la profundidad (abstracción creciente) (única)
3. Cómo aprende un modelo con millones de parámetros (corrección iterativa, no prueba y error) (única)
4. Sesgos en los datos (única)
5. Clasificación vs regresión (clasificar)
6. ImageNet: qué pasó de 2012 a hoy (única)
7. Ataques adversarios: qué son (única)
8. Representation learning (única)
9. GAN: generador vs discriminador (clasificar)
10. Aprendizaje no supervisado / aplicaciones (única)

Resultados: mensajes de cierre de curso. Enlace "Ver la sesión" → `sesion-t5.html`.

## Parte D — Landing (`index.html`)

- Nueva sección **`#tema-5` "Tema 5 · Aprendizaje profundo"**, `picker-three`: Teoría (`sesion-t5.html`, `card-tema4` o gradiente propio), Práctica (`practica-t5.html`), Repaso (`repaso-t5.html`).
- TOC lateral: añadir **Tema 5**.
- **Eliminar** la nota "Tema 5 · próximamente" → el curso queda completo.
- Actualizar el subtítulo/hero de la landing si procede (p. ej. "Temas 1–5").

## Fuera de alcance (YAGNI)

- Modelo entrenado real / imágenes reales en la práctica (se usa un clasificador lineal fijo, fiel al mecanismo).
- GANs interactivas / generación real.

## Verificación

- `sesion-t5.html`: ~20 slides, contador, 0 errores de consola, diagramas renderizan.
- `practica-t5.html`: con ε=0 la prob es "panda"; al subir ε la prob cruza 0.5 a "gibón"; el cambio de score = ε·Σ|wᵢ| coincide con el cálculo; 0 errores.
- `repaso-t5.html`: motor 10/10 end-to-end, sin refs a Tema 4.
- Landing: 5 secciones, TOC actualizado, sin soon-line, enlaces correctos.
- Revisión visual en navegador.
