// =========================================================
// Sesión 1 — Navegación de slides
// =========================================================

const slides = Array.from(document.querySelectorAll(".slide"));
const total = slides.length;
const slideNumEl = document.getElementById("slideNum");
const slideTotalEl = document.getElementById("slideTotal");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const helpEl = document.getElementById("help");
const helpCloseBtn = document.getElementById("helpClose");
const pdfBtn = document.getElementById("pdfBtn");

let current = 0;

slideTotalEl.textContent = String(total);

// =========================================================
// Fragmentos: revelado progresivo del contenido de cada slide
// (portado de cunef_claude_sessions). Encabezados (kicker + h2 + lead)
// quedan visibles; el resto del contenido aparece paso a paso.
// =========================================================
const HEADER_SEL = ".kicker, .kicker-ex, h2, .h2, .h2-ex, .h2-close, .lead";

function groupChildren(el) {
  // Sin idiomas .lx en este proyecto: cada hijo directo es su propio grupo.
  return Array.from(el.children).map((c) => [c]);
}

function signature(el) {
  return el.tagName + "|" + el.className;
}

// Etiquetas en línea: nunca deben fragmentarse por separado (evita partir un
// párrafo en sus <strong>/<em>/<span>… sueltos).
const INLINE_TAGS = new Set([
  "STRONG",
  "EM",
  "SPAN",
  "A",
  "CODE",
  "B",
  "I",
  "U",
  "SMALL",
  "SUP",
  "SUB",
  "MARK",
  "ABBR",
  "BR",
  "Q",
  "CITE",
  "KBD",
  "SAMP",
  "VAR",
  "TIME",
  "LABEL",
]);
function isInline(el) {
  return INLINE_TAGS.has(el.tagName);
}

function repeatedChildGroups(el) {
  // Solo los hijos de bloque cuentan como "repetición" fragmentable; los
  // elementos en línea repetidos (p. ej. varios <strong> dentro de un <p>) no.
  const groups = groupChildren(el).filter(function (g) {
    return !isInline(g[0]);
  });
  const counts = {};
  groups.forEach(function (g) {
    const s = signature(g[0]);
    counts[s] = (counts[s] || 0) + 1;
  });
  const repeated = groups.filter(function (g) {
    return counts[signature(g[0])] >= 2;
  });
  return repeated.length >= 2 ? repeated : null;
}

function contentChildGroups(el) {
  return groupChildren(el).filter(function (g) {
    return !g[0].matches(HEADER_SEL);
  });
}

function isBlockContainer(el) {
  return (
    el.tagName === "DIV" || el.tagName === "SECTION" || el.tagName === "ARTICLE"
  );
}

// Contenedor de maquetación: div/section cuyos hijos de contenido son TODOS
// bloques (una rejilla/fila de columnas o tarjetas). Se recorre para fragmentar
// cada hijo por separado en vez de revelarlo entero de golpe.
function isLayoutContainer(el) {
  if (!isBlockContainer(el)) return false;
  const groups = contentChildGroups(el);
  if (groups.length < 2) return false;
  return groups.every(function (g) {
    return isBlockContainer(g[0]);
  });
}

function expandInto(group, out, depth) {
  const el = group[0];
  const bareWrapper = el.tagName === "DIV" && el.classList.length === 0;
  if ((bareWrapper || isLayoutContainer(el)) && depth < 3) {
    contentChildGroups(el).forEach(function (sub) {
      expandInto(sub, out, depth + 1);
    });
    return;
  }
  if (el.tagName === "UL" || el.tagName === "OL") {
    const lis = groupChildren(el);
    if (lis.length >= 2) {
      lis.forEach(function (g) {
        out.push(g);
      });
      return;
    }
  }
  const rep = repeatedChildGroups(el);
  if (rep) {
    rep.forEach(function (g) {
      out.push(g);
    });
    return;
  }
  out.push(group);
}

// Un fragmento debe revelar algo visible: los separadores decorativos vacíos
// no deben gastar un paso.
function hasContent(group) {
  return group.some(function (el) {
    return (
      (el.textContent || "").trim() !== "" ||
      el.querySelector("img, svg, canvas, iframe")
    );
  });
}

function computeFragments(slide) {
  if (slide.matches(".slide-cover, .slide-divider")) return [];
  const inner = slide.querySelector(".slide-inner");
  if (!inner) return [];
  const out = [];
  contentChildGroups(inner).forEach(function (g) {
    expandInto(g, out, 0);
  });
  const real = out.filter(hasContent);
  if (real.length >= 2) return real;
  // Un único bloque de contenido (p. ej. una caja con lista dentro): baja un
  // nivel para revelar sus elementos uno a uno en vez de no animar nada.
  if (real.length === 1) {
    const deep = [];
    contentChildGroups(real[0][0]).forEach(function (g) {
      expandInto(g, deep, 1);
    });
    const realDeep = deep.filter(hasContent);
    if (realDeep.length >= 2) return realDeep;
  }
  return [];
}

const slideFrags = slides.map(computeFragments);
slideFrags.forEach(function (frags) {
  frags.forEach(function (group) {
    group.forEach(function (el) {
      el.classList.add("frag");
    });
  });
});

let revealed = 0;

function applyFrags() {
  slideFrags[current].forEach(function (group, i) {
    group.forEach(function (el) {
      el.classList.toggle("is-revealed", i < revealed);
    });
  });
}

// Escala el contenido del slide para que quepa en la pantalla sin scroll
function fitSlide(slide) {
  if (!slide) return;
  const box = slide.querySelector(".slide-inner, .divider-inner, .cover-grid");
  if (!box) return;
  box.style.transform = "none";
  const cs = getComputedStyle(slide);
  const avail =
    slide.clientHeight -
    parseFloat(cs.paddingTop) -
    parseFloat(cs.paddingBottom);
  const need = box.scrollHeight;
  if (need > avail && avail > 0) {
    box.style.transform = "scale(" + (avail / need).toFixed(4) + ")";
  }
}

function showSlide(idx, fragMode) {
  current = Math.max(0, Math.min(total - 1, idx));
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === current);
  });
  slideNumEl.textContent = String(current + 1);
  const pct = ((current + 1) / total) * 100;
  progressFill.style.width = pct + "%";
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total - 1;

  // Actualiza el hash sin saltar
  history.replaceState(null, "", "#" + (current + 1));

  // "start" → entra con los fragmentos ocultos (revelado al avanzar);
  // cualquier otro modo (salto directo, Home/End, hash) → todo visible.
  revealed = fragMode === "start" ? 0 : slideFrags[current].length;
  applyFrags();

  fitSlide(slides[current]);
}

// Reajustar al cambiar el tamaño de la ventana
let resizeRaf;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => fitSlide(slides[current]));
});

// Reajustar cuando terminen de cargar las fuentes (cambia la altura del texto)
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => fitSlide(slides[current]));
}

function next() {
  // Primero revela el siguiente fragmento; cuando no quedan, pasa de slide.
  if (revealed < slideFrags[current].length) {
    revealed += 1;
    applyFrags();
    return;
  }
  if (current < total - 1) showSlide(current + 1, "start");
}
function prev() {
  // Repliega fragmentos antes de retroceder de slide.
  if (revealed > 0) {
    revealed -= 1;
    applyFrags();
    return;
  }
  if (current > 0) showSlide(current - 1, "full");
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

document.addEventListener("keydown", (e) => {
  // Ignorar si el foco está en un input
  if (e.target.matches("input, textarea")) return;

  // Con la rejilla abierta es un diálogo modal: solo Escape/G (cerrar) y
  // Tab (trampa de foco). Bloqueamos la navegación de la presentación de fondo.
  if (
    gridIsOpen() &&
    e.key !== "Escape" &&
    e.key !== "g" &&
    e.key !== "G" &&
    e.key !== "Tab"
  ) {
    return;
  }

  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowDown" ||
    e.key === " " ||
    e.key === "PageDown"
  ) {
    e.preventDefault();
    next();
  } else if (
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp" ||
    e.key === "PageUp"
  ) {
    e.preventDefault();
    prev();
  } else if (e.key === "Home") {
    e.preventDefault();
    showSlide(0);
  } else if (e.key === "End") {
    e.preventDefault();
    showSlide(total - 1);
  } else if (e.key === "?" || e.key === "h" || e.key === "H") {
    e.preventDefault();
    helpEl.hidden = !helpEl.hidden;
  } else if (e.key === "p" || e.key === "P") {
    e.preventDefault();
    window.print();
  } else if (e.key === "g" || e.key === "G") {
    e.preventDefault();
    if (gridIsOpen()) closeGrid();
    else openGrid();
  } else if (e.key === "Escape") {
    if (gridIsOpen()) closeGrid();
    else helpEl.hidden = true;
  }
});

if (pdfBtn) {
  pdfBtn.addEventListener("click", () => window.print());
}

// Recalcula la escala de cada slide para que quepa en su hoja A4.
// Usa matchMedia('print') porque beforeprint se dispara ANTES de
// que el CSS de impresión se aplique, así que sus medidas vendrían
// del layout de pantalla (mucho más ancho).
function fitForPrint(slide) {
  const box = slide.querySelector(".slide-inner, .divider-inner, .cover-grid");
  if (!box) return;
  box.style.transform = "none";
  void slide.offsetHeight;
  const cs = getComputedStyle(slide);
  const avail =
    slide.clientHeight -
    parseFloat(cs.paddingTop) -
    parseFloat(cs.paddingBottom);
  const need = box.scrollHeight;
  if (need > avail && avail > 0) {
    box.style.transform = "scale(" + (avail / need).toFixed(4) + ")";
  }
}

function restoreFromPrint() {
  slides.forEach((s, i) => {
    if (i === current) return;
    const box = s.querySelector(".slide-inner, .divider-inner, .cover-grid");
    if (box) box.style.transform = "";
  });
  fitSlide(slides[current]);
}

const printMql = window.matchMedia("print");
function onPrintChange(e) {
  if (e.matches) {
    slides.forEach(fitForPrint);
  } else {
    restoreFromPrint();
  }
}
if (typeof printMql.addEventListener === "function") {
  printMql.addEventListener("change", onPrintChange);
} else if (typeof printMql.addListener === "function") {
  printMql.addListener(onPrintChange); // Safari < 14
}

// Fallback adicional: algunos navegadores (Safari) no disparan el
// change de matchMedia para print, pero sí beforeprint/afterprint.
// Usamos requestAnimationFrame para esperar a que el CSS de print esté aplicado.
window.addEventListener("beforeprint", () => {
  // Doble rAF: tras el primer frame el browser ya ha aplicado print media
  requestAnimationFrame(() =>
    requestAnimationFrame(() => slides.forEach(fitForPrint)),
  );
});
window.addEventListener("afterprint", () => {
  requestAnimationFrame(() => restoreFromPrint());
});

helpCloseBtn.addEventListener("click", () => {
  helpEl.hidden = true;
});
helpEl.addEventListener("click", (e) => {
  if (e.target === helpEl) helpEl.hidden = true;
});

// =========================================================
// Vista rejilla (tecla G) — visión general de todas las slides
// (portado de cunef_claude_sessions)
// =========================================================
let gridEl = null;

function buildGrid() {
  gridEl = document.createElement("div");
  gridEl.className = "grid-view";
  gridEl.hidden = true;
  gridEl.setAttribute("role", "dialog");
  gridEl.setAttribute("aria-modal", "true");
  gridEl.setAttribute("aria-label", "Vista general de diapositivas");
  const inner = document.createElement("div");
  inner.className = "grid-view-inner";
  slides.forEach(function (s, i) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "grid-item";
    const thumb = document.createElement("div");
    thumb.className = "grid-thumb";
    const clone = s.cloneNode(true);
    clone.classList.remove("active");
    clone.classList.add("grid-thumb-slide");
    clone.setAttribute("aria-hidden", "true");
    // El clon anula cualquier escala de ajuste de la slide original
    clone.style.transform = "";
    const cloneBox = clone.querySelector(
      ".slide-inner, .divider-inner, .cover-grid",
    );
    if (cloneBox) cloneBox.style.transform = "";
    // Evita ids duplicados en el documento
    clone.querySelectorAll("[id]").forEach(function (n) {
      n.removeAttribute("id");
    });
    thumb.appendChild(clone);
    const label = document.createElement("span");
    label.className = "grid-label";
    label.textContent = i + 1 + " · " + (s.dataset.title || "");
    item.appendChild(thumb);
    item.appendChild(label);
    item.addEventListener("click", function () {
      closeGrid();
      showSlide(i);
    });
    inner.appendChild(item);
  });
  gridEl.appendChild(inner);
  // Cerrar al clicar el fondo (fuera de las miniaturas), como el panel de ayuda
  gridEl.addEventListener("click", function (e) {
    if (e.target === gridEl) closeGrid();
  });
  // Trampa de foco: Tab cicla entre las miniaturas sin salir del diálogo
  gridEl.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    const items = gridEl.querySelectorAll(".grid-item");
    if (!items.length) return;
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    if (e.shiftKey && document.activeElement === firstItem) {
      e.preventDefault();
      lastItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      e.preventDefault();
      firstItem.focus();
    }
  });
  document.body.appendChild(gridEl);
}

// Escala cada miniatura para encajar la slide (1280px de diseño) en su ancho real
function fitThumbs() {
  if (!gridEl) return;
  gridEl.querySelectorAll(".grid-thumb").forEach(function (t) {
    t.style.setProperty("--thumb-scale", (t.clientWidth / 1280).toFixed(4));
  });
}

let gridReturnFocus = null;

function openGrid() {
  if (!gridEl) buildGrid();
  gridReturnFocus = document.activeElement;
  gridEl.hidden = false;
  fitThumbs();
  const first = gridEl.querySelector(".grid-item");
  if (first) first.focus();
}

function closeGrid() {
  if (gridEl) gridEl.hidden = true;
  if (gridReturnFocus && typeof gridReturnFocus.focus === "function") {
    gridReturnFocus.focus();
  }
  gridReturnFocus = null;
}

function gridIsOpen() {
  return gridEl && !gridEl.hidden;
}

window.addEventListener("resize", fitThumbs);

// Swipe en móvil
let touchStartX = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);

document.addEventListener(
  "touchend",
  (e) => {
    if (gridIsOpen()) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      if (dx < 0) next();
      else prev();
    }
  },
  { passive: true },
);

// Estado inicial desde hash
const initial = parseInt(location.hash.replace("#", ""), 10);
if (!Number.isNaN(initial) && initial >= 1 && initial <= total) {
  showSlide(initial - 1);
} else {
  showSlide(0);
}
