// sign-in link

document.getElementById('sign-in-btn').addEventListener('click', function () {

    const name = document.getElementById('input-name').value.trim();
    const pin = document.getElementById('input-pin').value.trim();

    console.log(name, pin);

    // validation
    if (name === "admin" && pin === "admin123") {

        alert('Login successfully');

        window.location.assign("/home.html");

    } else {
        alert('Login failed');
    }

});

