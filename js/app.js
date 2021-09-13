const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    /////second change
    //error code--> const image = product.images;
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p>Rating : <strong> ${product.rating.rate}</strong></p> 
      <div class="rating between-gap">
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star empty"></i>
      </div>
      <p>Number of People  Rated : <strong>${product.rating.count} </strong></p> 
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button onclick="getSingleItem(${product.id})" id="details-btn" class="btn btn-info">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  /////fifth change (showing total with upto two decimal number)
  //error code --> const converted = parseInt(element);
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  /////fifth change-1(toFixed(2) to get upto two decimal place)
  // error code--> document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  /////fifth change-2(toFixed(2) to get upto two decimal place)
  //error code--> document.getElementById(id).innerText = Math.round(value);
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  console.log(priceConverted)
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  ////// forth change-2(updateTotal function created but not called/initialized)
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  //////fifth change-3(toFixed(2) to get upto two decimal place of total price)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

///display single item
//Bonus section
const getSingleItem = (itemId) => {
  const url = `https://fakestoreapi.com/products/${itemId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displaySingleItem(data))
}
const displaySingleItem = (item) => {
  const singleItem = document.getElementById('single-item');
  singleItem.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <div class="text-center">
      <div>
    <img class="singleImage" src=${item.image}>
      </div>
      <h3>${item.title}</h3>
      <p>Category: ${item.category}</p>
      <h2>Price: $ ${item.price}</h2>

      <p>Rating : <strong> ${item.rating.rate}</strong></p> 

      <div class="rating between-gap">
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star empty"></i>
      
      </div>
      <div class="">
      <p>Number of People  Rated : <strong>${item.rating.count} </strong></p> 
      <button onclick="addToCart(${item.id},${item.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button onclick="getSingleItem(${item.id})" id="details-btn" class="btn btn-info">Details</button>

      </div>
      </div>`;
  singleItem.appendChild(div);
};

//bonus section for "Buy Now"  button click
const buyingConfrimation = () => {
  let message = confirm("Place order and Pay through online transection. Have a nice Day!!!")
  console.log(message);
}