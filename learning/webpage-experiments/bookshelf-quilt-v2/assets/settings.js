const TICKS_PER_SEC = 40;
const QUILT_SVG_ID = 'quilt';

var NUM_ROWS = 5;
var NUM_COLUMNS = 3;
var SHELF_WIDTH = 8;
var WOOD_WIDTH = 10;

var pauseInterval;
var resizingCountdown = 3000;

var theQuilt = null;