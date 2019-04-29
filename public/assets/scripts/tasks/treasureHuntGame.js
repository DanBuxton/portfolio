'use strict';

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
    let grid = [,];
    grid[1][2] = "";
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
