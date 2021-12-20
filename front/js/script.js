let produits = RécupérerContenuDeLPage("http://localhost:3000/api/products");
// produits est un tableau de produit
/* [ {
    id: machin
    nom: blabla
},{
    id: machin
    nom: blabla
}]*/




let productName = "Nom du produit"
document.getElementById("items").innerHTML = `<a href="./product.html?id=42">
<article> 
  <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
  <h3 class="productName">${productName}</h3>
  <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
</article>
</a>`;