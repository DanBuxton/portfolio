let FishTankGame = function (options) {
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext('2d');
  this.image = options.image;
  this.imageSize = options.size;
  this.fill = options.fill;
  this.stroke = options.stroke;
  this.clearButton = options.clearButton;

  this.ctx.fillStyle = '#00f';
  this.ctx.fillRect(0, 0, 800, 600);
  this.ctx.fillStyle = '#000';
  this.ctx.fillRect(0, 0, 10, 600);
  this.ctx.fillRect(0, 600, 800, -10);
  this.ctx.fillRect(800, 600, -10, -600);
}
FishTankGame.prototype.draw = function (pos) {
  let image = this.image.value.toLowerCase();
  let size = this.imageSize.value.toLowerCase();
  let stroke = this.stroke.value; // strokeStyle
  let fill = this.fill.value; // fillStyle

  this.ctx.beginPath();

  this.ctx.strokeStyle = stroke;
  this.ctx.fillStyle = fill;

  switch (size) {
    case 's':
      this.ctx.scale(1, 1);
      break;
    case 'm':
      this.ctx.scale(1.5, 1.5);
      pos.x /= 1.5;
      pos.y /= 1.5;
      break;
    case 'l':
      this.ctx.scale(2, 2);
      pos.x /= 2;
      pos.y /= 2;
      break;
  }

  switch (image) {
    case 'funky':
      this.ctx.arc(pos.x, pos.y, 10, 90, 1 * Math.PI, true);
      console.log('Funky', 'Drawn');
      break;
    case 'star':

      console.log('Star', 'Drawn');
      break;
    case 'bubble':
      this.ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI, true);
      console.log('Arc', 'Drawn');
      break;
    case 'ornament':

      console.log('Ornament', 'Drawn');
      break;
  }

  this.ctx.stroke();
  this.ctx.fill();

  switch (size) {
    case 'm':
      this.ctx.scale(.6666666666, .6666666666);
      break;
    case 'l':
      this.ctx.scale(.5, .5);
      break;
  }
  this.ctx.closePath();
}
/*class FishTankGame {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.image = options.image;
    this.imageSize = options.size;
    this.fill = options.fill;
    this.stroke = options.stroke;
    this.clearButton = options.clearButton;

    this.ctx.fillStyle = '#00f';
    this.ctx.fillRect(0, 0, 800, 600);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, 10, 600);
    this.ctx.fillRect(0, 600, 800, -10);
    this.ctx.fillRect(800, 600, -10, -600);
  }
  draw(pos) {
    let image = this.image.value.toLowerCase();
    let size = this.imageSize.value.toLowerCase();
    let stroke = this.stroke.value; // strokeStyle
    let fill = this.fill.value; // fillStyle

    this.ctx.beginPath();

    this.ctx.strokeStyle = stroke;
    this.ctx.fillStyle = fill;

    switch (size) {
      case 's':
        this.ctx.scale(1, 1);
        break;
      case 'm':
        this.ctx.scale(1.5, 1.5);
        pos.x /= 1.5;
        pos.y /= 1.5;
        break;
      case 'l':
        this.ctx.scale(2, 2);
        pos.x /= 2;
        pos.y /= 2;
        break;
    }

    switch (image) {
      case 'funky':
        this.ctx.arc(pos.x, pos.y, 10, 90, 1 * Math.PI, true);
        console.log('Funky', 'Drawn');
        break;
      case 'star':

        console.log('Star', 'Drawn');
        break;
      case 'bubble':
        this.ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI, true);
        console.log('Arc', 'Drawn');
        break;
      case 'ornament':

        console.log('Ornament', 'Drawn');
        break;
    }

    this.ctx.stroke();
    this.ctx.fill();

    switch (size) {
      case 'm':
        this.ctx.scale(.6666666666, .6666666666);
        break;
      case 'l':
        this.ctx.scale(.5, .5);
        break;
    }
    this.ctx.closePath();
  }
}
/**/