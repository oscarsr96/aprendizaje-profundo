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
