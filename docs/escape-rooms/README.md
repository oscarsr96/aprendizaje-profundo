# Escape rooms (fuentes)

Los juegos publicados son `escape-room-tema3.html` y `escape-room-tema4.html` (raíz del repo).
Se generan con el skill `generar-escape-room-quiz` (código fijo en `~/.claude/skills/generar-escape-room-quiz/`)
más estas fuentes:

- `temaN-preguntas.js`: material de referencia, banco de 48 preguntas, salas y frases finales.
- `temaN-ui.js`: pantallas (título, intro, bifurcaciones, victoria) y escenas 3D.
- `assemble.py`: une plantilla + código fijo + fuentes en un único HTML.

Regenerar (desde esta carpeta):

```bash
python3 assemble.py                     # Tema 4
python3 assemble.py tema3-preguntas.js tema3-ui.js escape-room-tema3.html \
  "SIMULACRO_T3_AP26" MTX "Protocolo SIMULACRO · Escape Room Tema 3" \
  "Escape room del Tema 3 de Aprendizaje Profundo (CUNEF): aprendizaje no supervisado y autoencoders, GAN y redes RBF."
```

Modo profesor: escribir `PROFE` en la pantalla de título.
