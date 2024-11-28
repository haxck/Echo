import { Database } from 'bun:sqlite';
import express from 'express';
const db = new Database('db.sqlite');

const app = express();

app.get('/api/letters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = db.query(`SELECT * FROM letters WHERE id = ${id}`).get();
    if (!result) {
      res.status(404).json({ error: 'Letter not found' });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
  console.log("/",id)
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.listen(3001, () => {
  console.log('express server run at http://localhost:3001');
});


// console.log(db.query("SELECT * FROM honey_data WHERE id = 10002").get())
