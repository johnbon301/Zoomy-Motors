import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import db from './database/db-connector.js'

const app = express();
const PORT = 4687;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ credentials: true, origin: 'http://classwork.engr.oregonstate.edu:9995' }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get('/api/bsg_people', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bsg_people;');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Database query failed.');
  }
});

app.get('/api/hello', (req, res) => {
  console.log('hello route');
  res.json({ message: 'Hello, World!' });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}`);
});
