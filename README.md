# 🇵🇪 Peru Health Access Map

An interactive web map showing the distribution of healthcare facilities across Peru, built with open government data from SUSALUD RENIPRESS. **No installation, no server, no cost.**

🌐 **Live Demo:** https://manuelpastorv.github.io/peru-health-map

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

No installation needed!

1. Clone or download this repository
2. Open `index.html` in any web browser

That's it. No npm, no server, no build step.

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