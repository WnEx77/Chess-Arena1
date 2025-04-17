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

// Update match result
app.post('/updateMatchResult', (req, res) => {
  const { player1Index, player2Index, winner } = req.body;
  const players = loadPlayers();

  const winnerPlayer = winner === 'player1' ? players[player1Index] : players[player2Index];
  const loserPlayer = winner === 'player1' ? players[player2Index] : players[player1Index];

  // Update points and streaks
  winnerPlayer.points += 1;
  winnerPlayer.streak += 1;
  loserPlayer.streak = 0;

  savePlayers(players);
  res.status(200).send({ message: 'Match result updated successfully!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
