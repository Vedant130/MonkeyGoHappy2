var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var backGround,backGroundImg


function preload(){

  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backGroundImg = loadImage("jungle.jpg");
}

function setup() {
    createCanvas(400,400);
    
    backGround = createSprite(200,200,10,10);
    backGround.addImage(backGroundImg);
    backGround.velocityX = -5
    backGround.x=backGround.width/2;
  
    monkey = createSprite(80,315,10,10);
    monkey.addAnimation("run", monkey_running);
    monkey.scale = 0.1;
  
    ground = createSprite(400,370,900,10);
    ground.visible = false;
  
    score = 0;
  
    FoodGroup = new Group();
    obstacleGroup = new Group();
}


function draw() {
  
    if (gameState === PLAY) {
      camera.position.x = monkey.x;
      camera.position.y = monkey.y;

      if (backGround.x < 0){
         backGround.x = backGround.width/4;
      }
      
      if (keyDown("space") && monkey.y >= 280){
        monkey.velocityY=-15;
      }
      
      monkey.velocityY = monkey.velocityY+0.8;
      
      monkey.collide(ground);
      
      SpawnObstacles();
      SpawnBanana();
      
      switch(score){
        
       case 10: monkey.scale=0.12;
        break;
       case 20: monkey.scale=0.14;
        break;
       case 30: monkey.scale=0.16;
        break;
       case 40: monkey.scale=0.18;
        break;
       default: break;
     }
      
     if(obstacleGroup.isTouching(monkey)) {
       monkey.scale = 0.1;
       gameState = END;
     }
     
     if(FoodGroup.isTouching(monkey)) {
      score = score+2;
     }
    
     if(monkey.isTouching(FoodGroup)) {
         FoodGroup.destroyEach();
     } 
      
    drawSprites();
  
  } else if(gameState === END) {
    
    fill("black");
    textSize(20);
    text("GAME OVER",150,200);
    
    backGround.velocityX = 0;
    
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
  }
    

  
    fill("white");
    text("Score: "+score,300,50);
  
}

function SpawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400,350,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle)
  }
}

function SpawnBanana() {
  if(frameCount % 80 === 0) {
    banana = createSprite(400,Math.round(random(120,200)),10,10)
    banana.velocityX = -5; 
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    FoodGroup.add(banana)
  }
  
}
