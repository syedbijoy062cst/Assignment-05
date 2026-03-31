const btn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const BASE = "https://phi-lab-server.vercel.app/api/v1/lab";

let currentTab = "all";

//Load Issues
const loadIssues = async () => {
  try {
    const res = await fetch(`${BASE}/issues`);
    const data = await res.json();

    let issues = data.data || [];

    // filter by tab
    if (currentTab !== "all") {
      issues = issues.filter(i => i.status === currentTab);
    }

    displayIssues(issues);

  } catch (err) {
    console.error("Error loading issues:", err);
  }
};


const displayIssues = (issues) => {
  const container = document.getElementById("issues");
  container.innerHTML = "";

  document.getElementById("count").innerText = `${issues.length} Issues`;

  if (issues.length === 0) {
    container.innerHTML = `<p class="text-center col-span-4">No issues found</p>`;
    return;
  }

  issues.forEach(issue => {
    const div = document.createElement("div");

    // status class fallback
    const statusClass = issue.status === "open" ? "bg-green-100" : "bg-blue-100";

    div.className = `card p-4 shadow-md rounded-xl ${statusClass}`;

    // labels safe check
    const labelsHTML = (issue.labels || []).map(label => {
      return `<span class="bg-amber-300 px-2 py-1 rounded text-sm">${label}</span>`;
    }).join(" ");

    div.innerHTML = `
      <div class="flex justify-between">
        <span class="font-semibold capitalize">${issue.status}</span>
        <span class="text-sm">${issue.priority}</span>
      </div>

      <h4 class="font-bold text-lg mt-2">${issue.title}</h4>
      <p class="text-[#64748B] text-sm">${issue.description}</p>

      <div class="my-2">${labelsHTML}</div>

      <p class="text-[#64748B] text-sm border-t pt-2">
        <span>#${issue.id}</span> ${issue.author}
      </p>

      <p class="text-xs text-gray-400">${issue.createdAt}</p>
    `;

    div.addEventListener("click", () => openModal(issue.id));

    container.appendChild(div);
  });
};


async function searchIssue() {
  try {
    const desktop = document.getElementById("search-desktop");
    const mobile = document.getElementById("search-mobile");

    const text = (desktop?.value || mobile?.value || "").trim();

    if (!text) {
      loadIssues();
      return;
    }

    const res = await fetch(`${BASE}/issues/search?q=${text}`);
    const data = await res.json();

    displayIssues(data.data || []);

  } catch (err) {
    console.error("Search error:", err);
  }
}


function changeTab(tab, el) {
  currentTab = tab;

  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  el.classList.add("active");

  loadIssues();
}


async function openModal(id) {
  try {
    const res = await fetch(`${BASE}/issue/${id}`);
    const data = await res.json();
    const i = data.data;

    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    const labelsHTML = (i.labels || []).map(label => {
      return `<span class="bg-amber-300 px-2 py-1 rounded text-sm">${label}</span>`;
    }).join(" ");

    content.innerHTML = `
      <h2 class="text-xl font-bold">${i.title}</h2>

      <div class="flex flex-wrap gap-2 text-sm">
        <span class="bg-green-500 text-white px-2 py-1 rounded">${i.status}</span>
        <span><b>Opened by:</b> ${i.assignee || i.author}</span>
        <span>${i.updatedAt}</span>
      </div>

      <div class="my-2">${labelsHTML}</div>

      <p>${i.description}</p>

      <div class="flex justify-between bg-slate-100 p-3 rounded">
        <p><b>Assign:</b> ${i.assignee || "N/A"}</p>
        <p><b>Priority:</b> ${i.priority}</p>
      </div>

      <button onclick="closeModal()" class="btn btn-primary mt-3">Close</button>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");

  } catch (err) {
    console.error("Modal error:", err);
  }
}

//  Modal Close
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}


window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    closeModal();
  }
});


loadIssues();