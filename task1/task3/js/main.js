(function () {
  printEvenByFor(10, 2);
  printEvenByWhile(10);
})();

function printEvenByFor(max, min) {
  if (min === undefined || min === null) {
    min = 2;
  }

  let i = (min % 2) ? min + 1 : min;
  for (i; i <= max; i += 2) {
    console.log(i);
  }
}

function printEvenByWhile(max, min) {
  if (min === undefined || min === null) {
    min = 2;
  }

  let i = min;
  while (i <= max) {
    if (i % 2 == 0) {
      console.log(i);
    }
    i++;
  }
}