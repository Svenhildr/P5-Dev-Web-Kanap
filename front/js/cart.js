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
      // section, article, div

      const eltSection = document.getElementById("cart__items");

      const eltArticle = document.createElement("article");
      eltArticle.classList.add("cart__item");
      eltArticle.dataset.id = product.id;
      eltArticle.dataset.color = product.color;
      eltSection.appendChild(eltArticle);

      const divImg = document.createElement("div");
      divImg.classList.add("cart__item__img");
      eltArticle.appendChild(divImg);

      //image

      const eltImg = document.createElement("img");
      eltImg.src = existingProduct.imageUrl;
      eltImg.alt = existingProduct.altTxt;
      divImg.appendChild(eltImg);

      //div

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

      //couleur

      let eltItemColor = document.createElement("p");
      eltItemColor.textContent = product.color;
      divDescription.appendChild(eltItemColor);

      //prix

      let eltPrice = document.createElement("p");
      eltPrice.textContent = product.price * product.quantity + " €";
      divDescription.appendChild(eltPrice);

      //div

      let divSettings = document.createElement("div");
      divSettings.classList.add("cart__item__content__settings");
      divContent.appendChild(divSettings);

      let divQuantity = document.createElement("div");
      divQuantity.classList.add("cart__item__content__settings__quantity");
      divSettings.appendChild(divQuantity);

      //quantité

      let pQty = document.createElement("p");
      pQty.textContent = "Qté : ";
      divQuantity.appendChild(pQty);

      //input

      let eltQuantity = document.createElement("input");
      let eltValue = document.createElement("value");
      eltQuantity.type = "Number";
      eltQuantity.className = "itemQuantity";
      eltQuantity.setAttribute("name", "itemQuantity");
      eltQuantity.setAttribute("min", "1");
      eltQuantity.setAttribute("max", "100");
      eltQuantity.setAttribute("value", product.quantity);
      divQuantity.appendChild(eltQuantity);

      let divDelete = document.createElement("div");
      divDelete.classList.add("cart__item__content__settings__delete");
      divSettings.appendChild(divDelete);

      let pDeleteItem = document.createElement("p");
      pDeleteItem.classList.add("deleteItem");
      pDeleteItem.textContent = "Supprimer";
      divDelete.appendChild(pDeleteItem);

      //faire eventlistener sur HTML "supprimer"

      pDeleteItem.addEventListener("click", function (e) {
        let res = confirm("supprimer");
        let article = e.target.closest("article");

        // Récupérer l'ID et la couleur de l'article cliqué
        let articleId = article.getAttribute("data-id");
        let articleColor = article.getAttribute("data-color");

        if (res) {
          let cartLocal = localStorage.getItem("cart");
          cartLocalJson = JSON.parse(cartLocal);

          // Trouver l'index de l'objet à supprimer dans le local storage
          const index = cartLocalJson.findIndex(
            (item) => item.id === articleId && item.color === articleColor
          );

          // Supprimer l'objet du local storage
          cartLocalJson.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cartLocalJson));
          article.remove();

          // Recharger la page
          calculQuantityAndPrice(cartLocalJson);
        } else {
          // Annuler l'action de suppression
          alert("Suppression annulée");
        }
      });

      eltQuantity.addEventListener("change", function (e) {
        console.log("c'est changé");
        let article = e.target.closest("article");
        console.log(article);
      });

      //Modifier le localStorage
      // let panier = []
      // panier.push({
      //   id : product.id
      // })
      // let cartLocal = localStorage.getItem("cart");
      // cartLocal = JSON.parse(cartLocal);

      //Relancer calcule price
      //});

      //Modifier quantity
    }

    //appelle la fonction
    calculQuantityAndPrice(cart);

    //va chercher le calcul des quantité et prix dans la fonction
    //calculQuantityAndPrice(cart);
  });

//Function Calculer total price et item (Qu'on puisse rappeler et qu'elle fonction Autonome)
// et qu'on puisse ajouter ou enlever un article avec l'input

async function calculQuantityAndPrice(cart) {
  let totalPrice = 0;
  let totalQuantity = 0;
  for (const product of cart) {
    totalQuantity += parseInt(product.quantity);
  }
  for (const product of cart) {
    let price = await fetch(`http://localhost:3000/api/products/` + product.id)
      .then((data) => {
        return data.json();
      })
      .then((product) => {
        return product.price;
      });

    totalPrice += parseInt(price) * parseInt(product.quantity);
  }
  let total = [totalPrice, totalQuantity];
  console.log(totalPrice, totalQuantity);

  //insère les calculs de total de prix et de quantité dans l'HTML
  const eltTotalItems = document.getElementById("totalQuantity");
  eltTotalItems.textContent = total[1];
  const eltTotalPrice = document.getElementById("totalPrice");
  eltTotalPrice.textContent = total[0];
}

/* function calculQuantityAndPrice(cart) {
  let totalPrice = 0;
  let totalQuantity = 0;
  for (const product of cart) {
    // console.log(product.price * product.quantity);
    totalPrice += parseInt(product.price * product.quantity);
    totalQuantity += parseInt(product.quantity);
  }
  let total = [totalPrice, totalQuantity];

  //insère les calculs de total de prix et de quantité dans l'HTML
  const eltTotalItems = document.getElementById("totalQuantity");
  eltTotalItems.textContent = total[1];
  const eltTotalPrice = document.getElementById("totalPrice");
  eltTotalPrice.textContent = total[0];

  // return total;

  console.log(totalPrice, totalQuantity);
  //Ajouter les informations dans le HTML
} */

/* function minMax(value, min, max) {
  if (parseInt(value) < 1 || isNaN(parseInt(value))) return 1;
  else if (parseInt(value) > 100) return 100;
  else return value; 
}
*/

//Function delete utiliser const nom = element.closest("cart__item");

//Function Modify quantity

//Formulaire Vérifier les champs (Regex)

// Commander : Fetch méthode POST (Revoir parametre api)

/* if (confirm("Press a button!")) {
  txt = "You pressed OK!";
} else {
  txt = "You pressed Cancel!";
} */
