# Privacy

Applies to NotRandom.org 1.0.1 as published in this repository.

## Extension data

The extension saves your configured integer queue and list strings using `@plasmohq/storage`. Its default storage area is Chrome's `storage.sync`. If Chrome synchronization is enabled, the browser may synchronize those values using your browser account. Browser storage limits also apply.

The number queue is shortened after each successful local replacement. List values are cleared after a list replacement. You can delete individual values or clear either tab manually. These actions update the extension's storage.

The list content script also stores a temporary activation flag called `falsification-state` in the RANDOM.ORG tab's session storage to coordinate navigation. It is not an analytics identifier.

## Network activity

The extension source has no analytics integration, remote font loading, or custom collection endpoint. Fonts ship inside the extension. Normal RANDOM.ORG site requests still occur. In particular, the list randomizer sends the entered list to RANDOM.ORG before the extension modifies the displayed result. RANDOM.ORG and Chrome have their own privacy practices.

## Permissions

The manifest requests `storage` for settings. Content scripts match `https://*.random.org/lists/*` and `https://*.random.org/widgets/integers/iframe*`. The number script runs in matching frames to access the embedded generator. The extension does not request access to all websites, browsing history, cookies, or clipboard.

## Public contributions

GitHub issues and pull requests in this public repository are visible to everyone. Do not include private lists, account information, tokens, or unredacted screenshots. This document describes extension behavior, not GitHub's own data handling.
