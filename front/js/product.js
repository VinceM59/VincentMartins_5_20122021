var str =
  "file:///C:/Users/vince/Documents/VincentMartins_5_20122021/front/html/product.html?id=415b7cacb65d43b2b5c1ff70f3393ad1";
var url = new URL(window.location.href);
var products = url.searchParams.get("id");
console.log(products);

//affichage produit
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");

fetch("http://localhost:3000/api/products/" + products)
  .then((response) => response.json())
  .then((product) => {
    title.innerHTML = product.name;
    price.innerHTML = product.price;
    description.innerHTML = product.description;

    let image = product.imageUrl;
    console.log(image);

    var vincent = `<img src="${image}" alt="${product.altTxt}">`;
    const item__imgs = document.getElementsByClassName("item__img");
    const item_img = item__imgs[0];
    item_img.innerHTML = vincent;

    product.colors.forEach((color) => {
      const couleurs = `<option value="${color}">${color}</option>`;
      document.getElementById("colors").innerHTML += couleurs;
    });

    const panier = (addToCart.onclick = () => {
      console.log(products);
      localStorage.setItem("id", products);

      const quantityLs = document.getElementById("quantity").value;
      console.log(quantityLs);
      localStorage.setItem("quantity", quantityLs);

      const colorsLs = document.getElementById("colors").value;
      console.log(colorsLs);

      localStorage.setItem("couleur", colorsLs);

      var canap = {
        id: products,
        quantity: quantityLs,
        colors: colorsLs,
      };
      console.log(canap);

      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
      console.log(produitLocalStorage);

      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) => el.id === products && el.colors === colorsLs
        );

        if (resultFind) {
          let newQuantite =
            parseInt(canap.quantity) + parseInt(resultFind.quantity);
          resultFind.quantity = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
        } else {
          produitLocalStorage.push(canap);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
        }
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(canap);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
      }
    });
  });
