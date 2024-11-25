import { Point } from './Point.js';

// Create an array of points representing a path
const path = [
    new Point(50, 450),
    new Point(100, 300),
    new Point(200, 400),
    new Point(300, 200),
    new Point(400, 300)
];

// Calculate the path length
const totalPathLength = Point.calculatePathLength(path);

// Display points dynamically
const pathDisplay = document.getElementById('pathDisplay');
pathDisplay.innerHTML = `<h2>Path Points:</h2>`;
path.forEach((point, index) => {
    const pointElement = document.createElement('p');
    pointElement.textContent = `Point ${index + 1}: ${point.show()}`;
    pathDisplay.appendChild(pointElement);
});

// Display total path length
const totalLengthDisplay = document.getElementById('totalLength');
totalLengthDisplay.innerHTML = `<h2>Total Path Length: ${totalPathLength.toFixed(2)}</h2>`;

// Draw the path on the grid
const pathGrid = document.getElementById('pathGrid');
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");

// Draw lines connecting points
for (let i = 0; i < path.length - 1; i++) {
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", path[i].x);
    line.setAttribute("y1", path[i].y);
    line.setAttribute("x2", path[i + 1].x);
    line.setAttribute("y2", path[i + 1].y);
    line.setAttribute("class", "line");
    svg.appendChild(line);
}

// Draw points
path.forEach((point) => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", 5); // Radius of the circle
    circle.setAttribute("class", "point");
    svg.appendChild(circle);
});

pathGrid.appendChild(svg);
