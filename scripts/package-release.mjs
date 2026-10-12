import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const project = readJson(path.join(root, 'package.json'));
const build = path.join(root, 'build', 'chrome-mv3-prod');
const manifest = readJson(path.join(build, 'manifest.json'));
if (manifest.version !== project.version) throw new Error('Build version differs from package.json; rebuild first.');

const visited = new Map();
function inspect(name, parent) {
  const require = createRequire(path.join(parent, 'package.json'));
  let packageFile;
  try {
    packageFile = require.resolve(`${name}/package.json`);
  } catch {
    let directory = path.dirname(require.resolve(name));
    while (!fs.existsSync(path.join(directory, 'package.json'))) {
      const next = path.dirname(directory);
      if (next === directory) throw new Error(`Cannot locate package metadata: ${name}`);
      directory = next;
    }
    packageFile = path.join(directory, 'package.json');
  }
  const directory = path.dirname(fs.realpathSync(packageFile));
  if (visited.has(directory)) return;
  const metadata = readJson(path.join(directory, 'package.json'));
  visited.set(directory, metadata);
  for (const dependency of Object.keys(metadata.dependencies ?? {})) inspect(dependency, directory);
}

// Plasmo is the build tool; its development tree is not shipped in the extension.
for (const name of Object.keys(project.dependencies).filter((name) => name !== 'plasmo')) inspect(name, root);

const sections = ['NotRandom.org third-party licenses\n\nGenerated from pnpm-lock.yaml dependencies.\n'
  + 'This conservative runtime closure may include packages removed by bundling.\n'
  + 'NotRandom.org project source is separately licensed under The Unlicense.\n'];
for (const [directory, metadata] of [...visited].sort((a, b) => a[1].name.localeCompare(b[1].name))) {
  const files = fs.readdirSync(directory).filter((name) => /^(licen[sc]e|copying|notice|ofl)([._-].*)?$/i.test(name)
    && fs.statSync(path.join(directory, name)).isFile());
  if (!files.length) throw new Error(`Missing license text: ${metadata.name}@${metadata.version}`);
  let text = `\n${'='.repeat(72)}\n${metadata.name}@${metadata.version}\nLicense: ${metadata.license}\n`;
  const fontMetadata = path.join(directory, 'metadata.json');
  if (fs.existsSync(fontMetadata)) {
    const attribution = readJson(fontMetadata).license?.attribution;
    if (attribution) text += `${attribution}\n`;
  }
  for (const file of files) text += `\n--- ${file} ---\n${fs.readFileSync(path.join(directory, file), 'utf8')}\n`;
  sections.push(text);
}
fs.copyFileSync(path.join(root, 'LICENSE.md'), path.join(build, 'LICENSE.md'));
fs.writeFileSync(path.join(build, 'THIRD_PARTY_LICENSES.txt'), sections.join('\n'));

const entries = {};
function collect(directory, prefix = '') {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = `${prefix}${item.name}`;
    const absolute = path.join(directory, item.name);
    if (item.isDirectory()) collect(absolute, `${relative}/`);
    else entries[relative] = new Uint8Array(fs.readFileSync(absolute));
  }
}
collect(build);
const referenced = [manifest.action.default_popup, manifest.options_ui.page,
  ...Object.values(manifest.icons), ...manifest.content_scripts.flatMap((script) => [...script.js, ...(script.css ?? [])])];
for (const file of referenced) if (!entries[file]) throw new Error(`Manifest references missing file: ${file}`);
const requirePlasmo = createRequire(fs.realpathSync(path.join(root, 'node_modules', 'plasmo', 'package.json')));
const { zipSync, unzipSync } = requirePlasmo('fflate');
const bytes = zipSync(entries, { level: 6 });
const unpacked = unzipSync(bytes);
if (Object.keys(unpacked).length !== Object.keys(entries).length) throw new Error('ZIP round-trip file count differs.');
for (const [file, value] of Object.entries(entries)) {
  if (!Buffer.from(value).equals(Buffer.from(unpacked[file]))) throw new Error(`ZIP round-trip differs: ${file}`);
}
const output = path.join(root, 'dist');
fs.mkdirSync(output, { recursive: true });
const name = `NotRandom.org-v${project.version}.zip`;
fs.writeFileSync(path.join(output, name), bytes);
const hash = createHash('sha256').update(bytes).digest('hex');
fs.writeFileSync(path.join(output, 'SHA256SUMS.txt'), `${hash}  ${name}\n`);
console.log(`Packaged ${Object.keys(entries).length} files, ${visited.size} dependency notices: dist/${name}`);
console.log(`SHA-256: ${hash}`);
