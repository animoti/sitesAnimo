// Global Vars
const classToToggle = "active";
let bullets = 0;

// Dom Objects
const pageData = document.querySelector("body").getAttribute("pagedata");

const Header = {
  overlay: document.querySelector("#overlay"),
  menu: document.querySelector(".mobile-menu"),
  mobileServices: document.querySelector(".mobile-services-menu"),
  mobileIcon: document.querySelector(".mobile-menu .services-trigger > a"),
  services: document.querySelector(".services-menu"),
  icon: document.querySelector(".menu .services-trigger > a"),

  mobileDropdown() {
    this.mobileServices.classList.toggle(classToToggle);
    this.mobileIcon.classList.toggle(classToToggle);
  },

  fullSizeDropdown() {
    this.services.classList.toggle(classToToggle);
    this.icon.classList.toggle(classToToggle);
  },
};

const Menu = {
  button: document.querySelectorAll(".toggle-buttons-container button"),
  Toggle() {
    this.button.forEach((item) => {
      item.classList.toggle(classToToggle);
    });
    Header.menu.classList.toggle(classToToggle);
    Header.overlay.classList.toggle(classToToggle);
  },
};

// Helpers
function getWhatsappMessage() {
  let time = new Date().getHours();
  return time > 11 && time <= 17
    ? "Boa tarde"
    : time > 17 && time <= 23
    ? "Boa noite"
    : "Bom dia";
}

function setWhatsappMessage() {
  const whatsappButton = document.querySelector(".whatsapp");

  whatsappButton.setAttribute(
    "href",
    `https://api.whatsapp.com/send?phone=+5521991115329&text=${getWhatsappMessage()}, gostaria de agendar uma reunião!`,
  );
}

function getMenu(services) {
  let menuHtml = "";

  services.forEach((service) => {
    let menuHtmlSegment = `
    <li>
      <a href="${pageData == "index" ? "./" : "../"}${service.url}">${
      service.title
    }</a>
    </li>
  `;
    menuHtml += menuHtmlSegment;
  });
  document.querySelector(".services-menu").innerHTML = menuHtml;
  document.querySelector(".mobile-services-menu").innerHTML = menuHtml;
}

function renderBullets() {
  const bullet = document.createElement("button");
  bullet.className = "glide__bullet";
  bullet.setAttribute("data-glide-dir", "=" + bullets);

  document.querySelector(".glide__bullets").appendChild(bullet);
  bullets++;
}

// Database Functions
async function getServices() {
  try {
    let response = await fetch("../src/data/services.json");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderServices() {
  let servicesJson = await getServices();
  let servicesArr = servicesJson.services;

  if (pageData == "pages") {
    servicesArr = servicesJson.services.filter(
      (item) =>
        item.title !== document.querySelector(".info-container h1").innerHTML,
    );
  }

  getMenu(servicesArr);
  let html = "";

  if (pageData == "pages") {
    servicesArr.forEach((service) => {
      let segment = `
        <li class="glide__slide">
          <a href="../${service.url}">
            <div class="card">
              <div class="icon-container">
                <i class="${service.icon}"></i>
              </div>
              <h3>${service.title}</h3>
            </div>
          </a>
        </li>
      `;

      html += segment;
      document.querySelector(".glide__slides").innerHTML = html;
      renderBullets();
    });
    glideStart();
  } else if (pageData == "index") {
    servicesArr.forEach((service) => {
      let segment = `
        <div class="card">
        <a href="${service.url}">
          <div class="icon-container">
            <i class="${service.icon}"></i>
          </div>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </a>
        </div>
        `;
      html += segment;
      document.querySelector(".cards-container").innerHTML = html;
    });
  }
}

async function getPartners() {
  try {
    let response = await fetch("../src/data/partners.json");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderPartners() {
  let partnersJson = await getPartners();
  let html = "";

  if (pageData == "index" || pageData == "about") {
    partnersJson.partners.forEach((partner) => {
      let path = `../src/assets/img/partners/${partner.name.toLowerCase()}.png`;
      let segment = `
      <li>
          <a href="${partner.url}" class="slide-item" target="_blank">
            <img src="${path}" alt="Parceiro - ${partner.name}">
          </a>
       </li>
    `;
      html += segment;
      renderBullets();
    });
    document.querySelector(".glide__slides").innerHTML = html;
    glideStart();
  }
}

// Glide.js
function glideStart() {
  if (pageData == "index" || pageData == "about") {
    new Glide(".glide", {
      autoplay: 5000,
      type: "carousel",
      hoverPause: true,
      startAt: 0,
      perView: 3,
      breakpoints: {
        768: {
          perView: 2,
        },
        425: {
          perView: 1,
        },
      },
    }).mount();
  } else if (pageData == "pages") {
    new Glide(".glide", {
      autoplay: 8000,
      type: "carousel",
      hoverPause: true,
      startAt: 0,
      perView: 3,
      breakpoints: {
        1280: {
          perView: 2,
        },
        896: {
          perView: 1,
        },
      },
    }).mount();
  }
}

// Onload Functions
window.onload = () => {
  Header.services.addEventListener("mouseleave", () => {
    Header.fullSizeDropdown();
  });
  try {
    setWhatsappMessage();
    console.log("Api Whatsapp Loaded");
  } catch (e) {
    e.message = "Whatsapp Api Load Error";
    console.log(e);
  }

  try {
    renderPartners();
    renderServices();
    console.log("Database Loaded");
  } catch (e) {
    e.message = "Database Load Error";
    console.log(e);
  }
};
