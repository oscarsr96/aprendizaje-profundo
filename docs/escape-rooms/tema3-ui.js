// === RENDER: pantallas temáticas ===
function renderTitle(app) {
  app.innerHTML =
    '<div class="screen title-screen">' +
    '<div class="swords">&#127760; &#129694; &#128682;</div>' +
    "<h1>PROTOCOLO<br>SIMULACRO</h1>" +
    '<p class="subtitle">— Escape Room · Tema 3 · No supervisado y redes alternativas —</p>' +
    '<input type="text" id="nameInput" placeholder="Tu nombre y apellido" maxlength="40" autocomplete="off">' +
    '<button onclick="startGame()">&#9654; DESPERTAR</button>' +
    '<p class="instructions">Autoencoders · GAN · Redes RBF<br>Aprendizaje Profundo · CUNEF</p>' +
    "</div>";
  var inp = document.getElementById("nameInput");
  if (inp) {
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        startGame();
      }
    });
  }
}

function renderIntro(app) {
  app.innerHTML =
    '<div class="screen intro-screen">' +
    "<h2>&#9888; ESTO NO ES REAL</h2>" +
    '<p>Operador/a <span class="name-display">' +
    state.name +
    "</span>: el mundo que te rodea lo está generando SIMULACRO, una red generativa entrenada sin una sola etiqueta. Para salir tienes que demostrar que entiendes cómo aprende a imitar la realidad.</p>" +
    "<p>Para recuperar el control tendrás que atravesar <strong>15 pruebas</strong> sobre sus tres mecanismos: la <em>compresión</em> (aprendizaje no supervisado y autoencoders), la <em>generación</em> (GAN) y las <em>campanas</em> de base radial (RBF). Dos veces tendrás que elegir camino.</p>" +
    '<p class="warning">&#9829;&#9829;&#9829; Tienes 3 vidas. Cada respuesta incorrecta resta una. Si las pierdes todas, la simulación te reinicia.</p>' +
    "<p>Selecciona una opción o escribe tu respuesta y pulsa <strong>CONFIRMAR</strong> (o Enter). El botón <strong>REFERENCIA</strong> abre un resumen del tema: te orienta, pero no te da las respuestas.</p>" +
    '<p class="note">Las preguntas dependen de tu nombre y de la fecha: cada persona tiene su propia partida. Al terminar obtendrás un código de verificación para el profesor.</p>' +
    '<button onclick="startAdventure()">&#127760; ENTRAR EN LA SIMULACIÓN</button>' +
    "</div>";
}

function renderBranch(app, id) {
  var html = '<div class="screen branch-screen">';
  if (id === 1) {
    html +=
      "<h2>&#9888; LA SIMULACIÓN SE DIVIDE</h2>" +
      '<p class="narrative">Los espejos se rompen y aparecen dos pasillos. Ambos llevan al núcleo de agrupación. Elige uno.</p>' +
      '<div class="branch-options">' +
      '<div class="branch-card" onclick="chooseBranch(1,\'A\')"><div class="icon">&#128230;</div><h3>COMPRESOR LATENTE</h3><p>Atraviesa el embudo del autoencoder.</p></div>' +
      '<div class="branch-card" onclick="chooseBranch(1,\'B\')"><div class="icon">&#127917;</div><h3>FORJA DE FALSIFICACIONES</h3><p>Cuélate donde el generador fabrica la realidad.</p></div>' +
      "</div>";
  } else {
    html +=
      "<h2>&#9888; ÚLTIMA DIVISIÓN</h2>" +
      '<p class="narrative">Los puntos se han agrupado. Antes de la salida hay dos caminos, igual de engañosos.</p>' +
      '<div class="branch-options">' +
      '<div class="branch-card" onclick="chooseBranch(2,\'C\')"><div class="icon">&#128276;</div><h3>CAMPO DE CAMPANAS</h3><p>Cruza el terreno de las funciones de base radial.</p></div>' +
      '<div class="branch-card" onclick="chooseBranch(2,\'D\')"><div class="icon">&#9878;</div><h3>TRIBUNAL DEL DISCRIMINADOR</h3><p>Convence al juez de que eres real.</p></div>' +
      "</div>";
  }
  html += "</div>";
  app.innerHTML = html;
}

function renderGameOver(app) {
  app.innerHTML =
    '<div class="screen gameover-screen">' +
    '<div class="skull">&#128128;</div>' +
    "<h1>SIMULACIÓN REINICIADA</h1>" +
    "<p>SIMULACRO ha detectado demasiados errores y ha borrado tu partida.<br>Repasa el Tema 3 y vuelve a intentarlo.</p>" +
    '<button onclick="restartGame()">&#8635; REINTENTAR</button>' +
    "</div>";
}

function renderVictory(app) {
  var code = getCompletionCode();
  var phrase = PHRASES[getFinalPhraseIndex()] || PHRASES[0];
  var routes = { A: "Compresor", B: "Forja", C: "Campanas", D: "Tribunal" };
  app.innerHTML =
    '<div class="screen victory-screen">' +
    '<div class="trophy">&#127942;</div>' +
    "<h1>HAS DESPERTADO</h1>" +
    '<p class="subtitle" style="font-size:.7em;margin-top:10px">Has salido de la simulación: esto sí es real.</p>' +
    '<div class="phrase-box"><p class="phrase-text">&laquo; ' +
    phrase +
    " &raquo;</p></div>" +
    '<div class="completion-info">' +
    '<p>Operador/a: <span class="name-display">' +
    state.name +
    "</span></p>" +
    "<p>Ruta: " +
    (routes[state.branch1] || "?") +
    " → " +
    (routes[state.branch2] || "?") +
    " · Vidas: " +
    Math.min(state.lives, 3) +
    "/3</p>" +
    '<p style="margin-top:15px">CÓDIGO DE VERIFICACIÓN:</p>' +
    '<div class="code-box">' +
    code +
    "</div>" +
    '<p class="instructions">Copia este código y la frase final y entrégaselos al profesor.</p>' +
    "</div>" +
    '<button onclick="restartGame()">&#8635; NUEVA PARTIDA</button>' +
    "</div>";
}

// === ESCENAS 3D (estética terminal / IA) ===
var GREEN = 0x00ff41,
  DGREEN = 0x0d3d1a,
  CYAN = 0x22d3ee;
function _baseScene(name, fogDensity) {
  clearScene();
  tjs.currentScene = name;
  tjs.scene.fog = new THREE.FogExp2(0x0a0f0a, fogDensity || 0.05);
  addLight("ambient", 0x335533, 0.5);
}
function _rain(count, color) {
  // «Lluvia de código»: puntos que caen
  var geo = new THREE.BufferGeometry();
  var pos = new Float32Array(count * 3);
  for (var i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = Math.random() * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  var mat = new THREE.PointsMaterial({
    color: color || GREEN,
    size: 0.07,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  var pts = new THREE.Points(geo, mat);
  tjs.scene.add(pts);
  tjs.sceneObjects.push(pts);
  tjs.animCallbacks.push(function () {
    var p = pts.geometry.attributes.position.array;
    for (var j = 0; j < count; j++) {
      p[j * 3 + 1] -= 0.04 + (j % 5) * 0.01;
      if (p[j * 3 + 1] < 0) p[j * 3 + 1] = 10;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });
  return pts;
}
function _glowMat(color, intensity) {
  return new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: intensity || 0.6,
    roughness: 0.4,
    metalness: 0.3,
  });
}
function _wireMat(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
    transparent: true,
    opacity: opacity || 0.5,
  });
}
function _racks(n, z0) {
  var rackMat = new THREE.MeshStandardMaterial({
    color: 0x101a12,
    roughness: 0.7,
    metalness: 0.5,
  });
  var ledMat = _glowMat(GREEN, 1.2);
  for (var i = 0; i < n; i++) {
    var side = (i % 2) * 2 - 1,
      z = z0 - Math.floor(i / 2) * 2.6;
    addObj(new THREE.BoxGeometry(1.2, 3.2, 1.6), rackMat, [side * 3.2, 1.6, z]);
    for (var k = 0; k < 6; k++)
      addObj(new THREE.BoxGeometry(0.05, 0.05, 1.2), ledMat, [
        side * 2.58,
        0.5 + k * 0.45,
        z,
      ]);
  }
}
function _cam(x, y, z, lx, ly, lz) {
  tjs.camera.position.set(x, y, z);
  tjs.camera.lookAt(lx, ly, lz);
}

function buildTitleScene() {
  if (!tjs) return;
  _baseScene("title", 0.04);
  var core = addObj(
    new THREE.IcosahedronGeometry(1.4, 1),
    _wireMat(GREEN, 0.5),
    [0, 2.2, -3],
  );
  var inner = addObj(
    new THREE.SphereGeometry(0.45, 24, 24), _glowMat(GREEN, 0.5), [0, 2.2, -3],
  );
  addLight("point", GREEN, 3, [0, 2.2, 0], 9);
  _rain(500);
  _cam(0, 2.4, 8, 0, 2, 0);
  tjs.animCallbacks.push(function (t) {
    core.rotation.y = t * 0.4;
    core.rotation.x = t * 0.2;
    inner.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
    tjs.camera.position.x = Math.sin(t * 0.15) * 2;
    tjs.camera.lookAt(0, 2, 0);
  });
}
function buildEntradaScene() {
  if (!tjs) return;
  _baseScene("entrada", 0.06);
  addGround(0x050805);
  _racks(10, 2);
  var term = addObj(
    new THREE.BoxGeometry(2.2, 1.3, 0.1),
    _glowMat(GREEN, 0.5),
    [0, 1.8, -8],
  );
  addLight("point", GREEN, 2, [0, 2.5, -6], 8);
  _rain(250);
  _cam(0, 2, 7, 0, 1.6, -6);
  tjs.animCallbacks.push(function (t) {
    tjs.camera.position.z = 7 + Math.sin(t * 0.3) * 0.6;
    term.material.emissiveIntensity = 0.4 + Math.abs(Math.sin(t * 3)) * 0.4;
  });
}
function buildArtefactosScene() {
  // Firewall: muro de bloques
  if (!tjs) return;
  _baseScene("firewall", 0.05);
  addGround(0x050805);
  var blocks = [];
  for (var x = -4; x <= 4; x++)
    for (var y = 0; y < 5; y++) {
      var b = addObj(
        new THREE.BoxGeometry(0.9, 0.9, 0.3),
        _glowMat(y % 2 ? 0x06361a : 0x084a22, 0.3),
        [x, 0.5 + y, -3],
      );
      blocks.push(b);
    }
  addLight("point", 0xff3b3b, 1.5, [0, 3, 0], 8);
  _rain(200);
  _cam(0, 2.5, 6, 0, 2.3, -3);
  tjs.animCallbacks.push(function (t) {
    for (var i = 0; i < blocks.length; i++)
      blocks[i].material.emissiveIntensity =
        0.15 + 0.3 * Math.abs(Math.sin(t * 2 + i * 0.37));
  });
}
function buildCriptaScene() {
  // Rama A · visión: rejilla de píxeles y un filtro que se desliza
  if (!tjs) return;
  _baseScene("vision", 0.05);
  var px = [];
  for (var i = 0; i < 8; i++)
    for (var j = 0; j < 8; j++) {
      var v = Math.random();
      px.push(
        addObj(
          new THREE.BoxGeometry(0.45, 0.45, 0.1),
          _glowMat(new THREE.Color(0, 0.25 + v * 0.75, 0.2), 0.4),
          [-1.75 + i * 0.5, 0.6 + j * 0.5, -2],
        ),
      );
    }
  var filt = addObj(
    new THREE.BoxGeometry(1.5, 1.5, 0.12),
    _wireMat(CYAN, 0.9),
    [-1.25, 1.1, -1.8],
  );
  var eye = addObj(
    new THREE.SphereGeometry(0.5, 24, 24),
    _glowMat(CYAN, 1.2),
    [0, 5.2, -2],
  );
  addLight("point", CYAN, 2, [0, 3, 1], 8);
  _cam(0, 2.4, 5.5, 0, 2.3, -2);
  tjs.animCallbacks.push(function (t) {
    var k = Math.floor(t * 1.5) % 36,
      cx = k % 6,
      cy = Math.floor(k / 6);
    filt.position.x = -1.25 + cx * 0.5;
    filt.position.y = 1.1 + cy * 0.5;
    eye.scale.setScalar(1 + Math.sin(t * 3) * 0.1);
  });
}
function buildBibliotecaScene() {
  // Rama B · memoria: celdas LSTM en fila con puertas
  if (!tjs) return;
  _baseScene("memoria", 0.05);
  addGround(0x050805);
  var cells = [];
  for (var i = 0; i < 6; i++) {
    var c = addObj(new THREE.BoxGeometry(1, 1, 1), _glowMat(0x0d7a30, 0.5), [
      -5 + i * 2,
      1.5,
      -2,
    ]);
    cells.push(c);
    if (i < 5)
      addObj(
        new THREE.CylinderGeometry(0.06, 0.06, 1, 8),
        _glowMat(GREEN, 1),
        [-4 + i * 2, 1.5, -2],
        [0, 0, Math.PI / 2],
      );
  }
  var belt = addObj(
    new THREE.CylinderGeometry(0.05, 0.05, 12, 8),
    _glowMat(CYAN, 1.2),
    [0, 2.4, -2],
    [0, 0, Math.PI / 2],
  );
  addLight("point", GREEN, 2, [0, 3, 1], 9);
  _rain(150);
  _cam(0, 2.6, 6, 0, 1.8, -2);
  tjs.animCallbacks.push(function (t) {
    for (var i = 0; i < cells.length; i++) {
      var s = 0.5 + 0.5 * Math.sin(t * 2 - i * 0.8);
      cells[i].material.emissiveIntensity = 0.2 + s * 0.8;
      cells[i].rotation.y = t * 0.3 + i;
    }
    belt.material.emissiveIntensity = 0.8 + Math.sin(t * 4) * 0.3;
  });
}
function buildPasajeScene() {
  // Base de datos central: cilindros apilados
  if (!tjs) return;
  _baseScene("db", 0.05);
  addGround(0x050805);
  var disks = [];
  for (var k = 0; k < 5; k++)
    disks.push(
      addObj(
        new THREE.CylinderGeometry(1.4, 1.4, 0.45, 32),
        _glowMat(0x0a5c25, 0.5),
        [0, 0.4 + k * 0.6, -2],
      ),
    );
  var ring = addObj(
    new THREE.TorusGeometry(2.4, 0.04, 8, 64),
    _glowMat(GREEN, 1.2),
    [0, 1.6, -2],
    [Math.PI / 2, 0, 0],
  );
  addLight("point", GREEN, 2.5, [0, 4, 0], 9);
  _rain(300);
  _cam(0, 3, 6.5, 0, 1.6, -2);
  tjs.animCallbacks.push(function (t) {
    ring.position.y = 0.4 + (Math.sin(t) + 1) * 1.3;
    for (var i = 0; i < disks.length; i++)
      disks[i].material.emissiveIntensity =
        0.3 + 0.5 * Math.abs(Math.sin(t * 2 + i));
  });
}
function buildFuegoScene() {
  // Rama C · nodo encriptado: candado / espiral de tokens
  if (!tjs) return;
  _baseScene("cifrado", 0.05);
  var knot = addObj(
    new THREE.TorusKnotGeometry(1, 0.28, 120, 12),
    _glowMat(0xd97706, 0.7),
    [0, 2.2, -2],
  );
  var toks = [];
  for (var i = 0; i < 30; i++)
    toks.push(
      addObj(
        new THREE.BoxGeometry(0.18, 0.18, 0.18),
        _glowMat(GREEN, 1),
        [0, 0, 0],
      ),
    );
  addLight("point", 0xfbbf24, 2.5, [0, 3, 1], 9);
  _cam(0, 2.4, 6.5, 0, 2.2, -2);
  tjs.animCallbacks.push(function (t) {
    knot.rotation.y = t * 0.5;
    knot.rotation.x = t * 0.25;
    for (var i = 0; i < toks.length; i++) {
      var a = t * 0.8 + i * 0.21;
      toks[i].position.set(
        Math.cos(a) * 2.6,
        0.4 + (i / toks.length) * 3.6,
        -2 + Math.sin(a) * 2.6,
      );
    }
  });
}
function buildAguaScene() {
  // Rama D · matriz de atención: nodos conectados todos con todos
  if (!tjs) return;
  _baseScene("atencion", 0.04);
  var n = 8,
    nodes = [],
    P = [];
  for (var i = 0; i < n; i++) {
    var a = (i / n) * Math.PI * 2,
      p = new THREE.Vector3(
        Math.cos(a) * 2.5,
        2.2 + Math.sin(a * 2) * 0.6,
        -2 + Math.sin(a) * 2.5,
      );
    P.push(p);
    nodes.push(
      addObj(new THREE.SphereGeometry(0.18, 16, 16), _glowMat(CYAN, 1.2), [
        p.x,
        p.y,
        p.z,
      ]),
    );
  }
  var lines = [];
  for (var x = 0; x < n; x++)
    for (var y = x + 1; y < n; y++) {
      var g = new THREE.BufferGeometry().setFromPoints([P[x], P[y]]);
      var l = new THREE.Line(
        g,
        new THREE.LineBasicMaterial({
          color: GREEN,
          transparent: true,
          opacity: 0.3,
        }),
      );
      tjs.scene.add(l);
      tjs.sceneObjects.push(l);
      lines.push(l);
    }
  addLight("point", CYAN, 2, [0, 3, 1], 9);
  _rain(150, CYAN);
  _cam(0, 3, 6.5, 0, 2.2, -2);
  tjs.animCallbacks.push(function (t) {
    for (var i = 0; i < lines.length; i++)
      lines[i].material.opacity =
        0.08 + 0.6 * Math.pow(Math.abs(Math.sin(t * 0.9 + i * 0.7)), 4);
    tjs.camera.position.x = Math.sin(t * 0.2) * 1.5;
    tjs.camera.lookAt(0, 2.2, -2);
  });
}
function buildFinalScene() {
  // Root access: núcleo de NEXUS
  if (!tjs) return;
  _baseScene("root", 0.04);
  addGround(0x050805);
  var core = addObj(
    new THREE.OctahedronGeometry(1.3, 0),
    _glowMat(0xff3b3b, 0.9),
    [0, 2.4, -2],
  );
  var shell = addObj(
    new THREE.IcosahedronGeometry(2.1, 1),
    _wireMat(GREEN, 0.5),
    [0, 2.4, -2],
  );
  addLight("point", 0xff3b3b, 3, [0, 2.4, -0.5], 8);
  _rain(400);
  _cam(0, 2.6, 6, 0, 2.3, -2);
  tjs.animCallbacks.push(function (t) {
    core.rotation.y = t;
    shell.rotation.y = -t * 0.3;
    shell.rotation.x = t * 0.2;
    core.material.emissiveIntensity = 0.6 + Math.abs(Math.sin(t * 3)) * 0.6;
  });
}
function buildVictoryScene() {
  if (!tjs) return;
  _baseScene("victory", 0.03);
  var core = addObj(
    new THREE.IcosahedronGeometry(1.4, 1),
    _glowMat(GREEN, 1.3),
    [0, 2.4, -1],
  );
  addLight("point", GREEN, 3, [0, 3, 1], 10);
  _rain(800, 0xffd700);
  _cam(0, 2.6, 7, 0, 2.3, -1);
  tjs.animCallbacks.push(function (t) {
    core.rotation.y = t * 0.8;
    core.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
  });
}
function buildGameOverScene() {
  if (!tjs) return;
  _baseScene("gameover", 0.07);
  addLight("point", 0xff2222, 2, [0, 3, 1], 8);
  var core = addObj(
    new THREE.IcosahedronGeometry(1.4, 1),
    _wireMat(0xff2222, 0.7),
    [0, 2.2, -1],
  );
  _rain(500, 0xff2222);
  _cam(0, 2.4, 7, 0, 2, -1);
  tjs.animCallbacks.push(function (t) {
    core.rotation.y = t * 0.2;
  });
}
function buildBranchScene() {
  if (!tjs) return;
  _baseScene("branch", 0.05);
  addGround(0x050805);
  addObj(
    new THREE.BoxGeometry(0.4, 0.05, 10),
    _glowMat(GREEN, 1),
    [-1.6, 0.03, -3],
    [0, 0.35, 0],
  );
  addObj(
    new THREE.BoxGeometry(0.4, 0.05, 10),
    _glowMat(CYAN, 1),
    [1.6, 0.03, -3],
    [0, -0.35, 0],
  );
  var l = addObj(
    new THREE.SphereGeometry(0.4, 16, 16),
    _glowMat(GREEN, 1.3),
    [-3.2, 1.5, -7],
  );
  var r = addObj(
    new THREE.SphereGeometry(0.4, 16, 16),
    _glowMat(CYAN, 1.3),
    [3.2, 1.5, -7],
  );
  addLight("point", GREEN, 2, [-3, 2, -6], 8);
  addLight("point", CYAN, 2, [3, 2, -6], 8);
  _rain(250);
  _cam(0, 2.2, 5, 0, 1, -5);
  tjs.animCallbacks.push(function (t) {
    l.position.y = 1.5 + Math.sin(t * 2) * 0.2;
    r.position.y = 1.5 + Math.cos(t * 2) * 0.2;
  });
}

// === UPDATE SCENE: según pantalla y paso ===
function updateThreeScene() {
  if (!tjs || !threeEnabled) return;
  var target;
  if (state.screen === "title" || state.screen === "intro") target = "title";
  else if (state.screen === "gameover") target = "gameover";
  else {
    var s = state.step;
    if (s >= 17) target = "victory";
    else if (s === 6 || s === 11) target = "branch";
    else if (s <= 2) target = "entrada";
    else if (s <= 5) target = "firewall";
    else if (s <= 8) target = state.branch1 === "B" ? "memoria" : "vision";
    else if (s <= 10) target = "db";
    else if (s <= 13) target = state.branch2 === "D" ? "atencion" : "cifrado";
    else target = "root";
  }
  if (tjs.currentScene === target) return;
  var map = {
    title: buildTitleScene,
    entrada: buildEntradaScene,
    firewall: buildArtefactosScene,
    vision: buildLatenteScene,
    memoria: buildForjaScene,
    db: buildClustersScene,
    cifrado: buildCampanasScene,
    atencion: buildTribunalScene,
    root: buildFinalScene,
    victory: buildVictoryScene,
    gameover: buildGameOverScene,
    branch: buildBranchScene,
  };
  map[target]();
  var app = document.getElementById("app");
  if (app) {
    var glow = {
      vision: "rgba(34,211,238,.25)",
      atencion: "rgba(34,211,238,.25)",
      cifrado: "rgba(217,119,6,.25)",
      root: "rgba(255,59,59,.25)",
      gameover: "rgba(255,34,34,.3)",
      victory: "rgba(255,215,0,.25)",
    };
    app.style.boxShadow = "0 0 60px " + (glow[target] || "rgba(0,255,65,.18)");
  }
}

// === ESCENAS PROPIAS DEL TEMA 3 ===
function buildLatenteScene() { // Embudo del autoencoder: capas que se estrechan y se vuelven a abrir
  if (!tjs) return; _baseScene('vision', 0.05);
  var sizes = [3.2, 2.2, 1.2, 0.5, 1.2, 2.2, 3.2], planes = [];
  for (var i = 0; i < sizes.length; i++) {
    var col = i === 3 ? 0xffd24a : GREEN;
    planes.push(addObj(new THREE.BoxGeometry(0.08, sizes[i], sizes[i]), _wireMat(col, i === 3 ? 0.95 : 0.55), [-4.5 + i * 1.5, 2.2, -2]));
  }
  var dots = [];
  for (var k = 0; k < 40; k++) dots.push(addObj(new THREE.SphereGeometry(0.06, 8, 8), _glowMat(CYAN, 1.2), [0, 0, 0]));
  addLight('point', GREEN, 2, [0, 3, 1], 9);
  _cam(0, 2.6, 7, 0, 2.2, -2);
  tjs.animCallbacks.push(function(t) {
    for (var k = 0; k < dots.length; k++) {
      var u = ((t * 0.25 + k / dots.length) % 1), x = -4.5 + u * 9, w = 1.6 * Math.min(1, Math.abs(x) / 4.5 + 0.12);
      dots[k].position.set(x, 2.2 + Math.sin(k * 7.1) * w, -2 + Math.cos(k * 3.3) * w);
    }
    planes[3].rotation.x = t;
  });
}
function buildForjaScene() { // Generador (cubo) lanza muestras hacia el discriminador (ojo)
  if (!tjs) return; _baseScene('memoria', 0.05);
  addGround(0x050805);
  var gen = addObj(new THREE.BoxGeometry(1.2, 1.2, 1.2), _glowMat(0xd97706, 0.8), [-3.2, 1.4, -2]);
  var disc = addObj(new THREE.SphereGeometry(0.8, 24, 24), _glowMat(CYAN, 0.9), [3.2, 1.6, -2]);
  var shots = [];
  for (var k = 0; k < 14; k++) shots.push(addObj(new THREE.TetrahedronGeometry(0.16), _glowMat(k % 2 ? GREEN : 0xffd24a, 1.2), [0, 0, 0]));
  addLight('point', 0xfbbf24, 2, [-3, 3, 0], 7); addLight('point', CYAN, 2, [3, 3, 0], 7);
  _rain(150);
  _cam(0, 2.5, 6.5, 0, 1.6, -2);
  tjs.animCallbacks.push(function(t) {
    gen.rotation.y = t * 0.8; gen.rotation.x = t * 0.4;
    disc.scale.setScalar(1 + Math.sin(t * 3) * 0.06);
    for (var k = 0; k < shots.length; k++) { var u = (t * 0.35 + k / shots.length) % 1; shots[k].position.set(-3.2 + u * 6.4, 1.5 + Math.sin(u * Math.PI) * 1.4, -2 + Math.sin(k) * 0.5); shots[k].rotation.y = t * 3; }
  });
}
function buildClustersScene() { // k-means: nubes de puntos que orbitan tres centros
  if (!tjs) return; _baseScene('db', 0.05);
  var centers = [[-2.6, 2.6, -2], [2.4, 3.0, -2.5], [0, 1.2, -1]], cols = [GREEN, CYAN, 0xffd24a], pts = [];
  for (var c = 0; c < 3; c++) {
    addObj(new THREE.OctahedronGeometry(0.28, 0), _glowMat(cols[c], 1.5), centers[c]);
    for (var k = 0; k < 26; k++) pts.push({ m: addObj(new THREE.SphereGeometry(0.07, 8, 8), _glowMat(cols[c], 0.8), [0, 0, 0]), c: c, r: 0.5 + Math.random() * 0.9, a: Math.random() * 6.28, b: Math.random() * 6.28 });
  }
  addLight('point', GREEN, 2, [0, 4, 1], 10);
  _rain(150);
  _cam(0, 2.6, 7, 0, 2.2, -2);
  tjs.animCallbacks.push(function(t) {
    for (var i = 0; i < pts.length; i++) { var p = pts[i], C = centers[p.c], a = p.a + t * 0.6;
      p.m.position.set(C[0] + Math.cos(a) * p.r, C[1] + Math.sin(p.b + t * 0.4) * p.r * 0.6, C[2] + Math.sin(a) * p.r); }
  });
}
function buildCampanasScene() { // Campo de campanas gaussianas que suben y bajan
  if (!tjs) return; _baseScene('cifrado', 0.045);
  var N = 22, dots = [], bumps = [[-2, -1.5], [1.8, -2.5], [0.3, 0.8]];
  for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) dots.push(addObj(new THREE.SphereGeometry(0.05, 6, 6), _glowMat(GREEN, 0.9), [-5 + i * 10 / (N - 1), 0, -6 + j * 7 / (N - 1)]));
  addLight('point', 0xfbbf24, 2, [0, 4, 0], 10);
  _cam(0, 4, 5.5, 0, 0.6, -2.5);
  tjs.animCallbacks.push(function(t) {
    for (var k = 0; k < dots.length; k++) { var p = dots[k].position, h = 0;
      for (var b = 0; b < bumps.length; b++) { var dx = p.x - bumps[b][0], dz = p.z - bumps[b][1], s = 0.9 + 0.4 * Math.sin(t * 0.8 + b * 2);
        h += (1.6 + Math.sin(t + b)) * 0.8 * Math.exp(-(dx * dx + dz * dz) / (2 * s * s)); }
      p.y = h; dots[k].material.emissiveIntensity = 0.4 + h * 0.6; }
  });
}
function buildTribunalScene() { // El discriminador como juez: un ojo sobre una columna y dos muestras
  if (!tjs) return; _baseScene('atencion', 0.05);
  addGround(0x050805);
  var pillarMat = new THREE.MeshStandardMaterial({ color: 0x102016, roughness: 0.6, metalness: 0.5 });
  addObj(new THREE.CylinderGeometry(0.5, 0.7, 3.2, 16), pillarMat, [0, 1.6, -3]);
  var eye = addObj(new THREE.SphereGeometry(0.6, 24, 24), _glowMat(CYAN, 1.2), [0, 3.8, -3]);
  var ring = addObj(new THREE.TorusGeometry(1, 0.04, 8, 48), _glowMat(CYAN, 1), [0, 3.8, -3]);
  var real = addObj(new THREE.BoxGeometry(0.8, 0.8, 0.8), _glowMat(GREEN, 0.8), [-2.4, 0.6, -1.5]);
  var fake = addObj(new THREE.BoxGeometry(0.8, 0.8, 0.8), _glowMat(0xff3b3b, 0.8), [2.4, 0.6, -1.5]);
  addLight('point', CYAN, 2.5, [0, 4, -1], 9);
  _rain(150, CYAN);
  _cam(0, 2.6, 6.5, 0, 2.2, -2.5);
  tjs.animCallbacks.push(function(t) {
    eye.position.x = Math.sin(t * 0.9) * 0.4; ring.rotation.y = t; ring.position.x = eye.position.x;
    real.rotation.y = t; fake.rotation.y = -t;
    var w = 0.5 + 0.5 * Math.sin(t * 1.5); real.material.emissiveIntensity = 0.3 + w; fake.material.emissiveIntensity = 1.3 - w;
  });
}
