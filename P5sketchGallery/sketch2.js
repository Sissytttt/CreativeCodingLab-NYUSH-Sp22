let baseParticles = [];
let allParticles = [];
let scaleRate = 0.8;
let initAngle;
// let startSize = 5; // circle size
let numberPoints = 4;
let maxLevel = 3;
let initGoLen = 150;
let mousePress;

triangles = [];
// let bp = [];
// function setBranch(level, angle, len){
//   for (let i = 0; i < level; i++){
//     let p1 = new Particle(bp[i].pos.x, bp[i].pos.y);
//     p1.goToPos(i*angle)
//   }
// }

function setup() {
  let cnv2 = createCanvas(600, 600);
  cnv2.parent("sketch2");
  let startX = width / 2;
  let startY = height / 2;
  background(50);
  initAngle = PI / 3;

  //第一层
  let p0 = new Particle(startX, startY);
  baseParticles.push(p0);
  // bp.push(p0);

  //第二层
  for (let i = 0; i < 7; i++) {
    let p1 = new Particle(startX, startY);
    p1.goToPos(i * initAngle, initGoLen);
    baseParticles.push(p1);
  }

  // random points around // 往同一个方向转 or not -- also solve the problem of the empty right corner
  for (let m = 0; m < baseParticles.length; m++) {
    for (let n = 0; n < numberPoints; n++) {
      let p = new Particle(
        random(baseParticles[m].pos.x - 40, baseParticles[m].pos.x + 40),
        random(baseParticles[m].pos.y - 40, baseParticles[m].pos.y + 40)
      );
      // let p = new Particle(baseParticles[m].pos.x, baseParticles[m].pos.y);
      p.targetPos = createVector(
        baseParticles[m].pos.x,
        baseParticles[m].pos.y
      );
      allParticles.push(p);
    }
  }

  for (let m = 0; m < allParticles.length; m++) {
    let p = allParticles[m];
    p.setBasePos();
  }

  for (let i = 0; i < 2; i++) {
    t = new Triangle(0, 0, 50 - 5 * i);
    triangles.push(t);
  }
  for (let i = 0; i < 13; i++) {
    t1 = new Triangle(random(-100, 100), 130, 10);
    // t2 = new Triangle(random(-100 + 5* i, 100 - 5 * i), 60, 30 - 3 * i);
    triangles.push(t1);
    // triangles.push(t2)
  }
}
function draw() {
  background(50);
  // console.log(allParticles[1].a)

  for (let a = 0; a < allParticles.length; a++) {
    let p = allParticles[a];
    p.update();
    p.display();
    p.moveToTarget();
    for (let x = a + 1; x < allParticles.length - 1; x++) {
      let pother1 = allParticles[x];
      let pother2 = allParticles[x + 1];
      p.drawTriangle(pother1, pother2);
    }
  }

  if (mouseIsPressed) {
    for (let a = 0; a < allParticles.length; a++) {
      let p = allParticles[a];
      p.update();
      p.display();
      p.disperse();
    }
  } else if (mouseIsPressed == false) {
    for (let a = 0; a < allParticles.length; a++) {
      let p = allParticles[a];
      p.gather();
      p.display();
    }
  }

  push();
  fill(255, 255, 255, 200);
  translate(width / 2, height / 2);
  if (frameCount > 150) {
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < triangles.length; i++) {
        triangles[i].display();
        triangles[i].update();
      }
      rotate(radians(60));
    }
  }
  if (mouseIsPressed) {
    mousePress = true;
  }
  if (mousePress == true) {
    dis = dist(mouseX, mouseY, width / 2, height / 2);
    if (dis < 80) {
      let spe1 = map(dis, 0, 80, 2, 1);
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < triangles.length; i++) {
          triangles[i].display();
          triangles[i].gather(spe1);
        }
      }
    } else if (dis > 80 && dis < 120) {
      let spe1 = map(dis, 80, 120, 1, 0);
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < triangles.length; i++) {
          triangles[i].display();
          triangles[i].gather(spe1);
        }
      }
    } else if (dis > 120 && dis < 140) {
      let spe2 = map(dis, 120, 140, 0, 1);
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < triangles.length; i++) {
          triangles[i].display();
          triangles[i].disperse(spe2);
        }
      }
    } else if (dis > 140) {
      let spe2 = map(dis, 140, 400, 1, 2);
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < triangles.length; i++) {
          triangles[i].display();
          triangles[i].disperse(spe2);
        }
      }
    }
    pop();

    // print(frameCount)
    // print(allParticles[6].oriPos.x);
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.ori_x = startX;
    this.ori_y = startY;

    this.oriPos = createVector(this.ori_x, this.ori_y);
    this.pos = createVector(this.x, this.y);

    this.size = 15;
    this.connect = 180;
    this.range = 30;

    this.a = random(100);
    this.b = random(100);
    this.noiseFreq = 0.002;

    this.canSetBase = true;
    this.becomeShape = false;

    // this.difference1 = p5.Vector.sub(this.oriPos, this.basePos);
    this.targetPos = createVector(0, 0); // ????

    // this.centerX = centerX;
    // this.centerY = centerY;

    // this.basePos = createVector(this.baseX, this.baseY)
  }
  setBasePos() {
    if (this.canSetBase == true) {
      this.canSetBase = false;
      this.baseX = this.pos.x;
      this.baseY = this.pos.y;
      this.basePos = createVector(this.baseX, this.baseY);
    }
  }
  goToPos(initAngle, initGoLen) {
    let vel = p5.Vector.fromAngle(initAngle, initGoLen);
    this.pos.add(vel);
  }

  moveToTarget() {
    // let center = createVector(this.centerX, this.centerY);
    let difference = p5.Vector.sub(this.targetPos, this.basePos);
    let magnitude = difference.mag();
    let normalizedDifference = difference.normalize().mult(0.3);
    if (difference.mag() > 0) {
      this.basePos.add(normalizedDifference);
    }
  }

  update() {
    let xAdjust = map(noise(this.a), 0, 1, -this.range, this.range);
    this.pos.x = this.basePos.x + xAdjust;
    let yAdjust = map(noise(this.b), 0, 1, -this.range, this.range);
    this.pos.y = this.basePos.y + yAdjust;
    this.a += this.noiseFreq;
    this.b += this.noiseFreq;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, 3, 3);
    pop();
  }
  drawTriangle(other1, other2) {
    for (let i = 0; i < allParticles.length; i++) {
      let d1 = dist(this.pos.x, this.pos.y, other1.pos.x, other1.pos.y); // pos.y?
      let d2 = dist(this.pos.x, this.pos.y, other2.pos.x, other2.pos.y);
      if (
        d1 < this.connect &&
        d2 < this.connect &&
        other1.becomeShape == false &&
        other2.becomeShape == false
      ) {
        other1.becomeShape = true;
        other2.becomeShape = true;
        this.becomeShape = true;
        noStroke();
        // stroke(255);
        fill(255, 255, 255, 5);
        beginShape();
        vertex(this.pos.x, this.pos.y);
        vertex(other1.pos.x, other1.pos.y);
        vertex(other2.pos.x, other2.pos.y);
        endShape();
      } else {
        other1.becomeShape = false;
        other2.becomeShape = false;
        this.becomeShape = false;
      }
    }
  }
  drawLine(other) {
    let dis = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    if (dis < this.connect) {
      stroke(255);
      line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    }
  }
  disperse() {
    this.range += 3;
    // let difference1 = p5.Vector.sub(this.oriPos, this.basePos);
    // let normalizedDifference1 = difference1.normalize().mult(0.8);
    // this.basePos.add(normalizedDifference1);
  }
  gather() {
    if (this.range > 30) {
      this.range -= 1;
    }
  }
}

class Triangle {
  constructor(xpos, ypos, size) {
    this.xPos = xpos;
    this.yPos = ypos;
    this.size = size;
    this.trans = 0;
    this.x1 = random(-this.size, this.size);
    this.y1 = random(-this.size, this.size);
    this.x2 = random(-this.size, this.size);
    this.y2 = random(-this.size, this.size);
    this.x3 = random(-this.size, this.size);
    this.y3 = random(-this.size, this.size);

    this.velX = (this.xPos - 0) / random(100, 2000);
    this.velY = (this.yPos - 0) / random(100, 2000);
  }
  display() {
    noStroke();
    fill(255, 255, 255, this.trans);
    this.p1x = this.x1 + this.xPos;
    this.p1y = this.y1 + this.yPos;
    this.p2x = this.x2 + this.xPos;
    this.p2y = this.y2 + this.yPos;
    this.p3x = this.x3 + this.xPos;
    this.p3y = this.y3 + this.yPos;
    beginShape();
    vertex(this.p1x, this.p1y);
    vertex(this.p2x, this.p2y);
    vertex(this.p3x, this.p3y);
    endShape();
  }
  update() {
    if (this.trans < 255) {
      this.trans += 0.3;
    }
  }
  disperse(speed) {
    this.xPos += this.velX * speed;
    this.yPos += this.velY * speed;
  }
  gather(speed) {
    this.xPos -= this.velX * speed;
    this.yPos -= this.velY * speed;
  }
}

// refereces:
// Vector: learned mostly from Daniel Shiffman's tutorial video Nature Of Code  Chapter 1
//link:
// 1.1 vector: https://www.youtube.com/watch?v=mWJkvxQXIa8&list=PLRqwX-V7Uu6ZwSmtE13iJBcoI-r4y7iEc
//1.2 Pvector class: https://www.youtube.com/watch?v=7nTLzLf7jUg&list=PLRqwX-V7Uu6ZwSmtE13iJBcoI-r4y7iEc&index=2
//1.3 Vector Math: https://www.youtube.com/watch?v=s6b1_3bNCxk&list=PLRqwX-V7Uu6ZwSmtE13iJBcoI-r4y7iEc&index=3
//1.4 Vector Math II: https://www.youtube.com/watch?v=uHusbFmq-4I&list=PLRqwX-V7Uu6ZwSmtE13iJBcoI-r4y7iEc&index=4
