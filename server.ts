import { readFileSync, existsSync } from "fs";
import { join } from "path";

const PORT = 3002;
const HTML_PATH = join(import.meta.dir, "index.html");

export function startDesignEditorServer() {
  const server = Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);

      if (req.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

      if (url.pathname === "/" || url.pathname === "/index.html") {
        if (existsSync(HTML_PATH)) {
          const html = readFileSync(HTML_PATH, "utf-8");
          return new Response(html, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      }

      if (url.pathname.startsWith("/assets/")) {
        const filePath = join(import.meta.dir, url.pathname);
        if (existsSync(filePath)) {
          return new Response(Bun.file(filePath));
        }
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`\n🎨 [Single-Surface Design Showroom] running at: http://localhost:${PORT}\n`);
  return server;
}

if (import.meta.main) {
  startDesignEditorServer();
}
