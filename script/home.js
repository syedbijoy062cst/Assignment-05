const btn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const BASE = "https://phi-lab-server.vercel.app/api/v1/lab";

let currentTab = "all";

// load issue

const loadIssues = async () => {

    
  const res = await fetch(`${BASE}/issues`);
  const data = await res.json();

  let issues = data.data;

  if (currentTab !== "all") {
    issues = issues.filter(i => i.status === currentTab);
  }

  console.log(issues);
  displayIssues(issues);

    


}

// display issue






const displayIssues = (issues) =>{
 const container = document.getElementById("issues");
  container.innerHTML = "";

  document.getElementById("count").innerText = `${issues.length} Issues`;

  issues.forEach(issue => {
    const div = document.createElement("div");
    div.className = `card ${issue.status}`;


     const labelsHTML = issue.labels.map(label => {
      return `<span class="label bg-amber-300 p-1 my-3 rounded-sm   ${label.replace(" ", "-")}">${label}</span>`;
    }).join(" ");

    div.innerHTML = `


    <div class="flex justify-between">
     <div>  
        ${issue.status}
      </div>
     <p class="priority"> ${issue.priority}</p>

     </div>
      <h4 class="font-bold text-xl ">${issue.title}</h4>
      <p class="text-[#64748B]">${issue.description}</p>

      
      <div class ="">
     
      <div class="labels">${labelsHTML}</div>
      </div>

      <p class="text-[#64748B] py-5 mt-5 border-t-2 "><span>#1</span> ${issue.author}</p>
      
      <p class="text-[#64748B]  ">${issue.createdAt}</p>


    `;

    div.onclick = () => openModal(issue.id);

    container.appendChild(div);


  });
}


// search 

async function searchIssue() {
  const desktop = document.getElementById("search-desktop");
  const mobile = document.getElementById("search-mobile");
  const text = desktop.value || mobile.value;

  const res = await fetch(`${BASE}/issues/search?q=${text}`);
  const data = await res.json();

  displayIssues(data.data);
}



// call issue

function changeTab(tab, el) {
  currentTab = tab;

  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  el.classList.add("active");

  loadIssues();
}




async function openModal(id) {
  const res = await fetch(`${BASE}/issue/${id}`);
  const data = await res.json();
  const i = data.data;

  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");


  
     const labelsHTML = i.labels.map(label => {
      return `<span class="label bg-amber-300 p-1 my-3 rounded-sm   ${label.replace(" ", "-")}">${label}</span>`;
    }).join("  ");

  content.innerHTML = `

    <h2 class="text-xl font-bold">${i.title}</h2>

    <div class= "flex justify-start items-center  gap-3">

     <p class=" bg-green-500 text-white p-2 rounded-xl"> ${i.status}</p>
   <p><b>Opened by: </b>${i.assignee || i.author}</p>

    <p>${i.updatedAt}</p>
    
    
    </div>

    <div >
     
      <div class="labels">${labelsHTML}</div>
      </div>


    <p>${i.description}</p>


    <div class=" flex justify-between bg-slate-100 rounded-sm p-4">

<p><b>Assign:</b> ${i.assignee || "N/A"}</p>
<p><b>Priority:</b> ${i.priority}</p>
    </div>

    
    
    

    <button onclick="closeModal()" class="btn btn-primary mt-3">Close</button>
  `;

 
  modal.classList.remove("hidden"); 
  modal.classList.add("flex");  
}

function closeModal() {
  const modal = document.getElementById("modal");
  
 
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Click outside modal to close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    closeModal();
  }
});




loadIssues();