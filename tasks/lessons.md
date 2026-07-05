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

## Antes de "reordenar temas": contrastar con la Guía Docente oficial

El sitio había derivado a 9 "temas" planos, pero la Guía Docente oficial (G227) tiene **5
temas**. Lo que parecía "reordenar" era en realidad "plegar en 5 temas con subtemas".

**Why:** el usuario lo señaló al pedir el reordenado; leer la Guía Docente (en
`files/general/`) reveló que sobreajuste→T2 y evaluación→T5 ya son subtemas oficiales.

**How to apply:** antes de reestructurar un temario, leer la guía docente/temario oficial;
la numeración del sitio puede haberse desviado de la estructura de examen.
