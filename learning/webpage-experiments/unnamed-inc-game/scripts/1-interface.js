
var selection = -1;
var directions = {
    'inputs': {
        'north': null,
        'east': null,
        'south': null,
        'west': null
    },
    'outputs': {
        'north': null,
        'east': null,
        'south': null,
        'west': null
    }
};

function addControls() {
    let buildListDiv = document.getElementById('buildingList');

    for(let i = 0; i < buildings.length; i++) {
        let newBuildDiv = document.createElement('div');
        newBuildDiv.classList.add('building');
        newBuildDiv.classList.add('unselected');
        newBuildDiv.classList.add('clickable');

        let newSymbolDiv = document.createElement('div');
        newSymbolDiv.classList.add('symbol');
        let newTitleDiv = document.createElement('div');
        newTitleDiv.classList.add('buildingTitle');

        newBuildDiv.append(newSymbolDiv);
        newBuildDiv.append(newTitleDiv);
        buildListDiv.append(newBuildDiv);

        newSymbolDiv.innerHTML = buildings[i].symbol;
        newTitleDiv.innerHTML = buildings[i].name;

        newBuildDiv.onclick = function() {
            changeSelection(i);
        };
    }

    // I/O and display
    let newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'west-output-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'O';
    document.getElementById('ioLeft').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'west-input-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'I';
    document.getElementById('ioLeft').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'north-input-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'I';
    document.getElementById('ioTop').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'north-output-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'O';
    document.getElementById('ioTop').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'selection-display');
    document.getElementById('ioCenter').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'south-output-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'O';
    document.getElementById('ioBottom').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'south-input-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'I';
    document.getElementById('ioBottom').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'east-input-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'I';
    document.getElementById('ioRight').append(newIODiv);

    newIODiv = document.createElement('div');
    newIODiv.setAttribute('id', 'east-output-button');
    newIODiv.classList.add('clickable');
    newIODiv.classList.add('io-button');
    newIODiv.classList.add('disabled');
    newIODiv.innerHTML = 'O';
    document.getElementById('ioRight').append(newIODiv);
}

function changeSelection(newSelection) {
    if(newSelection === selection) {
        selection = -1;
        document.getElementsByClassName('building')[newSelection].classList.remove('selected');
        document.getElementsByClassName('building')[newSelection].classList.add('unselected');
    } else {
        if(selection !== -1) {
            document.getElementsByClassName('building')[selection].classList.remove('selected');
            document.getElementsByClassName('building')[selection].classList.add('unselected');
        }

        document.getElementsByClassName('building')[newSelection].classList.add('selected');
        document.getElementsByClassName('building')[newSelection].classList.remove('unselected');

        selection = newSelection;
    }
    updateAllIOButtons();
}

function updateAllIOButtons() {

}

function updateIOButton(buttonDiv, isDisabled, isInput) {
    
}