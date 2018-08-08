// ==UserScript==
// @name         Cookie Clicker Bot
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Play the game "Cookie Clicker" at orteil.dashnet.org/cookieclicker
// @author       eisbaerBorealis
// @match        http://orteil.dashnet.org/cookieclicker*
// @grant        none
// ==/UserScript==

/* IMPORTANT VARIABLES */
  // Do not change these.
var isAscending = false;
var ascendDuration = 0;

(function()
{
	'use strict';
	
	console.log("  DEBUG: Start bot");
	
	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete')
		{
			clearInterval(stateCheck);
			// document ready
			try
			{
				startup();
			}
			catch(error)
			{
				console.log("  ERROR: Startup failed");
				location.reload();
			}
			setInterval(doRound, 50);
		}
	}, 100);
})();

function startup()
{
	console.log("  DEBUG: Started startup");
	
	isAscending = false;
	ascendDuration = 0;
	
	if(document.getElementsByClassName("cc_btn_accept_all").length > 0)
	{
		document.getElementsByClassName("cc_btn_accept_all")[0].click();
	}
	
	Game.prefs.fancy = 0;
	Game.prefs.particles = 0;
	Game.prefs.numbers = 0;
	Game.prefs.cursors = 0;
	Game.prefs.wobbly = 0;
	Game.prefs.focus = 0;
	Game.volume = 0;
	
	Game.ClickTinyCookie();
	
	if(Game.AchievementsById[243].won === 0)
	{
		for (i = 0; i < 50; i++)
		{ 
			document.getElementById("commentsText").click();
		}
	}
	
	Game.bakeryNameSet("Orteil");
	Game.bakeryNameSet("Cookie Clicker Bot");
	document.getElementById("bakeryName").click();
	document.getElementById("promptOption0").click();
	
	Game.AchievementsById[204].click();
	
	buyPrestigeUpgrades();
	
	console.log("  DEBUG: Finished startup");
}

function doRound()
{
	Game.CloseNotes();
	
	//promptOption0
/*	if(document.getElementById("promptOption0") !== null)
	{
		document.getElementById("promptOption0").click();
	}//*/
	
	// Click the cookie
	if(Game.AchievementsById[78].won == 1 || Game.cookieClicks > 0)
	{
		Game.ClickCookie();
	}
	
	// Click golden cookies
	if(Game.shimmers.length > 0)
	{
		if(Game.AchievementsById[264].won === 0)
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
	
	//	Click sugar
	if(Game.AchievementsById[269].won === 0 && 
	   Game.lumpTooltip().includes("This sugar lump is ripe!"))
	{
		Game.clickLump();
	}
	
	if(Game.lumpTooltip().includes("This sugar lump is mature!"))
	{
		if(Game.AchievementsById[269].won === 0)
		{
			if(Game.elderWrath === 0)
			{
				Game.UpgradesById[84].buy();
				Game.UpgradesById[85].buy();
			}
			else if(Game.elderWrath == 3)
			{
				Game.clickLump();
			}
		}
		else
		{
			Game.clickLump();
		}
	}
	
	// Check switches
	if(Game.cookieClicks % 6000 === 0)
	{
		//	200 wrinklers popped
		if(Game.AchievementsById[107].won === 0 || Game.season == "halloween")
		{
			Game.CollectWrinklers();
		}
		else
		{
			//	IF Elder Pledge is available and Eldeer Achievement is got/it isn't Christmas
			if(Game.UpgradesById[74].canBuy() && Game.UpgradesById[74].unlocked &&
			   (Game.AchievementsById[265].won == 1 || Game.season != "christmas") &&
			   Game.season != "halloween")
			{
				Game.UpgradesById[74].buy();
			}
		}
		
		//	Seasonal
		if(Game.UpgradesById[181].bought)
		{
			if(Game.GetHowManyEggs() < 20)
			{
				if(Game.season != "easter" && Game.UpgradesById[209].canBuy())
				{
					Game.UpgradesById[209].buy();
				}
			}
			else if(Game.AchievementsById[114].won === 0 ||
					Game.santaLevel < 14 ||
					Game.UpgradesById[143].bought === 0 ||
					Game.UpgradesById[144].bought === 0 ||
					Game.UpgradesById[145].bought === 0 ||
					Game.UpgradesById[146].bought === 0 ||
					Game.UpgradesById[147].bought === 0 ||
					Game.UpgradesById[148].bought === 0 ||
					Game.UpgradesById[149].bought === 0)
			{
				if(Game.season != "christmas" && Game.UpgradesById[182].canBuy())
				{
					Game.UpgradesById[182].buy();
				}
			}
			else if(Game.UpgradesById[134].bought === 0 ||
					Game.UpgradesById[135].bought === 0 ||
					Game.UpgradesById[136].bought === 0 ||
					Game.UpgradesById[137].bought === 0 ||
					Game.UpgradesById[138].bought === 0 ||
					Game.UpgradesById[139].bought === 0 ||
					Game.UpgradesById[140].bought === 0)
			{
				if(Game.season != "halloween" && Game.UpgradesById[183].canBuy())
				{
					Game.UpgradesById[183].buy();
				}
			}
			else if(Game.UpgradesById[169].bought === 0 ||
					Game.UpgradesById[170].bought === 0 ||
					Game.UpgradesById[171].bought === 0 ||
					Game.UpgradesById[172].bought === 0 ||
					Game.UpgradesById[173].bought === 0 ||
					Game.UpgradesById[174].unlocked === 0)
			{
				if(Game.season != "valentines" && Game.UpgradesById[184].canBuy())
				{
					Game.UpgradesById[184].buy();
				}
			}
			else
			{
				if(Game.season != "christmas" && Game.UpgradesById[182].canBuy())
				{
					Game.UpgradesById[182].buy();
				}
			}
		}
		
		if(Game.AchievementsById[82].won === 0)
		{
			Game.UpgradesById[84].buy();
			Game.UpgradesById[85].buy();
		}
	}
	
	//	Minigames
	if(Game.ObjectsById[7].level > 0 &&
	   Game.ObjectsById[7].minigame.magicM == Game.ObjectsById[7].minigame.magic)
	{
		Game.ObjectsById[7].minigame.castSpell(Game.ObjectsById[7].minigame.spellsById[1]);
	}
/*	if(Game.ObjectsById[6].level > 0)
	{
		Game.ObjectsById[6].minigame.slotGod(Game.ObjectsById[6].minigame.godsById[10], 0);
		Game.ObjectsById[6].minigame.useSlot(1);
	}//*/
	
	if(Game.cookieClicks % 750 === 0)// was: 750
	{
		// Buy best upgrade and building
		if(Game.AchievementsById[92].won == 1)
		{
			buyBestUpgrade();
		}
		
		if(Game.UpgradesOwned != 355)
		{
			buyBestBuilding();
		}
	}
	
	// Ascend if appropriate
	if(!isAscending)
	{
		if(Game.cookieClicks % 6000 === 1)
		{
			if(Game.prestige < 1229)
			{
				if(Game.ascendMeterLevel >= 1229)
				{
					console.log("  DEBUG: Ascended!");
					isAscending = true;
					
					Game.CollectWrinklers();
					Game.Ascend();
					document.getElementById("promptOption0").click();
					
					Game.WriteSave();
					
//					setTimeout(location.reload(), 3000);
				}
			}
			else //	Chips > 1229
			{
				if(Game.AchievementsById[130].won == 1 &&
				   (Game.ascendMeterLevel >= 2 * Game.prestige ||
				   (Game.prestige > 10000000 && Game.ascendMeterLevel >= Game.prestige)))
				{
					console.log("  DEBUG: Ascended!");
					isAscending = true;
					
					if(Game.AchievementsById[222].won === 0)
					{
						for(i = 0; i < 14; i++)
						{
							Game.UpgradeDragon();
						}
					}
					
					Game.CollectWrinklers();
					Game.Ascend();
					document.getElementById("promptOption0").click();
					
					Game.WriteSave();
					
//					setTimeout(location.reload(), 3000);
				}
			}
		}
	}
	else
	{
		ascendDuration++;
		
		if(ascendDuration == 500)
			{
				document.getElementById("ascendButton").click();
				document.getElementById("promptOption0").click();
			}
		
		if(ascendDuration > 2000)
		{
			ascendDuration = -1000;
			console.log("  DEBUG: REAALY Ascended!(?)");
			location.reload();
		}
	}
	
/*	if(Game.AchievementsById[39].won === 0 && parseInt(document.getElementById("productOwned1").innerText) > 5)
	{
		document.getElementById("storeBulkSell").click();
		document.getElementsByClassName("product unlocked")[1].click();
		document.getElementById("storeBulkBuy").click();
	}//*/
	if(Game.AchievementsById[39].won === 0 && Game.ObjectsById[1].amount > 5)
	{
		Game.ObjectsById[1].sell();
	}
}

function buyBestUpgrade()
{
	//	Santa
	if(Game.season == "christmas")
	{
		Game.UpgradeSanta();
	}

	//	Dragon
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
		if(Game.dragonAura != 10)
		{
			Game.SetDragonAura(10, 0);
			document.getElementById("promptOption0").click();
		}
		if(Game.dragonAura2 != 15)
		{
			Game.SetDragonAura(15, 1);
			document.getElementById("promptOption0").click();
		}
	}
	
	//	Sugar Lump upgrades
	if(Game.ObjectsById[7].level === 0)
	{
		Game.ObjectsById[7].levelUp();
	}
	if(Game.ObjectsById[6].level === 0)
	{
		Game.ObjectsById[6].levelUp();
	}
	if(Game.lumps > 0)
	{
		Game.ObjectsById[0].levelUp();
		Game.ObjectsById[1].levelUp();
		Game.ObjectsById[2].levelUp();
		Game.ObjectsById[3].levelUp();
		Game.ObjectsById[4].levelUp();
		Game.ObjectsById[5].levelUp();
		Game.ObjectsById[6].levelUp();
		Game.ObjectsById[7].levelUp();
		Game.ObjectsById[8].levelUp();
		Game.ObjectsById[9].levelUp();
		Game.ObjectsById[10].levelUp();
		Game.ObjectsById[11].levelUp();
		Game.ObjectsById[12].levelUp();
		Game.ObjectsById[13].levelUp();
		Game.ObjectsById[14].levelUp();
	}
	
	//	Normal upgrades
	for (i = Game.UpgradesInStore.length - 1; i >= 0; i--)
	{ 
		if(Game.UpgradesInStore[i].canBuy())
		{
			var upgradeId = Game.UpgradesInStore[i].id;
/*			if(upgradeId == 74 && Game.UpgradesById[87].unlocked === 0)
			{
//				Game.UpgradesInStore[i].buy();
				Game.UpgradesById[upgradeId].buy(1);
//				Game.ClosePrompt();
			}//*/
			
			if(upgradeId != 74  && upgradeId != 84  && upgradeId != 85  &&
			   upgradeId != 182 && upgradeId != 183 && upgradeId != 184 &&
			   upgradeId != 185 && upgradeId != 209 && upgradeId != 331 &&
			   upgradeId != 332 && upgradeId != 333 && upgradeId != 361 &&
			   upgradeId != 414)
			{
				Game.UpgradesInStore[i].buy();
				document.getElementById("promptOption0").click();
			}
		}
	}
}

function buyBestBuilding()
{
/*	for (i = document.getElementsByClassName("product unlocked").length - 1; i >= 0; i--)
	{
		if(document.getElementsByClassName("product unlocked")[i].classList.contains("enabled"))
		{
			document.getElementsByClassName("product unlocked")[i].click();
		}
	}//*/
	for (i = 14; i >= 0; i--)
	{
		while(Game.ObjectsById[i].getPrice() < Game.cookies)
		{
			Game.ObjectsById[i].buy(1);
		}
	}
}

function buyPrestigeUpgrades()
{
	console.log("  DEBUG: buyPrestigeUpgrades()!");
	
	//	Buy Legacy, Season Switcher, Persistent memory, How to bake your dragon
	Game.UpgradesById[363].buy(); // 1
	Game.UpgradesById[181].buy(); // 1111
	Game.UpgradesById[141].buy(); // 5
	Game.UpgradesById[323].buy(); // 9
	
	//	Buy Heavenly Cookies and four others
	Game.UpgradesById[395].buy(); // 3
	Game.UpgradesById[253].buy(); // 25
	Game.UpgradesById[254].buy(); // 25
	Game.UpgradesById[255].buy(); // 25
	Game.UpgradesById[326].buy(); // 25
	
	Game.UpgradesById[281].buy();
	Game.UpgradesById[274].buy();
	Game.UpgradesById[275].buy();
	Game.UpgradesById[276].buy();
	Game.UpgradesById[277].buy();
	Game.UpgradesById[278].buy();
	Game.UpgradesById[291].buy();
	Game.UpgradesById[279].buy();
	Game.UpgradesById[280].buy();
	Game.UpgradesById[353].buy();
	
	Game.UpgradesById[354].buy();
	Game.UpgradesById[355].buy();
	Game.UpgradesById[356].buy();
	Game.UpgradesById[357].buy();
	Game.UpgradesById[358].buy();
	Game.UpgradesById[359].buy();
	Game.UpgradesById[393].buy();
	Game.UpgradesById[394].buy();
	Game.UpgradesById[325].buy();
	Game.UpgradesById[264].buy();
	
	Game.UpgradesById[265].buy();
	Game.UpgradesById[266].buy();
	Game.UpgradesById[267].buy();
	Game.UpgradesById[268].buy();
	Game.UpgradesById[282].buy();
	Game.UpgradesById[283].buy();
	Game.UpgradesById[327].buy();
	Game.UpgradesById[411].buy();
	Game.UpgradesById[412].buy();
	Game.UpgradesById[413].buy();
	
	Game.UpgradesById[365].buy();
	Game.UpgradesById[284].buy();
	Game.UpgradesById[360].buy();
	Game.UpgradesById[285].buy();
	Game.UpgradesById[286].buy();
	Game.UpgradesById[287].buy();
	Game.UpgradesById[397].buy();
	Game.UpgradesById[269].buy();
	Game.UpgradesById[270].buy();
	Game.UpgradesById[271].buy();
	
	Game.UpgradesById[272].buy();
	Game.UpgradesById[273].buy();
	Game.UpgradesById[288].buy();
	Game.UpgradesById[289].buy();
	Game.UpgradesById[292].buy();
	Game.UpgradesById[293].buy();
	Game.UpgradesById[364].buy();
	Game.UpgradesById[396].buy();
	Game.UpgradesById[290].buy();
	Game.UpgradesById[368].buy();
	
	Game.UpgradesById[408].buy();
	Game.UpgradesById[409].buy();
	Game.UpgradesById[410].buy();
	Game.UpgradesById[328].buy();
	Game.UpgradesById[362].buy();
	Game.UpgradesById[329].buy();
}