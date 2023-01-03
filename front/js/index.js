//Récupère les produits via un fetch (url de base product)

let url = "http://localhost:3000/api/products/";
fetch(url, { method: "GET" })
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    console.log(products);

    let HTML = document.getElementById("items");

    let myHTML = "";

    for (const product of products) {
      //Créer élements HTML en javascript

      let eltA = document.createElement("a");
      eltA.href = `./product.html?id=${product._id}`;

      let eltArticle = document.createElement("article");
      eltA.appendChild(eltArticle);

      let eltImg = document.createElement("img");
      eltImg.src = product.imageUrl;
      eltImg.alt = product.altTxt;
      eltArticle.appendChild(eltImg);

      let eltProdName = document.createElement("h3");
      eltProdName.classList.add("productName");
      eltProdName.textContent = product.name;
      eltArticle.appendChild(eltProdName);

      let eltProdDesc = document.createElement("p");
      eltProdDesc.classList.add("productDescription");
      eltProdDesc.textContent = product.description;
      eltArticle.appendChild(eltProdDesc);

      HTML.appendChild(eltA);
    }
  });
