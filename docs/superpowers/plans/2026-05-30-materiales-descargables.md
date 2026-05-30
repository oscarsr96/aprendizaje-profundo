# Materiales descargables (subida vía GitHub) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que los alumnos descarguen los materiales del curso desde una página `/materiales` que se genera sola, mientras que la "subida" la hace solo el profesor a través de su login de GitHub (sin backend, sin ruta `/subir`).

**Architecture:** Sitio estático en Vercel. Los archivos viven en `files/<tema>/`. Un script Node (`generate-manifest.js`) se ejecuta como `buildCommand` de Vercel en cada deploy, recorre `files/` y escribe `files-manifest.json`. La página `materiales.html` hace `fetch` de ese manifest y renderiza las descargas agrupadas por tema. Subir = arrastrar archivos en GitHub (solo colaboradores del repo privado).

**Tech Stack:** HTML/CSS/JS estático, Node.js (script de build sin dependencias, `node:test`), Vercel.

**Spec:** `docs/superpowers/specs/2026-05-30-materiales-descargables-design.md`

---

## Estructura de archivos

- **Crear** `generate-manifest.js` — genera `files-manifest.json` recorriendo `files/`.
- **Crear** `generate-manifest.test.js` — tests del generador con `node:test`.
- **Crear** `vercel.json` — define `buildCommand` y `outputDirectory`.
- **Crear** `materiales.html` — página de descargas para alumnos.
- **Modificar** `.vercelignore` — dejar de excluir `files/`.
- **Modificar** `index.html` — enlace "Materiales" en la cabecera.
- **Reorganizar** `files/` — de plano a `files/tema-1..4/` y `files/general/`.
- **Generado (no editar a mano)** `files-manifest.json` — lo produce el script.

---

## Task 1: Reorganizar `files/` en subcarpetas por tema

**Files:**

- Modify (git mv): todo el contenido de `files/`

- [ ] **Step 1: Crear las subcarpetas**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
mkdir -p files/tema-1 files/tema-2 files/tema-3 files/tema-4 files/general
```

- [ ] **Step 2: Mover los archivos del Tema 1 (Introducción)**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git mv "files/1_Introduccion_al_deep_learning.ipynb" files/tema-1/
git mv "files/1_Introduccion_al_deep_learning.pdf" files/tema-1/
git mv "files/1. Introducción.pptx" files/tema-1/
git mv "files/1.2. Perceptrón simple.pptx" files/tema-1/
git mv "files/ejercicios_perceptrones_simples.html" files/tema-1/
git mv "files/CUNEF_Actividad_1_Redes_Neuronales_Artificiales_ANN.ipynb" files/tema-1/
git mv "files/Ejercicio neurona.pdf" files/tema-1/
git mv "files/Ejercicio Aprendizaje Neurona OR.pdf" files/tema-1/
git mv "files/Ejercicio entrenamiento neurona.pdf" files/tema-1/
git mv "files/Ejercicio entrenamiento neurona - solución.pdf" files/tema-1/
git mv "files/Ejercicios cortos entrenamiento neuronas.pdf" files/tema-1/
```

- [ ] **Step 3: Mover los archivos del Tema 2 (Base matemática)**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git mv "files/TEMA_2_Base_Matemática (1).ipynb" files/tema-2/
git mv "files/TEMA_2_Base_Matemática (2).ipynb" files/tema-2/
git mv "files/vertopal.com_TEMA_2_Base_Matemática (1).pdf" files/tema-2/
git mv "files/Tema_2_1_Neuronas.ipynb" files/tema-2/
git mv "files/Tema_2_1_Neuronas_solucion.ipynb" files/tema-2/
git mv "files/Tema_2_1_Neuronas_solucion_(1).ipynb" files/tema-2/
git mv "files/Test tema 2.pdf" files/tema-2/
git mv "files/descenso_gradiente.html" files/tema-2/
git mv "files/descenso_gradiente_interactivo.html" files/tema-2/
```

- [ ] **Step 4: Mover los archivos del Tema 3 (Perceptrón multicapa / MLP)**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git mv "files/2. Perceptrón multicapa.pptx" files/tema-3/
git mv "files/perceptrones_multicapa.html" files/tema-3/
git mv "files/Ejercicio_MLP_Region_Rectangular.pdf" files/tema-3/
git mv "files/Ejercicio_Red_Neuronal_Triangulo.pdf" files/tema-3/
git mv "files/Práctica 3.pdf" files/tema-3/
git mv "files/Práctica 3 (1).pdf" files/tema-3/
git mv "files/Práctica 3 (2).pdf" files/tema-3/
```

- [ ] **Step 5: Mover los archivos del Tema 4 (CNN)**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git mv "files/4. CNN.pptx" files/tema-4/
git mv "files/Actividad_2_Redes_Neuronales_Convolucionales_CNN.ipynb" files/tema-4/
git mv "files/CNN_ejercicios.pdf" files/tema-4/
git mv "files/Ejercicios Python CNN.pdf" files/tema-4/
git mv "files/test_CNN.pdf" files/tema-4/
git mv "files/test_CNN_medio.pdf" files/tema-4/
git mv "files/data_augmentation.html" files/tema-4/
git mv "files/fashion_mnist_dashboard.html" files/tema-4/
```

- [ ] **Step 6: Mover los archivos a General y vaciar "Uploaded Media"**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git mv "files/Aprendizaje Profundo - Guía Docente.pdf" files/general/
git mv "files/Uploaded Media/Brain Tumor.zip" files/general/
git mv "files/Uploaded Media/MLP_Heart.ipynb" files/general/
git mv "files/Uploaded Media/MLP_Wine.ipynb" files/general/
rmdir "files/Uploaded Media" 2>/dev/null || true
```

- [ ] **Step 7: Verificar que no quedan archivos sueltos en `files/`**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
echo "--- sueltos en files/ (debe estar vacío) ---"
find files -maxdepth 1 -type f
echo "--- recuento por carpeta ---"
for d in files/*/; do printf "%s " "$d"; find "$d" -type f | wc -l; done
echo "--- total archivos ---"
find files -type f ! -name ".DS_Store" | wc -l
```

Expected: ninguna línea bajo "sueltos"; los recuentos por carpeta son tema-1=11, tema-2=9, tema-3=7, tema-4=8, general=4; total = 39.

- [ ] **Step 8: Commit**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git add -A
git commit -m "refactor: reorganiza files/ en subcarpetas por tema"
```

---

## Task 2: Dejar de excluir `files/` en Vercel

**Files:**

- Modify: `.vercelignore`

- [ ] **Step 1: Quitar la línea `files/`**

Estado actual del archivo:

```
files/
.DS_Store
node_modules/
```

Editar para que quede exactamente:

```
.DS_Store
node_modules/
```

- [ ] **Step 2: Verificar**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
cat .vercelignore
```

Expected: no aparece `files/`; solo `.DS_Store` y `node_modules/`.

- [ ] **Step 3: Commit**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git add .vercelignore
git commit -m "build: deja de excluir files/ del deploy de Vercel"
```

---

## Task 3: Generador del manifest (`generate-manifest.js`) con tests

**Files:**

- Create: `generate-manifest.js`
- Test: `generate-manifest.test.js`

- [ ] **Step 1: Escribir el test que falla**

Crear `generate-manifest.test.js`:

```js
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { buildManifest } = require("./generate-manifest.js");

function makeFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mat-"));
  fs.mkdirSync(path.join(dir, "tema-1"));
  fs.mkdirSync(path.join(dir, "tema-2"));
  fs.mkdirSync(path.join(dir, "tema-2", "sub"));
  fs.writeFileSync(path.join(dir, "tema-1", "b.pdf"), "x");
  fs.writeFileSync(path.join(dir, "tema-1", "a.pptx"), "yy");
  fs.writeFileSync(path.join(dir, "tema-1", ".DS_Store"), "z");
  fs.writeFileSync(path.join(dir, "tema-2", "sub", "deep.ipynb"), "zzz");
  return dir;
}

test("agrupa por carpeta de primer nivel con título legible", () => {
  const m = buildManifest(makeFixture());
  assert.strictEqual(m.groups.length, 2);
  assert.strictEqual(m.groups[0].id, "tema-1");
  assert.strictEqual(m.groups[0].title, "Tema 1 · Introducción");
});

test("ordena archivos alfabéticamente e ignora ocultos", () => {
  const t1 = buildManifest(makeFixture()).groups[0].files;
  assert.strictEqual(t1.length, 2); // .DS_Store ignorado
  assert.strictEqual(t1[0].name, "a.pptx");
  assert.strictEqual(t1[1].name, "b.pdf");
});

test("incluye archivos anidados con ruta y metadatos", () => {
  const t2 = buildManifest(makeFixture()).groups[1].files;
  assert.strictEqual(t2.length, 1);
  assert.strictEqual(t2[0].path, "files/tema-2/sub/deep.ipynb");
  assert.strictEqual(t2[0].ext, "ipynb");
  assert.strictEqual(t2[0].size, 3);
});

test("directorio inexistente => sin grupos", () => {
  const m = buildManifest(path.join(os.tmpdir(), "no-existe-xyz-123"));
  assert.deepStrictEqual(m, { groups: [] });
});
```

- [ ] **Step 2: Ejecutar el test y ver que falla**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
node --test
```

Expected: FAIL — `Cannot find module './generate-manifest.js'`.

- [ ] **Step 3: Implementar el generador**

Crear `generate-manifest.js`:

```js
#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const FILES_DIR = path.join(ROOT, "files");
const OUTPUT = path.join(ROOT, "files-manifest.json");

const GROUP_TITLES = {
  "tema-1": "Tema 1 · Introducción",
  "tema-2": "Tema 2 · Base matemática",
  "tema-3": "Tema 3 · Perceptrón multicapa (MLP)",
  "tema-4": "Tema 4 · CNN",
  general: "General",
};

function listFilesRecursive(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(listFilesRecursive(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function buildManifest(filesDir) {
  if (!fs.existsSync(filesDir)) return { groups: [] };
  const groups = [];
  const dirs = fs
    .readdirSync(filesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
  for (const dir of dirs) {
    const files = listFilesRecursive(path.join(filesDir, dir.name))
      .map((abs) => {
        const rel = path.relative(filesDir, abs).split(path.sep).join("/");
        return {
          name: path.basename(abs),
          path: "files/" + rel,
          ext: path.extname(abs).slice(1).toLowerCase(),
          size: fs.statSync(abs).size,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
    if (files.length) {
      groups.push({
        id: dir.name,
        title: GROUP_TITLES[dir.name] || dir.name,
        files,
      });
    }
  }
  return { groups };
}

if (require.main === module) {
  const manifest = buildManifest(FILES_DIR);
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + "\n");
  const total = manifest.groups.reduce((n, g) => n + g.files.length, 0);
  console.log(`Manifest: ${manifest.groups.length} grupos, ${total} archivos.`);
}

module.exports = { buildManifest };
```

- [ ] **Step 4: Ejecutar los tests y ver que pasan**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
node --test
```

Expected: PASS — 4 tests ok, 0 failing.

- [ ] **Step 5: Generar el manifest real y revisarlo**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
node generate-manifest.js
echo "--- grupos y recuento ---"
node -e "const m=require('./files-manifest.json');console.log(m.groups.map(g=>g.id+': '+g.files.length).join('\n'))"
```

Expected: `Manifest: 5 grupos, 39 archivos.` y recuentos tema-1=11, tema-2=9, tema-3=7, tema-4=8, general=4.

- [ ] **Step 6: Commit**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git add generate-manifest.js generate-manifest.test.js files-manifest.json
git commit -m "feat: generador de manifest de materiales con tests"
```

---

## Task 4: Configurar el build de Vercel (`vercel.json`)

**Files:**

- Create: `vercel.json`

- [ ] **Step 1: Crear `vercel.json`**

```json
{
  "buildCommand": "node generate-manifest.js",
  "outputDirectory": "."
}
```

- [ ] **Step 2: Verificar que es JSON válido**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
node -e "console.log(JSON.parse(require('fs').readFileSync('vercel.json','utf8')))"
```

Expected: imprime el objeto con `buildCommand` y `outputDirectory` sin error.

- [ ] **Step 3: Commit**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git add vercel.json
git commit -m "build: genera el manifest en cada deploy de Vercel"
```

---

## Task 5: Página de descargas (`materiales.html`)

**Files:**

- Create: `materiales.html`

- [ ] **Step 1: Crear `materiales.html`**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Materiales · Aprendizaje Profundo · CUNEF</title>
    <meta
      name="description"
      content="Materiales descargables de la asignatura Aprendizaje Profundo — CUNEF Universidad."
    />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Taviraj:ital,wght@0,400;0,600;0,700;1,400&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles.css" />
    <style>
      .mat-main {
        max-width: 880px;
        margin: 0 auto;
        padding: 2.5rem 1.25rem 4rem;
      }
      .mat-head {
        margin-bottom: 2rem;
      }
      .mat-head .kicker {
        font: 600 0.8rem var(--mono, monospace);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--accent, #ff5700);
      }
      .mat-head h1 {
        font: 700 2.4rem/1.05 var(--serif, Georgia, serif);
        color: var(--ink, #1a1f6c);
        margin: 0.3rem 0 0.6rem;
      }
      .mat-head p {
        color: var(--ink-soft, #3b4080);
        max-width: 60ch;
      }
      .mat-group {
        margin-top: 2.25rem;
      }
      .mat-group > h2 {
        font: 600 1.15rem var(--sans, system-ui);
        color: var(--ink, #1a1f6c);
        border-bottom: 1px solid var(--line, #e2ded0);
        padding-bottom: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .mat-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.5rem;
      }
      .mat-item a {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.7rem 0.9rem;
        border: 1px solid var(--line, #e2ded0);
        border-radius: 12px;
        background: var(--paper, #fff);
        color: var(--ink, #1a1f6c);
        text-decoration: none;
        transition:
          border-color 0.15s ease,
          transform 0.15s ease,
          box-shadow 0.15s ease;
      }
      .mat-item a:hover {
        border-color: var(--accent, #ff5700);
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(26, 31, 108, 0.08);
      }
      .mat-ext {
        flex: 0 0 auto;
        min-width: 5.2rem;
        text-align: center;
        font: 700 0.7rem var(--mono, monospace);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--accent-deep, #c8410f);
        background: var(--paper-warm, #f0ebdd);
        border-radius: 999px;
        padding: 0.3rem 0.5rem;
      }
      .mat-name {
        flex: 1 1 auto;
        font-weight: 500;
        word-break: break-word;
      }
      .mat-size {
        flex: 0 0 auto;
        font: 500 0.8rem var(--mono, monospace);
        color: var(--ink-mute, #7c80a6);
      }
      .mat-empty {
        color: var(--ink-mute, #7c80a6);
        padding: 2rem 0;
      }
      @media (max-width: 520px) {
        .mat-item a {
          flex-wrap: wrap;
        }
        .mat-size {
          margin-left: auto;
        }
      }
    </style>
  </head>
  <body>
    <header class="bar">
      <a href="./index.html" style="display: inline-flex; align-items: center">
        <img
          class="bar-logo"
          src="./assets/cunef-logo.png"
          alt="CUNEF Universidad"
        />
      </a>
      <span class="bar-sub">· Aprendizaje Profundo</span>
    </header>

    <main class="mat-main">
      <div class="mat-head">
        <span class="kicker">CUNEF Universidad · Asignatura</span>
        <h1>Materiales</h1>
        <p>
          Presentaciones, notebooks y ejercicios de la asignatura, organizados
          por tema. Pulsa cualquier archivo para abrirlo o descargarlo.
        </p>
      </div>

      <div id="materiales">
        <p class="mat-empty">Cargando materiales…</p>
      </div>
    </main>

    <footer>CUNEF Universidad · Aprendizaje Profundo · cunef.edu</footer>

    <script>
      (function () {
        var mount = document.getElementById("materiales");
        var EXT_LABEL = {
          pdf: "PDF",
          pptx: "Diapositivas",
          ppt: "Diapositivas",
          ipynb: "Notebook",
          docx: "Word",
          doc: "Word",
          html: "Demo",
          zip: "ZIP",
          csv: "CSV",
          xlsx: "Excel",
        };
        function esc(s) {
          return String(s).replace(/[&<>"]/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
          });
        }
        function fmtSize(b) {
          if (b < 1024) return b + " B";
          if (b < 1048576) return Math.round(b / 1024) + " KB";
          return (b / 1048576).toFixed(1) + " MB";
        }
        function encPath(p) {
          return p.split("/").map(encodeURIComponent).join("/");
        }
        function render(data) {
          var groups = (data && data.groups) || [];
          if (!groups.length) {
            mount.innerHTML =
              '<p class="mat-empty">Aún no hay materiales publicados.</p>';
            return;
          }
          var html = "";
          groups.forEach(function (g) {
            html += '<section class="mat-group"><h2>' + esc(g.title) + "</h2>";
            html += '<ul class="mat-list">';
            g.files.forEach(function (f) {
              var label =
                EXT_LABEL[f.ext] || (f.ext ? f.ext.toUpperCase() : "Archivo");
              html +=
                '<li class="mat-item"><a href="/' +
                encPath(f.path) +
                '" target="_blank" rel="noopener">' +
                '<span class="mat-ext">' +
                esc(label) +
                "</span>" +
                '<span class="mat-name">' +
                esc(f.name) +
                "</span>" +
                '<span class="mat-size">' +
                fmtSize(f.size) +
                "</span></a></li>";
            });
            html += "</ul></section>";
          });
          mount.innerHTML = html;
        }
        fetch("/files-manifest.json", { cache: "no-cache" })
          .then(function (r) {
            if (!r.ok) throw new Error("http " + r.status);
            return r.json();
          })
          .then(render)
          .catch(function () {
            mount.innerHTML =
              '<p class="mat-empty">No se pudo cargar el listado de materiales.</p>';
          });
      })();
    </script>
  </body>
</html>
```

- [ ] **Step 2: Verificar en local con un servidor estático**

Run (en una terminal; Ctrl-C al terminar):

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
node generate-manifest.js && python3 -m http.server 8765
```

Abrir en el navegador `http://localhost:8765/materiales.html`.
Expected: cabecera CUNEF, título "Materiales", 5 grupos (Tema 1–4 + General) con sus archivos; al pulsar un PDF se abre en pestaña nueva y al pulsar un .pptx/.zip se descarga. Sin errores en la consola del navegador.

- [ ] **Step 3: Commit**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git add materiales.html
git commit -m "feat: página /materiales con listado de descargas por tema"
```

---

## Task 6: Enlace "Materiales" en la cabecera de `index.html`

**Files:**

- Modify: `index.html` (bloque `<header class="bar">`, líneas ~821-828)

- [ ] **Step 1: Añadir el enlace en la cabecera**

Buscar este bloque en `index.html`:

```html
<header class="bar">
  <img class="bar-logo" src="./assets/cunef-logo.png" alt="CUNEF Universidad" />
  <span class="bar-sub">· Aprendizaje Profundo</span>
</header>
```

Reemplazarlo por:

```html
<header class="bar">
  <img class="bar-logo" src="./assets/cunef-logo.png" alt="CUNEF Universidad" />
  <span class="bar-sub">· Aprendizaje Profundo</span>
  <a
    class="bar-link"
    href="./materiales.html"
    style="margin-left: auto; font: 600 0.9rem var(--sans); color: var(--ink); text-decoration: none; border: 1px solid var(--line); padding: 0.4rem 0.85rem; border-radius: 999px"
    >Materiales ↓</a
  >
</header>
```

- [ ] **Step 2: Verificar**

Run (con el servidor del Task 5 corriendo, o relanzarlo):

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
python3 -m http.server 8765
```

Abrir `http://localhost:8765/index.html`.
Expected: en la cabecera, a la derecha, aparece el botón "Materiales ↓"; al pulsarlo navega a `materiales.html`. (Si el botón no se alinea a la derecha, comprobar que `.bar` usa `display:flex` en `styles.css`/inline; si no, no es bloqueante.)

- [ ] **Step 3: Commit**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git add index.html
git commit -m "feat: enlace a Materiales en la cabecera de la home"
```

---

## Task 7: Verificación end-to-end y deploy

**Files:** ninguno (verificación)

- [ ] **Step 1: Suite de tests y generación del manifest desde cero**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
node --test && node generate-manifest.js
git status --porcelain
```

Expected: tests PASS; el manifest se regenera; si `files-manifest.json` aparece como modificado, hacer commit de la versión actualizada.

- [ ] **Step 2: Simular el build de Vercel y servir el resultado**

Run:

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
node generate-manifest.js && python3 -m http.server 8765
```

Comprobar `http://localhost:8765/materiales.html`: los 5 grupos, descargas funcionando (incluido un archivo con tildes/espacios como "1. Introducción.pptx" y "Práctica 3 (1).pdf").

- [ ] **Step 3: Push y deploy**

```bash
cd /Users/oscarsanchezrueda/Repos/aprendizaje_profundo
git push
```

Esperar el deploy de Vercel (~1 min).

- [ ] **Step 4: Verificación en producción**

En el dominio del proyecto, comprobar:

- `https://<dominio>/materiales.html` lista los 5 grupos.
- `https://<dominio>/files-manifest.json` devuelve el JSON (confirma que el `buildCommand` se ejecutó).
- Descargar un par de archivos (uno con tildes/espacios).
- En la home, el botón "Materiales ↓" navega correctamente.

Expected: todo accesible. **Si el deploy falla o la home deja de servirse** (riesgo del `buildCommand`/`outputDirectory`): revertir con `git revert` del commit de `vercel.json` (Task 4) y volver a desplegar; el resto de la funcionalidad sigue válida salvo la regeneración automática del manifest.

- [ ] **Step 5: Prueba del flujo del profesor (opcional, recomendado)**

En github.com → repo → `files/tema-1/` → _Add file → Upload files_ → subir un PDF de prueba → commit. Esperar el deploy. Confirmar que aparece en `/materiales`. Borrarlo después si era de prueba.

---

## Notas de seguridad y operación

- **Subir = GitHub.** Solo colaboradores del repo privado pueden añadir/borrar archivos. No existe endpoint de subida en el sitio; los alumnos solo descargan.
- **Sin ruta `/subir`** por diseño: evitar dar falsa sensación de seguridad con una URL "secreta".
- **Para mover un archivo de tema** después: arrastrarlo a otra carpeta `files/tema-X/` en GitHub (o `git mv`); el manifest se regenera solo en el siguiente deploy.
