//Create variables here
var dog;//happyDog;
var dogImage,happyDogImage;

var milkBottleImage

var database;

var foodS, foodStock;

var fedTime,lastFed;

var foodObj;

var feedDogButton,addFoodButton;

var gameState,gameStateRef,gameStateUpdate;

var bedroomImage,gardenImage,washroomImage,sadDogImage;

function preload()
{
	//load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
  bedroomImage = loadImage("virtual pet images/Bed Room.png");
  gardenImage = loadImage("virtual pet images/Garden.png");
  washroomImage = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

  //foodStock = database.ref("Food");
  //foodStock.on("value",readStock);

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
  lastFed = data.val();
});

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  
  foodObj = new food();
  foodObj.getFoodStock();

  feedDogButton = createButton("Feed the dog");
  feedDogButton.position(500,100);
  feedDogButton.mousePressed(feedDog);

  addFoodButton = createButton("Add food for the dog");
  addFoodButton.position(600,100);
  addFoodButton.mousePressed(addFood);

  gameStateRef = database.ref("gameState");
  gameStateRef.on("value",function(data){
  gameState = data.val();
});
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();
  console.log(gameState);

  if(gameState==="Hungry"){
    feedDogButton.show()
    addFoodButton.show()
    dog.visible = true
  }else if(gameState!=="Hungry"){
    feedDogButton.hide()
    addFoodButton.hide()
    dog.visible = false
  }

  currentTime = hour();
  if(currentTime===(lastFed+1)){
     update("Playing")
     foodObj.garden()
  }else if(currentTime===(lastFed+2)){
    update("Sleeping")
    foodObj.bedroom()
  }else if(currentTime>(lastFed+2) && currentTime<(lastFed+4)){
    update("Bathing")
    foodObj.washroom()
  }else{
    update("Hungry")
    foodObj.display();
  }
  
  //if(keyCode===UP_ARROW){
  //  writeStock(foodS);
  //  dog.addImage(happyDogImage);
  //}
  //textSize(25);
  //fill("blue");
  //stroke("blue");
  //text("Press UP arrow to feed the dog milk",60,150)
  //text("Food Remaining:"+foodS,140,200);

  drawSprites();
  //add styles here
}

//function readStock(data){
//  foodS = data.val();
//}

//function writeStock(x){
//  database.ref("/").update({foodS:x});
//}

function addFood(){
  if(foodObj.foodStock<20){
    foodObj.foodStock = foodObj.foodStock+1;
  }
    database.ref("/").update({
      Food:foodObj.foodStock
    })
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObj.deductFood();
  foodObj.updateFoodStock(foodObj.foodStock);
  database.ref("/").update({
    FeedTime:hour()
  })
  //database.ref("/").updateFoodStock({
  //  Food:foodObj.getFoodStock(),
  //  fedTime:hour()
  //})
}

function update(state){
  database.ref("/").update({
    gameState:state
  })
}