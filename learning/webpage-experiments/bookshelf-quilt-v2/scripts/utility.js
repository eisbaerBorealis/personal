function setWeightsByArray(array) {
    console.log('  eisDEBUG: setWeightsByArray(), array is ' + array);
    
    let weightArray = [];
    let totalWeight = array.reduce((a, b) => a + b);
    let lastWeight = 0;

    for(let i = 0; i < array.length - 1; i++) {
        lastWeight += (array[i] / totalWeight);
        weightArray.push(lastWeight);
    }

    weightArray.push(1);
    console.log('  eisDEBUG: weightArray is ' + weightArray);
    return weightArray;
}

function setWeightsByCount(count) {
    console.log('  eisDEBUG: setWeightsByCount(), count is ' + count);
    
    let weightArray = [];
    let oneWeight = 1 / count;
    let lastWeight = 0;

    for(let i = 0; i < count - 1; i++) {
        lastWeight += oneWeight;
        weightArray.push(lastWeight);
    }

    weightArray.push(1);
    console.log('  eisDEBUG: weightArray is ' + weightArray);
    return weightArray;
}

function getWindowWidth() {
    return window.innerWidth;
}

function getWindowHeight() {
    return window.innerHeight;
}

function randomByWeightedArray(values, weights) {
    let random = Math.random(); // returns a number between 0 and 1
    let index = 0;
    while(weights[index] < random) {
        index++;
    }

    return values[index];
}

function roundByThree(num) {
    return Math.floor(num * 1000) / 1000;
}

function getRandomColorHex() {
    
}