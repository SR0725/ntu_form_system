$(document).ready(function () {
  // when logout button is clicked, redirect to login page
  $("#btn-logout").on("click", function () {
    window.location.href = "login.html";
  });
});
