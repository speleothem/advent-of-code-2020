const fs = require("fs");

function moveX(line, distance, currentPos) {
  if (currentPos + distance > line.length - 1) {
    return currentPos + distance - line.length;
  }
  return currentPos + distance;
}

function moveY(matrix, distance, currentPos) {
  if (currentPos + distance > matrix.length - 1) {
    return -1; //at end
  }
  return currentPos + distance;
}

/*
 *  [['.', '#', '.', '#'], ...]
 */
function three(matrix, slope) {
  let count = 0;

  let posX = 0;
  let posY = 0;

  const go = () => {
    posX = moveX(matrix[posY], slope.x, posX);
    posY = moveY(matrix, slope.y, posY);

    if (posY == -1) {
      return;
    }

    if (matrix[posY][posX] == "#") {
      count++;
    }
    go();
  };

  go();
  return count;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  const lines = data.split(/\n/);
  const matrix = lines.map((l) => [...l]);

  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  const results = slopes.map((slope) => {
    return three(matrix, slope);
  });
  console.log(results);
  const product = results.reduce((acc, curr) => acc * curr);
  console.log(product);
});
