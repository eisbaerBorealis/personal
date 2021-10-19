const WIDTH = 700;
const HEIGHT = 700;
const UNIT = 50;

const TRIANGLE_RAD = 1 / Math.sqrt(3);
const DIAMOND_RAD_1 = 1 / 2 * Math.sqrt(3);
const DIAMOND_RAD_2 = 1 / 2;
const DIAMOND_2_RAD_1 = Math.sin(toRads(75));
const DIAMOND_2_RAD_2 = Math.cos(toRads(75));

const DIST1 = Math.sqrt(3) / 2; // height of triangle
const DIST2 = DIST1 / 3; // center of triangle to bottom
const DIST3 = DIST2 * 2; // center of triangle to top

const POINT1_X = 1;
const POINT1_Y = DIST1 * -4;
const POINT2_X = -1;
const POINT2_Y = DIST1 * -2;
const POINT3_X = 1;
const POINT3_Y = DIST1 * 0;
const POINT4_X = -1;
const POINT4_Y = DIST1 * 2;

const POINT5_X = -0.5;
const POINT5_Y = DIST1 * 5;
const POINT6_X = 0.5;
const POINT6_Y = DIST1 * 5;

function toRads(degrees) {
    return degrees * Math.PI / 180;
}