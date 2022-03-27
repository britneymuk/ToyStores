let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Toy 1',
        tag: 'toy1',
        price: 60,
        inCart: 0
    },
    {
        name: 'Toy 2',
        tag: 'toy2',
        price: 55,
        inCart: 0
    },
    {
        name: 'Toy 3',
        tag: 'toy3',
        price: 40,
        inCart: 0
    },
    {
        name: 'Toy 4',
        tag: 'toy4',
        price: 25,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', (e) => {
        e.preventDefault();
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNum = localStorage.getItem('cartNumbers');

    if (productNum) {
        document.querySelector('.shopping_cart span').textContent = productNum;
    }
}

function cartNumbers(product) {

    let productNum = localStorage.getItem('cartNumbers');

    productNum = parseInt(productNum);

    if (productNum) {
        localStorage.setItem('cartNumbers', productNum + 1);
        document.querySelector('.shopping_cart span').textContent = productNum + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.shopping_cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItem = localStorage.getItem('productsInCart');
    cartItem = JSON.parse(cartItem);

    if (cartItem != null) {
        if (cartItem[product.tag] == undefined) {
            cartItem = {
                ...cartItem,     //retrieve all which is inside cartItem before
                [product.tag]: product
            }
        }

        cartItem[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItem = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItem));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItem = localStorage.getItem("productsInCart"); //in JSON format
    let cartCost = localStorage.getItem('totalCost');
    cartItem = JSON.parse(cartItem);
    let productContainer = document.querySelector(".row.cart_items_row > .col");  //get the first div in class row cart_items_row

    if (cartItem && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItem).map(item => {
            productContainer.innerHTML +=
                `
            <!-- Cart Item -->
					<div class="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                    <!-- Name -->    
                        <div class="cart_item_product d-flex flex-row align-items-center justify-content-start">
							<div class="cart_item_image">
								<div><img src="images/${item.tag}.jpg" alt=""></div>
							</div>
							<div class="cart_item_name_container">
								<div class="cart_item_name"><a>${item.name}</a></div>
							</div>
						</div>
						<!-- Price -->
                        <div class="cart_item_price">RM${item.price}.00</div>
                        <!-- Quantity -->
                        <div class="cart_item_quantity">
							<div class="product_quantity_container">
								<div class="product_quantity clearfix">
									<span id="${item.tag}" class="cartItemQty">${item.inCart}</span>
									<div class="quantity_buttons">
										<div onclick="increase(this)" id="${item.tag}" class="quantity_inc quantity_control"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>
										<div onclick="decrease(this)" id="${item.tag}" class="quantity_dec quantity_control"><i  class="fa fa-chevron-down" aria-hidden="true"></i></div>
									</div>
								</div>
							</div>
						</div>
						<!-- Total -->
						<div id="${item.tag}" class="cart_item_total">RM${item.inCart * item.price}.00</div>
					</div>     
            `
        });

        productContainer.innerHTML +=
            `
        <div class="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                    <!-- Name -->    
                        <div class="cart_item_product d-flex flex-row align-items-center justify-content-start">
							<div class="cart_item_image">
							</div>
							<div class="cart_item_name_container">
							</div>
						</div>
						<!-- Price -->
                        <div class="cart_item_price"></div>
                        <!-- Quantity -->
                        <div class="cart_item_quantity">
							<div class="product_quantity_container">
								<p id="grandTitle">Grand Total:</p>
							</div>
						</div>
						<!-- Total -->
                <div id="grandTotal" class="cart_item_total">RM${cartCost}.00</div>
        </div>
        `
    }
}

//Increase item count in cart
function increase(target) {
    //Initialize localStorage variables
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    //condition checking
    for ([key, value] of Object.entries(cartItems)) {
        if (key == target.id) {
            item_price = value.price;
            item_count = value.inCart;

            for (let i = 0; i < products.length; i++) {
                if (target.id == products[i].tag) {
                    //reinitializing cartItems for the inner part
                    let cartItems = localStorage.getItem("productsInCart");
                    cartItems = JSON.parse(cartItems);
                    cartItems[products[i].tag].inCart += 1;
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

                    //update cart output
                    document.querySelector(`#${products[i].tag}.cartItemQty`).textContent = cartItems[products[i].tag].inCart;
                    document.querySelector(`#${products[i].tag}.cart_item_total`).textContent = "RM" + cartItems[products[i].tag].inCart * cartItems[products[i].tag].price + ".00";
                }
            }
        }
    }
    //Update value of item in function
    productNumbers = productNumbers + 1;
    cartCost = cartCost + item_price;

    //Update localStorage
    localStorage.setItem("cartNumbers", productNumbers);
    localStorage.setItem("totalCost", cartCost);
    document.querySelector("#grandTotal").textContent = "RM" + cartCost + ".00";

    let grandTotal = document.querySelector("#grandTotal").innerHTML;
    let itemNamej = document.querySelector(".cart_item_name").querySelector("a").innerHTML;
    let cTotalValue = document.querySelectorAll(".cart_total_value");
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("itemNamej", itemNamej);
        localStorage.setItem("gTotal", "RM" + cartCost + ".00");
    }
    for (i in cTotalValue) {
        if (i != 1)
            cTotalValue[i].innerHTML = localStorage.getItem("gTotal");
    }
    //update top cart count
    onLoadCartNumbers();
}

//Decrease item count in cart
function decrease(target) {
    //Initialize localStorage variables
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    for ([key, value] of Object.entries(cartItems)) {
        if (key == target.id) {
            item_price = value.price;
            item_count = value.inCart;

            //Check quantity of item
            if (item_count == 1) {
                return;
            }

            for (let i = 0; i < products.length; i++) {
                if (target.id == products[i].tag) {
                    //reinitializing cartItems for the inner part
                    let cartItems = localStorage.getItem("productsInCart");
                    cartItems = JSON.parse(cartItems);
                    cartItems[products[i].tag].inCart -= 1;
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

                    //Update cart output
                    document.querySelector(`#${products[i].tag}.cartItemQty`).textContent = cartItems[products[i].tag].inCart;
                    document.querySelector(`#${products[i].tag}.cart_item_total`).textContent = "RM" + cartItems[products[i].tag].inCart * cartItems[products[i].tag].price + ".00";

                    if (productNumbers === 0) {
                        localStorage.clear();
                    }
                }
            }
        }
    }
    productNumbers = productNumbers - 1;
    cartCost = cartCost - item_price;

    //Update localStorage
    localStorage.setItem("cartNumbers", productNumbers);
    localStorage.setItem("totalCost", cartCost);
    document.querySelector("#grandTotal").textContent = "RM" + cartCost + ".00";

    let grandTotal = document.querySelector("#grandTotal").innerHTML;
    let itemNamej = document.querySelector(".cart_item_name").querySelector("a").innerHTML;
    let cTotalValue = document.querySelectorAll(".cart_total_value");
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("itemNamej", itemNamej);
        localStorage.setItem("gTotal", "RM" + cartCost + ".00");
    }
    for (i in cTotalValue) {
        if (i != 1)
            cTotalValue[i].innerHTML = localStorage.getItem("gTotal");
    }

    //Update cart count 
    onLoadCartNumbers();
}

function clearAll(target) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers >= 1) {
        localStorage.clear();
        location.reload();
    }
    else {
        alert("The cart is empty.");
    }

};


onLoadCartNumbers();
displayCart();

//weather API
let button = document.querySelector('#button');
let inputValue = document.querySelector(".inputValue");
let name = document.querySelector('.name');
let desc = document.querySelector('.desc');
let temp = document.querySelector('.temp');
button.addEventListener("click", (e) =>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=0624f644922087d37bc4ff37dda7630e')
     .then(response => response.json())
     .then(data => {
         var nameValue = data['name'];
         var tempValue = data['main']['temp'];
         var descValue = data['weather'][0]['description'];
         tempValue = parseFloat(tempValue - 273.15).toFixed(2);

         name.innerHTML = nameValue;
         temp.innerHTML = tempValue + " Degree Celcius";
         desc.innerHTML = descValue;
     })
    .catch(err => alert("Wrong city name!"))
})





