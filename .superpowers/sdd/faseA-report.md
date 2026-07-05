# Informe Fase A: Reestructuración de `index.html` a 5 temas oficiales

## Resumen de lo hecho

Se reemplazaron las 9 `section#tema-N` planas por **5 secciones** (los 5 temas oficiales de la
Guía Docente), cada una con sub-bloques `.subtema-band` que agrupan las tarjetas existentes.
Solo se tocó `index.html`. El proceso se hizo con un script Python (en el scratchpad de sesión,
no en el repo) que:

1. Extrajo, por `href`, el markup EXACTO de cada una de las 36 tarjetas `<a class="card ...">`
   existentes (SVG `.card-orn`, títulos, `.card-meta`, clases `card-temaN`/`card-repaso`
   incluidas), sin reescribir ni un carácter de su contenido.
2. Reensambló esas 36 tarjetas bajo su nuevo subtema, con una `.subtema-band` delante de cada
   grupo, dentro de las 5 nuevas secciones, respetando el orden Teoría → Práctica →
   Laboratorio → Repaso en cada picker.
3. Añadió 9 tarjetas-enlace **nuevas** en el subtema 5.2 (Librerías y casos aplicados), una por
   cada `lab-tN.html` existente, reutilizando el `.card-orn` de laboratorio (pantalla/terminal)
   ya usado en el resto de tarjetas de laboratorio, con clase `card-tema5` y tag "Laboratorio".
4. Sustituyó el bloque de 9 `.toc-link` por 5, uno por tema oficial.
5. Insertó el CSS de `.subtema-band` (tal cual el brief) junto a las reglas de `.level-band` /
   `.level-title`, dentro del `<style>` ya existente.
6. No se tocó `<head>`, `<footer>`, ni los dos `<script>` finales (scroll-spy y animaciones).

## Secciones creadas

- **`#tema-1` — Tema 1 · Introducción al Aprendizaje Profundo** — *"El porqué y el estado del
  arte."*
  - `1.1 · Panorámica y estado del arte` (picker-three, 2 tarjetas): `sesion-t5.html` (Teoría),
    `repaso-t5.html` (Repaso).

- **`#tema-2` — Tema 2 · Fundamentos de Redes Neuronales** — *"De la neurona al entrenamiento."*
  - `2.1 · El perceptrón` (picker-four): `sesion1.html`, `sesion2.html`, `lab-t1.html`,
    `repaso1.html`.
  - `2.2 · Perceptrón multicapa (MLP)` (picker-four): `sesion-t2.html`, `practica-t2.html`,
    `lab-t2.html`, `repaso-t2.html`.
  - `2.3 · Entrenamiento` (picker-four): `sesion-t7.html`, `practica-t7.html`, `lab-t7.html`,
    `repaso-t7.html`.
  - `2.4 · Sobreajuste y regularización` (picker-four): `sesion-t8.html`, `practica-t8.html`,
    `lab-t8.html`, `repaso-t8.html`.

- **`#tema-3` — Tema 3 · Aprendizaje No Supervisado y Redes Alternativas** — *"Aprender sin
  etiquetas."* — con `<p class="soon-line">Autoencoders y redes de base radial (RBF) — en
  preparación.</p>` tras el título (subtemas 3.1 y 3.3 no inventados).
  - `3.2 · Modelos generativos (GAN)` (picker-three, 1 tarjeta): `lab-t5.html`.

- **`#tema-4` — Tema 4 · Arquitecturas y Modelos Profundos** — *"Redes que ven, recuerdan y
  atienden."*
  - `4.1 · Redes convolucionales (CNN)` (picker-four): `sesion-t4.html`, `practica-t4.html`,
    `lab-t4.html`, `repaso-t4.html`.
  - `4.2 · Modelos dinámicos: RNN / LSTM` (picker-four): `sesion-t3.html`, `practica-t3.html`,
    `lab-t3.html`, `repaso-t3.html`.
  - `4.3 · Atención y Transformers` (picker-four): `sesion-t6.html`, `practica-t6.html`,
    `lab-t6.html`, `repaso-t6.html`.
  - `4.4 · Limitaciones y desafíos` (picker-three, 1 tarjeta): `practica-t5.html`.

- **`#tema-5` — Tema 5 · Implementación y Aplicaciones Prácticas** — *"De la teoría al código."*
  - `5.1 · Validación y métricas de evaluación` (picker-four): `sesion-t9.html`,
    `practica-t9.html`, `lab-t9.html`, `repaso-t9.html`.
  - `5.2 · Librerías y casos aplicados` (picker-four, 9 tarjetas **nuevas**, enlace directo a
    cada laboratorio): `lab-t1.html` ("Red neuronal artificial (ANN)"), `lab-t2.html` ("MLP en
    Keras"), `lab-t3.html` ("LSTM"), `lab-t4.html` ("CNN"), `lab-t5.html` ("GAN"), `lab-t6.html`
    ("Transformers"), `lab-t7.html` ("Optimizadores"), `lab-t8.html` ("Regularización"),
    `lab-t9.html` ("Evaluación"). Cada una con clase `card-tema5`, tag "Laboratorio" y el
    `.card-orn` de pantalla/terminal reutilizado tal cual.

Nota: `lab-t5.html` aparece dos veces en el documento (una vez como tarjeta reutilizada en 3.2,
y otra vez como tarjeta-enlace nueva en 5.2), tal como preveía el brief — no es una tarjeta
duplicada por error, son dos piezas de markup distintas con el mismo destino.

## Resultados de las 5 verificaciones

1. `grep -c 'class="section" id="tema-' index.html` → **5**. ✅ (esperado: 5)
2. `grep -o 'id="tema-[0-9]"' index.html | sort -u` → `tema-1`, `tema-2`, `tema-3`, `tema-4`,
   `tema-5`. ✅ (exactamente tema-1..tema-5, sin huecos ni sobrantes)
3. `grep -c 'subtema-band' index.html` → **15** (12 bloques `.subtema-band` en el HTML: 1 en
   tema-1, 4 en tema-2, 1 en tema-3, 4 en tema-4, 2 en tema-5; + 3 líneas de reglas CSS
   `.subtema-band` / `.subtema-band .subtema-name` / `.subtema-band .subtema-rule` en el
   `<style>`). ✅ (coincide con lo esperado "~12 sub-bandas" más las reglas CSS)
4. Se extrajeron todos los `href="./…"` de las tarjetas (37 destinos únicos incluyendo
   `materiales.html` del header) y se comprobó con `ls`/test de existencia en disco: **todos
   existen**, ninguno falta. Total de referencias `href` en el documento: 46 (hay duplicados
   intencionados: los 9 `lab-tN.html` de 5.2 más el `lab-t5.html` ya usado en 3.2).
5. Confirmado que no queda ningún `#tema-6`…`#tema-9` suelto (`grep -n 'tema-6\|tema-7\|tema-8\|
   tema-9' index.html` → sin resultados) y que solo hay 5 `.toc-link` (antes 9, ahora 5, uno por
   tema oficial).

Comprobaciones adicionales de integridad:
- Balance de etiquetas: 5 `<section class="section">` / 5 `</section>`; 126 `<div` / 126
  `</div>`. Sin desbalances.
- Recuento de tarjetas: 45 `<a class="card ...">` en total = 36 tarjetas reutilizadas (todas las
  originales, cada una usada una única vez, sin duplicados accidentales) + 9 tarjetas-enlace
  nuevas de 5.2.
- `git diff --stat index.html` confirma que es el único fichero modificado en el árbol de
  trabajo (aparte de directorios no versionados `tasks/` y `.superpowers/`, ajenos a esta tarea).
- Los hunks del diff (`git diff index.html | grep '^@@'`) están todos contenidos entre la línea
  442 (inserción de CSS `.subtema-band` junto a `.level-title em`) y la línea ~2296 original
  (cierre de la antigua `section#tema-9`): no se tocó nada del `<head>` (metadatos, `<title>`,
  fuentes), del `<footer>`, ni de los dos `<script>` finales (scroll-spy e interacciones/canvas).

## Dudas / decisiones tomadas sin especificación exacta en el brief

- **Títulos y descripciones de las 9 tarjetas-enlace de 5.2**: el brief daba una lista de
  ejemplo de títulos ("MLP en Keras", "CNN", "LSTM", "Transformers", "GAN", "Optimizadores",
  "Regularización", "Evaluación", "ANN") sin fijar el orden. Se asignó cada título al lab que
  mejor encaja por contenido (p. ej. `lab-t1.html`, que entrena la primera red simple, se
  etiquetó "Red neuronal artificial (ANN)"; `lab-t2.html`, el MLP sobre Wine, se etiquetó "MLP
  en Keras"). Las descripciones cortas y el campo de metadatos ("Tema N · Subtema") son de
  elaboración propia, en tono consistente con el resto de tarjetas del sitio.
- **`.card-meta` de las tarjetas de 5.2**: se optó por mostrar "notebook · Tema X · <bloque>"
  para dar contexto de a qué tema pertenece cada laboratorio, ya que estas tarjetas actúan como
  índice cruzado; no había un formato exacto especificado en el brief para esta pieza en
  concreto (solo se pedía "tarjeta compacta" con título corto y tag "Laboratorio").
- No hubo bloqueos: todos los `href` de las tarjetas reutilizadas y de las 9 nuevas de 5.2
  apuntan a ficheros que ya existían en el repo antes de esta tarea.
