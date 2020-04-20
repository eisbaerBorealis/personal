var theAbacusDisplay;
var viewerState;
var showState;
var problemsJson;
var tutorials;
var level;
var currentProblemId;
var currentProblem;
var levelUpScore;

(function()
{
	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete')
		{
            clearInterval(stateCheck);
            theAbacusDisplay = new AbacusDisplay();
            setup();
		}
	}, 100);
})();

function setup() {
    document.getElementById('left-sidebar').innerHTML =  '<div id="info" class="button">Info</div>' + 
				'<div id="level">Level: 1</div>' +
                '<div id="nav-practice" class="button selected-button">Practice</div>' +
                '<div id="nav-exercises" class="button">Exercises</div>' +
                '<div id="nav-interpret" class="button">Interpret</div>' +
                '<div id="nav-logout" class="button">Logout</div>' +
                '<div id="debug" class="button">Debug</div>';
    document.getElementById('abacus-container').innerHTML = '<div id="abacus"></div>' +
                '<div id="numbers"></div>';
    document.getElementById('right-sidebar').innerHTML = ('<div id="display-mode" class="display-box">Test</div>' +
                    '<div class="format-box-of-lazy"></div>' +
                '<p id="p-question">Question:</p><div id="display-question" class="display-box">15 + 9</div>' +
                '<div id="input-div" class="display-box"><input id="input" type="number" name="input"></div>' +
                '<div id="nav-solve" class="button">Solve</div>' +
                '<div id="show-hide" class="button">Show</div>' +
                '<div id="nav-prev" class="button">Previous</div>' +
                '<div id="nav-next" class="button">Next</div>' +
                    '<div class="format-box-of-lazy"></div>' +
                '<div id="nav-submit" class="button">Submit</div>' +
                '<div id="nav-reset" class="button">Reset</div>' +
                    '<div class="format-box-of-lazy"></div>');
    changeToPractice();
    toggleShowHide();
    
    connectButtons();
    addTooltips();
    theAbacusDisplay.addAbacus();

    let url = 'https://raw.githubusercontent.com/g3cs2450f19/g3cs2450f19.github.io/master/student/problems.json';

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            // console.log('Checkout this JSON!', out);
            problemsJson = out.levels;
        })
        .catch(err => { throw err });

	url = 'https://raw.githubusercontent.com/g3cs2450f19/g3cs2450f19.github.io/master/student/tutorials.json';

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            // console.log('Checkout this JSON!', out);
            tutorials = out.levels;
			show_info()
        })
        .catch(err => { throw err });

    level = 0;
    levelUpScore = 0;
}

function connectButtons() {
	document.getElementById("info").onclick = ()=> show_info();

    document.getElementById("nav-practice").onclick = function() {
        changeToPractice();
    };
    document.getElementById("nav-exercises").onclick = function() {
        changeToExercises();
    };
    document.getElementById("nav-interpret").onclick = function() {
        changeToInterpret();
    };
    document.getElementById("nav-logout").onclick = function() {
        window.location.href = 'https://g3cs2450f19.github.io/';
    };
    document.getElementById("debug").onclick = function() {
        debug();
    };
    document.getElementById("nav-solve").onclick = function() {
        solve();
    };
    document.getElementById("input").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            if(viewerState === 'practice') {
                solve();
            } else if(viewerState === 'interpret') {
                submit();
            }
        }
    });
    document.getElementById("nav-prev").onclick = function() {
        let nextProblemId = currentProblemId - 1;
        if(nextProblemId < 0) {
            nextProblemId = problemsJson[level].problems.length - 1;
        }
        chooseExercise(nextProblemId);
    };
    document.getElementById("nav-next").onclick = function() {
        let nextProblemId = currentProblemId + 1;
        if(nextProblemId > problemsJson[level].problems.length - 1) {
            nextProblemId = 0;
        }
        chooseExercise(nextProblemId);
    };
    document.getElementById("nav-submit").onclick = function() {
        submit();
    };

    document.getElementById("nav-reset").onclick = function() {
        if(viewerState !== 'interpret') {
			if(viewerState === 'practice')document.getElementById("input").value = ""
            theAbacusDisplay.solve(0);
            updateNumbers();
        } else {
            randomize(Math.pow(10, theAbacusDisplay.getColumnCount()) - 1);
        }
    };
    document.getElementById("show-hide").onclick = function() {
        toggleShowHide();
    };
    document.getElementById("popup-container").onclick = function() {
        document.getElementById('popup-container').classList.add('hidden');
        document.getElementById('popup-box').classList.add('hidden');
    };
    document.getElementById("popup-box").onclick = function() {
        if(!document.getElementById('popup-box').innerHTML.includes('debug')) {
            document.getElementById('popup-container').classList.add('hidden');
            document.getElementById('popup-box').classList.add('hidden');
        }
    };
}

function addTooltips() {
    document.getElementById('nav-practice').setAttribute('title', 'Practice with the abacus. See the values of each column or set a value for the whole abacus.');
    document.getElementById('nav-exercises').setAttribute('title', 'Move the beads to solve the arithmetic problem.');
    document.getElementById('nav-interpret').setAttribute('title', 'Exercises where you must enter the value of the abacus');
    document.getElementById('nav-logout').setAttribute('title', 'Return to the starting page');
    document.getElementById('debug').setAttribute('title', 'Options for testing purposes');
    document.getElementById('input-div').setAttribute('title', 'Enter your answer here');
    document.getElementById('nav-solve').setAttribute('title', 'Automatically move all the beads to equal the value entered');
    document.getElementById('show-hide').setAttribute('title', 'Toggle whether the value appears underneath the abacus');
    document.getElementById('nav-prev').setAttribute('title', 'Go to the previous Exercise');
    document.getElementById('nav-next').setAttribute('title', 'Go to the next Exercise');
    document.getElementById('nav-submit').setAttribute('title', 'Submit your answer');
    document.getElementById('nav-reset').setAttribute('title', 'Set the abacus to 0 in Practice or Exercises mode, or another random value for Interpret mode');
}

function solve() {
    document.getElementById('input').value = Math.floor(document.getElementById('input').value);
    theAbacusDisplay.solve(document.getElementById('input').value);
    updateNumbers();
}

function hasClass(div, className)
{
    returnVal = false;
    for(let i = 0; i < div.classList.length; i++)
    {
        if(div.classList[i] === className)
        {
            returnVal = true;
        }
    }
    return returnVal;
}

function beadClick(beadId) {
    theAbacusDisplay.shiftBeads(beadId);
    updateNumbers();
}

function changeToPractice() {
    if(viewerState !== 'practice') {
        viewerState = 'practice';
        if(document.getElementById('space-1-1')) {
            theAbacusDisplay.solve(0);
        }

        document.getElementById('nav-exercises').classList.remove('selected-button');
        document.getElementById('nav-practice').classList.add('selected-button');
        document.getElementById('nav-interpret').classList.remove('selected-button');

        document.getElementById('display-mode').innerHTML = 'Practice';
        
        document.getElementById('p-question').classList.add('hidden');
        document.getElementById('display-question').classList.add('hidden');
        document.getElementById('nav-prev').classList.add('hidden');
        document.getElementById('nav-next').classList.add('hidden');
        document.getElementById('nav-submit').classList.add('hidden');

        document.getElementById('input-div').classList.remove('hidden');
        document.getElementById('nav-solve').classList.remove('hidden');
        document.getElementById('show-hide').classList.remove('hidden');

        if(showState) {
            document.getElementById('numbers').classList.remove('invisible');
        }
        
        updateNumbers();
    }
}

function changeToExercises() {
    let randomId = Math.floor(Math.random() * problemsJson[level].problems.length);
    chooseExercise(randomId);
    theAbacusDisplay.solve(0);
    
    if(viewerState !== 'exercises') {
        viewerState = 'exercises';

        document.getElementById('nav-practice').classList.remove('selected-button');
        document.getElementById('nav-exercises').classList.add('selected-button');
        document.getElementById('nav-interpret').classList.remove('selected-button');

        document.getElementById('display-mode').innerHTML = 'Exercises';

        document.getElementById('input-div').classList.add('hidden');
        document.getElementById('nav-solve').classList.add('hidden');
        document.getElementById('show-hide').classList.add('hidden');
        
        document.getElementById('p-question').classList.remove('hidden');
        document.getElementById('display-question').classList.remove('hidden');
        document.getElementById('nav-prev').classList.remove('hidden');
        document.getElementById('nav-next').classList.remove('hidden');
        document.getElementById('nav-submit').classList.remove('hidden');

        document.getElementById('numbers').classList.add('invisible');
    }
}

function changeToInterpret() {
    if(viewerState !== 'interpret') {
        viewerState = 'interpret';
        document.getElementById('input').value = '';
        randomize(Math.pow(10, theAbacusDisplay.getColumnCount()) - 1);

        document.getElementById('nav-practice').classList.remove('selected-button');
        document.getElementById('nav-exercises').classList.remove('selected-button');
        document.getElementById('nav-interpret').classList.add('selected-button');

        document.getElementById('display-mode').innerHTML = 'Interpret';

        document.getElementById('nav-solve').classList.add('hidden');
        document.getElementById('show-hide').classList.add('hidden');
        document.getElementById('p-question').classList.add('hidden');
        document.getElementById('display-question').classList.add('hidden');
        document.getElementById('nav-prev').classList.add('hidden');
        document.getElementById('nav-next').classList.add('hidden');

        document.getElementById('input-div').classList.remove('hidden');
        document.getElementById('nav-submit').classList.remove('hidden');

        document.getElementById('numbers').classList.add('invisible');
    }
}

function chooseExercise(exerciseId) {
    if(exerciseId > problemsJson[level].problems.length - 1) {
        exerciseId = problemsJson[level].problems.length - 1;
    }
    currentProblemId = exerciseId;
    currentProblem = problemsJson[level].problems[exerciseId];
    document.getElementById('display-question').innerHTML = currentProblem.problem;
}

function toggleShowHide() {
    if(!showState) {
        showState = true;
        document.getElementById('show-hide').innerHTML = 'Hide';
        document.getElementById('numbers').classList.remove('invisible');
        updateNumbers();
    } else {
        showState = false;
        document.getElementById('show-hide').innerHTML = 'Show';
        document.getElementById('numbers').classList.add('invisible');
    }
}

function updateNumbers() {
    if(viewerState === 'practice' && showState) {
        let columnCount = theAbacusDisplay.getColumnCount();
        let numbersHTML = '';
        for(let i = 1; i <= columnCount; i++)
        {
            numbersHTML += '<div id="value-' + i + '" class="number"></div>';
        }
        document.getElementById('numbers').innerHTML = numbersHTML;
        let value = theAbacusDisplay.getValue();
        for(let i = 1; i <= columnCount; i++) {
            let digit = value % Math.pow(10, i);
            if(digit < Math.pow(10, i - 1)) {
                digit = 0;
            } else {
                while(digit > 9) {
                    digit = Math.floor(digit / 10);
                }
            }
            document.getElementById('value-' + i).innerHTML = digit;
        }
    }
}

function submit() {
    if(viewerState === 'exercises') {
        if(theAbacusDisplay.getValue() == currentProblem.solution) {
            showPopup('Correct!');
            levelUpScore++;
            levelUp();
            let randomId = Math.floor(Math.random() * problemsJson[level].problems.length);
            chooseExercise(randomId);
        } else {
            showPopup('Incorrect. Please try again.');
        }
    } else if(viewerState === 'interpret') {
        if(theAbacusDisplay.getValue() == document.getElementById('input').value) {
            showPopup('Correct!');
            randomize(Math.pow(10, theAbacusDisplay.getColumnCount()) - 1);
        } else {
            showPopup('Incorrect. Please try again.\nOr press "Reset" to try another number.');
        }
    }
}

function randomize(maxNum) {
    let randomNum = Math.floor(Math.random() * maxNum);
    theAbacusDisplay.solve(randomNum);
    theAbacusDisplay.updateValue();
}

function levelUp() {
    if(levelUpScore >= problemsJson[level].levelUp) {
        level++;
        showPopup('Correct!\nCongrats! You have unlocked Level ' + (level + 1) +
            '\nNote: level 3 has not been implemented in this prototype.');
        document.getElementById('level').innerHTML = 'Level: ' + (level + 1);
        levelUpScore = 0;
        if(level === 1) {
            theAbacusDisplay.updateColumns(7);
            updateNumbers();
            theAbacusDisplay.updateBeads();
        } else if(level === 2) {
            theAbacusDisplay.updateColumns(10);
            updateNumbers();
            theAbacusDisplay.updateBeads();
        }
		show_info()
    }
}

function show_info()
{
	showPopup(tutorials["level-"+(level + 1)])
}

function showPopup(popupHTML) {
    document.getElementById('popup-container').classList.remove('hidden');
    document.getElementById('popup-box').classList.remove('hidden');
    document.getElementById('popup-box').innerHTML = popupHTML;
}

function debug() {
    console.log('DEBUG!');
    let debugHTML = '';

    debugHTML += '<div id="popup-flex-container">' +
        '<span>How many columns of beads would you like? (1-20)</span>' + 
        '<input id="debug-input" type="number" name="debug-input">' +
        '</div>';

    showPopup(debugHTML);

    document.getElementById("debug-input").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            theAbacusDisplay.updateColumns(Math.floor(document.getElementById('debug-input').value));
            updateNumbers();
            theAbacusDisplay.updateBeads();
        }
    });
}