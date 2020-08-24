var trex;
var treximage;
var ground;
var ObstaclesGroup;
var CloudsGroup;
var gameState;
var PLAY;
var END;
var count;
function preload() {
  treximage = loadAnimation("trex_0.png", "trex_1.png", "trex_2.png")

  groundimage = loadAnimation("ground2.png")

  cloudimage = loadAnimation("cloud.png")

  obs1 = loadAnimation("obstacle1.png")
  obs2 = loadAnimation("obstacle2.png")
  obs3 = loadAnimation("obstacle3.png")
  obs4 = loadAnimation("obstacle4.png")
  obs5 = loadAnimation("obstacle5.png")
  obs6 = loadAnimation("obstacle6.png")

}

function setup() {
  createCanvas(400, 400);
  trex = createSprite(50, 330, 20, 60);
  trex.addAnimation("trex", treximage)

  ground = createSprite(200, 380, 400, 20);
  ground.addAnimation("ground", groundimage)

  ground.velocityX = -5;

  ObstaclesGroup = createGroup();
  CloudsGroup = createGroup()

  count = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background(86, 191, 98);
  drawSprites()
  fill("black");
  text("Score: " + count, 250, 100);
  console.log(gameState);
  if (gameState === PLAY) {
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    count = count + Math.round(World.frameRate / 60);
    if (keyDown("space")) {
      trex.velocityY = -12;
    }
    spawnObstacles();
     if (World.frameCount % 60 === 0) {
    cloud = createSprite(400, 320, 40, 10);
    cloud.addAnimation("cloud", cloudimage)
    cloud.y = random(280, 320);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 134;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }

  } else {
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);

    //change the trex animation
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);

  }
  if (ObstaclesGroup.isTouching(trex)) {
    //playSound("jump.mp3");
    gameState = END;
    //playSound("die.mp3");
  }
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(ground);
  trex.scale = 0.5;

}

function spawnObstacles() {
  if (World.frameCount % 60 === 0) {
    var obstacle = createSprite(400, 365, 10, 40);
    obstacle.velocityX = -(6);
    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:

        obstacle.addAnimation("obstacle1", obs1)
        break
      case 2:

        obstacle.addAnimation("obstacle2", obs2)
        break
      case 3:

        obstacle.addAnimation("obstacle3", obs3)
        break
      case 4:

        obstacle.addAnimation("obstacle4", obs4)
        break
      case 5:

        obstacle.addAnimation("obstacle5", obs5)
        break

      case 6:

        obstacle.addAnimation("obstacle6", obs6)
        break
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);

  }
}