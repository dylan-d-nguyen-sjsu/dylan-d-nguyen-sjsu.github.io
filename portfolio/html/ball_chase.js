var ballSize = 40;
var score = 100;
var gameState = "L1";
var gameRunning = true;
var karma = "POINTS: ";
var levelText = "LEVEL ONE";
var goalText = "LEVEL TWO: 200";
var awareness = false;
let cinders = [];

class Cinder {
  constructor() {
    this.posX = 0;
    this.posY = random(height, height*2);
    this.initialAngle = random(0, 360);
    this.size = random(2, 5);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color(random(210, 240), random(110, 160), 0);
  }

  update(time) {
    // Define angular speed (degrees / second)
    let angularSpeed = 35;

    // Calculate the current angle
    let angle = this.initialAngle + angularSpeed * time;

    // x position follows a sine wave
    this.posX = width / 2 + this.radius * sin(angle);

    // Different size cinders rise at different y speeds
    let ySpeed = 8 / this.size;
    this.posY -= ySpeed;

    // When cinder reaches the top, move it to the bottom
    if (this.posY < 0) {
      this.posY = height + 50;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.posX, this.posY, this.size);
  }
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  textSize(20);
  textFont('Times New Roman');
  noStroke();
  angleMode(DEGREES);
  
  ball = {
    pos: createVector(width / 2, 80),
    speed: 5,
  };
  player = {
    pos: createVector(300, 300),
  };
  
  // Make cinders
  for (let i = 0; i < 200; i++) {
    cinders.push(new Cinder());
  }
  
} // end of setup

function draw() {  
  if (gameRunning) {
    // Decrease score
    if(frameCount % 10 == 0 && score > 0){
      score -= 1;
    }
    
    background(220);
    
    // Draw pattern
    for (x = 0; x <= 600; x += 150) {
      for (y = 0; y <= 600; y += 150) {
        translate(x, y);
        fill(200);
        ellipse(0, 0, 110, 110);
        fill(220);
        ellipse(0, 0, 10, 10);
        for (z = 0; z <= 360; z += 45) {
          ellipse(20, 0, 25, 10);
          square(45, -5, 10);
          rotate(z);
        }
        resetMatrix();
      }
    } // Square part of pattern
    for (x = 75/2; x <= 270; x += 75) {
      for (y = 75/2; y <= 270; y += 75) {
        translate(x, y);
        fill(200);
        square(x - 25, y - 25, 50);
        fill(220);
        square(x - 19, y - 19, 38);
        resetMatrix();
      }
    }
    
    // Move ball to mouse
    fill(255);
    ball.pos.add(p5.Vector.sub(player.pos, ball.pos).limit(ball.speed));
    player.pos = createVector(mouseX, mouseY);
    ellipse(ball.pos.x, ball.pos.y, ballSize, ballSize);
    
    fill(0);
    text(karma + score, width/2, 40);
    text(levelText, width/2, height - 40);
    text(goalText, width/2, 80);
  }
    
    if (gameState == "L1") {
      levelOne();
    } else if (gameState == "L2") {
      levelTwo();
    } else if (gameState == "L3") {
      levelThree();
    } else if (gameState == "L4") {
      levelFour();
    } else if (gameState == "L5") {
      levelFive();
    } else if (gameState == "L6") {
      levelSix();
    } else if (gameState == "L7") {
      levelSeven();
    }
    
} // end of draw

function levelOne() {
  var distToBall = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
  if (distToBall < ballSize/2) {
    ball.pos = createVector(random(20, width - 20), random(20, height - 20));
    score = score + 10;
  }
  if (score >= 200) {
    gameState = "L2";
    textFont('Trebuchet MS');
    karma = " OI TS: ";
    levelText = "LEV L TW ";
    goalText = "L VEL T REE: 300";
    ball.speed = 3;
  } 
} // end of level one

function levelTwo() {
  fill(0, 0, 0, 45);
  square(0, 0, 600);
  var distToBall = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
  if (distToBall < ballSize/2) {
    ball.pos = createVector(random(20, width - 20), random(20, height - 20));
    score = score + 10;
  }
  if (score >= 300) {
    textFont('Courier New');
    gameState = "L3";
    karma = " O T : ";
    levelText = " V L    EE";
    goalText = "L  E   O R: 400";
    ball.speed = 1;
  }
} // end of level two

function levelThree() {
  fill(0, 0, 0, 90);
  square(0, 0, 600);
  var distToBall = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
  if (distToBall < ballSize/2) {
    ball.pos = createVector(random(20, width - 20), random(20, height - 20));
    score = score + 10;
  }
  if (score >= 350) {
    gameState = "L4";
    karma = "-";
    levelText = "???";
    goalText = "-300";
    awareness = true;
  } 
} // end of level three

function levelFour() {
  fill(0, 0, 0, 90);
  square(0, 0, 600);
  fill(0);
  text("This floor was once white,", width/2, height/2 - 15);
  text("but now it is ashen...", width/2, height/2 + 15);
  var distToBall = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
  if (distToBall < ballSize/2) {
    ball.pos = createVector(random(20, width - 20), random(20, height - 20));
    score = score + 10;
  }
  if (score <= 300) {
    textFont('Trebuchet MS');
    gameState = "L5";
    ball.speed = 3;
    karma = "K  M : -";
    levelText = "??";
    goalText = "-200";
  } 
} // end of level four

function levelFive() {
  fill(0, 0, 0, 45);
  square(0, 0, 600);
  var distToBall = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
  if (distToBall < ballSize/2) {
    ball.pos = createVector(random(20, width - 20), random(20, height - 20));
    score = score + 10;
  }
  if (score <= 250) {
    ball.speed = 5;
  }
  if (score <= 200) {
    textFont('Times New Roman');
    gameState = "L6";
    karma = "K RMA: -";
    levelText = "?";
    goalText = "-100";
    ball.speed = 7;
  }
} // end of level five

function levelSix() {
  var distToBall = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
  if (distToBall < ballSize/2) {
    ball.pos = createVector(random(20, width - 20), random(20, height - 20));
    score = score + 10;
  }
  if (score <= 100) {
    textFont('Georgia');
    gameState = "L7";
    karma = "KARMA: -"
    levelText = "SAMGHATA";
    goalText = "Cleanse oneself";
    ball.speed = 10;
  }
} // end of level six

function levelSeven() {
  let currentTime = frameCount / 60;
  fill(145, 80, 0, 40);
  square(0, 0, 600);
  var distToBall = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
  if (distToBall < ballSize/2 && gameRunning) {
    ball.pos = createVector(random(20, width - 20), random(20, height - 20));
    score = score + 10;
  }
  
  for (let cinder of cinders) {
    // Update each snowflake position and display
    cinder.update(currentTime);
    cinder.display();
  }
  
  
  if (score <= 0) {
    for (x = 0; x < 255; x++) {
      fill(x);
      square(0, 0, 600);
    }
    fill(0);
    
    gameRunning = false;
    textSize(40);
   
    text("This floor was once white,", width/2, height - 400);
    text("but now it is ashen...", width/2, height/2);
    text("So too is the mind stained.", width/2, height - 200);
  }
} // end of level seven
