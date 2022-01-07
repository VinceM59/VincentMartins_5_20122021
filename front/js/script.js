/* 
catalog();
async function apiArticles() {
  var importArticles = await fetch("http://localhost:3000/api/products");
  return await importArticles.json();
}

async function catalog() {
  var conclusion = await apiArticles().then(function (conclusionApi) {
    let articles = conclusionApi;

    //console.table(articles);
    let vincent = "";
    for (let i = 0; i < articles.length; i++) {
      let article = articles[i];
      console.log(article.name + " - " + article.imageUrl);
      vincent = vincent + "<id>" + article._id + "</id>";
      vincent = vincent + "<h3>" + article.name + "</h3> - ";
      vincent = vincent + "<b>" + article.price + "</b>";
      vincent = vincent + "<img>" + article.imageUrl.jpeg + "</img>";
      vincent = vincent + "<alt>" + article.altTxt + "</alt>";
      vincent = vincent + "<p>" + article.description + "</p>";

      let fruits = ["apple", "banana"];
      console.log(fruits.length);
    }
    document.getElementById("items").innerHTML = vincent;
  });
} */
// document.getElementById("items").innerHTML = "salut";
//const affichageCanape = document.getElementById("items");
//let items = document.getElementById("items");

//test insertion----------------------------------------------------------
/* let items = document.getElementById("items");
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((canapes) => {
    for (let i = 0; i < canapes.length; i++) {
      console.log(canapes);

      let liens = document.createElement("c");
      items.appendChild(liens);

      let divItems2 = document.createElement("article");
      liens.appendChild(divItems2);

      let linkCanape = document.createElement("a");
      linkCanape.href = "html/produit.html?id_canapes=" + canapes[i]._id;
      linkCanape.innerHTML = "";
      liens.appendChild(linkCanape);

      let h3Canape = document.createElement("h3");
      h3Canape.classList.add("productName");
      h3Canape.innerHTML = canapes[i].name;
      divItems2.appendChild(h3Canape);

      let imgCanape = document.createElement("img");
      imgCanape.setAttribute("src", canapes[i].imageUrl);
      imgCanape.setAttribute("alt", canapes[i].altTxt);
      divItems2.appendChild(imgCanape);

      let descriptionCanape = document.createElement("p");
      descriptionCanape.classList.add("productDescription");
      descriptionCanape.innerHTML = canapes[i].description;
      divItems2.appendChild(descriptionCanape);
    }
  }); */

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
