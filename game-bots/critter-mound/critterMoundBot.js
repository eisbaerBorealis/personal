// ==UserScript==
// @name         Critter Mound Bot
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  Play the game "Critter Mound" at yoyz.com/critter
// @author       eisbaerBorealis
// @match        http://yoyz.com/critter*
// @grant        none
// ==/UserScript==

/* CHANGE THESE VALUES */
var coolDown = true;      // if true, will save a low-score female and male, and after everything has been completed, will attempt to go back down to 1 for all traits (very silly)
var useBoosts = true;     // if true, will use boosts if there is spare room
var keepBoosts = 3;       // if you want to use SOME boosts, but save some for the user, select the amount here. 0 means all will be used
//var cheat = false;        // 
/* END USER SETTINGS*/

/* TECHNICAL SETTINGS */
  // Changing these values could have a positive or negative effect on the bot's gameplay. Tweak them if you want to experiment.
var timeoutLength = 3000;        // Bot waits 3 seconds between actions
var armyStrengthModifier = 1.10; // Will not attack unless our weakest soldier is X times stronger than the strongest opponent
var newSoldierModifier = 1.07;   // If offspring is X times stronger than the weakest soldier, replace said soldier

/* IMPORTANT VARIABLES */
  // Do not change these.
var weakestSoldierScore = 0;
var wonGame = false;

(function()
{
  'use strict';
  
  console.log("  DEBUG: beginning of main loop");
  
//  console.log("DEBUG: timeoutLength is " + timeoutLength);

  console.log("  DEBUG: end of main loop");
  setTimeout(function(){doRound();}, timeoutLength);
})();

var doRound = function()
{
  //if(game.armyMoundUpgradeCost() > 500000000) // Final upgrade costs 500,000,000? Wrong, 5,000,000,000
  if(game.sod() < 7500000000) // halfway between final upgrade cost and what the game thinks is the next upgrade cost
  {
    buyUpgrades();
  }
  /*else
  {
    // Start up the Heir Hatchery?
  }//*/
//  console.log("DEBUG: done buyUpgrades, back in doRound loop");
//  console.log("DEBUG: in doRound loop, about to useBoosts");
  useBoosts();
//  console.log("DEBUG: done useBoosts, back in doRound loop");
  
  checkFemale();
  checkMale();
  
  fight();
  
//  console.log("DEBUG: end of Round");
  if(!wonGame)
  {
    setTimeout(function(){doRound();}, timeoutLength);
  }
  else
  {
    game.game.TogglePauseBreeding();
    console.log("Game over. Breeding paused.");
  }
};

var buyUpgrades = function()
{
//  console.log("DEBUG: buyUpgrades");
  // Order of upgrades: Factory, Carriers, Farm, Mine, Queen, King, Soldiers, Princess, Prince
  
  if(game.factoryMoundUpgradeCost() < game.sod())
  {
    console.log("  Upgraded Factory size: " + game.factoryMoundUpgradeCost());
    document.getElementsByClassName("upgrade")[7].click();
  }
  
  if(game.carrierMoundUpgradeCost() < game.sod())
  {
    console.log("  Upgraded Carrier size: " + game.carrierMoundUpgradeCost());
    document.getElementsByClassName("upgrade")[6].click();
  }
  
  if(game.farmMoundUpgradeCost() < game.sod())
  {
    console.log("  Upgraded Farm size: " + game.farmMoundUpgradeCost());
    document.getElementsByClassName("upgrade")[5].click();
  }
  
  if(game.mineMoundUpgradeCost() < game.sod())
  {
    console.log("  Upgraded Mine size: " + game.mineMoundUpgradeCost());
    document.getElementsByClassName("upgrade")[4].click();
  }
  
  if(game.sod() < 750000000)
  {
    if(game.femaleMoundUpgradeCost() < game.sod())
    {
      console.log("  Upgraded Queen Mound size: " + game.femaleMoundUpgradeCost());
      document.getElementsByClassName("upgrade")[0].click();
    }

    if(game.maleMoundUpgradeCost() < game.sod())
    {
      console.log("  Upgraded King Mound size: " + game.maleMoundUpgradeCost());
      document.getElementsByClassName("upgrade")[1].click();
    }

    if(game.princessMoundUpgradeCost() < game.sod())
    {
      console.log("  Upgraded Princess Mound size: " + game.princessMoundUpgradeCost());
      document.getElementsByClassName("upgrade")[2].click();
    }

    if(game.princeMoundUpgradeCost() < game.sod())
    {
      console.log("  Upgraded Prince Mound size: " + game.princeMoundUpgradeCost());
      document.getElementsByClassName("upgrade")[3].click();
    }
  }
  
  if(game.armyMoundUpgradeCost() < game.sod())
  {
    console.log("  Upgraded Army size: " + game.armyMoundUpgradeCost());
    document.getElementsByClassName("upgrade")[8].click();
  }
};

var useBoosts = function()
{
//  console.log("DEBUG: useBoosts");
  while(useBoosts &&
        game.femaleMound().length < game.maxFemaleMoundSize() &&
        game.maleMound().length < game.maxMaleMoundSize() &&
        game.boosts()-1 >= keepBoosts)
  {
    game.Boost();
  }//*/
};

var checkFemale = function()
{
  // Check Queen and first female;
  if(coolDown) // Keep a weak critter
  {
    if(game.maxFemaleMoundSize() > 1)
    {
      if(game.femaleMound().length > 1) // check first female if there's a second one to save
      {
        moveFemale();
      } // else don't moveFemale
    }
    else // only one female
    {
      if(game.femaleMound().length > 0)
      {
        moveFemale();
      }
    }
  }
  else // Use all critters
  {
    if(game.femaleMound().length > 0) // if there's a female, check it
    {
      moveFemale();
    }
  }
};
    
var moveFemale = function()
{
  // Make Queen if it has more mutations
  if(getMutationCount(game.femaleMound()[0]) > getMutationCount(game.mother()))
  {
    document.getElementsByClassName("female")[3].click();
//    console.log("Clicked on \"Queen\" button");
  } // If it has fewer mutations, get rid of it (worker)
  else if(getMutationCount(game.mother()) > getMutationCount(game.femaleMound()[0]))
  {
    document.getElementsByClassName("mine")[1].click();
//    console.log("Clicked on Female \"Worker\" button (too few mutations)");
  } // If it has equal mutations and a higher score, make it Queen
  else if(game.femaleMound()[0].score > game.mother().score)
  {
    document.getElementsByClassName("female")[3].click();
//    console.log("Clicked on \"Queen\" button");
  } // If there's space in the army or we are significantly stronger, send it to the army
  else if(game.maxArmyMoundSize() > game.armyMound().length || game.femaleMound()[0].score > weakestSoldierScore * newSoldierModifier)
  {
//    document.getElementsByTagName("select")[4].value = "score"; // sort army by score - DOESN'T WORK
    if(game.maxArmyMoundSize() == game.armyMound().length)
    {
      killWeakestSoldier();
    }
    document.getElementsByClassName("army")[1].click();
//    console.log("Clicked on Female \"Soldier\" button");
//    weakestSoldierScore = game.armyMound()[game.armyMound().length-1].score;
    if(weakestSoldierScore == 0)
    {
      weakestSoldierScore = game.armyMound()[0].score;
    }
    console.log("  New weakestSoldierScore: " + weakestSoldierScore);
//    document.getElementsByTagName("select")[4].value = "level"; // sort army by level - DOESN'T WORK
  }
  else // Put all the spares to work
  {
    if(game.mother().score < 200000 && game.femaleMound()[0].score < weakestSoldierScore * newSoldierModifier)
    {
    document.getElementsByClassName("mine")[1].click();
//    console.log("Clicked on Male \"Worker\" button");
    }
    else
    {
      document.getElementsByClassName("female")[3].click();
//      console.log("Clicked on \"Queen\" button");
    }
  }
};

var checkMale = function()
{
  // Check King and first male;
  if(coolDown) // Keep a week critter
  {
    if(game.maxMaleMoundSize() > 1)
//    if(game.maleMoundUpgradeCost() != 10) // There's space for atleast 2 males
    {
      if(game.maleMound().length > 1) // check first male if there's a second one to save
      {
        moveMale();
      } // else don't moveMale
    }
    else // only 1 male
    {
      if(game.maleMound().length > 0)
      {
        moveMale();
      }
    }
  }
  else // Use all critters
  {
    if(game.maleMound().length > 0) // if there's a female, check it
    {
      moveMale();
    }
  }
};
    
var moveMale = function()
{
  // Make King if it has more mutations
  if(getMutationCount(game.maleMound()[0]) > getMutationCount(game.father()))
  {
    document.getElementsByClassName("male")[3].click();
//    console.log("Clicked on \"King\" button");
  } // If it has fewer mutations, get rid of it (worker)
  else if(getMutationCount(game.father()) > getMutationCount(game.maleMound()[0]))
  {
    document.getElementsByClassName("mine")[2].click();
//    console.log("Clicked on Male \"Worker\" button (too few mutations)");
  } // If it has equal mutations and a higher score, make it King
  else if(game.maleMound()[0].score > game.father().score)
  {
    document.getElementsByClassName("male")[3].click();
//    console.log("Clicked on \"King\" button");
  } // If there's space in the army or we are significantly stronger, send it to the army
  else if(game.maxArmyMoundSize() > game.armyMound().length || game.maleMound()[0].score > weakestSoldierScore * newSoldierModifier)
  {
//    document.getElementsByTagName("select")[4].value = "score"; // sort army by score
    if(game.maxArmyMoundSize() == game.armyMound().length)
    {
      killWeakestSoldier();
    }
    document.getElementsByClassName("army")[2].click();
//    console.log("Clicked on Male \"Soldier\" button");
//    weakestSoldierScore = game.armyMound()[game.armyMound().length-1].score;
    if(weakestSoldierScore == 0)
    {
      weakestSoldierScore = game.armyMound()[0].score;
    }
    console.log("  New weakestSoldierScore: " + weakestSoldierScore);
//    document.getElementsByTagName("select")[4].value = "level"; // sort army by level
  }
  else // Put all the spares to work
  {
    document.getElementsByClassName("mine")[2].click();
//    console.log("Clicked on Male \"Worker\" button");
  }
};

var getMutationCount = function(critter)
{
  var mutationsCount = 0;
  for(i = 0; i < 5; i++)
  {
    mutationsCount += critter.traits[i].genes.length;
  }
//  console.log("Returning mutationsCount of " + mutationsCount);
  return mutationsCount;
}

var killWeakestSoldier = function()
{
  var newWeakestScore = 1000000; // highest possible score should be a little over 200000
  var weakestPosition = 0;
  
  for(i = 0; i < game.armyMound().length; i++)
  {
    if(game.armyMound()[i].score < newWeakestScore)
    {
      weakestPosition = i;
      newWeakestScore = game.armyMound()[i].score;
    }
  }
  // This is going to be ugly...
//  document.getElementsByClassName("critterRow")[document.getElementsByClassName("critterRow").length - game.armyMound().length + weakestPosition - 1].click();
  document.getElementsByClassName("critterRow")[document.getElementsByClassName("critterRow").length - game.map().enemyArmyMound().length - game.armyMound().length + weakestPosition].click();
  document.getElementsByClassName("recycle")[8].click();
  
  newWeakestScore = 1000000; // highest possible score should be a little over 200000
  for(i = 0; i < game.armyMound().length; i++)
  {
    if(game.armyMound()[i].score < newWeakestScore)
    {
      newWeakestScore = game.armyMound()[i].score;
    }
  }
  if(newWeakestScore == 1000000)
  {
    newWeakestScore = 0;
  }
  weakestSoldierScore = newWeakestScore;
}

var fight = function()
{
  if(!wonGame && !game.atWar())
  {
    var i = 0;
    var targetFound = false;
    
    while(!targetFound && i < 18)
    {
      if(!game.nations()[i].mapComplete() && game.nations()[i].highBaseValue * armyStrengthModifier < weakestSoldierScore)
      {
        targetFound = true;
      }
      else
      {
        if(game.nations()[i].highBaseValue * armyStrengthModifier >= weakestSoldierScore) // army not strong enough
        {
//          i--; // Go back to previous opponent
          
          if(i == 2 || i == 1)
          {
            i += 14;
          }
          else
          {
            i -= 3;
          }
          
          targetFound = true; // use previous opponent
        }
        else // we've defeated this nation and we're strong enough; let's see if we're strong enough for the next one.
        {
//          i++; // Order from weakest to strongest: 0, 3, 6, 9, 12, 15, 1, 4, 7, 10, 13, 16, 2, 5, 8, 11, 14, 17
          if(i == 15 || i == 16)
          {
            i -= 14;
          }
          else
          {
            i += 3;
          }
        }
      }
    }
    
    if(i == -3)
    {
      // console.log("DEBUG: not strong enough for first opponent");
    }
    else
    {
      if(i == 20) // Defeated the 18th and final opponent
      {
        i = 11; // Apparently the final opponent kills three soldiers per battle. Hopefully the third-to-last opponent is easier.
      }
      
      game.StartWar(game.nations()[i]);
      console.log("  STARTED WAR with the " + game.nations()[i].name + " (" + i + ")");
      
      if(!game.pauseAutoBattle()) // if hunting is not paused,
      {
        game.TogglePauseAutoBattle(); // pause hunting
      }
      
      if(!game.pauseExplore()) // if scouting is not paused,
      {
        game.TogglePauseExplore(); // pause scouting
      }
    }
  }
  else if(!wonGame)// Time for battle!
  {
    if(game.map().completePercentage() == "100%")
    {
      game.EndWar();
      if (game.nations()[17].mapComplete() && game.achievementsUnlocked() == 212) // Hopefully the King/Queen will have a score of 209979?
      {
        wonGame = true;
        console.log("GAME WON");
      }
    }
    else
    {
      if(!game.pauseAutoBattle()) // if hunting is not paused,
      {
        game.TogglePauseAutoBattle(); // pause hunting
      }
      
      if(!game.pauseExplore()) // if scouting is not paused,
      {
        game.TogglePauseExplore(); // pause scouting
      }

      var battleReady = true;
      if(game.maxArmyMoundSize() > game.armyMound().length) // not full army
      {
        battleReady = false; // don't fight
      }
      for(i = 0; i < game.armyMound().length; i++) // if any soldier
      {
        if(game.armyMound()[i].healthPercentage() != "100%") // has less than full health
        {
          battleReady = false; // do not fight
        }
      }

      if(battleReady)
      {
        document.getElementsByClassName("fog unlocked")[0].click();
      }
    }
  }
  else
  {
    console.log("Beat the game; not going back to war.");
  }
}
