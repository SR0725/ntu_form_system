$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    // 隱藏所有錯誤信息
    $(".error-message").hide();

    let hasError = false;

    // 帳號錯誤處理
    if (username !== "admin") {
      $("#username")
        .closest(".form-group")
        .find(".error-message")
        .text("帳號錯誤")
        .show();
      hasError = true;
    }

    // 密碼錯誤處理
    if (password !== "admin") {
      $("#password")
        .closest(".form-group")
        .find(".error-message")
        .text("密碼錯誤")
        .show();
      hasError = true;
    }

    // 如果沒有錯誤，則轉向指定頁面
    if (!hasError) {
      window.location.href = "form-list.html";
    }
  });
});
