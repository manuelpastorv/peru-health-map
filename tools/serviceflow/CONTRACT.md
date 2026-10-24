# CF-02 — Public Service Flow Audit A/B Contract (frozen before implementation)
Date: 2026-10-24. Goal: create a public, free, no-login browser application usable by public-sector delivery units, NGOs and firms for auditing multi-stage case event logs and producing a grounded stocktake.

## Inputs
CSV file with header: case_id,stage,entered_at,exited_at; `exited_at` may be blank for active stage. ISO8601 with explicit timezone or Z. All contents stay in memory in browser; no network calls during computation. Built-in demo CSV is illustrative, not actual government data. No invented savings or effectiveness claims.

## Canonical analysis rules
1. Parse quoted CSV (commas/newlines and escaped double quotes), CRLF and BOM. Reject missing canonical headers and files > 2 MB or > 10000 rows.
2. Validate per row: case ID and stage nonempty; entered_at unambiguous ISO with timezone; exited_at blank/open or valid timezone; exited_at >= entered_at. Reject invalid rows separately with reasons. All durations are CLOCK hours (not working hours). A timestamp without timezone is invalid.
3. Identify identical duplicate events by normalized case, stage, entry and exit; exclude duplicates and count them. Do not silently deduplicate different visits to the same stage.
4. Include valid completed and open events. Open events measure age from a *configurable* analysis date (default snapshot time 2026-10-24T12:00:00Z for experiment) and contribute to OPEN AGE separately; they do not enter completed-duration aggregates. If an open event starts after as-of, reject as-of analysis with warning (event valid but cannot age).
5. Flag overlapping stage intervals **within same case** and >1 open event per case; do not claim stage sums equal end-to-end journey when overlaps exist.
6. Stage completed count, total elapsed hours, median duration, p90 duration; 0 values valid. Overall distinct cases, number of cases with any open event, number of repeat/rework visits (case+stage occurrences >1), invalid rows, duplicates, overlaps.
7. SLA threshold comparison uses completed event duration > SLA hours (strict). Filter by stage and by case-insensitive case search. Scenario proposed savings = selected stage completed hours * chosen reduction/100, other stage hours unchanged. This is hypothetical TASK/STAGE arithmetic and NOT measured end-to-end service improvement. Stage-filter changes the analysis scope; report makes it explicit.
8. Sort stage summary by total completed hours descending, ties lexicographically ascending. Avoid dangerous innerHTML of user-uploaded data; downloaded report must encode HTML. Spreadsheet formula injection risk: CSV exports prefix cells beginning [=+@-] with apostrophe. Aggregate output should not include raw personal information except when explicit row-level export is requested.
9. Outputs: responsive accessible browser dashboard, stage ranking, validation panel with row references, cohort/case lookup, scenario controls, downloadable HTML stocktake and CSV stage summary, explicit unknown/limitations and demo label.
10. Test real browser on desktop 1280px and mobile 390px, offline, no console errors; keyboard accessible. No cloud backend, authentication, paid LLM or API required. No GitHub Actions workflow (avoid minutes).

## Same test / experiment controls
A = canonical Agent Runtime Spec 1.3 Kernel only; B = same Kernel plus Product Shipping Profile proposal from PR #7. Both receive this frozen contract, same fixture, test budget, no third-party dependencies. Independent acceptance suite is written against required behavior and must not be tailored to the output of A/B. Receipt records what is observed, rather than relying on author's description.

## Pass/fail
Pass first release at TESTED only if >= 90% of functional checks, 100% P0 privacy/data integrity checks, correct export artifacts, and no uncaught browser exceptions; RELEASED only when publicly open and a real navigated URL works. USAGE and IMPACT require external user and KPI evidence. Do not represent demo data as current public records.