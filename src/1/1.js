const expenseNumbers = require('./numbers');
const test = [1, 2, 11, 9, 4, 5, 6, 7, 2000, 30, 1990, 20]

const getSortedArray = (arr) => [...arr].sort((a, b) => a - b);
const partner = (a) => 2020 - a;
const hasPartner = (a, array) => {
  return array.find(n => partner(a) == n);
}

function part1 (numbers) {
  const answer = numbers.reduce((arr, number) => { 
    if (hasPartner(number, numbers)) {
      return [...arr, number]
    }
    return arr;
  }, []);
  return answer[0] * answer[1];
}

function part2 (numbers) {
  const sorted = getSortedArray(numbers);
}

const answer1 = part1(expenseNumbers);
const answer2 = part2(test);

// console.log('part1: ',answer1);
console.log('part2: ',answer2);
