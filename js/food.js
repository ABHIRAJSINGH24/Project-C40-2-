class food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
        this.bedroomImage = loadImage("virtual pet images/Bed Room.png");
        this.gardenImage = loadImage("virtual pet images/Garden.png");
        this.washroomImage = loadImage("virtual pet images/Wash Room.png");
    }
        getFoodStock(){
            var foodStockRef = database.ref("Food"); 
            foodStockRef.on("value",function(data){
                this.foodStock = data.val();
            });
            return this.foodStock; 
        }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
        database.ref("/").update({
            Food:this.foodStock
        })
    }

    bedroom(){
        background(this.bedroomImage);
    }

    garden(){
        background(this.gardenImage);
    }

    washroom(){
        background(this.washroomImage);
    }

    display(){
        background(46,139,87);

        fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
          text("Last Fed:"+lastFed%12+"PM",200,30);
        }else if(lastFed===0){
          text("Last Fed:12AM",210,30);
        }else{
          text("Last Feed:"+lastFed+"AM",200,30);
        }

        var x = 80, y = 100;
    
        if(this.foodStock!==0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y + 50;
                }
                imageMode(CENTER);
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}