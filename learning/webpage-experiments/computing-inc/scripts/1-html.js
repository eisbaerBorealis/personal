const POPUP_X = '<div id="popupX" class="clickable">X</div>';

function alterInnerHtml(elemId, newHtml) {
    document.getElementById(elemId).innerHTML = newHtml;
}

function addClass(elemId, className) {
    document.getElementById(elemId).classList.add(className);
}

function removeClass(elemId, className) {
    document.getElementById(elemId).classList.remove(className);
}

function getInput(name) {
    return document.getElementsByName(name)[0].value;
}

function addButtons() {
    document.getElementById('loadPlayerButton').onclick = function() {
        API_loadPlayer();
    };
    document.getElementById('attemptReloadButton').onclick = function() {
        API_reloadSave();
    };
    document.getElementById('newPlayerButton').onclick = function() {
        API_newPlayer();
    };

//     document.getElementById('popupGray').onclick = function() {
//         API_closePopup();
//     };

//     document.getElementById('hatcheryUpgradeButton').onclick = function() {
//         API_upgradeHatchery();
//     };
//     document.getElementById('moveToNextGen').onclick = function() {
//         API_moveToNextGen();
//     };
//     document.getElementById('moveToMine').onclick = function() {
//         API_moveToMine();
//     };
//     document.getElementById('moveToFarm').onclick = function() {
//         API_moveToFarm();
//     };
//     // document.getElementById('moveToCarry').onclick = function() {
//     //     API_moveToCarry();
//     // };
//     document.getElementById('moveToFactory').onclick = function() {
//         API_moveToFactory();
//     };
//     document.getElementById('moveToArmy').onclick = function() {
//         API_moveToArmy();
//     };
//     document.getElementById('moveToDiscard').onclick = function() {
//         API_moveToDiscard();
//     };
//     document.getElementById('nextGenButton').onclick = function() {
//         API_swapRoyalty();
//     };

//     let hexContainers = document.getElementById('offspringContainer').getElementsByClassName('hexContainer');
//     for(let i = 0; i < hexContainers.length; i++) {
//         hexContainers[i].onclick = function() {
//             API_selectInHatchery(i);
//         };
//     }
}

function popup(html) {
    eisDebug(2, 'EisDebug @ popup()');

    document.getElementById('popupContainer').innerHTML = POPUP_X + html;
    document.getElementById('popupGray').classList.remove('hidden');

    if(document.getElementById('popupX').onclick === null) {
        document.getElementById('popupX').onclick = function() {
            API_closePopup();
        };
    }
}

function closePopup() {
    document.getElementById('popupGray').classList.add('hidden');
}

function updateTimer(value) {
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray',
            value);
}
