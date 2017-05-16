(function ()
{
    console.log(printEvenByFor(10, 2));
    console.log(printEvenByWhile(10));
})();

function printEvenByFor(max, min)
{
    if (min === undefined || null)
    {
        min = 2;
    }
    for (var i = min; i <= max; i++)
    {
        if (i % 2 == 0)
        {
            console.log(i);
        }
    }
}

function printEvenByWhile(max, min)
{
    if (min === undefined || null)
    {
        min = 2;
    }

    var i = min;
    while (i <= max)
    {
        if (i % 2 == 0)
        {
            console.log(i);
        }
        i++;
    }
}