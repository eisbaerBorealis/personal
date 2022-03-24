const QUILT_SVG_ID = 'quilt';
const REDRAW_SVG_ID = 'redraw';
const SPINNER_BACK_SVG_ID = 'spinner-back';
const SPINNER_SVG_ID = 'spinner';

const TICKS_PER_SEC = 40;
const COUNTDOWN_BASE = 3000;

const SPINNER_RADIUS = getComputedStyle(document.documentElement).getPropertyValue('--spinner-radius');
const SPINNER_WIDTH = getComputedStyle(document.documentElement).getPropertyValue('--spinner-width');
const SPINNER_CIRCUM = SPINNER_RADIUS * 2 * Math.PI;

var NUM_ROWS = 5;
var NUM_COLUMNS = 3;
var SHELF_WIDTH = 8;
var SHELF_HEIGHT = 20;
var WOOD_WIDTH = 10;

var BOOK_HEIGHTS = [11, 12, 13, 14, 15, 16, 17, 18];
var BOOK_WIDTHS = [1.0, 1.5];

// empty weights will assume '1' for everything
var HEIGHT_WEIGHTS = [];
var WIDTH_WEIGHTS = [2, 1];

var pauseInterval = null;
var resizingCountdown = 0;

var theQuilt = null;