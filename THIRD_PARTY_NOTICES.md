# Third-party notices

NotRandom.org's own source uses The Unlicense. That does not replace licenses of bundled dependencies.

The extension includes React and React DOM, Material UI, Emotion, `@plasmohq/storage`, their runtime dependencies, and Roboto font files. JavaScript libraries in this build predominantly use MIT licenses. **Roboto 5.0.8 uses Apache License 2.0**, with the attribution **Copyright 2011 Google Inc. All Rights Reserved.**

Each published installable ZIP includes `THIRD_PARTY_LICENSES.txt`, generated from the installed locked dependencies, together with the original license and notice text of each package in a conservative runtime dependency closure. The text includes package names, versions, declared licenses, and any font metadata attribution. Some listed dependencies may have been removed from the final JavaScript by the bundler.

Run `pnpm build` and `pnpm release:package` to regenerate the release archive and notices. The packaging script uses the existing Plasmo toolchain's ZIP library. Review the generated text if dependencies change. Dependencies used only to build the project also retain their licenses in their installed packages.

Original project: [azate/anti-random.org](https://github.com/azate/anti-random.org), licensed under [The Unlicense](LICENSE.md).
