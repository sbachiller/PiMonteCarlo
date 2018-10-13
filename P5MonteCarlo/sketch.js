var msg = "PI VALUE: ";
var actualValue = 0;
var insidePoints = 0;
var outsidePoints = 0;
var MCwidth = 400;

var probabilities = []
var normProb = []

function setup() {
  createCanvas(1000,600);
  noFill();
  rect(0,0,MCwidth,MCwidth);
  ellipse(MCwidth/2,MCwidth/2,MCwidth);
  noStroke();

  for (var i = 0; i < 10; i++){
    probabilities[i] = 0;
  }

  for (var i = 0; i < 10; i++){
    normProb[i] = 0;
  }

}

function getRandomPoint(){
  return floor(random(0,MCwidth))
}

function sumArray(arr){
  var sum = 0;
  for (var i=0; i<arr.length; i++){
    sum += arr[i];
  }
  return sum;
}

function drawPoint(x,y){
  noStroke();
  var distance = dist(x,y,MCwidth/2,MCwidth/2);
  if (distance > MCwidth/2){
    fill("red");
    outsidePoints++;
  } else {
    fill("green");
    insidePoints++;
  }
  ellipse(rx,ry,5);
}

function fitNumber(n){
  probabilities[floor(n/40)]++;
}

function draw() {
  //Monte Carlo
  rx = getRandomPoint();
  ry = getRandomPoint();
  drawPoint(rx,ry);

  //Clear text without redrawing every point
  fill("white")
  rect(0,410,MCwidth,200);

  actualValue = 4*insidePoints/(insidePoints+outsidePoints);
  fill("black");
  textSize(20);
  text(msg+actualValue, 20, 450);
  text("Total points: " + (insidePoints+outsidePoints), 20, 470);
  text("Error: " + abs(actualValue-PI)*100/actualValue, 20, 490);

  //Random distribution checking
  fitNumber(rx);
  fitNumber(ry);


  fill("white");
  rect(460, 0,500,500);

  fill("blue");
  stroke("white")
  for (var i = 0; i < probabilities.length; i++){
    rect(500 + i*40, 400, 40, -probabilities[i]*2000/sumArray(probabilities));
    normProb[i] = probabilities[i]/sumArray(probabilities)
  }

  stroke("black")
  line(500,400-sumArray(normProb)/10*2000,900,400-sumArray(normProb)/10*2000)

  textSize(12);
  fill("black")

  for (var i = 0; i < 10; i++){
    text("0."+i, 510 + i*40, 415);
  }


}
