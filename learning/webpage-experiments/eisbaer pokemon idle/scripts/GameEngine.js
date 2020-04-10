const AUTO_SAVE_INTERVAL = 60;
const ACTION_DURATION = 200;

class GameEngine {

    constructor() {
        console.log('EisbaerDebug@GameEngine.constructor, ENGINE STARTED');
        this.sessionTime = 0;
        this.ticks = 0;

        // this.autoSaveInterval = 60;
        this.ticksPerSecond = 20;
        // this.actionDuration = 2000;
        // this.actionDuration = 200;

        this.actionActive = false;
        this.actionCountdown = 0;
        this.queuedAction = null;

        // this.enemyPokemon = null;
        // this.fightingPokemon = [];
        this.battle = null;

        this.loopCount = 0;

        updatePokemonTeam();
        this.tickInterval = setInterval(() => {
            this.doTick();
        }, 1000 / this.ticksPerSecond);
    }

    doTick() {
        this.ticks++;
        if(this.ticks >= this.ticksPerSecond) {
            this.ticks = 0;
            this.sessionTime++;
            thePlayer.addSecond();
            if(this.sessionTime % AUTO_SAVE_INTERVAL === 0) {
                thePlayer.savePlayer();
                console.log('EisbaerDebug@GameEngine.doTick, GAME SAVED');
            }
        }

        if(this.actionActive) {
            this.actionCountdown -= (1000 / this.ticksPerSecond);
            if(this.actionCountdown <= 0) {
                this.actionActive = false;
                this.finishAction();
            }
        }
    }

    setTicksPerSecond(newValue) {
        this.ticksPerSecond = newValue;
        clearInterval(this.tickInterval);
        this.tickInterval = setInterval(() => {
            this.doTick();
        }, 1000 / this.ticksPerSecond);
    }

    startAction(actionId) {
        // console.log('EisbaerDebug@startAction, action is ' + data_actions[actionId].text);
        if(!this.actionActive) {
            this.actionActive = true;
            this.actionCountdown = ACTION_DURATION;
            this.queuedAction = actionId;
        }
    }

    // startExplore() {
    //     if(!this.actionActive) {
    //         this.actionActive = true;
    //         this.actionCountdown = ACTION_DURATION;
    //         this.queuedAction = 'explore';
    //     }
    // }

    finishAction() {
        // if(this.queuedAction === 'explore') {
        if(this.queuedAction === -1) {
            // console.log('EisbaerDebug@finishAction, about to explore...');
            if(thePlayer.getLocalUnlockedActions().length < thePlayer.getLocalActionIds().length) {
                // console.log('EisbaerDebug@finishAction, something can be explored.');
                // TODO
                let localActions = thePlayer.getLocalActionIds();
                let actionFound = false;
                while(!actionFound) {
                    this.loopCount++;
                    let random = Math.floor(Math.random() * localActions.length);
                    if(!thePlayer.isActionUnlocked(localActions[random])) {
                        thePlayer.unlockAction(localActions[random]);
                        actionFound = true;
                        // console.log('EisbaerDebug@finishAction, action has been found');
                    }
                    if(this.loopCount > 200) {
                        this.loopCount = 0;
                        console.log('EisbaerDebug@finishAction, too many failed loops.');
                        actionFound = true;
                    }
                }
                updateActions();
            } // else do nothing
            // else { console.log('EisbaerDebug@finishAction, all actions explored'); }
        } else {
            let responses = data_actions[this.queuedAction].response;
            let nextResults = 'nothing';

            for(let i = 0; i < responses.length; i++) {
                // console.log('responses[i].objectiveType is ' + responses[i].objectiveType);
                switch(responses[i].objectiveType) {
                    case 'mini':
                        if(thePlayer.getMiniObjectives()[responses[i].objectiveId]) {
                            document.getElementById('action-result').innerHTML = responses[i].text;
                            nextResults = responses[i].result;
                            i = responses.length;
                        } else {
                            document.getElementById('action-result').innerHTML = 'Error? (mini-type)';
                        }
                        break;
                    case 'main':
                        // console.log('EisbaerDebug@finishAction, case "main", responses[i].objectiveId is ' + responses[i].objectiveId);
                        if(thePlayer.getObjectives()[responses[i].objectiveId]) {
                            document.getElementById('action-result').innerHTML = responses[i].text;
                            nextResults = responses[i].result;
                            i = responses.length;
                        } else {
                            document.getElementById('action-result').innerHTML = 'Error? (main-type)';
                        }
                        break;
                    case 'none':
                        document.getElementById('action-result').innerHTML = responses[i].text;
                        nextResults = responses[i].result;
                        i = responses.length;
                        break;
                    case 'future':
                        document.getElementById('action-result').innerHTML = 'Error? (future-type)';
                        break;
                    default:
                        console.log('GameEngine.finishAction(), switch for objectiveType hit default.');
                }
            }

            if(nextResults != 'nothing') {
                for(let i = 0; i < nextResults.length; i++) {
                    switch(nextResults[i].type) {
                        case 'travel':
                            // console.log('GameEngine.finishAction(), TRAVEL');
                            thePlayer.changeLocation(nextResults[i].value);
                            updateActions();
                            break;
                        case 'wilderness':
                                console.log('GameEngine.finishAction(), WILDERNESS');
                            break;
                        case 'heal':
                            // console.log('GameEngine.finishAction(), HEAL');
                            this.healAll();
                            break;
                        case 'objective':
                            // console.log('GameEngine.finishAction(), OBJECTIVE, id is ');
                            thePlayer.completeObjective(nextResults[i].value);
                            break;
                        case 'miniObjective':
                            // console.log('GameEngine.finishAction(), MINIOBJECTIVE');
                            thePlayer.completeMiniObjective(nextResults[i].value);
                            break;
                        case 'item':
                                // console.log('GameEngine.finishAction(), ITEM');
                            thePlayer.alterItemCount(nextResults[i].value, nextResults[i].count);
                            break;
                        case 'special':
                            // console.log('GameEngine.finishAction(), SPECIAL');
                            doSpecial(nextResults[i].value);
                            break;
                        case null:
                            // console.log('GameEngine.finishAction(), NULL');
                            break;
                        default:
                            console.log('GameEngine.finishAction(), switch for result.type hit default.');
                    }
                }
            } else {
                // document.getElementById('action-result').innerHTML = 'Error. (no result)';
                // console.log('nextResults is ' + nextResults);
            }
        }

        this.queuedAction = null;
    }

    healAll() {

    }
}