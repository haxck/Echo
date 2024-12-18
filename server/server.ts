const express = require('express')
const app = express()
const port = 1234

const path = require("path")
const sqlite3 = require('bun:sqlite');
const db = new sqlite3.Database('mydatabase.db');

app.use(express.static(path.join(__dirname, '../dist')))


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  const p = path.join(__dirname,"..","dist","index.html")
  console.log(p)
  res.sendFile(p)
})
app.post('/', (req, res) => {
  res.send('hello world')


// Create a table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS my_table (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)');

// Insert data into the table
app.post('/', (req, res) => {
  const data = req.body.data; // Assuming the data is sent in the request body
  console.log(data)
  db.run('INSERT INTO my_table (data) VALUES (?)', [data]);
  res.send('Data inserted into the database');
});

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})