function getPartner(item) {
  let newPartner = document.createElement("div");
  let path = `../assets/img/partners/${item.name.toLowerCase()}.png`;
  newPartner.innerHTML = `
  <a href="${item.url}" class="slide-item" target="_blank">
    <img src="${path}" alt="Parceiro - ${item.name}">
  </a>
`;

  document.querySelector(".glider").appendChild(newPartner);
}
