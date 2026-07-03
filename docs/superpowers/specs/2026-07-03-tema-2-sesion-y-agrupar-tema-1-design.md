# Agrupar Tema 1 y crear sesión de Tema 2 — Diseño

**Fecha:** 2026-07-03
**Autor:** Óscar Sánchez Rueda (con Claude Code)

## Objetivo

Dos entregas relacionadas sobre el sitio de la asignatura *Aprendizaje Profundo*:

1. **Reorganizar `index.html` por tema** (hoy está por nivel: Teoría / Práctica / Ejercicios).
2. **Crear la sesión de Tema 2** (Perceptrón multicapa): un deck de teoría y un repaso autocorregible, replicando las plantillas existentes.

Este diseño también sirve de **plantilla reutilizable** para construir Temas 3–5 más adelante.

## Contexto del repo

- La landing (`index.html`) reparte una sola tarjeta de Tema 1 en cada una de 3 secciones por nivel (`#teoria` → `sesion1.html`, `#practica` → `sesion2.html`, `#ejercicios` → `repaso1.html`), con una nota "Temas 2–4 · próximamente" y un TOC lateral con Teoría/Práctica/Ejercicios.
- Los decks son HTML autocontenido: `<section class="slide">` + `script.js` compartido + `styles.css`. Clases relevantes: `slide-cover`, `slide-divider`, `slide-exercise`, `slide-close`, `card-tema1`, `card-repaso`.
- La cabecera `.bar` se estiliza inline en `index.html` (no en `styles.css`).
- Material fuente de Tema 2 en `files/tema-2/`: `T2. Perceptrón multicapa (mejorado).pptx` (20 slides), `Ejercicio_MLP_Region_Rectangular.pdf`, `Ejercicio_Red_Neuronal_Triangulo.pdf`, `descenso_gradiente_interactivo.html`.

## Parte A — Reorganizar `index.html` por tema

Sustituir las 3 secciones por nivel por **secciones por tema**:

- **TOC lateral:** `Tema 1` · `Tema 2` (sustituye a Teoría/Práctica/Ejercicios).
- **Sección "Tema 1 · Introducción"** (`id="tema-1"`): 3 tarjetas en el `.picker`:
  - Teoría → `sesion1.html` (`card-tema1`), pill "Teoría".
  - Práctica → `sesion2.html` (`card-tema1`), pill "Práctica".
  - Repaso → `repaso1.html` (`card-repaso`), pill "Repaso".
- **Sección "Tema 2 · Perceptrón multicapa"** (`id="tema-2"`): 2 tarjetas:
  - Teoría → `sesion-t2.html` (`card-tema2`), pill "Teoría".
  - Repaso → `repaso-t2.html` (`card-repaso`), pill "Repaso".
- Cada tarjeta conserva su nivel mediante un pill pequeño (Teoría/Práctica/Repaso) para no perder esa información dentro del bloque de tema.
- Eliminar las notas "Temas 2–4 · próximamente" de las secciones pobladas; dejar **una sola** nota "Temas 3–5 · próximamente" al final del contenido.
- Añadir clase `card-tema2` en `styles.css` clonando `card-tema1` con un acento distinto para diferenciar temas visualmente.
- Actualizar el scroll-spy del TOC (script inline al final de `index.html`) a los nuevos `id` de sección.

## Parte B — `sesion-t2.html` (deck de teoría)

Réplica de `sesion1.html`: mismo chasis (`<section class="slide">`, `script.js`, contador, portada/dividers/cierre). Título de pestaña: `CUNEF · Aprendizaje Profundo · Tema 2`.

Mapeo pptx (20 slides) → deck (~18 slides):

| # | Slide del deck | Origen pptx |
|---|----------------|-------------|
| 1 | Portada "Perceptrón multicapa" | s1 |
| 2 | Agenda / índice del tema | s2–s3 |
| 3 | **Divider** Bloque 1 · Redes neuronales | s4 |
| 4 | Inspiración biológica (dendritas · cuerpo · axón) | s5 |
| 5 | ¿Por qué redes artificiales? | s6 |
| 6 | Modelo de neurona artificial (z = Σwᵢxᵢ + b) | s7 |
| 7 | Topología: capas | s8 |
| 8 | Clasificación de redes (conexiones / flujo) | s9 |
| 9 | Feedforward vs. recurrente | s10 |
| 10 | **Divider** Bloque 2 · Aprendizaje de la red | s11 |
| 11 | Ciclo de aprendizaje (entrada→salida→comparador→pesos) | s12 |
| 12 | Tipos de aprendizaje (supervisado / no supervisado) | s13 |
| 13 | Regla delta · Δwᵢ = η(d−y)xᵢ | s14 |
| 14 | **Divider** Bloque 3 · Del perceptrón al MLP | s15 |
| 15 | El perceptrón simple | s16 |
| 16 | **slide-exercise** La limitación: XOR | s17 |
| 17 | El perceptrón multicapa + backpropagation | s18–s19 |
| 18 | **Cierre** Ideas clave | s20 |

- Reutilizar componentes visuales ya presentes (diagrama de neurona, badges, bloques de ecuación) adaptando el estilo.
- La slide XOR usa `slide-exercise` (como "¿Voy a la fiesta?" en `sesion1.html`) para el momento interactivo/pizarra.

## Parte C — `repaso-t2.html` (10 retos)

Mismo motor autocorregible que `repaso1.html`. 10 preguntas de Tema 2, cada una con explicación en la respuesta y mezcla de tipos (opción única, múltiple, clasificar):

1. Partes de la neurona biológica ↔ artificial (clasificar)
2. Fórmula del valor neto z (única)
3. Totalmente vs. localmente conectadas (única)
4. Feedforward vs. recurrente (clasificar)
5. Supervisado vs. no supervisado (clasificar/múltiple)
6. Regla delta: significado de cada término (única)
7. Por qué el perceptrón simple falla con XOR (única)
8. Qué aporta una capa oculta (única)
9. Backpropagation: qué propaga (única)
10. Teorema del aproximador universal (única)

## Fuera de alcance (YAGNI)

- Práctica de Tema 2 (equivalente a `sesion2.html`): se hará más adelante.
- Temas 3–5.
- Cambiar el sistema de materiales descargables (`materiales.html`, manifest).
- Renombrar los ficheros existentes (`sesion1/2`, `repaso1`) — se conservan para no romper enlaces.

## Verificación

- `index.html` abre sin errores de consola; TOC resalta la sección visible; las 5 tarjetas enlazan a destinos correctos.
- `sesion-t2.html` y `repaso-t2.html` navegan con `script.js` (teclado/controles) y el contador de slides muestra el total correcto.
- Revisión visual en navegador de las tres piezas.
