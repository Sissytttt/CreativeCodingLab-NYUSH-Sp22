p = []

function setup() {
  let cnv1 = createCanvas(600, 600);
  cnv1.parent("sketch1");
  for (let i = 0; i < 20; i ++){
    par = new Particles(random(width), random(-350, 0), random(0.4, 1), random(0.2, 1), random(0.2, 1), 255);
    p.push(par)
  }
}

function draw() {
  background(0);
  for (let i = 0; i < p.length; i ++){
  p[i].display();
    p[i].update();
  }
  
}

class Particles {
  constructor(Xpos, Ypos, velocity, scl, transchange, trans) {
    this.x = Xpos;
    this.y = Ypos;
    this.v = velocity;
    this.scl = scl;
    this.transChange = transchange;
    this.trans = trans;
  }
  display() {
    push();
    fill(255, 255, 255, this.trans)
    translate(this.x, this.y);
    noStroke();
    scale(this.scl, this.scl);
    circle(0, 0, 10);
    circle(0, 8, 10);
    circle(0, 16, 10);
    circle(0, -8, 10);
    circle(0, -16, 10);
    circle(8, 4, 10);
    circle(16, 8, 10);
    circle(-8, 4, 10);
    circle(-16, 8, 10);
    circle(8, -4, 10);
    circle(16, -8, 10);
    circle(-8, -4, 10);
    circle(-16, -8, 10);
    pop();
  }
  
  update(){
    this.y += 1*this.v;
    this.trans -= this.transChange*0.7;
    if (this.trans < 0){
      this.trans = 255;
      this.y = 0;
    }
  }
  
}
