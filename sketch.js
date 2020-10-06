var monkey, monkey_running;
var back, backImage, invisble;
var bananaGroup, bananaImg;
var obstacleGroup, obstacleImg;
var score;

function preload() {
 monkey_running = loadAnimation("Monkey_01.png" , "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
 backImage = loadImage("jungle.png");
 bananaImg = loadImage("banana.png");
 obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(480, 400);
  
  back = createSprite(0, 0, 480, 400);
  back.addImage("jungle_moving",             backImage);
  back.x = back.width/2;
  back.velocityX = -3;
  back.scale = 3;
  monkey = createSprite(70, 345, 10, 10);
  monkey.addAnimation("monkey_running",               monkey_running);
  monkey.scale = 0.1;
  invisible = createSprite(240, 350, 400, 10);
  invisible.visible = false;
  bananaGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}

function draw() {
  background(220);
  
  if (keyDown("space") && monkey.y > 300){
    monkey.velocityY = -17;
  }
  
  if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break; 
    case 40: monkey.scale = 0.18;
      break;
    case 80: monkey.scale = 0.24;
      break;
    case 160: monkey.scale = 0.40;
      break; 
    default: break;
  }
  }
  
  if (obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    score = 0;
    monkey.scale = 0.1;
  }
  
   if (back.x < 0){
    back.x = back.width/2;
  }
  
  
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(invisible);
  spawnbanana();
  spawnObstacles();
  
  drawSprites();
  fill("yellow");
  textSize(12);
  text("Score : " + score, 380,50);

}

function spawnbanana() {
  //write code here to spawn the banana
  if (frameCount % 100 === 0) {
    var banana = createSprite(480,150,10,10);
    banana.y = Math.round(random(100,280));
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 80;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
   
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    var obstacle = createSprite(480,350,10,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.08;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 240;
    
    //adjust the depth
    
    
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}