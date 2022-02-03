let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitLocalStorage);

/***********sélection de la classe pour le code HTML */
const positionCommande = document.getElementById("cart__items");
console.log(positionCommande);

/***********Si le panier est vide: afficher le panier est vide */

if (produitLocalStorage === null || produitLocalStorage == 0) {
  const panierVide = `
  <div class = "container -panier-vide">
  <div> le panier est vide </div>
  </div>`;
  positionCommande.innerHTML = panierVide;
} else {
  let structureProduitPanier = [];
  produitLocalStorage.sort((a, b) => (a.id > b.id ? -1 : 1));
  for (k = 0; k < produitLocalStorage.length; k++) {
    structureProduitPanier += `
      <article class="cart__item" data-id="${produitLocalStorage[k].id}" data-color="${produitLocalStorage[k].colors}">
                <div class="cart__item__img">
                  <img src="${produitLocalStorage[k].image}" alt="${produitLocalStorage[k].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitLocalStorage[k].name}</h2>
                    <p>${produitLocalStorage[k].colors}</p>
                    <p> ${produitLocalStorage[k].price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[k].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `;
    positionCommande.innerHTML = structureProduitPanier;
  }
  /*});*/
}

function displayTotal() {
  let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
  var priceTotal = 0;
  var quantityTotal = 0;
  for (let produit of produitLocalStorage) {
    quantityTotal += produit.quantity;
    priceTotal += produit.quantity * produit.price;
  }
  document.getElementById("totalQuantity").innerHTML = quantityTotal;
  document.getElementById("totalPrice").innerHTML = priceTotal;
}
displayTotal();

/*function removeButton() {
  let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
  let buttons = document.getElementsByClassName("deleteItem");
  for (let button of buttons) {
    for (let l = 0; 1 < button.length; l++) {
      button[l].addEventListener("click", (event) => {
        let article = event.target.closest("article");
        let id = article.dataset.id;
        let color = article.dataset.color;
        let suppression = produitLocalStorage[l].id;
        console.log("suppression");
        console.log(suppression);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.log("salut");
      });
      removeButton();
      displayTotal();
    }
  }
}*/

let buttonSupp = document.querySelectorAll(".deleteItem");
console.log(buttonSupp);

for (let l = 0; l < buttonSupp.length; l++) {
  buttonSupp[l].addEventListener("click", (event) => {
    event.preventDefault();
    let id_selectionnerSupp = produitLocalStorage[l].id;
    console.log(id_selectionnerSupp);
    console.log("id_selectionnerSupp");
    let colors_selectionnerSupp = produitLocalStorage[l].colors;

    produitLocalStorage = produitLocalStorage.filter(
      (el) =>
        el.id !== id_selectionnerSupp || el.colors !== colors_selectionnerSupp
    );
    console.log(produitLocalStorage);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    alert("Ce produit a été supprimé du panier");
    window.location.href = "cart.html";
  });
}
