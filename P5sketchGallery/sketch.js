let angle = 0 // need to be a global
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("myContainer")
}

function draw() {
  background(220);
  // let angle = 0  // why can't write it here? 要不然每次loop都是0
  
  let x = width/2 + 100 * sin(radians(angle)) // need let? yes. works without let, but better have 
  angle = angle + 2 
  circle(x, 200, 100)
  
}