let classToToggle = "active";
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

function getService(item) {
  let newService = document.createElement("div");
  newService.innerHTML = `
  <div class="card">
    <div class="icon-container">
      <i class="${item.icon}"></i>
    </div>
    <h3><a href="${item.url}">${item.title}</a></h3>
    <p>${
      item.description.length > 200
        ? item.description.substring(0, 150) + "..."
        : item.description
    }</p>
  </div>
`;
  document.querySelector(".cards-container").appendChild(newService);
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
        getService(item);
        getMenu(item);
        getMobileMenu(item);
      });
    });
}

function gliderStart() {
  new Glider(document.querySelector(".glider"), {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: ".dots",
    resizeLock: true,
    arrows: {
      prev: ".prev",
      next: ".next",
    },
    rewind: true,
    duration: 2.5,

    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

window.onload = () => {
  Header.services.addEventListener("mouseleave", () => {
    Header.fullSizeDropdown();
  });

  gliderStart();
};

loadServices();
