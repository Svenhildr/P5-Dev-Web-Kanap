let url = new URL(window.location.href);
let product_id = url.searchParams.get("id");

document.getElementById("orderId").textContent = product_id;
