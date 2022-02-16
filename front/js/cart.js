let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitLocalStorage);

/***********sélection de la classe pour le code HTML */
const positionCommande = document.getElementById("cart__items");
/*console.log(positionCommande);*/

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
  if (!quantityTotal) {
    const panierVide = `
  <div class = "container -panier-vide">
  <div> le panier est vide </div>
  </div>`;
    positionCommande.innerHTML = panierVide;
  }
}
displayTotal();

function removeButton() {
  let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
  let buttons = document.getElementsByClassName("deleteItem");
  for (let button of buttons) {
    button.addEventListener("click", (event) => {
      let article = event.target.closest("article");
      let id = article.dataset.id;
      let color = article.dataset.color;
      for (let k = 0; k < produitLocalStorage.length; k++) {
        if (
          id == produitLocalStorage[k].id &&
          color == produitLocalStorage[k].colors
        ) {
          produitLocalStorage.splice(k, 1);
          break;
        }
      }
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      displayTotal();
      article.remove();
    });
  }
}
removeButton();

function changeButton() {
  let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
  let buttons = document.getElementsByClassName("itemQuantity");
  for (let button of buttons) {
    button.addEventListener("change", (event) => {
      let article = event.target.closest("article");
      let id = article.dataset.id;
      let color = article.dataset.color;
      let quantity = parseInt(event.target.value);
      for (let k = 0; k < produitLocalStorage.length; k++) {
        if (
          id == produitLocalStorage[k].id &&
          color == produitLocalStorage[k].colors
        ) {
          produitLocalStorage[k].quantity = quantity;
          break;
        }
      }
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      displayTotal();
    });
  }
}
changeButton();

function renseignements() {
  let formulaire = document.querySelector(".cart__order__form");

  //écouter la modification du prénom
  formulaire.firstName.addEventListener("change", function () {
    valideFirstName(this);
  });

  //écouter le modification du nom
  formulaire.lastName.addEventListener("change", function () {
    valideLastName(this);
  });

  // écouter la modification de l'adresse
  formulaire.address.addEventListener("change", function () {
    valideAddress(this);
  });

  //écouter la modification de la ville
  formulaire.city.addEventListener("change", function () {
    valideCity(this);
  });

  //écouter la modification de l'email
  formulaire.email.addEventListener("change", function () {
    valideEmail(this);
  });

  const valideFirstName = function (inputFirstName) {
    //creation de la reg exp pour la validation du prénom
    let firstNameRegExp = new RegExp("^[a-zA-Z][0-9a-zA-Z .,'-]*$", "g");
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    if (testFirstName) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "erreur";
    }
  };

  const valideLastName = function (inputLastName) {
    //creation de la reg exp pour la validation du nom
    let lastNameRegExp = new RegExp("^[a-zA-Z][0-9a-zA-Z .,'-]*$", "g");
    let testLastName = lastNameRegExp.test(inputLastName.value);
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (testLastName) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "erreur";
    }
  };

  const valideAddress = function (inputAddress) {
    //creation de la reg exp pour la validation du nom
    let addressRegExp = new RegExp(
      "[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+",
      "g"
    );
    let testAddress = addressRegExp.test(inputAddress.value);
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (testAddress) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Addresse non valide";
    }
  };

  const valideCity = function (inputCity) {
    //creation de la reg exp pour la validation dde la ville
    let cityRegExp = new RegExp("^[a-zA-Z][0-9a-zA-Z .,'-]*$", "g");
    let testCity = cityRegExp.test(inputCity.value);
    let cityErrorMsg = inputCity.nextElementSibling;
    if (testCity) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Ville non valide";
    }
  };

  const valideEmail = function (inputEmail) {
    //creation de la reg exp pour la validation email
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g"
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (testEmail) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Adresse non valide";
    }
  };
}
renseignements();

/*afficherFormulaireHtml();*/
function formPost() {
  const btnForm = document.getElementById("order");

  btnForm.addEventListener("click", (event) => {
    console.log("CLICK sur le boutton");
    console.log("salut");
    let postFirstName = document.getElementById("firstName");
    let postLastName = document.getElementById("lastName");
    let postAddress = document.getElementById("address");
    let postCity = document.getElementById("city");
    let postEmail = document.getElementById("email");

    let products = [];
    for (let p = 0; p < produitLocalStorage.length; p++) {
      products.push(produitLocalStorage[p].id);
    }
    console.log("products");
    console.log(products);

    const order = {
      contact: {
        firstName: postFirstName.value,
        lastName: postLastName.value,
        address: postAddress.value,
        city: postCity.value,
        email: postEmail.value,
      },
      products,
    };
    console.log("Order à envoyer : ");
    console.log(order);
    if (
      postFirstName.value === "" ||
      postLastName.value === "" ||
      postAddress.value === "" ||
      postCity.value === "" ||
      postEmail.value === ""
    ) {
      window.confirm("champs manquant !!");
      window.onbeforeunload;
    } else {
      const promise = fetch("http://localhost:3000/api/products/order", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((end) => {
          console.log("On reçoit la réponse de l'API : ");
          console.log(end);
          localStorage.setItem("produit", "[]");
          document.location = "confirmation.html?orderId=" + end.orderId;
        });
      /*fetch("http://localhost:3000/api/products/order", {
        metthod: "post",
        Headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          window.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
        .catch((error) => {
          alert(error);
        });*/

      // const options = {
      //   metthod: "post",
      //   body: JSON.stringify(order),
      //   Headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      // };
      // fetch("http://localhost:3000/api/products/order", options)
      //   .then((response) => response.json())
      //   .then((end) => {
      //     console.log("data");
      //     console.log(data);
      //     localStorage.clear();
      //     document.location = "confirmation.html?orderId" + end.orderId;
      //   })
      //   .catch((err) => {
      //     alert("problème avec fetch : " + err.message);
      //   });
    }
  });
}
formPost();
