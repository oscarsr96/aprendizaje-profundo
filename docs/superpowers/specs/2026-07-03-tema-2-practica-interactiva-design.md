# Práctica interactiva de Tema 2 — Diseño

**Fecha:** 2026-07-03
**Autor:** Óscar Sánchez Rueda (con Claude Code)

## Objetivo

Crear la **práctica de Tema 2** como una **herramienta interactiva** (`practica-t2.html`) en la que el alumno construye regiones del plano con perceptrones y ve el equivalente en código. Añadir su tarjeta "Práctica" a la sección Tema 2 de la landing.

Complementa a `sesion-t2.html` (teoría) y `repaso-t2.html` (repaso), completando el Tema 2 con las tres piezas (Teoría · Práctica · Repaso), igual que el Tema 1.

## Contexto del repo

- Decks del sitio: HTML autocontenido con `styles.css` + `script.js` compartidos, sistema de diseño navy `#1a1f6c` / naranja `#ff5700` / teal `#0796a3`, fuentes Taviraj (serif) + Inter Tight (sans) + JetBrains Mono.
- Interactivos existentes (`files/tema-2/descenso_gradiente_interactivo.html`, `files/tema-1/ejercicios_perceptrones_simples.html`) son autocontenidos con `<style>`/JS propios y canvas, pero usan **otra estética** (Georgia + degradado naranja). Esta práctica se construye en el **sistema de diseño del sitio**, no en el de esos ficheros.
- Material fuente en `files/tema-2/`:
  - `Ejercicio_MLP_Region_Rectangular.pdf` — rectángulo `1≤x₁≤3, 0≤x₂≤2`; 4 neuronas ocultas escalón + neurona de salida AND (umbral 3.5).
  - `Ejercicio_Red_Neuronal_Triangulo.pdf` — triángulo con vértices (0,2),(1,1),(2,2); 3 neuronas ocultas + salida AND (umbral 2.5).

### Soluciones de referencia (de los PDFs)

Rectángulo (4 neuronas): `h1=step(x₁−1)`, `h2=step(3−x₁)`, `h3=step(x₂)`, `h4=step(2−x₂)`, `y=step(h1+h2+h3+h4−3.5)`.

Triángulo (3 neuronas): `h1=step(2−x₂)`, `h2=step(x₁+x₂−2)`, `h3=step(x₂−x₁)`, `y=step(h1+h2+h3−2.5)`.

## Idea pedagógica

Cada neurona oculta (perceptrón escalón) traza una **recta** y activa uno de sus dos **semiplanos**. La neurona de salida hace el **AND** de esos semiplanos → una **región convexa**. Es la práctica directa de "las capas ocultas transforman el espacio" del Tema 2.

## Arquitectura

`practica-t2.html`: página única autocontenida (CSS + JS inline), scrollable (no navegable por slides). Topbar como los decks (logo → `index.html`, título "Aprendizaje Profundo · Tema 2 · Práctica"). Render con **canvas** (evaluar la salida en una malla de píxeles para sombrear la región es directo; SVG se descarta por complejidad).

### Estado del modelo (JS)

```
neurons: [{ w1, w2, b, on }]      // neuronas ocultas (escalón)
exercise: 'rect' | 'tri' | 'free'  // escena activa
```

- `step(z) = z >= 0 ? 1 : 0`
- `hidden_i(x) = step(w1·x₁ + w2·x₂ + b)`
- `output(x) = AND(hidden activas) = step(Σ hidden_i − (n − 0.5))`
- Se pinta activado el punto donde `output(x) = 1`.

## Bloque 1 — Diseño geométrico (interactivo)

Canvas central (plano x₁–x₂, rango aprox. [−1, 4]) + panel de controles.

1. **Intro** — recordatorio de la neurona escalón `step(w₁x₁ + w₂x₂ + b)`; cada una parte el plano en dos.
2. **Playground · una neurona** — sliders `w₁, w₂, b`; el canvas dibuja la recta y sombrea el semiplano activo. Muestra la ecuación en vivo.
3. **Ejercicio 1 · Rectángulo** — 4 neuronas ocultas editables (sliders w₁,w₂,b + toggle on/off por neurona), salida AND. Canvas: las rectas + sombreado de la región donde todas las activas disparan. Botón **"Ver solución"** que fija los pesos del PDF. Muestra la región objetivo (contorno) para comparar.
4. **Ejercicio 2 · Triángulo** — 3 neuronas, misma mecánica, solución del PDF.

Selector de ejercicio (Rectángulo / Triángulo / Libre) que reinicia la escena. En "Libre" el alumno parte de una neurona y puede añadir/quitar.

## Bloque 2 — El mismo diseño en código

5. **Panel de código en vivo** — genera el equivalente en NumPy del diseño actual (pesos que el alumno ha fijado) y un `forward` con `step`; coincide exactamente con lo dibujado. Se actualiza al cambiar pesos/ejercicio.
6. **Nota "y con entrenamiento"** — el escalón no es derivable; en la práctica se entrena un MLP equivalente con activaciones suaves. Mini snippet Keras `Sequential` (2 → oculta ReLU → 1 sigmoide) como puente con la teoría.
7. **Cierre / retos** — 2–3 retos ("diseña una banda", "diseña un rombo") + enlaces a `sesion-t2.html` y `repaso-t2.html`.

## Encaje en la landing (`index.html`)

- Añadir tarjeta **"Práctica" → `practica-t2.html`** a la sección `#tema-2`, que pasa de 2 a 3 tarjetas (`picker-three`), con orden Teoría · Práctica · Repaso (igual que Tema 1). Ornamento tipo cuadrícula/región para la tarjeta de práctica.

## Fuera de alcance (YAGNI)

- Entrenamiento real en el navegador (no se ejecuta Keras; solo se muestra el snippet).
- Editor de escenas persistente / guardar diseños.
- Temas 3–5 y renombrar ficheros existentes.
- Reescribir los interactivos antiguos (`descenso_gradiente_interactivo.html`, etc.).

## Verificación

- `practica-t2.html` abre sin errores de consola; el canvas responde a los sliders en tiempo real.
- "Ver solución" del rectángulo y del triángulo produce exactamente la región objetivo.
- El panel de código refleja los pesos actuales.
- La tarjeta "Práctica" aparece en Tema 2 y enlaza correctamente; la landing sigue coherente.
- Revisión visual en navegador (rectángulo, triángulo, playground).
