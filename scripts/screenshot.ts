import { spawn } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const targetUrl = process.argv[2] || "http://localhost:3002/";
const outputPath = process.argv[3] || resolve(process.cwd(), "assets/preview.png");

// Ensure assets directory exists
const assetsDir = resolve(process.cwd(), "assets");
if (!existsSync(assetsDir)) {
  mkdirSync(assetsDir, { recursive: true });
}

console.log(`📸 Capturing Retina 2x screenshot of ${targetUrl} -> ${outputPath}...`);

// Chrome executable paths
const chromePaths = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser"
];

let chromeBin = chromePaths.find(p => existsSync(p));

if (!chromeBin) {
  console.error("❌ Google Chrome / Chromium executable not found on system.");
  process.exit(1);
}

const chromeArgs = [
  "--headless",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=2",
  "--window-size=1280,1050",
  `--screenshot=${outputPath}`,
  targetUrl
];

const proc = spawn(chromeBin, chromeArgs);

proc.on("close", (code) => {
  if (code === 0) {
    console.log(`✅ Screenshot successfully captured and saved to: ${outputPath}`);
  } else {
    console.error(`❌ Screenshot failed with exit code: ${code}`);
  }
});
