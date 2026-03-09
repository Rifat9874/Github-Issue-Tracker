if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

// API
const API_BASE = "https://phi-lab-server.vercel.app/api/v1/lab";
const API_ALL = `${API_BASE}/issues`;
const API_SINGLE = `${API_BASE}/issue/`;
const API_SEARCH = `${API_BASE}/issues/search?q=`;

// GLOBAL DATA
let masterIssues = [];

const container = document.getElementById("issuesContainer");


// SPINNER CONTROL
const manageSpinner = (status) => {
  const loading = document.getElementById("loading");

  if (status == true) {
    loading.classList.remove("hidden");
    container.innerHTML = "";
  } else {
    loading.classList.add("hidden");
  }
};


// LOAD ALL ISSUES
const loadIssues = () => {
  manageSpinner(true);

  fetch(API_ALL)
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        masterIssues = data.data || [];
        displayIssues(masterIssues);
        manageSpinner(false);
      }, 2000); // 2 second delay
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      manageSpinner(false);
    });
};


// DISPLAY ALL CARDS
const displayIssues = (issues) => {

  container.innerHTML = "";

  document.getElementById("issueCount").innerText = issues.length;

  issues.forEach((issue) => {

    const isClosed = issue.status.toLowerCase() === "closed";
    const statusClass = isClosed ? "card-closed" : "card-open";

    const statusImg = isClosed
      ? "assets/Closed- Status .png"
      : "assets/Open-Status.png";

    const p = issue.priority.toLowerCase();

    let priorityClass = "bg-slate-100 text-slate-400";

    if (p === "high") priorityClass = "bg-red-50 text-red-400";
    if (p === "medium") priorityClass = "bg-orange-50 text-orange-400";

    const card = document.createElement("div");

    card.className =
      `bg-white p-6 rounded-lg border border-slate-200 border-t-4 shadow-sm cursor-pointer issue-card ${statusClass} flex flex-col justify-between`;

    card.onclick = () => loadIssueDetails(issue._id || issue.id);

    card.innerHTML = `
        <div>
            <div class="flex justify-between items-center mb-4">
                <img src="${statusImg}" class="w-5 h-5">

                <span class="px-4 py-1 rounded-full text-[10px] font-bold uppercase ${priorityClass}">
                    ${issue.priority}
                </span>
            </div>

            <h3 class="font-bold text-slate-700 text-md mb-2 line-clamp-1">
                ${issue.title}
            </h3>

            <p class="text-xs text-slate-400 mb-4 line-clamp-2">
                ${issue.description}
            </p>

            <div class="flex gap-2 mb-6">
                <span class="bg-red-50 text-red-400 px-2 py-1 rounded-md text-[9px] font-bold border border-red-100">🐞 BUG</span>
                <span class="bg-orange-50 text-orange-400 px-2 py-1 rounded-md text-[9px] font-bold border border-orange-100">⚙️ HELP WANTED</span>
            </div>
        </div>

        <div class="border-t pt-4 text-[11px] text-slate-400 font-medium">
            <p># by ${issue.author}</p>
            <p class="mt-1">${new Date(issue.createdAt).toLocaleDateString("en-GB")}</p>
        </div>
    `;

    container.append(card);

  });

  manageSpinner(false);
};



// LOAD SINGLE ISSUE DETAILS
const loadIssueDetails = async (id) => {

  const res = await fetch(API_SINGLE + id);
  const data = await res.json();

  displayIssueModal(data.data);
};


// DISPLAY MODAL
const displayIssueModal = (issue) => {

  document.getElementById("modalTitle").innerText = issue.title;

  document.getElementById("modalDesc").innerText = issue.description;

  document.getElementById("modalAssignee").innerText = issue.author;

  const isClosed = issue.status.toLowerCase() === "closed";

  const statusBg = isClosed ? "bg-purple-500" : "bg-emerald-500";

  document.getElementById("modalMeta").innerHTML = `
        <span class="${statusBg} text-white px-3 py-1 rounded-md text-[11px] font-bold mr-2 uppercase">
            ${issue.status}
        </span>

        <span class="text-[11px] text-slate-400 font-medium">
            • Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString("en-GB")}
        </span>
    `;

  const badge = document.getElementById("modalPriority");

  badge.innerText = issue.priority.toUpperCase();

  const p = issue.priority.toLowerCase();

  let pColor = "bg-slate-400";

  if (p === "high") pColor = "bg-red-500";
  if (p === "medium") pColor = "bg-orange-400";

  badge.className =
    `px-4 py-1 rounded-md text-[10px] font-bold text-white uppercase ${pColor}`;

  document.getElementById("issueModal").showModal();
};



// FILTER ISSUES
window.filterIssues = (status, btn) => {

  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.remove("bg-indigo-600", "text-white");
    b.classList.add("bg-white", "text-slate-600", "border-slate-200");
  });

  btn.classList.add("bg-indigo-600", "text-white");
  btn.classList.remove("bg-white", "text-slate-600", "border-slate-200");

  if (status === "all") {
    displayIssues(masterIssues);
  } else {

    const filtered = masterIssues.filter(
      (i) => i.status.toLowerCase() === status
    );

    displayIssues(filtered);
  }
};


// SEARCH
const handleSearch = () => {

  const text = document.getElementById("searchInput").value.trim();

  if (!text) {
    displayIssues(masterIssues);
    return;
  }

  manageSpinner(true);

  fetch(API_SEARCH + encodeURIComponent(text))
    .then((res) => res.json())
    .then((data) => {

      if (data.data && data.data.length > 0) {

        displayIssues(data.data);

      } else {

        container.innerHTML = `
            <div class="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                <p class="text-slate-400 font-bold text-lg">
                    No results found for "${text}"
                </p>

                <button onclick="loadIssues()" class="text-indigo-600 underline mt-2">
                    View All Issues
                </button>
            </div>
        `;

        document.getElementById("issueCount").innerText = 0;
      }

    })
    .catch((err) => console.error("Search API Error:", err))
    .finally(() => manageSpinner(false));
};



// EVENTS
document
  .getElementById("searchBtn")
  .addEventListener("click", handleSearch);

document
  .getElementById("searchInput")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });


// INITIAL LOAD
loadIssues();