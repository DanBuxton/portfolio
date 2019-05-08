'use strict';

let TreasureHuntGame = function (opt) {
  if (opt) {
    this.game = opt.game;
    this.game.innerHTML = '';
    this.containerElem = opt.container;
    this.scoresElem = opt.highscores;
    this.startBtn = opt.startButton;
    this.restart = opt.restart;
    this.isMulti = opt.multi;

    this.grid = [];
    this.found = 0;
    this.wrongGuesses = 0;

    this.highscores = JSON.parse(localStorage.getItem('scores'));

    this.outputScores();

    this.startBtn.disabled = false;
  }
};

TreasureHuntGame.prototype.start = function () {
  this.game.innerHTML = '';
  this.startBtn.disabled = true;

  if (!this.isMulti.checked) {
    this.basicLevel();
  }
  else {
    let url = '/assets/scripts/tasks/treasureHuntLevels.json';
    if ('fetch' in window) {
      console.log('fetch');
      fetchData(url);
    } else {
      console.log('no fetch - using xml');
      xmlData(url);
    }
  }
}
TreasureHuntGame.prototype.outputScores = function () {
  let h = this.highscores;

  let output = '<table><thead><tr><td>Name</td><td>Score</td><td>Date</td></tr></thead><tbody>';

  if (h)
    for (let i = 0; i < h.length; i++)
      output += '<tr><td>' + h[i].name + '</td><td>' + h[i].score + '</td></tr><td>' + new Date(h[i].date).toLocaleDateString() + '</td>';
  else
    output += '<tr><td colspan="3">No Data</td></tr>';

  output += '</tbody></table>';

  this.scoresElem.innerHTML = output;
}
TreasureHuntGame.prototype.basicLevel = function () {
  // 6x6 grid
  this.game.style.gridTemplate = 'repeat(6, 1fr) / repeat(6, 1fr)';

  this.initializeGrid(6);
  this.items = 4;

  this.grid[1][1] = 1;
  this.grid[2][2] = 1;
  this.grid[3][3] = 1;
  this.grid[4][4] = 1;
}
TreasureHuntGame.prototype.initializeGrid = function (size) {
  let count = 0;
  for (let i = 0; i < size; i++) {
    this.grid[i] = [];
    for (let j = 0; j < size; j++) {
      this.grid[i][j] = 0;
      this.game.innerHTML += '<button id=\'btn' + ++count + '\' class=\'btn\' onclick="g.selectedSquare(this, ' + i + ', ' + j + ')">' + count + '</button>';
    }

    document.getElementsByTagName('html')[0].getAttribute('class').split(' ').forEach(function (e) {
      if (e == 'no-cssgrid') {
        this.game.innerHTML += '<br />';
        return;
      }
    });
  }
}
TreasureHuntGame.prototype.multiLevel = function (data) {
  const levelData = JSON.parse(data);

  console.log('data', levelData);
}
TreasureHuntGame.prototype.selectedSquare = function (b, i, j) {
  console.log('selected', b.id);
  console.log('i', i);
  console.log('j', j);

  if (this.grid[i][j] == '?') {
    confirm('pos ' + i + ',' + j + '\nYou already looked here');
    return;
  } else if (this.grid[i][j] == 0) {
    confirm('pos ' + i + ',' + j + '\nNot found');
    this.wrongGuesses++;
    this.grid[i][j] = '?';
  } else if (this.grid[i][j] == 1) {
    confirm('pos ' + i + ',' + j + '\nYou found something');
    this.found++;
    this.grid[i][j] = '?';
  }

  if (this.found == this.items) {
    confirm('Well done', this.wrongGuesses + ' wrong guesses');
    return;
  } else if (this.wrongGuesses >= 15) {
    confirm('Game over!' + '\nYou didn\'t find all the items');
    // show items
  }
}
TreasureHuntGame.prototype.saveScore = function (score) {
  let name = prompt('Name:');

  do {
    name = prompt('Name:');
  } while (!name);

  const ob = this.highscores.push({ 'name': txtName, 'score': score, 'date': Date() });
  this.highscores.push(ob);
  this.highscores.sort(function (a, b) { (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.date > b.date) ? 1 : -1) : -1 });
  localStorage.setItem('scores', JSON.stringify(this.highscores));
}

function fetchData(url) {
  fetch(url).then(function (response) { g.multiLevel(response.text()) })
    .catch(function (e) {
      console.log('Error', e);
    })
}
function xmlData(url) {
  const req = new XMLHttpRequest();
  req.open('get', url, true);
  req.send();

  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        g.multiLevel(req.responseText);
      } else {
        console.log('Error:', req.status + ' - ' + req.responseText);
      }
    }
  }
}

/*
class TreasureHuntGame {
  constructor(options) {
    if (options) {
      this.game = options.game;
      this.containerElem = options.container;
      this.scoresElem = options.highscores;
      this.restart = options.restart;
      this.isMulti = options.multi;

      this.highscores = JSON.parse(localStorage.getItem('scores'));

      this.outputScores();
    }
  }

  outputScores() {
    let h = this.highscores;

    let output = '<table><thead><tr><td>Name</td><td>Score</td><td>Date</td></tr></thead><tbody>';

    if (h)
      for (let i = 0; i < h.length; i++)
        output += `<tr><td>${h[i].name}</td><td>${h[i].score}</td></tr><td>${new Date(h[i].date).toLocaleDateString()}</td>`;
    else
      output += '<tr><td colspan="3">No Data</td></tr>';

    output += '</tbody></table>';

    this.scoresElem.innerHTML = output;
  }

  start() {
    if (!this.isMulti.checked)
      this.basicLevel();
    else {
      let url = '/assets/scripts/tasks/treasureHuntLevels.json';
      if ('fetch' in window) {
        console.log('fetch');
        this.fetchData(url);
      } else {
        console.log('xml');
        this.xmlData(url);
      }
    };
  }

  basicLevel() {
    // 6x6 grid
    this.game.style.gridTemplate = 'repeat(6, 1fr) / repeat(6, 1fr)';

    this.initializeGrid();

    this.grid[1][3] = 1;
  }

  initializeGrid() {
    this.grid = [[], [], [], [], [], []];

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        this.grid[i][j] = 0;
      }
    }

    return;
  }

  multiLevel(data) {
    const levelData = JSON.parse(data);

    console.log('data', levelData);
  }

  async fetchData(url) {
    this.multiLevel(
      await fetch(url).then(response => response.text())
        .catch(e => {
          console.log(`Error - ${e}`);
        })
    );
  }

  xmlData(url) {
    const req = new XMLHttpRequest();
    req.open('get', url, true);
    req.send();

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          this.multiLevel(req.responseText);
        } else {
          console.log(`Error: ${req.status} - ${req.responseText}`);
        }
      }
    }
  }

  saveScore(score) {
    const ob = this.highscores.push({ name: "Dan Buxton", score: score, date: Date() });
    this.highscores.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.date > b.date) ? 1 : -1) : -1);
    localStorage.setItem('scores', JSON.stringify(this.highscores));
  }
}
*/