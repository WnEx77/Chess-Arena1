const apiUrl = '/api';

// Get players
async function getPlayers() {
  const response = await fetch(`${apiUrl}/players`);
  const players = await response.json();
  displayPlayers(players);
}

// Add player
async function addPlayer() {
  const name = prompt("Enter player name:");
  if (name) {
    const response = await fetch(`${apiUrl}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    getPlayers();
  }
}

// Remove player
async function removePlayer(name) {
  await fetch(`${apiUrl}/players/${name}`, { method: 'DELETE' });
  getPlayers();
}

// Display players
function displayPlayers(players) {
  const playerListDiv = document.getElementById('player-list');
  playerListDiv.innerHTML = '<h2>Players</h2>';
  players.forEach(player => {
    playerListDiv.innerHTML += `
      <div>
        <span>${player.name} - Points: ${player.points}</span>
        <button onclick="removePlayer('${player.name}')">Remove</button>
      </div>
    `;
  });
}

// Get pairings
async function getPairings() {
  const response = await fetch(`${apiUrl}/pairings`);
  const pairings = await response.json();
  displayPairings(pairings);
}

// Display pairings
function displayPairings(pairings) {
  const pairingsDiv = document.getElementById('pairings');
  pairingsDiv.innerHTML = '<h2>Pairings</h2>';
  pairings.forEach(pairing => {
    pairingsDiv.innerHTML += `<div>${pairing[0].name} vs ${pairing[1].name}</div>`;
  });
}

// Get standings
async function getStandings() {
  const response = await fetch(`${apiUrl}/players`);
  const players = await response.json();
  players.sort((a, b) => b.points - a.points);
  const standingsDiv = document.getElementById('standings');
  standingsDiv.innerHTML = '<h2>Standings</h2>';
  players.forEach(player => {
    standingsDiv.innerHTML += `<div>${player.name} - Points: ${player.points}</div>`;
  });
}

// Initial call to fetch players
getPlayers();
