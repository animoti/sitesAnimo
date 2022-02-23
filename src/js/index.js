// Dom Objects
const pageData = document.querySelector("body").getAttribute("pagedata");
let classToToggle = "active";
let bullets = 0;
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

// Functions
function getWhatsappMessage() {
  let time = new Date().getHours();
  return time > 11 && time <= 17
    ? "Boa tarde"
    : time > 17 && time <= 23
    ? "Boa noite"
    : "Bom dia";
}

async function setWhatsappMessage() {
  const whatsappButton = document.querySelector(".whatsapp");

  whatsappButton.setAttribute(
    "href",
    `https://api.whatsapp.com/send?phone=+5521991115329&text=${await getWhatsappMessage()}, gostaria de agendar uma reunião!`,
  );
}

function getDesktopMenuItem(service) {
  const serviceItem = document.createElement("li");

  serviceItem.innerHTML = `              
  <a href="${pageData == "index" ? "./" : "../"}${service.url}">${
    service.title
  }</a>`;

  document.querySelector(".services-menu").appendChild(serviceItem);
}

function getMobileMenuItem(service) {
  const serviceItem = document.createElement("li");

  serviceItem.innerHTML = `              
  <a href="${pageData == "index" ? "./" : "../"}${service.url}">${
    service.title
  }</a>`;

  document.querySelector(".mobile-services-menu").appendChild(serviceItem);
}

function createCarousel() {
  document.querySelector(".glide").innerHTML = `
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
    </ul>
  </div>
  <div class="glide__bullets" data-glide-el="controls[nav]"></div>
  `;
}

function createBullet() {
  const bullet = document.createElement("button");
  bullet.className = "glide__bullet";
  bullet.setAttribute("data-glide-dir", "=" + bullets);

  document.querySelector(".glide__bullets").appendChild(bullet);
  bullets++;
}

// Services
function loadServices() {
  fetch("../src/data/services.json")
    .then((response) => response.json())
    .then((data) => {
      if (pageData == "pages") {
        data.services = data.services.filter(
          (item) =>
            item.title !==
            document.querySelector(".info-container h1").innerHTML,
        );
      }
      data.services.forEach((service) => {
        if (pageData == "index") {
          const newService = document.createElement("div");
          newService.className = "card";
          newService.innerHTML = `
          <a href="${service.url}">
            <div class="icon-container">
              <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
          </a>
        `;
          document.querySelector(".cards-container").appendChild(newService);
        } else if (pageData == "pages") {
          (async function () {
            await createCarousel();
            const newService = document.createElement("li");
            newService.className = "glide__slide";
            newService.innerHTML = `
            <a href="../${service.url}">
              <div class="card">
                <div class="icon-container">
                  <i class="${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
              </div>
            </a>`;

            document.querySelector(".glide__slides").appendChild(newService);
            createBullet();
          })();
        }
        getDesktopMenuItem(service);
        getMobileMenuItem(service);
      });
    });
}

// Partners
async function loadPartners() {
  await createCarousel();

  fetch("../src/data/partners.json")
    .then((response) => response.json())
    .then((data) => {
      data.partners.forEach((partner) => {
        if (pageData == "index" || pageData == "about") {
          let newPartner = document.createElement("li");
          let path = `../src/assets/img/partners/${partner.name.toLowerCase()}.png`;
          newPartner.innerHTML = `
          <a href="${partner.url}" class="slide-item" target="_blank">
            <img src="${path}" alt="Parceiro - ${partner.name}">
          </a>
          `;

          document.querySelector(".glide__slides").appendChild(newPartner);
          createBullet();
        }
      });

      glideStart();
    });
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
  setWhatsappMessage();
};

loadServices();
loadPartners();
