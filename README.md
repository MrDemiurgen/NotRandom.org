<div align="center">
  <img src="assets/icon.png" width="112" height="112" alt="NotRandom.org icon">
  <h1>NotRandom.org</h1>
  <p><strong>Take control of randomness on RANDOM.ORG.</strong></p>
  <p>A Chrome extension that lets you set the numbers and leading list entries displayed on RANDOM.ORG.</p>
  <p><a href="https://github.com/MrDemiurgen/NotRandom.org/releases/latest">Download</a> · <a href="https://github.com/MrDemiurgen/NotRandom.org/issues">Report a bug</a></p>
  <img src="https://img.shields.io/badge/Chrome-Manifest_V3-4285F4?logo=googlechrome&logoColor=white" alt="Chrome Manifest V3">
  <img src="https://img.shields.io/badge/license-Unlicense-blue" alt="The Unlicense">
</div>

Changes apply only in your browser; RANDOM.ORG's server-side results stay unchanged.

Use this project for demonstrations and learning, and disclose its use to viewers and participants. A screenshot or recording can show a manipulated local result.

## Features

- **Number queue:** use integers in the order you add them, one per right-click. If the first number is outside the selected range, normal generation runs and the queue is kept.
- **List order:** place configured strings first, in the order you add them. List settings are cleared after use.
- **Easy controls:** add or delete individual values, or clear a tab. Settings are available from the toolbar and extension options.
- **Normal clicks:** left-click uses RANDOM.ORG normally; right-click applies your configured values.

## Install in Chrome

1. Download **NotRandom.org-v1.0.1.zip** from the [latest release](https://github.com/MrDemiurgen/NotRandom.org/releases/latest), under **Assets**.
2. Extract it into a permanent folder.
3. Open `chrome://extensions` and enable **Developer mode**.
4. Click **Load unpacked** and select the folder containing `manifest.json`.
5. Refresh RANDOM.ORG.

## Usage

### Numbers

Open NotRandom.org → **Random Number**, enter an integer, and press **Enter** or **Add**. On [RANDOM.ORG](https://www.random.org/), set **Min** and **Max**, then **right-click Generate**.

For example, a queue of `7, 42` with a range of `1–100` displays `7`, then `42`. An empty queue uses normal generation.

### Lists

Open NotRandom.org → **List Randomizer** and add strings from your input list. On the [list randomizer](https://www.random.org/lists/), enter the list, then **right-click Randomize** or **Again!**.

Adding `Alice`, then `Bob`, puts `Alice` first and `Bob` second. Re-add your values after each use, and configure no more values than the list contains.

## Privacy

Settings are saved in Chrome extension storage and may sync through your browser account. The extension runs only on supported RANDOM.ORG pages. See [PRIVACY.md](PRIVACY.md) for details.

## Build from source

Use **Node.js 20** and **pnpm 8.15.9**.

```sh
git clone https://github.com/MrDemiurgen/NotRandom.org.git
cd NotRandom.org
corepack enable
pnpm install --frozen-lockfile
pnpm build
```

Load `build/chrome-mv3-prod` in Chrome. Use `pnpm dev` for development, or `pnpm release:package` to create an installable ZIP with license notices.

See [CONTRIBUTING.md](CONTRIBUTING.md) for checks and [CHANGELOG.md](CHANGELOG.md) for release notes.

## Credits and license

Based on [azate/anti-random.org](https://github.com/azate/anti-random.org). Not affiliated with RANDOM.ORG or the upstream author.

Source code uses [The Unlicense](LICENSE.md). Bundled libraries and fonts retain their own licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
