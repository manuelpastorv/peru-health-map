# ServiceFlow — CF-02, A/B Agent Runtime Product Experiment

Free, public, offline-first browser tool for examining stage-by-stage service event logs and exporting a grounded delivery stocktake. **Synthetic data, not a current government dataset**. No cookies, analytics, third-party APIs, paid LLMs or backend. No login. Code is contained in readable, self-contained HTML pages.

- [Launch comparison](./index.html)
- [A — Original Agent Runtime v1.3](./a/index.html)
- [B — v1.3 + proposed Product Shipping Profile](./b/index.html)

## Supported CSV format
Headers: `case_id,stage,entered_at,exited_at`; timestamps require ISO 8601 timezone; exit may be blank for an open stage. 2MB or 10,000 records maximum. The 44-row built-in sample is synthetic and contains intentionally malformed, duplicate, overlap, open and HTML-looking fields to exercise checks.

## Findings
Two implementations passed 26/26 identical Chromium browser checks and 22/22 identical deterministic unit checks. First run exposed mobile overflow in both; repaired and retested. Both now have equivalent functional behavior on the frozen fixture: 40 valid, 3 invalid, 1 duplicate, 13 cases, 1 overlap, 448 completed stage-hours, top stage Review = 356, and 89 hypothetical stage-hours saved at 25% reduction. **Not** a real performance forecast.

B's guided UX is a subjective preference, not independently established higher value. Both builds were authored in one ChatGPT session under different design briefs; not a blinded randomized test of two independent models. Results prove the browser behavior of these versions in a controlled environment, **not** causality of the different instructions nor production uptime. Neither has measured real adoption or KPI impact.

## Privacy and limitations
Uploads remain in the browser and are not transmitted. Files imported for evaluation are processed in memory, without storage. Downloaded HTML/CSV summaries contain stage aggregates, not individual case records; the filter query is rendered in report metadata, so do not enter personal identifiers in a filter if sharing the report. Elapsed clock-hours are not labor hours or end-to-end case lead time when stages overlap. Tests do not replace legal or sector-specific validation.

## Development and license
Self-contained HTML: open `a/index.html` or `b/index.html` locally, or access via GitHub Pages. Repository root [MIT License](../../LICENSE) applies. No GitHub Actions CI workflow was added. Public material only; private Lessons Learned source/Kernel was not copied.
