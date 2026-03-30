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
    

    document.getElementById("loadDataBtn").addEventListener("click", () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      console.log(data);

      const container = document.getElementById("data-container");
      container.innerHTML = "";

      data.forEach(issue => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${issue.title || "No Title"}</h3>
          <p>${issue.description || "No Description"}</p>
          <hr/>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error:", err);
    });
});
    
});

