class NumberGame {
  constructor(params) {
    if (params && params.margin && params.color && params.element) {
      this.hotMargin = params.margin.hot;
      this.coldMargin = params.margin.cold;

      this.winColor = params.color.win;
      this.hotColor = params.color.hot;
      this.coldColor = params.color.none;
      this.noneColor = params.color.cold;

      this.messageContainer = params.element.outputContainer;
      this.gameContainer = params.element.gameContainer;

      this.setup();
    }
  }

  setNumberToGuess() {
    this.numberToGuess = Math.floor(Math.random() * 100 + 1);
    console.log('Number to guess: ' + this.numberToGuess);
  }

  guess(number) {
    if (this.hasBeenGuessed) return;

    if (number !== NaN && (number >= 1 && number <= 100)) {
      let isWithinHotMargin = (number >= this.numberToGuess - this.hotMargin) && (number <= this.numberToGuess + this.hotMargin);
      let isWithinColdMargin = (number >= this.numberToGuess - this.coldMargin) && (number <= this.numberToGuess + this.coldMargin);

      let color;

      this.numberOfGuesses++;

      if (number == this.numberToGuess) {
        // Correct
        this.hasBeenGuessed = true;
        this.message(this.winColor, ['Your guess is Correct!!', 'You have had ' + this.numberOfGuesses + ' guesses to guess it. ', 'Press reset to restart the game']);
        return;
      } else if (isWithinHotMargin) {
        // Hot
        color = this.hotColor;
      } else if (isWithinColdMargin) {
        // Cold
        color = this.coldColor;
      } else {
        // Neither
        color = this.noneColor;
      }

      let message;
      if (this.numberToGuess > number) {
        message = ['Your guess is too low!', 'So far you have had ' + this.numberOfGuesses + ' guesses to guess it. ', 'Have another guess'];
      } else {
        message = ['Your guess is too high!', 'So far you have had ' + this.numberOfGuesses + ' guesses to guess it. ', 'Have another guess'];
      }

      this.message(color, message);
    } else {
      // Not a number or invalid
      this.message(this.hotColor, ['---------------------------------------------', 'Enter a number between 1 and 100', '---------------------------------------------']);
    }
  }

  setup() {
    this.setNumberToGuess();

    this.numberOfGuesses = 0;
    this.hasBeenGuessed = false;

    this.message(this.noneColor, ['---------------------------------------------', 'Enter a number to guess', '---------------------------------------------']);
  }

  message(color, message = []) {
    let elem = this.messageContainer;
    elem.innerHTML = '';

    message.forEach(m => {
      elem.innerHTML += '<p>' + m + '</p>';
    });
    if (color) {
      this.gameContainer.style.backgroundColor = color;
    }
  }
}