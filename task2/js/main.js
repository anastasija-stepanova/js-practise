(function ()
{
    var userLogin = prompt('Enter your login, please', '');

    if (userLogin == null || '')
    {
        alert('Sign-in canceled')
    }
    else
    {
        if (userLogin != 'Admin')
        {
            alert('I don`t know you')
        }
        else
        {
            if (userLogin == 'Admin')
            {
                var userPassword = prompt('Enter your password, please', '');
                if (userPassword == null || '')
                {
                    alert('Sign-in canceled')
                }
                else
                {
                    if (userPassword == 'Black Lordship')
                    {
                        alert('Welcome!')
                    }
                    else
                    {
                        alert('Password is incorrect')
                    }
                }
            }
        }
    }
})();