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
  // Assuming players array is available
  // Randomly shuffle the players array
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [players[i], players[j]] = [players[j], players[i]]; // Swap elements
  }

  // Get the tbody element where you want to append the rows
  const pairingsTableBody = document.querySelector('#pairingsTable tbody');
  pairingsTableBody.innerHTML = ''; // Clear any existing rows

  // Generate pairings
  for (let i = 0; i < players.length; i += 2) {
    if (players[i + 1]) { // Ensure there's a pair
      const row = document.createElement('tr'); // Create a new table row
      row.innerHTML = `
        <td>${players[i].name}</td>
        <td>${players[i + 1].name}</td>
        <td>
          <button onclick="updateMatchResult(${i}, ${i + 1}, 'player1')">Player 1 Wins</button>
          <button onclick="updateMatchResult(${i}, ${i + 1}, 'player2')">Player 2 Wins</button>
          <button onclick="updateMatchResult(${i}, ${i + 1}, 'draw')">Draw</button>
        </td>
      `;
      pairingsTableBody.appendChild(row); // Append the new row to the tbody
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
