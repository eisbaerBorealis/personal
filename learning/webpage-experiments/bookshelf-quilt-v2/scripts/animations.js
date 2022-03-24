function updateRedrawCountdown() {
    resizingCountdown -= 1000 / TICKS_PER_SEC;

    if(resizingCountdown < 0) {
        resizingCountdown = 0;
    }
    if(resizingCountdown === 0) {
        clearInterval(pauseInterval);
        document.getElementById(REDRAW_SVG_ID).classList.add('hidden');
        console.log('  eisDEBUG: resizingCountdown has ended!');
        theQuilt.redraw();
    } else {
        // set dasharray
        let ringRatio = resizingCountdown / COUNTDOWN_BASE;
        let dashArray = (ringRatio * SPINNER_CIRCUM) + ' ' + Math.round(SPINNER_CIRCUM);
        document.getElementById(SPINNER_SVG_ID).setAttribute('stroke-dasharray', dashArray);
    }
}

function resetRedrawCountdown() {
    // console.log('  eisDEBUG: resetRedrawCountdown()');
    if(resizingCountdown === 0) {
        pauseInterval = setInterval(() => {
            updateRedrawCountdown();
        }, 1000 / TICKS_PER_SEC);

        document.getElementById(REDRAW_SVG_ID).classList.remove('hidden');
    }
    resizingCountdown = COUNTDOWN_BASE;

    // reset svg center attributes
    let w = getWindowWidth();
    let h = getWindowHeight();
    let xCenter = w / 2;
    let yCenter = h / 2;
    

    document.getElementById(REDRAW_SVG_ID).setAttribute('width', w);
    document.getElementById(REDRAW_SVG_ID).setAttribute('height', h);
    document.getElementById(SPINNER_BACK_SVG_ID).setAttribute('cx', xCenter);
    document.getElementById(SPINNER_BACK_SVG_ID).setAttribute('cy', yCenter);
    document.getElementById(SPINNER_SVG_ID).setAttribute('cx', xCenter);
    document.getElementById(SPINNER_SVG_ID).setAttribute('cy', yCenter);
    document.getElementById(SPINNER_SVG_ID).setAttribute('transform-origin', xCenter + ' ' + yCenter);

}