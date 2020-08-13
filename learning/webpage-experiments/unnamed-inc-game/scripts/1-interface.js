
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
    }

    // let gridDiv = document.getElementById('grid');

    //     gridDiv.innerHTML = '';
    //     for(let i = 0; i < this.size; i++) {
    //         let newColumnDiv = document.createElement('div');
    //         newColumnDiv.setAttribute('class', 'gridColumn');
    //         gridDiv.append(newColumnDiv);

    //         for(let j = 0; j < this.size; j++) {
    //             let newGridContentDiv = document.createElement('div');
    //             newGridContentDiv.classList.add('gridContent');
    //             newGridContentDiv.classList.add('clickable');
    //             newColumnDiv.append(newGridContentDiv);
    //         }
    //     }
}