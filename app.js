let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let cellsize = 50;
let boardwidth = 1000;
let boardheight = 600;
let direction = "right";
let snakecells = [[0,0]];
let gameover = false;
let score = 0;
let foodcell = generatefood();
function draw(){
    if(gameover === true){
        clearInterval(id);
        ctx.font = "50px bold";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER!!!",300,300);
        return;
    }
    ctx.clearRect(0,0,boardwidth,boardheight);
    for(let cell of snakecells){
        ctx.fillStyle = "red";
        ctx.fillRect(cell[0],cell[1],cellsize,cellsize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(cell[0],cell[1],cellsize,cellsize);
    }
    ctx.fillStyle = "green";
    ctx.fillRect(foodcell[0],foodcell[1],cellsize,cellsize);
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "purple";
    ctx.fillText(`score = ${score}`,10,20);
}
document.addEventListener("keydown",function(e){
    if (e.key === "ArrowUp"){
        direction = "up";
    }
    else if(e.key === "ArrowDown"){
        direction = "down";
    }
    else if(e.key === "ArrowLeft"){
        direction = "left";
    }
    else if(e.key === "ArrowRight"){
        direction = "right";
    }
})
function update(){
    let headx = snakecells[snakecells.length - 1][0];
    let heady = snakecells[snakecells.length - 1][1];
    let nheadx;
    let nheady;
    if(direction === "up"){
        nheadx = headx;
        nheady = heady - cellsize;
        if(nheady < 0 || eatitself(nheadx,nheady)){
            gameover = true;
        }
    }
    else if(direction === "down"){
        nheadx = headx;
        nheady = heady + cellsize;
        if(boardheight === nheady || eatitself(nheadx,nheady)){
            gameover = true;
        }
    }
    else if(direction === "left"){
        nheadx = headx - cellsize;
        nheady = heady;   
        if(nheadx < 0 || eatitself(nheadx,nheady)){
            gameover = true;
        }
    }
    else if(direction === "right"){
        nheadx = headx + cellsize;
        nheady = heady;
        if(boardwidth === nheadx || eatitself(nheadx,nheady)){
            gameover = true;
        }
    }
    snakecells.push([nheadx,nheady]);
    if(nheadx === foodcell[0] && nheady === foodcell[1]){
        foodcell = generatefood();
        score += 10;
    }else{
        snakecells.shift();
    }
}
// function generatefood(){
//     return [ Math.round((Math.random()*(boardwidth - cellsize))/cellsize)*cellsize,
//              Math.round((Math.random()*(boardheight - cellsize))/cellsize)*cellsize, ];
// }
function generatefood() {
    return [
      Math.round((Math.random() * (boardwidth - cellsize)) / cellsize) * cellsize,
      Math.round((Math.random() * (boardheight - cellsize)) / cellsize) * cellsize,
    ];
  }
function eatitself(nheadx,nheady){
    for(let item of snakecells){
        if(nheadx === item[0] && nheady === item[1]){
            return true;
        }
    }
    return false;
}
let id = setInterval(function(){
    draw();
    update();
},300)
// let rx = Math.round(Math.random()*(boardwidth - cellsize)/cellsize)*cellsize;
// let ry = Math.round(Math.random()*(boardheight - cellsize)/cellsize)*cellsize;
