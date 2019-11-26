// ==UserScript==
// @name         Cookie Clicker Bot
// @namespace    http://tampermonkey.net/
// @version      1.3.8
// @description  Play the game "Cookie Clicker" at orteil.dashnet.org/cookieclicker
// @author       eisbaerBorealis
// @match        https://orteil.dashnet.org/cookieclicker*
// @grant        none
// ==/UserScript==

/* INFO */
// https://cookieclicker.fandom.com/wiki/Achievement
// https://cookieclicker.fandom.com/wiki/Upgrades
// https://cookieclicker.fandom.com/wiki/Garden

/* CONSTANTS */
const botVersion = "1.3.8";
const gardenOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 13, 12, 23, 11, 9, 10, 14, 15, 16];
const nonUpgrades = [74, 84, 85, 182, 183, 184, 185, 209, 331, 332, 333, 361, 414];
const celestialOrder = [363, 323, 395, 520, 181, 253, 254, 255, 326, 288,
						141, 281, 274, 353, 282, 275, 354, 264, 276, 355,
						283, 327, 265, 277, 356, 289, 284, 291, 328, 362,
						278, 357, 266, 292, 290, 360, 365, 285, 286, 269,
						270, 271, 272, 273, 279, 358, 393, 287, 267, 293,
						364, 368, 280, 359, 496, 505, 329, 561, 394, 268,
						396, 397, 325, 495, 408, 449, 409, 450, 451, 562,
						539, 410, 537, 591, 592, 643, 540, 541, 542];
const permUpgrades = [226, 613, 494, 462, 442, 425, 322, 497, 479, 478, 477]; // Omelette, Kittens, top Biscuits

/* IMPORTANT VARIABLES */
  // Do not change these.
var nextSteps = [];
var countDown = 0;
var roundCount = 0;
var leftWindowHeight = 0;
var gameMode = "normal";
var botBroken = false;
//var gardenWidth = 0;
//var gardenHeight = 0;
var nextSeedId = 0;
var nextSeedA = 0;
var nextSeedB = 0;
var nextPurchase = [];
var nextCelUpgrade = 0;
var nextPermUpgrade = 0;
var failCount = 0;

(function()
{
	'use strict';

	console.log("  DEBUG: Start bot, v." + botVersion);

	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete')
		{
			if(countDown === 0)
			{
				try
				{
					startup();
					clearInterval(stateCheck);
				}
				catch(error)
				{
					console.log("  ERROR: Startup failed");
					countDown = 20;
				}
			}
			else
			{
				countDown--;
			}
		}
	}, 100);
})();

function startup()
{
	console.log("  DEBUG: Started startup");

	// This is the website cookies disclaimer
	if(document.getElementsByClassName("cc_btn_accept_all").length > 0)
	{
		document.getElementsByClassName("cc_btn_accept_all")[0].click();
	}

	// Changes all the settings for lower graphics
	Game.prefs.fancy = 0;
	Game.prefs.particles = 0;
	Game.prefs.numbers = 0;
	Game.prefs.cursors = 0;
	Game.prefs.wobbly = 0;
	Game.prefs.focus = 0;
	Game.volume = 0;

	// Gets a bunch of unique, one-time achievements
	if(Game.Achievements["Tabloid addiction"].won === 0)
	{
		for(let i = 0; i < 50; i++)
		{
			document.getElementById("commentsText").click();
		}
	}

	if(Game.Achievements["Cookie-dunker"].won === 0)
	{
		leftWindowHeight = document.getElementById("backgroundLeftCanvas").getAttribute("height");
		document.getElementById("backgroundLeftCanvas").setAttribute("height", "100");
	}

	Game.bakeryNameSet("Orteil");
	Game.bakeryNameSet("Cookie Clicker Bot");

	Game.ClickTinyCookie();
	Game.Achievements["Here you go"].click();
	
	while(Game.UpgradesById[celestialOrder[nextCelUpgrade]].bought === 1)
	{
		nextCelUpgrade++;
	}
	
	// initialize which game mode to use
	chooseMode();
	
	// If Garden exists, initialize important variables
	if(Game.Objects["Farm"].level > 0)
	{
		updateGardenVars();
	}
	
	// start up the main doRound function 20 times per second
	var mainLoopInterval = setInterval(doRound, 50);

	console.log("  DEBUG: Finished startup");
}

function doRound()
{
	switch(gameMode)
	{
		case "normal":
			Game.ClickCookie();
			break;
		case "preprestige":
			// Prestige at exactly 1 trillion cookies
			if(Game.Achievements["When the cookies ascend just right"].won === 0)
			{
				// If the cookies round to 1,000,000,000,000 and the buildings (cps) are 0, start the prestige
				if(Math.floor(Game.cookies + 0.5) === 1000000000000 && Game.BuildingsOwned === 0)
				{
					nextSteps.push("prestige");
					countDown = 40;
					gameMode = "waiting";
					console.log("A trillion! Cookie count is " + Game.cookies);
				}
				else if(Game.cookies < 1000000000000)
				{
					if(Game.ObjectsById[0].bought > 2)
					{
						Game.ObjectsById[0].sell(-1);
					}
					if((1000000000000 - Math.floor(Game.cookies + 0.5) - (1 - Game.ObjectsById[0].getSellMultiplier()) * Game.ObjectsById[0].getSumPrice(Game.ObjectsById[0].bought))
						% Game.mouseCps() === 0 // ex. 96 % 8 === 0
						|| (Game.BuildingsOwned === 0	))
					{
						Game.ObjectsById[0].sell(-1);
						Game.ClickCookie();
					}
					else if(Game.ObjectsById[0].bought === 0)
					{
						Game.ObjectsById[0].buy();
					}
				}
				else if(Game.cookies < 1000000000012)
				{
					Game.ObjectsById[0].buy(2);
				}
				else // Game.cookies > 1000000000000
				{
					let modifier = roundCount % 300;
					
					Game.ObjectsById[0].sell(-1);
					Game.ObjectsById[roundCount % Game.ObjectsById.length].sell(-1);
					
					if(Game.cookies - ((1 - Game.ObjectsById[0].getSellMultiplier()) * Game.ObjectsById[0].getSumPrice(modifier)) > 999999999900 &&
							Game.ObjectsById[0].getSumPrice(modifier) < Game.cookies)
					{
						Game.ObjectsById[0].buy(modifier);
					}
					else
					{
						roundCount -= modifier;
						console.log("Going for a trillion, current cookie count: " + Math.floor(Game.cookies));
					}
				}
			}
			else if(Game.ascendMeterLevel > 78000000 && Game.Upgrades["Lucky payout"].bought === 0)
			{
				if((Game.prestige + Game.ascendMeterLevel) % 1000000 === 777777)
				{
					for(let i = 0; i < Game.ObjectsById.length; i++)
					{
						Game.ObjectsById[i].sell(-1);
					}
					nextSteps.push("prestige");
					countDown = 40;
					gameMode = "waiting";
				}
				else
				{
					goldenCookies();
					buyBuildingsAndUpgrades();
				}
			}
			else
			{
				nextSteps.push("prestige");
				countDown = 40;
				gameMode = "waiting";
			}
/*			else if(Game.Upgrades["Lucky digit"].bought === 1)
			{
				if(Game.Upgrades["Lucky number"].bought === 1)
				{
					if(Game.ascendMeterLevel > 77777777 && Game.Upgrades["Lucky payout"].bought === 0)
					{
						if((Game.prestige + Game.ascendMeterLevel) % 1000000 === 777777)
						{
							for(let i = 0; i < Game.ObjectsById.length; i++)
							{
								Game.ObjectsById[i].sell(-1);
							}
							nextSteps.push("prestige");
							countDown = 40;
							gameMode = "waiting";
						}
						else
						{
							goldenCookies();
							buyBuildingsAndUpgrades();
						}
					}
					else
					{
						nextSteps.push("prestige");
						countDown = 40;
						gameMode = "waiting";
					}
				}
				else // End with 777!
				{
					if(Game.ascendMeterLevel > 77777)
					{
						if((Game.prestige + Game.ascendMeterLevel) % 1000 === 777)
						{
							for(let i = 0; i < Game.ObjectsById.length; i++)
							{
								Game.ObjectsById[i].sell(-1);
							}
							nextSteps.push("prestige");
							countDown = 40;
							gameMode = "waiting";
						}
						else
						{
							goldenCookies();
							buyBuildingsAndUpgrades();
						}
					}
					else
					{
						nextSteps.push("prestige");
						countDown = 40;
						gameMode = "waiting";
					}
				}
			}
			else // End with 7!
			{
				if((Game.prestige + Game.ascendMeterLevel) % 10 === 7)
				{
					for(let i = 0; i < Game.ObjectsById.length; i++)
					{
						Game.ObjectsById[i].sell(-1);
					}
					nextSteps.push("prestige");
					countDown = 40;
					gameMode = "waiting";
				}
				else
				{
					goldenCookies();
					buyBuildingsAndUpgrades();
				}
			}//*/
			break;
		case "waiting":
			wait();
			break;
		case "speedbaking":
			Game.ClickCookie();
			break;
		case "noclick":
			// do stuff other than clicking
			break;
		case "hardcore":
			Game.ClickCookie();
			break;
		default:
			if(!botBroken)
			{
				botBroken = true;
				console.log("ERROR: unknown gameMode.");
			}
	}
	
	if(gameMode !== "preprestige" && gameMode !== "waiting")
	{
		goldenCookies();
	}
	
	// Minigames
	// Garden

	// Every 1/4 second
	if(roundCount % 5 === 0 && gameMode !== "preprestige" && gameMode !== "waiting")
	{
		buyBuildingsAndUpgrades();
	}

	// Every 1 second
	if(roundCount % 20 === 19)
	{
		// close one game message
		Game.CloseNote();
	}
	
	// Every 5 seconds
	if(roundCount % 100 === 0)
	{
		chooseMode();
	}
	
	// Every 1 minute
	if(roundCount % 1200 === 0)
	{
		sugarLumps();
	}
	
	// Every 2 minutes
	if(roundCount % 2400 === 0)
	{
		if(Game.Objects["Farm"].level > 0)
		{
//			garden();	
		}
		if(Game.Objects["Wizard tower"].level > 0 && Game.Objects["Wizard tower"].minigame.magicM === Game.Objects["Wizard tower"].minigame.magic)
		{
			Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["hand of fate"])
		}
	}

	if(roundCount % 20 === 0 && leftWindowHeight !== 0 && Game.Achievements["Cookie-dunker"].won === 1)
	{
		document.getElementById("backgroundLeftCanvas").setAttribute("height", leftWindowHeight);
	}

	roundCount++;
}

function goldenCookies()
{
	if(Game.shimmers.length > 0)
	{
		if(Game.Achievements["Fading luck"].won === 0)
		{
			if(Game.shimmers[0].life < 10)
			{
				Game.shimmers[0].pop();
			}
		}
		else
		{
			Game.shimmers[0].pop();
		}
	}
}

function chooseMode()
{
	if(nextSteps.length > 0)
	{
		gameMode = "waiting";
	}
	else if(gameMode === "speedbaking" && (((Game.T / 30) > 900) || Game.Achievements["Speed baking III"].won === 1))
	{
		nextSteps.push("prestige");
		countDown = 20;
	}
	else if(Game.Achievements["Speed baking III"].won === 0 && (Game.T / 30) < 900)
	{
		gameMode = "speedbaking";
	}
	else if(Game.Achievements["True Neverclick"].won === 0 && Game.cookieClicks === 0)
	{
		gameMode = "noclick";
	}
	else if(Game.Achievements["Hardcore"].won === 0 && Game.UpgradesOwned === 0)
	{
		gameMode = "hardcore";
	}
	else if(Game.prestige < 1324 && Game.prestige + Game.ascendMeterLevel >= 1324)
	{
		gameMode = "preprestige";
	}
	else if(Game.prestige < 1000000000 && Game.ascendMeterLevel > Game.prestige * 2)
	{
		gameMode = "preprestige";
	}
	else
	{
		gameMode = "normal";
	}
}

function buyBuildingsAndUpgrades()
{
	if(gameMode === 'speedbaking' || Game.UpgradesOwned !== 0 || Game.Achievements["Hardcore"].won === 1)
	{
		for(let i = Game.UpgradesInStore.length - 1; i >= 0; i--)
		{
			if(!nonUpgrades.includes(Game.UpgradesInStore[i].id) && Game.UpgradesInStore[i].canBuy())
			{
				Game.UpgradesInStore[i].buy(1);
			}
		}
	}
	
	let nextBuildingId = -1;

	for(let i = Game.ObjectsById.length - 1; i >= 0; i--)
	{
		if(i === Game.ObjectsById.length - 1 || Game.unbuffedCps > Game.ObjectsById[i].price)
		{
			Game.ObjectsById[i].buy();
		}
		else
		{
			if(/*Game.ObjectsById[Game.ObjectsById.length - 1].amount >= 10 || */Game.ObjectsById[i].amount - Game.ObjectsById[i+1].amount < 5)
			{
				Game.ObjectsById[i].buy();
			}
		}
		
		if(Game.ObjectsById[i].price > Game.cookies)
		{
			nextBuildingId = i;
		}
	}
	
	if(nextBuildingId > 0 && Game.ObjectsById[nextBuildingId].price / Game.unbuffedCps > 24000 && Game.ObjectsById[nextBuildingId-1].price / Game.unbuffedCps < 12000)
	{
		Game.ObjectsById[nextBuildingId-1].buy();
	}
	
	if(Game.Achievements["Just wrong"].won === 0 && Game.Objects["Grandma"].amount > 5)
	{
		Game.Objects["Grandma"].sell();
	}
	
	if(Game.season === "christmas" && Game.santaLevel < Game.santaLevels.length - 1)
	{
		Game.UpgradeSanta();
	}
	
	checkSwitches();
	
	if(Game.dragonLevel < 5)
	{
		Game.UpgradeDragon();
	}
	else
	{
		switch(Game.dragonLevel)
		{
			case 5:
				if(Game.ObjectsById[0].amount > 200){Game.UpgradeDragon();}
				break;
			case 6:
				if(Game.ObjectsById[1].amount > 200){Game.UpgradeDragon();}
				break;
			case 7:
				if(Game.ObjectsById[2].amount > 200){Game.UpgradeDragon();}
				break;
			case 8:
				if(Game.ObjectsById[3].amount > 200){Game.UpgradeDragon();}
				break;
			case 9:
				if(Game.ObjectsById[4].amount > 200){Game.UpgradeDragon();}
				break;
			case 10:
				if(Game.ObjectsById[5].amount > 200){Game.UpgradeDragon();}
				break;
			case 11:
				if(Game.ObjectsById[6].amount > 200){Game.UpgradeDragon();}
				break;
			case 12:
				if(Game.ObjectsById[7].amount > 200){Game.UpgradeDragon();}
				break;
			case 13:
				if(Game.ObjectsById[8].amount > 200){Game.UpgradeDragon();}
				break;
			case 14:
				if(Game.ObjectsById[9].amount > 200){Game.UpgradeDragon();}
				break;
			case 15:
				if(Game.ObjectsById[10].amount > 200){Game.UpgradeDragon();}
				break;
			case 16:
				if(Game.ObjectsById[11].amount > 200){Game.UpgradeDragon();}
				break;
			case 17:
				if(Game.ObjectsById[12].amount > 200){Game.UpgradeDragon();}
				break;
			case 18:
				if(Game.ObjectsById[13].amount > 200){Game.UpgradeDragon();}
				break;
			case 19:
				if(Game.ObjectsById[14].amount > 200){Game.UpgradeDragon();}
				break;
			case 20:
				if(Game.ObjectsById[14].amount > 150){Game.UpgradeDragon();}
				break;
			case 21:
				if(Game.ObjectsById[14].amount > 300){Game.UpgradeDragon();}
				break;
			case 22:
				// Dragon is maxed out!
				break;
			default:
				console.log("  DEBUG: ERROR in Dragon switch statement");
		}
	}
}

function checkSwitches()
{
	//	200 wrinklers popped
	if(Game.Achievements["Moistburster"].won === 0 || Game.season === "halloween")
	{
		Game.CollectWrinklers();
	}
	else
	{
		//	IF Elder Pledge is available and Eldeer Achievement is got/it isn't Christmas
		if(Game.Upgrades["Elder Pledge"].canBuy() && Game.Upgrades["Elder Pledge"].unlocked &&
		   (Game.Achievements["Eldeer"].won === 1 || Game.season !== "christmas") &&
		   Game.season != "halloween")
		{
			Game.Upgrades["Elder Pledge"].buy();
		}
	}
	
	//	Seasonal
	if(Game.Upgrades["Season switcher"].bought)
	{
		if(Game.GetHowManyEggs() < 20)
		{
			if(Game.season != "easter" && Game.Upgrades["Bunny biscuit"].canBuy())
			{
				Game.Upgrades["Bunny biscuit"].buy();
			}
		}
		else if(Game.Achievements["Reindeer sleigher"].won === 0 ||
				Game.santaLevel < 14 ||
				Game.Upgrades["Christmas tree biscuits"].bought === 0 ||
				Game.Upgrades["Snowflake biscuits"].bought === 0 ||
				Game.Upgrades["Snowman biscuits"].bought === 0 ||
				Game.Upgrades["Holly biscuits"].bought === 0 ||
				Game.Upgrades["Candy cane biscuits"].bought === 0 ||
				Game.Upgrades["Bell biscuits"].bought === 0 ||
				Game.Upgrades["Present biscuits"].bought === 0)
		{
			if(Game.season != "christmas" && Game.Upgrades["Festive biscuit"].canBuy())
			{
				Game.Upgrades["Festive biscuit"].buy();
			}
		}
		else if(Game.Upgrades["Skull cookies"].bought === 0 ||
				Game.Upgrades["Ghost cookies"].bought === 0 ||
				Game.Upgrades["Bat cookies"].bought === 0 ||
				Game.Upgrades["Slime cookies"].bought === 0 ||
				Game.Upgrades["Pumpkin cookies"].bought === 0 ||
				Game.Upgrades["Eyeball cookies"].bought === 0 ||
				Game.Upgrades["Spider cookies"].bought === 0)
		{
			if(Game.season != "halloween" && Game.Upgrades["Ghostly biscuit"].canBuy())
			{
				Game.Upgrades["Ghostly biscuit"].buy();
			}
		}
		else if(Game.Upgrades["Pure heart biscuits"].bought === 0 ||
				Game.Upgrades["Ardent heart biscuits"].bought === 0 ||
				Game.Upgrades["Sour heart biscuits"].bought === 0 ||
				Game.Upgrades["Weeping heart biscuits"].bought === 0 ||
				Game.Upgrades["Golden heart biscuits"].bought === 0 ||
				Game.Upgrades["Eternal heart biscuits"].unlocked === 0)
		{
			if(Game.season != "valentines" && Game.Upgrades["Lovesick biscuit"].canBuy())
			{
				Game.Upgrades["Lovesick biscuit"].buy();
			}
		}
		else
		{
			if(Game.season != "christmas" && Game.Upgrades["Festive biscuit"].canBuy())
			{
				Game.Upgrades["Festive biscuit"].buy();
			}
		}
	}
	
	if(Game.Achievements["Elder calm"].won === 0)
	{
		Game.Upgrades["Elder Covenant"].buy();
		Game.Upgrades["Revoke Elder Covenant"].buy();
	}
}

function wait()
{
	if(countDown > 0)
	{
		countDown--;
	}
	else
	{
		switch(nextSteps[0])
		{
			case "prestige":
				if(/*(Game.prestige + Game.ascendMeterLevel > 2000 && Game.Upgrades["Lucky digit"].bought === 0 && (Game.prestige + Game.ascendMeterLevel) % 10 != 7) ||
						(Game.prestige + Game.ascendMeterLevel > 77777 && Game.Upgrades["Lucky number"].bought === 0 && (Game.prestige + Game.ascendMeterLevel) % 1000 != 777) ||
						*/(Game.prestige + Game.ascendMeterLevel > 77777777 && Game.Upgrades["Lucky payout"].bought === 0 && (Game.prestige + Game.ascendMeterLevel) % 1000000 != 777777))
				{
					nextSteps.shift();
					gameMode = "preprestige";
				}
				else
				{
					Game.Ascend(1);
					countDown = 120;
					nextSteps.shift();
					nextSteps.push("heavenlyupgrades");
				}
				break;
			case "heavenlyupgrades":
				if(!buyHeavenlyUpgrade())
				{
					nextSteps.shift();
					nextSteps.push("reincarnate");
				}
				countDown = 20;
				break;
			case "reincarnate":
				countDown = 40;
				nextSteps.shift();
				Game.Reincarnate(1);
				nextSteps.push("choosemode");
				break;
			case "choosemode":
				nextSteps.shift();
				chooseMode();
				break;
			default:
				console.log("ERROR: unknown nextStep: '" + nextSteps[0] + "', nextSteps.length is " + nextSteps.length);
				if(nextSteps.length === 0)
				{
					chooseMode();
				}
				
		}
	}
}

function sugarLumps()
{
	if(Game.Achievements["Hand-picked"].won === 0 && 
	   Game.lumpTooltip().includes("This sugar lump is mature"))
	{
		Game.clickLump();
	}
	
	if(Game.lumpTooltip().includes("This sugar lump is ripe!"))
	{
		if(Game.Achievements["Sweetmeats"].won === 0)
		{
			if(Game.elderWrath === 0)
			{
				Game.Upgrades["Elder Covenant"].buy();
				Game.Upgrades["Revoke Elder Covenant"].buy();
			}
			else if(Game.elderWrath === 3)
			{
				Game.clickLump();
			}
		}
		else
		{
			Game.clickLump();
		}
	}
	
	if(Game.Objects["Farm"].level === 0)
	{
		Game.Objects["Farm"].levelUp();
		updateGardenVars();
	}
	else if(Game.Objects["Wizard tower"].level === 0)
	{
		Game.Objects["Wizard tower"].levelUp();
	}
	else if(Game.Objects["Temple"].level === 0)
	{
		Game.Objects["Temple"].levelUp();
	}
	else if(Game.Objects["Farm"].level < 9)
	{
		Game.Objects["Farm"].levelUp();
	}
	else if(Game.lumps > 0)
	{
		for(let i = 0; i < Game.ObjectsById.length; i++)
		{
			Game.ObjectsById[i].levelUp();
		}
	}
}

function buyHeavenlyUpgrade()
{
	if(Game.Upgrades["Lucky digit"].bought === 0 && Game.Upgrades["Lucky digit"].canBePurchased)
	{
		Game.Upgrades["Lucky digit"].buy();
		return true;
	}
	else if(Game.Upgrades["Lucky number"].bought === 0 && Game.Upgrades["Lucky number"].canBePurchased)
	{
		Game.Upgrades["Lucky number"].buy();
		return true;
	}
	else if(Game.Upgrades["Lucky payout"].bought === 0 && Game.Upgrades["Lucky payout"].canBePurchased)
	{
		Game.Upgrades["Lucky payout"].buy();
		return true;
	}
	else if(Game.UpgradesById[celestialOrder[nextCelUpgrade]].canBePurchased)
	{
		Game.UpgradesById[celestialOrder[nextCelUpgrade]].buy();
		nextCelUpgrade++;
		return true;
	}
	else
	{
		return false;
	}
}

function garden()
{
	updateGardenVars();
	
	let garden = Game.Objects["Farm"].minigame;
//	let plantArray = Game.Objects["Farm"].minigame.plantsById;
	let plantArray = garden.plantsById;
	let plotLimits = garden.plotLimits;
	
	// Game.Objects["Farm"].minigame.plotLimits gives the starting x,y and the max+1 x,y, per Farm level
	//		This means at level 1, with a 2x2 plot, the four available plots are at 2,2 3,2 2,3 and 3,3
	//		document.getElementsByClassName("gardenTile") gets each of the 36 plots, with style="display:none" or block
	//			The four starting plots are 14, 15, 20, and 21 (y * 6 + x)
	//		Game.Objects["Farm"].minigame.getTile(2,2) gets an array of two numbers. The first seems to be 0 or 1, whether it is empty or not
	//			Correction, the first number is the plantId + 1 (0 is an empty tile)
	//			The second number seems to be its growth of some sort. I've seen 16 and 24 for the Baker's Wheat
	//			The second number is the percentage of its growth. I need to compare this to the number of ticks the plant takes before decaying
	//			Game.Objects["Farm"].minigame.getTile(2,2)[] = age, Game.Objects["Farm"].minigame.plantsById[0].ageTick = how much it will age next
	//		Game.Objects["Farm"].minigame.tileTooltip(2,2)() returns a big ugly wall of HTML that could probably be used
	
	let plantCount = 0;
	for(let x = plotLimits[0]; x < plotLimits[2]; x++)
	{
		for(let y = plotLimits[1]; y < plotLimits[3]; y++)
		{
			let plot = garden.getTile(x, y);
			if(plot[0] > 0)
			{
				plantCount++;
				let plant = plantArray[plot[0]-1]
				
				// If it's the next desired plant and is mature, OR if it's one tick from death, OR if it's an undesired weed
				if(plant)
				{
					
				}
			}
		}
	}

	// Game.Objects["Farm"].minigame.plants
}

function updateGardenVars()
{
/*	if(Game.Objects["Farm"].level > 0)
	{
		gardenWidth = 2;
		gardenHeight = 2;
		
		for(let i = 1; i < Game.Objects["Farm"].level; i++)
		{
			if(i % 2 === 1 && gardenWidth < 6)
			{
				gardenWidth++;
			}
			else if(i % 2 === 0 && gardenHeight < 6)
			{
				gardenHeight++;
			}
		}
		
		let plantArray = Game.Objects["Farm"].minigame.plantsById;
//		for(let i = 0; i < Game.Objects["Farm"].minigame.plantsById.length; i++)
		for(let i = plantArray.length - 1; i > 0 ; i--)
		{
			if(plantArray[i].unlocked === 0)
			{
				nextSeedId = i;
			}
		}
	}//*/
	
	let plantArray = Game.Objects["Farm"].minigame.plantsById;
	let i = 0;
	
	while(plantArray[gardenOrder[i]].unlocked === 1)
	{
		i++;
	}
	
	nextSeedId = i;
	switch(nextSeedId)
	{
		case 0:
			console.log("ERROR: Wait, your Baker's Wheat is locked?!");
			break;
		case 1:
			nextSeedA = 0;
			nextSeedB = 0;
			break;
		default:
			console.log("switch(nextSeedId) attempted case " + nextSeedId);
	}
}