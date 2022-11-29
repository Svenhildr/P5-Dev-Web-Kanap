
//Récupère les produits via un fetch (url de base product)

//Console.log(products)

//Créer les élements HTML en javascript ( let articleElt = createElement("article"))

let url = "http://localhost:3000/api/products/"
fetch(url,  {method : "GET"})
.then(data => {
    return data.json()
})
.then(products =>{
    console.log(products)

    let HTML = document.getElementById("items")

    let myHTML = ""
  
    for(const product of products)
    // products.forEach(product => 
        {
      // console.log(product)
      // console.log(product.name)
      // console.log(product.price)
      let eltA = document.createElement('a')
      eltA.href = `./product.html?id=${product._id}`
      // http://monsite.com?key=value&key=value
      
    //  const queryString = window.location.search;
    //  console.log(queryString);
    //  const urlParams = new URLSearchParams(queryString);
    //  console.log(urlParams);


      let eltArticle = document.createElement('article')
      eltA.appendChild(eltArticle) 

      
      let eltImg = document.createElement ('img')
      eltImg.src = product.imageUrl
      eltImg.alt = product.altTxt
      eltArticle.appendChild(eltImg)


     let eltProdName = document.createElement('h3')
      eltProdName.classList.add ('productName') 
      eltProdName.textContent = product.name
      eltArticle.appendChild(eltProdName)


     let eltProdDesc = document.createElement('p')
      eltProdDesc.classList.add ('productDescription')
      eltProdDesc.textContent = product.description
      eltArticle.appendChild(eltProdDesc)

      
      HTML.appendChild(eltA)

     // const url = new URL('http://example.com/search?query=%40');

        console.log(eltA, product.eltA)

    //    myHTML += ` <a href="./product.html?id=42">
    //    <article>
    //      <img src=${product.imageUrl} alt="${product.name}">
    //      <h3 class="productName">${product.name}</h3>
    //      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    //    </article>
    //  </a> `
    // });

    //HTML.appendChild(eltA)
    };
    // console.log(myHTML)
  //  HTML.innerHTML = myHTML
})

