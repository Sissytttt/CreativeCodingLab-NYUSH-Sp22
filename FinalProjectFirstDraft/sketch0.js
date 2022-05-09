let width;
let height;
let flowers = [];
let circles = [];

function preload(){
  img = loadImage("page0Tree/Tree.png");
}



function setup() {
  let Canvas = createCanvas(window.innerWidth, window.innerHeight);
  Canvas.parent('canvas-container');
  width = window.innerWidth;
  height = window.innerHeight;
  // title = text("EXPLORE", width/2, height/3);
  noCursor();

  for (let i = 0; i < 30; i++) {
    flowers.push(new Flower(random(100, width/2), random(0, height/3)));
  }

}

function draw() {
  background(255, 246, 212);
  drawHills()

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].display();
    flowers[i].update();
    flowers[i].interaction();
  }
  
  let f = new Circle(mouseX + random(-10, 10), mouseY + random(-10, 10));
  circles.push(f);

  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    if (circles[i].trans <= 0){
      circles.splice(i, 1);
}
}

  // background(255, 246, 212, trans);
}


class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(20, 30)
    this.transTop = 50;
    this.trans = 0
    this.appear = true;
  }

  display() {
    noStroke();
    push();
    colorMode(HSB, 100);
    fill(random(85, 100), random(20, 70), 100, this.trans);
    circle(this.x, this.y, this.r)
    pop();
    if (this.appear == true){
    this.trans += 5
    }
    else if (this.appear == false){
    this.trans -= 5
    }
    
    if (this.trans > this.transTop){
      this.appear = false
    }
    // tint(255, this.trans);
    // image(img, this.x, this.y);
// this.trans -= 10
  }
}




function drawHills(){
  noStroke();
  
  // biggist 1
  fill(187, 219, 162);
  beginShape();
  curveVertex(-width/4, height);
  curveVertex(-width/4, height);
  curveVertex(width/3, height - 400); 
  curveVertex(width/1.2, height); 
  curveVertex(width/1.2, height); 
  endShape();

  // blue one
  fill(138, 207, 184);
  beginShape();
  curveVertex(width/3, height);
  curveVertex(width/3, height); 
  curveVertex(width/2, height - 200); 
  curveVertex(width/1.5, height - 200); 
  curveVertex(width/1.1, height - 370);
  curveVertex(width + width/6, height);
  curveVertex(width + width/6, height);
  endShape();

  // middle
  fill(145, 191, 142)
  beginShape();
  curveVertex(width/5, height);
  curveVertex(width/5, height); 
  curveVertex(width/2.5, height - 200); 
  curveVertex(width/1.7, height - 130); 
  curveVertex(width/1.3, height);
  curveVertex(width/1.3, height);
  endShape();

  // right 3
  fill(118, 171, 104)
  beginShape();
  curveVertex(-width/5, height);
  curveVertex(-width/5, height);
  curveVertex(width/13, height - 370); 
  curveVertex(width/3.4, height - 160); 
  curveVertex(width/2.5, height - 130); 
  curveVertex(width/2, height);
  curveVertex(width/2, height);
  endShape();

  // right 2
  fill(50, 112, 62)
  beginShape();
  curveVertex(-width/4, height);
  curveVertex(-width/4, height);
  curveVertex(width/17, height - 270); 
  curveVertex(width/3.4, height); 
  curveVertex(width/3.4, height); 
  endShape();

  image(img, 0, 0, 1200, 1000) 

  // right 1
  fill(13,84,39);
  beginShape();
  curveVertex(-width/10, height);
  curveVertex(-width/10, height);
  curveVertex(0, height - 150); // 150
  curveVertex(width/16, height - 180); // 180
  curveVertex(width/6.7, height - 80); // 80
  curveVertex(width/4.7, height - 90); // 100
  curveVertex(width/3.7, height);
  curveVertex(width/3.7, height);
  endShape();

  fill(80, 117, 46);
  beginShape();
  curveVertex(width + width/4, height);
  curveVertex(width + width/4, height);
  curveVertex(width - width/6, height - 200); 
  curveVertex(width - width/2.5, height); 
  curveVertex(width - width/2.5, height); 
  endShape();

  fill(23,69,38)
  beginShape();
  curveVertex(width + width/10, height);
  curveVertex(width + width/10, height);
  curveVertex(width, height - 150); // 150
  curveVertex(width - width/16, height - 150); // 180
  curveVertex(width - width/7, height - 80); // 80
  curveVertex(width - width/5, height - 50); // 100
  curveVertex(width - width/4, height);
  curveVertex(width - width/4, height);
  endShape();


  
}




class Flower {
  constructor(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
    this.baseX = xpos;
    this.baseY = ypos;
    push();
    colorMode(HSB, 100);
    this.color = color(random(85, 100), random(20, 70), 100, random(40, 90));
    pop();
    this.r = random(40, 80);
    this.noisex = random(20);
    this.noisey = random(20);
    this.range = 20;

    this.canPlay = true;
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.r);
  }
  update() {
    this.x =
      this.baseX + map(noise(this.noisex), 0, 1, -this.range, this.range);
    this.y =
      this.baseY + map(noise(this.noisey), 0, 1, -this.range, this.range);
    this.noisex += 0.001;
    this.noisey += 0.001;
  }
  interaction() {
    if (dist(mouseX, mouseY, this.x, this.y) < 3 * this.r) {
      this.range += 1;
    } else {
      this.range -= 1;
      if (this.range <= 20) {
        this.range = 20;
      }
    }
  }
}
