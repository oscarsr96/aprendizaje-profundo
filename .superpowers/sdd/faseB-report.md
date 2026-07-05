# Informe Fase B — Reetiquetado de cabeceras y referencias al esquema de 5 temas

Rama: `reestructura-5-temas`. Sitio estático (sin build/tests). Solo se editó el texto
visible/metadatos de los 36 ficheros de página; **no** se tocó `index.html` ni `files/`, y **no**
se renombró ningún fichero (los slugs `sesion-tN.html`, etc., se mantienen).

## Ficheros tocados (36)

| Grupo (contenido) | Nº·Subtema nuevo | Ficheros |
|---|---|---|
| Panorámica | Tema 1 · Panorámica | `sesion-t5.html`, `repaso-t5.html` |
| Perceptrón | Tema 2 · El perceptrón (2.1) | `sesion1.html`, `sesion2.html`, `lab-t1.html`, `repaso1.html` |
| MLP | Tema 2 · Perceptrón multicapa (2.2) | `sesion-t2.html`, `practica-t2.html`, `lab-t2.html`, `repaso-t2.html` |
| Entrenamiento | Tema 2 · Entrenamiento (2.3) | `sesion-t7.html`, `practica-t7.html`, `lab-t7.html`, `repaso-t7.html` |
| Regularización | Tema 2 · Sobreajuste y regularización (2.4) | `sesion-t8.html`, `practica-t8.html`, `lab-t8.html`, `repaso-t8.html` |
| GAN | Tema 3 · Modelos generativos (3.2) | `lab-t5.html` |
| CNN | Tema 4 · Redes convolucionales (4.1) | `sesion-t4.html`, `practica-t4.html`, `lab-t4.html`, `repaso-t4.html` |
| RNN/LSTM | Tema 4 · Modelos dinámicos (4.2) | `sesion-t3.html`, `practica-t3.html`, `lab-t3.html`, `repaso-t3.html` |
| Transformers | Tema 4 · Atención y Transformers (4.3) | `sesion-t6.html`, `practica-t6.html`, `lab-t6.html`, `repaso-t6.html` |
| Adversario | Tema 4 · Limitaciones y desafíos (4.4) | `practica-t5.html` |
| Evaluación | Tema 5 · Validación y métricas (5.1) | `sesion-t9.html`, `practica-t9.html`, `lab-t9.html`, `repaso-t9.html` |

## Parte 1 — Etiquetas de cabecera (mecánico)

Aplicado en cada fichero según su tipo:
- **Decks:** `<title>`, `brand-text` → `Aprendizaje Profundo · Tema X · <subtema>`; `cover-meta`
  `meta-val` → `X.Y · <subtema>` (excepto Panorámica y Perceptrón/Práctica: ver notas).
- **`practica-*` / `lab-*`:** `bar-sub` → `· Aprendizaje Profundo · Tema X · <subtema>`; `<title>`
  con el `Tema N` sustituido por `Tema X` (+ subtema).
- **`repaso-*`:** `bar-sub` → `· … · Repaso · Tema X · <subtema>`; `hero-kicker` →
  `Tema X · <subtema> · Repaso`; `<title>` → `… Repaso Tema X` (solo número, sin subtema, por
  convención existente en el repo).

Extras coherentes (mismo criterio, verificado contra ficheros ya migrados):
- Kickers de página (`Tema N · Práctica/Laboratorio`, `Resumen/Cierre del Tema N`) → número nuevo,
  **sin** nombre de subtema (patrón ya usado en t1–t6 migrados).
- `meta name="description"` (SEO, no visible) y comentarios JS con el número del propio tema:
  actualizados al número nuevo por consistencia (ver "Limpieza de residuales").

Casos especiales:
- **Panorámica** (Tema 1): sin sufijo numérico de subtema en brand-text (`Tema 1 · Panorámica`);
  cover-meta `1 · Panorámica`.
- **sesion2.html** (Perceptrón · Práctica): mantiene el sufijo `· Práctica`; cover-meta `2.1 · Práctica`
  (se conserva "Práctica" como etiqueta corta, no se sustituye por el subtema).

## Parte 2 — Referencias de contenido a otros temas (criterio)

Reapuntadas al número NUEVO del tema-contenido referido (mapa del brief):

- `sesion-t5.html`: cierre `(Tema 6)` → `(Tema 4)` y CTA "Tema 6 · Atención y Transformers" →
  "Tema 4 · Atención y Transformers" [Transformers]. Frase de cierre `(Temas 7–9)` →
  `(Temas 2 y 5)` [entrenar/generalizar = Tema 2 (2.3/2.4); evaluar = Tema 5 (5.1)].
- `sesion-t6.html`: "El Tema 3 nos dejó con las LSTM…" (L98) y "mismo olvido del Tema 3" (L118) →
  `Tema 4` [LSTM/RNN].
- `sesion-t2.html`: "…redes que veremos en el Tema 3" (L509) → `Tema 4` [LSTM]; CTA
  "Siguiente · Tema 3" → `Tema 4` (descrito como "Redes recurrentes y LSTM"). `lab-t2.html`
  "como en el Tema 9" (train/test) → `Tema 5`. `repaso-t2.html` "entrar al Tema 3" → `Tema 4`.
- `sesion-t9.html`: `(Tema 7)` → `(Tema 2 · Entrenamiento)` [Entrenamiento].
- `sesion-t4.html`: refs a Transformers `Tema 6` → `Tema 4 · Atención y Transformers` (L607) y
  `lab-t4.html` (L159); CTA "Siguiente · Tema 5" (descrito como panorámica/"todas las piezas del
  curso") → `Tema 1`; "Tema 5 en preparación" → `Tema 1`.
- `sesion-t3.html`: CTA "Siguiente · Tema 4" (descrito como CNN) — ya correcto (CNN = Tema 4).
  `repaso-t3.html` "entrar al Tema 4" (CNN) — correcto.
- `sesion1.html`/`sesion2.html`: "Tema 2, 3 y 4 en preparación" → "Tema 2 y 4" (viejos T3-LSTM y
  T4-CNN colapsan ambos en el nuevo Tema 4, por lo que el "3" duplicado desaparece).
- `lab-t5.html`: "La panorámica del Tema 5 presentaba los modelos generativos" → `Tema 1`
  (apunta a la sesión-panorámica, ahora Tema 1).
- Autorreferencias al propio tema (kickers, resúmenes, cierres, prosa de repaso) actualizadas al
  número nuevo en todos los grupos cuyo número cambió.

### Limpieza de residuales (pasada de consolidación)
Tras los grupos, la verificación 1 detectó números viejos residuales en `meta description` (SEO) y
comentarios JS (no visibles) de ficheros de viejos temas 6–9. Al ser autorreferencias inequívocas al
propio tema, se actualizaron: `sesion-t7/practica-t7/lab-t7/repaso-t7` (meta+comentario → Tema 2),
`sesion-t8/practica-t8/lab-t8/repaso-t8` (→ Tema 2), `practica-t6` (comentario → Tema 4),
`practica-t9` (comentario → Tema 5).

## Menciones dudosas dejadas SIN cambiar (requieren decisión del autor)

1. **`sesion-t7.html:149`** — "El *backprop* del **Tema 3** es, precisamente, la máquina de calcular
   ese gradiente…". El backprop *general* (esa "máquina del gradiente") se introduce en el viejo
   Tema 2 (MLP, sesion-t2 slide 16 "Perceptrón multicapa + backpropagation") → nuevo **Tema 2**; pero
   el viejo Tema 3 (LSTM) trae la variante BPTT (backprop en el tiempo) → nuevo **Tema 4**. No se
   puede determinar con certeza a cuál apuntaba. Se deja "Tema 3" (queda fuera del rango 6–9 de la
   verificación). **Recomendación probable: Tema 2** (es backprop general), a confirmar.

2. **`repaso-t4.html:1075`** — "…Listo para entrar al **Tema 5** con la base firme." Línea genérica de
   "siguiente tema" que no nombra contenido concreto. En el orden lineal viejo, tras CNN (T4) venía el
   antiguo T5 (clúster panorámica/GAN/adversario), que en el nuevo esquema se dispersa (Tema 1 / Tema 3
   / Tema 4). El nuevo "Tema 5" es Evaluación, que **no** es la continuación conceptual. Por la regla
   del brief ("no reescribir el flujo de siguiente tema inventando un orden"), se deja sin tocar y se
   señala para que el autor decida el destino correcto (probablemente reescribir la frase, no solo el
   número).

## Verificaciones

1. **`grep -rn "Tema [6-9]" sesion*.html practica-t*.html lab-t*.html repaso-t*.html`** → sin
   coincidencias (exit 1). Limpio.
2. **Muestra de cabeceras (3 tipos/temas distintos):**
   - Deck — `sesion-t7.html`:
     `<title>CUNEF · Aprendizaje Profundo · Tema 2 · Entrenamiento</title>` /
     `brand-text`: `Aprendizaje Profundo · Tema 2 · Entrenamiento` /
     `meta-val`: `2.3 · Entrenamiento`.
   - Práctica — `practica-t4.html`:
     `bar-sub`: `· Aprendizaje Profundo · Tema 4 · Redes convolucionales`.
   - Repaso — `repaso-t6.html`:
     `bar-sub`: `· Aprendizaje Profundo · Repaso · Tema 4 · Atención y Transformers` /
     `hero-kicker`: `Tema 4 · Atención y Transformers · Repaso`.
3. **`git diff --stat`** → 36 ficheros de página, 183 inserciones / 183 borrados. **No** aparece
   `index.html` ni ningún fichero de `files/`.
