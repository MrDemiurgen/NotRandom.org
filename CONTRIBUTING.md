# Contributing

Bug reports, documentation improvements, and focused pull requests are welcome.

Use Node.js 20 and pnpm 8.15.9. Install dependencies with `pnpm install --frozen-lockfile`. Run `pnpm build`, `pnpm typecheck`, and `pnpm lint:check` before submitting a change. `pnpm lint` automatically fixes some formatting; `lint:check` does not modify files.

Keep changes focused. Describe the problem, resulting behavior, and checks performed. Update the README for user-visible changes. Preserve upstream attribution and third-party licenses. Do not add telemetry without clearly documenting and discussing it.

## Manual verification

Load `build/chrome-mv3-prod` at `chrome://extensions`, then refresh RANDOM.ORG.

1. Open both the toolbar popup and options; confirm that saved values appear in both.
2. Add numbers `7` and `42`, set range `1–100`, and right-click Generate twice. Verify insertion order and consumption.
3. Add `7`, set range `10–100`, and right-click. Verify normal generation and preservation of `7`.
4. Test an empty number queue and normal left-clicks.
5. Enter a list with distinct strings and configure two of them. Right-click Randomize, then test Again! with newly configured values. Verify that configured strings appear first in either order and settings are cleared.
6. Verify individual deletion, duplicate-list validation, and clearing each tab.
7. Check the extension card and page console for errors.

Use synthetic data for these checks. A successful build or type check alone does not prove compatibility with the live website.

## Release packaging

Run `pnpm build`, then `pnpm release:package`. This generates an installable ZIP and SHA-256 checksum under `dist` and includes project and runtime dependency license texts. Review the generated notices and release notes before publishing a tag. The script gathers a conservative dependency closure; some notices may cover code not present in the final bundle.
