import express from 'express';
import pg from 'pg'
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'


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

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})
app.use(limiter) // Apply the rate limiting middleware to all requests.

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

app.delete('/api/locations/:id', async (req, res) => {
  try {
    const locationId = req.params.id;

    // Validate the ID (Optional)
    if (!Number.isInteger(Number(locationId))) {
      return res.status(400).json({ error: 'Invalid location ID' });
    }

    const result = await client.query(
      'DELETE FROM public.locations WHERE id = $1 RETURNING *',
      [locationId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.status(200).json({ message: 'Location deleted successfully', deletedLocation: result.rows[0] });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/locations', async (req, res) => {
  try {
    await client.query('DELETE FROM public.locations');
    res.status(200).json({ message: 'All locations deleted successfully' });
  } catch (error) {
    console.error('Error deleting all locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/locations/:id', async (req, res) => {
  try {
    const locationId = req.params.id;
    const updatedData = req.body;

    const result = await client.query(
      'UPDATE public.locations SET name = $1, address = $2, latitude = $3, longitude = $4, image = $5, biography = $6, episodes = $7, seasons = $8 WHERE id = $9 RETURNING *',
      [
        updatedData.name,
        updatedData.address,
        updatedData.latitude,
        updatedData.longitude,
        updatedData.image,
        updatedData.biography,
        updatedData.episodes,
        updatedData.seasons,
        locationId,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});