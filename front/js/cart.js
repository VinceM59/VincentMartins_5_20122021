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
        if (quantity > 100) {
          alert("La quantité maximale autorisée est de 100 unités");
          location.reload();
          return;
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

  let emailReg = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let nameReg = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressReg = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

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

    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    if (nameReg.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const valideLastName = function (inputLastName) {
    //creation de la reg exp pour la validation du nom
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (nameReg.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const valideAddress = function (inputAddress) {
    //creation de la reg exp pour la validation du nom
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (addressReg.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Addresse non valide";
    }
  };

  const valideCity = function (inputCity) {
    //creation de la reg exp pour la validation dde la ville
    let cityErrorMsg = inputCity.nextElementSibling;
    if (nameReg.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Ville non valide";
    }
  };

  const valideEmail = function (inputEmail) {
    //creation de la reg exp pour la validation email
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (emailReg.test(inputEmail.value)) {
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
    event.preventDefault();
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
      fetch("http://localhost:3000/api/products/order", {
        method: `POST`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((conf) => {
          console.log("On reçoit la réponse de l'API : ");
          console.log(conf);
          window.location.href = "confirmation.html?orderId=" + conf.orderId;
          localStorage.clear();
        })
        .catch((error) => {
          alert(error);
          window.location.reload();
        });
    }
  });
}
formPost();

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
