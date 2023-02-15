let ctx = gameCanvas.getContext("2d");
let x = [100,300,500];
let y = [0,0,0];
let speed = [1,4,2];
let dogX = 0; changeX = 0; score = 0;
let donutAmount = 3;

let gameTimer = setInterval(mainLoop,20);

let Donut = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
}

let donuts = [new Donut(100, 0 ,1), new Donut(300, 0 ,4), new Donut(500, 0, 2)];




function mainLoop() {
    ctx.clearRect(0,0,640,480);
    ctx.font = "30px Arial";
   

    for (let n = 0; n < donuts.length; n++) {
        ctx.drawImage(donut, donuts[n].x, donuts[n].y,80,80);
        donuts[n].y += donuts[n].speed;
        checkForHits(n);
        if (donuts[n].y > 480) {
            donuts[n].y = -80;
            donuts[n].x = Math.random()*600;
            score -= 5;
        }
    }
    ctx.drawImage(dog, dogX,400,80,80);
    dogX += changeX;
    ctx.fillText("Score: " + score, 10, 30);
    if(score >= 20){

        gameOver();
    }
    
}

document.onkeydown = keyPressed;
function keyPressed(e) {
    let k = e.keyCode;
    if(k == 13) {
        donutAmount++
        x.push(325);
        y.push(0);
        speed.push(3);
    }
    if (k == 37) {changeX = -50;}
    if (k == 39) {changeX = 50;}
}

document.onkeyup = keyLifted;

function keyLifted(e){
    let k = e.keyCode;
    if (k == 37) {changeX = 0;}
    if (k == 39) {changeX = 0;}
}

function checkForHits(n) {
    if (Math.abs(400-donuts[n].y < 60) && Math.abs(dogX-donuts[n].x) < 60) {
        score += 1;
        donuts[n].y = -80;
        donutsn[n].x = Math.random()*600;
        beep.play();
    }
}


//setTimeout(gameOver,60000);
function gameOver() {
    clearInterval(gameTimer);
    ctx.font = "80px Arial";
    ctx.fillText("Game Over!",100,250);
}

let SpawnTimer = setInterval(SpawnStuff,2000);

function SpawnStuff(){
    donuts.push(new Donut(Math.random()*600, 0, Math.random()*3))
    /*donutAmount++
    x.push(Math.random()*600);
    y.push(0);
    speed.push(Math.random()*3);*/
}