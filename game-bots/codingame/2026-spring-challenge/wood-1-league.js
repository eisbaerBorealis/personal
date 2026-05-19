var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);

var homeX = -1;
var homeY = -1;
var map = [];
for (let i = 0; i < height; i++) {
    const line = readline();
    map.push(line.split(''));

    if(homeX === -1) {
        for(let j = 0; j < width; j++) {
            if(map[i][j] === '0') {
                homeX = j;
                homeY = i;
                console.error(`Home found at ${homeX}, ${homeY}`);
                j = width; // break loop
            }
        }
    }
}

var myTrolls = [];

// game loop
var round = 0;
while (true) {
    round++;
    var commands = [];

    var inputs = readline().split(' ');
    var plumCount = parseInt(inputs[0]);
    var lemonCount = parseInt(inputs[1]);
    var appleCount = parseInt(inputs[2]);
    var bananaCount = parseInt(inputs[3]);
    var ironCount = parseInt(inputs[4]);
    var woodCount = parseInt(inputs[5]);

    var myScore = plumCount + lemonCount + appleCount + bananaCount;
    
    var inputs = readline().split(' ');
    var enemyScore = parseInt(inputs[0]) + parseInt(inputs[1]) + parseInt(inputs[2]) + parseInt(inputs[3]);

    var myTrees = [];
    const treesCount = parseInt(readline());
    for (let i = 0; i < treesCount; i++) {
        var inputs = readline().split(' ');
        const type = inputs[0];
        const x = parseInt(inputs[1]);
        const y = parseInt(inputs[2]);
        const size = parseInt(inputs[3]);
        const health = parseInt(inputs[4]);
        const fruits = parseInt(inputs[5]);
        const cooldown = parseInt(inputs[6]);

        myTrees.push({
            'type' : type,
            'x' : x,
            'y' : y,
            'size' : size,
            'health' : health,
            'fruits' : fruits,
        });
    }

    const trollsCount = parseInt(readline());
    for (let i = 0; i < trollsCount; i++) {
        var inputs = readline().split(' ');
        const id = parseInt(inputs[0]);
        const player = parseInt(inputs[1]);
        const x = parseInt(inputs[2]);
        const y = parseInt(inputs[3]);
        const movementSpeed = parseInt(inputs[4]);
        const carryCapacity = parseInt(inputs[5]);
        const harvestPower = parseInt(inputs[6]);
        const chopPower = parseInt(inputs[7]);
        const carryPlum = parseInt(inputs[8]);
        const carryLemon = parseInt(inputs[9]);
        const carryApple = parseInt(inputs[10]);
        const carryBanana = parseInt(inputs[11]);
        const carryIron = parseInt(inputs[12]);
        const carryWood = parseInt(inputs[13]);

        if(player === 0) {
            let found = false;
            let totalCarry = carryPlum + carryLemon + carryApple + carryBanana + carryIron + carryWood;
            for(let j = 0; j < myTrolls.length; j++) {
                if(myTrolls[j].id === id) {
                    found = true;
                    // update troll info
                    myTrolls[j].x = x;
                    myTrolls[j].y = y;
                    myTrolls[j].totalCarry = totalCarry;
                }
            }
            if(!found) {
                myTrolls.push({
                    'id' : id,
                    'x' : x,
                    'y' : y,
                    'capacity' : carryCapacity,
                    'totalCarry' : totalCarry,
                    'command' : '',
                });
            }
            console.error(`Troll ${id} found at ${x}, ${y} with carry ${totalCarry}`);
        }
    }

    // train troll if sufficient resources
    let trollCost = 1 + myTrolls.length;

    if(plumCount >= trollCost && lemonCount >= trollCost && appleCount >= trollCost
        && myScore - trollCost >= enemyScore && round < 75) {
        commands.push(`TRAIN 1 1 1 0`);
    }

    // build array of all troll/tree distances if tree has fruit
    var trollTreeDistances = [];
    for(let i = 0; i < myTrolls.length; i++) {
        if(myTrolls[i].totalCarry >= myTrolls[i].capacity) {
            if(Math.abs(myTrolls[i].x - homeX) + Math.abs(myTrolls[i].y - homeY) === 1) {
                myTrolls[i].command = `DROP ${myTrolls[i].id}`;
                console.error(`Troll ${myTrolls[i].id} is dropping at home`);
            } else {
                myTrolls[i].command = `MOVE ${myTrolls[i].id} ${homeX} ${homeY}`;
                console.error(`Troll ${myTrolls[i].id} is moving home to drop`);
            }
            continue; // skip to next troll, this one is full and needs to drop
        }
            
        for(let j = 0; j < myTrees.length; j++) {
            if(myTrees[j].fruits > 0) {
                let distance = Math.abs(myTrolls[i].x - myTrees[j].x) + Math.abs(myTrolls[i].y - myTrees[j].y);
                trollTreeDistances.push({
                    'trollId' : myTrolls[i].id,
                    'treeX' : myTrees[j].x,
                    'treeY' : myTrees[j].y,
                    'distance' : distance,
                    'score' : myTrees[j].fruits / (distance + 1), // simple heuristic: more fruits and closer is better
                });
            }
        }
    }

    // sort by best score
    trollTreeDistances.sort((a, b) => b.score - a.score);

    // assign commands to trolls. After assigning a command to a troll, remove all entries for that troll from the distances array, as well as any entries for the tree if the command is to harvest
    while(trollTreeDistances.length > 0) {
        let best = trollTreeDistances.shift();

        // if already on tree, harvest
        let troll = myTrolls.find(t => t.id === best.trollId);
        if(troll.x === best.treeX && troll.y === best.treeY) {
            troll.command = `HARVEST ${troll.id}`;
            // remove all entries for this tree
            trollTreeDistances = trollTreeDistances.filter(t => t.treeX !== best.treeX || t.treeY !== best.treeY);
        } else {
            troll.command = `MOVE ${troll.id} ${best.treeX} ${best.treeY}`;
        }
        // remove all entries for this troll
        trollTreeDistances = trollTreeDistances.filter(t => t.trollId !== best.trollId);
    }

    // Each turn you can print any number of commands, separated by ;.

    // MOVE id x y Move troll id to cell (x, y).
    // HARVEST id Make troll id harvest on its current cell.
    // PLANT id type Make troll id plant a type on its current cell: PLUM, LEMON, APPLE or BANANA.
    // PICK id type Make troll id pick one type from the shack: PLUM, LEMON, APPLE or BANANA.
    // DROP id Make troll id drop all carried items at the shack.
    // TRAIN moveSpeed carryCapacity harvestPower chopPower Train a new troll with the given attributes.
    // WAIT to do nothing.
    // MSG text to display a message in the replay.

    for(let i = 0; i < myTrolls.length; i++) {
        if(myTrolls[i].command === '') {
            console.error(`No command assigned to troll ${myTrolls[i].id}`);
        } else {
            commands.push(myTrolls[i].command);
        }
    }

    console.log(commands.join(';'));
}
