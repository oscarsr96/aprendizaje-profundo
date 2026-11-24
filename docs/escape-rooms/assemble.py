import re
SK='/Users/oscarsanchezrueda/.claude/skills/generar-escape-room-quiz/'
md=open(SK+'plantilla-referencia-quiz.md').read()
css_blocks=re.findall(r'```css\n(.*?)```',md,re.S)
css='\n'.join(css_blocks)
css=re.sub(r':root\{[^}]*\}',':root{--bg:#0a0f0a;--panel:rgba(13,26,13,.92);--text:#80d4a0;--accent:#00ff41;--success:#4ade80;--error:#ef4444;--border:#1f5f2f;--code-bg:rgba(5,12,5,.92);--code-text:#00ff41}',css,1)
for a,b in [('rgba(255,107,53','rgba(0,255,65'),('#ff8c5a','#5cff85'),('rgba(61,42,26','rgba(10,40,18'),('rgba(45,31,20','rgba(6,24,10')]:
    css=css.replace(a,b)
css=css.replace('button{font-family:\'Press Start 2P\',monospace;background:var(--accent);color:#fff','button{font-family:\'Press Start 2P\',monospace;background:var(--accent);color:#031a08')
css=css.replace('.schema-btn{font-size:.7em;padding:10px 18px;background:var(--accent);border:3px solid #5cff85;color:#fff','.schema-btn{font-size:.7em;padding:10px 18px;background:var(--accent);border:3px solid #5cff85;color:#031a08')
css=css.replace('.prof-q-btn.active{background:#7c3aed;border-color:#a78bfa;color:#fff}','.prof-q-btn.active{background:#7c3aed;border-color:#a78bfa;color:#fff}')
resp='''
/* === RESPONSIVE + SAFARI === */
button{-webkit-tap-highlight-color:transparent}
#schemaPanel{-webkit-overflow-scrolling:touch}
#toggle3d{top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));touch-action:manipulation;min-height:44px}
#app .screen:not(.title-screen){background:rgba(4,10,5,.88);border:2px solid var(--border);border-radius:8px;padding:20px 24px;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
.title-screen{background:radial-gradient(ellipse at center,rgba(4,10,5,.75) 0%,rgba(4,10,5,.35) 60%,transparent 80%);padding-bottom:30px}
#profPanel .prof-q-btn{color:var(--text)}
.title-screen h1{text-shadow:0 0 20px rgba(0,255,65,.6),0 0 60px rgba(0,255,65,.25)}
@media (max-width:900px){
  #wrapper{flex-direction:column}
  #schemaPanel{position:static;width:100%;max-height:50vh}
  .title-screen h1{font-size:1.7em}
  .room-name{font-size:.9em}
  .narrative,.task-box p{font-size:.65em}
  .branch-card{width:calc(50% - 10px)}
  .top-bar{flex-wrap:wrap;gap:8px}
}
@media (max-width:600px){
  body{padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left))}
  input[type="text"],textarea,.answer-input{font-size:16px}
  .nav-row{flex-direction:column}
  .branch-card{width:100%}
  #three-canvas{touch-action:none}
  .title-screen h1{font-size:1.1em}
  .title-screen .subtitle{font-size:.65em}
  .title-screen .swords{font-size:2em}
  .room-name{font-size:.75em}
  .victory-screen h1,.gameover-screen h1{font-size:1.1em}
  .hearts{font-size:1.1em}
  .progress,.schema-btn{font-size:.55em}
  .tf-options{gap:10px}
  .tf-card{padding:15px}
  .code-box{font-size:12px;letter-spacing:1px;word-break:break-all}
  #toggle3d{font-size:.42em;top:auto;bottom:max(10px,env(safe-area-inset-bottom))}
  #app .screen:not(.title-screen){padding:14px 12px}
}
'''
fixed=open(SK+'codigo-fijo-quiz.js').read()
salt=','.join(str(ord(c)) for c in 'NEXUS_T4_AP26')
fixed=fixed.replace('const _SALT = [81,117,105,122,95,69,82,95,50,48,50,54]','const _SALT = ['+salt+']')
assert "'QER-'" in fixed; fixed=fixed.replace("'QER-'","'AIA-'")
fixed=fixed.replace('scene.fog = new THREE.FogExp2(0x1a0f0a, 0.035);','scene.fog = new THREE.FogExp2(0x0a0f0a, 0.035);')
a='  shared4 = _pickByTier(available, 3, 3, rng);\n}'
assert a in fixed; fixed=fixed.replace(a,'  shared4 = _pickByTier(available, 3, 3, rng);\n  _assignRooms();\n}')
import sys
BANK=sys.argv[1] if len(sys.argv)>1 else 'tema4-preguntas.js'; UI=sys.argv[2] if len(sys.argv)>2 else 'tema4-ui.js'; OUTF=sys.argv[3] if len(sys.argv)>3 else 'escape-room-tema4.html'; SALTW=sys.argv[4] if len(sys.argv)>4 else 'NEXUS_T4_AP26'; PFX=sys.argv[5] if len(sys.argv)>5 else 'AIA'; TITLE=sys.argv[6] if len(sys.argv)>6 else 'Protocolo NEXUS · Escape Room Tema 4'; DESC=sys.argv[7] if len(sys.argv)>7 else 'Escape room del Tema 4 de Aprendizaje Profundo (CUNEF): redes convolucionales, RNN/LSTM y atención y Transformers.'
bank=open(BANK).read(); ui=open(UI).read()
html='''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Protocolo NEXUS · Escape Room Tema 4</title>
<meta name="description" content="Escape room del Tema 4 de Aprendizaje Profundo (CUNEF): redes convolucionales, RNN/LSTM y atención y Transformers.">
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<style>
'''+css+resp+'''
</style>
</head>
<body>
<canvas id="three-canvas"></canvas>
<button id="toggle3d" onclick="toggle3D()">3D: ON</button>
<div id="wrapper">
  <div id="app">Cargando...</div>
  <div id="schemaPanel">
    <h2>&#128190; ARCHIVO DE REFERENCIA</h2>
    <pre id="schemaContent"></pre>
    <button class="close-btn" onclick="toggleReference()">CERRAR REFERENCIA</button>
  </div>
</div>
<div id="profPanel"></div>
<script>
'''+fixed+'\n\n'+bank+'\n\n'+ui+'''
</script>
</body>
</html>
'''
html=html.replace('const _SALT = ['+salt+']','const _SALT = ['+','.join(str(ord(c)) for c in SALTW)+']').replace("'AIA-'","'"+PFX+"-'").replace('<title>Protocolo NEXUS · Escape Room Tema 4</title>','<title>'+TITLE+'</title>').replace('content="Escape room del Tema 4 de Aprendizaje Profundo (CUNEF): redes convolucionales, RNN/LSTM y atención y Transformers."','content="'+DESC+'"')
open('/Users/oscarsanchezrueda/Repos/aprendizaje_profundo/'+OUTF,'w').write(html)
print(len(html))
