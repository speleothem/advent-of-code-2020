const fs = require("fs");

function parseTicket(ticket) {
  const fb = ticket.substring(0, 7);
  const lr = ticket.substring(7);
  return {
    fb,
    lr,
  };
}

function getRow(fb) {
  const total = 128;

  const f = ({ l, u }) => {
    return { l, u: Math.floor(u / 2) };
  };

  const b = (l, u) => {
    return { l: Math.floor(u / 2), u };
  };

  const row = [...fb].reduce(
    (acc, curr) => {
      return curr == "F" ? f(acc) : b(acc);
    },
    { l: 0, u: 127 }
  );
  console.log(row);
  return row;
}

function id(ticket) {
  const { fb, lr } = parseTicket(ticket);
  const row = getRow(fb);
}

function five(tickets) {
  console.log(id(tickets[0]));
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  const lines = data.split(/\n/);
  const answer = five(lines);
  console.log(answer);
});
