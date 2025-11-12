function sendEmailForm() {
  const formData = {
    fullName: document.getElementById("fullName").value.trim(),
    dob: document.getElementById("dob").value.trim(),
    gender: document.getElementById("gender").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("wnumber").value.trim(),
    address: document.getElementById("address").value.trim(),
    timezone: document.getElementById("timezone").value.trim(),
    consultMode: document.getElementById("consultMode").value.trim(),
    concern: document.getElementById("concern").value.trim(),
    medications: document.getElementById("medications").value.trim(),
    practices: document.getElementById("practices").value.trim(),
    courseDate: document.getElementById("courseDate").value.trim(),
    refundPolicy: document.getElementById("refundPolicy").checked ? "Agreed" : "Not Agreed",
  };

  // Simple regex validations
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;

  if (
    !formData.fullName ||
    !formData.dob ||
    !formData.gender ||
    !formData.email ||
    !formData.phone ||
    !formData.address ||
    !formData.timezone ||
    !formData.consultMode ||
    !formData.concern ||
    !formData.courseDate ||
    !formData.refundPolicy === "Not Agreed"
  ) {
    alert("⚠️ Please fill in all required fields.");
    return;
  }

  if (!emailPattern.test(formData.email)) {
    alert("⚠️ Please enter a valid email address.");
    return;
  }

  if (!phonePattern.test(formData.phone)) {
    alert("⚠️ Please enter a valid 10-digit phone number.");
    return;
  }

  // Send Email using EmailJS
  emailjs
    .send("service_kiyxotg", "template_xxxxxx", formData)
    .then(() => {
      alert("✅ Your details have been sent successfully!");
      console.log("Form Data Sent:", formData);

      // Clear the form
      document.getElementById("fullName").value = "";
      document.getElementById("dob").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("email").value = "";
      document.getElementById("wnumber").value = "";
      document.getElementById("address").value = "";
      document.getElementById("timezone").value = "";
      document.getElementById("consultMode").value = "";
      document.getElementById("concern").value = "";
      document.getElementById("medications").value = "";
      document.getElementById("practices").value = "";
      document.getElementById("courseDate").value = "";
      document.getElementById("refundPolicy").checked = false;

      document.querySelectorAll('input[name="serviceOption"]').forEach((c) => (c.checked = false));
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send details. Please try again later.");
    });
}

