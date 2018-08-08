function startGame()
{
//    console.log("  DEBUG: startGame() called.");
    myGameArea.start();
}

var myGameArea =
{
    canvas : document.createElement("canvas"),
    start : function()
    {
//        console.log("  DEBUG: myGameArea.start() called.");
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvasContainer").insertBefore(this.canvas, document.getElementById("canvasContainer").childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        
    },
    clear : function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.update = function()
    {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function updateGameArea()
{
    myGameArea.clear();
    myGamePiece.update();
}