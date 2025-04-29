  const letterValues = {
    A: 10, B: 2, C: 4, D: 4, E: 10,
  F: 2, G: 3, H: 3, I: 7, J: 1,
  K: 2, L: 7, M: 3, N: 6, O: 8,
  P: 4, Q: 1, R: 7, S: 7, T: 8,
  U: 4, V: 1, W: 2, X: 1, Y: 2,
  Z: 1
  };
  
  
  let players = {};
  let currentPlayer = null;
  
  const addPlayerBtn = document.getElementById("addPlayerBtn");
  const playersContainer = document.getElementById("playersContainer");
  const wordInput = document.getElementById("wordInput");
  const getScoreBtn = document.getElementById("getScoreBtn");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const scoreBoards = document.getElementById("scoreBoards");

  wordInput.addEventListener("input", () => {
    wordInput.value = wordInput.value.toUpperCase().replace(/[^A-Z]/g, "");
  });
  
  function calculateScore(word) {
    return word.toUpperCase().split('').reduce((sum, char) => sum + (letterValues[char] || 0), 0);
  }
  
  function updateScoreBoard() {
    scoreBoards.innerHTML = "";
  
    for (const [name, scores] of Object.entries(players)) {
      const total = scores.reduce((sum, entry) => sum + entry.score, 0);
  
      const board = document.createElement("div");
      board.className = "scoreBoard";
  
      const title = document.createElement("h3");
      title.textContent = `${name} - ${total} pts`;
      board.appendChild(title);
  
      scores.forEach(entry => {
        const item = document.createElement("div");
        item.className = "scoreItem";
        item.textContent = `${entry.word} - ${entry.score}`;
        board.appendChild(item);
      });
  
      scoreBoards.appendChild(board);
    }
  }
  
  function selectPlayer(name) {
    currentPlayer = name;
    document.querySelectorAll(".playerBox").forEach(el => {
      el.classList.toggle("selected", el.dataset.name === name);
    });
  }
  
  function createPlayer(name) {
    if (players[name]) {
      alert("Player already exists");
      return;
    }
  
    players[name] = [];
  
    const box = document.createElement("div");
    box.className = "playerBox";
    box.dataset.name = name;
    box.textContent = name;
  
    const xBtn = document.createElement("button");
    xBtn.className = "deletePlayer";
    xBtn.textContent = "×";
    xBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      delete players[name];
      if (currentPlayer === name) currentPlayer = null;
      box.remove();
      updateScoreBoard();
    });
  
    box.appendChild(xBtn);
    box.addEventListener("click", () => selectPlayer(name));
    playersContainer.insertBefore(box, addPlayerBtn);
  }
  
  addPlayerBtn.addEventListener("click", () => {
    if (Object.keys(players).length >= 4) {
      alert("Max 4 players");
      return;
    }
    const name = prompt("Enter player name:");
    if (name && !players[name]) {
      createPlayer(name);
      selectPlayer(name);
      updateScoreBoard();
    }
  });
  
  getScoreBtn.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if (!word) return;
  
    if (!currentPlayer) {
      alert("Select a player first");
      return;
    }
  
    const score = calculateScore(word);
    scoreDisplay.textContent = `Score: ${score}`;
    players[currentPlayer].push({ word, score });
    wordInput.value = "";
    updateScoreBoard();
  });
  