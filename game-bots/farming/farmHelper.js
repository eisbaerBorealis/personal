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
                    console.log('  DEBUG: Caught a fish! Remaining count: ' + count);
                    fish.click();
                }
            }
        }

        if(count <= 0) {
            console.log('    DEBUG: caught enough fish!');
            clearInterval(mwfInterval);
        }
    }, 100);
}

function normalFishing(newCount) {
    let count = newCount;
    console.log('DEBUG: starting normalFishing with count ' + count);
    let fishingInterval = setInterval(() => {
        let fishes = document.getElementsByClassName('fish');
        for(let i = 0; i < 12; i++) {
            let fish = fishes[i];
            if(fish.style.display !== 'none' && fish.style.opacity > 0.3) {
                if(Math.random() > 0.87) { // 0.85?
                    count--;
                    console.log('  DEBUG: Caught a fish! Remaining count: ' + count);
                    fish.click();
                }
            }
        }

        if(count <= 0) {
            console.log('    DEBUG: caught enough fish!');
            clearInterval(fishingInterval);
        }
    }, 100);
}

function fishingTest() {
    let fishClicked = false;
    let fishOn = false;

    let testInterval = setInterval(() => {
        let fishes = document.getElementsByClassName('fish');
        if(fishes[0].style.display !== 'none')
        {
            console.log('  DEBUG: fishes[0] opacity is ' + fishes[0].style.opacity); // this prints 11 times per fish; 7 times >0.3
        }
    }, 100);
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
// */