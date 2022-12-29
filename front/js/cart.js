let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

console.log(cart);

fetch(`http://localhost:3000/api/products/`)
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    //console.log(products);

    //Merger les données, récupere les données des produits
    for (const product of cart) {
      // console.log(product);

      let existingProduct = products.find(
        (productItem) => productItem._id === product.id
      );

      //lier les données a nos objets product in cart
      product.price = existingProduct.price;
      product.name = existingProduct.name;
      product.imageUrl = existingProduct.imageUrl;

      //console.log(existingProduct);

      //Affiche les produits (createElement)

      const eltSection = document.getElementById("cart__items");

      const eltArticle = document.createElement("article");
      eltArticle.classList.add("cart__item");
      eltSection.appendChild(eltArticle);

      const divImg = document.createElement("div");
      divImg.classList.add("cart__item__img");
      eltArticle.appendChild(divImg);

      //image

      const eltImg = document.createElement("img");
      // console.log(eltImg);
      eltImg.src = existingProduct.imageUrl;
      eltImg.alt = existingProduct.altTxt;
      divImg.appendChild(eltImg);
      // console.log(eltImg);

      let divContent = document.createElement("div");
      divContent.classList.add("cart__item__content");
      eltArticle.appendChild(divContent);

      let divDescription = document.createElement("div");
      divDescription.classList.add("cart__item__content__description");
      divContent.appendChild(divDescription);
      //nom

      let eltName = document.createElement("h2");
      eltName.textContent = existingProduct.name;
      divDescription.appendChild(eltName);
      // console.log(eltName);

      //couleur

      let eltItemColor = document.createElement("p");
      eltItemColor.textContent = product.color;
      divDescription.appendChild(eltItemColor);
      // console.log(eltItemColor);

      //prix

      let eltPrice = document.createElement("p");
      eltPrice.textContent = product.price + " €";
      divDescription.appendChild(eltPrice);
      // console.log(eltPrice);

      //quantité

      let divSettings = document.createElement("div");
      divSettings.classList.add("cart__item__content__settings");
      divContent.appendChild(divSettings);

      let divQuantity = document.createElement("div");
      divQuantity.classList.add("cart__item__content__settings__quantity");
      divSettings.appendChild(divQuantity);

      let pQty = document.createElement("p");
      pQty.textContent = "Qté : ";
      divQuantity.appendChild(pQty);

      let eltQuantity = document.createElement("input");
      let eltValue = document.createElement("value");
      eltQuantity.type = Number;
      eltQuantity.className = "itemQuantity";
      eltQuantity.textContent = product.quantity;
      eltQuantity.value = product.quantity;
      divQuantity.appendChild(eltQuantity);
      minMax(eltQuantity);

      let divDelete = document.createElement("div");
      divDelete.classList.add("cart__item__content__settings__delete");
      divSettings.appendChild(divDelete);

      let pDeleteItem = document.createElement("p");
      pDeleteItem.classList.add("deleteItem");
      pDeleteItem.textContent = "Supprimer";
      divDelete.appendChild(pDeleteItem);

      //appelle la fonction
      let total = calculQuantityAndPrice(cart);
      console.log(total);

      //insère les calculs de total de prix et de quantité dans l'HTML

      const eltTotalItems = document.getElementById("totalQuantity");
      eltTotalItems.textContent = total[1];
      const eltTotalPrice = document.getElementById("totalPrice");
      eltTotalPrice.textContent = total[0];
    }

    //va chercher le calcul des quantité et prix dans la fonction
    //calculQuantityAndPrice(cart);
  });

//Function Calculer total price et item (Qu'on puisse rappeler et qu'elle fonction Autonome)
// et qu'on puisse ajouter ou enlever un article avec l'input
function calculQuantityAndPrice(cart) {
  let totalPrice = 0;
  let totalQuantity = 0;
  for (const product of cart) {
    // console.log(product.price * product.quantity);
    totalPrice += product.price * product.quantity;
    totalQuantity += parseInt(product.quantity);
  }
  let total = [totalPrice, totalQuantity];
  return total;

  console.log(totalPrice, totalQuantity);
  //Ajouter les informations dans le HTML
}

function minMax(value, min, max) {
  if (parseInt(value) < 1 || isNaN(parseInt(value))) return 1;
  else if (parseInt(value) > 100) return 100;
  else return value;
}

//Function delete utiliser const nom = element.closest("cart__item");

//Function Modify quantity

//Formulaire Vérifier les champs (Regex)

// Commander : Fetch méthode POST (Revoir parametre api)

/* if (confirm("Press a button!")) {
  txt = "You pressed OK!";
} else {
  txt = "You pressed Cancel!";
} */
