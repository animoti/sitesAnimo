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
