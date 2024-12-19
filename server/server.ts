const express = require('express')
const app = express()
const port = 1234
const path = require("path")

import { WishlistDatabase } from './db';

const db = new WishlistDatabase('wish.db');

app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.json()); // Middleware to parse JSON data

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  const p = path.join(__dirname,"..","dist","index.html")
  res.sendFile(p)
})

app.post('/api/wishlist', (req, res) => {
  const email = req.body.email; // Assuming the email is sent in the request body
  const ctime = new Date().toISOString(); // Current timestamp
  console.log(email);

  if (db.emailExists(email)) {
    return res.send({ message: "该邮箱已提交过心愿单" });
  } else {
    try {
      const id = db.insert(email, ctime);
      if (!id) {
        return res.send({ message: "服务繁忙，请稍后重试" });
      }
      res.send({ message: "已加入心愿单" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "服务器错误，请稍后重试" });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
