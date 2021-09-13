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
    // console.log(product);

    ////////////////////////////////////////////////////////////////////////second edit
    // const image = product.images;
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
  /////////////////////////fourth edit
  updateTotal();
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
  /////////////////////////////fifth edit (showing total with upto two decimal number )
  // const converted = parseInt(element);
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // document.getElementById(id).innerText = Math.round(total);
  /////////////////////////////////////////////fifth edit(toFixed(2) to get upto two decimal place)
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  // document.getElementById(id).innerText = Math.round(value);
  /////////////////////////////////////////////fifth edit(toFixed(2) to get upto two decimal place)
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
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
  ///////////////////////////////  forth edit(update function created but not called)
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  /////////////////////////////////////////////fifth edit(toFixed(2) to get upto two decimal place)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

///display single item
const getSingleItem = (itemId) => {

  const url = `https://fakestoreapi.com/products/${itemId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displaySingleItem(data))
}
const displaySingleItem = (item) => {
  // console.log(item.image)
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