# Plan de ampliación del temario — Aprendizaje Profundo (CUNEF)

**Fecha:** 2026-07-04
**Estado:** PROPUESTA para validar (no implementado)
**Autor:** Óscar Sánchez Rueda (borrador con Claude Code)

> Documento de planificación, no de implementación. No modifica el sitio.
> Su objetivo es servir de base para decidir cómo extender el curso y, sobre
> todo, para **validar el temario con el experto/temario oficial** antes de
> construir nada. Claude puede montar la estructura, los decks, los labs y la
> integración; **la autoridad sobre el contenido pedagógico es del profesor.**

## 0. Decisiones confirmadas (2026-07-04)

- **Alcance**: se hace **todo** (las tres fases).
- **Escala**: **6 ECTS** (~14 sesiones de teoría + laboratorios).
- **Framework de laboratorio**: **Keras / TensorFlow** (coherente con los notebooks actuales).
- **Entrega de Python**: **notebooks descargables** (`.ipynb`) para ejecutar en el PC o en Colab, con botón **"Abrir en Colab"** (carga desde GitHub: `colab.research.google.com/github/oscarsr96/aprendizaje-profundo/blob/main/<ruta>`). La descarga es la vía principal.
- **Atención y Transformers**: hasta **fine-tuning con HuggingFace** (lab de fine-tuning de un modelo preentrenado para clasificar texto).
- **Infra**: `files/` se despliega en Vercel (sin `.vercelignore`), así que los notebooks se sirven en `./files/...`.

Estas decisiones anulan los supuestos "a validar" de §2 donde difieran.

## 1. Diagnóstico

Estado actual (completo y desplegado): **5 temas**, cada uno con teoría (deck
~18–21 slides), 1 práctica interactiva (HTML) y repaso autocorregible.

Dos limitaciones para una asignatura completa:

1. **Volumen**: 5 sesiones de ~50 min ≈ 4–5 h de teoría. Un 6 ECTS pide del
   orden de 14 sesiones de teoría + 10–14 de laboratorio.
2. **Falta de código ejecutable**: el alumno no escribe ni ejecuta Python. Las
   prácticas actuales son *intuición* (muy buenas para eso), pero no sustituyen
   a entrenar modelos de verdad.

**Material práctico ya existente pero infrautilizado** (hoy solo en *Materiales*):

| Tipo | Archivos |
|------|----------|
| Notebooks | `Actividad_1_ANN` (T1), `MLP_Heart`, `MLP_Wine` (general), `Actividad_2_CNN` (T4) |
| Ejercicios PDF | neurona OR, entrenamiento neurona (+solución), ejercicios cortos, MLP región/triángulo, CNN ejercicios, tests CNN |
| Interactivos HTML | perceptrones simples, descenso del gradiente, data augmentation, fashion-MNIST dashboard |

## 2. Supuestos (a validar)

- Asignatura de **6 ECTS** (~150 h totales; ~45 h presenciales).
- Estructura semanal: **1 sesión de teoría + 1 de laboratorio** por tema.
- Herramienta de laboratorio: **Python + Keras/TensorFlow** (coherente con los
  notebooks existentes; alternativa PyTorch si el temario lo prefiere).
- Nivel: grado, con base de programación y álgebra/cálculo básicos.

Si cambian los ECTS o el enfoque, el mapa de abajo se recalibra.

## 3. Principios de diseño

- **Teoría (intuición) + Laboratorio (código) en cada tema.** El deck y el
  interactivo construyen intuición; el notebook la convierte en práctica.
- **Reutilizar** el chasis actual (decks `sesion-*`, repasos, interactivos) y el
  sistema de diseño del sitio.
- **Subtemas** para partir decks largos en sub-sesiones semanales manejables.
- **Progresión**: fundamentos → arquitecturas → fronteras.

## 4. Decisión clave: cómo se entrega el Python

El sitio es **estático (Vercel)**: no ejecuta Python en el navegador. Opciones:

| Opción | Qué es | Pros | Contras | Reco |
|--------|--------|------|---------|------|
| **Colab** | Notebook + badge "Abrir en Colab" | Estándar docente; GPU gratis; Keras/PyTorch completos | Requiere cuenta Google; sales del sitio | ✅ **Recomendada** |
| **Pyodide** | Python real en el navegador (WASM) | Sin salir del sitio; sin cuenta | NumPy/scikit sí, Keras/PyTorch **no**; pesado | Para demos NumPy puntuales |
| **Descarga** | `.ipynb` en Materiales (ya existe) | Cero fricción de montaje | El alumno monta su entorno | Complemento |

**Propuesta**: cada tema tendrá una tarjeta **"Laboratorio"** que enlaza a un
notebook con badge de Colab (y descarga como respaldo). Los interactivos HTML se
mantienen como piezas de intuición.

## 5. Mapa del temario ampliado (de 5 → 10 sesiones + laboratorios)

| # | Sesión | Estado | Teoría | Interactivo | Laboratorio (Python) |
|---|--------|--------|--------|-------------|----------------------|
| 1 | Introducción y perceptrón | ✅ existe | ✅ | ✅ perceptrón | ♻️ `Actividad_1_ANN` |
| 2 | Perceptrón multicapa y backprop | ✅ existe | ✅ | ✅ regiones | 🆕 MLP en Keras (usar `MLP_Wine`/`Heart`) |
| 3 | **Entrenar de verdad** | 🆕 | 🆕 | ♻️ descenso gradiente | 🆕 optimizadores y LR |
| 4 | **Generalización y regularización** | 🆕 | 🆕 | ♻️ data augmentation | 🆕 overfitting/dropout |
| 5 | **Datos y evaluación** | 🆕 | 🆕 | 🆕 matriz de confusión / ROC | 🆕 métricas y splits |
| 6 | CNN (+ transfer learning) | ✅/🔨 | ✅ (ampliar) | ✅ convolución | ♻️ `Actividad_2_CNN` + transfer |
| 7 | Secuencias: RNN/LSTM | ✅ existe | ✅ | ✅ cinta de memoria | 🆕 LSTM en texto/series |
| 8 | **Atención y Transformers** | 🆕 | 🆕 | 🆕 self-attention | 🆕 fine-tuning con HuggingFace |
| 9 | Modelos generativos (GAN/VAE/difusión, intro LLMs) | 🔨 (amplía T5) | 🔨 | ✅ (reutilizar) | 🆕 GAN mínima |
| 10 | Ética, sesgos, adversarial y despliegue | 🔨 (parte de T5) | 🔨 | ✅ ataque adversario | 🆕 auditoría de sesgos |

Leyenda: ✅ hecho · ♻️ material existente a integrar · 🔨 ampliar lo actual · 🆕 nuevo.

### Huecos más críticos (orden de prioridad)
1. **Laboratorios Python** en todos los temas (hoy: 0 integrados).
2. **Atención y Transformers** (sesión 8): ausente y es central en 2026.
3. **Fundamentos de entrenamiento/regularización/evaluación** (sesiones 3–5).

## 6. Detalle por sesión nueva (esbozo)

- **3 · Entrenar de verdad** — descenso del gradiente (batch/mini-batch/SGD),
  backprop paso a paso, momentum, RMSProp, **Adam**, learning rate y su
  scheduling, épocas y batch size. *Lab*: entrenar el mismo MLP variando
  optimizador y LR; curvas de pérdida.
- **4 · Generalización** — sesgo/varianza, overfitting, train/val/test,
  **dropout**, weight decay, early stopping, **data augmentation**, batch norm.
  *Lab*: provocar overfitting y arreglarlo.
- **5 · Datos y evaluación** — preprocesado y normalización, desbalanceo,
  **métricas** (accuracy, precision/recall, F1, matriz de confusión, ROC-AUC),
  validación cruzada. *Lab*: evaluar un clasificador más allá del accuracy.
- **8 · Atención y Transformers** — del cuello de botella de seq2seq a la
  atención; **self-attention** y multi-head; arquitectura Transformer; tokens y
  embeddings; intro a los LLMs. *Interactivo*: visualizar pesos de atención.
  *Lab*: fine-tuning de un modelo preentrenado (HuggingFace) para clasificar
  texto.

## 7. Roadmap por fases

- **Fase 1 — gana rápido**: integrar notebooks existentes como *Laboratorio*
  (Colab) en T1 y T4; crear la sesión **8 · Transformers** (teoría + interactivo
  + repaso). Máximo salto de completitud con el menor esfuerzo.
- **Fase 2 — fundamentos**: sesiones **3, 4, 5** (entrenamiento, generalización,
  evaluación), cada una con su lab.
- **Fase 3 — completar labs y subtemas**: labs nuevos para T2/T3/T5; ampliar CNN
  con transfer learning; subdividir decks largos en sub-sesiones.

Cada sesión nueva sigue el patrón ya probado: spec → deck `sesion-tN` →
interactivo `practica-tN` → repaso `repaso-tN` → tarjeta en la landing → verificación.

## 8. Preguntas abiertas (para validar con el profesor / temario oficial)

1. **ECTS y nº de sesiones objetivo** (¿6 ECTS? ¿cuántas semanas de teoría/lab?).
2. **Framework de laboratorio**: ¿Keras/TensorFlow (como los notebooks actuales)
   o PyTorch?
3. **Entrega de Python**: ¿Colab (recomendado), Pyodide, o descarga?
4. **Alcance de Transformers**: ¿solo intuición/atención o hasta fine-tuning con
   HuggingFace?
5. **Evaluación de la asignatura**: ¿los repasos deben alinearse con el examen
   real? ¿Añadimos ejercicios entregables?
6. **Prioridad**: ¿profundidad (más subtemas por tema) o amplitud (más temas)?

## 9. Fuera de alcance de este documento

- No se implementa nada aquí; es un plan para decidir dirección.
- No sustituye la validación de contenidos por el profesor/temario.
