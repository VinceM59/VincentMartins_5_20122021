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

// let url = new url(window.location.href);
// let orderId = url.searchParams.get("orderId");
// let confirmOrderId = document.getElementById("orderId");
// confirmOrderId.innerHTML = orderId;
