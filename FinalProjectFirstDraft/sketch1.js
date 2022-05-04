let width;
let height;

// hill 1
let hill1canPlay = true;
let hill1SoundDrum;
let hill1SoundIsPlaying = false;

// hill 2
let hill2canPlay = true;
let hill2SoundDrum;
let hill2SoundIsPlaying = false;

// hill 3
let hill3canPlay = true;
let hill3SoundDrum;
let hill3SoundIsPlaying = false;

// sun
let canChange = true;
let sunx;
let suny;
let sunset;
let sunSound1Vol = 0;
let sunSound2Vol = 0;

let sunSoundIsPlaying = false;

let sunSound1;
let sunSound2;

// tree
let flowers = [];


function preload() {
  //hills
  hill1SoundDrum = loadSound("HillSound/hill1_drum.wav");
  hill2SoundKick = loadSound("HillSound/hill2_kick.wav");
  hill3SoundHihat = loadSound("HillSound/hill3_hihat.mp3");

  //sun
  sunSound1 = loadSound("SunSound/sun1.mp3");
  sunSound2 = loadSound("SunSound/sun2.mp3");

  // tree
  treeSound = loadSound("TreeSound/piano.mp3");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  width = window.innerWidth;
  height = window.innerHeight;
  console.log(width)
  // hills
  hill1 = new Hill1(width/5, height);
  hill2 = new Hill2(width*2/3.5, height);
  hill3 = new Hill3(width*3/4, height);

  // sun
  sunx = width*4/5
  suny = height/4
  sunset = new SunSet(sunx, suny);
  sunset.setupSuns();

  // tree
  for (let i = 0; i < 25; i++) {
    flowers.push(new Flower(random(width/3 - width/10, width/3 + width/10), random(height - height/6, height - height/1.9)));
  }
}

function draw() {
  background(255, 246, 212);

  // Hills
  hill2.display();
  hill2.jump();
  hill2.interaction();

  hill3.display();
  hill3.jump();
  hill3.interaction();

  hill1.display();
  hill1.jump();
  hill1.interaction();

  // Sun
  sunset.movement();
  sunset.playSuns();
  sunController();

  //Tree

  drawTrunk(width/3, height);

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].display();
    flowers[i].update();
    flowers[i].interaction();
  }


  // stroke(0)
  // line(width/5 - width/12, 0, width/5 - width/12, height)
  // line(width/5 + width/8, 0, width/5 + width/8, height)
  // line(0, height - height/8, width, height - height/8)

  // line(0, height - height/50, width, height - height/50)
  // line(0, height - height/6, width, height - height/6)
  // line(width*2/3.5 - width/8, 0, width*2/3.5 - width/8, height)
  // line(width*2/3.5 + width/8, 0, width*2/3.5 + width/8, height)

  // line(width*3/4 - width/8, 0, width*3/4 - width/8, height)
  // line(width*3/4 + width/8, 0, width*3/4 + width/8, height)
}

// ----------------------------Sun---------------------------------
class Sun {
  constructor(xpos, ypos) {
    this.centX = xpos;
    this.centY = ypos;
    this.baseX = xpos;
    this.baseY = ypos;
    this.size = random(width/20, width/10);
    this.r = this.size;
    push();
    colorMode(HSB, 100);
    this.col = color(random(1, 15), 100, 100, random(20, 40));
    pop();
    this.noisex = random(20);
    this.noisey = random(20);
    this.noisesize = random(20);
    this.range = 30;
    // this.sunPlay = false;
  }

  display() {
    noStroke();
    fill(this.col);
    circle(this.centX, this.centY, this.r);
  }

  update() {
    this.centX = this.baseX + map(noise(this.noisex), 0, 1, -1, 1) * this.range;
    this.centY = this.baseY + map(noise(this.noisey), 0, 1, -1, 1) * this.range;
    this.r = this.size * map(noise(this.noisesize), 0, 1, 1, 2);
    this.noisex += 0.005;
    this.noisey += 0.005;
    this.noisesize += 0.01;
  }
}

class SunSet {
  constructor(x, y) {
    this.sunPosx = x;
    this.sunPosy = y;
    this.numSuns = 10;
    this.suns = [];
    this.sunPlay = false;
  }

  setupSuns() {
    for (let i = 0; i < this.numSuns; i++) {
      this.suns.push(new Sun(this.sunPosx, this.sunPosy));
    }
  }

  playSuns() {
    if (this.sunPlay) {
      for (let i = 0; i < this.suns.length; i++) {
        this.suns[i].display();
        this.suns[i].update();
      }
    } else {
      for (let i = 0; i < this.suns.length; i++) {
        this.suns[i].display();
      }
    }
  }
  movement() {
    if (mouseIsPressed) {
      if (dist(mouseX, mouseY, this.sunPosx, this.sunPosy) < 70) {
        if (this.sunPlay == false && canChange) {
          canChange = false;
          this.sunPlay = true;
        } else if (this.sunPlay == true && canChange) {
          canChange = false;
          this.sunPlay = false;
        }
      }
    }
  }
}

function sunController() {
  if (sunset.sunPlay && sunSoundIsPlaying == false) {
    sunSound1.setVolume(sunSound1Vol);
    sunSound1.loop();
    sunSound2.setVolume(sunSound2Vol);
    sunSound2.loop();
    // sunSound2.loop();
    sunSoundIsPlaying = true;
  }

  if (sunset.sunPlay && sunSoundIsPlaying == true) {
    sunSound1.setVolume(sunSound1Vol);
    sunSound2.setVolume(sunSound2Vol);
    if (sunSound1Vol < 0.1) {
      sunSound1Vol += 0.005;
    }
    if (sunSound2Vol < 0.1) {
      sunSound2Vol += 0.005;
    }
  }

  if (sunset.sunPlay == false && sunSoundIsPlaying == true) {
    sunSound1.setVolume(sunSound1Vol);
    sunSound2.setVolume(sunSound2Vol);
    // sunSound2.pause();
    sunSoundIsPlaying = false;
  }

  if (sunset.sunPlay == false && sunSoundIsPlaying == false) {
    sunSound1.setVolume(sunSound1Vol);
    if (sunSound1Vol > 0) {
      sunSound1Vol -= 0.005;
    }
    if (sunSound1Vol < 0) {
      sunSound1.pause();
    }

    if (sunSound2Vol > 0) {
      sunSound2Vol -= 0.005;
    }
    if (sunSound2Vol < 0) {
      sunSound2.pause();
    }
  }
}

// ------------------------------Hills-----------------------------
class Hill1 {
  constructor(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
    this.h = 0;
    this.up = false;
    this.vel = 7;
    this.accel = 0.5;
    this.canplay = true;

    this.clickTime = [];
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(142, 163, 85);
    beginShape();
    curveVertex(-width/6, 0);
    curveVertex(-width/6, 0);
    curveVertex(0, -height/7 - this.h);
    curveVertex(width/4, 0);
    curveVertex(width/4, 0);
    endShape();

    pop();
  }

  jump() {
    if (this.up) {
      this.h += this.vel;
      if (hill1SoundIsPlaying == false) {
        hill1SoundDrum.play();
        hill1SoundIsPlaying = true;
      }
      if (this.h <= 0) {
        this.up = false;
        hill1SoundIsPlaying = false;
        this.vel = 5;
      }
      this.vel -= this.accel;
    }
  }

  interaction() {
    if (mouseIsPressed) {
      if (
        mouseX > this.x - width/12 &&
        mouseX < this.x + width/8 &&
        mouseY < height &&
        mouseY > height - height/8
      ) {
        this.clickTime.push(millis());

        if (hill1canPlay) {
          hill1canPlay = false;
          this.up = true;
        } else if (hill1canPlay) {
          hill1canPlay = false;
          this.up = false;
        }
      }
    }
    for (let i = 0; i < this.clickTime.length; i++) {
      if (
        (millis() - this.clickTime[i]) % 2000 > 0 &&
        (millis() - this.clickTime[i]) % 2000 < 100
      ) {
        this.up = true;
      }
    }
  }
}

class Hill2 {
  constructor(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
    this.h = 0;
    this.up = false;
    this.vel = 7;
    this.accel = 0.5;
    this.canplay = true;

    this.clickTime = [];
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(127, 176, 84);
    beginShape();
    curveVertex(-width/4, 0);
    curveVertex(-width/4, 0);
    curveVertex(-width/32, -height/5 - this.h);
    curveVertex(width/4, 0);
    curveVertex(width/4, 0);
    endShape();
    pop();
  }

  jump() {
    if (this.up) {
      this.h += this.vel;
      if (hill2SoundIsPlaying == false) {
        hill2SoundKick.play();
        hill2SoundKick.setVolume(0.2)
        hill2SoundIsPlaying = true;
      }
      if (this.h <= 0) {
        this.up = false;
        hill2SoundIsPlaying = false;
        this.vel = 5;
      }
      this.vel -= this.accel;
    }
  }

  interaction() {
    if (mouseIsPressed) {
      if (
        mouseX > this.x - width/8 &&
        mouseX < this.x + width/8 &&
        mouseY < height - height/50 &&
        mouseY > height - height/6
      ) {
        this.clickTime.push(millis());

        if (hill2canPlay) {
          hill2canPlay = false;
          this.up = true;
        } else if (hill2canPlay) {
          hill2canPlay = false;
          this.up = false;
        }
      }
    }
    for (let i = 0; i < this.clickTime.length; i++) {
      if (
        (millis() - this.clickTime[i]) % 2000 > 0 &&
        (millis() - this.clickTime[i]) % 2000 < 100
      ) {
        this.up = true;
      }
    }
  }
}

class Hill3 {
  constructor(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
    this.h = 0;
    this.up = false;
    this.vel = 7;
    this.accel = 0.5;
    this.canplay = true;

    this.clickTime = [];
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(85, 158, 122);
    beginShape();
    curveVertex(width/4, 0);
    curveVertex(width/4, 0);
    curveVertex(width/20, -height/7 - this.h);
    curveVertex(-width/4, 0);
    curveVertex(-width/4, 0);
    endShape();
    pop();
  }

  jump() {
    if (this.up) {
      this.h += this.vel;
      if (hill3SoundIsPlaying == false) {
        hill3SoundHihat.play();
        hill3SoundIsPlaying = true;
      }
      if (this.h <= 0) {
        this.up = false;
        hill3SoundIsPlaying = false;
        this.vel = 5;
      }
      this.vel -= this.accel;
    }
  }

  interaction() {
    if (mouseIsPressed) {
      if (
        mouseX > this.x - width/8 &&
        mouseX < this.x + width/8 &&
        mouseY < height &&
        mouseY > height - height/8
      ) {
        this.clickTime.push(millis());

        if (hill3canPlay) {
          hill3canPlay = false;
          this.up = true;
        } else if (hill3canPlay) {
          hill3canPlay = false;
          this.up = false;
        }
      }
    }
    for (let i = 0; i < this.clickTime.length; i++) {
      if (
        (millis() - this.clickTime[i]) % 2000 > 0 &&
        (millis() - this.clickTime[i]) % 2000 < 100
      ) {
        this.up = true;
      }
    }
  }
}

// -------------------------------Tree---------------------------------
function drawTrunk(xpos, ypos) {
  //画树枝摇晃的赶脚
  let noiseFac1 = random(10);
  let noiseFac2 = random(10);
  let noiseFac3 = random(10);
  push();
  noStroke();
  translate(xpos, ypos);
  scale(2, 2);
  // circle(100, 100, 100);
  fill(95, 62, 20);
  triangle(-10, 0, 10, 0, 20, -230);
  fill(133, 96, 48);
  triangle(-1, 0, 10, 0, 20, -230);

  //左下
  triangle(-100, -150, 10, -100, 10, -110);

  //左上
  triangle(-30, -250, 12, -130, 15, -150);

  //右
  triangle(70, -170, 10, -70, 10, -90);
  pop();
}

// function drawBranch(xpos, ypos){
//   push();
//   noStroke();
//   translate(xpos, ypos);
//   rotate(noise())
// }

class Flower {
  //限制花花的运动范围
  //range + base
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

    this.osc = new p5.Oscillator('sine');

    this.rate = [0.3, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5]
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
    if (dist(mouseX, mouseY, this.x, this.y) < this.r / 2) {
      if (this.canPlay == true) {
        treeSound.play();
        treeSound.rate(random(this.rate));
        // this.osc.start();
        // this.osc.freq(random(200, 400), 0.1);
        this.canPlay = false;
        treeSound.setVolume(0.1);
      }
    }
    if (dist(mouseX, mouseY, this.x, this.y) > this.r / 2) {
      // this.osc.amp(0, 0.5);
      this.canPlay = true;
    }
  }
  // collide(other) {
  //   if (dist(other.x, other.y, this.x, this.y) < 2 * this.r) {
  //     print("Y")
  //   }
  // }
}

// function mouseClicked() {
//   treeSound.play();
//   treeSound.rate(1.8); // 0.4-1.8
//   let vol = 0.1
//   treeSound.setVolume(vol);
// }

function mouseReleased() {
  hill1canPlay = true;
  hill2canPlay = true;
  hill3canPlay = true;
  canChange = true;
}
