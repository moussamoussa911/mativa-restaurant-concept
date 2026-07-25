const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = process.env.PORT || 4402;
const routes = {
  "/": "index.html",
  "/speisekarte": "speisekarte.html",
  "/reservieren": "reservieren.html",
  "/restaurant": "restaurant.html",
  "/rechtliches": "rechtliches.html"
};
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

http.createServer((req, res) => {
  let pathname = "/";
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  } catch {}

  const relative = routes[pathname] || pathname.replace(/^\/+/, "");
  let file = path.resolve(root, relative || "index.html");
  if (!file.startsWith(root)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) file = path.join(root, "404.html");

  const ext = path.extname(file).toLowerCase();
  const status = file.endsWith("404.html") ? 404 : 200;
  const cache = [".jpg", ".jpeg", ".png", ".svg", ".pdf"].includes(ext)
    ? "public, max-age=604800"
    : "no-cache";

  res.writeHead(status, {
    "Content-Type": types[ext] || "application/octet-stream",
    "Cache-Control": cache,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
  });
  fs.createReadStream(file).pipe(res);
}).listen(port, "0.0.0.0", () => {
  console.log(`Mativa concept running on ${port}`);
});
