# CF-02 — Controlled first-release experiment

**Frozen mandate:** same public ServiceFlow product and acceptance contract in both arms. **A:** original Agent Runtime 1.3; **B:** Agent Runtime 1.3 plus Product Shipping Profile (draft, private). Both were written in the same ChatGPT session: not independent agent trials.

## Evidence
- Chromium 1280px and 390px simulated-browser runs: **A 26/26**, **B 26/26**.
- Shared Node regression suite: **22/22** for each engine.
- 44-line fixture with malformed timezone/calendar, duplicates, overlap, repeat visits, open age and HTML-looking stages.
- Both exported HTML stocktake and CSV; CSV formula-prefix escaping, HTML output encoding, >10,000 row limit, no observed outgoing requests.
- Detected and fixed horizontal mobile page overflow in both; stale asynchronous-file-upload test assertion was corrected and rerun.

## Evaluation boundaries
- Browser test environment blocked navigation to localhost and file URLs. Tests ran real Chromium DOM interactions with source-injected scripts; self-contained HTML pages were separately loaded, initialized and tested for actual downloads in Chromium. GitHub Pages itself needs live verification, and user adoption remains unmeasured.
- Behavioral outcomes were tied; B presents a clearer four-step user journey but no independent user study. A uses a somewhat smaller app payload; B has additional guidance.
- Correctness does NOT imply a model- or instruction-induced causal gain. Further held-out experiments with separate agent contexts and blind reviewer needed before replacing v1.3.
- Synthetically generated dataset; no operational recommendation without validating source completeness, censoring, overlapping intervals and real business constraints.

## Current decision
Keep v1.3 Kernel; trial Product Shipping Profile selectively. Publish both runnable pages as alternatives and gather actual user feedback before selecting a universal standard.
