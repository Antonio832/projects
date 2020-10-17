function setup() {
  c = createCanvas(800, 500);
  c.position(0, 0);
  c.style('z-index', '-1');
  c.style('top', '50%');
  c.style('position', 'absolute');
  c.style('margin-right', '-50%');
  c.style('left', '50%');
  c.style('transform', 'translate(-50%, -50%)');
  background(80);

  push();
  rectMode(CENTER);
  fill(122);
  rect(width / 2, 20, width, 40);
  pop();
  textAlign(CENTER);
  textFont('Georgia');
  textSize(40);
}

let x = 500;
let y = 325;
let Pressed = false;

function draw() {
  background(88);

  push();
  rectMode(CENTER);
  fill(122);
  rect(width / 2, 20, width, 40);
  pop();


  push();
  noStroke();
  text('Lisseth kieres ser mi rukaleta???', width / 2, 120);
  pop();

  push();
  fill(0, 190, 0);
  rect(100, 300, 100, 50);
  textSize(20);
  fill(0);
  text('simon', 150, 330);
  pop();

  push();
  rectMode(CENTER);
  fill(190, 0, 0);
  rect(x, y, 100, 50);
  textSize(20);
  fill(0);
  text('Nel pastel', x, y + 5);
  pop();

  if (mouseX > x - 50 && mouseX < x + 50 && mouseY > y - 25 && mouseY < y + 25) {
    y = random(80, height);
    x = random(width);
  }

  if (Pressed) {
    push();
    rectMode(CENTER);
    fill(247, 191, 190);
    rect(width / 2, height / 2, 250, 100);
    fill(0);
    textSize(16);
    text('t kiero musho ya sabia k si kerias', width / 2, height / 2);
    pop();
  }
}

function mousePressed() {
  if (mouseX > 100 && mouseX < 200 && mouseY > 300 && mouseY < 350) {
    Pressed = true;
  }
}