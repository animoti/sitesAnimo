let classToToggle = "active";
let bullets = 0;
// Dom Objects
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

// Functions
function getMenu(item) {
  let servicesMenu = document.createElement("li");
  servicesMenu.innerHTML = `              
  <a href="../${item.url}">${item.title}</a>`;

  document.querySelector(".services-menu").appendChild(servicesMenu);
}

function getMobileMenu(item) {
  let servicesMenu = document.createElement("li");
  servicesMenu.innerHTML = `              
  <a href="../${item.url}">${item.title}</a>`;

  document.querySelector(".mobile-services-menu").appendChild(servicesMenu);
}

function getServices(item) {
  let newService = document.createElement("li");
  newService.className = "glide__slide";
  newService.innerHTML = `
  <a href="${item.url}">
    <div class="card">
      <div class="icon-container">
        <i class="${item.icon}"></i>
      </div>
      <h3>${item.title}</h3>
    </div>
  </a>
`;
  document.querySelector(".glide__slides").appendChild(newService);

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
      data.services = data.services.filter(
        (item) =>
          item.title !== document.querySelector(".info-container h1").innerHTML,
      );

      data.services.forEach((item) => {
        getServices(item);
        getMenu(item);
        getMobileMenu(item);
      });
    });

  setTimeout(function () {
    glideStart();
  }, 250);
}

function glideStart() {
  new Glide(".glide", {
    autoplay: 10000,
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

// Onload Functions
window.onload = () => {
  Header.services.addEventListener("mouseleave", () => {
    Header.fullSizeDropdown();
  });
};

loadServices();
