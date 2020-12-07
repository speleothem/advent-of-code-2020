const fs = require("fs");

function parseLine(l) {
  const args = l.split(/ /);
  const [rangeString, letterString, password] = args;
  const [lower, upper] = rangeString.split(/-/);
  const letter = letterString[0];

  // console.log("line", l);
  // console.log("upper", upper);
  // console.log("lower", lower);
  // console.log("letter", letter);
  // console.log("password", password);
  return {
    upper,
    lower,
    letter,
    password,
  };
}

function occurances(target, s) {
  let count = 0;
  [...s].forEach((l) => {
    if (l == target) count++;
  });
  return count;
}

function oldCheck({ upper, lower, letter, password }) {
  const occ = occurances(letter, password);
  if (occ >= lower && occ <= upper) {
    return true;
  }
}

function newCheck({ upper, lower, letter, password }) {
  const lowerChar = password.charAt(lower - 1);
  const upperChar = password.charAt(upper - 1);
  console.log(password);
  console.log("lower: ", lowerChar);
  console.log("uppoer", upperChar);

  const lowerMatches = lowerChar == letter;
  const upperMatches = upperChar == letter;

  if (lowerMatches && upperMatches) {
    return false;
  }
  if (!lowerMatches && !upperMatches) {
    return false;
  }
  return true;
}

function two(checker) {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const lines = data.split(/\n/);
    lines.pop(); // removes empty trailing line
    const testLines = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
    const arr = [];

    lines.forEach((l) => {
      if (l) {
        const tokens = parseLine(l);
        const passed = checker(tokens);
        if (passed) arr.push(l);
      }
    });

    // console.log(arr);
    console.log("passed: ", arr.length);
    console.log("failed: ", lines.length - arr.length);
  });
}

two(newCheck);
