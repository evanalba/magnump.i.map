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
  } else if (req.method === 'POST' && parsedUrl.pathname === '/api/locations') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);

        // console.log(data)

        // Validate the data (optional but recommended)
        // if (!data.name || !data.latitude || !data.longitude) {
        //   res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        //   res.end(JSON.stringify({ error: 'Missing required fields' }));
        //   return;
        // }

        // Insert data into the database
        const result = await client.query(
          'INSERT INTO public.locations (name, address, latitude, longitude, image, biography, episodes, seasons) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
          [data.name, data.address, data.latitude, data.longitude, data.image, data.biography, data.episodes, data.seasons]
        );
        // const result = await client.query(
        //   'INSERT INTO public.locations (name, address, latitude, longitude, image, biography, episodes, seasons) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        //   [
        //     'Ala Moana Beach Park',
        //     '1201 Ala Moana Blvd, Honolulu, HI 96814',
        //     21.28873,
        //     -157.84826,
        //     'https://magnum-mania.com/images/5_18_y.jpg',
        //     'Home to the McCoy Pavilion, is currently used for special events. Also, it is right next to Magic Island where many cultural events are held.',
        //     '{"Round and Around (6.6)": "https://magnum-mania.com/Episodes/Season6/Round_and_Around.html", "Let Me Hear the Music (5.18)": "https://magnum-mania.com/Episodes/Season5/Let_Me_Hear_the_Music.html", "The Treasure of Kalaniopu\'u (6.9)": "https://magnum-mania.com/Episodes/Season6/The_Treasure_of_Kalaniopuu.html"}',
        //     [1], // Pass the JavaScript array directly
        //   ]
        // );
        console.log(result)

        res.writeHead(201, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(result.rows[0]));
      } catch (error) {
        console.error('Error adding location:', error);
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
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
