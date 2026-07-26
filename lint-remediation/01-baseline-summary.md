# Repository-wide lint baseline

- Branch: fix/repository-lint-remediation
- Source commit: c5f7022c18b03dc86c64073f88db982da811dd3c
- Captured: 2026-07-26 (Asia/Calcutta)
- Command: npm run lint
- Exit code: 1
- Affected files: 110
- Errors: 233
- Warnings: 16

## Diagnostics by rule

| Rule | Count |
| --- | ---: |
| react/no-unescaped-entities | 111 |
| @next/next/no-html-link-for-pages | 62 |
| react-compiler | 60 |
| react-hooks/exhaustive-deps | 16 |

## Diagnostics by remediation batch

| Batch | Scope | Count |
| ---: | --- | ---: |
| 1 | React compiler and parser | 60 |
| 2 | Internal HTML links | 62 |
| 3 | Unescaped entities | 111 |
| 4 | Hook dependencies | 16 |

The complete source-of-truth inventory is 02-diagnostics.csv. The raw lint-remediation-baseline.txt file is ignored and must not be committed.
