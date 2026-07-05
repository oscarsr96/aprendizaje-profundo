# Lecciones — Aprendizaje Profundo

## Verificar cambios de JS/HTML en el navegador → cache-bust

Al verificar en Playwright una página que acabo de editar, el navegador puede servir
la versión **cacheada** (los cambios de JS no se reflejan aunque `browser_navigate`
recargue la misma URL).

**Why:** pasó con `practica-t6.html` — tras ajustar la función de atención (GAIN), los
pesos seguían saliendo con los valores viejos; parecía un bug del cálculo pero era caché.

**How to apply:** al re-verificar tras un edit, navegar con un query param nuevo
(`...html?v=2`) para forzar recarga sin caché. Si un valor "no cambia" tras editar,
sospechar de la caché antes que del código.

**Ampliación (2026-07-05):** el `?v=` en la URL del HTML **solo** cachebustea el HTML;
los assets enlazados (`./script.js`, `./styles.css`) siguen sirviéndose de la caché de
memoria (misma URL compartida por los 13 decks, cacheada desde la primera carga de la
sesión). Para verificar cambios en script.js/styles.css hay que cachebustear **también su
`<link>`/`<script>`** temporalmente (`./script.js?v=N`), y revertirlo antes de commitear.
Síntomas de esto: la clase nueva se aplica en el DOM pero "no tiene estilo" (styles.css viejo),
o la lógica nueva "no corre" (`typeof miFuncion === 'undefined'`, script.js viejo). En
producción no es problema: una visita nueva revalida por Last-Modified/etag; solo muerde en
la verificación local dentro de una misma sesión de navegador.

## Ejecutar por subagentes sobre un fichero muy acoplado → 1 subagente por fase, no micro-tareas

Al ejecutar un plan con subagentes, si varias tareas editan el **mismo fichero grande** de
forma acoplada (p. ej. reagrupar todas las secciones de `index.html`), NO despachar un
subagente por micro-tarea: no paralelizan (mismo fichero) y cada subagente fresco arriesga
borrar markup que otra tarea necesita reutilizar.

**Why:** en la reestructura a 5 temas, las tareas A1–A6 del plan tocaban todas `index.html`;
agruparlas en UNA sola tarea de subagente (con el mapeo completo, viendo todo el material de
origen a la vez) salió limpio a la primera. Igual con el reetiquetado (Fase B) sobre ~40
ficheros: un subagente con la tabla completa.

**How to apply:** cuando el trabajo se concentra en un fichero acoplado, dale a UN subagente
la fase entera con contexto completo; reserva la granularidad fina para tareas realmente
independientes. Verifica su diff tú mismo en el navegador (autoridad para HTML de presentación).

## Subagentes en paralelo sí, cuando los bundles tocan ficheros DISJUNTOS

La lección anterior ("1 subagente por fase en ficheros acoplados") es sobre NO partir UN
fichero entre agentes. Su reverso también es cierto: cuando el trabajo son varios bundles
con slugs propios que no se solapan (Fase C: autoencoders / generativos / rbf, cada uno sus
`sesion-*`, `practica-*`, etc.), **sí** conviene un subagente por bundle EN PARALELO.

**Why:** en Fase C lancé 3 subagentes a la vez (uno por subtema del Tema 3); no colisionaron
porque ninguno tocaba `index.html` (esa parte, acoplada, la cableé yo entre bundles). Salió
a la primera y en paralelo.

**How to apply:** reparte por bundle (conjunto de ficheros que van juntos), no por micro-tarea
ni por fichero. Prohíbe explícitamente a los subagentes tocar el fichero compartido (`index.html`);
haz tú esa costura y verifica en navegador.

## Interactivo honesto sin entrenar en el navegador → base fija (DCT), con nota de honestidad

Para el interactivo de autoencoders ("mueve k y mira la reconstrucción") no se puede entrenar
una red en el navegador. Solución honesta y sin libs: compresión por **base fija** (DCT 2D:
quedarse con k coeficientes en zigzag y reconstruir por IDCT). Es un autoencoder lineal
undercomplete de facto y el error decrece de forma monótona con k.

**Why:** transmite el mensaje real (tamaño del código ↔ calidad de reconstrucción) sin mentir.
**How to apply:** cuando simules un modelo que no puedes entrenar en cliente, usa un stand-in
matemáticamente correcto y añade una **nota visible** ("un autoencoder real aprende su propia
base; aquí usamos una fija para ver el efecto en vivo"). No lo disfraces de lo que no es.

## Antes de "reordenar temas": contrastar con la Guía Docente oficial

El sitio había derivado a 9 "temas" planos, pero la Guía Docente oficial (G227) tiene **5
temas**. Lo que parecía "reordenar" era en realidad "plegar en 5 temas con subtemas".

**Why:** el usuario lo señaló al pedir el reordenado; leer la Guía Docente (en
`files/general/`) reveló que sobreajuste→T2 y evaluación→T5 ya son subtemas oficiales.

**How to apply:** antes de reestructurar un temario, leer la guía docente/temario oficial;
la numeración del sitio puede haberse desviado de la estructura de examen.
