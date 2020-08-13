
var selection = -1;
var directions = {
    'NI': null,
    'NO': null,
    'EI': null,
    'EO': null,
    'SI': null,
    'SO': null,
    'WI': null,
    'WO': null
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
}