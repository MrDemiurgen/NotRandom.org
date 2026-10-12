<div align="center">
  <img src="assets/icon.png" width="112" height="112" alt="NotRandom.org icon">
  <h1>NotRandom.org</h1>
  <p><strong>Take control of randomness on RANDOM.ORG.</strong></p>
  <p>A Chrome extension for demonstrating local manipulation of displayed random results.</p>
  <p><a href="https://github.com/MrDemiurgen/NotRandom.org/releases/latest">Download</a> · <a href="https://github.com/MrDemiurgen/NotRandom.org/issues">Report a bug</a></p>
  <img src="https://img.shields.io/badge/Chrome-Manifest_V3-4285F4?logo=googlechrome&logoColor=white" alt="Chrome Manifest V3">
  <img src="https://img.shields.io/badge/license-Unlicense-blue" alt="The Unlicense">
  <img src="https://img.shields.io/badge/analytics-none-success" alt="No extension analytics">
</div>

**Changes affect only the page displayed in your browser. They do not change RANDOM.ORG's server-side results or create a verifiable result.** Use this project for demonstrations and learning, and disclose its use to viewers and participants. A screenshot or recording can show a manipulated local result.

## Features

| Feature | Behavior |
| --- | --- |
| Number queue | Integers are used in insertion order, one per successful replacement. |
| Range checks | The first queued integer must fit the chosen range; otherwise normal generation runs and the queue is kept. |
| List customization | Configured strings replace leading entries in shuffled order, rather than a fixed ranking. |
| One-use list values | All configured list values are cleared after replacement. |
| Queue management | Add values, delete individual entries, or clear all values in a tab. Duplicate list strings are rejected. |
| Popup and options | Open the same settings from the toolbar or extension options. |
| Normal clicks | Left-click uses the site's normal behavior. Right-click requests local replacement. |
| Chrome Manifest V3 | Built with Plasmo, React, and TypeScript; fonts bundled locally. |
| No built-in analytics | The original analytics integration has been removed. |

## Install in Chrome

1. Open the [latest release](https://github.com/MrDemiurgen/NotRandom.org/releases/latest).
2. Download **NotRandom.org-v1.0.0.zip** under **Assets**. GitHub's automatic **Source code** archives are for developers, not installation.
3. Extract it into a permanent folder.
4. Open `chrome://extensions` and enable **Developer mode**.
5. Click **Load unpacked** and select the folder containing `manifest.json`.
6. Optionally pin NotRandom.org using Chrome's extensions menu.

Keep the extracted folder: Chrome loads the extension from it. To update, replace its files with a new release, click **Reload** on the extension card, and refresh the RANDOM.ORG page.

## Usage

### Number generator

Open NotRandom.org → **Random Number**. Enter an integer, then press **Enter** or **Add**. Repeat to create a queue. Open [RANDOM.ORG](https://www.random.org/), set **Min** and **Max** in the **True Random Number Generator** widget, and **right-click Generate**.

With a queue of `7, 42` and a range of `1–100`, successive right-clicks display `7` and `42`. With a range of `10–100`, `7` remains queued and normal generation runs; the extension does not skip to `42`. An empty queue also uses normal generation.

### List randomizer

Open **List Randomizer** in NotRandom.org and add strings one at a time. Enter your input list on the [list randomizer](https://www.random.org/lists/), then **right-click Randomize** or **Again!**.

Configured strings appear in the first positions in shuffled order. All configured values are cleared afterward. Use distinct strings from your input list and configure no more values than there are entries. The extension does not validate membership against the website's list.

## Privacy and permissions

The extension requests **storage** and runs content scripts only on HTTPS RANDOM.ORG list pages and number-widget frames. It includes no analytics integration or custom data-collection server.

Settings use Chrome extension storage through `@plasmohq/storage`, whose default area is **sync**. Chrome may synchronize these values through your browser account if sync is enabled. RANDOM.ORG still receives normal site requests; list randomization submits the input list to that service. See [PRIVACY.md](PRIVACY.md).

## Troubleshooting and limitations

- Refresh RANDOM.ORG after installing or reloading the extension.
- Use the **right mouse button**; left-click performs normal generation.
- Ensure the **first** queued number fits the selected range.
- Re-add list values after each replacement.
- Website changes may break the targeted HTML selectors.
- Use one interaction at a time; simultaneous operations in multiple tabs may behave unexpectedly.
- Local output cannot serve as independently verifiable proof of a fair draw.

[Report a bug](https://github.com/MrDemiurgen/NotRandom.org/issues) with the Chrome version, extension version, page URL, and reproduction steps. Remove private details from screenshots.

## Build from source

Requirements: **Node.js 20** (`^20.10`) and **pnpm 8** (`^8.12`, pinned to `8.15.9`).

```sh
git clone https://github.com/MrDemiurgen/NotRandom.org.git
cd NotRandom.org
corepack enable
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
pnpm lint:check
```

Load `build/chrome-mv3-prod` via **Load unpacked**. Plasmo also generates a ZIP in `build`. Use `pnpm dev` for development rebuilding. Before distributing a compiled build, include dependency license notices; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

See [CONTRIBUTING.md](CONTRIBUTING.md) for checks and a manual test checklist, and [CHANGELOG.md](CHANGELOG.md) for release notes.

## Origin and disclaimer

NotRandom.org is an independent continuation based on [azate/anti-random.org](https://github.com/azate/anti-random.org). The original repository is archived; its latest release, **v3.0.0-alpha.1**, was published on **December 23, 2023**. This project builds on that work with its own name, icon, toolbar popup, sequential number queue, and removal of the original analytics integration. Thanks to the upstream author for making the source freely available. No affiliation with or endorsement by the upstream author or RANDOM.ORG is claimed.

## License

Project source uses **[The Unlicense](LICENSE.md)**, continuing the original license. It allows copying, modification, redistribution, and commercial use, and provides the software without warranty. Third-party libraries and fonts retain their own licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
