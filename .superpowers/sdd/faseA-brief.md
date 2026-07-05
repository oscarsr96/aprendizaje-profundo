# Tarea (Fase A): Reestructurar `index.html` a los 5 temas oficiales con subtemas

## Contexto
Sitio estático de un curso universitario ("Aprendizaje Profundo", CUNEF). Hoy la landing
`index.html` tiene **9 secciones de tema planas** (`section#tema-1` … `#tema-9`), cada una con
una `.level-band` (título) y un `.picker` de tarjetas (`.card`) que enlazan a decks/prácticas/
labs/repasos. La Guía Docente oficial tiene **solo 5 temas**. Tu tarea es **reagrupar** esas 9
secciones en **5 secciones (los 5 temas oficiales)**, cada una con **sub-bloques de subtema**.

**NO renombres ni muevas ficheros. NO cambies ningún otro fichero que no sea `index.html`.**
Las tarjetas siguen enlazando a los MISMOS `href` que ahora (`sesion-t7.html`, etc.).

## Qué hay que hacer (solo `index.html`)

### 1. CSS de sub-banda (junto a las reglas `.level-band` del `<style>`)
```css
.subtema-band { display: flex; align-items: center; gap: 14px; margin: 30px 0 10px; }
.subtema-band .subtema-name {
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent-deep);
  white-space: nowrap;
}
.subtema-band .subtema-rule { flex: 1; height: 1px; background: var(--line); }
```

### 2. Reconstruir las secciones de tema
Reemplaza las 9 `section#tema-N` por **5 secciones** con este contenido. **Reutiliza el markup
EXACTO de las tarjetas actuales** (sus `.card-orn` SVG, títulos, textos, `.card-meta`, clases
`card-temaN`): córtalas de donde están hoy y pégalas bajo su nuevo subtema. Cada subtema se
introduce con una `.subtema-band`:
```html
<div class="subtema-band"><span class="subtema-name">2.3 · Entrenamiento</span><span class="subtema-rule" aria-hidden="true"></span></div>
<div class="picker picker-four"> … tarjetas … </div>
```

**Mapeo (tema oficial → subtemas → tarjetas que van dentro, por su `href`):**

- **`section#tema-1`** — level-name: `Tema 1 · Introducción al Aprendizaje Profundo`, level-title: `El porqué y el estado del arte.`
  - Subtema `1.1 · Panorámica y estado del arte`: tarjetas actuales cuyo href es `./sesion-t5.html` (Teoría) y `./repaso-t5.html` (Repaso). Layout: `picker-three` (2 tarjetas).

- **`section#tema-2`** — level-name: `Tema 2 · Fundamentos de Redes Neuronales`, level-title: `De la neurona al entrenamiento.`
  - Subtema `2.1 · El perceptrón`: tarjetas actuales del perceptrón, hrefs `./sesion1.html`, `./sesion2.html`, `./lab-t1.html`, `./repaso1.html`. Layout `picker-four`.
  - Subtema `2.2 · Perceptrón multicapa (MLP)`: hrefs `./sesion-t2.html`, `./practica-t2.html`, `./lab-t2.html`, `./repaso-t2.html`. `picker-four`.
  - Subtema `2.3 · Entrenamiento`: hrefs `./sesion-t7.html`, `./practica-t7.html`, `./lab-t7.html`, `./repaso-t7.html`. `picker-four`.
  - Subtema `2.4 · Sobreajuste y regularización`: hrefs `./sesion-t8.html`, `./practica-t8.html`, `./lab-t8.html`, `./repaso-t8.html`. `picker-four`.

- **`section#tema-3`** — level-name: `Tema 3 · Aprendizaje No Supervisado y Redes Alternativas`, level-title: `Aprender sin etiquetas.`
  - Subtema `3.2 · Modelos generativos (GAN)`: **una** tarjeta al lab existente, href `./lab-t5.html` (usa su `.card-orn` y su tarjeta actual de laboratorio del tema 5). Layout `picker-three` (1 tarjeta).
  - Añade un pequeño aviso tras el título de la sección: un párrafo `<p class="soon-line">` (reutiliza el estilo si existe; si no, un `<p>` con texto en gris) que diga: `Autoencoders y redes de base radial (RBF) — en preparación.` (Los subtemas 3.1 y 3.3 son contenido nuevo que se creará después; NO los inventes.)

- **`section#tema-4`** — level-name: `Tema 4 · Arquitecturas y Modelos Profundos`, level-title: `Redes que ven, recuerdan y atienden.`
  - Subtema `4.1 · Redes convolucionales (CNN)`: hrefs `./sesion-t4.html`, `./practica-t4.html`, `./lab-t4.html`, `./repaso-t4.html`. `picker-four`.
  - Subtema `4.2 · Modelos dinámicos: RNN / LSTM`: hrefs `./sesion-t3.html`, `./practica-t3.html`, `./lab-t3.html`, `./repaso-t3.html`. `picker-four`.
  - Subtema `4.3 · Atención y Transformers`: hrefs `./sesion-t6.html`, `./practica-t6.html`, `./lab-t6.html`, `./repaso-t6.html`. `picker-four`.
  - Subtema `4.4 · Limitaciones y desafíos`: **una** tarjeta, href `./practica-t5.html` (la práctica de ataque adversario del tema 5 actual). `picker-three` (1 tarjeta).

- **`section#tema-5`** — level-name: `Tema 5 · Implementación y Aplicaciones Prácticas`, level-title: `De la teoría al código.`
  - Subtema `5.1 · Validación y métricas de evaluación`: hrefs `./sesion-t9.html`, `./practica-t9.html`, `./lab-t9.html`, `./repaso-t9.html`. `picker-four`.
  - Subtema `5.2 · Librerías y casos aplicados`: tarjetas-enlace a TODOS los labs existentes: `./lab-t1.html`, `./lab-t2.html`, `./lab-t3.html`, `./lab-t4.html`, `./lab-t5.html`, `./lab-t6.html`, `./lab-t7.html`, `./lab-t8.html`, `./lab-t9.html`. Presenta cada una como una tarjeta compacta (clase `card-tema5` + tag "Laboratorio"), con un título corto que identifique el lab (p. ej. "MLP en Keras", "CNN", "LSTM", "Transformers", "GAN", "Optimizadores", "Regularización", "Evaluación", "ANN"). Usa un `.card-orn` sencillo de laboratorio (una pantalla/terminal). Layout: usa `picker-four` (se ajustará en filas).

### 3. TOC lateral (bloque de `.toc-link`)
Reemplaza los 9 `.toc-link` por **5**, uno por tema: `#tema-1`…`#tema-5`, con textos
`Tema 1 · Introducción`, `Tema 2 · Fundamentos`, `Tema 3 · No supervisado`,
`Tema 4 · Arquitecturas`, `Tema 5 · Implementación`. El JS de scroll-spy al final ya usa
`document.querySelectorAll('.toc-link')` y observa `.section`: no lo toques, funcionará con 5.

## Reglas
- Reutiliza el markup de tarjeta EXACTO que ya existe (no reescribas SVGs desde cero salvo las
  9 tarjetas nuevas del subtema 5.2, que son enlaces a labs).
- Mantén el orden de piezas dentro de cada picker: Teoría → Práctica → Laboratorio → Repaso.
- No dejes ninguna `section#tema-6`…`#tema-9` suelta ni tarjetas duplicadas.
- No toques el `<head>`, el `<footer>`, ni el JS de scroll-spy.

## Verificación (hazla y repórtala)
1. `grep -c 'class="section" id="tema-' index.html` → debe dar **5**.
2. `grep -o 'id="tema-[0-9]"' index.html | sort -u` → debe listar exactamente tema-1..tema-5.
3. `grep -c 'subtema-band' index.html` → cuenta de subtemas (esperado ~12 sub-bandas).
4. Extrae todos los `href="./…"` de las tarjetas y confirma que cada fichero existe en disco
   (`ls`). Ninguno debe faltar.
5. Confirma que NO queda ningún `#tema-6`…`#tema-9` ni `.toc-link` de más (deben ser 5).

## Entregable
- Un único commit en la rama actual (`reestructura-5-temas`) con el mensaje:
  `docs/index: reestructura a 5 temas oficiales con subtemas (Fase A)`
- Escribe tu informe completo en `.superpowers/sdd/faseA-report.md` (qué secciones creaste,
  resultados de las 5 verificaciones, cualquier duda). Devuelve solo: estado (DONE / BLOCKED /
  NEEDS_CONTEXT), el hash del commit, y un resumen de una línea de las verificaciones.
