import { Point } from './Point.js';

// Create points
const point1 = new Point(5, 5);
const point2 = new Point(6, 4);
const point3 = new Point(10, 10);
const point4 = new Point(5, 5);

// Test Show and Equals
console.log("Point 1:", point1.show());
console.log("Point 2:", point2.show());
console.log("Point 3:", point3.show());

console.log(
    "Point 1 is not equal to Point 2, but equal to Point 4:",
    point1.equals(point2), // false
    point1.equals(point4)  // true
);

// Test isWithinRange
console.log(
    "Point 1 is within range of Point 2 (xRange=2, yRange=2):",
    point1.isWithinRange(point2, 2, 2)
); // Expected: true

console.log(
    "Point 1 is within range of Point 3 (xRange=4, yRange=4):",
    point1.isWithinRange(point3, 4, 4)
); // Expected: false

// Create an array of points and test isPointInArray
const pointsArray = [point1, point2, point3];
console.log(
    "Does Point 4 exist in pointsArray?:",
    Point.isPointInArray(pointsArray, point4)
); // Expected: true

const pointToCheckFalse = new Point(8, 8);
console.log(
    "Does Point (8, 8) exist in pointsArray?:",
    Point.isPointInArray(pointsArray, pointToCheckFalse)
); // Expected: false
