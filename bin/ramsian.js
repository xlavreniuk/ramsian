#!/usr/bin/env node

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] || 'help';

const skillPath = join(rootDir, 'SKILL.md');

if (command === 'install' || command === 'add') {
  const targetDir = join(process.cwd(), '.agents/skills/ramsian');
  const targetFile = join(targetDir, 'SKILL.md');

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const content = readFileSync(skillPath, 'utf8');
  writeFileSync(targetFile, content, 'utf8');
  console.log(`✅ Installed ramsian skill into: ${targetFile}`);
  console.log(`💡 You can now prompt any AI agent: "Build this screen using the ramsian skill."`);
} else if (command === 'print' || command === 'spec') {
  const content = readFileSync(skillPath, 'utf8');
  console.log(content);
} else if (command === 'serve' || command === 'preview' || command === 'dev') {
  console.log(`🚀 Launching ramsian design system showroom...`);
  const serverScript = join(rootDir, 'server.ts');
  const proc = spawn('bun', ['run', serverScript], { stdio: 'inherit', cwd: rootDir });
  proc.on('error', () => {
    // Fallback if bun is not found
    const http = require('http');
    const fs = require('fs');
    const server = http.createServer((req, res) => {
      const filePath = join(rootDir, 'index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(filePath));
    });
    server.listen(3002, () => {
      console.log(`🌐 Showroom running on http://localhost:3002/`);
    });
  });
} else {
  console.log(`
🏛️  ramsian — Single-Surface Design System by rezervehere
Universal Apple & Linear single-surface architecture, stroke-free controls, and fluid spring motion design system.

Usage:
  npx ramsian install    Install the master SKILL.md into .agents/skills/ramsian/SKILL.md
  npx ramsian print      Print the full SKILL.md specification to stdout
  npx ramsian preview    Start the interactive design showroom locally (port 3002)
  npx ramsian help       Show this help message

Repository: https://github.com/xlavreniuk/ramsian
Live Showroom: https://xlavreniuk.github.io/ramsian/
`);
}
