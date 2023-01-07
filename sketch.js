const r = d3.randomUniform
const [num, radius] = [100, 150];
const factor = 0.7;
const N = 12;

let [W, H] = [0, 0]
let vPhysics;
let balls;
let paintractor;
let t, s;


function setup() {
  cvs = canvas.getContext("2d");
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  H = height;
  W = width;
  
  vPhysics = new VerletPhysics2D();
  vPhysics.setWorldBounds(new Rect(0,0,W,H));
  vPhysics.setDrag(0.0033);
  
  balls = d3.range(N).map(i => new Ball(200 + Math.random()*(W - 400), 200 + Math.random()*(H - 400)));
  
  for (let ball of balls) {
    vPhysics.addParticle(ball);
    vPhysics.addBehavior(new AttractionBehavior(ball, 32, -0.21));
  }
  
  paintractor = new VerletParticle2D(W/2, H/2);
  vPhysics.addParticle(paintractor);
  vPhysics.addBehavior(new AttractionBehavior(paintractor, 1666, 0.38));
  
  mouseX = width/2;
  mouseY = height/2;
  
  link = createA('https://berkayyilmaz.me/files/berkayyilmaz_resume.pdf', 'Here is my CV','_blank');
  link.position(width/3*1.7-30, 120);
}


function draw() {
  
  //cvs.clearRect(0, 0, cvs.canvas.width, cvs.canvas.height);
  cvs.clearRect(100, 100, cvs.canvas.width-200, cvs.canvas.height-200);
  
  paintractor.set(mouseX, mouseY, 0);
  
  vPhysics.update();

  for (let ball of balls) {
    ball.render()
  }
 
  t = frameCount*0.013;

}

  
class Ball extends VerletParticle2D {
  constructor(x, y) {
    super(x, y);
    
    this.dia = Math.random() < 0.7 ? r(21, 32)() : r(41, 63)() 
    this.color = createVector(Math.random()*255, Math.random()*255, Math.random()*255);
    this.setWeight(map(this.dia, 20, 70, 0.6, 0.5));
  }
  
  render() {
    fill(this.color.x, this.color.y, this.color.z);
    ellipse(this.x, this.y, this.dia, this.dia)
  }
  
}

/*
function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
*/

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}