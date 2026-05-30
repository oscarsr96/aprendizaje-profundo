# Materiales descargables con subida vía GitHub

**Fecha:** 2026-05-30
**Estado:** Aprobado (diseño)

## Problema

El profesor necesita poder subir archivos del curso (PDF, PPTX, DOCX, notebooks, etc.)
y que los alumnos puedan descargarlos. Los alumnos **no** deben poder subir nada.

El sitio es estático (HTML/CSS/JS) desplegado en Vercel, sin backend. Una "URL secreta"
(`/subir`) no aporta seguridad real en un sitio estático: cualquiera que descubra la ruta
podría usarla y los buscadores pueden indexarla.

## Solución

No se construye ningún mecanismo de subida en el sitio. La subida se hace a través del
**login de GitHub** (solo el profesor / colaboradores del repo tienen acceso de escritura),
y el sitio público queda como **solo lectura/descarga**. Es imposible por diseño que un
alumno suba archivos: no existe ningún endpoint de subida.

Los alumnos acceden a los materiales mediante una página `/materiales` que se **genera
automáticamente** a partir del contenido de la carpeta `files/`, agrupada por tema.

### Flujo

- **Subir (profesor):** github.com → repo → carpeta del tema → _Add file → Upload files_
  → arrastrar archivos → commit. (Alternativa: `git add` + `git push`.)
- **Publicar:** Vercel sirve la carpeta `files/` (hoy está excluida en `.vercelignore`).
- **Listar (alumnos):** `materiales.html` lee un manifest generado en cada deploy y
  renderiza las descargas agrupadas por tema.

El día a día: arrastrar un archivo a `files/tema-X/` en GitHub → Vercel redespliega solo
(~1 min) → se regenera el manifest → aparece en `/materiales`. Sin editar HTML.

## Componentes

1. **`.vercelignore`** — eliminar la línea `files/` para que Vercel sirva los archivos.
   Sin este cambio nada de `files/` es accesible online.

2. **Reorganización de `files/`** en subcarpetas por tema:
   `tema-1/`, `tema-2/`, `tema-3/`, `tema-4/`, `general/`.
   (Mapeo propuesto de los 39 archivos en el Apéndice A — se confirma en el plan.)

3. **`generate-manifest.js`** — script Node (sin dependencias) que:
   - recorre recursivamente `files/`,
   - agrupa por subcarpeta de primer nivel,
   - para cada archivo registra: nombre, ruta relativa (URL de descarga), tamaño, extensión,
   - escribe `files-manifest.json` en la raíz del proyecto.

4. **`vercel.json`** — configura `buildCommand: "node generate-manifest.js"` y deja la raíz
   como directorio de salida. Se ejecuta en **cada deploy**, así el listado está siempre al
   día sin GitHub Actions ni commits automáticos de un bot.

5. **`materiales.html`** — hace `fetch('/files-manifest.json')` y renderiza grupos por tema
   (icono por tipo de archivo, tamaño legible, botón de descarga), reutilizando el lenguaje
   visual y los estilos existentes (`styles.css`). Maneja el caso de manifest vacío o error
   de carga con un mensaje claro.

6. **Enlace "Materiales"** en la navegación de `index.html`.

## Seguridad

- Escritura protegida por el control de acceso del repo de GitHub (privado). Solo el
  profesor/colaboradores pueden subir.
- El sitio público es solo lectura/descarga; no hay endpoint de subida que un alumno pueda
  invocar.
- No existe ruta `/subir` en el dominio: la "subida" es GitHub.

## Decisiones tomadas

- **Subida:** vía GitHub, sin backend.
- **Acceso alumnos:** página automática (`/materiales`).
- **Agrupación:** por carpetas/tema.
- **Soluciones:** se muestran todas (visibles para alumnos).
- **Repo:** privado. Vercel sigue sirviendo los archivos en ambos casos (público/privado),
  así que no afecta a la descarga.

## Manejo de errores

- `generate-manifest.js`: si `files/` no existe, genera un manifest vacío (no rompe el build).
- `materiales.html`: si el `fetch` falla o el manifest está vacío, muestra un mensaje
  ("Aún no hay materiales publicados" / "No se pudo cargar el listado").

## Testing

- Ejecutar `generate-manifest.js` en local y verificar que el JSON refleja la estructura de
  carpetas y los metadatos correctos.
- Tras el deploy: `/materiales` lista todos los archivos, la agrupación por tema es correcta,
  las descargas funcionan y los iconos/tamaños se muestran bien.
- Verificar que el deploy de Vercel no se rompe con el nuevo `buildCommand`.

## Notas / riesgos

- GitHub recomienda archivos < 100 MB; los PPTX/PDF actuales están muy por debajo.
- `Uploaded Media` parece ser una carpeta existente dentro de `files/`; se inspecciona y se
  decide su ubicación en el plan (probablemente `general/`).
- Algunos archivos `.html` en `files/` (p. ej. `descenso_gradiente.html`) son demos
  interactivas. Ninguna página del sitio las enlaza actualmente (verificado), así que
  reorganizarlas no rompe nada. En el manifest se listarán como recursos descargables/abribles.

## Apéndice A — Mapeo propuesto de archivos a carpetas

> Borrador para confirmar en el plan. Los marcados con ⚠ son ambiguos.

**`tema-1/` · Introducción**

- 1_Introduccion_al_deep_learning.ipynb
- 1_Introduccion_al_deep_learning.pdf
- 1. Introducción.pptx
- 1.2. Perceptrón simple.pptx
- ejercicios_perceptrones_simples.html
- CUNEF_Actividad_1_Redes_Neuronales_Artificiales_ANN.ipynb
- Ejercicio neurona.pdf
- Ejercicio Aprendizaje Neurona OR.pdf
- Ejercicio entrenamiento neurona.pdf
- Ejercicio entrenamiento neurona - solución.pdf
- Ejercicios cortos entrenamiento neuronas.pdf

**`tema-2/` · Base matemática**

- TEMA_2_Base_Matemática (1).ipynb
- TEMA_2_Base_Matemática (2).ipynb
- vertopal.com_TEMA_2_Base_Matemática (1).pdf
- Tema_2_1_Neuronas.ipynb
- Tema_2_1_Neuronas_solucion.ipynb
- Tema*2_1_Neuronas_solucion*(1).ipynb
- Test tema 2.pdf
- descenso_gradiente.html
- descenso_gradiente_interactivo.html

**`tema-3/` · Perceptrón multicapa (MLP)**

- 2. Perceptrón multicapa.pptx
- perceptrones_multicapa.html
- Ejercicio_MLP_Region_Rectangular.pdf
- Ejercicio_Red_Neuronal_Triangulo.pdf
- Práctica 3.pdf
- Práctica 3 (1).pdf
- Práctica 3 (2).pdf

**`tema-4/` · CNN**

- 4. CNN.pptx
- Actividad_2_Redes_Neuronales_Convolucionales_CNN.ipynb
- CNN_ejercicios.pdf
- Ejercicios Python CNN.pdf
- test_CNN.pdf
- test_CNN_medio.pdf
- data_augmentation.html
- fashion_mnist_dashboard.html

**`general/`**

- Aprendizaje Profundo - Guía Docente.pdf
- Uploaded Media (⚠ inspeccionar contenido)

⚠ A confirmar: `1.2. Perceptrón simple.pptx` y `ejercicios_perceptrones_simples.html`
(¿Tema 1 o Tema 3?).
