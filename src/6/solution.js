const fs = require("fs");
const { Set } = require("immutable");

function sumGroup(group) {
  const set = new Set();
  group.forEach((member) => {
    [...member].forEach((a) => {
      set.add(a);
    });
  });
  return set.size;
}

function sumIntersection(group) {
  const intersection = Set.intersect([...group]);
  return intersection.size;
}

function six(groups) {
  const total = groups.reduce((acc, group) => {
    return acc + sumIntersection(group);
  }, 0);
  return total;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  const lines = data.split(/\n\n/);
  const groups = lines.map((line) => line.split(/\n/));
  const lg = groups.pop();
  lg.pop();
  groups.push(lg);
  const answer = six(groups);
  console.log(answer);
});
