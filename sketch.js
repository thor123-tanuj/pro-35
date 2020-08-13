var dog,happyDog,database,foodS,foodStock,MilkIMGl
var feedpet,addfood,fedTime,lastFed
var foodObject;
// var addfoods;
var foodObj;
function preload()
{
	dogIMG = loadImage("Dog.png");
	happydogIMG = loadImage("happydog.png");
}

function setup() {
	database = firebase.database();
	createCanvas(1000,500);
	dog = createSprite(800,200,30,30);
	dog.addImage(dogIMG);
	dog.scale = 0.2;
	foodStock = database.ref('Food');
	foodStock.on("value",readstock);
	
	feed = createButton("Feed the dog.");
	feed.position(700,95);
	feed.mousePressed(feedDog);


	addfood = createButton("Add food.");
	addfood.position(800,95);
	addfood.mousePressed(addFoods);

    foodObj = new Food();

  
}


function draw() {
background("green");
foodObj.display();
textSize(20);
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
});
fill("white");
if(lastFed>=12){
	text("Last Feed: "+lastFed%12 + "PM",350,30);
} else if(lastFed == 0){
	text("Last Feed: 12 AM",350,30);
}else{
	text("Last Feed: "+lastFed+"AM",350,30)
}
drawSprites();
}


function readstock(data){
	foodS = data.val();
	foodObj.updateFoodStock(foodS);
	}



//function to update food stock and last fed time
function feedDog(){
	dog.addImage(happydogIMG);
	foodObj.updateFoodStock(foodObj.getFoodStock()-1);
	database.ref('/').update({
		Food:foodObj.getFoodStock(),
		FeedTime: hour()
	})
}

function addFoods(){
	foodS++;
	database.ref('/').update({
		Food:foodS
	})
}



// function writeStock(x){
// 	if(x<=0){
// 	   x=0;
// 	}
// 	else{
// 		x=x-1;
// 	}
//     database.ref('/').update({
// 		Food:x
//     })

// }


