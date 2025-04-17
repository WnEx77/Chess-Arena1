document.getElementById('addPlayerBtn').addEventListener('click', addPlayer);
document.getElementById('pairingBtn').addEventListener('click', generatePairings);

let players = [];
let rounds = [];

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
  const round = document.getElementById('roundSelector').value;
  const totalRounds = document.getElementById('roundsCount').value;
  players.sort((a, b) => b.points - a.points); // Sort by points descending
  const pairingsTableBody = document.querySelector('#pairingsTable tbody');
  pairingsTableBody.innerHTML = '';
  
  const pairings = [];
  for (let i = 0; i < players.length; i += 2) {
    if (players[i + 1]) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${players[i].name}</td>
        <td>${players[i + 1].name}</td>
        <td>
          <button onclick="updateMatchResult(${i}, ${i + 1}, 'player1')">Player 1 Wins</button>
          <button onclick="updateMatchResult(${i}, ${i + 1}, 'player2')">Player 2 Wins</button>
          <button onclick="updateMatchResult(${i}, ${i + 1}, 'draw')">Draw</button>
        </td>
      `;
      pairingsTableBody.appendChild(row);
    }
  }
}

function updateMatchResult(player1Index, player2Index, result) {
  const player1 = players[player1Index];
  const player2 = players[player2Index];

  if (result === 'player1') {
    player1.points += 1;
    player1.streak += 1;
    player2.streak = 0;
  } else if (result === 'player2') {
    player2.points += 1;
    player2.streak += 1;
    player1.streak = 0;
  } else if (result === 'draw') {
    player1.points += 0.5;
    player2.points += 0.5;
  }

  renderPlayers();
  updateStandings();
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
