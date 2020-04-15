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
    // console.log('EisDebug @ addButtons()');

    document.getElementById("loadPlayerButton").onclick = function() {
        API_loadPlayer();
    };
    document.getElementById("attemptReloadButton").onclick = function() {
        API_reloadSave();
    };
    document.getElementById("newPlayerButton").onclick = function() {
        API_newPlayer();
    };

    document.getElementById("popupGray").onclick = function() {
        API_closePopup();
    };
}

function popup(html) {
    console.log('EisDebug @ popup()');

    document.getElementById("popupContainer").innerHTML = POPUP_X + html;
    document.getElementById("popupGray").classList.remove('hidden');

    if(document.getElementById("popupX").onclick === null) {
        document.getElementById("popupX").onclick = function() {
            API_closePopup();
        };
    }
}

function closePopup() {
    document.getElementById("popupGray").classList.add('hidden');
}