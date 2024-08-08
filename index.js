import { createServer } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const PORT = 8080;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  let filePath = '';
  let statusCode = 200;
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
      } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
      } else if (req.url === '/contact-me') {
        filePath = path.join(__dirname, 'contact-me.html');
      } else {
        filePath = path.join(__dirname, '404.html');
        statusCode = 404;
      }
      const data = await fs.readFile(filePath);
      res.writeHead(statusCode, { 'Content-Type': 'text/html' }).end(data);
    } else {
      throw new Error('Incorrect request method');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(String(err));
    }
  }
});

server.listen(PORT, () => {
  console.log('Server is running');
});
