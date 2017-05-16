(function ()
{
    var userLogin = prompt('Enter your login, please', '');

    if (userLogin == null || userLogin == '')
    {
        alert('Sign-in canceled');
    }
    else
    {
        if (userLogin.toLowerCase() != 'admin')
        {
            alert('I don`t know you');
        }
        else
        {
            var userPassword = prompt('Enter your password, please', '');
            if (userPassword == null || userPassword == '')
            {
                alert('Sign-in canceled');
            }
            else
            {
                if (userPassword == 'Black Lordship')
                {
                    alert('Welcome!');
                }
                else
                {
                    alert('Password is incorrect');
                }
            }
        }
    }
})();
