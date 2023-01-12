/* page associée à id dans l'API */
let url = new URL(window.location.href);
let product_id = url.searchParams.get("id");

//affiche l'id de la commande dans le DOM
document.getElementById("orderId").textContent = product_id;

//vide le localStorage
localStorage.clear();
