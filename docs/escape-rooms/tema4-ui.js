// === RENDER: pantallas temáticas ===
function renderTitle(app) {
  app.innerHTML =
    '<div class="screen title-screen">' +
    '<div class="swords">&#129302; &#9889; &#128187;</div>' +
    "<h1>PROTOCOLO<br>NEXUS</h1>" +
    '<p class="subtitle">— Escape Room · Tema 4 · Arquitecturas profundas —</p>' +
    '<input type="text" id="nameInput" placeholder="Tu nombre y apellido" maxlength="40" autocomplete="off">' +
    '<button onclick="startGame()">&#9654; CONECTAR</button>' +
    '<p class="instructions">CNN · RNN / LSTM · Atención y Transformers<br>Aprendizaje Profundo · CUNEF</p>' +
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
    "<h2>&#9888; ALERTA DE SEGURIDAD</h2>" +
    '<p>Operador/a <span class="name-display">' +
    state.name +
    "</span>: NEXUS, la IA experimental del laboratorio, se ha rebelado. Ha cerrado todas las puertas y solo obedece a quien demuestre que entiende cómo funciona por dentro.</p>" +
    "<p>Para recuperar el control tendrás que atravesar <strong>15 pruebas</strong> sobre sus tres sistemas: la <em>visión</em> (redes convolucionales), la <em>memoria</em> (RNN y LSTM) y la <em>atención</em> (Transformers). Dos veces tendrás que elegir camino.</p>" +
    '<p class="warning">&#9829;&#9829;&#9829; Tienes 3 vidas. Cada respuesta incorrecta resta una. Si las pierdes todas, NEXUS te expulsa.</p>' +
    "<p>Selecciona una opción o escribe tu respuesta y pulsa <strong>CONFIRMAR</strong> (o Enter). El botón <strong>REFERENCIA</strong> abre un resumen del tema: te orienta, pero no te da las respuestas.</p>" +
    '<p class="note">Las preguntas dependen de tu nombre y de la fecha: cada persona tiene su propia partida. Al terminar obtendrás un código de verificación para el profesor.</p>' +
    '<button onclick="startAdventure()">&#9889; INICIAR INFILTRACIÓN</button>' +
    "</div>";
}

function renderBranch(app, id) {
  var html = '<div class="screen branch-screen">';
  if (id === 1) {
    html +=
      "<h2>&#9888; BIFURCACIÓN EN LA RED</h2>" +
      '<p class="narrative">El cortafuegos ha caído. Dos subsistemas protegen la base de datos central. Elige por dónde entrar.</p>' +
      '<div class="branch-options">' +
      '<div class="branch-card" onclick="chooseBranch(1,\'A\')"><div class="icon">&#128065;</div><h3>NÚCLEO DE VISIÓN</h3><p>Infíltrate por las capas convolucionales de NEXUS.</p></div>' +
      '<div class="branch-card" onclick="chooseBranch(1,\'B\')"><div class="icon">&#129504;</div><h3>BANCO DE MEMORIA</h3><p>Cuélate entre las celdas LSTM y sus puertas.</p></div>' +
      "</div>";
  } else {
    html +=
      "<h2>&#9888; ÚLTIMA BIFURCACIÓN</h2>" +
      '<p class="narrative">Ya tienes acceso a la base de datos. Antes del núcleo hay dos rutas, igual de peligrosas.</p>' +
      '<div class="branch-options">' +
      '<div class="branch-card" onclick="chooseBranch(2,\'C\')"><div class="icon">&#128272;</div><h3>NODO ENCRIPTADO</h3><p>Rompe las claves de cifrado de NEXUS.</p></div>' +
      '<div class="branch-card" onclick="chooseBranch(2,\'D\')"><div class="icon">&#128225;</div><h3>MATRIZ DE ATENCIÓN</h3><p>Atraviesa la red donde cada nodo mira a todos los demás.</p></div>' +
      "</div>";
  }
  html += "</div>";
  app.innerHTML = html;
}

function renderGameOver(app) {
  app.innerHTML =
    '<div class="screen gameover-screen">' +
    '<div class="skull">&#128128;</div>' +
    "<h1>ACCESO DENEGADO</h1>" +
    "<p>NEXUS ha detectado demasiados errores y te ha expulsado del sistema.<br>Repasa el Tema 4 y vuelve a intentarlo.</p>" +
    '<button onclick="restartGame()">&#8635; REINTENTAR</button>' +
    "</div>";
}

function renderVictory(app) {
  var code = getCompletionCode();
  var phrase = PHRASES[getFinalPhraseIndex()] || PHRASES[0];
  var routes = { A: "Visión", B: "Memoria", C: "Cifrado", D: "Atención" };
  app.innerHTML =
    '<div class="screen victory-screen">' +
    '<div class="trophy">&#127942;</div>' +
    "<h1>ROOT ACCESS CONCEDIDO</h1>" +
    '<p class="subtitle" style="font-size:.7em;margin-top:10px">NEXUS vuelve a estar bajo control humano.</p>' +
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
    vision: buildCriptaScene,
    memoria: buildBibliotecaScene,
    db: buildPasajeScene,
    cifrado: buildFuegoScene,
    atencion: buildAguaScene,
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
