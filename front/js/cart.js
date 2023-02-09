let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

//console.log(cart);

fetch(`http://localhost:3000/api/products/`)
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    //console.log(products);

    if (cart) {
      //Merger les données, récupere les données des produits
      for (const product of cart) {
        // console.log(product);

        let existingProduct = products.find(
          (productItem) => productItem._id === product.id
        );

        //lier les données à nos objets product in cart
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
          let res = confirm("Voulez-vous supprimer l'article?");
          let article = e.target.closest("article");

          // Récupérer l'ID et la couleur de l'article cliqué
          let articleId = article.getAttribute("data-id");
          let articleColor = article.getAttribute("data-color");
          //si bouton ok de l'alerte est selectionné

          if (res) {
            // Trouver l'index de l'objet à supprimer dans le local storage
            const index = cart.findIndex(
              (item) =>
                (item.id === articleId && item.color === articleColor) ||
                item.quantity === eltQuantity
            );

            if (index >= 0) {
              // Supprimer l'objet du local storage
              cart.splice(index, 1);
              saveCart(cart);
              article.remove();

              // Recharger la page
              calculQuantityAndPrice(cart);

              //en cas d'erreur
            } else {
              alert("Erreur suppression");
            }
          } else {
            //si le bouton annuler de l'alerte est selectionné
            // Annuler l'action de suppression
            alert("Suppression annulée");
          }
        });

        // eventlistener sur HTML l'input pour modification quantité produit

        eltQuantity.addEventListener("change", (e) => {
          let quantity = parseInt(eltQuantity.value);

          if (quantity < 0) {
            quantity = 0;
            alert("La quantité ne peut pas être négative");
          }

          product.quantity = quantity;
          // Met à jour le prix de l'article
          eltPrice.textContent = product.price * product.quantity + " €";

          // Met à jour le panier local
          saveCart(cart);

          //calcul des prix et quantité
          calculQuantityAndPrice(cart);
        });
      }

      //calcul des prix et quantité
      calculQuantityAndPrice(cart);
    } else {
      alert("votre panier est vide");
      return false;
    }

    //regex formulaire

    const nameRegex =
      /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    const addressRegex =
      /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s\,\'\-]*$/;

    //code postal + ville
    const cityRegex =
      /^([0-9]{5}).[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //comme le formulaire n'est pas rempli, on part du principe qu'il est vide
    // let isFormValid = false;

    //on récupère les éléments du DOM
    let firstNameForm = document.getElementById("firstName");
    let lastNameForm = document.getElementById("lastName");
    let addressForm = document.getElementById("address");
    let cityForm = document.getElementById("city");
    let emailForm = document.getElementById("email");

    // Vérifie le prénom
    firstNameForm.addEventListener("change", (e) => {
      textInput(nameRegex, firstNameForm.value, "firstNameErrorMsg");
    });

    // Vérifie nom de famille
    lastNameForm.addEventListener("change", (e) => {
      textInput(nameRegex, lastNameForm.value, "lastNameErrorMsg");
    });

    // Vérifie l'addresse
    addressForm.addEventListener("change", (e) => {
      textInput(addressRegex, addressForm.value, "addressErrorMsg");
    });

    // Vérifie le code postal et la ville
    cityForm.addEventListener("change", (e) => {
      textInput(cityRegex, cityForm.value, "cityErrorMsg");
    });

    // Vérifie l'email
    emailForm.addEventListener("change", (e) => {
      textInput(emailRegex, emailForm.value, "emailErrorMsg");
    });

    //récupère le bouton dans le DOM et fait un eventListener au click
    let button = document.getElementById("order");
    button.addEventListener("click", postForm);

    //contrôle des paramètres regex, valeur et messages d'erreur pour valider un champs
    function textInput(regex, value, idError) {
      if (!regex.test(value)) {
        msgError(idError);
        return false;
      } else {
        clearError(idError);
        return true;
      }
    }

    function testAllInput() {
      if (
        textInput(nameRegex, firstNameForm.value, "firstNameErrorMsg") &&
        textInput(nameRegex, lastNameForm.value, "lastNameErrorMsg") &&
        textInput(addressRegex, addressForm.value, "addressErrorMsg") &&
        textInput(cityRegex, cityForm.value, "cityErrorMsg") &&
        textInput(emailRegex, emailForm.value, "emailErrorMsg")
      ) {
        return true;
      } else {
        return false;
      }
    }

    //la fonction permet de récupérer les articles dans le localStorage,
    // de créer un array de 2 objets, si le formulaire est valide, qui comprendra :
    //les données contenues dans le formulaire
    // les id des produits commandés
    function postForm(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      //let button = document.getElementById("order");
      let cart = JSON.parse(localStorage.getItem("cart"));

      //si le panier est vide le formulaire ne sera pas valide et affiche un message

      if (!cart || cart.length == 0 || calculQuantityAndPrice <= 0) {
        alert("votre panier est vide");
        return;
      } else {
        if (testAllInput()) {
          let cartOrder = [];
          for (let product of cart) {
            cartOrder.push(product.id);
          }

          const order = {
            contact: {
              firstName: firstNameForm.value,
              lastName: lastNameForm.value,
              address: addressForm.value,
              city: cityForm.value,
              email: emailForm.value,
            },
            products: cartOrder,
          };

          finalPost(order);
        } else {
          alert("Formulaire non valide");
        }
      }
    }
  });

//requete POST pour récupérer l'id de la commande, et rediriger sur la page condirmation
//la page confirmation contient l'id de la commande dans l'URL
async function finalPost(order) {
  let response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  let result = await response.json();
  window.location.href = `confirmation.html?id=${result.orderId}`;
}

//paramétrage du message d'erreur formulaire
function msgError(location) {
  document.getElementById(location).textContent =
    "Veuillez vérifier votre saisie";
}
function clearError(location) {
  document.getElementById(location).textContent = " ";
}

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
  //insère les calculs de total de prix et de quantité dans l'HTML
  const eltTotalItems = document.getElementById("totalQuantity");
  eltTotalItems.textContent = total[1];
  const eltTotalPrice = document.getElementById("totalPrice");
  eltTotalPrice.textContent = total[0];
}
//permet d'envoyer au local Storage les données sans le prix
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
