function commande() {
  //Ajout de l'élément dans le HTML
  const bilan = document.getElementById("orderId");
  console.log(bilan);
  //Récupération de l'id de la commande
  var url = new URL(window.location.href);
  var orderId = url.searchParams.get("orderId");
  console.log(orderId);
  bilan.innerHTML = orderId;
}
commande();
