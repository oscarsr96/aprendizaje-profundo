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
