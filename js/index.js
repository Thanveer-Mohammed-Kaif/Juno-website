let products = [];

const productList = document.querySelector(".product-list");

function loadProducts(fileName, country) {
  fetch(fileName)
    .then((res) => res.json())
    .then((data) => {
      products = data;

      if (document.querySelector(".product-list")) {
        renderProducts(country);
      }

      if (document.querySelector(".product-detail")) {
        showProductDetails();
      }
    })
    .catch((err) => console.error("Failed to load JSON file:", err));
}

function renderProducts(country) {
  productList.innerHTML = "";

  products.forEach((item) => {
    const link = document.createElement("a");
    link.href = `detail.html?country=${country}&id=${item.id}`;

    link.innerHTML = `
      <div class="card d-flex justify-content-center flex-column gap-4">
        <div class="image">
          <img src="${item.image}" alt="${item.name}" class="w-100">
        </div>
        <div class="card-text">
          <h4>${item.name}</h4>
          <p class="mb-0">${item.Description}</p>
          <div class="card-btn d-flex justify-content-between mt-5">
            <h4>${item.weight}</h4>
            <button>View Details</button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(link);
  });
}

function hideAllTabs() {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.display = "none";
  });
}

function activateButton(tabId) {
  document
    .querySelectorAll(".btns")
    .forEach((btn) => btn.classList.remove("tabactive"));
  const activeBtn = document.querySelector(`.btns[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add("tabactive");
}

function showTab(tabId) {
  hideAllTabs();
  const tab = document.getElementById(tabId);
  if (tab) tab.style.display = "block";
  activateButton(tabId);
}

function showProductDetails() {
  const detailSection = document.querySelector(".product-detail");
  const aboutSection = document.querySelector(".about-products");

  if (!detailSection) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product = products.find((p) => p.id == productId);
  if (!product) {
    detailSection.innerHTML = "<p>Product not found.</p>";
    return;
  }
  detailSection.querySelector(".img").src = product.image;
  detailSection.querySelector(".name").textContent = product.name;
  detailSection.querySelector(".smalldesc").textContent = product.Description;
  detailSection.querySelector(".Weight").textContent = product.weight;
  detailSection.querySelector(".materials").textContent = product.materials;
  detailSection.querySelector(".Hsn").textContent = product.hsn || "N/A";
  const btn = document.querySelector(".buy-btn");

console.log(btn.setAttribute("href", product.url));

  detailSection.querySelector(".money").innerHTML = `${
    product.price
  } <span class="text-secondary fw-light ms-2">M.R.P: <span class="slashedmoney text-decoration-line-through">${
    product.mrp || ""
  }</span></span>`;

  const stockBadge = detailSection.querySelector(".badge");
  if (stockBadge) {
    stockBadge.textContent = product.stock || "In Stock";
    stockBadge.classList.add("bg-success", "text-white");
  }

  const starsContainer = detailSection.querySelector(".stars");
  const ratingContainer = detailSection.querySelector(".rating");
  const reviewsContainer = detailSection.querySelector(".reviewsno");

  if (product.rating) {
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5;
    let starsHTML = "";

    for (let i = 0; i < fullStars; i++) starsHTML += "⭐";
    if (halfStar) starsHTML += "⭐";

    starsContainer.innerHTML = starsHTML;
    ratingContainer.textContent = ` ${product.rating}`;
    reviewsContainer.textContent = ` (${product.reviews} reviews)`;
  } else {
    starsContainer.textContent = "⭐️⭐️⭐️⭐️⭐️";
    ratingContainer.textContent = " 5.0";
    reviewsContainer.textContent = " (0 reviews)";
  }
  const pricebtn = document.getElementById("buy-btn");

  const descDiv = document.getElementById("description");
  const ingDiv = document.getElementById("ingredients");
  const featDiv = document.getElementById("features");

  if (descDiv)
    descDiv.innerHTML =
      product.long_Description || "<p>No description available.</p>";
  if (ingDiv)
    ingDiv.innerHTML = product.ingredients || "<p>No ingredients listed.</p>";
  if (featDiv)
    featDiv.innerHTML = product.key_feature || "<p>No features listed.</p>";

  document.querySelectorAll(".btns").forEach((btn) => {
    btn.onclick = null;
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      if (tabId) showTab(tabId);
    });
  });

  showTab("description");

  if (aboutSection) {
    const descEl = aboutSection.querySelector(".long-desc");
    const pointsEl = aboutSection.querySelector(".points");

    if (descEl)
      descEl.textContent = product.long_Description.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      );
    if (pointsEl) pointsEl.innerHTML = product.Bullet_points || "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const indiaBtn = document.getElementById("india");
  const usaBtn = document.getElementById("usa");

  if (indiaBtn) {
    indiaBtn.addEventListener("click", () =>
      loadProducts("../json/indian-product.json", "india")
    );
  }

  if (usaBtn) {
    usaBtn.addEventListener("click", () =>
      loadProducts("../json/usa-product.json", "usa")
    );
  }

  const params = new URLSearchParams(window.location.search);
  const country = params.get("country");

  if (country === "usa") {
    loadProducts("../json/usa-product.json", "usa");
  } else {
    loadProducts("../json/indian-product.json", "india");
  }
});

const tabButtons = document.querySelectorAll(".btns");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("tabactive"));
    btn.classList.add("tabactive");
  });
});
