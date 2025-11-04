(function () {
  const header_mobile = document.querySelector(".header_mobile");
  const icon = document.querySelector(".icon-container");
  const icon1 = document.querySelector(".icon-container1");
  icon.onclick = function () {
    header_mobile.classList.toggle("menu-open");
  };
  icon1.onclick = function () {
    header_mobile.classList.toggle("menu-open");
  };
})();
