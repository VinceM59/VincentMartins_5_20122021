var str =
  "file:///C:/Users/vince/Documents/VincentMartins_5_20122021/front/html/product.html?id=415b7cacb65d43b2b5c1ff70f3393ad1";
var url = new URL(window.location.href);
var product = url.searchParams.get("id");
console.log(product);
document.getElementById("title").innerHTML = product;

//affichage produit
