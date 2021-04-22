var ball;
var database, position;
function setup(){
    createCanvas(500,500);
    database=firebase.database();
    ball = createSprite(250,250,20,20);
    ball.shapeColor = "red";
    database.ref("ball/position").on("value", readPosition, showError);
}
function readPosition(data)
{
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
}
function showError(){
    console.error("there is something wrong.");
}
function draw(){
    background("white");
    if(position !== undefined)
    {
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
    }
}

function writePosition(x,y){
database.ref("ball/position").set({
    x:position.x+x,
    y:position.y+y
})
}
