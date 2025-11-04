const buttons = document.querySelectorAll(".coursebtn");
const contents = document.querySelectorAll(".content");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.id;
    buttons.forEach((b) => b.classList.remove("btnactive"));
    e.currentTarget.classList.add("btnactive");
    contents.forEach((c) => c.classList.remove("active"));
    const selected = document.getElementById(id);
    if (selected) selected.classList.add("active");
  });
});

const forms = document.querySelectorAll(".needs-validation");

forms.forEach(function (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity()) {
      sendEmail(form);
    }
    form.classList.add("was-validated");
  });
});

function sendEmail(form) {
  const params = {
    name: document.getElementById("name").value.trim(),
    age: document.getElementById("age").value.trim(),
    gender: document.getElementById("gender").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    whatsappnumber: document.getElementById("wnumber").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.getElementById("address").value.trim(),
    course: document.getElementById("course").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  const serviceID = "service_4a4u7pr";
  const templateID = "template_0szhajf";

  emailjs
    .send(serviceID, templateID, params)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert(
        "Your Message Will Be sent To Dynamic Electrocplaters Private Limited!"
      );
      form.reset();
      form.classList.remove("was-validated");
    })
    .catch((error) => {
      console.error("FAILED...", error);
      alert("❌ Message failed to send. Try again!");
    });
}
