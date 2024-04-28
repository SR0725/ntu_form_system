$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    if (username === "admin" && password === "admin") {
      window.location.href = "form-list.html";
    } else {
      alert("帳號或密碼錯誤");
    }
  });
});
