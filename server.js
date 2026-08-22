const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const ROOT = process.cwd();

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

const server = http.createServer((req, res) => {
    try {
        const parsedUrl = url.parse(req.url);
        let pathname = decodeURIComponent(parsedUrl.pathname);

        if (pathname === '/') {
            pathname = '/index.html';
        }

        // Normalize path and prevent directory traversal
        const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        let filePath = path.join(ROOT, safePath);

        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Not Found');
                return;
            }

            if (stats.isDirectory()) {
                filePath = path.join(filePath, 'index.html');
            }

            fs.readFile(filePath, (readErr, content) => {
                if (readErr) {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('500 Internal Server Error');
                    return;
                }

                const ext = path.extname(filePath).toLowerCase();
                const contentType = MIME_TYPES[ext] || 'application/octet-stream';

                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(content);
            });
        });
    } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Server Error');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
    console.log(`Open your browser and navigate to http://localhost:${PORT}/`);
});
