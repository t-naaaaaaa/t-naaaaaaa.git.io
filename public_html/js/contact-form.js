document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData(form);

    fetch("send_mail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        if (result === "メッセージが送信されました。ありがとうございます。") {
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("エラーが発生しました。もう一度お試しください。");
      });
  });

  function validateForm() {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (field.type === "radio") {
        const radioGroup = form.querySelector(
          `input[name="${field.name}"]:checked`
        );
        if (!radioGroup) {
          isValid = false;
          alert("お問い合わせ種別を選択してください。");
        }
      } else if (!field.value.trim()) {
        isValid = false;
        alert(
          `${field.previousElementSibling.textContent.replace(
            " *",
            ""
          )}を入力してください。`
        );
      }
    });

    return isValid;
  }
});
