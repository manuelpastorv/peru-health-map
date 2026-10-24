/* Functional, dependency-free application logic for the curated health-map sample.
 * This is NOT a national coverage or nearest-care analysis. */
(() => {
  "use strict";
  const VALID_TYPES = ["Hospital", "Centro de Salud", "Puesto de Salud"];
  const STYLE_BY_TYPE = {
    "Hospital": "hospital",
    "Centro de Salud": "centro",
    "Puesto de Salud": "puesto"
  };
  const count = (id, value) => {
    document.getElementById(id).textContent = String(value);
  };
  const layer = L.markerClusterGroup({ chunkedLoading: true, maxClusterRadius: 45 });
  const map = L.map("map", { preferCanvas: true }).setView([-9.19, -75], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  map.addLayer(layer);

  const department = document.getElementById("dept-filter");
  const checkboxes = [...document.querySelectorAll(".type-filter")];
  const sidebar = document.getElementById("sidebar");
  const openButton = document.getElementById("open-sidebar-btn");
  const closeButton = document.getElementById("sidebar-toggle");
  let records = [];

  function setSidebar(open) {
    sidebar.classList.toggle("open", open);
    openButton.setAttribute("aria-expanded", String(open));
    openButton.hidden = open;
    if (open) map.invalidateSize();
  }

  openButton.addEventListener("click", () => setSidebar(true));
  closeButton.addEventListener("click", () => setSidebar(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebar(false);
  });

  function normalize(item) {
    const lat = Number(item.lat);
    const lng = Number(item.lng);
    if (!VALID_TYPES.includes(item.tipo) ||
        !Number.isFinite(lat) || !Number.isFinite(lng) ||
        lat < -19 || lat > 1 || lng < -82 || lng > -68) {
      return null;
    }
    return { ...item, lat, lng };
  }

  function popup(item) {
    const el = document.createElement("div");
    const title = document.createElement("strong");
    title.className = "popup-title";
    title.textContent = item.nombre || "Sin nombre";
    el.appendChild(title);
    for (const [label, value] of [
      ["Categoría", item.categoria],
      ["Tipo", item.tipo],
      ["Distrito", item.distrito],
      ["Provincia", item.provincia],
      ["Región", item.departamento],
      ["Entidad", item.entidad],
      ["Estado", item.estado]
    ]) {
      if (value == null || value === "") continue;
      const row = document.createElement("div");
      row.className = "popup-row";
      const key = document.createElement("span");
      key.className = "popup-label";
      key.textContent = label + ":";
      const detail = document.createElement("span");
      detail.className = "popup-value";
      detail.textContent = String(value);
      row.append(key, detail);
      el.appendChild(row);
    }
    return el;
  }

  function draw() {
    const selected = new Set(checkboxes.filter((el) => el.checked).map((el) => el.value));
    const filtered = records.filter((item) =>
      selected.has(item.tipo) &&
      (department.value === "Todos" || department.value === item.departamento));
    const breakdown = Object.fromEntries(VALID_TYPES.map((type) => [type, 0]));
    layer.clearLayers();
    for (const item of filtered) {
      breakdown[item.tipo]++;
      const marker = L.marker([item.lat, item.lng], {
        title: item.nombre || "Establecimiento",
        icon: L.divIcon({
          className: "health-pin health-pin-" + STYLE_BY_TYPE[item.tipo],
          html: "<span aria-hidden='true'></span>",
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      });
      marker.bindPopup(popup(item));
      layer.addLayer(marker);
    }
    count("total-count", filtered.length);
    count("hosp-count", breakdown.Hospital);
    count("centro-count", breakdown["Centro de Salud"]);
    count("puesto-count", breakdown["Puesto de Salud"]);
  }

  async function load() {
    try {
      const response = await fetch("data/ipress_sample.json", { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Expected a JSON array");
      records = data.map(normalize).filter(Boolean);
      if (!records.length) throw new Error("No valid sample locations");
      const departments = [...new Set(records.map((r) => r.departamento).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, "es"));
      for (const name of departments) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        department.appendChild(option);
      }
      draw();
    } catch (error) {
      console.error("Health sample could not load", error);
      document.getElementById("map-error").textContent =
        "No se pudieron cargar los datos de muestra. Prueba con un servidor local (no file://).";
      count("total-count", "—");
    }
  }

  department.addEventListener("change", draw);
  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", draw));
  load();
})();