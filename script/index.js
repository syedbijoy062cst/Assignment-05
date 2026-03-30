// sign-in link

document.getElementById('sign-in-btn').addEventListener('click', function(){
    

   

    const inputName = document.getElementById('input-name');

    const name = inputName.value;

    console.log(name);

    // pin number input

    const inputPin = document.getElementById('input-pin');

    const pin = inputPin.value;

    console.log(pin);


    // match number and pin

    if(name=="admin" && pin=="admin123"){

        alert('login sucssesfully')

        window.location.assign('/home.html')


    }

    else{
        alert('login failed')
        return;
    }




  



});

