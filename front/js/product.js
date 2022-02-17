// Récupération de l'ID au sein de l'URL
var str =
  "file:///C:/Users/vince/Documents/VincentMartins_5_20122021/front/html/product.html?id=415b7cacb65d43b2b5c1ff70f3393ad1";
var url = new URL(window.location.href);
var products = url.searchParams.get("id");
console.log(products);

//affichage produit
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");

// Affichage du produit en fonction de son ID
fetch("http://localhost:3000/api/products/" + products)
  .then((response) => response.json())
  .then((product) => {
    //Insertion des éléments titre, prix et description
    title.innerHTML = product.name;
    price.innerHTML = product.price;
    description.innerHTML = product.description;

    // Insertion de l'image
    let image = product.imageUrl;
    console.log(image);
    var vincent = `<img src="${image}" alt="${product.altTxt}">`;
    const item__imgs = document.getElementsByClassName("item__img");
    const item_img = item__imgs[0];
    item_img.innerHTML = vincent;

    //Insertion des modifications de la couleur
    product.colors.forEach((color) => {
      const couleurs = `<option value="${color}">${color}</option>`;
      document.getElementById("colors").innerHTML += couleurs;
    });

    //Gestion de la quantité et des couleurs choisies
    const panier = (addToCart.onclick = () => {
      const quantityLs = parseInt(document.getElementById("quantity").value);
      const colorsLs = document.getElementById("colors").value;

      // récupération des options du produit
      var canap = {
        id: products,
        quantity: quantityLs,
        colors: colorsLs,
        name: product.name,
        image: product.imageUrl,
        alt: product.altTxt,
        price: product.price,
      };
      console.log(canap);

      // Initialisation du localStorage
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
      console.log(produitLocalStorage);

      // Alerte d'ajout au panier
      const confirmation = () => {
        if (window.alert("Produit ajouté au panier")) {
          window.location.href = "cart.html";
        }
      };

      // importation dans le LocalStorage
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) => el.id === products && el.colors === colorsLs
        );

        //Modification de la quantité dans le LocalStorage
        if (resultFind) {
          let newQuantite =
            parseInt(canap.quantity) + parseInt(resultFind.quantity);
          resultFind.quantity = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          confirmation();
          //Ajout du produit dans le LocalStorage
        } else {
          produitLocalStorage.push(canap);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          confirmation();
        }
        //Création array dans le LocalStorage
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(canap);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        confirmation();
      }
    });
  });
