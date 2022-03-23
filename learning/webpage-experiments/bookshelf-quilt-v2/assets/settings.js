const TICKS_PER_SEC = 40;
const QUILT_SVG_ID = 'quilt';

var NUM_ROWS = 5;
var NUM_COLUMNS = 3;
var SHELF_WIDTH = 8;
var SHELF_HEIGHT = 10;
var WOOD_WIDTH = 20;

var BOOK_HEIGHTS = [11, 12, 13, 14, 15, 16, 17, 18];
var BOOK_WIDTHS = [1.0, 1.5];

// empty weights will assume '1' for everything
var HEIGHT_WEIGHTS = [];
var WIDTH_WEIGHTS = [2, 1];

var pauseInterval;
var resizingCountdown = 3000;

var theQuilt = null;