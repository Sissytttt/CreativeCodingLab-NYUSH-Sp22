let width;
let height;


function preload(){
  img = loadImage("page0Tree/Tree.png");
}



function setup() {
  let Canvas = createCanvas(window.innerWidth, window.innerHeight);
  Canvas.parent('canvas-container');
  width = window.innerWidth;
  height = window.innerHeight;
  title = text("EXPLORE", width/2, height/3);
  noCursor();
}

function draw() {
  background(255, 246, 212);
drawHills()
ellipse(mouseX, mouseY, 10, 10);
}


window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w,h);
  // fsize = window.innerHeight/4;
  title.textSize(fsize);
  width = w;
  height = h;
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