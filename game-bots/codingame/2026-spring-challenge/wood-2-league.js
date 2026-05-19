/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
var homeX = -1;
var homeY = -1;
const map = [];
for (let i = 0; i < height; i++) {
    const line = readline();
    map.push(line.split(''));
    for(let j = 0; j < width; j++) {
        if(map[i][j] === '0') {
            homeX = j;
            homeY = i;
            console.error(`Home found at ${homeX}, ${homeY}`);
        }
    }
}

var myTrolls = [];
// game loop
while (true) {
    for (let i = 0; i < 2; i++) {
        var inputs = readline().split(' ');
        const plum = parseInt(inputs[0]);
        const lemon = parseInt(inputs[1]);
        const apple = parseInt(inputs[2]);
        const banana = parseInt(inputs[3]);
        const iron = parseInt(inputs[4]);
        const wood = parseInt(inputs[5]);
    }
    var trees = [];
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
        trees.push({
            // 'id' : i,
            'type' : type,
            'x' : x,
            'y' : y,
            'size' : size,
            'health' : health,
            'fruits' : fruits
        });
    }
    const trollsCount = parseInt(readline());
    console.error(`trollsCount is ${trollsCount}`)
    if(myTrolls.length === 0) {
        myTrolls = Array(trollsCount / 2).fill({
            'id' : -1,
            'x' : 0,
            'y' : 0,
            'capacity' : -1,
            'fruitCount' : 0,
            'command' : ''
        }, 0);
        console.error(`  DEBUG: myTrolls initialized with size ${myTrolls.length}`);
    }
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

        for(let j = 0; j < myTrolls.length; j++) {
            let currTroll = myTrolls[j];
            if(currTroll.id === -1) {
                currTroll.id = id;
                currTroll.capacity = carryCapacity;
            }
            if(currTroll.id === id) {
                currTroll.x = x;
                currTroll.y = y;
                currTroll.carryTotal = carryPlum + carryLemon + carryApple + carryBanana + carryIron + carryWood;
            }
        }
    }

    for(let i = 0; i < myTrolls.length; i++) {
        let currTroll = myTrolls[i];
        // if arms full, MOVE to home
        if(currTroll.carryTotal >= currTroll.capacity) {
            console.error(`Troll ${currTroll.id} has full hands`);
            // if next to shack, DROP
            if((Math.abs(currTroll.x - homeX) + (Math.abs(currTroll.y - homeY)) <= 1)) {
                currTroll.command = `DROP ${currTroll.id}`;
            } else {
                currTroll.command = `MOVE ${currTroll.id} ${homeX} ${homeY}`;
            }
        } else {
            // find closest tree with fruit
            let bestTreeID = -1;
            let bestTreeX = -1;
            let bestTreeY = -1;
            let bestTreeDist = -1;
            for(let j = 0; j < trees.length; j++) {
                let currTree = trees[j];
                if(currTree.fruits > 0) {
                    let currDist = Math.abs(currTroll.x - currTree.x) + Math.abs(currTroll.y - currTree.y);
                    console.error(`tree ${currTree.id} has fruits; currDist is ${currDist}`)
                    if(bestTreeID === -1 || bestTreeDist > currDist) {
                        // bestTreeID = currTree.id;
                        bestTreeID = j;
                        bestTreeDist = currDist;
                        bestTreeX = currTree.x;
                        bestTreeY = currTree.y;
                    }
                }
            }
            console.error(`Best Tree is ${bestTreeID} with dist of ${bestTreeDist}`);
            if(bestTreeDist === 0) {
                currTroll.command = `HARVEST ${currTroll.id}`
            } else {
                currTroll.command = `MOVE ${currTroll.id} ${bestTreeX} ${bestTreeY}`;
            }
        }
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');


    // valid actions:
    // MOVE <id> <x> <y>
    // HARVEST <id> - when you are on the same cell as a tree
    // DROP <id> - when you are next to your shack and carry items
    // console.log('MOVE 0 7 7');
    for(let i = 0; i < myTrolls.length; i++) {
        console.log(myTrolls[i].command);
    }
}
