let speed = 0;
let c;
let acc;
let angle;
let option = 2;
let elements;
let absangle;
let dataProjects;

function preload() {
  dataProjects = loadJSON("projects.json");
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');
  stroke(0);
  angleMode(DEGREES);
  acc = random(5);
  angle = random(100000);
  elements = dataProjects.projectsAr.length;
  absangle = 360 / elements;
  textSize(32);
  textAlign(CENTER);
}

function draw() {

  if (speed > angle) {
    noLoop();
  }
  background(77);
  if (option === 1) {


    translate(width / 2, height / 2);

    

    push();
    //ellipse(0, 0, 800);
    rotate(speed);
    strokeWeight(5);
    line(0, 0, 0, 350);
    pop();
    speed = speed + acc;
    acc += 1;

    push();
    if (elements > 1) {
      for (let i = 0; i < elements; i++) {
        line(0, 0, 0, 400);
        rotate(absangle);
      }
    }
    pop();

  } else { //=============================================== Main Part ==============================================
    translate(width / 2, height / 2);

    push();

    rotate(speed);
    speed += acc;
    acc += 1;

    push();
    if (elements > 1) {
      for (let i = 0; i < elements; i++) {
          
        
        rotate(absangle);
        push();
        fill(dataProjects.projectsAr[i].r, dataProjects.projectsAr[i].g, dataProjects.projectsAr[i].b);
        arc(0,0,800,800,0,absangle);
        pop();

        push();
        fill(0);
        rotate(absangle / 2 + 2);
        text(dataProjects.projectsAr[i].nombre, 200, 0);
        pop(); //push for color and names rotation        
      
      }
    }
    pop(); //push for rendering

    pop(); //push for rotation

    //Aguja
    push();

    fill(255, 0, 0);
    triangle(-25, -425, 25, -425, 0, -380);

    pop();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    angle = random(100000);
    speed = 0;
    acc = 0;
    loop();
  }
  if (keyCode == LEFT_ARROW) {
    angle = random(100000);
    option = 1;
    loop();
    acc = 0;
    speed = 0;
  }
  if (keyCode == RIGHT_ARROW) {
    option = 2;
    loop();
    speed = 0;
    acc = 0
    angle = random(10000);
  }
}
