// ==UserScript==
// @name         MatterScale Bot
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  Plays the game "A Matter of Scale" at astarsearcher.com
// @author       eisbaerBorealis
// @match        http://astarsearcher.bitbucket.org/*
// @grant        none
// ==/UserScript==

/* CHANGE THESE VALUES */
//var cheat = false;
//var useUpgrades = false;
//var dummy = "dumb";
/* END USER SETTINGS*/

/* TECHNICAL SETTINGS */
// Changing these values could have a positive or negative effect on the bot's gameplay. Tweak them if you want to experiment.
var timeoutLength = 4000;        // Bot waits 4 seconds between actions

/* IMPORTANT VARIABLES */
  // Do not change these.
var wonGame = false;
//var buildingType = 0;
//var buildingNum = 0;
//var placeCount = 0;
var currentPlace = -1;
//var pageLoaded = false;
var roundNumber = 0;
var completedPlaces = 0;

var bestEfficiency = -1;
var mostEfficientBuilding = -1;
var efficiency = -1;


(function()
{
    'use strict';
    console.log("     eisDEBUG: beginning of main loop");
    
    setTimeout(function(){steppingStone();}, 10000);
})();

function steppingStone()
{
    console.log("     eisDEBUG: starting first doRound");
    doRound();
}

function doRound()
{
    console.log("--eisDEBUG: starting doRound #" + roundNumber);
    
    try
    {
        if(roundNumber % 1 == 0){clickActives();}
        if(roundNumber % 8 == 3){buyBuildings();}
        if(roundNumber % 8 == 7){buyBestBuilding();}
//        if(roundNumber % 8 == 3){while(Number(document.getElementsByClassName("currency-count")[1].innerHTML) > 10 * Number(document.getElementsByClassName("building-cont")[9].childNodes[2].innerHTML)){buyBuildings();}}
//          if(Number(document.getElementsByClassName("currency-count")[2].innerHTML) < 500 && roundNumber % 2 == 0){buyBuildings();}
//          if(Number(document.getElementsByClassName("currency-count")[1].innerHTML) > Number(document.getElementsByClassName("building-cont")[9].childNodes[2].innerHTML) * 10 && roundNumber % 2 == 0){buyBuildings();}
        if(roundNumber % 4 == 0){completePlace();}
        if(roundNumber % 4 == 1){switchPlace();}
        if(roundNumber % 15 == 0){spendResearch();}
        if(roundNumber % 60 == 0){manageManagers();}//*/
    }
    catch(err)
    {
       console.log("!!eisDEBUG: CRASH on doRound #" + roundNumber);
    }
    
    roundNumber++;
    setTimeout(function(){doRound();}, timeoutLength);
};

function clickActives()
{
    console.log("     eisDEBUG: clickActives");
    for(i = 0; i < 5; i++)
    {
        var nextNode = document.getElementById("actives").childNodes[i];
        if(nextNode.style.display != "none")
        {
            nextNode.click();
//            console.log("  eisDEBUG: successfully clicked active #" + i);
            if(i==0){console.log("          eisDEBUG: ACTION: successfully clicked active(s)");}
        }
    }
};

function buyBuildings()
{
    var requirementText = getRequirementText();
    console.log("     eisDEBUG: buyBuildings. Requirement Text is " + requirementText);
    
    var requirementCount;   // How many we need
    var requirementTarget;  // The name of the building
    var targetNumber;       // The position of the building
    
        if(requirementText.match(/[0-9]+% - Build [0-9]+ [A-z]+/g) != null && requirementText.match(/[0-9]+% - Build [0-9]+ of tiers 1-5/g) == null)
        {
            // example: "36% - Build 50 Bloodhound"
            requirementCount = Number(requirementText.match(/[0-9]+/g)[1]);
            requirementTarget = requirementText.match(/[A-z]+/g)[1];
            console.log("     eisDEBUG: requirement is to build " + requirementTarget + "(" + requirementCount + ")");
            targetNumber = getBuildingPosition(requirementTarget);

            for(i = 0; i < requirementCount; i++)
            {
//               if(Number(document.getElementsByClassName("building-cont")[targetNumber].childNodes[2].innerHTML) <= Number(document.getElementsByClassName("currency-count")[1].innerHTML))
//               {
                doClick(document.getElementsByClassName("building-cont")[targetNumber].childNodes[0]);
//               }
            }
            buyBestBuilding();
        }
        else if (requirementText.match(/[0-9]+% - Have [0-9]+ [A-z]+/g) != null)
        {
            // example: "25% - Have 1000000 Deer"
            console.log("     eisDEBUG: requirement is to build anything (have)");
            if(Number(requirementText.match(/[0-9]+/g)[0]) < 75)
            {
                buyBestBuilding();
            }
        }
        else if (requirementText.match(/[0-9]+% - Generate [0-9]+ [A-z]+/g) != null)
        {
            // example: "0% - Generate 2200000 Lamb"
            console.log("     eisDEBUG: requirement is to build anything (generate)");
            buyBestBuilding();
        }
        else if (requirementText.match(/[0-9]+% - Reach [0-9]+ income!/g) != null)
        {
            // example: "29% - Reach 5250 income!"
            console.log("     eisDEBUG: requirement is to build anything (income)");
            buyBestBuilding();
        }
        else if (requirementText.match(/[0-9]+% - Have [0-9]+ income from [A-z]+/g) != null)
        {
            // example: "15% - Have 300 income from Shepherd"
            requirementTarget = requirementText.match(/[A-z]+/g)[3];
            console.log("     eisDEBUG: requirement is to build " + requirementTarget);
            targetNumber = getBuildingPosition(requirementTarget);
            //research-cont

            if(Number(requirementText.match(/[0-9]+/g)[0]) < 75)
            {
                doClick(document.getElementsByClassName("research-cont")[targetNumber].childNodes[0]);
                if(Number(requirementText.match(/[0-9]+/g)[0]) < 10)
                {
                    buyBestBuilding();
                }
            }
        }
        else if (requirementText.match(/[0-9]+% - Build [0-9]+ of tiers 1-5/g) != null)
        {
            // example: "92% - Build 30 of tiers 1-5"
            requirementCount = Number(requirementText.match(/[0-9]+/g)[1]);
            console.log("     eisDEBUG: requirement is to build tiers 1-5 (" + requirementCount + ")");

            for(i = 0; i < 5; i++)
            {
//               var remaining = 
            }
        }
        else
        {
            console.log("     eisDEBUG: ERROR: did not recognize requirement");
        }
    //}
    
    buyBestBuilding();
};

function buyBestBuilding()
{
    bestEfficiency = -1;
    mostEfficientBuilding = -1;
    
    console.log("     eisDEBUG: buyingBestBuilding()");
/*    
    // TODO: At the moment this seems to be functioning properly, HOWEVER, it reaches a point where it is buying buildings too fast and never makes it to the more expensive and efficient buildings.

    for(i = 0; i < 10; i++)
    {
        if(Number(document.getElementsByClassName("currency-count")[1].innerHTML) > 250000)
        {
            console.log("     eisDEBUG: ignoring first five");
            i = 6;
        }
        // console.log("  ---eisDEBUG: j is " + j);
        if(Number(document.getElementsByClassName("building-cont")[i].childNodes[2].innerHTML) <= Number(document.getElementsByClassName("currency-count")[1].innerHTML))
        { // building is affordable
            // console.log("     eisDEBUG: currency " + document.getElementsByClassName("currency-count")[1].innerHTML + " is greater than or equal to cost " + document.getElementsByClassName("building-cont")[i].childNodes[2].innerHTML);
            efficiency = document.getElementsByClassName("building-cont")[i].childNodes[3].innerHTML / document.getElementsByClassName("building-cont")[i].childNodes[2].innerHTML; // income divided by cost
            // console.log("     eisDEBUG: income " + document.getElementsByClassName("building-cont")[i].childNodes[3].innerHTML + " / cost " + document.getElementsByClassName("building-cont")[i].childNodes[2].innerHTML + " is efficiency " + efficiency);
            if(Number(efficiency) >= Number(bestEfficiency))
            {
                bestEfficiency = Number(efficiency);
                mostEfficientBuilding = i;
            }
        }
        else
        {
            // console.log("     eisDEBUG: currency " + document.getElementsByClassName("currency-count")[1].innerHTML + " is less than cost " + document.getElementsByClassName("building-cont")[i].childNodes[2].innerHTML);
        }
    }

    if(mostEfficientBuilding != -1)
    {
        console.log("          eisDEBUG: ACTION: bought building " + mostEfficientBuilding);
        doClick(document.getElementsByClassName("building-cont")[mostEfficientBuilding].childNodes[0]);
    }//*/
};

function buyUpgrades()
{
//    console.log("  eisDEBUG: buyUpgrades");
};

function completePlace()
{
    console.log("     eisDEBUG: completePlace");
//    if(document.getElementsByClassName("clicker button").length > 0 && document.getElementsByClassName("clicker button")[0].childNodes[0].data == "Complete")
    if(document.getElementsByClassName("clicker button").length > 0 && document.getElementsByClassName("clicker button")[0].attributes[1].value == ".0.1.1")
    {
        document.getElementsByClassName("clicker button")[0].click();
        completedPlaces++;
        console.log("          eisDEBUG: ACTION: successfully completed place (" + completedPlaces + " total)");
        currentPlace--;
//        switchPlace();
    }
};

function switchPlace()
{
    completePlace();
    console.log("     eisDEBUG: switchPlace");
    currentPlace++;
    if(currentPlace >= document.getElementsByClassName("place-cont").length || currentPlace < 0)
    {
        currentPlace = 0;
    }
    
    document.getElementsByClassName("place-cont")[currentPlace].click();
    console.log("     eisDEBUG: switched to place " + currentPlace);
};

function spendResearch()
{
    console.log("     eisDEBUG: spendResearch");
    
};

function manageManagers()
{
//    console.log("     eisDEBUG: manageManagers");
};

function getRequirementText()
{
    var requirementText;
    var divCollection = document.getElementsByTagName("div")
    for(i = 0; i < divCollection.length; i++)
    {
        if(divCollection[i].attributes[0].value == ".0.1.4")
        {
//            requirementDiv = divCollection[i];
            requirementText = divCollection[i].textContent;
//            console.log("FOUND .0.1.4: " + requirementText)
        }
    }
    
    return requirementText;
}
    
function getBuildingPosition(buildingName)
{
    var position;
    
    for(i = 0; i < 10; i++)
    {
        if(document.getElementsByClassName("building-cont")[i].childNodes[0].innerHTML == buildingName)
        {
            position = i;
            console.log("     eisDEBUG: getBuildingPosition: " + buildingName + " is position " + position);
        }
    }
    
    return position;
};

function getAdjustedIncome()
{
    //document.getElementsByClassName("place-cont")[currentPlace].attributes[0].value // This is the data-reactid
    var placeType = document.getElementsByClassName("hierarchy_name").length - 1 - Number(document.getElementsByClassName("place-cont")[currentPlace].attributes[0].value.match(/[0-9]+/g)[2]);
    
    doClick(document.getElementsByClassName("tabs-menu-item")[1]);
    // Click on "Research"
    
    document.getElementsByClassName("res-curr clicker button")[placeType].click();
    // Click on the appropriate place
    
    var incomeOffset = 0;
    for(i = 0; i < document.getElementsByClassName("clicker research-cont").length; i++)
    {
        // ex. "Reserves 2 / sec (from 1) to buy Shepherd30"
        if(document.getElementsByClassName("clicker research-cont")[i].textContent.match(/Reserves/g) != null)
        {
            incomeOffset += Number(document.getElementsByClassName("clicker research-cont")[i].textContent.match(/[0-9]+/g)[0])
        }
    }
    
    var income = Number(document.getElementsByClassName("currency-count")[1].innerHTML);
    var adjustedIncome = income - incomeOffset;
    if(adjustedIncome < 0)
    {
        adjustedIncome = 0;
    }
    
    console.log("     eisDEBUG: income is " + income + ", " + incomeOffset + " is being reserved. Adjusted income is " + adjustedIncome);
    return adjustedIncome;
};

function triggerMouseEvent (node, eventType) {
   var clickEvent = document.createEvent ('MouseEvents');
   clickEvent.initEvent (eventType, true, true);
   node.dispatchEvent (clickEvent);
}

function doClick (target) {
   triggerMouseEvent (target, "mouseover");
   triggerMouseEvent (target, "mousedown");
   triggerMouseEvent (target, "mouseup");
   triggerMouseEvent (target, "click");
}
    
/*

document.getElementsByClassName("hierarchy_name").length // how many places have been unlocked






**/
