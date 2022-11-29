let urlString = window.location.href
let url = new URL (urlString);
let urlId = url.searchParams.get("id");
console.log(urlId);
console.log(window.location.href);




fetch("http://localhost:3000/api/products/",  {method : "GET"})
.then(data => {
    return data.json()
})
.then(products =>{
    console.log(products)


  
    for(const product of products)
    {

        if (product._id == urlId){
        //let eltArticle = document.createElement('article');
        

        let eltImg = document.createElement ('img');
        eltImg.src = product.imageUrl
        eltImg.alt = product.altTxt
        eltImg.classList.add ('item__img') ;
        document.getElementsByClassName('item__img')[0].appendChild(eltImg);
        console.log(eltImg)
  
  
        let eltProdName = document.createElement('h1');
        eltProdName.setAttribute('id','title') ;
        eltProdName.textContent = product.name
        document.getElementById('title').appendChild(eltProdName);
        console.log(eltProdName)
        

        let eltPrice = document.createElement('span');
        eltPrice.setAttribute('id','price');
        eltPrice.textContent = product.price
        document.getElementById('price').appendChild(eltPrice);
        console.log(eltPrice)
        
  
        let eltProdDesc = document.createElement('p');
        eltProdDesc.setAttribute('id','description');
        eltProdDesc.textContent = product.description
        document.getElementById('description').appendChild(eltProdDesc);
        console.log(eltProdDesc)

        let color = document.getElementById("colors");
      for (i = 0; i < products.colors.length; i++) {
        color.innerHTML += `<option value="${products.colors[i]}">${products.colors[i]}</option>`;


           
        } 
        };

    
    }})
    function colorValue() {
        let color = document.getElementById("colors");
        return color.value;
    }
 
   