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

function showSlide(idx) {
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
  showSlide(current + 1);
}
function prev() {
  showSlide(current - 1);
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

document.addEventListener("keydown", (e) => {
  // Ignorar si el foco está en un input
  if (e.target.matches("input, textarea")) return;

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
  } else if (e.key === "Escape") {
    helpEl.hidden = true;
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
