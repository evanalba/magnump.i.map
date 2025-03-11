// api/index.js (http)
import http from 'http';
import pg from 'pg';
import url from 'url';


const { Client } = pg
const client = new Client({
  user: 'myuser',
  password: 'mypassword',
  host: 'postgres', // IMPORTANT: DOCKER NETWORK SERVICE NAME!
  database: 'mydb',
  port: 5432
});

// http://localhost:8080/api/locations

await client.connect();

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/api/locations') {
    try {
      const result = await client.query('SELECT * FROM public.locations');
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(result.rows));
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Error fetching locations');
    }
  } else if (req.method === 'OPTIONS' && parsedUrl.pathname === '/api/locations') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});


const port = 8080;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
