# 🇵🇪 Peru Health Access Map

A free, static demo of healthcare-facility mapping with a **152-record illustrative sample** using SUSALUD RENIPRESS-style fields. It is not an official or complete national access dataset.

🌐 **Live Demo:** https://manuelpastorv.github.io/peru-health-map

---

## ✅ Current implementation status (October 24, 2026)

This repository now has a JavaScript map loader in `app.js`, province/department popups,
facility-type filters, clustering, and local smoke tests. **The included 152
facility records are an illustrative, curated sample, not a complete or verified
RENIPRESS national dataset.** Do **not** infer service coverage, population
access, capacity, or nearest facility from these example records.

**Local development (HTTP required):**

```bash
python3 -m http.server 8000
# open http://localhost:8000
node --test tests/smoke.mjs   # Node 20+, no npm packages
```

Using `file://` will usually block the JSON `fetch()` due to browser
security restrictions. Production data ingestion, lineage checks and
nationwide coverage calculations are **not implemented** in this change.
The official [SUSALUD RENIPRESS monthly data](https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-entidades-prestadoras-de-servicios-de-salud-renipress)
should be downloaded, validated, and attributed before using this site for
real-world decisions.

---

## 🎯 What This Project Does

This map visualizes 150+ healthcare facilities (Hospitals, Health Centers, and Health Posts) across all 25 regions of Peru. Users can filter by department and facility type to explore healthcare access gaps — especially visible between urban areas like Lima and remote regions like Huancavelica, Madre de Dios, or Loreto.

---

## 🎓 What You'll Learn

By studying this project you'll understand:

- **HTML structure** — how a web page is organized
- **CSS layout** — flexbox, responsive design, custom properties
- **JavaScript fundamentals** — functions, arrays, `fetch()`, event listeners
- **Working with JSON data** — loading and filtering structured datasets
- **Interactive maps with Leaflet.js** — the most popular free mapping library
- **GitHub Pages deployment** — how to host a website for free
- **Data visualization principles** — color encoding, clustering, popups

---

## 🚀 How to Run Locally

No npm or build step is needed. Clone the repository and serve it over local HTTP with `python3 -m http.server 8000`, then visit `http://localhost:8000`. Direct `file://` access may block the JSON loader.

---

## ⚙️ Enable GitHub Pages (Go Live!)

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **"Deploy from a branch"**
3. Branch: **main** | Folder: **/ (root)**
4. Click **Save**
5. Wait ~2 minutes → your site is live at `https://YOUR-USERNAME.github.io/peru-health-map`

---

## 📊 Data Source

Data is based on the **RENIPRESS** (Registro Nacional de IPRESS) maintained by **SUSALUD**, available on Peru's National Open Data Platform.

🔗 [datosabiertos.gob.pe — RENIPRESS](https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-entidades-prestadoras-de-servicios-de-salud-renipress)

The `data/ipress_sample.json` file is a curated sample for demonstration. To use the full live dataset, download the CSV from the link above and convert it to JSON format.

---

## 🌍 How to Adapt This for Another Country

This template is designed to be reusable for any country:

1. **Replace the data:** Edit `data/ipress_sample.json` with your country's facility data (keep the same field names, or update them in `app.js`)
2. **Re-center the map:** In `app.js`, change `setView([-9.19, -75.0], 6)` to your country's coordinates
3. **Update labels:** Change "departamento" to "region", "county", or "district" in `index.html`
4. **Update the title** in `index.html`

**Countries with similar open health data:**
- 🇰🇪 Kenya — KHIS (Kenya Health Information System)
- 🇳🇬 Nigeria — HMIS Open Data
- 🇧🇴 Bolivia — SNIS (Sistema Nacional de Información en Salud)
- 🇧🇩 Bangladesh — DGHS Open Data

---

## 🛠️ Tech Stack

| Tool | Purpose | Cost |
|------|---------|------|
| HTML / CSS / JS | Structure, styling, logic | Free |
| [Leaflet.js](https://leafletjs.com/) | Interactive maps | Free & Open Source |
| [OpenStreetMap](https://www.openstreetmap.org/) | Map tiles | Free |
| [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) | Marker grouping | Free & Open Source |
| [GitHub Pages](https://pages.github.com/) | Web hosting | Free |

---

## 📁 Project Structure

```
peru-health-map/
├── index.html          ← The main page (structure + layout)
├── style.css           ← All visual styling (responsive)
├── app.js              ← All map logic, filters, stats (commented)
├── data/
│   └── ipress_sample.json  ← 150+ health facility records
└── README.md           ← This file
```

---

## 💡 Ideas to Improve This Project

- [ ] Connect to the live RENIPRESS API instead of static JSON
- [ ] Add population data to show facilities per 100,000 people
- [ ] Add a "nearest hospital" finder using browser geolocation
- [ ] Add a heatmap layer showing facility density gaps
- [ ] Add search by facility name
- [ ] Export filtered results as CSV download
- [ ] Add time-series data if historical snapshots are available
- [ ] Translate to English for international audiences

---

Built with ❤️ for Peru and the open data community 🌎

---

## New open-source policy tool: ServiceFlow (CF-02)

[**Compare Agent Runtime v1.3 and the Product Shipping Profile**](tools/serviceflow/index.html) · [Version A](tools/serviceflow/a/index.html) · [Version B](tools/serviceflow/b/index.html).

A free, client-side case-processing event-log analyzer for service bottlenecks, repeated work, overlaps, incomplete records, scenario analysis and downloadable stocktake/CSV reports. The demo is synthetic and not current government data. Both variants passed the same 26/26 Chromium browser checks and the same 22/22 deterministic regression checks; the implementation was not an independent blinded agent trial. [Read experiment and limitations](tools/serviceflow/EXPERIMENT.md).
