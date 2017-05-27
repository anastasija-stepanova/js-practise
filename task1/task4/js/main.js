(function () {
  printPrime(2, 10);
})();

function isPrime(number) {
  let NUMBER_ONE = 1;
  let FIRST_PRIME = 2;

  if (number == NUMBER_ONE) {
    return false;
  }

  for (let i = FIRST_PRIME; i * i <= number; i++) {
    if (number % i == 0) {
      return false;
    }
  }
  return true;
}

function printPrime(min, max) {
  min = Math.max(min, 2);

  for (let i = min; i <= max; i++) {
    if (isPrime(i) == true) {
      console.log(i);
    }
  }
}