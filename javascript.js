// Redirect if not logged in
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