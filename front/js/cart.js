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

      // eventlistener sur HTML "supprimer" pour suppression produit

      pDeleteItem.addEventListener("click", function (e) {
        let res = confirm("supprimer");
        let article = e.target.closest("article");

        // Récupérer l'ID et la couleur de l'article cliqué
        let articleId = article.getAttribute("data-id");
        let articleColor = article.getAttribute("data-color");
        console.log(articleId, articleColor);
        //si bouton ok de l'alerte est selectionné

        if (res) {
          // Trouver l'index de l'objet à supprimer dans le local storage
          const index = cart.findIndex(
            (item) => item.id === articleId && item.color === articleColor
          );

          console.log(index);

          if (index >= 0) {
            // Supprimer l'objet du local storage
            cart.splice(index, 1);
            // console.log(cart);
            saveCart(cart);
            article.remove();

            // Recharger la page
            calculQuantityAndPrice(cart);
          } else {
            alert("Erreur suppression");
          }

          //si bouton annuler de l'alerte est selectionné
        } else {
          // Annuler l'action de suppression
          alert("Suppression annulée");
        }
      });

      // eventlistener sur HTML l'input pour modification quantité produit

      eltQuantity.addEventListener("change", (e) => {
        product.quantity = eltQuantity.value;

        // Met à jour le prix de l'article
        eltPrice.textContent = product.price * product.quantity + " €";

        // Met à jour le panier local
        saveCart(cart);

        //calcul des prix et quantité
        calculQuantityAndPrice(cart);
      });
    }

    //appelle la fonction
    calculQuantityAndPrice(cart);

    let form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("form envoyé!");
    });

    let firstName = document.getElementById("firstName");
    console.log(firstName);
    firstName.addEventListener("change", (e) => {
      console.log("Change" + e.target.value);
    });

    let orderBtn = document.getElementById("order");
    orderBtn.addEventListener("click", (e) => {
      console.log("c'est cliqué!");
    });
  });

//Function Calculer total price et item (Qu'on puisse rappeler et qu'elle fonction Autonome)
// et qu'on puisse ajouter ou enlever un article avec l'input

function calculQuantityAndPrice(cart) {
  let totalPrice = 0;
  let totalQuantity = 0;
  for (const product of cart) {
    totalQuantity += parseInt(product.quantity);
    totalPrice += parseInt(product.price) * parseInt(product.quantity);
  }
  let total = [totalPrice, totalQuantity];
  console.log(totalPrice, totalQuantity);

  //insère les calculs de total de prix et de quantité dans l'HTML
  const eltTotalItems = document.getElementById("totalQuantity");
  eltTotalItems.textContent = total[1];
  const eltTotalPrice = document.getElementById("totalPrice");
  eltTotalPrice.textContent = total[0];
}

function saveCart(cart) {
  let newCart = [];
  for (const product of cart) {
    newCart.push({
      id: product.id,
      color: product.color,
      quantity: product.quantity,
    });
  }
  localStorage.setItem("cart", JSON.stringify(newCart));
}

//Formulaire Vérifier les champs (Regex)

// Commander : Fetch méthode POST (Revoir parametre api)

/* if (confirm("Press a button!")) {
  txt = "You pressed OK!";
} else {
  txt = "You pressed Cancel!";
} */
