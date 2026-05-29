# Index: secciones por tipo + índice lateral

**Fecha:** 2026-05-29
**Ámbito:** `index.html` (página hub de la asignatura)

## Objetivo

Reorganizar la home, hasta ahora estructurada por **Tema**, para que se estructure
por **tipo de material** en tres secciones —Teoría, Práctica y Ejercicios— con un
índice lateral fijo a la izquierda que navega (scroll suave) a cada sección.

## Decisiones tomadas

- **Tres secciones**, no dos: Teoría · Práctica · Ejercicios.
- El lateral **solo navega** (scroll-spy), no filtra ni oculta contenido.
- Índice a la **izquierda**.
- **Sin** sección "Temario"/roadmap visual de los 4 temas (versión limpia).
- Sin frameworks: HTML/CSS/JS puro, reutilizando el sistema de diseño actual.

## Mapeo de contenido actual

| Sección    | Pieza actual (Tema 1)                         | Archivo        |
| ---------- | --------------------------------------------- | -------------- |
| Teoría     | De la IA al perceptrón                        | `sesion1.html` |
| Práctica   | Primeros pasos en Python                      | `sesion2.html` |
| Ejercicios | ¿Has pillado el deep learning? (cuestionario) | `repaso1.html` |

Temas 2–4: sin contenido aún. En cada sección, al pie, una línea sobria
"Temas 2–4 · próximamente" en lugar de tarjetas placeholder repetidas.

## Layout

```
┌──────────────┬─────────────────────────────────────────┐
│  ÍNDICE      │  hero (h1 + meta)                        │
│  (sticky)    │  ── TEORÍA ──   [card sesion1]           │
│ › Teoría     │  ── PRÁCTICA ── [card sesion2]           │
│   Práctica   │  ── EJERCICIOS ─[card repaso1]           │
│   Ejercicios │                                          │
└──────────────┴─────────────────────────────────────────┘
```

- **Índice lateral**: `position: sticky`, columna izquierda. Lista de 3 enlaces
  ancla (`#teoria`, `#practica`, `#ejercicios`). La entrada activa se resalta
  según la sección visible mediante `IntersectionObserver` (scroll-spy).
- **Scroll suave** vía `scroll-behavior: smooth` y `scroll-margin-top` en las
  secciones para compensar el header fijo.
- **Secciones**: cada una conserva la estructura `level-band` + `level-title` +
  `picker` y las tarjetas existentes. Las clases de color `card-temaN` se
  mantienen por tema (no por sección).

## Responsive

- Escritorio (≥ ~900px): índice como columna lateral izquierda + contenido.
- Móvil: el índice pasa a una barra horizontal pegajosa de chips bajo el header
  (Teoría · Práctica · Ejercicios); el contenido ocupa todo el ancho.

## Fuera de alcance

- No se modifican `sesion1/2.html` ni `repaso1.html`.
- No se añade filtrado ni búsqueda.
- No se crea contenido nuevo para los temas 2–4.

```

```
