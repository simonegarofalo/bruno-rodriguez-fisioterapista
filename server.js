const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/newsletter", (req, res) => {
  const email = req.body.email;
  if (email) {
    db.run(`INSERT INTO emails (email) VALUES (?)`, [email], (err) => {
      if (err) {
        return res.status(500).send("Errore nel salvataggio");
      }
      res.redirect(`/thank-you.html?email=${encodeURIComponent(email)}`);
    });
  } else {
    res.status(400).send("Email mancante");
  }
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
