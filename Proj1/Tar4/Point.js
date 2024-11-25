export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Display the point in (x, y) format
    show() {
        return `(${this.x}, ${this.y})`;
    }

    // Check if another point is equal to this point
    equals(p) {
        return this.x === p.x && this.y === p.y;
    }

    // Check if the current point is within a range of another point
    isWithinRange(p, xRange, yRange) {
        return (
            Math.abs(this.x - p.x) <= xRange &&
            Math.abs(this.y - p.y) <= yRange
        );
    }

    // Static method to check if a point exists in an array
    static isPointInArray(pointsArray, pointToCheck) {
        return pointsArray.some((point) => point.equals(pointToCheck));
    }

    // Static method to calculate the total length of a path
    static calculatePathLength(pointsArray) {
        let totalLength = 0;

        for (let i = 0; i < pointsArray.length - 1; i++) {
            const p1 = pointsArray[i];
            const p2 = pointsArray[i + 1];
            const segmentLength = Math.sqrt(
                Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
            );
            totalLength += segmentLength;
        }

        return totalLength;
    }
}
