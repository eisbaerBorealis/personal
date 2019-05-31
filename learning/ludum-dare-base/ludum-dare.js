/* User variables*/
const TICKS_PER_SECOND = 30;
canvasWidth = 500;
canvasHeight = 500;
/* Do not change! */
const TICK_LENGTH = 1000 / TICKS_PER_SECOND;
var drawInterval;
var ctx;

$(document).ready(function()
{
    $(document.body).html("<canvas id=\"gameCanvas\"></canvas>");
    ctx = document.getElementById("gameCanvas").getContext("2d");
    ctx.canvas.width  = canvasWidth;
    ctx.canvas.height  = canvasHeight;
    drawInterval = setInterval(drawGame, TICK_LENGTH);
});

function drawGame()
{
//    var ctx = document.getElementById("gameCanvas").getContext("2d");
    drawBackground();
    drawObjects();
    drawDisplay();
}

function drawBackground()
{
    var grd = ctx.createRadialGradient(canvasWidth/2, canvasHeight/2, canvasWidth/10,
        canvasWidth/2, canvasHeight/2, canvasWidth/2);
    grd.addColorStop(0, "#333333");
    grd.addColorStop(1, "#000000");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawObjects()
{
    ctx.font = "30px Consolas";
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.fillText("Waiting for something", windowWidth/2 - 185, windowHeight/2 - 85);
    ctx.font = "50px Consolas";
    ctx.fillText("BIG", windowWidth/2 - 55, windowHeight/2 - 25);
    ctx.font = "30px Consolas";
    ctx.fillText("to happen", windowWidth/2 - 95, windowHeight/2 + 25);
    //ctx.globalAlpha = 0.5
}

function drawDisplay()
{
    
}