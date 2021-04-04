/**
 * eisbaerBorealis' AI code for Ghost in the Cell, Wood 3 League
 * 
 * VERSION 1.0.5 ish
 **/

const factoryCount = parseInt(readline()); // the number of factories
const linkCount = parseInt(readline()); // the number of links between factories
var factoryLookup = {};
for (let i = 0; i < linkCount; i++) {
    var inputs = readline().split(' ');
    const factory1 = parseInt(inputs[0]);
    const factory2 = parseInt(inputs[1]);
    const distance = parseInt(inputs[2]);

    if(factoryLookup[factory1.toString()] == null) {
        factoryLookup[factory1.toString()] = {};
    }
    if(factoryLookup[factory2.toString()] == null) {
        factoryLookup[factory2.toString()] = {};
    }
    factoryLookup[factory1.toString()][factory2.toString()] = distance;
    factoryLookup[factory2.toString()][factory1.toString()] = distance;
}

let myFactories = {};

let round = 1;

// game loop
while (true) {
    // console.error('\tEisDEBUG: Begin round ' + round);
    const entityCount = parseInt(readline()); // the number of entities (e.g. factories and troops)
    
    let bestTarget = -1;
    let bestTargetPop = 1000;

    let bestArmy = 0;
    let mainBaseIndex = -1;

    let gameFactories = [];
    let gameTroops = [];
    for (let i = 0; i < entityCount; i++) {
        var inputs = readline().split(' ');
        const entityId = parseInt(inputs[0]);
        const entityType = inputs[1];
        const arg1 = parseInt(inputs[2]);
        const arg2 = parseInt(inputs[3]);
        const arg3 = parseInt(inputs[4]);
        const arg4 = parseInt(inputs[5]);
        const arg5 = parseInt(inputs[6]);

        if(entityType == 'FACTORY') {
            gameFactories.push({
                'id': entityId,
                'owner': arg1,
                'pop': arg2,
                'prod': arg3,
                'nextPop': arg2
            });
            if(arg1 == 1 && arg2 > bestArmy) {
                mainBaseIndex = entityId;
                bestArmy = arg2;
            }
        } else {
            gameTroops.push({
                'id': entityId,
                'owner': arg1,
                'target': arg3,
                'pop': arg4
            });
        }
    }

    for(let i = 0; i < gameTroops.length; i++) {
        for(let j = 0; j < gameFactories.length; j++) {
            if(gameFactories[j].id === gameTroops[i].target) {
                gameFactories[j].nextPop -= gameTroops[i];
            }
        }
    }
    mainBaseId = gameFactories[mainBaseIndex].id

    let nextMove = '';

    for(let i = 0; i < gameFactories.length; i++) {
        if(gameFactories[i].owner != 1) {
            if(gameFactories[i].nextPop == 0) {
                if(mainBaseId != -1) {
                    nextMove = 'MOVE ' + mainBaseId + ' ' + gameFactories[i].id + ' 2'
                    gameFactories[mainBaseIndex].pop -= 2;
                }
            } else if(gameFactories[i].pop < bestTargetPop){
                bestTargetPop = gameFactories[i].pop;
                bestTarget = gameFactories[i].id
            }
        } else {
            if(nextMove == '' && gameFactories[i].id != mainBaseId && gameFactories[i].pop >= 10) {
                let troopCount = 7;
                if(gameFactories[i].pop >= 20) {
                    troopCount = gameFactories[i].pop - 5;
                }
                nextMove = 'MOVE ' + gameFactories[i].id + ' ' + mainBaseId + ' ' + troopCount;
            }
        }
    }

    if(gameFactories[mainBaseIndex].pop / 2 > bestTargetPop && bestTarget != -1 && mainBaseId != -1) {
        nextMove = 'MOVE ' + mainBaseId + ' ' + bestTarget + ' ' + (bestTargetPop + 2);
    } 
    if(nextMove == '') {
        nextMove = 'WAIT';
    }

    console.log(nextMove);

    round++;
}