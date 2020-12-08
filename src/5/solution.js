const fs = require("fs");

function parseTicket(ticket) {
  const fb = ticket.substring(0, 7);
  const lr = ticket.substring(7);
  return {
    fb,
    lr,
  };
}

function midpoint(lower, upper) {
  const mp = (upper - lower) / 2 + lower;
  // console.log("midpoint: ", mp);
  return mp;
}

function newUpper(lower, upper) {
  return [lower, Math.floor(midpoint(lower, upper))];
}

function newLower(lower, upper) {
  return [Math.ceil(midpoint(lower, upper)), upper];
}

function bsp(recipe, lowToken, length) {
  // console.log(recipe);

  const a = [...recipe].reduce(
    (acc, curr) => {
      // console.log("---------------");
      // console.log("letter: ", curr);
      // console.log("before:", acc);
      const newPair = curr == lowToken ? newLower(...acc) : newUpper(...acc);
      // console.log("after:", newPair);
      return newPair;
    },
    [0, length - 1]
  );

  // console.log(a[0]);
  if (a[0] != a[1]) {
    console.error("Error: ", a);
  }
  return a[0];
}

function id(ticket) {
  const { fb, lr } = parseTicket(ticket);
  const row = bsp(fb, "B", 128);
  const col = bsp(lr, "R", 8);

  const id = row * 8 + col;
  // console.log("seat id:", id);
  return id;
}

function findMySeat(ids) {
  let mySeat;
  console.log(ids);
  ids.forEach((id, i) => {
    if (id - ids[i + 1] == 2) {
      console.log(id, ids[i + 1], ids[i + 2]);
      console.log("woop");
      mySeat = id - 1;
    }
  });
  return mySeat;
}

function five(tickets) {
  const ids = tickets.map(id);
  const sortedIds = [...ids].sort((a, b) => b - a);
  console.log("highest: ", sortedIds.shift());

  return findMySeat(sortedIds);
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  const lines = data.split(/\n/);
  lines.pop();
  const answer = five(lines);
  console.log("my seat is: ", answer);
});
