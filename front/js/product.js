/* page associée à id dans l'API */

let url = new URL(window.location.href);
let product_id = url.searchParams.get("id");

fetch(`http://localhost:3000/api/products/${product_id}`)
  // fetch("http://localhost:3000/api/products/" + urlId)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    let eltImg = document.createElement("img");
    eltImg.src = product.imageUrl;
    eltImg.alt = product.altTxt;
    document.getElementsByClassName("item__img")[0].appendChild(eltImg);

    document.getElementById("title").textContent = product.name;

    document.getElementById("price").textContent = product.price;

    document.getElementById("description").textContent = product.description;

    for (const color of product.colors) {
      let eltColor = document.getElementById("colors");
      let eltOption = document.createElement("option");
      eltOption.textContent = color;
      eltColor.appendChild(eltOption);
    }
  });

/* Récupère l'élément addToCart  qu'on place dans une constante*/
const addToCart = document.getElementById("addToCart");

/* écoute le clic sur l'évènement "addToCart" */
addToCart.addEventListener("click", () => {
  const cart_product = {
    id: product_id,
    color: colorValue(),
    quantity: quantityValue(),
  };

  /* si la quantité renseignée est inférieure ou égale à 0 
  OU supérieure à 100 OU si la couleur n'est pas définie 
  => le résultat est invalide et envoie un message d'alerte*/

  if (
    cart_product.quantity <= 0 ||
    cart_product.quantity > 100 ||
    cart_product.color == false
  ) {
    alert("colori ou quantité non vadide.");
    return false;
  }

  /* s'il y a des données dans getCart, elles sont placées dans le panier, 
  s'il n'y en a pas un tableau vide est créé */
  let cart = getCart() || [];

  /* existingProduct   */
  let existingProduct = cart.find(
    (cart) => cart.id === product_id && cart.color === cart_product.color
  );

  /* si existingProduct est défini, 
  on additionne la quantité qui se trouve dans le panier, à la quantité saisie,
  SINON on ajoute le produit au panier */
  if (existingProduct) {
    existingProduct.quantity =
      parseInt(existingProduct.quantity) + parseInt(cart_product.quantity);
  } else {
    cart.push(cart_product);
  }
  /* on enregistre dans le local storage les données ajoutées au panier*/
  setCart(cart);
});

function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

function quantityValue() {
  let quantity = document.getElementById("quantity");
  return quantity.value;
}

/* récupère et traduit du format JSON les données du local storage */
function getCart() {
  let cartStorage = localStorage.getItem("cart");
  let cartStorJson = JSON.parse(cartStorage);

  return cartStorJson;
}

/* traduit les données au format JSON et les enregistre sur le local storage */
function setCart(cart) {
  let cartStorJson = JSON.stringify(cart);
  localStorage.setItem("cart", cartStorJson);
  alert("article ajouté au panier");
}
