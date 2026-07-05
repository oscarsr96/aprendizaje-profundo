# Brief Fase C — Contenido nuevo del Tema 3 (No supervisado)

Rama: `main` (autorizado por el plan; deploy en push a Vercel). Patrón de deck = chasis de
`sesion-t9.html` (portada → agenda → N divisores numerados → slide-exercise → "Ideas para
llevarte" → cierre). Reusa `./script.js` + `./styles.css`. Slugs descriptivos, no numéricos.
**Autoridad pedagógica = profesor.** Este brief es el guion a validar ANTES de construir.

Tema 3 oficial (Guía Docente G227) = **Aprendizaje no supervisado y modelos generativos**.
Subtemas del plan: 3.1 Autoencoders · 3.2 Generativos (GAN) · 3.3 RBF.

---

## C1 · Subtema 3.1 — No supervisado y autoencoders (BUNDLE COMPLETO)

### Deck `sesion-autoencoders.html` (~18 slides)
- **Portada** — meta `3.1 · No supervisado y autoencoders`; título "Aprender *sin etiquetas*."
- **Agenda** — 4 bloques (no supervisado / la idea del autoencoder / variantes / usos).
- **— 01 — Aprendizaje no supervisado**
  1. Supervisado vs no supervisado: con etiqueta (y) vs sin etiqueta (solo X). La pregunta cambia:
     ya no "¿qué es esto?" sino "¿qué *estructura* tiene esto?".
  2. El dato sin etiqueta es lo abundante y barato; etiquetar es caro. Motivación real.
  3. Tres familias no supervisadas: **agrupar** (clustering), **reducir dimensión** (compresión/
     representación) y **generar** (aprender la distribución). El autoencoder vive en las dos últimas.
- **— 02 — La idea del autoencoder**
  4. Anatomía: **encoder → código (cuello de botella) → decoder**. Entra X, sale X̂ (una copia).
  5. El truco: obligar a pasar por un código más pequeño que la entrada → la red no puede copiar,
     tiene que **quedarse con lo esencial**. Compresión con pérdida aprendida de los datos.
  6. La pérdida = **error de reconstrucción** (‖X − X̂‖²). Se entrena sin etiquetas: la propia
     entrada es el objetivo (auto-supervisión).
  7. El **espacio latente**: cada dato → un punto en pocas dimensiones. Ahí "vive" lo aprendido.
- **— 03 — Variantes y qué aprenden**
  8. **PCA vs autoencoder**: un autoencoder lineal de 1 capa ≈ PCA; con capas no lineales aprende
     variedades curvas que PCA no captura. (Puente honesto con álgebra que ya vieron.)
  9. **Undercomplete vs regularizado**: código pequeño (undercomplete) fuerza compresión; si el
     código es grande hace falta regularizar (sparse/denoising) para que no memorice.
  10. **Denoising autoencoder**: entra X con ruido, se le pide reconstruir X limpio → aprende a
      distinguir señal de ruido. Idea que reaparece en difusión (gancho hacia 3.2).
  11. Mención breve a **VAE** como autoencoder *generativo* (latente probabilístico) → transición
      natural al subtema 3.2.
- **— 04 — Para qué sirven**
  12. **Compresión** y **reducción de dimensión** (alternativa no lineal a PCA para visualizar).
  13. **Eliminación de ruido** (imágenes, señales).
  14. **Detección de anomalías**: lo raro reconstruye mal → error alto = alarma (fraude, fallos).
  15. **Representaciones / preentrenamiento**: el encoder como extractor de rasgos reutilizable.
- **slide-exercise** (16) — "¿Qué pasa si el cuello de botella tiene *2 neuronas*?" (invita a la
  práctica: compresión extrema, pérdida visible; conecta con el interactivo).
- **Ideas para llevarte** (17) — 4 ideas: sin etiquetas se aprende estructura; el cuello de botella
  fuerza lo esencial; reconstrucción = auto-supervisión; usos = comprimir/limpiar/detectar/representar.
- **Cierre** (18) — Gracias / ¿Preguntas?

### Interactivo `practica-autoencoders.html` (canvas + JS puro, autocontenido)
**Concepto:** *"El cuello de botella en vivo."* Una imagen pequeña (p. ej. un dígito 16×16 fijo,
en el propio JS) se comprime a **k componentes** y se reconstruye. Slider **k = 1…16** (tamaño del
código latente). Se muestran lado a lado **original / reconstrucción** y el **error** numérico +
barra. Método honesto y sin libs: compresión lineal por una **base fija precomputada** (equivale a
un autoencoder lineal undercomplete = PCA truncado a k componentes). Al bajar k, la reconstrucción
se degrada suavemente → el alumno *ve* el compromiso compresión/fidelidad. (Segundo control opcional:
toggle "añadir ruido" → muestra el efecto denoising al reconstruir.)
*Nota de impl.:* la base se precalcula offline y se incrusta como array en el JS; nada se entrena en
el navegador. Mismo patrón autocontenido que las prácticas existentes.

### Repaso `repaso-autoencoders.html` (motor de quiz de `repaso-t9.html`, 10 retos)
Temas de las 10 preguntas: (1) supervisado vs no supervisado; (2) qué es el cuello de botella y por
qué; (3) qué función de pérdida usa y por qué no necesita etiquetas; (4) undercomplete vs overcomplete;
(5) denoising: qué entra y qué sale; (6) autoencoder lineal ≈ PCA; (7) detección de anomalías por
error de reconstrucción; (8) espacio latente / interpolación; (9) autoencoder ≠ clasificador (no da
etiquetas); (10) caso de uso (elegir el correcto).

### Lab `lab-autoencoders.html` + `files/autoencoders/Lab_Autoencoder_MNIST.ipynb`
Keras/TF. Notebook: (a) autoencoder **denoising** sobre MNIST (añadir ruido gaussiano, reconstruir);
(b) visualizar reconstrucciones limpias; (c) **interpolación en el espacio latente** entre dos
dígitos (morphing). No se ejecuta aquí; JSON validado + `node generate-manifest.js`. `lab-*.html`
copia el chasis de un `lab-*` existente y enlaza el notebook + botón Colab.

### Index
Subtema 3.1 en `section#tema-3` con **picker-four**: `sesion-autoencoders` (Teoría) ·
`practica-autoencoders` (Interactivo) · `repaso-autoencoders` (Repaso) · `lab-autoencoders` (Lab).

---

## C2 · Subtema 3.2 — Modelos generativos (GAN)

### Deck `sesion-generativos.html` (~14 slides, 3 divisores)
- **Portada** — meta `3.2 · Modelos generativos (GAN)`; título "Máquinas que *imaginan*."
- **Agenda** — generativo vs discriminativo / la idea adversaria / panorámica y retos.
- **— 01 — Generar vs discriminar**
  1. Discriminar = aprender la **frontera** entre clases (lo que hemos hecho hasta ahora).
     Generar = aprender la **distribución** de los datos para producir ejemplos nuevos.
  2. "¿Es un 7?" (discriminativo) vs "**dibújame** un 7 que no exista" (generativo).
  3. El puente desde 3.1: un autoencoder ya reconstruye; un VAE ya genera desde el latente. GAN es
     otra ruta a lo mismo: generar muestras realistas.
- **— 02 — La idea adversaria**
  4. Dos redes en duelo: **generador** (el falsificador) y **discriminador** (el detective).
  5. El generador parte de **ruido latente z** → produce una imagen; el discriminador decide
     real/falsa. Se entrenan enfrentados (juego minimax).
  6. El equilibrio: el generador mejora hasta que el discriminador ya no distingue (50/50). La
     competición es el "profesor" — sin etiquetas de clase.
  7. Intuición del entrenamiento: gradientes que empujan al generador hacia lo que engaña al detective.
- **— 03 — Panorámica y retos**
  8. Familia generativa: **GAN vs VAE vs difusión** (una frase de cada; difusión = "denoising"
     iterativo, gancho con 3.1).
  9. Problemas reales: **inestabilidad** del entrenamiento y **mode collapse** (el generador se
     atasca en pocas muestras).
  10. Usos y **ética**: síntesis de imágenes, aumento de datos, super-resolución… y deepfakes.
     Responsabilidad.
- **Ideas para llevarte** (11–12) — generar = aprender la distribución; el duelo generador/
  discriminador; z (ruido) → dato; retos y ética.
- **Cierre** — Gracias / ¿Preguntas?

### Repaso `repaso-generativos.html` (8 retos) — *incluido para consistencia*
Temas: discriminativo vs generativo; papel del generador y del discriminador; qué es z; el equilibrio
minimax; mode collapse; GAN vs VAE vs difusión; un uso legítimo; una implicación ética.

### Lab
**Reusar `lab-t5.html` + `files/tema-5/Lab_Tema5_GAN_MNIST.ipynb`** (ya existe; NO renombrar).

### Index
Subtema 3.2 con cards: `sesion-generativos` (Teoría) · `repaso-generativos` (Repaso) ·
`lab-t5` (Lab · GAN sobre MNIST).

---

## C3 · Subtema 3.3 — Redes de base radial (RBF) (LIGERO)

### Deck `sesion-rbf.html` (~11 slides, 2 divisores)
- **Portada** — meta `3.3 · Redes de base radial (RBF)`; título "Neuronas que miden *distancia*."
- **Agenda** — la idea RBF / la red RBF y su entrenamiento / cuándo usarlas.
- **— 01 — La idea de base radial**
  1. La neurona MLP mira un **producto escalar** (¿de qué lado del hiperplano estás?). La neurona RBF
     mira una **distancia a un centro**: activa fuerte si estás cerca, se apaga si te alejas.
  2. La **gaussiana**: activación local, controlada por el centro (dónde) y la anchura σ (cuánto
     alcance). Respuesta local vs la respuesta global del MLP.
- **— 02 — La red RBF y cómo se entrena**
  3. Arquitectura: capa de entrada → **capa RBF** (centros) → **capa lineal** de salida. Solo una
     capa oculta.
  4. Entrenamiento en dos pasos (por eso es rápida): **centros** por k-means (no supervisado) +
     **anchuras**; luego **pesos de salida** por mínimos cuadrados (lineal).
  5. **RBF vs MLP**: local vs global, entrenamiento rápido vs backprop, buena interpolación vs mejor
     extrapolación/profundidad. Cuándo gana cada una.
- **— 03 — Cuándo usarlas**
  6. Interpolación y **aproximación de funciones**, control, series pequeñas; respuesta rápida.
  7. Límite: **maldición de la dimensionalidad** (hacen falta muchos centros en alta dimensión) →
     por qué no dominan en visión/lenguaje frente a las redes profundas.
- **Ideas para llevarte** — distancia vs producto escalar; gaussiana local; entrenamiento en 2 pasos;
  nicho (interpolación/baja dimensión).
- **Cierre** — Gracias / ¿Preguntas?

### Repaso `repaso-rbf.html` (opcional, 6 retos) — *incluido, ligero*
Temas: distancia vs producto escalar; papel de centro y σ; arquitectura de 3 capas; entrenamiento en
2 pasos; RBF vs MLP; límite en alta dimensión.

### Index
Subtema 3.3 con cards: `sesion-rbf` (Teoría) · `repaso-rbf` (Repaso). Sin lab (subtema ligero).

---

## Orden de ejecución y verificación
1 subagente por bundle (ficheros acoplados; lección documentada). Cada bundle: construir → verificar
en Playwright con cache-bust (`?v=N`, 0 errores consola, enlaces 200, deck ~N slides) → commit. La
sección `section#tema-3` en `index.html` se rellena incrementalmente (3.1, luego 3.2, luego 3.3);
para no pisarse en el mismo fichero, las ediciones de index las hago yo entre bundles, no los subagentes.
Cierre: auditoría global + manifest + memoria + push.
