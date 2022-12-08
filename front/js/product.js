let url = new URL(window.location.href);
let product_id = url.searchParams.get("id");
/* console.log(product_id);
console.log(window.location.href); */

fetch(`http://localhost:3000/api/products/${product_id}`)
  // fetch("http://localhost:3000/api/products/" + urlId)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    /*  console.log(product); */

    // for (const product of products) {
    //   if (product._id == urlId) {
    let eltImg = document.createElement("img");
    eltImg.src = product.imageUrl;
    eltImg.alt = product.altTxt;
    document.getElementsByClassName("item__img")[0].appendChild(eltImg);
    //     console.log(eltImg);

    let eltTitle = document.getElementById("title");
    eltTitle.textContent = product.name;

    // console.log(eltProdName);

    let eltPrice = document.getElementById("price");
    eltPrice.textContent = product.price;

    //     console.log(eltPrice);

    let eltDescr = document.getElementById("description");
    eltDescr.textContent = product.description;

    //     console.log(eltProdDesc);

    for (const color of product.colors) {
      console.log(color);
      let eltColor = document.getElementById("colors");
      //  console.log(eltColor);

      let eltOption = document.createElement("option");
      //eltOption = color;
      eltOption.textContent = color;
      eltColor.appendChild(eltOption);
      // console.log(eltOption);

      //CreateElement option
      //Elt -> value
      //Elt -> textContent
      //eltColor.AppentChild(elt)
    }

    //   }
    // }
  });

function colorValue() {
  let color = document.getElementById("colors");
  //   console.log(colorValue() )
  return color.value;
}

function quantityValue() {
  let quantity = document.getElementById("quantity");
  //console.log(quantityValue());
  return quantity.value;
}

/* Récupère l'élément addToCart  qu'on place dans une constante*/
const addToCart = document.getElementById("addToCart");

/* écoute le clic sur l'évènement "addToCart" */
addToCart.addEventListener("click", () => {
  const cart_product = {
    id: product_id,
    color: colorValue(),
    quantity: quantityValue(),
  };

  /* s'il y a des données dans getCart, elles sont placées dans le panier, 
  s'il n'y en a pas un tableau vide est créé */
  let cart = getCart() || [];

  /* existingProduct   */
  let existingProduct = cart.find(
    (cart) => cart.id === product_id && cart.color === cart_product.color
  );

  /* si la quantité renseignée est inférieure ou égale à 0 
  OU supérieure à 100 OU si la couleur n'est pas définie 
  => le résultat est invalide et envoie un message d'alerte*/
  var i = 0;
  for (quantity[i] in cart) {
    if (
      quantityValue() <= 0 ||
      quantityValue() > 100 ||
      colorValue() == false
    ) {
      alert("colori ou quantité non vadide.");
      return false;
    }
  }

  /* si existingProduct est défini, 
  on additionne la quantité qui se trouve dans le panier, à la quantité saisie,
  SINON on ajoute le produit au panier */
  if (existingProduct != undefined) {
    existingProduct.quantity =
      parseInt(existingProduct.quantity) + parseInt(cart_product.quantity);
  } else {
    cart.push(cart_product);
  }
  /*  enregistre dans le local storage les données ajoutées au panier*/
  setCart(cart);
});
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
}

//}

/* const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
  const cart_product = {
    id: product_id,
    color: colorValue(),
    quantity: quantityValue(),
  };
  
  //Recupere mon panier

  //  Panier = Array -> Object Product
  let cart = [];
  cart = [cart_product];

  var i = 0;
  for (quantity[i] in cart) {
    if (
      quantityValue() <= 0 ||
      quantityValue() > 100 ||
      colorValue() == false
    ) {
      alert("colori ou quantité non vadide.");
      return false;
    }
    //vérifier que c'est bien un entier
  addToCart(cart_product)




    function addToCart(cart_product) {
      let cart = getCart();
      console.log(cart)
      let existingProduct = cart.find(
        (cart) => cart.id === product_id && cart.color === color.value
      );
      console.log('fonction')
      console.log(existingProduct);

      if (existingProduct != undefined) {
        existingProduct.quantity =
          parseInt(existingProduct.quantity) += parseInt(quantity);
      } else {
        cart.push(cart_product);
        
      }
      setCart(cart);
    }





    //  if ((colorValue() == true && quantity > 0) || quantity <= 100) {
    //    let productIndex = cart.findIndex(
    //      (cart) =>
    //        cart_product.id == product_id && cart_product.color == colorValue()
    //    );
    //
    //    if (productIndex >= 0) {
    //      console.log(cart[productIndex]);
    //    } else {
    //      let currentItem = cart_product;
    //      cart.push(cart_product);
    //    }
    //  }

    //Si mon product existe dans mon panier -> modifier la quantity
    //Si non l'ajouter dans le panier

    console.log(cart_product, cart);

    cart.value = localStorage.getItem("cart");

    cart = JSON.stringify(cart);

    //console.log(JSON.parse(cart).cart_product);
    localStorage.setItem("cart", cart);

    console.log(localStorage.getItem("cart"));

    //   let quantity = quantity();
    //   let color = colorValue();
  }
});
 */
