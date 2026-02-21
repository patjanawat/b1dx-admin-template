const { readFileSync, writeFileSync, mkdirSync } = require('node:fs');
const { resolve } = require('node:path');

const root = resolve(__dirname, '..');
const srcPath = resolve(root, 'src', 'tokens.json');
const distDir = resolve(root, 'dist');
const cssPath = resolve(distDir, 'tokens.css');
const jsPath = resolve(distDir, 'index.js');
const dtsPath = resolve(distDir, 'index.d.ts');

const toKebab = (value) => value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const flattenTokens = (input, prefix = []) => {
  const entries = {};
  for (const [key, value] of Object.entries(input)) {
    const nextPrefix = [...prefix, toKebab(key)];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(entries, flattenTokens(value, nextPrefix));
    } else {
      entries[nextPrefix.join('-')] = value;
    }
  }
  return entries;
};

const toTypeLiteral = (input, indent = 0) => {
  const pad = '  '.repeat(indent);
  const lines = ['{'];
  for (const [key, value] of Object.entries(input)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      lines.push(`${pad}  ${key}: ${toTypeLiteral(value, indent + 1)}`);
    } else {
      lines.push(`${pad}  ${key}: string;`);
    }
  }
  lines.push(`${pad}};`);
  return lines.join('\n');
};

const build = () => {
  const raw = readFileSync(srcPath, 'utf8');
  const tokens = JSON.parse(raw);
  const flat = flattenTokens(tokens);

  mkdirSync(distDir, { recursive: true });

  const cssLines = [':root {'];
  for (const [name, value] of Object.entries(flat)) {
    cssLines.push(`  --b1dx-${name}: ${value};`);
  }
  cssLines.push('}');

  const jsContent = `export const tokens = ${JSON.stringify(tokens, null, 2)};\n`;
  const dtsContent = `export type Tokens = ${toTypeLiteral(tokens)}\nexport declare const tokens: Tokens;\n`;

  writeFileSync(cssPath, `${cssLines.join('\n')}\n`, 'utf8');
  writeFileSync(jsPath, jsContent, 'utf8');
  writeFileSync(dtsPath, dtsContent, 'utf8');
};

try {
  build();
} catch (error) {
  console.error('Failed to build tokens:', error);
  process.exit(1);
}
