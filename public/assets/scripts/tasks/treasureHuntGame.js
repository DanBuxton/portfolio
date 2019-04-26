class TreasureHuntGame {
  constructor(options) {
    if (options) {
      this.game = options.game;
      this.containerElem = options.container;
      this.scoresElem = options.highscores;
      this.restart = options.restart;

      // const scores = [
      //   {
      //     name: 'Daniel Buxton',
      //     score: 60,
      //     date: Date()
      //   },
      //   {
      //     name: 'Daniel Buxton',
      //     score: 55,
      //     date: Date()
      //   }
      // ];

      // localStorage.setItem('scores', JSON.stringify(scores));
      this.highscores = JSON.parse(localStorage.getItem('scores')); // {}

      this.outputScores();
    }
  }

  outputScores() {
    let h = this.highscores;

    let output = '<table><thead><tr><td>Name</td><td>Score</td></tr></thead><tbody>';
    this.highscores = this.highscores.sort(s => s.score);
    for (let i = 0; i < h.length; i++) {
      output += `<tr><td>${h[i].name}</td><td>${h[i].score}</td></tr>`;
    }
    output += '</tbody></table>';

    this.scoresElem.innerHTML = output;
  }

  start() {
    if (false)
      this.basicLevel();
    else {
      let url = '/assets/scripts/games/treasureHuntLevels.json';
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
}
