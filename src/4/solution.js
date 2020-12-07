const fs = require("fs");

function getTokens(raw) {
  return raw.split(/[\n ]/);
}

function getPassport(entryList) {
  const passport = entryList.reduce((map, token) => {
    const [key, value] = token.split(":");
    map[key] = value;
    return map;
  }, {});
  return passport;
}

const requiredFields = {
  byr: (year) => {
    if (!year) {
      return false;
    }
    return parseInt(year) >= 1920 && parseInt(year) <= 2002;
  },
  iyr: (year) => {
    if (!year) {
      return false;
    }
    return parseInt(year) >= 2010 && parseInt(year) <= 2020;
  },
  eyr: (year) => {
    if (!year) {
      return false;
    }
    return parseInt(year) >= 2020 && parseInt(year) <= 2030;
  },
  hgt: (height) => {
    if (!height) {
      return false;
    }
    const unit = height.substring(height.length - 2);
    if (unit != "in" && unit != "cm") {
      return false;
    }
    const number = parseInt(height.substring(0, height.length - 2));
    const boop = {
      in: (i) => i >= 59 && i <= 76,
      cm: (i) => i >= 150 && i <= 193,
    };
    return boop[unit](number);
  },
  hcl: (hair) => {
    if (!hair) {
      return false;
    }

    const regex = /#[a-f0-9]{6}/;
    const found = hair.match(regex);
    if (!found) return false;
    return found[0] == hair;
  },
  ecl: (eyeColor) => {
    if (!eyeColor) {
      return false;
    }
    const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

    return !!colors.find((c) => c === eyeColor);
  },
  pid: (id) => {
    if (!id) {
      return false;
    }
    const regex = /[0-9]{9}/;
    const found = id.match(regex);
    if (!found) return false;
    return found[0] == id;
  },
};

function valid1(raw) {
  const tokens = getTokens(raw);
  const passport = getPassport(tokens);

  const isValid = Object.entries(requiredFields).reduce(
    (acc, [label, validator]) => {
      if (acc) {
        return validator(passport[label]) ? true : false;
      }
      return false;
    },
    true
  );
  return isValid;
}

function four(tokenArrays, validator) {
  return tokenArrays.reduce((acc, curr) => {
    if (validator(curr)) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  const lines = data.split(/\n\n/);
  const answer = four(lines, valid1);
  console.log(answer);
});
