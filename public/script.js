document.getElementById('addPlayerBtn').addEventListener('click', addPlayer);
document.getElementById('pairingBtn').addEventListener('click', generatePairings);

let players = [];

function addPlayer() {
  const playerName = prompt('Enter Player Name:');
  if (playerName) {
    const newPlayer = {
      name: playerName,
      points: 0,
      streak: 0,
    };
    players.push(newPlayer);
    renderPlayers();
  }
}

function renderPlayers() {
  const playersTableBody = document.querySelector('#playersTable tbody');
  playersTableBody.innerHTML = '';
  players.forEach((player, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.points}</td>
      <td><button onclick="removePlayer(${index})">Remove</button></td>
    `;
    playersTableBody.appendChild(row);
  });
}

function removePlayer(index) {
  players.splice(index, 1);
  renderPlayers();
}

function generatePairings() {
  players.sort((a, b) => b.points - a.points); // Sort by points descending
  const pairingsTableBody = document.querySelector('#pairingsTable tbody');
  pairingsTableBody.innerHTML = '';
  for (let i = 0; i < players.length; i += 2) {
    if (players[i + 1]) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${players[i].name}</td>
        <td>${players[i + 1].name}</td>
      `;
      pairingsTableBody.appendChild(row);
    }
  }
}

function updateStandings() {
  const standingsTableBody = document.querySelector('#standingsTable tbody');
  standingsTableBody.innerHTML = '';
  players.sort((a, b) => b.points - a.points); // Sort by points
  players.forEach(player => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.points}</td>
      <td>${player.streak}</td>
    `;
    standingsTableBody.appendChild(row);
  });
}
