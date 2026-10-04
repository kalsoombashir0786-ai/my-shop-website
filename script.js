/*Product Data */

const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 20,
        image: "tshirt.jpg"
    },

    {
        id: 2,
        name: "Running Shoes",
        price: 50,
        image: "shoes.jpg"
    },

    {
        id: 3,
        name: "Smart Watch",
        price: 80,
        image: "smartwatch.jpg"
    },

    {
        id: 4,
        name: "Backpack",
        price: 35,
        image: "bag.jpg"
    },

    {
        id: 5,
        name: "Headphones",
        price: 60,
        image: "headphone.jpg"
    },

    {
        id: 6,
        name: "Sunglasses",
        price: 30,
        image: "sunglasses.jpg"
    }
];


/* Cart Array */

let cart = [];


/* HTML Elements*/

const productList = document.getElementById("product-list");

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const subtotalElement = document.getElementById("subtotal");

const totalElement = document.getElementById("total");

const checkoutButton = document.getElementById("checkout-btn");


/*  Display Products*/

function displayProducts() {

    productList.innerHTML = "";

    products.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="product-price">
                $${product.price.toFixed(2)}
            </p>

            <button
                class="add-btn"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(productCard);
    });
}


/* Add Product To Cart */

function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });


    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }


    updateCart();
}


/* Display Cart */

function updateCart() {

    cartItems.innerHTML = "";


    /* Empty Cart */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach(function(item) {

            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");


            const itemSubtotal = item.price * item.quantity;


            cartItem.innerHTML = `

                <div class="cart-product">
                    ${item.name}
                </div>

                <div class="cart-price">
                    $${item.price.toFixed(2)}
                </div>

                <div class="quantity-controls">

                    <button
                        class="quantity-btn"
                        onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span class="quantity-number">
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-btn"
                        onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

                <div class="cart-subtotal">
                    $${itemSubtotal.toFixed(2)}
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            `;


            cartItems.appendChild(cartItem);
        });
    }


    updateCartSummary();
}


/* Increase Quantity*/

function increaseQuantity(productId) {

    const item = cart.find(function(item) {
        return item.id === productId;
    });


    if (item) {
        item.quantity++;
    }


    updateCart();
}


/*  Decrease Quantity*/

function decreaseQuantity(productId) {

    const item = cart.find(function(item) {
        return item.id === productId;
    });


    if (item) {

        item.quantity--;

        /*
           If quantity becomes 0,
           remove product from cart.
        */

        if (item.quantity <= 0) {

            cart = cart.filter(function(cartItem) {
                return cartItem.id !== productId;
            });
        }
    }


    updateCart();
}


/* Remove Product*/

function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });


    updateCart();
}


/* Cart Summar */

function updateCartSummary() {

    let totalQuantity = 0;

    let totalPrice = 0;


    cart.forEach(function(item) {

        totalQuantity += item.quantity;

        totalPrice += item.price * item.quantity;
    });


    cartCount.textContent = totalQuantity;

    subtotalElement.textContent =
        "$" + totalPrice.toFixed(2);

    totalElement.textContent =
        "$" + totalPrice.toFixed(2);
}


/* Checkout Button*/

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert("Thank you for your purchase!");


    cart = [];

    updateCart();
});


/* Start Application */

displayProducts();

updateCart();
