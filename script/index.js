document.getElementById("login-btn")
.addEventListener("click", function(){
    const inputUsername = document.getElementById("input-userName");
    const userName = inputUsername.value;
    console.log(userName);

    const inputPin = document.getElementById("input-pin")
    const pin = inputPin.value;
    console.log(pin);

    if(userName == "admin" && pin =="admin123"){
        alert('login Success');
        window.location.href = "Home.html";
    }
    else{
        alert('login failed');
        return;
    }
    
    
});

