
window.onload = function() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  
  localStorage.removeItem("loggedInUser");
};


document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");

  if (!username || !password) {
    error.textContent = "Please enter both username and password!";
    return;
  }

  
  localStorage.setItem("loggedInUser", username);

  
  window.location.href = "index.html";
});
