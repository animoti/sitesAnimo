function getService(item) {
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
  let servicesMenu = document.createElement("li");
  servicesMenu.innerHTML = `              
  <a href="${item.url}">${item.title}</a>`;

  document.querySelector(".services-menu").appendChild(servicesMenu);
}
