// 0 - No console logs
// 1 - Top-level Debugs (startup and errors)
// 2 - Basic Debugs
// 3 - Temp Debugs

var verboseLevel = 1;

function eisDebug(level, message) {
    if(level <= verboseLevel) {
        console.log(message);
    }
}

function debugSet() {
    debugPrintNestScores();
    debugPrintIds();
    debugEmptyNest();
    debugPrintIds();
}

function debugEmptyNest() {
    for(let i = thePlayer.hatcheries[0].nest.length - 1; i >= 0; i--) {
        thePlayer.removeCritter(thePlayer.hatcheries[0].nest[i].id);
    }
}

function debugPrintNestScores() {
    let nestScores = [];
    for(let i = 0; i < thePlayer.hatcheries[0].nest.length; i++) {
        nestScores.push(thePlayer.hatcheries[0].nest[i].score);
    }
    console.log('EisDebug, the scores in the nest are ' + nestScores);
}

function debugPrintIds() {
    let nestIds = [];
    for(let i = 0; i < thePlayer.hatcheries[0].nest.length; i++) {
        nestIds.push(thePlayer.hatcheries[0].nest[i].id);
    }
    console.log('EisDebug, the ids in the nest are ' + nestIds);

    let critterIds = [];
    for(let i = 0; i < thePlayer.critters.length; i++) {
        critterIds.push(thePlayer.critters[i].id);
    }
    console.log('EisDebug, the ids in thePlayer.critters are ' + critterIds);
}

function debugTestScores(count) {
    let scores = [];
    let scoreTotal = 0;

    let kingStats = [5,5,5,5,5,5];
    let queenStats = [5,5,5,5,5,5];
    for(let i = 0; i < count; i++) {
        let newStats = [];
        for(let i = 0; i < kingStats.length; i++) {
            newStats.push(Critter.randomStat(kingStats[i], queenStats[i], 0.2, 0.01));
        }
        let offspring = new Critter(-1, -1, 'normal', newStats, []);
        offspring.setLocation('debug');
        scores.push(offspring.score)
        scoreTotal += offspring.score;
        thePlayer.removeCritter(offspring.id);
    }

    console.log('EisDebug @ debugTestScores(), mean score is ' + scoreTotal / count);
}