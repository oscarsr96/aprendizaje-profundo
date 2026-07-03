# Práctica interactiva de Tema 3 (LSTM) — Diseño

**Fecha:** 2026-07-03
**Autor:** Óscar Sánchez Rueda (con Claude Code)

## Objetivo

Crear la **práctica de Tema 3** como herramienta interactiva (`practica-t3.html`):
un **simulador de la cinta de memoria** de una celda LSTM donde el alumno mueve
las tres puertas y avanza por una secuencia, viendo evolucionar el estado `Cₜ` y
la salida `hₜ`. Añadir su tarjeta "Práctica" a la sección Tema 3 de la landing.

Completa el Tema 3 (Teoría · Práctica · Repaso), como el Tema 2. No hay material
fuente en `files/tema-3/`: es un interactivo inventado, coherente con la teoría
de `sesion-t3.html`.

## Contexto

- Molde: `practica-t2.html` — herramienta autocontenida (CSS + JS inline, canvas),
  en el **sistema de diseño del sitio** (navy `#1a1f6c` / naranja `#ff5700` / teal
  `#0796a3`, Taviraj/Inter Tight/JetBrains Mono), topbar → `index.html`, scrollable.
- Concepto LSTM (de `sesion-t3.html`): `Cₜ = fₜ·Cₜ₋₁ + iₜ·C̃ₜ`, `hₜ = oₜ·tanh(Cₜ)`;
  puertas forget/input/output (sigmoide 0–1) y candidato (tanh −1..1).

## Modelo (escalar, a propósito)

Estado **escalar** (un número) para que la mecánica sea visible:

```
f, i, o ∈ [0,1]   // puertas (control directo con sliders)
Cprev              // memoria previa
Ccand ∈ [-1,1]     // candidato
C = f*Cprev + i*Ccand
h = o * tanh(C)
```

En cada paso el alumno fija los sliders y avanza; el simulador acumula la serie
`{Cₜ}` y `{hₜ}`.

## Bloque 1 — La cinta de memoria (interactivo)

- **Diagrama de celda LSTM** (SVG, adaptado del de `sesion-t3.html`) cuyos caminos
  de puerta cambian de **opacidad/grosor** según el valor actual del slider
  (forget tenue = olvida, intenso = mantiene).
- **Sliders**: `f` (forget), `i` (input), `o` (output) en 0–1; `C̃` (candidato) en
  −1…1. Paso 0.05.
- **Controles de secuencia**: `paso ▶`, `◀ atrás`, `reiniciar`. Contador de paso.
- **Gráfica en vivo** (canvas): líneas de `Cₜ` (memoria, teal) y `hₜ` (salida,
  naranja) frente al paso; rango vertical fijo (p. ej. −2…2) con eje 0.
- **Ecuación en vivo** con los números sustituidos:
  `Cₜ = f·Cprev + i·C̃ = …` y `hₜ = o·tanh(Cₜ) = …`.
- **3 escenarios preset** (botones) que fijan los sliders y narran un fenómeno:
  1. **Mantener** (`f≈1, i≈0`) → memoria estable muchos pasos (dependencias largas).
  2. **Sobrescribir** (`f≈0, i≈1`) → reemplaza la memoria (sujeto que cambia).
  3. **Decaer** (`f≈0.6`) → la memoria se desvanece (analogía RNN simple).

## Bloque 2 — El mismo mecanismo en código

- **Panel NumPy en vivo**: `paso_lstm(C, h, x)` con `sigmoide`/`tanh` y la
  actualización, reflejando f/i/o/C̃ actuales.
- **Snippet Keras** (estático): `layers.LSTM(64)`, con la nota de que Keras aprende
  las matrices `Wf, Wi, WC, Wo` que aquí se fijan a mano.

## Bloque 3 — Retos + encaje

- **Retos**: mantener la memoria 10 pasos; borrar en un paso concreto; identificar
  qué puerta controla cuánto sale.
- **Landing (`index.html`)**: tarjeta **Práctica → `practica-t3.html`** en `#tema-3`,
  que pasa de 2 a 3 tarjetas (`picker-three`), orden Teoría · Práctica · Repaso.
  Ornamento tipo cinta/celda para la tarjeta.

## Fuera de alcance (YAGNI)

- Estado vectorial / múltiples celdas (escalar basta para enseñar la mecánica).
- Entrenamiento real en el navegador (solo se muestra el snippet).
- Comparación completa con RNN simple (se alude vía el escenario "Decaer").
- Temas 4–5 y renombrados.

## Verificación

- `practica-t3.html` abre sin errores de consola; sliders y pasos actualizan el
  diagrama, la gráfica y la ecuación en tiempo real.
- El escenario "Mantener" conserva `C` casi constante muchos pasos; "Sobrescribir"
  lo reemplaza; "Decaer" lo lleva hacia 0.
- El panel de código refleja los valores actuales.
- La tarjeta "Práctica" aparece en Tema 3 y enlaza bien; landing coherente.
- Revisión visual en navegador.
