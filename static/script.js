/** @format */

//canvas 1
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//canvas 2
const canvasbg = document.getElementById("canvasbg");
const ctxbg = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let Bubbles = [];
let bgBubbles = [];

function addBubble() {
  Bubbles.push(new Bubble("#ebadb9", 3));
}
function addBgBubble() {
  bgBubbles.push(new Bubble("#89a4c8", 6));
}
class Bubble {
  constructor(color, ySpeed) {
    this.radius = Math.random() * 150 + 30;
    this.life = true;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * 20 + window.innerHeight + this.radius;
    this.vy = Math.random() * 0.0002 + 0.001 + ySpeed;
    this.vr = 0;
    this.vx = Math.random() * 4 - 2;
    this.color = color;
  }
  update() {
    this.vy += 0.00001;
    this.vr += 0.02;
    this.y -= this.vy;
    this.x += this.vx;
    if (this.radius > 1) {
      this.radius -= this.vr;
    }
    if (this.radius <= 1) {
      this.life = false;
    }
  }
  draw(currentCanvas) {
    currentCanvas.beginPath();
    currentCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    currentCanvas.fillStyle = this.color;
    currentCanvas.fill();
  }
}

function handleBubbles() {
  for (let i = Bubbles.length - 1; i >= 0; i--) {
    Bubbles[i].update();
    if (!Bubbles[i].life) {
      Bubbles.splice(i, 1);
    }
  }
  for (let i = bgBubbles.length - 1; i >= 0; i--) {
    bgBubbles[i].update();
    if (!bgBubbles[i].life) {
      bgBubbles.splice(i, 1);
    }
  }
  if (Bubbles.length < window.innerWidth / 4) {
    addBubble();
  }
  if (bgBubbles.length < window.innerWidth / 12) {
    addBgBubble();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxbg.clearRect(0, 0, canvas.width, canvas.height);

  handleBubbles();

  for (let i = bgBubbles.length - 1; i >= 0; i--) {
    bgBubbles[i].draw(ctxbg);
  }
  for (let i = Bubbles.length - 1; i >= 0; i--) {
    Bubbles[i].draw(ctx);
  }

  requestAnimationFrame(animate);
}

window.addEventListener("load", animate);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasbg.width = window.innerWidth;
  canvasbg.height = window.innerHeight;
  let Bubbles = [];
  let bgBubbles = [];
});

setInterval(function () {
  console.log(Bubbles.length);
}, 1000);
