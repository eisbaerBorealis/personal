function mealwormFishing(newCount) {
    let count = newCount;
    console.log('DEBUG: starting mealwormFishing with count ' + count);
    let mwfInterval = setInterval(() => {
        let fishes = document.getElementsByClassName('fish');
        for(let i = 0; i < 12; i++) {
            let fish = fishes[i];
            if(fish.style.display !== 'none' && fish.style.opacity > 0.3) {
                if(Math.random() > 0.87) { // 0.85?
                    count--;
                    fish.click();
                    if(count < 10 ||
                        (count < 100 && count % 10 === 0) ||
                        (count % 20 === 0)){
                        console.log('  DEBUG: Caught a fish! Remaining count: ' + count);
                    }
                }
            }
        }

        if(count <= 0) {
            console.log('    DEBUG: caught enough fish!');
            clearInterval(mwfInterval);
        }
    }, 100);
}

function normalFishing(min, max) {
    let count = Math.floor(Math.random() * (max - min + 1) + min);
    let fishOn = false;
    let fishCountDown = 0;
    console.log('DEBUG: starting normalFishing with count ' + count);
    
    let fishingInterval = setInterval(() => {
        if(fishOn) {
            fishCountDown--;
            if(fishCountDown <= 0) {
                // console.log('    DEBUG: fishCountDown is ' + fishCountDown);
                if(Math.random() > 0.4) {
                    count--;
                    fishOn = false;
                    if(count < 10 ||
                        (count < 100 && count % 10 === 0) ||
                        (count % 20 === 0)){
                        console.log('  DEBUG: Caught a fish! Remaining count: ' + count);
                    }
                    fishCountDown = 17;
                    document.getElementsByClassName('fishcaught')[0].click();
                }
            }// else {console.log('    DEBUG: fishCountDown is ' + fishCountDown);}
        } else {
            let fishes = document.getElementsByClassName('fish');
            for(let i = 0; i < fishes.length; i++) {
                let fish = fishes[i];
                if(fish.style.display !== 'none' && fish.style.opacity > 0.3) {
                    if(Math.random() > 0.8) {
                        fishOn = true;
                        // console.log('  DEBUG: Hooked a fish!');
                        fish.click();
                        fishCountDown = 15 + Math.floor(Math.random() * 10);
                        // console.log('    DEBUG: new fishCountDown is ' + fishCountDown);
                    }
                }
            }
        }

        if(count <= 0) {
            console.log('DEBUG: caught enough fish!');
            clearInterval(fishingInterval);
        }
    }, 50);
}

function explore(newMinStam) {
    let countDown = 0;
    let minStam = newMinStam;
    let exploreInterval = setInterval(() => {
        if(document.getElementById('stamina') !== null && Number(document.getElementById('stamina').innerHTML.replace(/,/g, '')) > minStam) {
            if(countDown > 0) {
                countDown--;
            } else {
                document.getElementsByClassName('explorebtn')[0].click()
                countDown = 2 + Math.floor(Math.random() * 3);
            }
        }
    }, 197)
}

function farm() {
    let countDown = 0;
    let state = 'wait'; // plant, harvest

    let farmInterval = setInterval(() => {
        switch(state) {
            case 'wait':
                // if class c-progress-bar-fill has style width 100%, start harvest countdown
                if(document.getElementsByClassName('c-progress-bar-fill')[0].style.width == "100%") {
                    console.log('    DEBUG: progress bar is 100%!');
                    state = 'harvest';
                    countDown = Math.floor(Math.random() * 7 + 1);
                }
                break;
            case 'plant':
                if(countDown <= 0){
                    document.getElementsByClassName('plantallbtn')[0].click();
                    console.log('DEBUG: Planted all seeds!');
                    state = 'wait';
                } else {
                    countDown--;
                }
                break;
            case 'harvest':
                if(countDown <= 0){
                    document.getElementsByClassName('harvestallbtn')[0].click();
                    console.log('    DEBUG: Harvested all crops!');
                    state = 'plant';
                    countDown = Math.floor(Math.random() * 1 + 1);
                } else {
                    countDown--;
                }
                break;
            default:
                console.error('  DEBUG: ERROR: default in switch statement (farm()).');
        }
    }, 497)
}

/* Completed Tests
function mealwormTest() {
    let testInterval = setInterval(() => {
        let fishes = document.getElementsByClassName('fish');
        if(fishes[0].style.display !== 'none')
        {
            console.log('  DEBUG: fishes[0] opacity is ' + fishes[0].style.opacity); // this prints 11 times per fish; 7 times >0.3
        }
    }, 100);
}

function mealwormTest2() {
    let testInterval = setInterval(() => {
        let randomNum = Math.random();
        let testString = '' + (randomNum > 0.8);
        console.log('  DEBUG: randomNum is ' + randomNum + ', activate: ' + testString);
    }, 500);
}

function fishingTest() {
    let fishOn = false;
    let fishCaught = false;
    let fishCountDown = -1;

    let testInterval = setInterval(() => {
        if(fishOn) {
            fishCountDown--;
            if(fishCountDown <= 0) {
                if(Math.random() > 0.5) {
                    fishCaught = true;
                    fishOn = false;
                    console.log('  DEBUG: Caught a fish!');
                    document.getElementsByClassName('fishcaught')[0].click()
                }
            }
        } else {
            let fishes = document.getElementsByClassName('fish');
            for(let i = 0; i < fishes.length; i++) {
                let fish = fishes[i];
                if(fish.style.display !== 'none' && fish.style.opacity > 0.3) {
                    if(Math.random() > 0.8) {
                        fishOn = true;
                        console.log('  DEBUG: Hooked a fish!');
                        fish.click();
                        fishCountDown = 6 + Math.floor(Math.random() * 5);
                    }
                }
            }
        }
        
        if(fishCaught) {
            console.log('    DEBUG: caught enough fish!');
            clearInterval(testInterval);
        }
    }, 100);
}

function normalFishingOLD1(newCount) {
    let count = newCount;
    let fishOn = false;
    let fishCountDown = 0;
    console.log('DEBUG: starting normalFishing with count ' + count);
    
    let fishingInterval = setInterval(() => {
        if(fishOn) {
            fishCountDown--;
            if(fishCountDown <= 0) {
                console.log('    DEBUG: fishCountDown is ' + fishCountDown);
                if(Math.random() > 0.5) {
                    count--;
                    fishOn = false;
                    console.log('    DEBUG: Caught a fish!');
                    document.getElementsByClassName('fishcaught')[0].click();
                }
            } else {console.log('    DEBUG: fishCountDown is ' + fishCountDown);}
        } else {
            let fishes = document.getElementsByClassName('fish');
            for(let i = 0; i < fishes.length; i++) {
                let fish = fishes[i];
                if(fish.style.display !== 'none' && fish.style.opacity > 0.3) {
                    if(Math.random() > 0.8) {
                        fishOn = true;
                        console.log('  DEBUG: Hooked a fish!');
                        fish.click();
                        fishCountDown = 10 + Math.floor(Math.random() * 5);
                        console.log('    DEBUG: new fishCountDown is ' + fishCountDown);
                    }
                }
            }
        }

        if(count <= 0) {
            console.log('DEBUG: caught enough fish!');
            clearInterval(fishingInterval);
        }
    }, 100);
}

function normalFishingOLD1(newCount) {
    let count = newCount;
    let fishOn = false;
    let fishCountDown = 0;
    console.log('DEBUG: starting normalFishing with count ' + count);
    
    let fishingInterval = setInterval(() => {
        if(fishOn) {
            fishCountDown--;
            if(fishCountDown <= 0) {
                // console.log('    DEBUG: fishCountDown is ' + fishCountDown);
                if(Math.random() > 0.4) {
                    count--;
                    fishOn = false;
                    console.log('  DEBUG: Caught a fish! Remaining count: ' + count);
                    fishCountDown = 17;
                    document.getElementsByClassName('fishcaught')[0].click();
                }
            }// else {console.log('    DEBUG: fishCountDown is ' + fishCountDown);}
        } else {
            let fishes = document.getElementsByClassName('fish');
            for(let i = 0; i < fishes.length; i++) {
                let fish = fishes[i];
                if(fish.style.display !== 'none' && fish.style.opacity > 0.3) {
                    if(Math.random() > 0.8) {
                        fishOn = true;
                        // console.log('  DEBUG: Hooked a fish!');
                        fish.click();
                        fishCountDown = 15 + Math.floor(Math.random() * 10);
                        // console.log('    DEBUG: new fishCountDown is ' + fishCountDown);
                    }
                }
            }
        }

        if(count <= 0) {
            console.log('DEBUG: caught enough fish!');
            clearInterval(fishingInterval);
        }
    }, 50);
}

// */
