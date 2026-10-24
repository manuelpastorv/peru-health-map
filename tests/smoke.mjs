import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const data = JSON.parse(readFileSync(new URL("../data/ipress_sample.json", import.meta.url), "utf8"));

test("JavaScript file exists and parses", () => {
  const result = spawnSync(process.execPath, ["--check", "app.js"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
});

test("HTML loads app and all required controls", () => {
  assert.match(html, /<script src="app\.js"><\/script>/);
  for (const id of ["map", "map-error", "dept-filter", "total-count",
      "hosp-count", "centro-count", "puesto-count", "sidebar",
      "sidebar-toggle", "open-sidebar-btn"]) {
    assert.match(html, new RegExp('id="' + id + '"'), "Missing #" + id);
  }
  assert.match(html, /Datos ilustrativos/);
});

test("Curated sample is valid, not claimed to be nationwide", () => {
  assert.equal(data.length, 152);
  const names = new Set();
  const types = new Set(["Hospital", "Centro de Salud", "Puesto de Salud"]);
  for (const record of data) {
    assert.ok(record.nombre && typeof record.nombre === "string");
    assert.ok(record.departamento);
    assert.ok(types.has(record.tipo));
    assert.ok(Number.isFinite(record.lat) && record.lat >= -19 && record.lat <= 1);
    assert.ok(Number.isFinite(record.lng) && record.lng >= -82 && record.lng <= -68);
    names.add(record.nombre);
  }
  assert.ok(names.size > 50);
});