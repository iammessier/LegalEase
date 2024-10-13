const { createServer } = require('http');
const next = require('next');
const { WebSocketServer } = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Set the port to 4000
const port = process.env.PORT || 4000;

const wss = new WebSocketServer({ noServer: true });

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received:', message);
      ws.send(`You said: ${message}`);
    });
  });

  // Listen on port 4000
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
