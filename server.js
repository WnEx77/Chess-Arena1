const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const playersFile = path.join(__dirname, 'players.json');

// Load players data from file
function loadPlayers() {
  if (fs.existsSync(playersFile)) {
    const data = fs.readFileSync(playersFile, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

// Save players data to file
function savePlayers(players) {
  fs.writeFileSync(playersFile, JSON.stringify(players, null, 2));
}

// Add a player
app.post('/addPlayer', (req, res) => {
  const players = loadPlayers();
  const newPlayer = req.body;
  players.push(newPlayer);
  savePlayers(players);
  res.status(201).send(newPlayer);
});

// Get all players
app.get('/players', (req, res) => {
  const players = loadPlayers();
  res.json(players);
});

// Generate pairings based on points
app.get('/pairings', (req, res) => {
  const players = loadPlayers();
  players.sort((a, b) => b.points - a.points);
  const pairings = [];
  for (let i = 0; i < players.length; i += 2) {
    if (players[i + 1]) {
      pairings.push([players[i], players[i + 1]]);
    }
  }
  res.json(pairings);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
