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

// const apiParam = {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(order),
// };

// fetch("http://localhost:3000/api/products/order", apiParam)
//   .then((data) => data.json())

//   .then((order) => {
//     let htmlOrderId = document.getElementById("orderId");
//     let newOrderId = document.createTextNode(`${order.orderId}`);

//     if (newOrderId != undefined) {
//       htmlOrderId.replaceChild(newOrderId, htmlOrderId.childNodes[0]);
//     } else {
//       htmlOrderId.appendChild(newOrderId);
//     }
//   });

// localStorage.clear();
