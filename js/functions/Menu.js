function getMenu(item) {
  let servicesMenu = document.createElement("li");
  servicesMenu.innerHTML = `              
  <a href="${item.url}">${item.title}</a>`;

  document.querySelector(".services-menu").appendChild(servicesMenu);
  document.querySelector(".mobile-services-menu").appendChild(servicesMenu);
}
