"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const PORT = process.env.PORT || 8080;
// Resolve root project directory (handle both running from root or dist/)
const ROOT = fs_1.default.existsSync(path_1.default.join(process.cwd(), 'index.html'))
    ? process.cwd()
    : path_1.default.resolve(__dirname, '..');
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm'
};
const server = http_1.default.createServer((req, res) => {
    try {
        const parsedUrl = new url_1.URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
        let pathname = decodeURIComponent(parsedUrl.pathname);
        if (pathname === '/') {
            pathname = '/index.html';
        }
        // Normalize path and prevent directory traversal
        const safePath = path_1.default.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        let filePath = path_1.default.join(ROOT, safePath);
        fs_1.default.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Not Found');
                return;
            }
            if (stats.isDirectory()) {
                if (!pathname.endsWith('/')) {
                    res.writeHead(301, { 'Location': pathname + '/' });
                    res.end();
                    return;
                }
                filePath = path_1.default.join(filePath, 'index.html');
            }
            fs_1.default.readFile(filePath, (readErr, content) => {
                if (readErr) {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('500 Internal Server Error');
                    return;
                }
                const ext = path_1.default.extname(filePath).toLowerCase();
                const contentType = MIME_TYPES[ext] || 'application/octet-stream';
                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(content);
            });
        });
    }
    catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Server Error');
    }
});
server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
    console.log(`Open your browser and navigate to http://localhost:${PORT}/`);
});
