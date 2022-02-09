//DOM Objects
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

const Home = {
  element: document.querySelector("#home"),

  setHeight() {
    let height = Header.element.getBoundingClientRect().height;
    this.element.style.height = `calc(100vh - ${height}px)`;
  },
};

//Functions
function loadServices() {
  fetch("./data/services.json")
    .then((response) => response.json())
    .then((data) => {
      data.services.forEach((item) => {
        getService(item);
      });
    });
}

function loadPartners() {
  fetch("./data/partners.json")
    .then((response) => response.json())
    .then((data) => {
      data.partners.forEach((item) => {
        getPartner(item);
      });
    });
}
function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}
function gliderStart() {
  gliderAutoplay(
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
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }),
    {
      interval: 5000,
    },
  );
}

//Onload Functions
window.onload = () => {
  Home.setHeight();
  window.addEventListener("resize", () => {
    Home.setHeight();
  });

  Header.services.addEventListener("mouseleave", () => {
    Header.fullSizeDropdown();
  });

  gliderStart();
};

loadServices();
loadPartners();
