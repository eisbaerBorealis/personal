// ==UserScript==
// @name         Steal the Sun Bot
// @namespace    http://tampermonkey.net/
// @version      0.1.12
// @description  Play the game "Steal the Sun" at stealthesun.net
// @author       eisbaerBorealis
// @match        http://stealthesun.net/*
// @grant        none
// ==/UserScript==

/* IMPORTANT VARIABLES */
  // Do not change these.
var woodX = 6;
var woodY = 6;
var stoneX = 4;
var stoneY = 4;
var campfireX = 5;
var campfireY = 5;
var woodStoreX = 6;
var woodStoreY = 5;
var stonestoreX = 4;
var stonestoreY = 5;
var energystoreX = 5;
var energystoreY = 6;

var tickLength = 250;
var warmup = 4;

(function()
{
	'use strict';
	
	console.log("DEBUG: Starting eisbaerBorealis' Bot, version 0.1.12");
	
	setInterval(doRound, tickLength);
})();

function doRound()
{
	if(warmup > 0)
	{
		warmup--;
	}
	else
	{
		if(build.campfire.position === undefined)
		{
			buildCampfire();
		}
		else if(build.woodstore.position === undefined)
		{
			buildWoodstore();
		}
		else if(build.stonestore.position === undefined)
		{
			buildStonestore();
		}
		else if(build.energystore.position === undefined)
		{
			buildEnergystore();
		}
		else if(build.sawmill.position === undefined)
		{
			buildSawmill();
		}
		else if(build.quarry.position === undefined)
		{
			buildQuarry();
		}
		else
		{
			endGame();
		}
	}
}

function playerAt(x, y)
{
	var returnValue = true;
	
	if(player.current_position[0] != x || player.current_position[1] != y)
	{
		returnValue = false;
	}
	
	return returnValue;
}

function move(x, y)
{
	if(player.current_position[0] < x)
	{
		document.getElementById("move_right").click();
	}
	else if(player.current_position[0] > x)
	{
		document.getElementById("move_left").click();
	}
	else if(player.current_position[1] < y)
	{
		document.getElementById("move_down").click();
	}
	else if(player.current_position[1] > y)
	{
		document.getElementById("move_up").click();
	}
}

function buildCampfire()
{
	if(resources.wood.amount < build.campfire.cost.wood && !playerAt(woodX, woodY))
	{
		move(woodX, woodY);
	}
	else if(resources.energy.amount > 6 && resources.wood.amount < resources.wood.cap)
	{
		document.getElementById("gather").click();
	}
	else if(!playerAt(campfireX, campfireY))
	{
		move(campfireX, campfireY);
	}
	else
	{
		document.getElementById("build_campfire").click();
	}
}

function buildWoodstore()
{
	if(playerAt(campfireX, campfireY) && resources.energy.amount < resources.energy.cap - 1 && resources.wood.amount > 0)
	{
		document.getElementById("gather").click();
	}
	else if(resources.energy.amount < 7)
	{
		move(campfireX, campfireY);
	}
	else if(resources.wood.amount < build.woodstore.cost.wood)
	{
		if(playerAt(woodX, woodY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(woodX, woodY);
		}
	}
	else if(playerAt(woodStoreX, woodStoreY))
	{
		document.getElementById("build_woodstore").click();
	}
	else
	{
		move(woodStoreX, woodStoreY);
	}
}

function buildStonestore()
{
	if(playerAt(campfireX, campfireY) && resources.energy.amount < resources.energy.cap - 1 && resources.wood.amount > 0)
	{
		document.getElementById("gather").click();
	}
	else if(resources.energy.amount < 7)
	{
		move(campfireX, campfireY);
	}
	else if(resources.wood.amount < resources.wood.cap * 0.95)
	{
		if(playerAt(woodX, woodY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(woodX, woodY);
		}
	}
	else if(resources.stone.amount < build.stonestore.cost.stone)
	{
		if(playerAt(stoneX, stoneY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(stoneX, stoneY);
		}
	}
	else if(playerAt(stonestoreX, stonestoreY))
	{
		document.getElementById("build_stonestore").click();
	}
	else
	{
		move(stonestoreX, stonestoreY);
	}
}

function buildEnergystore()
{
	if(playerAt(campfireX, campfireY) && resources.energy.amount < resources.energy.cap - 1 && resources.wood.amount > 0)
	{
		document.getElementById("gather").click();
	}
	else if(resources.energy.amount < 7)
	{
		move(campfireX, campfireY);
	}
	else if(resources.wood.amount < build.energystore.cost.wood + 20)
	{
		if(playerAt(woodX, woodY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(woodX, woodY);
		}
	}
	else if(resources.stone.amount < build.energystore.cost.stone)
	{
		if(playerAt(stoneX, stoneY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(stoneX, stoneY);
		}
	}
	else if(resources.energy.amount < 5)
	{
		move(campfireX, campfireY);
	}
	else if(playerAt(energystoreX, energystoreY))
	{
		document.getElementById("build_energystore").click();
	}
	else
	{
		move(energystoreX, energystoreY);
	}
}

function buildSawmill()
{
	if(playerAt(campfireX, campfireY) && resources.energy.amount < resources.energy.cap - 1 && resources.wood.amount > 0)
	{
		document.getElementById("gather").click();
	}
	else if(resources.energy.amount < 7)
	{
		move(campfireX, campfireY);
	}
	else if(resources.wood.amount < build.sawmill.cost.wood)
	{
		if(playerAt(woodX, woodY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(woodX, woodY);
		}
	}
	else if(resources.stone.amount < build.sawmill.cost.stone)
	{
		if(playerAt(stoneX, stoneY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(stoneX, stoneY);
		}
	}
	else if(resources.energy.amount < 15) // 10 for sawmill, 4 to campfire, 1 extra
	{
		move(campfireX, campfireY);
	}
	else if(playerAt(woodX, woodY))
	{
		document.getElementById("build_sawmill").click();
	}
	else
	{
		move(woodX, woodY);
	}
}

function buildQuarry()
{
	if(playerAt(campfireX, campfireY) && resources.energy.amount < resources.energy.cap - 1 && resources.wood.amount > 0)
	{
		document.getElementById("gather").click();
	}
	else if(resources.energy.amount < 16)
	{
		move(campfireX, campfireY);
	}
	else if(resources.wood.amount < build.quarry.cost.wood)
	{
		if(playerAt(woodX, woodY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(woodX, woodY);
		}
	}
	else if(resources.stone.amount < build.quarry.cost.stone)
	{
		if(playerAt(stoneX, stoneY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(stoneX, stoneY);
		}
	}
	else if(resources.energy.amount < 31) // 8 to stone, 8 back to wood, 10 for sawmill, 4 to campfire, 1 extra
	{
		move(campfireX, campfireY);
	}
	else if(playerAt(stoneX, stoneY))
	{
		document.getElementById("build_quarry").click();
	}
	else
	{
		move(stoneX, stoneY);
	}
}

function endGame()
{
	if(playerAt(campfireX, campfireY) && resources.energy.amount < resources.energy.cap - 1 && resources.wood.amount > 0)
	{
		document.getElementById("gather").click();
	}
	else if(resources.energy.amount < 16)
	{
		move(campfireX, campfireY);
	}
	else if(resources.wood.amount < resources.wood.cap * 0.9)
	{
		if(playerAt(woodX, woodY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(woodX, woodY);
		}
	}
	else if(resources.stone.amount < resources.stone.cap)
	{
		if(playerAt(stoneX, stoneY))
		{
			document.getElementById("gather").click();
		}
		else
		{
			move(stoneX, stoneY);
		}
	}
	else if(playerAt(campfireX, campfireY))
	{
		// relax!
	}
	else
	{
		move(campfireX, campfireY);
	}
}