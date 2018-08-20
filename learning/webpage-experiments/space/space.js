/* User variables*/
const TICKS_PER_SECOND = 30;
var celestialObjects =
[
    {}
];

/* Do not change! */
const TICK_LENGTH = 1000 / TICKS_PER_SECOND;
var windowWidth;
var windowHeight;
var largerSideLength;
var drawInterval;
var ctx;

$(document).ready(function()
{
    $(document.body).html("<canvas id=\"spaceCanvas\"></canvas>");
    ctx = document.getElementById("spaceCanvas").getContext("2d");
    updateWindowSize();

//    randomizePlanets()
    drawInterval = setInterval(drawSpace, TICK_LENGTH);
});

function updateWindowSize()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    ctx.canvas.width  = windowWidth;
    ctx.canvas.height  = windowHeight;
    largerSideLength = windowWidth;
    if(windowHeight > largerSideLength)
    {
        largerSideLength = windowHeight;
    }
}

function drawSpace()
{
    var ctx = document.getElementById("spaceCanvas").getContext("2d");
    drawBackground();
    drawText()
}

function drawBackground()
{
    var grd = ctx.createRadialGradient(windowWidth/2, windowHeight/2, windowWidth/10,
            windowWidth/2, windowHeight/2, largerSideLength/2);
    grd.addColorStop(0, "#333333");
    grd.addColorStop(1, "#000000");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, windowWidth, windowHeight);
}

function drawText()
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