// récupération données auprès de l'API et inscription dans le HTML
let canapes = document.getElementById("items");
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((canape) => {
    for (let i = 0; i < canape.length; i++) {
      const articles = `<a href="product.html?id=${canape[i]._id}"> 
        <article>
          <img src="${canape[i].imageUrl}" alt="${canape[i].altTxt}">
          <h3 class="productName">${canape[i].name}</h3>
          <p class="productDescription">${canape[i].description}</p>
        </article>
      </a>`;
      canapes.insertAdjacentHTML("beforeend", articles);
    }
  });
