document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // You can use AJAX or Fetch API to send a request to the server for authentication.
    // Here, we simulate a successful login for demonstration purposes.

    // Replace this part with actual server-side authentication logic.
    if (username === "sampleUser" && password === "samplePassword") {
        // Redirect to the teacher's dashboard or any other authenticated page.
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("errorMessage").textContent = "Invalid username or password";
    }
});
