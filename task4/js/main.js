(function ()
{
    console.log(printPrime(-2, 10));
})();

function isPrime(number)
{
    var NUMBER_ONE = 1;
    var FIRST_PRIME = 2;

    if (number == NUMBER_ONE)
    {
        return false;
    }

    for (var i = FIRST_PRIME; i * i <= number; i++)
    {
        if (number % i == 0)
        {
            return false;
        }
    }
    return true;
}

function printPrime(min, max)
{
    min = (min < 2) ? 2 : min;

    for (var i = min; i <= max; i++)
    {
        if (isPrime(i) == true)
        {
            console.log(i)
        }
    }
}