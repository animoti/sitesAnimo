// Dom Objects
let classToToggle = "active";
let bullets = 0;
const Header = {
  overlay: document.querySelector("#overlay"),
  element: document.querySelector("#header"),
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
  button: document.querySelectorAll(".icon-container i"),
  Toggle() {
    this.button.forEach((item) => {
      item.classList.toggle(classToToggle);
    });
    Header.menu.classList.toggle(classToToggle);
    Header.overlay.classList.toggle(classToToggle);
  },
};

const Home = {
  element: document.querySelector("#home"),

  setHeight() {
    let height = Header.element.getBoundingClientRect().height;
    this.element.style.height = `calc(100vh - ${height}px)`;
  },
};

// Functions
function getMenu(item) {
  let servicesMenu = document.createElement("li");
  servicesMenu.innerHTML = `              
  <a href="${item.url}">${item.title}</a>`;

  document.querySelector(".services-menu").appendChild(servicesMenu);
}

function getMobileMenu(item) {
  let servicesMenu = document.createElement("li");
  servicesMenu.innerHTML = `              
  <a href="${item.url}">${item.title}</a>`;

  document.querySelector(".mobile-services-menu").appendChild(servicesMenu);
}

function getServices(item) {
  let newService = document.createElement("div");
  newService.className = "card";
  newService.innerHTML = `
  <div class="icon-container">
    <i class="${item.icon}"></i>
  </div>
  <h3><a href="${item.url}">${item.title}</a></h3>
  <p>${item.description}</p>
`;
  document.querySelector(".cards-container").appendChild(newService);
}

function getPartners(item) {
  let newPartner = document.createElement("li");
  newPartner.className = "glide__slide";
  let path = `../assets/img/partners/${item.name.toLowerCase()}.png`;
  newPartner.innerHTML = `
  <a href="${item.url}" class="slide-item" target="_blank">
    <img src="${path}" alt="Parceiro - ${item.name}">
  </a>
`;

  document.querySelector(".glide__slides").appendChild(newPartner);

  let bullet = document.createElement("button");
  bullet.className = "glide__bullet";
  bullet.setAttribute("data-glide-dir", "=" + bullets);

  document.querySelector(".glide__bullets").appendChild(bullet);
  bullets++;
}

function loadServices() {
  fetch("../data/services.json")
    .then((response) => response.json())
    .then((data) => {
      data.services.forEach((item) => {
        getServices(item);
        getMenu(item);
        getMobileMenu(item);
      });
    });
}

function loadPartners() {
  fetch("./data/partners.json")
    .then((response) => response.json())
    .then((data) => {
      data.partners.forEach((item) => {
        getPartners(item);
      });
    });
}

function glideStart() {
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
}

// Onload Functions
window.onload = () => {
  Home.setHeight();
  window.addEventListener("resize", () => {
    Home.setHeight();
  });

  Header.services.addEventListener("mouseleave", () => {
    Header.fullSizeDropdown();
  });

  glideStart();
};

loadServices();
loadPartners();
