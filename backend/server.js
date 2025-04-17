const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Database - Simple JSON storage (you can use a real DB later)
const dbFile = path.join(__dirname, 'database.json');
let players = require(dbFile);

// Get all players
app.get('/api/players', (req, res) => {
  res.json(players);
});

// Add a player
app.post('/api/players', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const newPlayer = { name, points: 0, streak: 0 };
  players.push(newPlayer);
  saveDatabase();
  res.json(newPlayer);
});

// Remove a player
app.delete('/api/players/:name', (req, res) => {
  const { name } = req.params;
  players = players.filter((player) => player.name !== name);
  saveDatabase();
  res.status(200).send();
});

// Pair players based on points
app.get('/api/pairings', (req, res) => {
  players.sort((a, b) => b.points - a.points);
  const pairings = [];
  while (players.length > 1) {
    const player1 = players.shift();
    const player2 = players.shift();
    pairings.push([player1, player2]);
  }
  res.json(pairings);
});

// Update player's points
app.put('/api/players/:name/points', (req, res) => {
  const { name } = req.params;
  const { points } = req.body;
  const player = players.find((p) => p.name === name);
  if (player) {
    player.points += points;
    saveDatabase();
    res.json(player);
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

// Save data to file
function saveDatabase() {
  fs.writeFileSync(dbFile, JSON.stringify(players, null, 2));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
