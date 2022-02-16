function commande() {
  const bilan = document.getElementById("orderId");
  console.log("bilan");
  console.log(bilan);
  var url = new URL(window.location.href);
  var orderId = url.searchParams.get("orderId");
  console.log(orderId);
  bilan.innerHTML = orderId;
}
commande();
