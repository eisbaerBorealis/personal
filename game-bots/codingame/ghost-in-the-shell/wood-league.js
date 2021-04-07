/**
 * eisbaerBorealis' AI code for Ghost in the Cell, Wood 3 League
 * 
 * VERSION 1.1.6
 *    Got through Wood 3 and Wood 2 and to position 37
 *    of Wood 1, all using the rules from Wood 3.
 *    But it's time to redo all the logic to include new rules.
 **/

 const factoryCount = parseInt(readline()); // the number of factories
 const linkCount = parseInt(readline()); // the number of links between factories
 
 var factories = {};
 
 for (let i = 0; i < linkCount; i++) {
     var inputs = readline().split(' ');
     const factory1 = parseInt(inputs[0]);
     const factory2 = parseInt(inputs[1]);
     const distance = parseInt(inputs[2]);
 
     if(factories[factory1.toString()] === undefined) {
         factories[factory1.toString()] = {};
         factories[factory1.toString()].distances = {};
     }
     if(factories[factory2.toString()] === undefined) {
         factories[factory2.toString()] = {};
         factories[factory2.toString()].distances = {};
     }
     factories[factory1.toString()].distances[factory2.toString()] = distance;
     factories[factory2.toString()].distances[factory1.toString()] = distance;
 }
 
 var idealBase = -1;
 
 let round = 1;
 
 // game loop
 while (true) {
     // console.error('\tEisDEBUG: Begin round ' + round);
     const entityCount = parseInt(readline()); // the number of entities (e.g. factories and troops)
 
     let enemyCount = 0;
     let neutralCount = 0
     let myCount = 0
 
     let gameTroops = [];
 
     for (let i = 0; i < entityCount; i++) {
         var inputs = readline().split(' ');
         const entityId = parseInt(inputs[0]);
         const entityType = inputs[1];
         const arg1 = parseInt(inputs[2]); // owner (-1, 0, 1) // owner (-1, 0, 1)
         const arg2 = parseInt(inputs[3]); // # of cyborgs     // home of troop
         const arg3 = parseInt(inputs[4]); // production (0-3) // target of troop
         const arg4 = parseInt(inputs[5]); //                  // cyborgs in troop
         const arg5 = parseInt(inputs[6]); //                  // turns until troop arrives
 
         if(entityType == 'FACTORY') {
             factory = factories[i.toString()];
             factory.owner = arg1;
             factory.pop = arg2;
             factory.prod = arg3;
             factory.nextPop = factory.pop;
 
             switch(factory.owner) {
                 case -1:
                     enemyCount++;
                     break;
                 case 0:
                     neutralCount++;
                     break;
                 case 1:
                     myCount++;
                     break;
                 default:
                     console.error('ERROR: impossible switch case (' + factory.owner + ')');
             }
         } else {
             gameTroops.push({
                 'id': entityId,
                 'owner': arg1,
                 'target': arg3,
                 'pop': arg4,
                 'time': arg5
             });
         }
     }
 
     if(idealBase === -1) {
         console.error('idealBase is -1, trying to fix...');
         let shortestDistance = 1000000;
 
         for(let i = 0; i < factoryCount; i++) {
             factory = factories[i.toString()];
             if(factory.owner !== -1 && factory.prod > 1) {
                 let totalDistance = 0;
                 for(let j = 0; j < factoryCount; j++) {
                     if(factory.distances[j.toString()] !== undefined) {
                         totalDistance += factory.distances[j.toString()];
                     }
                 }
                 if(shortestDistance > totalDistance) {
                     shortestDistance = totalDistance;
                     idealBase = i;
                     console.error('New ideal base! ID: ' + idealBase + ', distance: ' + shortestDistance);
                 } else {
                 }
             }
         }
     }
 
     for(let i = 0; i < gameTroops.length; i++) {
         troop = gameTroops[i];
         factory = factories[troop.target.toString()];
         if(troop != undefined && factory != undefined) {
            if(troop.owner !== factory.owner) {
                factory.nextPop -= troop.pop;
            } else {
                factory.nextPop += troop.pop;
            }
         }
     }
 
     let nextMove = '';
     let army = -1;
 
     for(let i = 0; i < factoryCount; i++) {
         let biggestArmy = -1;
         factory = factories[i.toString()];
         if(factory.owner === 1 && factory.pop > biggestArmy) {
             biggestArmy = factory.pop;
             army = i;
         }
     }
 
     console.error('idealBase is ' + idealBase);
 
     if(factories[idealBase.toString()] !== undefined && factories[idealBase.toString()].owner !== 1) {
         console.error('Moving everything to take the ideal base');
         if(factories[army.toString()].pop > 3) {
            nextMove = 'MOVE ' + army + ' ' + idealBase + ' ' + (factories[army.toString()].pop - 3);
         }
     } else {
         let bestTarget = null;
         let bestTargetID = -1;
 
         for(let i = 0; i < factoryCount; i++) {
             factory = factories[i.toString()];
             if(factory.owner !== 1) {
                 if(bestTarget === null) {
                     if(factory.nextPop > -1 && factory.nextPop < factories[army.toString()].pop / 2) {
                         bestTargetID = i;
                         bestTarget = factory;
                     }
                 } else {
                     if(factory.nextPop > -1 && factory.nextPop < factories[army.toString()].pop / 2
                             && factory.prod > factories[bestTargetID.toString()].prod) {
                         bestTargetID = i;
                         bestTarget = factory;
                     }
                 }
             }
         }
         if(bestTargetID !== -1 && factories[army.toString()].pop > 1) {
             console.error('Moving everything to attack the best target');

            let armySize = 1;
            let basePop = factories[army.toString()].pop;
            if(basePop > 10) {
                armySize = Math.floor(basePop / 2);
            } else {
                armySize = basePop - 3;
            }
            if(armySize > 0) {
             nextMove = 'MOVE ' + army + ' ' + bestTargetID + ' ' + armySize;
            }
         }
     }
 
     if(nextMove === '') {
         let bestBoostID = -1;
         let bestBoostPop = 10;
         for(let i = 0; i < factoryCount; i++) {
             factory = factories[i.toString()];
             if(i != idealBase && factory.owner === 1 && factory.pop > bestBoostPop) {
                 bestBoostPop = factory.pop;
                 bestBoostID = i;
             }
         }
         if(bestBoostID !== -1 && idealBase != -1) {
             console.error('Giving a boost to the ideal base');
             nextMove = 'MOVE ' + bestBoostID + ' ' + idealBase + ' ' + (factories[bestBoostID.toString()].pop - 5);
         }
     }

     if(neutralCount === 0) {
        let weakestEnemy = -1;
        for(let i = 0; i < factoryCount; i++) {
            factory = factories[i.toString()];
            if(factory.owner === -1 && (weakestEnemy === -1 || factory.pop < factories[weakestEnemy.toString()].pop)) {
                weakestEnemy = i;
            }
        }
        if(weakestEnemy != -1 && factories[weakestEnemy.toString()].pop < factories[idealBase.toString()].pop / 2) {
            console.error('Go for the kill!');
            let armySize = 1;
            let basePop = factories[idealBase.toString()].pop;
            if(basePop > 27) {
                armySize = basePop - 25;
            } else {
                armySize = basePop - 3;
            }
            if(factories[idealBase.toString()].owner === 1 && armySize > 0) {
                nextMove = 'MOVE ' + idealBase + ' ' + weakestEnemy + ' ' + armySize;
            }
        }
     }
 
     if(nextMove === '') {
         console.error('Waiting...');
         nextMove = 'WAIT';
     }
 
     console.log(nextMove);
 
     round++;
 }