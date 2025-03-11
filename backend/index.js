import express from 'express';
import pg from 'pg'
import cors from 'cors';


const app = express();
const port = 8080;
const { Client } = pg

// PostgreSQL Client
const client = new Client({
  user: 'myuser',
  password: 'mypassword',
  host: 'postgres',
  database: 'mydb',
  port: 5432,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1); // Exit if database connection fails
  }
}

connectToDatabase();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Routes
app.get('/api/locations', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM public.locations');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/locations', async (req, res) => {
  try {
    const data = req.body;

    // Data Validation (Optional)
    if (!data.name || !data.latitude || !data.longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await client.query(
      'INSERT INTO public.locations (name, address, latitude, longitude, image, biography, episodes, seasons) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.name, data.address, data.latitude, data.longitude, data.image, data.biography, data.episodes, data.seasons]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});